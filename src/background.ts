// import { Civitai, Scheduler } from "civitai";

// // TODO: add handler for image in que i.e. check progress or websocket

// // TODO: add image display to see results

// //TODO: add small alert / notification to icon once image is generate

// //TODO: add more logs to give info on whats happening

// //TODO: add more input filed to allow better image generation i.e. different checkpoints, models, etc

// // TODO: display current buzz and how much is spent on image

// //TODO: add token validation

// // TODO: look into moving to vue as we are soon walking into more complex things

// let civitai: Civitai | undefined;
// let API_KEY: string | undefined;

// const input = {
//   model: "urn:air:sdxl:checkpoint:civitai:101055@128078",
//   params: {
//     prompt:
//       "RAW photo, face portrait photo of 26 y.o woman, wearing black dress, happy face, hard shadows, cinematic shot, dramatic lighting",
//     negativePrompt:
//       "(deformed iris, deformed pupils, semi-realistic, cgi, 3d, render, sketch, cartoon, drawing, anime, mutated hands and fingers:1.4), (deformed, distorted, disfigured:1.3)",
//     scheduler: Scheduler.EULER_A,
//     steps: 20,
//     cfgScale: 7,
//     width: 512,
//     height: 512,
//     clipSkip: 2,
//   },
// };

// const fetchApiKey = () => {
//   chrome.cookies.get(
//     { url: "https://civitai.com/", name: "api_token" },
//     (cookie) => {
//       if (cookie) {
//         API_KEY = cookie.value;
//       } else {
//       }
//     }
//   );
// };

// const initCivitai = (): void => {
//   // const API_KEY = process.env.API_KEY; -> this don't work and cause background to fail.
//   // maybe use cookies instead

//   if (!API_KEY) {
//     console.error("API_KEY not found in environment variables.");
//     return; // Exit early if no API key is present
//   }

//   try {
//     civitai = new Civitai({ auth: API_KEY });
//     console.log("Civitai initialized successfully.");
//   } catch (err) {
//     console.error("Failed to initialize Civitai:", err);
//   }
// };

// const handleImageJob = async (
//   request: any,
//   sender: chrome.runtime.MessageSender,
//   sendResponse: (response?: any) => void
// ): Promise<void> => {
//   if (!civitai) {
//     console.error("Civitai instance is not initialized.");
//     sendResponse({
//       status: "error",
//       message: "Civitai instance is not available.",
//     });
//     return;
//   }

//   // Placeholder for handling image generation based on the request
//   // Example: Generate an image or process the request
//   // const image = civitai.someMethod(request.payload);
//   const response = await civitai.image.fromText(input);
//   console.log(response);
//   console.log("Processing prompt request:", request.payload);

//   // Example response (modify according to actual logic)
//   sendResponse({ status: "success", message: "Request processed." });
// };

// chrome.runtime.onMessage.addListener(
//   async (
//     request: any,
//     sender: chrome.runtime.MessageSender,
//     sendResponse: (response?: any) => void
//   ) => {
//     try {
//       console.log(request);
//       switch (request.action) {
//         case "sendPrompt":
//           await handleImageJob(request, sender, sendResponse);
//           break;

//         case "setToken":
//           chrome.cookies.set({
//             url: "https://developer.civitai.com/",
//             name: "api_token",
//             value: request.value,
//             domain: ".civitai.com",
//           });
//           API_KEY = request.value;

//           initCivitai();

//           sendResponse({ valid: true });

//           break;

//         default:
//           console.log("Unknown action:", request.action);
//           sendResponse({ error: "Unknown action" });
//           break;
//       }
//     } catch (error) {
//       console.error(error);
//     }

//     return true;
//   }
// );

// chrome.runtime.onInstalled.addListener(() => {
//   console.log("Extension installed");
// });

chrome.runtime.onInstalled.addListener(() => {
  console.log("Background script installed.");
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "fetchData") {
    sendResponse({ data: "Data from background script" });
  }
});
