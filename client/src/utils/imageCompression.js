// imageCompression.js
// Utility to compress images before upload, balancing quality and size

/**
 * Compress an image file to a data URL with target quality and max size.
 * @param {File|Blob} file - The image file to compress
 * @param {Object} options
 * @param {number} [options.maxWidth=600] - Max width in px
 * @param {number} [options.maxHeight=600] - Max height in px
 * @param {number} [options.quality=0.82] - JPEG/WebP quality (0-1)
 * @returns {Promise<string>} - Compressed image as data URL
 */
export function compressImageFile(file, { maxWidth = 600, maxHeight = 600, quality = 0.82 } = {}) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image();
      img.onload = () => {
        let { width, height } = img;
        let scale = Math.min(maxWidth / width, maxHeight / height, 1);
        width = Math.round(width * scale);
        height = Math.round(height * scale);
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        // Prefer WebP if supported, else JPEG
        let mimeType = 'image/webp';
        if (!canvas.toDataURL('image/webp').startsWith('data:image/webp')) {
          mimeType = 'image/jpeg';
        }
        const dataUrl = canvas.toDataURL(mimeType, quality);
        resolve(dataUrl);
      };
      img.onerror = reject;
      img.src = event.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
