import ready from "../../js/utils/documentReady.js";
//import Swiper from "swiper";
//import { Autoplay, Navigation, Pagination } from "swiper/modules";

ready(function () {
  const insertAfter = (newNode, existingNode) => {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
  };

  const initSliders = () => {
    const heroSliders = document.querySelectorAll(".js-hero-slider");

    heroSliders.forEach((slider) => {
      const hero = document.querySelector(".hero");
      const content = hero.querySelectorAll(".hero__content-item");
      //const pagination = slider.querySelector(".swiper-pagination");
      const prevBtn = slider.querySelector(".swiper-btn-prev");
      const nextBtn = slider.querySelector(".swiper-btn-next");
      const imagesWrapper = slider.querySelector(".swiper-wrapper");
      const childs = imagesWrapper.children;
      const imageLastIndex = childs.length;
      const blob1 = hero.querySelector(".hero__blob--1 path");
      const blob2 = hero.querySelector(".hero__blob--2 path");
      const blobColor1 = ["#981140", "#D07B16", "#04634A"];
      const blobColor2 = ["#D07B16", "#04634A", "#981140"];
      const sectionColor = ["#B3315E", "#DC9138", "#067256"];
      let itr = 0;

      nextBtn.addEventListener("click", () => {
        childs[imageLastIndex - 1].classList.remove("hero__image--active");
        imagesWrapper.insertBefore(childs[imageLastIndex - 1], childs[0]);
        childs[imageLastIndex - 1].classList.add("hero__image--active");

        if (itr !== 2) {
          ++itr;
          blob1.setAttribute("fill", blobColor1[itr]);
          blob2.setAttribute("fill", blobColor2[itr]);
          hero.setAttribute("style", `background-color: ${sectionColor[itr]}`);
          content[itr - 1].classList.remove("hero__content-item--visible");
          content[itr].classList.add("hero__content-item--visible");
        } else {
          blob1.setAttribute("fill", blobColor1[0]);
          blob2.setAttribute("fill", blobColor2[0]);
          hero.setAttribute("style", `background-color: ${sectionColor[0]}`);
          itr = 0;
          content[0].classList.add("hero__content-item--visible");
          content[2].classList.remove("hero__content-item--visible");
        }
      });

      prevBtn.addEventListener("click", () => {
        childs[imageLastIndex - 1].classList.remove("hero__image--active");
        insertAfter(childs[0], childs[imageLastIndex - 1]);
        childs[imageLastIndex - 1].classList.add("hero__image--active");

        if (itr !== 0) {
          --itr;
          blob1.setAttribute("fill", blobColor1[itr]);
          blob2.setAttribute("fill", blobColor2[itr]);
          hero.setAttribute("style", `background-color: ${sectionColor[itr]}`);
          content[itr + 1].classList.remove("hero__content-item--visible");
          content[itr].classList.add("hero__content-item--visible");
        } else {
          blob1.setAttribute("fill", blobColor1[2]);
          blob2.setAttribute("fill", blobColor2[2]);
          hero.setAttribute("style", `background-color: ${sectionColor[2]}`);
          itr = 2;
          content[2].classList.add("hero__content-item--visible");
          content[0].classList.remove("hero__content-item--visible");
        }
      });

      /*new Swiper(slider, {
        modules: [Autoplay, Navigation, Pagination],
        slidesPerView: "auto",
        spaceBetween: 20,
        initialSlide: 2,
        effect: "fade",
        pagination: {
          el: pagination,
          clickable: true,
        },
        navigation: {
          nextEl: nextBtn,
          prevEl: prevBtn,
        },
      });*/
    });
  };

  const destroySliders = () => {
    const imageSliders = document.querySelectorAll(".js-hero-slider");

    imageSliders.forEach((slider) => {
      if (slider.swiper !== undefined) slider.swiper.destroy();
    });
  };

  const initSection = () => {
    const sections = document.querySelectorAll(".full-image-carousel");

    const sectionResizeObserver = new ResizeObserver(() => {
      destroySliders();
      initSliders();
    });

    destroySliders();
    initSliders();

    sections.forEach((item) => {
      sectionResizeObserver.observe(item);
    });
  };

  initSection();
});
