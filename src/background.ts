import { Civitai, Scheduler } from "civitai";
// import "dotenv/config";

let civitai: Civitai | undefined;

const input = {
  model: "urn:air:sdxl:checkpoint:civitai:101055@128078",
  params: {
    prompt:
      "RAW photo, face portrait photo of 26 y.o woman, wearing black dress, happy face, hard shadows, cinematic shot, dramatic lighting",
    negativePrompt:
      "(deformed iris, deformed pupils, semi-realistic, cgi, 3d, render, sketch, cartoon, drawing, anime, mutated hands and fingers:1.4), (deformed, distorted, disfigured:1.3)",
    scheduler: Scheduler.EULER_A,
    steps: 20,
    cfgScale: 7,
    width: 512,
    height: 512,
    clipSkip: 2,
  },
};

const initCivitai = (): void => {
  // const API_KEY = process.env.API_KEY; -> this don't work and cause background to fail.
  // maybe use cookies instead

  if (!API_KEY) {
    console.error("API_KEY not found in environment variables.");
    return; // Exit early if no API key is present
  }

  try {
    civitai = new Civitai({ auth: API_KEY });
    console.log("Civitai initialized successfully.");
  } catch (err) {
    console.error("Failed to initialize Civitai:", err);
  }
};

const handleImageJob = async (
  request: any,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response?: any) => void
): Promise<void> => {
  if (!civitai) {
    console.error("Civitai instance is not initialized.");
    sendResponse({
      status: "error",
      message: "Civitai instance is not available.",
    });
    return;
  }

  if (request.type === "prompt") {
    // Placeholder for handling image generation based on the request
    // Example: Generate an image or process the request
    // const image = civitai.someMethod(request.payload);
    const response = await civitai.image.fromText(input);
    console.log(response);

    console.log("Processing prompt request:", request.payload);

    // Example response (modify according to actual logic)
    sendResponse({ status: "success", message: "Request processed." });
  } else {
    console.warn("Unknown request type:", request.type);
    sendResponse({ status: "error", message: "Unknown request type." });
  }
};

chrome.runtime.onMessage.addListener(
  async (
    request: any,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response?: any) => void
  ) => {
    await handleImageJob(request, sender, sendResponse);
  }
);

chrome.runtime.onInstalled.addListener(() => {
  initCivitai();
  console.log("Extension installed");
});
