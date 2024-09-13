import {
  fetchApiKey,
  setApiKeyCookie,
} from "./handlers/backgroundScriptHandler";
import { Message, ActionTypes, BackgroundActions } from "./types";
import {
  handleImageJob,
  initCivitai,
  initSetCivitaiModels,
  updateJobs,
} from "./handlers/civitaiHandler";
import { FromTextInput } from "civitai/dist/types/Inputs";

// const db = IndexedDbHandler.getInstance();

chrome.runtime.onMessage.addListener(
  async (
    request: Message,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response?: Message) => void
  ) => {
    try {
      console.log(request);
      switch (request.action) {
        case "SET_API_KEY":
          if (typeof request?.value == "string") {
            setApiKeyCookie(request.value);

            const respMessage: Message = {
              action: BackgroundActions.SEND_API_KEY,
              valid: true,
              value: request.value,
              error: null,
            };

            sendResponse(respMessage);
          }

          break;

        // TODO: NOTE can send images via the background script, cant set up webhook as we need a client

        case "SEND_PROMPT":
          if (typeof request?.value == "object") {
            const imageJobResp = await handleImageJob(
              request.value as FromTextInput
            );

            const respMessage: Message = {
              action: BackgroundActions.GENERATION_RESULTS,
              valid: true,
              value: JSON.stringify(imageJobResp),
              error: null,
            };
            sendResponse(respMessage);
          }
          break;

        case "FETCH_MODELS":
          console.log("returning models");
          break;

        default:
          console.log("Unknown action:", request.action);
          sendResponse({
            action: BackgroundActions.UNKNOWN_ACTION,
            valid: false,
            value: "NULL",
            error: "Unknown action",
          });
          break;
      }
    } catch (error) {
      console.error(error);
    }

    return true;
  }
);

chrome.runtime.onInstalled.addListener(async (): Promise<void> => {
  const API_KEY = await fetchApiKey();

  if (API_KEY) {
    initCivitai(API_KEY);
  }

  console.log("Populating DB....");

  //TODO: add page so we can use this to fetch the different models instead of just of handling error
  const records = await initSetCivitaiModels();

  if (records != 0) {
    console.log(`${records}: number of records have been added to indexedDB`);
  }

  console.log("Background script installed.");
  console.log("Extension installed");
});

//TODO: work out a better way to handler polling
// (() =>
//   setInterval(async () => {
//     await updateJobs();
//   }, 2000))();
