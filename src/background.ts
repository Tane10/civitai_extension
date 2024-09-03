/**
 * Background Script Advantages:
Has access to privileged APIs: chrome.cookies, chrome.storage, chrome.tabs, etc.
Can run background processes that aren't tied to any specific webpage.
Handles events like browser actions, alarms, or messages from content scripts
 */

// let cookies;

// let active = true;

// let apiKey = "";
// (async () => {
//   const cookies = chrome.cookies.getAll({ url: "https://civitai.com/*" });

//   for (cookie of cookies) {
//     if (cookies.name == "__Secure-civitai-token") {
//       cookies = cookies;
//       break;
//     }
//   }
// })();

// if (cookies) {
//   chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     if (request.ask === "cookies") {
//       sendResponse({ ans: cookies });
//     }
//   });
// }

// async function createAopiKey() {
//   const addKey = await fetch("https://civitai.com/api/auth/csrf");

//   console.log(addKey.json());
// }

// while (active) {
//   if (!document.URL.includes("https://civitai.com/")) {
//     active = false;
//   }
// }

// 573ef6750e41ab99fba32a8311ddcdfb

// Preuroser => logged in already

// (async () => {
//   let csrfToken;
//   const fetchCsrf = await fetch("https://civitai.com/api/auth/csrf");

//   if (fetchCsrf.ok) {
//     csrfToken = (await addKey.json())["csrfToken"];
//   }

//   const authViaRedit = await fetch(
//     "https://civitai.com/api/auth/signin/reddit",
//     {
//       method: "POST",
//       body: { callbackUrl: "/", csrfToken, json: true },
//       headers: {
//         "Content-Type": "application/json; charset=utf-8",
//         Accept: "application/json",
//       },
//     }
//   );

//   // https://civitai.com/api/auth/signin/reddit

//   console.log(await addKey.json());
// })();

// (async () => {
//   let csrfToken;
//   const fetchCsrf = await fetch("https://civitai.com/api/auth/civ-token");

//   console.log(fetchCsrf);

//   if (fetchCsrf.ok) {
//     console.log(await addKey.json());
//   }

//   // const authViaRedit = await fetch(
//   //   "https://civitai.com/api/auth/signin/reddit",
//   //   {
//   //     method: "POST",
//   //     body: { callbackUrl: "/", csrfToken, json: true },
//   //     headers: {
//   //       "Content-Type": "application/json; charset=utf-8",
//   //       Accept: "application/json",
//   //     },
//   //   }
//   // );

//   // // https://civitai.com/api/auth/signin/reddit

//   // console.log(await addKey.json());
// })();
