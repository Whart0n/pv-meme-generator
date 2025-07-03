import React from 'react';
import './Gallery.css';

// Build list of images from /public/memes folder
const imageNames = [
  'CHEETAH_BUTTON-2.webp',
  'Frank_Waiting-2.webp',
  'GFUNK__COURTNEY.webp',
  'Hilary_Smoking.webp',
  'Skull_distracted.webp',
  'WHAT_IF_I_TOLD_YOU.webp',
  'beanzie_this_is_fine.webp',
  'bring_it_marvin.webp',
  'drake_wiggles.webp',
  'gfunkbuttons.webp',
  'ivanova_squint_template.webp',
  'other_women.webp',
];

const images = imageNames.map((n) => ({
  src: process.env.PUBLIC_URL + `/memes/${n}`,
  name: n,
}));

export default function Gallery({ onSelect }) {
  return (
    <div className="gallery">
      {images.map((img) => (
        <img
          key={img.name}
          src={img.src}
          alt={img.name}
          className="thumbnail"
          onClick={() => onSelect(img.src)}
        />
      ))}
    </div>
  );
}
