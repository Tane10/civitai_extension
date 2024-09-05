import React from 'react';

interface ImageCardProps {
  src: string;
}

const ImageCard: React.FC<ImageCardProps> = ({ src }) => {
  return (
    <div className="flex items-center space-x-2 mb-2">
      <input type="checkbox" className="form-checkbox" />
      <img src={src} alt="Image Card" className="w-16 h-16 object-cover rounded-md" />
    </div>
  );
};

export default ImageCard;
