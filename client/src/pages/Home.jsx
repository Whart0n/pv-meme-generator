import React, { useState, useRef, useEffect, useCallback } from 'react';
import '../App.css';
import Gallery from '../components/Gallery';
import FabricCanvas from '../components/FabricCanvas';
import Editor from '../components/Editor';
import { saveAs } from 'file-saver';
import logoImg from '../assets/logo/logo.png';

function Home() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [textBoxes, setTextBoxes] = useState([]);
  const [images, setImages] = useState([]);
  const [selectedObjectId, setSelectedObjectId] = useState(null);
  const fabricCanvasRef = useRef(null);

  const handleSelectTemplate = useCallback((template) => {
    setIsLoading(true);
    setSelectedTemplate(template);
    setTextBoxes([]);
    setImages([]);
    setSelectedObjectId(null);
  }, []);

  const handleTemplatesLoaded = useCallback((templates) => {
    if (templates.length > 0) {
      handleSelectTemplate(templates[0]);
    }
  }, [handleSelectTemplate]);

  const handleCanvasReady = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleAddTextBox = () => {
    const newTextBox = {
      id: `text-${Date.now()}`,
      text: 'Sample Text',
      fontFamily: 'Impact',
      fontSize: 40,
      color: '#FFFFFF',
      stroke: '#000000',
      strokeWidth: 2,
      textAlign: 'left',
      left: 50,
      top: 50,
      width: 200,
      height: 100,
      angle: 0,
      scaleX: 1,
      scaleY: 1,
    };
    setTextBoxes(prev => [...prev, newTextBox]);
    setSelectedObjectId(newTextBox.id);
  };

  const handleAddImage = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const newImage = {
        id: `image-${Date.now()}`,
        src: e.target.result,
        left: 50,
        top: 50,
        scaleX: 0.5,
        scaleY: 0.5,
        angle: 0,
      };
      setImages(prev => [...prev, newImage]);
      setSelectedObjectId(newImage.id);
    };
    reader.readAsDataURL(file);
  };

  const handleUpdateObject = useCallback((id, properties) => {
    setTextBoxes(prev => prev.map(box => box.id === id ? { ...box, ...properties } : box));
    setImages(prev => prev.map(img => img.id === id ? { ...img, ...properties } : img));
  }, []);

  const handleSelectObject = useCallback((id) => {
    setSelectedObjectId(id);
  }, []);

  const handleRemoveSelectedObject = () => {
    if (selectedObjectId) {
      setTextBoxes(prev => prev.filter(box => box.id !== selectedObjectId));
      setImages(prev => prev.filter(img => img.id !== selectedObjectId));
      setSelectedObjectId(null);
    }
  };

  const handleExport = () => {
    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.handleExport();
    }
  };

  const selectedObject = [...textBoxes, ...images].find(obj => obj.id === selectedObjectId);
  const selectedTextBox = selectedObject && selectedObject.text !== undefined ? selectedObject : null;

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gray-800 text-white p-4 shadow-md">
        <div className="flex items-center justify-center space-x-3">
          <img src={logoImg} alt="2.0 Logo" className="h-10 w-10" />
          <h1 className="text-3xl font-bold">PV Meme Generator</h1>
        </div>
      </header>

      <main className="p-4 md:p-6">
        <div className="container mx-auto">
          <div className="bg-white rounded-lg p-4 shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">1. Select a Template <span className="text-base text-gray-400">(scroll to see more)</span> <svg className="inline-block w-5 h-5 text-gray-400 animate-bounce" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></h2>
            <Gallery
              onSelect={handleSelectTemplate}
              selectedTemplate={selectedTemplate}
              onTemplatesLoaded={handleTemplatesLoaded}
            />
          </div>

          <div className="bg-white rounded-lg p-4 shadow-md">
            <h2 className="text-xl font-semibold mb-4">2. Customize Your Meme</h2>
            <div className="relative min-h-[400px]">
              {isLoading && (
                <div className="absolute inset-0 flex flex-col justify-center items-center bg-white bg-opacity-80 z-10 rounded-lg">
                  <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32 mb-4"></div>
                  <p className="text-gray-700 text-lg">Loading template...</p>
                </div>
              )}
              <div className={`meme-editor-container ${isLoading && !selectedTemplate ? 'invisible' : ''}`}>
                {selectedTemplate ? (
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                    <div className="md:col-span-3">
                      <FabricCanvas
                        ref={fabricCanvasRef}
                        templateUrl={selectedTemplate.src}
                        textBoxes={textBoxes}
                        images={images}
                        selectedObjectId={selectedObjectId}
                        onReady={handleCanvasReady}
                        onUpdateObject={handleUpdateObject}
                        onSelectObject={handleSelectObject}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Editor
                        selectedTextBox={selectedTextBox}
                        isObjectSelected={!!selectedObjectId}
                        onUpdate={handleUpdateObject}
                        onAdd={handleAddTextBox}
                        onRemove={handleRemoveSelectedObject}
                        onExport={handleExport}
                        isLoading={isLoading}
                        onAddImage={handleAddImage}
                      />
                    </div>
                  </div>
                ) : (
                  <p className="text-center text-gray-500 py-16">Please select a template to start.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
