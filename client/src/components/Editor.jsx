import { useEffect, useRef, useState } from 'react';
import { ChromePicker } from 'react-color';
import * as fabric from 'fabric';
import html2canvas from 'html2canvas';

export default function Editor({ src, onReady }) {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [activeObj, setActiveObj] = useState(null);
  const [showColor, setShowColor] = useState(false);
  const [textBoxes, setTextBoxes] = useState([]);

  // Initialize fabric canvas
  useEffect(() => {
    const c = new fabric.Canvas('meme-canvas', {
      preserveObjectStacking: true,
    });
    setCanvas(c);
    return () => c.dispose();
  }, []);

  // Load background image when canvas ready
  useEffect(() => {
    if (!canvas) return;
    
    console.log('Loading image from:', src);
    
    // Create a placeholder if loading fails
    const createPlaceholder = () => {
      console.log('Creating placeholder canvas');
      canvas.setWidth(600);
      canvas.setHeight(400);
      canvas.setBackgroundColor('#f0f0f0', () => {
        // Add text showing error
        const text = new fabric.Text('Image failed to load', {
          left: 150,
          top: 150,
          fontFamily: 'Arial',
          fontSize: 20,
          fill: '#666666'
        });
        canvas.add(text);
        canvas.renderAll();
        
        // Notify parent component that placeholder is ready
        if (onReady) onReady();
      });
    };
    
    // Use the source URL directly
    const imageUrl = src;
    console.log('Using image URL:', imageUrl);
    
    // Create a regular image element first to preload
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      console.log('Image loaded successfully, creating fabric image');
      
      // Now create the fabric image from the loaded image
      const fabricImg = new fabric.Image(img, {
        originX: 'left',
        originY: 'top'
      });
      
      // Calculate scale to fit within 600px max dimension
      const scale = 600 / Math.max(img.width, img.height);
      fabricImg.scale(scale);
      
      // Set canvas dimensions
      canvas.setWidth(img.width * scale);
      canvas.setHeight(img.height * scale);
      
      // Set as background image
      canvas.setBackgroundImage(fabricImg, () => {
        canvas.renderAll();
        // Notify parent component that image is loaded
        if (onReady) onReady();
      });
    };
    
    img.onerror = () => {
      console.error('Error loading image:', imageUrl);
      createPlaceholder();
    };
    
    // Start loading the image
    img.src = imageUrl;
  }, [canvas, src, onReady]);

  // Track active object
  useEffect(() => {
    if (!canvas) return;
    const handler = () => setActiveObj(canvas.getActiveObject());
    canvas.on('selection:created', handler);
    canvas.on('selection:updated', handler);
    canvas.on('selection:cleared', () => setActiveObj(null));
    return () => {
      canvas.off('selection:created', handler);
      canvas.off('selection:updated', handler);
      canvas.off('selection:cleared');
    };
  }, [canvas]);

  function addTextBox() {
    if (!canvas) return;
    const textbox = new fabric.Textbox('Text', {
      left: 50,
      top: 50,
      width: 200,
      fontFamily: 'Impact',
      fontSize: 32,
      fill: '#ffffff',
      stroke: '#000000',
      strokeWidth: 1,
      editable: true,
      borderColor: '#38bdf8', // tailwind sky-400
      cornerColor: '#38bdf8',
      cornerSize: 8,
    });
    canvas.add(textbox).setActiveObject(textbox).renderAll();
    
    // Track text boxes for UI
    const newBox = { id: Date.now(), text: 'Text' };
    setTextBoxes(prev => [...prev, newBox]);
    
    return textbox;
  }

  function updateActive(prop, value) {
    if (!activeObj) return;
    activeObj.set(prop, value);
    canvas.renderAll();
  }

  async function exportPNG() {
    const canvasEl = document.getElementById('meme-canvas');
    const dataUrl = (canvasEl.toDataURL) ? canvasEl.toDataURL('image/png') : (await html2canvas(canvasEl)).toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'meme.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-6 rounded-lg shadow-sm">
      {/* Canvas Area - Takes 2/3 of space on desktop */}
      <div className="md:col-span-2">
        <div className="relative">
          <canvas id="meme-canvas" ref={canvasRef} className="mx-auto"></canvas>
          <div className="absolute bottom-2 right-2">
            <button 
              onClick={exportPNG} 
              className="px-3 py-1 bg-indigo-600 text-white text-sm rounded shadow">
              Screenshot
            </button>
          </div>
        </div>
        <div className="flex justify-end mb-4">
          <button
            className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded"
            onClick={exportPNG}
          >
            Export PNG
          </button>
        </div>
      </div>

      {/* Text Controls - Takes 1/3 of space */}
      <div className="text-controls">
        <h3 className="font-medium text-lg mb-4">Text Controls</h3>
        
        {/* Add Text Box Button */}
        <button 
          onClick={addTextBox} 
          className="w-full py-2 bg-blue-500 text-white rounded mb-4 hover:bg-blue-600">
          Add New Text Box
        </button>
        
        {/* Text Box Properties */}
        {activeObj ? (
          <div className="space-y-3">
            <div>
              <label className="block text-sm mb-1 text-gray-700">Text</label>
              <textarea
                className="w-full border p-2 rounded"
                rows="2"
                value={activeObj.text}
                onChange={(e) => updateActive('text', e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm mb-1 text-gray-700">Font Size</label>
              <input
                type="range"
                className="w-full"
                min="10"
                max="100"
                value={activeObj.fontSize}
                onChange={(e) => updateActive('fontSize', parseInt(e.target.value, 10))}
              />
              <div className="text-right text-xs text-gray-500">{activeObj.fontSize}px</div>
            </div>
            
            <div>
              <label className="block text-sm mb-1 text-gray-700">Font Family</label>
              <select
                className="w-full border p-2 rounded"
                value={activeObj.fontFamily}
                onChange={(e) => updateActive('fontFamily', e.target.value)}
              >
                <option value="Impact">Impact</option>
                <option value="Arial">Arial</option>
                <option value="Helvetica">Helvetica</option>
                <option value="Comic Sans MS">Comic Sans</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm mb-1 text-gray-700">Text Color</label>
              <div className="flex items-center">
                <div
                  className="w-8 h-8 border rounded mr-2 cursor-pointer"
                  style={{ background: activeObj.fill }}
                  onClick={() => setShowColor((v) => !v)}
                />
                <span className="text-sm">{activeObj.fill}</span>
              </div>
              {showColor && (
                <div className="mt-2">
                  <ChromePicker
                    color={activeObj.fill}
                    onChange={(color) => updateActive('fill', color.hex)}
                    disableAlpha
                  />
                </div>
              )}
            </div>
            
            <div>
              <label className="block text-sm mb-1 text-gray-700">Outline</label>
              <select
                className="w-full border p-2 rounded"
                value={activeObj.stroke === '#000000' ? 'black' : activeObj.stroke === '#ffffff' ? 'white' : 'none'}
                onChange={(e) => {
                  const value = e.target.value;
                  updateActive('stroke', value === 'none' ? null : value === 'black' ? '#000000' : '#ffffff');
                  updateActive('strokeWidth', value === 'none' ? 0 : 1);
                }}
              >
                <option value="none">None</option>
                <option value="black">Black</option>
                <option value="white">White</option>
              </select>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            Add a text box or select an existing one to edit
          </div>
        )}
      </div>
    </div>
  );
}
