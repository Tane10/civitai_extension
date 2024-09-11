import { setApiKeyCookie } from "./serviceManager";
import { Message, ActionTypes, BackgroundActions } from "./types";

chrome.runtime.onMessage.addListener(
  async (
    request: Message,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response?: Message) => void
  ) => {
    try {
      console.log(request);
      switch (request.action) {
        // case "sendPrompt":
        //   await handleImageJob(request, sender, sendResponse);
        //   break;

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

  console.log("Background script installed.");
  console.log("Extension installed");
});
