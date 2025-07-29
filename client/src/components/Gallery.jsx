import React, { useState, useEffect } from 'react';
import { database } from '../firebase';
import { ref, get } from 'firebase/database';

// Static list of meme files with their filenames for the public folder
const memeTemplates = [
  { id: 'template-0', name: 'Beanzie this is fine', filename: 'beanzie_this_is_fine.webp' },
  { id: 'template-1', name: 'Bring it marvin', filename: 'bring_it_marvin.webp' },
  { id: 'template-2', name: 'Cheetah button', filename: 'CHEETAH_BUTTON-2.webp' },
  { id: 'template-3', name: 'Drake wiggles', filename: 'drake_wiggles.webp' },
  { id: 'template-4', name: 'Frank waiting', filename: 'Frank_Waiting-2.webp' },
  { id: 'template-5', name: 'Gfunk courtney', filename: 'GFUNK__COURTNEY.webp' },
  { id: 'template-6', name: 'Gfunk bustdown', filename: 'gfunkbustdown.webp' },
  { id: 'template-7', name: 'Gfunk buttons', filename: 'gfunkbuttons.webp' },
  { id: 'template-8', name: 'Gfunk projects', filename: 'gfunkprojects.webp' },
  { id: 'template-9', name: 'Gfunk stick', filename: 'gfunkstick.webp' },
  { id: 'template-10', name: 'Harold gfunk', filename: 'haroldgfunk.webp' },
  { id: 'template-11', name: 'Hilary smoking', filename: 'Hilary_Smoking.webp' },
  { id: 'template-12', name: 'Ivanova squint template', filename: 'ivanova_squint_template.webp' },
  { id: 'template-13', name: 'Other women', filename: 'other_women.webp' },
  { id: 'template-14', name: 'Skull distracted', filename: 'Skull_distracted.webp' },
  { id: 'template-15', name: 'What if I told you', filename: 'WHAT_IF_I_TOLD_YOU.webp' }
];

// Add src property to all templates with absolute paths
const templatesWithSrc = memeTemplates.map(template => ({
  ...template,
  src: `/memes/${template.filename}` // Use public folder path
}));

export async function getTemplates() {
  const templatesRef = ref(database, 'templates');
  const snapshot = await get(templatesRef);
  const remoteTemplates = [];
  
  if (snapshot.exists()) {
    const data = snapshot.val();
    for (const key in data) {
      remoteTemplates.push({ 
        id: key, 
        ...data[key], 
        src: data[key].url,
        order: data[key].order || 9999 // Default to high number for templates without order
      });
    }
    
    // Sort templates by their order property (ascending)
    remoteTemplates.sort((a, b) => (a.order || 9999) - (b.order || 9999));
  }
  
  // Merge with static templates (which will appear after remote templates)
  return [...remoteTemplates, ...templatesWithSrc];
}

const Gallery = ({ onSelect, selectedTemplate, onTemplatesLoaded }) => {
  const [displayedTemplates, setDisplayedTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTemplates = async () => {
      setLoading(true);
      try {
        const allTemplates = await getTemplates();
        setDisplayedTemplates(allTemplates);
        if (onTemplatesLoaded) {
          onTemplatesLoaded(allTemplates);
        }
      } catch (error) {
        console.error("Failed to load templates:", error);
      }
      setLoading(false);
    };
    loadTemplates();
  }, [onTemplatesLoaded]);

  return (
    <div className="h-64 overflow-y-auto p-2 border rounded-lg bg-gray-50 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200" style={{scrollbarColor: '#a0aec0 #edf2f7', scrollbarWidth: 'thin'}}>
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">Loading templates...</p>
        </div>
      ) : displayedTemplates.length > 0 ? (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
          {displayedTemplates.map((template) => (
            <div
              key={template.id}
              className={`cursor-pointer border-4 ${selectedTemplate?.id === template.id ? 'border-blue-500' : 'border-transparent'} rounded-lg overflow-hidden aspect-square flex items-center justify-center bg-gray-200`}
              onClick={() => onSelect(template)}
            >
              <img 
                src={template.src} 
                alt={template.name} 
                className="w-full h-full object-cover" 
                onError={(e) => { e.target.style.display = 'none'; }} // Hide broken images
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">No templates found.</p>
        </div>
      )}

    </div>
  );
};

export default Gallery;
