import React, { useState, useEffect } from "react";
import Form from "./components/Form";
import Modal from "./components/Modal";
import Query from "./components/Query";
import ViewAll from "./components/ViewAll";

const App: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<string>("Form");
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  useEffect(() => {
    // Simulate checking for a valid API key

    // const storedApiKey =
    //   document.cookie
    //     .split(";")
    //     .map((item) => item.trim())
    //     .find((cookie) => cookie.startsWith(`api_key=`))
    //     ?.split("=")[1] || null;

    //TODO: Set up a function that when pop up is triggered ask for cookie from background script as this is where we store our cookies
    if (!apiKey) {
      setIsModalVisible(true);
    } else {
    }
  }, []);

  const handleSubmitApiKey = (newApiKey: string) => {
    // Validate the API key
    if (newApiKey) {
      setApiKey(newApiKey);

      chrome.runtime.sendMessage(
        { action: "set_api_key", value: newApiKey },
        (response) => {
          if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError.message);
          }

          if (response.valid) {
            setApiKey(newApiKey);
            setIsModalVisible(false);
          }
          console.log(response);
        }
      );

      return;
    }
  };

  const cardsData = [
    {
      imageCount: 4,
      timeStamp: "2024-09-05T12:00:00Z",
      jobId: "job123",
      prompt:
        "This is a prompt for the card. It might be very long and could potentially be truncated.",
      img: [
        { id: "img1", src: "https://via.placeholder.com/150" },
        { id: "img2", src: "https://via.placeholder.com/150" },
        { id: "img3", src: "https://via.placeholder.com/150" },
        { id: "img4", src: "https://via.placeholder.com/150" },
      ],
      onShowInfo: () => alert("Show Info"),
      onFetchData: () => alert("Fetch Data"),
      onDeletePrompt: () => alert("Delete Prompt"),
    },
    {
      imageCount: 4,
      timeStamp: "2024-09-05T12:00:00Z",
      jobId: "job1234",
      prompt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac libero nec justo gravida varius. Integer sollicitudin augue eu augue fermentum, ut tristique sapien iaculis. Curabitur.",
      img: [
        { id: "img1", src: "https://via.placeholder.com/150" },
        { id: "img2", src: "https://via.placeholder.com/150" },
        { id: "img3", src: "https://via.placeholder.com/150" },
        { id: "img4", src: "https://via.placeholder.com/150" },
      ],
      onShowInfo: () => alert("Show Info"),
      onFetchData: () => alert("Fetch Data"),
      onDeletePrompt: () => alert("Delete Prompt"),
    },
    // Add more card data as needed
  ];

  const renderComponent = () => {
    switch (activeComponent) {
      case "Form":
        return <Form />;
      case "Query":
        return <Query cards={cardsData} />;
      case "ViewAll":
        return <ViewAll images={cardsData.flatMap(({ img }) => img)} />;
      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      {/* Header with Toggle Buttons */}
      <header className="header p-4 flex justify-around flex space-x-2">
        <button
          className={`btn ${
            activeComponent === "Form" ? "bg-blue-500" : "bg-gray-500"
          } px-4 py-2 border rounded-md  text-white shadow-md `}
          onClick={() => setActiveComponent("Form")}
        >
          Create
        </button>
        <button
          className={`btn ${
            activeComponent === "Query" ? "bg-blue-500" : "bg-gray-500"
          } px-4 py-2 border rounded-md text-white shadow-md `}
          onClick={() => setActiveComponent("Query")}
        >
          Query
        </button>
        <button
          className={`btn ${
            activeComponent === "ViewAll" ? "bg-blue-500" : "bg-gray-500"
          } px-4 py-2 border rounded-md  text-white shadow-md `}
          onClick={() => setActiveComponent("ViewAll")}
        >
          View all
        </button>
      </header>

      {/* Body for rendering selected component */}
      <main className="main-body p-4">{renderComponent()}</main>

      <Modal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSubmit={handleSubmitApiKey}
      />
    </div>
  );
};

export default App;
