import React from 'react';

const FONT_FACES = ['Impact', 'Arial', 'Helvetica', 'Comic Sans MS', 'Times New Roman', 'Courier New'];
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
      <h3 className="font-medium text-lg mb-4">Controls</h3>

      <div className="space-y-2 mb-4">
        <button
          onClick={onAdd}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded w-full"
        >
          Add Text Box
        </button>
        <button
          onClick={() => imageInputRef.current?.click()}
          className="bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded w-full"
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
        <button
          onClick={onExport}
          className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded w-full"
          disabled={isLoading}
        >
          Export as PNG
        </button>
      </div>

      {isObjectSelected ? (
        selectedTextBox ? (
          <div className="space-y-4 pt-4 border-t">
            <h4 className="font-medium text-md mb-2">Edit Selected Text</h4>
            <div>
              <label className="block text-sm font-medium text-gray-700">Text</label>
              <textarea
                value={selectedTextBox.text}
                onChange={(e) => handleUpdate('text', e.target.value)}
                className="w-full border p-2 rounded mt-1 bg-white text-gray-900"
                rows="3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Font</label>
              <select
                value={selectedTextBox.fontFamily}
                onChange={(e) => handleUpdate('fontFamily', e.target.value)}
                className="w-full border p-2 rounded mt-1 bg-white text-gray-900"
              >
                {FONT_FACES.map(font => <option key={font} value={font}>{font}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Font Size</label>
              <input
                type="number"
                value={selectedTextBox.fontSize}
                onChange={(e) => handleUpdate('fontSize', parseInt(e.target.value, 10) || 10)}
                className="w-full border p-2 rounded mt-1 bg-white text-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Color</label>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                {FONT_COLORS.map(color => (
                  <div
                    key={color}
                    onClick={() => handleUpdate('color', color)}
                    className={`w-6 h-6 rounded-full cursor-pointer border-2 ${selectedTextBox.color.toLowerCase() === color.toLowerCase() ? 'border-blue-500' : 'border-transparent'}`}
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
              <label className="block text-sm font-medium text-gray-700">Alignment</label>
              <div className="flex items-center justify-between gap-2 mt-1 rounded-md bg-gray-100 p-1">
                {['left', 'center', 'right'].map((align) => (
                  <button
                    key={align}
                    onClick={() => handleUpdate('textAlign', align)}
                    className={`flex-1 py-1 px-2 text-sm rounded-md transition-colors duration-200 ${selectedTextBox.textAlign === align ? 'bg-blue-500 text-white' : 'bg-transparent text-gray-600 hover:bg-gray-200'}`}>
                    {align.charAt(0).toUpperCase() + align.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Stroke Width: {selectedTextBox.strokeWidth}</label>
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
          <div className="space-y-4 pt-4 border-t">
            <h4 className="font-medium text-md mb-2">Edit Selected Image</h4>
            <p className="text-gray-500 text-center">Resize and move the image directly on the canvas.</p>
          </div>
        )
      ) : (
        <p className="text-gray-500 mt-4 text-center">Select an object on the canvas to edit it.</p>
      )}

      {isObjectSelected && (
        <div className="pt-4 border-t">
          <button
            onClick={onRemove}
            className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded w-full"
          >
            Remove Selected Object
          </button>
        </div>
      )}
    </div>
  );
}

export default Editor;