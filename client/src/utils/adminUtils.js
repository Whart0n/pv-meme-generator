import React from 'react';
import { database } from '../firebase';
import { ref, get } from 'firebase/database';

// List of admin UIDs - this is a secure approach since this file is bundled
// and not accessible in plain text on the client
const ADMIN_UIDS = [
    "zT1ASMe797fhHDDajlLVffsl1r52"
];

/**
 * Check if a user is an admin
 * @param {Object} user - Firebase user object
 * @returns {Promise<boolean>} Whether the user is an admin
 */
export const isAdmin = async (user) => {
  if (!user) return false;
  
  // First check the hardcoded list
  if (ADMIN_UIDS.includes(user.uid)) {
    return true;
  }
  
  // Fallback to database check (useful for adding admins without redeploying)
  try {
    const adminRef = ref(database, `admins/${user.uid}`);
    const snapshot = await get(adminRef);
    return snapshot.exists() && snapshot.val() === true;
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
};

/**
 * Hook to use admin status in components
 * @param {Object} user - Firebase user object
 * @returns {Object} Admin status and loading state
 */
export const useAdminStatus = (user) => {
  const [isAdminUser, setIsAdminUser] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  
  React.useEffect(() => {
    const checkAdminStatus = async () => {
      setLoading(true);
      const adminStatus = await isAdmin(user);
      setIsAdminUser(adminStatus);
      setLoading(false);
    };
    
    if (user) {
      checkAdminStatus();
    } else {
      setIsAdminUser(false);
      setLoading(false);
    }
  }, [user]);
  
  return { isAdminUser, loading };
};
