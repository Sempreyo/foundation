import ready from "../../js/utils/documentReady";
import IMask from "imask";

ready(function () {
  // input
  const inputs = document.querySelectorAll(".input");

  if (inputs.length !== 0) {
    for (let input of inputs) {
      if (input.value.length !== 0) input.classList.add("input--has-value");

      input.addEventListener("input", function () {
        this.value.length !== 0
          ? this.classList.add("input--has-value")
          : this.classList.remove("input--has-value");
      });
    }
  }

  // phone input
  const phoneFields = document.querySelectorAll(" input[type=tel]");

  if (phoneFields) {
    phoneFields.forEach((field) => {
      IMask(field, {
        mask: "+{7} (000) 000-00-00",
      });
    });
  }
});
