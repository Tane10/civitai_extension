import React from "react";
import ImageCard from "./ImageCard"; // Adjust the import path as needed

interface ImageData {
  id: string;
  src: string;
  alt?: string;
}

interface ViewAllProps {
  images: ImageData[];
}

const ViewAll: React.FC<ViewAllProps> = ({ images }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">View All Images</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((imgCard) => (
          //TODO: add id and alt to Image Card
          <ImageCard key={imgCard.id} src={imgCard.src} />
        ))}
      </div>
    </div>
  );
};

export default ViewAll;
