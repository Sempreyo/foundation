import ready from "../../js/utils/documentReady";
import autosize from "autosize";

ready(function () {
  // textarea
  const textareas = document.querySelectorAll(".textarea");

  if (textareas.length !== 0) {
    for (let textarea of textareas) {
      if (textarea.value.length !== 0) {
        autosize(textarea);
        textarea.classList.add("textarea--has-value");
      }

      textarea.addEventListener("input", function () {
        this.value.length !== 0
          ? this.classList.add("textarea--has-value")
          : this.classList.remove("textarea--has-value");
      });
    }
  }

  autosize(textareas);
});
