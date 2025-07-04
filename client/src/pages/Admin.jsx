import React, { useState, useEffect } from 'react';
import { database } from '../firebase';
import { ref, push, onValue, remove } from 'firebase/database';

const Admin = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    const templatesRef = ref(database, 'templates');
    const unsubscribe = onValue(templatesRef, (snapshot) => {
      const data = snapshot.val();
      const templatesList = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
      setTemplates(templatesList);
    });

    return () => unsubscribe();
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Image = event.target.result;
        const templatesRef = ref(database, 'templates');
        push(templatesRef, { name: selectedFile.name, url: base64Image });
        alert('Template uploaded successfully!');
        setSelectedFile(null);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleDelete = (templateId) => {
    const templateRef = ref(database, `templates/${templateId}`);
    remove(templateRef);
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
        <h2 className="text-xl font-bold mb-4">Manage Templates</h2>
        {templates.length > 0 ? (
          <ul className="bg-white p-6 rounded-lg shadow-lg">
            {templates.map((template) => (
              <li key={template.id} className="flex justify-between items-center py-2 border-b">
                <span>{template.name}</span>
                <button
                  onClick={() => handleDelete(template.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No templates found.</p>
        )}
      </div>
    </div>
  );
};

export default Admin;
