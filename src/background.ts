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
