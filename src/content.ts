// A content script is JavaScript that runs directly within the context of a web page
// chrome.runtime.sendMessage({ ask: "cookies" }, (response) => {
//   console.log(response.ans); // Receive response from background script
// });

// chrome.runtime.connect()

let onPage = document.URL == "https://civitai.com/generate";

if (onPage) {
  document.addEventListener("click", () => {});
}
