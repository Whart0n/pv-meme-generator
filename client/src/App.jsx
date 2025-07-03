import { useState, useEffect } from 'react';
import './App.css';
import Gallery from './components/Gallery';
import MemeCanvas from './components/MemeCanvas';

function App() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // No backend server needed, so no API connection state required
  const [textBoxes, setTextBoxes] = useState([]);
  const [selectedTextBoxId, setSelectedTextBoxId] = useState(null);
  
  // Log app state when debugging
  useEffect(() => {
    console.log('App state:', { 
      selectedTemplate, 
      isLoading,
      textBoxesCount: textBoxes.length,
      selectedTextBoxId
    });
  }, [selectedTemplate, isLoading, textBoxes.length, selectedTextBoxId]);

  // Handle template selection
  const handleSelectTemplate = (template) => {
    console.log('Template selected:', template);
    setIsLoading(true); // Show loading state
    setSelectedTemplate(template);
    setSelectedTextBoxId(null); // Clear any selected text box
    
    // Start with a single text box when selecting a new template
    // Note: we don't set x/y here - they'll be positioned after image load
    setTextBoxes([{
      id: 'text-1',
      text: 'Click to edit text',
      fontSize: 30,
      fontFamily: 'Impact',
      color: '#ffffff',
      stroke: '#000000',
      strokeWidth: 1,
      width: 200,
      align: 'center'
    }]);
    
    // Notify when template is selected for debugging
    console.log('Selected template with path:', template.src);
  };

  // Handle editor ready state
  const handleCanvasReady = () => {
    setIsLoading(false);
    console.log('MemeCanvas is ready');
  };

  // Handle text box selection
  const handleSelectTextBox = (id) => {
    setSelectedTextBoxId(id);
  };

  // Handle text box updates
  const handleUpdateTextBox = (id, newAttrs) => {
    if (!id) return;
    
    const exists = textBoxes.some(box => box.id === id);
    
    if (exists) {
      // Update existing text box
      setTextBoxes(prevBoxes => 
        prevBoxes.map(box => 
          box.id === id ? { ...box, ...newAttrs } : box
        )
      );
    } else {
      // Add new text box
      setTextBoxes(prevBoxes => [...prevBoxes, { id, ...newAttrs }]);
    }
    
    // Select the updated/added text box
    setSelectedTextBoxId(id);
  };

  // Add a new text box
  const handleAddTextBox = () => {
    const newId = `text-${Date.now()}`;
    const newTextBox = {
      id: newId,
      text: 'Click to edit text',
      fontSize: 30,
      fontFamily: 'Impact',
      color: '#ffffff',
      stroke: '#000000',
      strokeWidth: 1,
      width: 200,
      align: 'center'
    };
    
    setTextBoxes(prevBoxes => [...prevBoxes, newTextBox]);
    setSelectedTextBoxId(newId);
  };
  
  // Handle removing a text box
  const handleRemoveTextBox = (id) => {
    if (!id) return;
    
    // Remove the text box with the given id
    setTextBoxes(prevBoxes => prevBoxes.filter(box => box.id !== id));
    
    // If the removed text box was selected, clear the selection
    if (selectedTextBoxId === id) {
      setSelectedTextBoxId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <header className="mb-4 text-center">
        <h1 className="text-3xl font-bold text-gray-800">PV Meme Generator</h1>
      </header>
      
      <main className="max-w-6xl mx-auto">
        {/* Gallery Section - Always show at top */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Select a Template</h2>
          <div className="gallery-container bg-white rounded-lg p-4 shadow-md w-3/4 mx-auto">
            <Gallery 
              onSelect={handleSelectTemplate} 
              selectedTemplate={selectedTemplate}
              // No backend connection needed
              maxRows={3}
            />
          </div>
        </div>
        
        {/* Editor Section */}
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
                {/* Side-by-side layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Canvas Area - Takes 2/3 of space on desktop */}
                  <div className="md:col-span-2">
                    <MemeCanvas 
                      key={selectedTemplate.id} // Force re-render when template changes
                      selectedImage={selectedTemplate.src} 
                      textBoxes={textBoxes}
                      selectedTextBoxId={selectedTextBoxId}
                      onSelectTextBox={handleSelectTextBox}
                      onUpdateTextBox={handleUpdateTextBox}
                      onReady={handleCanvasReady}
                    />
                  </div>
                  
                  {/* Text Controls - Takes 1/3 of space */}
                  <div className="text-controls">
                    <h3 className="font-medium text-lg mb-4">Text Controls</h3>
                    
                    {/* Add Text Box Button */}
                    <button 
                      onClick={handleAddTextBox} 
                      className="w-full py-2 bg-blue-500 text-white rounded mb-4 hover:bg-blue-600">
                      Add New Text Box
                    </button>
                    
                    {selectedTextBoxId && (
                      <>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm mb-1 text-gray-700">Text Content:</label>
                            <textarea
                              className="w-full border p-2 rounded"
                              rows="3"
                              value={textBoxes.find(box => box.id === selectedTextBoxId)?.text || ''}
                              onChange={(e) => {
                                handleUpdateTextBox(selectedTextBoxId, { text: e.target.value });
                              }}
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm mb-1 text-gray-700">Font Size:</label>
                            <div className="flex items-center">
                              <input
                                type="range"
                                className="flex-grow mr-2"
                                min="10"
                                max="100"
                                value={textBoxes.find(box => box.id === selectedTextBoxId)?.fontSize || 24}
                                onChange={(e) => {
                                  handleUpdateTextBox(selectedTextBoxId, { fontSize: Number(e.target.value) });
                                }}
                              />
                              <div className="text-sm">
                                {textBoxes.find(box => box.id === selectedTextBoxId)?.fontSize || 24}px
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm mb-1 text-gray-700">Font:</label>
                            <select
                              className="w-full border p-2 rounded"
                              value={textBoxes.find(box => box.id === selectedTextBoxId)?.fontFamily || 'Impact'}
                              onChange={(e) => {
                                handleUpdateTextBox(selectedTextBoxId, { fontFamily: e.target.value });
                              }}
                            >
                              <option value="Impact">Impact</option>
                              <option value="Arial">Arial</option>
                              <option value="Helvetica">Helvetica</option>
                              <option value="Comic Sans MS">Comic Sans</option>
                            </select>
                          </div>
                          
                          <div>
                            <label className="block text-sm mb-1 text-gray-700">Text Color:</label>
                            <div className="flex flex-wrap gap-2">
                              {['#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffa500', '#800080'].map(color => (
                                <div 
                                  key={color}
                                  onClick={() => handleUpdateTextBox(selectedTextBoxId, { color })}
                                  className={`w-6 h-6 rounded cursor-pointer border ${textBoxes.find(box => box.id === selectedTextBoxId)?.color === color ? 'border-2 border-gray-800' : 'border-gray-300'}`}
                                  style={{ backgroundColor: color }}
                                />
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm mb-1 text-gray-700">Outline Color:</label>
                            <div className="flex items-center mb-2">
                              <input
                                type="checkbox"
                                className="mr-2"
                                checked={textBoxes.find(box => box.id === selectedTextBoxId)?.stroke === 'transparent'}
                                onChange={(e) => {
                                  handleUpdateTextBox(selectedTextBoxId, { 
                                    stroke: e.target.checked ? 'transparent' : '#000000',
                                    strokeWidth: e.target.checked ? 0 : 1 
                                  });
                                }}
                              />
                              <span className="text-sm">Remove outline</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {['#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffa500', '#800080'].map(color => (
                                <div 
                                  key={color}
                                  onClick={() => handleUpdateTextBox(selectedTextBoxId, { stroke: color })}
                                  className={`w-6 h-6 rounded cursor-pointer border ${textBoxes.find(box => box.id === selectedTextBoxId)?.stroke === color ? 'border-2 border-gray-800' : 'border-gray-300'}`}
                                  style={{ backgroundColor: color }}
                                />
                              ))}
                            </div>
                          </div>
                          
                          <button
                            className="bg-red-400 hover:bg-red-500 text-white font-medium py-2 px-4 rounded mt-4 w-full"
                            onClick={() => handleRemoveTextBox(selectedTextBoxId)}
                          >
                            Remove Text Box
                          </button>
                        </div>
                        
                        <div className="mt-6">
                          <h4 className="font-medium text-lg mb-2">Text Boxes</h4>
                          <div className="space-y-2">
                            {textBoxes.map(box => (
                              <div 
                                key={box.id} 
                                className={`p-2 border rounded cursor-pointer ${selectedTextBoxId === box.id ? 'bg-blue-100 border-blue-500' : 'bg-gray-50'}`}
                                onClick={() => handleSelectTextBox(box.id)}
                              >
                                {box.text || 'Click to edit text'}
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                    
                    {!selectedTextBoxId && textBoxes.length > 0 && (
                      <div className="text-center py-8 text-gray-500">
                        Select a text box to edit
                      </div>
                    )}
                    
                    {textBoxes.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        Add a text box to get started
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-500">
                <p>Select a template to start creating your meme</p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <footer className="mt-8 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} PV Meme Generator</p>
      </footer>
    </div>
  );
}

export default App;
