import React, { useState, useEffect, useCallback } from 'react';
import { database } from '../firebase';
import { ref, get } from 'firebase/database';

// Templates are now loaded exclusively from Firebase database
// Static templates have been moved to Firebase for centralized management

export async function getTemplates() {
  console.log('Loading templates...');
  
  try {
    console.log('Firebase database object:', database);
    const templatesRef = ref(database, 'templates');
    console.log('Templates reference created:', templatesRef);
    
    console.log('Attempting to fetch from Firebase...');
    const snapshot = await get(templatesRef);
    console.log('Firebase snapshot received:', snapshot);
    console.log('Firebase snapshot exists:', snapshot.exists());
    
    const remoteTemplates = [];
    
    if (snapshot.exists()) {
      const data = snapshot.val();
      console.log('Firebase templates data keys:', Object.keys(data));
      console.log('Total Firebase templates found:', Object.keys(data).length);
      
      let validTemplates = 0;
      let invalidTemplates = 0;
      
      for (const key in data) {
        const templateData = data[key];
        console.log(`Processing template ${key}:`, templateData);
        
        // Check if template has required fields
        if (templateData && templateData.url) {
          remoteTemplates.push({ 
            id: key, 
            ...templateData, 
            src: templateData.url,
            order: templateData.order || 9999 // Default to high number for templates without order
          });
          validTemplates++;
        } else {
          console.warn(`Skipping template ${key} - missing required fields:`, {
            hasUrl: !!templateData?.url,
            data: templateData
          });
          invalidTemplates++;
        }
      }
      
      // Sort templates by their order property (ascending)
      remoteTemplates.sort((a, b) => (a.order || 9999) - (b.order || 9999));
      console.log(`Remote templates processed: ${validTemplates} valid, ${invalidTemplates} invalid`);
      console.log('Final remote templates:', remoteTemplates);
    } else {
      console.log('No Firebase templates found, using static templates only');
    }
    
    console.log('Firebase templates loaded:', remoteTemplates.length);
    return remoteTemplates;
  } catch (error) {
    console.error('Error loading templates from Firebase:', error);
    console.log('No templates available - Firebase connection failed');
    return [];
  }
}

const Gallery = ({ onSelect, selectedTemplate, onTemplatesLoaded }) => {
  const [displayedTemplates, setDisplayedTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState(new Set());

  const handleImageLoad = useCallback((templateId) => {
    setLoadedImages(prev => new Set([...prev, templateId]));
  }, []);

  useEffect(() => {
    const loadTemplates = async () => {
      console.log('Gallery: Starting template loading...');
      setLoading(true);
      try {
        const allTemplates = await getTemplates();
        console.log('Gallery: Templates received:', allTemplates.length, allTemplates);
        setDisplayedTemplates(allTemplates);
        console.log('Gallery: displayedTemplates state updated');
        if (onTemplatesLoaded) {
          onTemplatesLoaded(allTemplates);
        }
      } catch (error) {
        console.error("Gallery: Failed to load templates:", error);
        // Fallback to static templates if there's an error
        console.log('Gallery: Using static templates as fallback');
        setDisplayedTemplates(templatesWithSrc);
      }
      setLoading(false);
    };
    loadTemplates();
  }, [onTemplatesLoaded]);

  return (
    <div className="relative">
      {/* Gallery container with calculated height to show 1.5 rows */}
      <div 
        className="overflow-y-auto p-2 border dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-500 scrollbar-track-gray-200 dark:scrollbar-track-gray-800" 
        style={{
          scrollbarColor: '#a0aec0 #edf2f7', 
          scrollbarWidth: 'thin',
          height: '360px', // Increased by 50% to ensure 1.5+ rows visible for all users
          minHeight: '360px',
          maxHeight: '400px'
        }}
      >
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 dark:text-gray-400">Loading templates...</p>
          </div>
        ) : displayedTemplates.length > 0 ? (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
            {console.log('Gallery: Rendering templates:', displayedTemplates.length) || displayedTemplates.map((template) => (
            <div
              key={template.id}
              className={`cursor-pointer border-4 ${selectedTemplate?.id === template.id ? 'border-blue-500 dark:border-blue-400' : 'border-transparent'} rounded-lg overflow-hidden aspect-square flex items-center justify-center bg-gray-200 dark:bg-gray-600 relative`}
              onClick={() => onSelect(template)}
            >
              {!loadedImages.has(template.id) && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-300 dark:bg-gray-600">
                  <div className="w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              <img 
                src={template.src} 
                alt={template.name} 
                className={`w-full h-full object-cover transition-opacity duration-300 ${loadedImages.has(template.id) ? 'opacity-100' : 'opacity-0'}`}
                loading="lazy"
                onLoad={() => handleImageLoad(template.id)}
                onError={(e) => { 
                  e.target.style.display = 'none';
                  handleImageLoad(template.id); // Mark as "loaded" even if failed
                }}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500 dark:text-gray-400">No templates found.</p>
        </div>
      )}
      </div>
      
      {/* Scroll indicator - shows when there are more templates */}
      {displayedTemplates.length > 6 && (
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-50 dark:from-gray-700 to-transparent pointer-events-none rounded-b-lg">
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <svg className="w-3 h-3 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            <span>Scroll for more</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
