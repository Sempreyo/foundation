import ready from "../../js/utils/documentReady.js";

ready(function () {
  const body = document.querySelector("body");
  const header = document.querySelector(".header");
  const burger = header.querySelector(".header__burger");
  const close = header.querySelector(".menu__close");
  const menu = header.querySelector(".menu");

  /* Smart header */
  let previousTop = window.scrollY;
  header.classList.remove("hide");

  document.addEventListener("scroll", () => {
    let currentTop = window.scrollY;

    if (currentTop > 320 && currentTop > previousTop) {
      header.classList.add("hide");
    } else {
      header.classList.remove("hide");
    }
    previousTop = currentTop;

    document.querySelectorAll(".menu-curtain").forEach((el) => {
      el.classList.remove("opened");
    });
  });

  burger.addEventListener("click", () => {
    burger.classList.add("opened");
    menu.classList.add("showed");
    body.classList.add("body-scroll-lock");
  });

  close.addEventListener("click", () => {
    burger.classList.remove("opened");
    menu.classList.remove("showed");
    body.classList.remove("body-scroll-lock");
  });
});
