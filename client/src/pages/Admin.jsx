import React, { useState, useEffect, useCallback } from 'react';

const Admin = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [localTemplates, setLocalTemplates] = useState([]);

  const loadTemplates = useCallback(() => {
    const templates = JSON.parse(localStorage.getItem('memeTemplates') || '[]');
    setLocalTemplates(templates);
  }, []);

  useEffect(() => {
    loadTemplates();
  }, [loadTemplates]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Image = event.target.result;
        const templates = JSON.parse(localStorage.getItem('memeTemplates') || '[]');
        templates.push({ name: selectedFile.name, url: base64Image });
        localStorage.setItem('memeTemplates', JSON.stringify(templates));
        alert('Template uploaded successfully!');
        setSelectedFile(null);
        loadTemplates(); // Refresh the list
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleDelete = (templateNameToDelete) => {
    const templates = JSON.parse(localStorage.getItem('memeTemplates') || '[]');
    const updatedTemplates = templates.filter(template => template.name !== templateNameToDelete);
    localStorage.setItem('memeTemplates', JSON.stringify(updatedTemplates));
    loadTemplates(); // Refresh the list
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Upload New Meme Template</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <input type="file" onChange={handleFileChange} className="mb-4" />
        <button
          onClick={handleUpload}
          disabled={!selectedFile}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400"
        >
          Upload Template
        </button>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Manage Local Templates</h2>
        {localTemplates.length > 0 ? (
          <ul className="bg-white p-6 rounded-lg shadow-lg">
            {localTemplates.map((template, index) => (
              <li key={index} className="flex justify-between items-center py-2 border-b">
                <span>{template.name}</span>
                <button
                  onClick={() => handleDelete(template.name)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No local templates found.</p>
        )}
      </div>
    </div>
  );
};

export default Admin;
