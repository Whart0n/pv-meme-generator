// Performance monitoring utilities
export const measurePerformance = (name, fn) => {
  return async (...args) => {
    const start = performance.now();
    const result = await fn(...args);
    const end = performance.now();
    console.log(`[Performance] ${name}: ${(end - start).toFixed(2)}ms`);
    return result;
  };
};

export const measureComponentRender = (componentName) => {
  const start = performance.now();
  return () => {
    const end = performance.now();
    console.log(`[Performance] ${componentName} render: ${(end - start).toFixed(2)}ms`);
  };
};

export const reportWebVitals = () => {
  if ('web-vitals' in window) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(console.log);
      getFID(console.log);
      getFCP(console.log);
      getLCP(console.log);
      getTTFB(console.log);
    });
  }
};

// Image loading optimization
export const createOptimizedImageLoader = () => {
  const imageCache = new Map();
  const loadingPromises = new Map();

  return {
    loadImage: (src) => {
      if (imageCache.has(src)) {
        return Promise.resolve(imageCache.get(src));
      }

      if (loadingPromises.has(src)) {
        return loadingPromises.get(src);
      }

      const promise = new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          imageCache.set(src, img);
          loadingPromises.delete(src);
          resolve(img);
        };
        img.onerror = () => {
          loadingPromises.delete(src);
          reject(new Error(`Failed to load image: ${src}`));
        };
        img.src = src;
      });

      loadingPromises.set(src, promise);
      return promise;
    },
    
    preloadImages: (urls) => {
      return Promise.allSettled(urls.map(url => this.loadImage(url)));
    },
    
    clearCache: () => {
      imageCache.clear();
      loadingPromises.clear();
    }
  };
};

export default {
  measurePerformance,
  measureComponentRender,
  reportWebVitals,
  createOptimizedImageLoader
};
