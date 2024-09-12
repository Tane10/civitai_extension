import { ActionTypes, Message } from "../types";

const buildMessage = ({
  action,
  value,
}: {
  action: ActionTypes;
  value: string | Record<any, any>;
}): Message => {
  // const timestamp = new Date().getTime();

  return {
    action,
    value,
    valid: true,
    error: null,
    // timestamp,
  };
};

// Define the response type from the background script.
interface MessageResponse {
  error?: string;
  [key: string]: any; // Allow any additional properties in the response
}

// Refactor to make async/await usage clearer
export const messageHandler = async ({
  action,
  value,
}: {
  action: ActionTypes;
  value: string | Record<any, any>;
}): Promise<MessageResponse> => {
  const message = buildMessage({ action, value });

  try {
    // Wrap chrome.runtime.sendMessage in a Promise to use async/await
    const response: MessageResponse = await new Promise((resolve, reject) => {
      chrome.runtime.sendMessage(message, (response) => {
        if (chrome.runtime.lastError) {
          // If there's a runtime error, reject the promise with the error
          console.error("Message failed:", chrome.runtime.lastError.message);
          reject(new Error(chrome.runtime.lastError.message));
        } else if (response && response.error) {
          // If the background script returns an error, reject with the error
          console.error("Background script error:", response.error);
          reject(new Error(response.error));
        } else {
          // Otherwise, resolve the promise with the response
          console.log(response);
          resolve(response);
        }
      });
    });

    // Return the successful response
    return response;
  } catch (error) {
    // Log and rethrow any errors caught in the try block
    console.error("Error in messageHandler:", error);
    throw error;
  }
};
