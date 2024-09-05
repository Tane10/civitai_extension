import React from "react";
import Icon from "./Icon"; // Adjust the import path based on your project structure
import ImageCard from "./ImageCard"; // Adjust the import path based on your project structure

interface CardProps {
  imageCount: number;
  timeStamp: string;
  jobId: string;
  prompt: string;
  img: { id: string; src: string }[];
  onShowInfo: () => void;
  onFetchData: () => void;
  onDeletePrompt: () => void;
}

const Card: React.FC<CardProps> = ({
  imageCount,
  timeStamp,
  jobId,
  prompt,
  img,
  onShowInfo,
  onFetchData,
  onDeletePrompt,
}) => {
  return (
    <div className="border border-gray-300 rounded-lg p-4 mb-4 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-2">
            <div className="flex items-center bg-gray-200 p-2 rounded-full">
              <Icon name="photo" />
              <p className="ml-2">{imageCount}</p>
            </div>
          </span>
          <span>
            <p className="text-gray-600">Time Stamp: {timeStamp}</p>
          </span>
          <span>
            <p className="text-gray-600">Job ID: {jobId}</p>
          </span>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={onShowInfo}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
          >
            <Icon name="info" />
          </button>
          <button
            onClick={onFetchData}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
          >
            <Icon name="remix" />
          </button>
          <button
            onClick={onDeletePrompt}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
          >
            <Icon name="bin" />
          </button>
        </div>
      </div>
      <div className="border-t border-gray-200 pt-4">
        <p>{prompt}</p>
        {prompt.length > 155 && (
          <button
            className="mt-2 text-blue-500 hover:underline"
            title="Show More"
          >
            Show More
          </button>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {img.map((imgCard) => (
            <div key={imgCard.id}>
              <ImageCard key={imgCard.id} src={imgCard.src} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
