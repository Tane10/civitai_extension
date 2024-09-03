document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("promptForm");

  // have to cast to input element
  const textarea = <HTMLInputElement>document.getElementById("promptField");

  if (form && textarea) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const prompt = textarea.value;
      if (prompt) {
        chrome.runtime.sendMessage({ type: "prompt", value: prompt });
      }
    });
  }
});
