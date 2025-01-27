const goBack = document.querySelector("[go-back]");
if (goBack) {
  goBack.addEventListener("click", () => {
    window.history.back();
  });
}