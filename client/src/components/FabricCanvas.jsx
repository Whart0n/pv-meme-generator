import React, { useEffect, useLayoutEffect, useRef, useState, forwardRef, useImperativeHandle, useCallback } from 'react';
import { saveAs } from 'file-saver';

const FabricCanvas = forwardRef((props, ref) => {
  const { templateUrl, textBoxes = [], images = [], selectedObjectId, onUpdateObject, onSelectObject, onReady } = props;
  const canvasRef = useRef(null);
  const fabricRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const bgImageRef = useRef(null);

  // Initialize canvas and event listeners
  useEffect(() => {
    const canvas = new window.fabric.Canvas(canvasRef.current, { backgroundColor: '#f8f9fa', preserveObjectStacking: true });
    fabricRef.current = canvas;

    const handleModified = (e) => {
      const obj = e.target;
      if (!obj || !onUpdateObject) return;
      const newProps = { left: obj.left, top: obj.top, scaleX: obj.scaleX, scaleY: obj.scaleY, angle: obj.angle };
      if (obj.type === 'textbox') newProps.text = obj.text;
      onUpdateObject(obj.id, newProps);
    };

    const handleSelection = (e) => onSelectObject(e.selected?.[0]?.id || null);

    canvas.on({ 'object:modified': handleModified, 'selection:created': handleSelection, 'selection:updated': handleSelection, 'selection:cleared': () => onSelectObject(null) });

    return () => canvas.dispose();
  }, [onUpdateObject, onSelectObject]);

  // Handle template loading
  useEffect(() => {
    const canvas = fabricRef.current;
    if (!canvas || !templateUrl) return;

    canvas.clear();
    canvas.setBackgroundImage(null, canvas.renderAll.bind(canvas));
    bgImageRef.current = null;

    window.fabric.Image.fromURL(templateUrl, (img) => {
      bgImageRef.current = img;
      const container = canvasContainerRef.current;
      const scale = container ? container.clientWidth / img.width : 1;
      canvas.setDimensions({ width: img.width * scale, height: img.height * scale });
      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), { scaleX: scale, scaleY: scale, originX: 'left', originY: 'top', selectable: false, evented: false });
      if (onReady) onReady();
    }, { crossOrigin: 'anonymous' });
  }, [templateUrl, onReady]);

  // Handle canvas resizing
  useEffect(() => {
    const canvas = fabricRef.current;
    const container = canvasContainerRef.current;
    if (!canvas || !container) return;

    const resizeObserver = new ResizeObserver(() => {
      const bgImage = bgImageRef.current;
      if (bgImage) {
        const scale = container.clientWidth / bgImage.width;
        canvas.setDimensions({ width: container.clientWidth, height: bgImage.height * scale });
        bgImage.set({ scaleX: scale, scaleY: scale });
        canvas.renderAll();
      }
    });
    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, []);

  // Sync objects (text and images)
  useEffect(() => {
    const canvas = fabricRef.current;
    if (!canvas) return;

    const allObjectProps = [...textBoxes, ...images];
    const existingIds = canvas.getObjects().filter(o => o.id).map(o => o.id);
    const newIds = allObjectProps.map(o => o.id);

    // Remove objects that are no longer in props
    existingIds.filter(id => !newIds.includes(id)).forEach(id => {
      const objToRemove = canvas.getObjects().find(o => o.id === id);
      if (objToRemove) canvas.remove(objToRemove);
    });

    // Add or update objects
    allObjectProps.forEach(obj => {
      const existingObject = canvas.getObjects().find(o => o.id === obj.id);
      if (existingObject) {
        const propsToUpdate = {};
        // Text-specific properties
        if (obj.text !== undefined) {
          if (existingObject.text !== obj.text) propsToUpdate.text = obj.text;
          if (existingObject.fontFamily !== obj.fontFamily) propsToUpdate.fontFamily = obj.fontFamily;
          if (existingObject.fontSize !== obj.fontSize) propsToUpdate.fontSize = obj.fontSize;
          if (existingObject.fill !== obj.color) propsToUpdate.fill = obj.color;
          if (existingObject.stroke !== obj.stroke) propsToUpdate.stroke = obj.stroke;
          if (existingObject.strokeWidth !== obj.strokeWidth) propsToUpdate.strokeWidth = obj.strokeWidth;
          if (existingObject.textAlign !== obj.textAlign) propsToUpdate.textAlign = obj.textAlign;
        }
        
        if (Object.keys(propsToUpdate).length > 0) {
          existingObject.set(propsToUpdate);
        }
      } else {
        // Create new object
        if (obj.text !== undefined) { // It's a textbox
          const { color, ...restOfObj } = obj;
          const text = new window.fabric.Textbox(obj.text, { 
            ...restOfObj, 
            fill: color, 
            borderColor: '#2B95D6', 
            cornerColor: '#2B95D6' 
          });
          canvas.add(text);
        } else { // It's an image
          window.fabric.Image.fromURL(obj.src, (img) => {
            img.set({ ...obj, borderColor: '#2B95D6', cornerColor: '#2B95D6' });
            canvas.add(img);
          }, { crossOrigin: 'anonymous' });
        }
      }
    });
    canvas.renderAll();
  }, [textBoxes, images]);

  // Sync selected object
  useEffect(() => {
    const canvas = fabricRef.current;
    if (!canvas) return;
    const activeId = canvas.getActiveObject()?.id;
    if (activeId !== selectedObjectId) {
      const objectToSelect = canvas.getObjects().find(o => o.id === selectedObjectId);
      if (objectToSelect) canvas.setActiveObject(objectToSelect);
      else canvas.discardActiveObject();
      canvas.renderAll();
    }
  }, [selectedObjectId]);


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
