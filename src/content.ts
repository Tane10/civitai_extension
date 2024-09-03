const handlePromptForm = (): void => {
  const form = <HTMLFormElement>document.getElementById("promptForm");

  // have to cast to input element
  const textarea = <HTMLTextAreaElement>document.getElementById("promptField");

  if (form && textarea) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const prompt = textarea.value;
      if (prompt) {
        chrome.runtime.sendMessage({ action: "sendPrompt", value: prompt });
      }
    });
  }
};

const handleTokenForm = (): void => {
  const tokenForm = <HTMLFormElement>document.getElementById("tokenForm");

  // have to cast to input element
  const tokenInput = <HTMLInputElement>document.getElementById("tokenInput");

  if (tokenForm && tokenInput) {
    tokenForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const token = tokenInput.value;

      if (token) {
        chrome.runtime.sendMessage(
          { action: "setToken", value: token },
          (response) => {
            if (response.valid) {
              const tokenEle = document.getElementById("containerToken");

              if (tokenEle) {
                tokenEle.style.display = "none";
              }
            }
          }
        );
      }
    });
  }
};

document.addEventListener("DOMContentLoaded", () => {
  handlePromptForm();
  handleTokenForm();
});
