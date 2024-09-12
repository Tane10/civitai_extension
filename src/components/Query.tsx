import React from "react";
import Card from "./Card"; // Adjust the import path based on your project structure

//TODO: NEED to add checks for jobs running/ done

interface QueryProps {
  cards: {
    imageCount: number;
    timeStamp: string;
    jobId: string;
    prompt: string;
    img: { id: string; src: string }[];
    onShowInfo: () => void;
    onFetchData: () => void;
    onDeletePrompt: () => void;
  }[];
}

const Query: React.FC<QueryProps> = ({ cards }) => {
  return (
    <div className="p-4">
      {cards.map((card, index) => (
        <Card
          key={index}
          imageCount={card.imageCount}
          timeStamp={card.timeStamp}
          jobId={card.jobId}
          prompt={card.prompt}
          img={card.img}
          onShowInfo={card.onShowInfo}
          onFetchData={card.onFetchData}
          onDeletePrompt={card.onDeletePrompt}
        />
      ))}
    </div>
  );
};

export default Query;
