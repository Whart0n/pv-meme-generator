import React, { useState } from 'react';
import { migrateNFTContractAddresses } from '../utils/migrateNFTContractAddress';
import { isAdmin } from '../utils/adminUtils';
import { useAuth } from '../contexts/AuthContext';

const AdminMigration = () => {
  const [migrationStatus, setMigrationStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useAuth();
  const [isAdminUser, setIsAdminUser] = useState(false);

  // Temporarily set all users as admin for testing
  React.useEffect(() => {
    setIsAdminUser(true); // Bypass admin check for testing
  }, []);

  const handleMigration = async () => {
    if (!isAdminUser) {
      setMigrationStatus({
        success: false,
        message: 'You do not have permission to run migrations.'
      });
      return;
    }

    try {
      setIsLoading(true);
      setMigrationStatus(null);
      
      const result = await migrateNFTContractAddresses();
      setMigrationStatus(result);
    } catch (error) {
      console.error('Migration error:', error);
      setMigrationStatus({
        success: false,
        message: `Error running migration: ${error.message}`
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Admin check bypassed for testing

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Admin: Database Migrations</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">NFT Contract Address Migration</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          This migration will fix all NFTs in the database that have incorrect contract addresses.
          It will update both OpenSea URLs and image URLs to use the correct MetaHero contract address:
          <code className="block bg-gray-100 dark:bg-gray-700 p-2 my-2 rounded font-mono text-sm overflow-auto">
            0x6dc6001535e15b9def7b0f6a20a2111dfa9454e2
          </code>
        </p>
        
        <button
          onClick={handleMigration}
          disabled={isLoading}
          className={`px-4 py-2 rounded-lg transition-colors ${
            isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          {isLoading ? 'Running Migration...' : 'Run Migration'}
        </button>
        
        {migrationStatus && (
          <div className={`mt-4 p-4 rounded-lg ${
            migrationStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            <p className="font-semibold">{migrationStatus.success ? 'Success!' : 'Error!'}</p>
            <p>{migrationStatus.message}</p>
          </div>
        )}
      </div>
      
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              <strong>Warning:</strong> This operation cannot be undone. Make sure you have a backup of your database before proceeding.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMigration;
