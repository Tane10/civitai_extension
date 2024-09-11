import { Civitai, Scheduler } from "civitai";

// // TODO: add handler for image in que i.e. check progress or websocket

// // TODO: add image display to see results

// //TODO: add small alert / notification to icon once image is generate

// //TODO: add more logs to give info on whats happening

// //TODO: add more input filed to allow better image generation i.e. different checkpoints, models, etc

// // TODO: display current buzz and how much is spent on image

// //TODO: add token validation

// // TODO: look into moving to vue as we are soon walking into more complex things

let civitai: Civitai | undefined;
let API_KEY: string | undefined;

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

const setApiKeyCookie = (apiKey: string): void => {
  const date = new Date();
  date.setDate(date.getDate() + 30);

  chrome.cookies.set({
    url: "http://localhost",
    name: "api_key",
    value: apiKey,
    expirationDate: date.getTime(),
  });

  API_KEY = apiKey;

  initCivitai();
};

chrome.runtime.onMessage.addListener(
  async (
    request: any,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response?: any) => void
  ) => {
    try {
      console.log(request);
      switch (request.action) {
        // case "sendPrompt":
        //   await handleImageJob(request, sender, sendResponse);
        //   break;

        case "set_api_key":
          setApiKeyCookie(request.value);
          sendResponse({ valid: true });

          break;

        default:
          console.log("Unknown action:", request.action);
          sendResponse({ error: "Unknown action" });
          break;
      }
    } catch (error) {
      console.error(error);
    }

    return true;
  }
);

chrome.runtime.onInstalled.addListener(async (): Promise<void> => {
  // const civApiKey = await chrome.cookies.get({
  //   name: "api_key",
  //   url: "http://localhost",
  // });

  // if (civApiKey) {
  //   API_KEY = civApiKey.value;
  //   initCivitai();
  // }

  console.log("Background script installed.");
  console.log("Extension installed");
});

//  * "urn:air:{base model i.e. SD1 or SDXL}:checkpoint:civitai:{id}@{moodel version}"
function formateCheckpoint({
  rawBaseModel,
  modelId,
  versionId,
}: {
  rawBaseModel: string;
  modelId: number;
  versionId: number;
}) {
  let baseModel = "";

  if (/SD 1[\*]?|SD 1/i.test(rawBaseModel)) {
    baseModel = "sd1";
  } else if (/sdxl/i.test(rawBaseModel)) {
    baseModel = "sdxl";
  } else if (/flux/i.test(rawBaseModel)) {
    baseModel = "flux";
  } else if (/Pony/i.test(rawBaseModel)) {
    baseModel = "sd1";
  } else {
    console.error("unknown model");
    return "";
  }

  // model: "urn:air:sd1:checkpoint:civitai:4384@128713",

  return `urn:air:${baseModel}:checkpoint:civitai:${modelId}@${versionId}`;
}

/**
 * Converts an object to URL-encoded query parameters.
 *
 * @param params - The object to convert to query parameters.
 * @returns The URL-encoded query string.
 */
const objectToQueryString = (params: Record<string, any>): string => {
  const queryString = Object.keys(params)
    .map((key) => {
      const value = params[key];

      // If the value is an array, map each item to a key=value format
      if (Array.isArray(value)) {
        return value
          .map(
            (item) => `${encodeURIComponent(key)}=${encodeURIComponent(item)}`
          )
          .join("&");
      }

      // For other types, directly encode the key and value
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .join("&");

  return queryString;
};

// Example usage:

(async () => {
  const queryParmsObj = {
    limit: 10,
    page: 1,
    sort: "Highest Rated",
    types: ["Checkpoint"],
  };

  const baseURL = "https://civitai.com/api/v1/";
  const queryParms = objectToQueryString(queryParmsObj);

  const url = `${baseURL}models?${queryParms}`;

  const modelsReq = await fetch(url, {
    headers: new Headers([["Content-Type", "application/json"]]),
    method: "GET",
  });

  const resp = await modelsReq.json();

  // console.log(resp.items);
  // console.log(resp.items[0].modelVersions[0]);

  // sd1
  // sdxl
  // flux

  const items = resp.items.map(
    (item: {
      id: any;
      name: any;
      nsfw: any;
      modelVersions: {
        baseModel: any;
        id: any;
      }[];
    }) => {
      return {
        modelId: item.id,
        name: item.name,
        nsfw: item.nsfw,
        latesModelVersion: item.modelVersions[0].id,
        modelUrn: formateCheckpoint({
          rawBaseModel: item.modelVersions[0].baseModel,
          modelId: item.id,
          versionId: item.modelVersions[0].id,
        }),
      };
    }
  );

  console.log(items);
})();
