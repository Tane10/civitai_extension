import { setApiKeyCookie } from "./handlers/backgroundScriptHandler";
import { Message, ActionTypes, BackgroundActions } from "./types";
import { initSetCivitaiModels } from "./handlers/civitaiHandler";

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

        case "SEND_PROMPT":
          if (typeof request?.value == "object") {
            console.log("generating images");
            //   await handleImageJob(request, sender, sendResponse);
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
  // const civApiKey = await chrome.cookies.get({
  //   name: "api_key",
  //   url: "http://localhost",
  // });

  // if (civApiKey) {
  //   API_KEY = civApiKey.value;
  //   initCivitai();
  // }

  console.log("Populating DB....");

  const records = await initSetCivitaiModels();

  if (records != 0) {
    console.log(`${records}: number of records have been added to indexedDB`);
  }

  console.log("Background script installed.");
  console.log("Extension installed");
});
