import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Stage, Layer, Image, Text, Transformer, Rect } from 'react-konva';
import { saveAs } from 'file-saver';

function MemeCanvas({ selectedImage, textBoxes = [], selectedTextBoxId, onSelectTextBox, onUpdateTextBox, onReady }) {
  const stageRef = useRef(null);
  const imageRef = useRef(null);
  const textRefs = useRef({});
  const transformerRef = useRef(null);
  const [imageObj, setImageObj] = useState(null);
  const [dimensions, setDimensions] = useState({ width: 500, height: 500 });
  const [isLoading, setIsLoading] = useState(false);

  // Function to position text boxes on the image
  const positionDefaultTextBoxes = useCallback((width, height) => {
    // Only position boxes if they don't already have custom positions
    textBoxes.forEach((box, index) => {
      if (box.x === undefined || box.y === undefined) {
        const newAttrs = {};
        
        // Position based on index - first at top, second at bottom
        if (index === 0) {
          // Top text
          newAttrs.x = width / 2 - 100;
          newAttrs.y = height * 0.1;
        } else {
          // Bottom text
          newAttrs.x = width / 2 - 100;
          newAttrs.y = height * 0.9 - 40; // Account for text height
        }
        
        // Update the text box position
        if (onUpdateTextBox) {
          onUpdateTextBox(box.id, newAttrs);
        }
      }
    });
  }, [textBoxes, onUpdateTextBox]);
  
  // Load the selected image
  useEffect(() => {
    if (!selectedImage) return;
    
    setIsLoading(true);
    console.log('Loading meme template:', selectedImage);
    
    const img = new window.Image();
    img.src = selectedImage;
    
    img.onload = () => {
      console.log('Image loaded successfully:', selectedImage);
      
      // Calculate dimensions while maintaining aspect ratio
      const maxWidth = 500;
      const maxHeight = 500;
      let width = img.width;
      let height = img.height;
      
      if (width > maxWidth) {
        const ratio = maxWidth / width;
        width = maxWidth;
        height = height * ratio;
      }
      
      if (height > maxHeight) {
        const ratio = maxHeight / height;
        height = maxHeight;
        width = width * ratio;
      }
      
      setDimensions({ width, height });
      setImageObj(img);
      setIsLoading(false);
      
      // Position text boxes after image load
      if (textBoxes.length > 0) {
        positionDefaultTextBoxes(width, height);
      }
      
      // Notify parent that canvas is ready
      if (onReady) {
        onReady();
      }
    };
    
    img.onerror = (e) => {
      console.error('Failed to load image:', selectedImage, e);
      
      // Show a placeholder for the failed image
      const placeholderWidth = 500;
      const placeholderHeight = 400;
      setDimensions({ width: placeholderWidth, height: placeholderHeight });
      setImageObj(null);
      setIsLoading(false);
      
      // Notify parent that canvas is ready even if image failed to load
      if (onReady) {
        onReady();
      }
    };
  }, [selectedImage, positionDefaultTextBoxes, textBoxes.length, onReady]);

  // Update transformer when selected text box changes
  useEffect(() => {
    if (!transformerRef.current) return;
    
    if (selectedTextBoxId && textRefs.current[selectedTextBoxId]) {
      transformerRef.current.nodes([textRefs.current[selectedTextBoxId]]);
      transformerRef.current.getLayer().batchDraw();
    } else {
      transformerRef.current.nodes([]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [selectedTextBoxId, textBoxes]);

  // Handle text box selection
  const handleTextBoxSelect = (id) => {
    if (onSelectTextBox) {
      onSelectTextBox(id);
    }
  };

  // Handle stage click (deselect when clicking on empty area)
  const handleStageClick = (e) => {
    if (e.target === e.currentTarget) {
      if (onSelectTextBox) {
        onSelectTextBox(null);
      }
    }
  };

  // Handle text box transformation
  const handleTextBoxTransform = (id, newAttrs) => {
    if (onUpdateTextBox) {
      onUpdateTextBox(id, newAttrs);
    }
  };

  // Handle exporting the meme as an image
  const handleExport = () => {
    if (!stageRef.current) return;
    
    try {
      // Hide transformer during export
      const transformer = transformerRef.current;
      if (transformer) {
        transformer.visible(false);
        transformer.getLayer().batchDraw();
      }
      
      // Get the data URL from the stage
      const dataURL = stageRef.current.toDataURL({
        pixelRatio: 2,
        mimeType: 'image/png'
      });
      
      // Generate filename based on current date/time
      const filename = `meme-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.png`;
      
      // Use file-saver to save the image
      saveAs(dataURL, filename);
      
      // Show transformer again
      if (transformer) {
        transformer.visible(true);
        transformer.getLayer().batchDraw();
      }
      
      console.log('Meme exported successfully');
    } catch (error) {
      console.error('Error exporting meme:', error);
    }
  };

  return (
    <div className="meme-canvas-container">
      {isLoading ? (
        <div className="loading-message flex items-center justify-center h-64">
          <div className="loading-spinner mr-2"></div>
          <p>Loading image...</p>
        </div>
      ) : selectedImage ? (
        <>
          <div className="canvas-wrapper border border-gray-300 rounded mb-4">
            <Stage 
              width={dimensions.width} 
              height={dimensions.height} 
              ref={stageRef}
              onClick={handleStageClick}
              onTap={handleStageClick}
            >
              <Layer>
                {imageObj ? (
                  <Image
                    image={imageObj}
                    width={dimensions.width}
                    height={dimensions.height}
                    ref={imageRef}
                  />
                ) : (
                  // Render a placeholder if image failed to load
                  <>
                    <Rect
                      width={dimensions.width}
                      height={dimensions.height}
                      fill="#f0f0f0"
                    />
                    <Text
                      text="Failed to load image"
                      x={dimensions.width / 2 - 75}
                      y={dimensions.height / 2}
                      fontSize={16}
                      fill="#666666"
                    />
                  </>
                )}
                
                {textBoxes.map((box) => (
                  <Text
                    key={box.id}
                    id={box.id}
                    text={box.text || 'Click to edit text'}
                    x={box.x !== undefined ? box.x : dimensions.width / 2 - 75}
                    y={box.y !== undefined ? box.y : dimensions.height / 2}
                    fontSize={box.fontSize || 30}
                    fontFamily={box.fontFamily || 'Impact'}
                    fill={box.color || '#ffffff'}
                    stroke={box.stroke || '#000000'}
                    strokeWidth={box.strokeWidth || 1}
                    width={box.width || 200}
                    align="center"
                    draggable
                    onClick={() => handleTextBoxSelect(box.id)}
                    onTap={() => handleTextBoxSelect(box.id)}
                    onDragEnd={(e) => {
                      handleTextBoxTransform(box.id, {
                        x: e.target.x(),
                        y: e.target.y(),
                      });
                    }}
                    onTransform={(e) => {
                      const node = e.target;
                      const scaleX = node.scaleX();
                      const scaleY = node.scaleY();
                      
                      handleTextBoxTransform(box.id, {
                        x: node.x(),
                        y: node.y(),
                        width: node.width() * scaleX,
                        rotation: node.rotation(),
                      });
                      
                      // Reset scale to prevent compounding
                      node.scaleX(1);
                      node.scaleY(1);
                    }}
                    ref={(node) => {
                      textRefs.current[box.id] = node;
                    }}
                  />
                ))}
                
                <Transformer
                  ref={transformerRef}
                  boundBoxFunc={(oldBox, newBox) => {
                    // Limit resize to within stage bounds
                    if (newBox.width < 10 || newBox.height < 10) {
                      return oldBox;
                    }
                    return newBox;
                  }}
                  enabledAnchors={['middle-left', 'middle-right']}
                  // Only allow horizontal scaling
                  keepRatio={false}
                />
              </Layer>
            </Stage>
          </div>
          
          <div className="canvas-actions flex justify-between">
            <button 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleExport}
            >
              Export PNG
            </button>
            
            <button 
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                if (onUpdateTextBox) {
                  const id = `text-${Date.now()}`;
                  onUpdateTextBox(id, {
                    id,
                    text: 'Click to edit text',
                    x: dimensions.width / 2 - 100,
                    y: dimensions.height / 2,
                    fontSize: 30,
                    fontFamily: 'Impact',
                    color: '#ffffff',
                    stroke: '#000000',
                    strokeWidth: 1,
                    width: 200,
                    align: 'center'
                  });
                }
              }}
            >
              Add New Text
            </button>
          </div>
        </>
      ) : (
        <div className="no-image-selected bg-gray-100 p-8 text-center rounded-lg">
          <p className="text-gray-500">Select a template to start creating your meme</p>
        </div>
      )}
    </div>
  );
}

export default MemeCanvas;
