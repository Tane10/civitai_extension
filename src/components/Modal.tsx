import React, { useState } from "react";

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (apiKey: string) => void;
}

const Modal: React.FC<ModalProps> = ({ isVisible, onClose, onSubmit }) => {
  const [inputValue, setInputValue] = useState<string>("");

  if (!isVisible) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(inputValue);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96 relative">
        <button className="absolute top-2 right-2 text-gray-500" onClick={onClose}>
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">API Key Required</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">Please type your API key below:</label>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter API Key here..."
            className="border border-gray-300 rounded w-full p-2 mb-4"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
