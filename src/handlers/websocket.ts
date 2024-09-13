// background.js

// TODO: ADD NGORK AND TEST WEBSOCKETS

let socket;

function initWebSocket() {
  socket = new WebSocket("wss://your-websocket-server.com");

  socket.onopen = () => {
    console.log("WebSocket connected");
  };

  socket.onmessage = (event) => {
    console.log("Image data received from WebSocket");
    // Assuming the server sends image data as a Blob or base64 string
    const imageBlob = event.data;

    // Optionally save to local storage or notify content/popup scripts
    chrome.runtime.sendMessage({ type: "image", data: imageBlob });
  };

  socket.onclose = () => {
    console.log("WebSocket closed, attempting to reconnect");
    setTimeout(initWebSocket, 5000); // Reconnect after 5 seconds
  };

  socket.onerror = (error) => {
    console.error("WebSocket error:", error);
  };
}

// Initialize WebSocket when background script starts
initWebSocket();

// Optionally listen for messages from popup or content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "sendToServer") {
    // For example, sending data to WebSocket server
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(request.data);
    }
  }
});
