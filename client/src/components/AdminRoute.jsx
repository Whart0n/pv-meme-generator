import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { isAdmin } from '../utils/adminUtils';

/**
 * A protected route component that only allows admin users to access
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render if user is admin
 * @returns {React.ReactNode} The protected component or redirect
 */
const AdminRoute = ({ children }) => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  // Only check admin status if user is logged in
  useEffect(() => {
    const checkAdmin = async () => {
      if (!currentUser) {
        setLoading(false);
        return;
      }

      try {
        const adminStatus = await isAdmin(currentUser);
        setIsAdminUser(adminStatus);
      } catch (error) {
        console.error('AdminRoute: Error checking admin status:', error);
        setIsAdminUser(false);
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();
  }, [currentUser]);

  // If we're still loading and there's a current user, show loading state
  if (loading && currentUser) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  // If not logged in or not an admin, show the login form
  if (!currentUser || !isAdminUser) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Admin Login</h2>
          {React.Children.map(children, child => 
            React.cloneElement(child, { 
              onLoginSuccess: () => window.location.reload(),
              showOnlyLogin: true 
            })
          )}
        </div>
      </div>
    );
  }

  // If logged in and is admin, show the admin panel
  return children;
};

export default AdminRoute;
