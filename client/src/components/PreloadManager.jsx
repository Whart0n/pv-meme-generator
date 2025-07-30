import { useEffect } from 'react';

const PreloadManager = () => {
  useEffect(() => {
    // Preload critical images
    const preloadImages = [
      '/memes/beanzie_this_is_fine.webp',
      '/memes/drake_wiggles.webp',
      '/memes/other_women.webp',
      '/memes/ivanova_squint_template.webp'
    ];

    const imagePromises = preloadImages.map(src => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = reject;
        img.src = src;
      });
    });

    // Preload in background without blocking
    Promise.allSettled(imagePromises).then(results => {
      const successful = results.filter(result => result.status === 'fulfilled').length;
      console.log(`Preloaded ${successful}/${preloadImages.length} template images`);
    });

    // Preload Fabric.js if not already loaded
    if (!window.fabric) {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.0/fabric.min.js';
      script.async = true;
      script.onload = () => {
        console.log('Fabric.js preloaded');
      };
      document.head.appendChild(script);
    }
  }, []);

  return null; // This component doesn't render anything
};

export default PreloadManager;
