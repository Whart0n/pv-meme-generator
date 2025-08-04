// Optimized image component with compression and lazy loading
import React, { useState, useRef, useEffect } from 'react';

const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  onClick, 
  title,
  compressionQuality = 0.7,
  maxWidth = 400,
  maxHeight = 400,
  ...props 
}) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);
  const canvasRef = useRef(null);

  // Compress image data URL
  const compressImage = (dataUrl) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Calculate new dimensions while maintaining aspect ratio
        let { width, height } = img;
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width *= ratio;
          height *= ratio;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height);
        const compressedDataUrl = canvas.toDataURL('image/jpeg', compressionQuality);
        resolve(compressedDataUrl);
      };
      img.src = dataUrl;
    });
  };

  useEffect(() => {
    if (!src) return;

    const loadAndOptimizeImage = async () => {
      try {
        setIsLoading(true);
        setHasError(false);
        
        // If it's already a data URL, compress it
        if (src.startsWith('data:image/')) {
          const compressedSrc = await compressImage(src);
          setImageSrc(compressedSrc);
        } else {
          // For regular URLs, just use them directly
          setImageSrc(src);
        }
      } catch (error) {
        console.error('Error optimizing image:', error);
        setHasError(true);
        setImageSrc(src); // Fallback to original
      } finally {
        setIsLoading(false);
      }
    };

    loadAndOptimizeImage();
  }, [src, compressionQuality, maxWidth, maxHeight]);

  const handleImageLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  if (hasError) {
    return (
      <div className={`flex items-center justify-center bg-gray-200 dark:bg-gray-700 ${className}`}>
        <div className="text-gray-500 dark:text-gray-400 text-sm">
          Failed to load image
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {isLoading && (
        <div className={`absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 ${className}`}>
          <div className="w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      {imageSrc && (
        <img
          ref={imgRef}
          src={imageSrc}
          alt={alt}
          className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
          onClick={onClick}
          title={title}
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading="lazy"
          {...props}
        />
      )}
    </div>
  );
};

export default OptimizedImage;
