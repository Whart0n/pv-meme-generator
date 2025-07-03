import React, { useEffect, useLayoutEffect, useRef, useState, forwardRef, useImperativeHandle, useCallback } from 'react';
import { saveAs } from 'file-saver';

const FabricCanvas = forwardRef((props, ref) => {
  const { selectedImage, textBoxes = [], selectedTextBoxId, onSelectTextBox, onUpdateTextBox, onReady } = props;
  const canvasRef = useRef(null);
  const fabricRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const textObjectsRef = useRef({});
  const bgImageRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isBgImageLoaded, setIsBgImageLoaded] = useState(false);
  const [isCanvasReady, setIsCanvasReady] = useState(false);

  const callbackRef = useRef();
  useEffect(() => {
    callbackRef.current = { onSelectTextBox, onUpdateTextBox, onReady };
  });

  const handleResize = useCallback((containerWidth) => {
    const canvas = fabricRef.current;
    const bgImage = bgImageRef.current;
    if (!canvas || !bgImage || containerWidth === 0) return;

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

    canvas.on('selection:created', (e) => callbackRef.current.onSelectTextBox(e.selected?.[0]?.id));
    canvas.on('selection:cleared', () => callbackRef.current.onSelectTextBox(null));
    canvas.on('object:modified', (e) => {
      const obj = e.target;
      if (obj?.id) {
        callbackRef.current.onUpdateTextBox(obj.id, { left: obj.left, top: obj.top, scaleX: obj.scaleX, scaleY: obj.scaleY, angle: obj.angle });
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
    if (!container || !isCanvasReady) return;

    const resizeObserver = new ResizeObserver(entries => {
      const entry = entries[0];
      if (entry) handleResize(entry.contentRect.width);
    });

    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, [isCanvasReady, handleResize]);

  useLayoutEffect(() => {
    const canvas = fabricRef.current;
    if (!isCanvasReady || !canvas || !selectedImage) return;

    canvas.clear();
    bgImageRef.current = null;
    canvas.setBackgroundImage(null, canvas.renderAll.bind(canvas));
    textObjectsRef.current = {};
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
    const canvas = fabricRef.current;
    if (!canvas || !isBgImageLoaded) return;

    const activeObject = canvas.getActiveObject();
    const selectedBox = textBoxes.find(box => box.id === selectedTextBoxId);

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
    if (activeObjectId !== selectedTextBoxId) {
      const objectToSelect = selectedTextBoxId ? textObjectsRef.current[selectedTextBoxId] : null;
      canvas.setActiveObject(objectToSelect || null);
      canvas.renderAll();
    }
  }, [textBoxes, selectedTextBoxId, isBgImageLoaded]);

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
