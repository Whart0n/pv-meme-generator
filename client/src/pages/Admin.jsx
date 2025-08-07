import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { database, auth } from '../firebase';
import { ref, push, onValue, remove } from 'firebase/database';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { firebaseUsageMonitor } from '../utils/firebaseUsageMonitor.js';
import { compressImageFile } from '../utils/imageCompression';

const Admin = ({ showOnlyLogin = false, onLoginSuccess }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [templates, setTemplates] = useState([]);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [usageData, setUsageData] = useState(firebaseUsageMonitor.getFormattedUsage());
  const [usageExpanded, setUsageExpanded] = useState(false);
  const [usagePeriod, setUsagePeriod] = useState('month'); // 'day', 'week', 'month'

  // Update usage data periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setUsageData(firebaseUsageMonitor.getFormattedUsage());
    }, 5000); // Update every 5 seconds
    
    return () => clearInterval(interval);
  }, []);

  const handleResetUsage = () => {
    if (window.confirm('Are you sure you want to reset all usage data?')) {
      firebaseUsageMonitor.resetUsage();
      setUsageData(firebaseUsageMonitor.getFormattedUsage());
    }
  };

  // Firebase Usage Monitor Component
  const FirebaseUsageMonitor = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Firebase Usage Monitor</h2>
        <button 
          onClick={() => setUsageExpanded(!usageExpanded)}
          className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          {usageExpanded ? 'Collapse' : 'Expand'}
        </button>
      </div>
      
      {/* Usage Period Toggle */}
      <div className="flex gap-2 mb-4">
        {['day', 'week', 'month'].map(period => (
          <button
            key={period}
            className={`px-3 py-1 rounded-full text-sm font-medium border transition-colors ${usagePeriod === period ? 'bg-blue-600 text-white border-blue-700' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600'}`}
            onClick={() => setUsagePeriod(period)}
          >
            {period === 'day' ? 'Today' : period === 'week' ? 'This Week' : 'This Month'}
          </button>
        ))}
      </div>
      {/* Usage Summary for Selected Period */}
      {(() => {
        // Calculate period totals
        const now = new Date();
        let periodTotals = { reads: 0, writes: 0, bandwidth: 0 };
        let label = '';
        if (usagePeriod === 'day') {
          const today = now.toDateString();
          const todayRecord = usageData.dailyUsage.find(day => day.date === today);
          if (todayRecord) periodTotals = todayRecord;
          label = 'Today';
        } else if (usagePeriod === 'week') {
          const startOfWeek = new Date(now);
          startOfWeek.setDate(now.getDate() - now.getDay()); // Sunday
          usageData.dailyUsage.forEach(day => {
            const dayDate = new Date(day.date);
            if (dayDate >= startOfWeek) {
              periodTotals.reads += day.reads;
              periodTotals.writes += day.writes;
              periodTotals.bandwidth += day.bandwidth;
            }
          });
          label = 'This Week';
        } else {
          // month
          const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
          usageData.dailyUsage.forEach(day => {
            const dayDate = new Date(day.date);
            if (dayDate >= monthStart) {
              periodTotals.reads += day.reads;
              periodTotals.writes += day.writes;
              periodTotals.bandwidth += day.bandwidth;
            }
          });
          label = 'This Month';
        }
        // Format bandwidth
        const formatBytes = (bytes) => {
          if (bytes === 0) return '0 Bytes';
          const k = 1024;
          const sizes = ['Bytes', 'KB', 'MB', 'GB'];
          const i = Math.floor(Math.log(bytes) / Math.log(k));
          return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        };
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
              <div className="text-xs text-blue-900 dark:text-blue-100">Reads ({label})</div>
              <div className="text-lg font-semibold text-blue-700 dark:text-blue-200">{periodTotals.reads.toLocaleString()}</div>
            </div>
            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg">
              <div className="text-xs text-green-900 dark:text-green-100">Writes ({label})</div>
              <div className="text-lg font-semibold text-green-700 dark:text-green-200">{periodTotals.writes.toLocaleString()}</div>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg">
              <div className="text-xs text-purple-900 dark:text-purple-100">Bandwidth ({label})</div>
              <div className="text-lg font-semibold text-purple-700 dark:text-purple-200">{formatBytes(periodTotals.bandwidth)}</div>
            </div>
          </div>
        );
      })()}
      
      {/* Projection Display */}
      {usageData.projection && usageData.projection.daysUntilLimit !== null && (
        <div className="mb-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <div className="text-sm text-yellow-800 dark:text-yellow-200">Projection</div>
          <div className="text-lg font-bold text-yellow-600 dark:text-yellow-300">
            {usageData.projection.daysUntilLimit > 0 
              ? `${usageData.projection.daysUntilLimit} days until ${usageData.projection.limitInGB}GB limit reached` 
              : 'Bandwidth limit reached or exceeded!'}
          </div>
          <div className="text-xs text-yellow-600 dark:text-yellow-400">
            Based on current daily average usage
          </div>
        </div>
      )}
      
      {usageExpanded && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Daily Usage History (Last 30 Days)</h3>
            <button 
              onClick={handleResetUsage}
              className="text-sm px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded transition-colors"
            >
              Reset Data
            </button>
          </div>
          
          <div className="max-h-60 overflow-y-auto">
            {usageData.dailyUsage.length > 0 ? (
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-2 px-2 text-gray-700 dark:text-gray-200">Date</th>
                    <th className="text-right py-2 px-2 text-gray-700 dark:text-gray-200">Reads</th>
                    <th className="text-right py-2 px-2 text-gray-700 dark:text-gray-200">Writes</th>
                    <th className="text-right py-2 px-2 text-gray-700 dark:text-gray-200">Bandwidth</th>
                  </tr>
                </thead>
                <tbody>
                  {[...usageData.dailyUsage].reverse().map((day, index) => (
                    <tr key={index} className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-2 px-2">{day.date}</td>
                      <td className="text-right py-2 px-2">{day.reads.toLocaleString()}</td>
                      <td className="text-right py-2 px-2">{day.writes.toLocaleString()}</td>
                      <td className="text-right py-2 px-2">
                        {(() => {
                          const bytes = day.bandwidth;
                          if (bytes === 0) return '0 Bytes';
                          const k = 1024;
                          const sizes = ['Bytes', 'KB', 'MB', 'GB'];
                          const i = Math.floor(Math.log(bytes) / Math.log(k));
                          return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
                        })()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">No usage data available</p>
            )}
          </div>
        </div>
      )}
      
      <div className="mt-4 text-sm text-gray-700 dark:text-gray-200">
        <p>Budget: <span className="font-medium">$25/month (~35GB)</span>. Current usage: <span className="font-semibold">{usageData.totalBandwidthFormatted}</span>.</p>
        <p className="mt-1">Monitor this panel to ensure you stay within your Firebase plan limits.</p>
      </div>
    </div>
  );

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

  import { compressImageFile } from '../utils/imageCompression';

const handleUpload = async () => {
  if (selectedFile) {
    // Only compress if file is >200KB, else upload as-is
    if (selectedFile.size > 200 * 1024) {
      try {
        const compressedDataUrl = await compressImageFile(selectedFile, {
          maxWidth: 600,
          maxHeight: 600,
          quality: 0.82
        });
        const templatesRef = ref(database, 'templates');
        push(templatesRef, { name: selectedFile.name, url: compressedDataUrl });
        alert('Template auto-compressed and uploaded successfully!');
        setSelectedFile(null);
      } catch (err) {
        alert('Failed to compress image: ' + err.message);
      }
    } else {
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
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } catch (err) {
      setError("Login failed: " + (err.message || err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (!user) {
    return (
      <form onSubmit={handleLogin} className="w-full">
        {error && <div className="text-red-500 dark:text-red-400 mb-4 text-center">{error}</div>}
        <div className="mb-4">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white"
            required
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    );
  }

  if (showOnlyLogin) {
    return null; // The login form is already rendered by AdminRoute
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <button 
          onClick={handleLogout} 
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Logout
        </button>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Upload New Template</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <input 
            type="file" 
            onChange={handleFileChange} 
            className="flex-grow p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600"
            accept="image/*"
          />
          <button 
            onClick={handleUpload} 
            disabled={!selectedFile || loading}
            className={`px-4 py-2 rounded font-medium transition-colors ${
              selectedFile 
                ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            }`}
          >
            {loading ? 'Uploading...' : 'Upload Template'}
          </button>
        </div>
      </div>
      
      {/* Firebase Usage Monitor */}
      <FirebaseUsageMonitor />
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Manage Templates</h2>
        {templates.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-8">No templates found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {templates.map(template => (
              <div key={template.id} className="border dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-square bg-gray-100 dark:bg-gray-700 flex items-center justify-center p-2">
                  <img 
                    src={template.url} 
                    alt={template.name} 
                    className="max-h-48 max-w-full object-contain" 
                  />
                </div>
                <div className="p-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {template.name}
                    </span>
                    <button 
                      onClick={() => {
                        if (window.confirm('Are you sure you want to delete this template?')) {
                          handleDelete(template.id);
                        }
                      }}
                      className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                      title="Delete template"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
