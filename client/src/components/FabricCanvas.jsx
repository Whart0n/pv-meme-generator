import React, { useEffect, useLayoutEffect, useRef, useState, forwardRef, useImperativeHandle, useCallback } from 'react';
import { saveAs } from 'file-saver';

const FabricCanvas = forwardRef((props, ref) => {
  const { selectedImage, textBoxes = [], images = [], selectedObjectId, onSelectObject, onUpdateTextBox, onUpdateImage, onReady } = props;
  const canvasRef = useRef(null);
  const fabricRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const textObjectsRef = useRef({});
  const imageObjectsRef = useRef({});
  const bgImageRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isBgImageLoaded, setIsBgImageLoaded] = useState(false);
  const [isCanvasReady, setIsCanvasReady] = useState(false);

  const callbackRef = useRef();
  useEffect(() => {
    callbackRef.current = { onSelectObject, onUpdateTextBox, onUpdateImage, onReady };
  });

  const handleResize = useCallback((containerWidth) => {
    const canvas = fabricRef.current;
    const bgImage = bgImageRef.current;
    if (!canvas || !bgImage || !bgImage.width || containerWidth === 0) return;

    const scale = containerWidth / bgImage.width;
    const newWidth = containerWidth;
    const newHeight = Math.round(bgImage.height * scale);

    canvas.setDimensions({ width: newWidth, height: newHeight });
    bgImage.set({ scaleX: scale, scaleY: scale, originX: 'left', originY: 'top' });
    canvas.renderAll();
    setDimensions({ width: newWidth, height: newHeight });
  }, []);

  useEffect(() => {
    if (!window.fabric) {
      console.error('Fabric.js has not been loaded.');
      return;
    }
    const canvas = new window.fabric.Canvas(canvasRef.current, { backgroundColor: '#f8f9fa', preserveObjectStacking: true });
    fabricRef.current = canvas;

    canvas.on('selection:created', (e) => callbackRef.current.onSelectObject(e.selected?.[0]?.id));
    canvas.on('selection:cleared', () => callbackRef.current.onSelectObject(null));
    canvas.on('object:modified', (e) => {
      const obj = e.target;
      if (obj?.id) {
        const properties = { left: obj.left, top: obj.top, scaleX: obj.scaleX, scaleY: obj.scaleY, angle: obj.angle };
        if (obj.isType('textbox')) {
          callbackRef.current.onUpdateTextBox(obj.id, properties);
        } else if (obj.isType('image')) {
          callbackRef.current.onUpdateImage(obj.id, properties);
        }
      }
    });
    canvas.on('mouse:dblclick', (e) => {
      if (e.target?.type === 'textbox') e.target.enterEditing();
    });

    setIsCanvasReady(true);
    return () => {
      canvas.dispose();
      fabricRef.current = null;
      setIsCanvasReady(false);
    };
  }, []);

  useEffect(() => {
    const container = canvasContainerRef.current;
    if (!container || !isCanvasReady || !isBgImageLoaded) return;

    const resizeObserver = new ResizeObserver(entries => {
      const entry = entries[0];
      if (entry) handleResize(entry.contentRect.width);
    });

    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, [isCanvasReady, isBgImageLoaded, handleResize]);

  useLayoutEffect(() => {
    const canvas = fabricRef.current;
    if (!isCanvasReady || !canvas || !selectedImage) return;

    canvas.clear();
    bgImageRef.current = null;
    canvas.setBackgroundImage(null, canvas.renderAll.bind(canvas));
    textObjectsRef.current = {};
    imageObjectsRef.current = {};
    setIsBgImageLoaded(false);

    window.fabric.Image.fromURL(selectedImage, (img) => {
      if (!img || !fabricRef.current) {
        if (callbackRef.current.onReady) callbackRef.current.onReady();
        return;
      }
      bgImageRef.current = img;
      canvas.setBackgroundImage(img, () => {
        setIsBgImageLoaded(true);
        if (callbackRef.current.onReady) callbackRef.current.onReady();
        const container = canvasContainerRef.current;
        if (container) handleResize(container.clientWidth);
      }, { selectable: false, evented: false, originX: 'left', originY: 'top' });
    }, { crossOrigin: 'anonymous' });
  }, [selectedImage, isCanvasReady, handleResize]);

  useEffect(() => {
    if (!fabricRef.current || !isBgImageLoaded) return;
    const canvas = fabricRef.current;
    const existingIds = Object.keys(textObjectsRef.current);
    const newBoxIds = textBoxes.map(b => b.id);

    const idsToRemove = existingIds.filter(id => !newBoxIds.includes(id));
    idsToRemove.forEach(id => {
      canvas.remove(textObjectsRef.current[id]);
      delete textObjectsRef.current[id];
    });

    textBoxes.forEach(box => {
      if (!textObjectsRef.current[box.id]) {
        const textObject = new window.fabric.Textbox(box.text || 'Click to edit', {
          id: box.id,
          left: canvas.width / 2,
          top: box.top,
          width: box.width,
          fontSize: box.fontSize,
          fill: box.color,
          fontFamily: box.fontFamily,
          stroke: box.stroke,
          strokeWidth: box.strokeWidth,
          textAlign: box.align,
          scaleX: box.scaleX,
          scaleY: box.scaleY,
          angle: box.angle,
          originX: 'center',
          originY: 'center',
          borderColor: '#2B95D6',
          cornerColor: '#2B95D6',
          cornerSize: 12,
          transparentCorners: false,
          objectCaching: false,
          noScaleCache: false,
        });
        textObjectsRef.current[box.id] = textObject;
        canvas.add(textObject);
      }
    });
    canvas.renderAll();
  }, [textBoxes, isBgImageLoaded]);

  useEffect(() => {
    if (!fabricRef.current || !isBgImageLoaded) return;
    const canvas = fabricRef.current;
    const existingIds = Object.keys(imageObjectsRef.current);
    const newImageIds = images.map(img => img.id);

    const idsToRemove = existingIds.filter(id => !newImageIds.includes(id));
    idsToRemove.forEach(id => {
      if (imageObjectsRef.current[id]) {
        canvas.remove(imageObjectsRef.current[id]);
        delete imageObjectsRef.current[id];
      }
    });

    images.forEach(img => {
      if (!imageObjectsRef.current[img.id]) {
        window.fabric.Image.fromURL(img.src, (fabricImage) => {
          if (!fabricImage || !fabricRef.current) return;
          fabricImage.set({
            id: img.id,
            left: img.left,
            top: img.top,
            scaleX: img.scaleX,
            scaleY: img.scaleY,
            angle: img.angle,
            originX: 'left',
            originY: 'top',
            borderColor: '#2B95D6',
            cornerColor: '#2B95D6',
            cornerSize: 12,
            transparentCorners: false,
          });
          imageObjectsRef.current[img.id] = fabricImage;
          canvas.add(fabricImage);
          if (img.id === selectedObjectId) {
            canvas.setActiveObject(fabricImage);
          }
          canvas.renderAll();
        }, { crossOrigin: 'anonymous' });
      }
    });
  }, [images, isBgImageLoaded, selectedObjectId]);

  useEffect(() => {
    const canvas = fabricRef.current;
    if (!canvas || !isBgImageLoaded) return;

    const activeObject = canvas.getActiveObject();
    const selectedBox = textBoxes.find(box => box.id === selectedObjectId);

    if (activeObject && selectedBox && activeObject.id === selectedBox.id) {
      const propsToUpdate = {};
      if (activeObject.text !== selectedBox.text) propsToUpdate.text = selectedBox.text;
      if (activeObject.fill !== selectedBox.color) propsToUpdate.fill = selectedBox.color;
      if (activeObject.stroke !== selectedBox.stroke) propsToUpdate.stroke = selectedBox.stroke;
      if (activeObject.strokeWidth !== selectedBox.strokeWidth) propsToUpdate.strokeWidth = selectedBox.strokeWidth;
      if (activeObject.fontFamily !== selectedBox.fontFamily) propsToUpdate.fontFamily = selectedBox.fontFamily;
      if (activeObject.fontSize !== selectedBox.fontSize) propsToUpdate.fontSize = selectedBox.fontSize;
      if (activeObject.textAlign !== selectedBox.align) propsToUpdate.textAlign = selectedBox.align;

      if (Object.keys(propsToUpdate).length > 0) {
        activeObject.set(propsToUpdate);
        canvas.renderAll();
      }
    }

    const activeObjectId = activeObject ? activeObject.id : null;
    if (activeObjectId !== selectedObjectId) {
      const objectToSelect = selectedObjectId ? (textObjectsRef.current[selectedObjectId] || imageObjectsRef.current[selectedObjectId]) : null;
      if (objectToSelect) {
        canvas.setActiveObject(objectToSelect);
        canvas.renderAll();
      } else if (!selectedObjectId) {
        canvas.discardActiveObject();
        canvas.renderAll();
      }
    }
  }, [textBoxes, images, selectedObjectId, isBgImageLoaded]);

  useImperativeHandle(ref, () => ({
    handleExport: () => {
      if (!fabricRef.current) return;
      try {
        fabricRef.current.discardActiveObject();
        fabricRef.current.renderAll();
        const filename = `meme-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.png`;
        const dataURL = fabricRef.current.toDataURL({ format: 'png', quality: 1, multiplier: 2 });
        saveAs(dataURL, filename);
      } catch (error) {
        console.error('Error exporting meme:', error);
      }
    },
  }));

  return (
    <div className="relative w-full h-auto rounded-lg overflow-hidden" ref={canvasContainerRef}>
      <canvas ref={canvasRef} />
    </div>
  );
});

export default FabricCanvas;
