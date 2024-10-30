import ts from "typescript";
import {
  fetchApiKey,
  setApiKeyCookie,
} from "../../src/handlers/backgroundScriptHandler";
import chrom}

describe.only("Background Script  Handler Test Suit", () => {
  it("Return API KEY after setting API_KEY cookie", async () => {
    const testKey = setApiKeyCookie("test_api_key", "test_api_key");

    const expectedKey = await new Promise<chrome.cookies.Cookie | null>(
      (resolve, reject) => {
        chrome.cookies.get(
          { url: "http://localhost", name: "api_key" },
          (cookie) => {
            if (chrome.runtime.lastError) {
              reject(chrome.runtime.lastError);
            } else {
              resolve(cookie);
            }
          }
        );
      }
    );

    expect(chrome.cookies.set).toHaveBeenCalledTimes(1);
    expect(testKey).toStrictEqual("test_api_key");
    expect(expectedKey?.value).toStrictEqual("test_api_key");
  });
});
