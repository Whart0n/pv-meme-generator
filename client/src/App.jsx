import React, { useState, useRef, useEffect, useCallback } from 'react';
import './App.css';
import Gallery, { getTemplates } from './components/Gallery';
import FabricCanvas from './components/FabricCanvas';
import Editor from './components/Editor';

function App() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [templatesLoaded, setTemplatesLoaded] = useState(false);
  const [textBoxes, setTextBoxes] = useState([]);
  const [selectedTextBoxId, setSelectedTextBoxId] = useState(null);
  const fabricCanvasRef = useRef(null);

  const handleSelectTemplate = useCallback((template) => {
    setIsLoading(true);
    setSelectedTemplate(template);
    setSelectedTextBoxId(null);
    setTextBoxes([]);
  }, []);

  useEffect(() => {
    if (templatesLoaded && !selectedTemplate) {
      const templates = getTemplates();
      if (templates.length > 0) {
        handleSelectTemplate(templates[0]);
      }
    }
  }, [templatesLoaded, selectedTemplate, handleSelectTemplate]);

  const handleCanvasReady = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleTemplatesLoaded = useCallback(() => {
    setTemplatesLoaded(true);
  }, []);

  const handleSelectTextBox = useCallback((id) => {
    setSelectedTextBoxId(id);
  }, []);

  const handleUpdateTextBox = useCallback((id, updatedProperties) => {
    if (!id) return;
    setTextBoxes(prevBoxes =>
      prevBoxes.map(box =>
        box.id === id ? { ...box, ...updatedProperties } : box
      )
    );
  }, []);

  const handleAddTextBox = useCallback(() => {
    const newId = `text-${Date.now()}`;
    const newTextBox = {
      id: newId,
      text: 'Click to edit text',
      fontSize: 40,
      fontFamily: 'Impact',
      color: '#ffffff',
      stroke: '#000000',
      strokeWidth: 2,
      align: 'center',
      left: 50,
      top: 100,
      width: 250,
      scaleX: 1,
      scaleY: 1,
      angle: 0,
    };
    setTextBoxes(prevBoxes => [...prevBoxes, newTextBox]);
    setSelectedTextBoxId(newId);
  }, []);

  const handleRemoveTextBox = useCallback((id) => {
    if (!id) return;
    setTextBoxes(prev => prev.filter(box => box.id !== id));
    if (selectedTextBoxId === id) {
      setSelectedTextBoxId(null);
    }
  }, [selectedTextBoxId]);

  const selectedTextBox = textBoxes.find(box => box.id === selectedTextBoxId);

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <header className="mb-4 text-center">
          <h1 className="text-3xl font-bold text-gray-800">PV Meme Generator</h1>
        </header>
        <main className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Select a Template</h2>
            <div className="gallery-container mt-6">
              <Gallery
                onSelect={handleSelectTemplate}
                selectedTemplate={selectedTemplate}
                maxRows={3}
                onTemplatesLoaded={handleTemplatesLoaded}
              />
            </div>
          </div>
          <div className="relative">
            {isLoading && (
              <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-10 rounded-lg">
                <div className="flex flex-col items-center">
                  <div className="spinner mb-2"></div>
                  <p className="text-gray-700">Loading template...</p>
                </div>
              </div>
            )}
            <div className="bg-white rounded-lg p-4 shadow-md">
              {selectedTemplate ? (
                <div className="meme-editor">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                      <FabricCanvas
                        ref={fabricCanvasRef}
                        selectedImage={selectedTemplate.src}
                        textBoxes={textBoxes}
                        selectedTextBoxId={selectedTextBoxId}
                        onSelectTextBox={handleSelectTextBox}
                        onUpdateTextBox={handleUpdateTextBox}
                        onReady={handleCanvasReady}
                      />
                    </div>
                    <div className="text-controls">
                      <Editor
                        selectedTextBox={selectedTextBox}
                        onUpdate={handleUpdateTextBox}
                        onAdd={handleAddTextBox}
                        onRemove={handleRemoveTextBox}
                        onExport={() => fabricCanvasRef.current?.handleExport()}
                        isLoading={isLoading}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">Select a template to get started</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
