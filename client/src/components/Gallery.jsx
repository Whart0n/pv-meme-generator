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
      remoteTemplates.push({ id: key, ...data[key], src: data[key].url });
    }
  }
  return [...templatesWithSrc, ...remoteTemplates];
}

const Gallery = ({ onSelect, selectedTemplate, maxRows = 3, onTemplatesLoaded }) => {
  const [displayedTemplates, setDisplayedTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTemplates = async () => {
      setLoading(true);
      const allTemplates = await getTemplates();
      setDisplayedTemplates(allTemplates);
      setLoading(false);
      if (onTemplatesLoaded) {
        onTemplatesLoaded(allTemplates);
      }
    };
    loadTemplates();
  }, [onTemplatesLoaded]);

  const rowCount = Math.min(maxRows, Math.ceil(displayedTemplates.length / 5));

  return (
    <div className="grid grid-cols-5 gap-2" style={{ gridTemplateRows: `repeat(${rowCount}, auto)` }}>
      {loading ? (
        <div className="col-span-full text-center py-4 text-gray-500">Loading templates...</div>
      ) : (
        displayedTemplates.map(template => (
          <div
            key={template.id}
            className={`cursor-pointer border-4 ${selectedTemplate && selectedTemplate.id === template.id ? 'border-blue-500' : 'border-transparent'} rounded-lg overflow-hidden`}
            onClick={() => onSelect(template)}
          >
            {template.src ? (
              <img src={template.src} alt={template.name} className="w-full h-auto object-cover" />
            ) : (
              <div className="bg-gray-200 aspect-square rounded flex items-center justify-center p-2 text-center text-xs">
                <span>{template.name}</span>
              </div>
            )}
          </div>
        ))
      )}
      {!loading && displayedTemplates.length === 0 && (
        <div className="col-span-full text-center py-4 text-gray-500">No templates found.</div>
      )}
    </div>
  );
};

export default Gallery;
