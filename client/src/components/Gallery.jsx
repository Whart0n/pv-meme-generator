import { useState, useEffect } from 'react';

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

// Export static method to get templates from outside
export function getTemplates() {
  const localTemplates = JSON.parse(localStorage.getItem('memeTemplates') || '[]');
  const allTemplates = [...templatesWithSrc, ...localTemplates.map((t, i) => ({ ...t, id: `local-${i}`, src: t.url }))];
  return allTemplates;
}

export default function Gallery({ onSelect, selectedTemplate, maxRows = 3, onTemplatesLoaded }) {
  const [displayedTemplates, setDisplayedTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  // Set up all templates with their src properties
  useEffect(() => {
    const allTemplates = getTemplates();
    setDisplayedTemplates(allTemplates);
    setLoading(false);
    
    // Notify parent that templates are loaded
    if (onTemplatesLoaded) {
      onTemplatesLoaded(allTemplates);
    }
    
    // Preload images for better user experience
    allTemplates.forEach(template => {
      const img = new Image();
      img.src = template.src;
    });
    
    // No connection status needed since we're using local files only
  }, [onTemplatesLoaded]);

  // Check if template is selected
  const isTemplateSelected = (template) => {
    if (!selectedTemplate) return false;
    return selectedTemplate.id === template.id;
  };

  // Handle template selection
  const handleSelect = (template) => {
    console.log('Selecting template:', template);
    if (onSelect) {
      onSelect(template);
    }
  };

  return (
    <div className="meme-gallery grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
      {loading ? (
        <div className="col-span-full text-center py-4">Loading templates...</div>
      ) : (
        displayedTemplates.map((template) => (
          <div
            key={template.id || template.name}
            className={`meme-thumbnail cursor-pointer transition-all border-2 rounded 
              ${isTemplateSelected(template) 
                ? 'selected border-blue-500 shadow-lg scale-95' 
                : 'border-transparent hover:border-gray-300'}`}
            onClick={() => handleSelect(template)}
          >
            {template.src ? (
              <img
                src={template.src}
                alt={template.name || `Meme template`}
                className="w-full h-auto rounded object-cover aspect-square"
                loading="lazy"
                onError={(e) => {
                  console.error('Image failed to load:', template.src);
                  e.target.onerror = null;
                  e.target.src = `https://via.placeholder.com/200x200?text=${encodeURIComponent(template.name)}`;
                }}
              />
            ) : (
              <div className="bg-gray-200 aspect-square rounded flex items-center justify-center p-2 text-center text-xs">
                <span>{template.name}</span>
              </div>
            )}
          </div>
        ))
      )}
      {!loading && displayedTemplates.length === 0 && (
        <div className="col-span-full text-center py-4 text-gray-500">
          No templates found.
        </div>
      )}
    </div>
  );
}
