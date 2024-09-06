//TODO: implement these actions in App.tsx

const fetchApiKey = async (): Promise<string> => {
  try {
    const cookie = await new Promise<chrome.cookies.Cookie | null>(
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

    return cookie ? cookie.value : ""; // Return the cookie value if found, otherwise empty string
  } catch (error) {
    console.error("Error fetching API key:", error);
    return ""; // Return empty string in case of error
  }
};

const setApiKeyCookie = (apiKey: string): string => {
  const date = new Date();
  date.setDate(date.getDate() + 30);

  chrome.cookies.set({
    url: "http://localhost",
    name: "api_key",
    value: apiKey,
    expirationDate: date.getTime(),
  });

  return apiKey;
};
