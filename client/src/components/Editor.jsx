import React from 'react';

const FONT_FACES = [
  // Classic Meme Fonts
  'Impact',
  'Arial Black',
  'Arial',
  'Helvetica',
  'Comic Sans MS',
  
  // Popular Sans-Serif Fonts
  'Montserrat',
  'Open Sans',
  'Roboto',
  'Lato',
  'Source Sans Pro',
  'Nunito',
  'Poppins',
  'Oswald',
  'Raleway',
  'Ubuntu',
  'Merriweather Sans',
  'PT Sans',
  'Dosis',
  'Cabin',
  'Quicksand',
  
  // Serif Fonts
  'Times New Roman',
  'Times',
  'Georgia',
  'Merriweather',
  'Playfair Display',
  'Lora',
  'PT Serif',
  'Crimson Text',
  'Libre Baskerville',
  
  // Monospace Fonts
  'Courier New',
  'Monaco',
  'Consolas',
  'Source Code Pro',
  'Roboto Mono',
  'Inconsolata',
  
  // Display/Decorative Fonts
  'Bebas Neue',
  'Anton',
  'Righteous',
  'Fredoka One',
  'Bangers',
  'Creepster',
  'Bungee',
  'Permanent Marker',
  'Kalam',
  'Architects Daughter',
  'Amatic SC',
  'Indie Flower',
  'Shadows Into Light',
  'Dancing Script',
  'Pacifico',
  'Lobster',
  'Great Vibes',
  
  // System Fonts
  'Arial Narrow',
  'Trebuchet MS',
  'Verdana',
  'Tahoma',
  'Century Gothic',
  'Franklin Gothic Medium',
  'Lucida Console',
  'Palatino',
  'Book Antiqua',
  'MS Sans Serif'
];
const FONT_COLORS = ['#FFFFFF', '#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];

function Editor({ selectedTextBox, isObjectSelected, onUpdate, onAdd, onRemove, onExport, isLoading, onAddImage }) {
  const imageInputRef = React.useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      onAddImage(file);
    }
    e.target.value = null; 
  };

  const handleUpdate = (prop, value) => {
    if (selectedTextBox) {
      onUpdate(selectedTextBox.id, { [prop]: value });
    }
  };

  return (
    <div>
      <h3 className="font-medium text-lg mb-4 text-gray-900 dark:text-white">Controls</h3>

      <div className="space-y-2 mb-4">
        <button
          onClick={onAdd}
          className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-medium py-2 px-4 rounded w-full"
        >
          Add Text Box
        </button>
        <button
          onClick={() => imageInputRef.current?.click()}
          className="bg-purple-500 hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-700 text-white font-medium py-2 px-4 rounded w-full"
        >
          Add Image
        </button>
        <input
          type="file"
          ref={imageInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleImageUpload}
        />

      </div>

      {isObjectSelected ? (
        selectedTextBox ? (
          <div className="space-y-4 pt-4 border-t dark:border-gray-600">
            <h4 className="font-medium text-md mb-2 text-gray-900 dark:text-white">Edit Selected Text</h4>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Text</label>
              <textarea
                value={selectedTextBox.text}
                onChange={(e) => handleUpdate('text', e.target.value)}
                className="w-full border p-2 rounded mt-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 dark:border-gray-600"
                rows="3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Font</label>
              <select
                value={selectedTextBox.fontFamily}
                onChange={(e) => handleUpdate('fontFamily', e.target.value)}
                className="w-full border p-2 rounded mt-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 dark:border-gray-600"
                style={{ fontFamily: selectedTextBox.fontFamily }}
              >
                {FONT_FACES.map(font => (
                  <option 
                    key={font} 
                    value={font} 
                    style={{ fontFamily: font }}
                  >
                    {font}
                  </option>
                ))}
              </select>
              <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Preview: <span style={{ fontFamily: selectedTextBox.fontFamily, fontSize: '14px', fontWeight: 'bold' }}>Sample Text</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Font Size</label>
              <input
                type="number"
                value={selectedTextBox.fontSize}
                onChange={(e) => handleUpdate('fontSize', parseInt(e.target.value, 10) || 10)}
                className="w-full border p-2 rounded mt-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 dark:border-gray-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Color</label>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                {FONT_COLORS.map(color => (
                  <div
                    key={color}
                    onClick={() => handleUpdate('color', color)}
                    className={`w-6 h-6 rounded-full cursor-pointer border-2 ${selectedTextBox.color.toLowerCase() === color.toLowerCase() ? 'border-blue-500 dark:border-blue-400' : 'border-transparent'}`}
                    style={{ backgroundColor: color }}
                  />
                ))}
                <input
                  type="color"
                  value={selectedTextBox.color}
                  onChange={(e) => handleUpdate('color', e.target.value)}
                  className="w-8 h-8 p-0 border-none rounded-full cursor-pointer bg-transparent"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Alignment</label>
              <div className="flex items-center justify-between gap-2 mt-1 rounded-md bg-gray-100 dark:bg-gray-700 p-1">
                {['left', 'center', 'right'].map((align) => (
                  <button
                    key={align}
                    onClick={() => handleUpdate('textAlign', align)}
                    className={`flex-1 py-1 px-2 text-sm rounded-md transition-colors duration-200 ${selectedTextBox.textAlign === align ? 'bg-blue-500 text-white' : 'bg-transparent text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-600'}`}>
                    {align.charAt(0).toUpperCase() + align.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Stroke Width: {selectedTextBox.strokeWidth}</label>
              <input
                type="range"
                min="0"
                max="10"
                step="0.5"
                value={selectedTextBox.strokeWidth}
                onChange={(e) => handleUpdate('strokeWidth', parseFloat(e.target.value))}
                className="w-full mt-1"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4 pt-4 border-t dark:border-gray-600">
            <h4 className="font-medium text-md mb-2 text-gray-900 dark:text-white">Edit Selected Image</h4>
            <p className="text-gray-500 dark:text-gray-400 text-center">Resize and move the image directly on the canvas.</p>
          </div>
        )
      ) : (
        <p className="text-gray-500 dark:text-gray-400 mt-4 text-center">Select an object on the canvas to edit it.</p>
      )}

      {isObjectSelected && (
        <div className="pt-4 border-t dark:border-gray-600">
          <button
            onClick={onRemove}
            className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white font-medium py-2 px-4 rounded w-full"
          >
            Remove Selected Object
          </button>
        </div>
      )}
    </div>
  );
}

export default Editor;