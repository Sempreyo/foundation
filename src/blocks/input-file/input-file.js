import ready from "../../js/utils/documentReady";

ready(function () {
  const fileInputs = document.querySelectorAll(".input-file");

  if (fileInputs.length !== 0) {
    for (let fileInput of fileInputs) {
      const fileInputMessage = "Выбрать файл";
      const fileInputTitle = fileInput.querySelector(".input-file__title");
      const fileInputField = fileInput.querySelector(".input-file__input");

      fileInputTitle.innerText = fileInputMessage;

      fileInput.addEventListener("change", function (event) {
        const [file] = event.target.files;
        fileInputTitle.innerText = file.name;
      });
      fileInput.addEventListener("input", function () {
        if (fileInputField.value.length !== 0) {
          fileInputField.classList.add("input-file__input--has-value");
        }
      });
    }
  }
});
