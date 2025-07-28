import React, { useState, useEffect } from 'react';
import { database, auth } from '../firebase';
import { ref, push, onValue, remove } from 'firebase/database';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

const Admin = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [templates, setTemplates] = useState([]);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (user) {
      const templatesRef = ref(database, 'templates');
      const unsubscribe = onValue(templatesRef, (snapshot) => {
        const data = snapshot.val();
        const templatesList = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
        setTemplates(templatesList);
      });
      return () => unsubscribe();
    }
  }, [user]);

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

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError("Login failed: " + (err.message || err.code));
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-80">
          <h2 className="text-xl font-bold mb-4 text-center">Admin Login</h2>
          {error && <div className="text-red-500 mb-2">{error}</div>}
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full mb-2 p-2 border rounded"
            required
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full mb-4 p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Upload New Meme Template</h1>
        <button
          onClick={handleLogout}
          className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
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
