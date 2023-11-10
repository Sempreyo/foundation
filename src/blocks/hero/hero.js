import ready from "../../js/utils/documentReady.js";
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import { gsap } from "../../js/utils/gsap.min";

ready(function () {
  const hero = document.querySelector(".hero");
  const heroSliders = document.querySelectorAll(".js-hero-slider");
  const content = document.querySelectorAll(".hero__content-item");
  const blob = document.querySelector(".hero__blob path");
  const blobColors = ["#981140", "#D07B16", "#04634A"];
  const blobItems = document.querySelectorAll(".hero__blob-switcher svg");
  const prevBtn = document.querySelector(".swiper-btn-prev");
  const nextBtn = document.querySelector(".swiper-btn-next");
  const pagination = document.querySelector(".hero__pagination");

  /* Заблокировать кнопки */
  const navigationLock = (prev, next) => {
    if (window.matchMedia("(min-width: 768px)").matches) {
      prev.classList.add("disable");
      next.classList.add("disable");
    }
  };

  /* Разблокировать кнопки */
  const navigationUnlock = (prev, next) => {
    if (window.matchMedia("(min-width: 768px)").matches) {
      prev.classList.remove("disable");
      next.classList.remove("disable");
    }
  };

  /* Сменить бэкграунд */
  const changeBg = (elem, color) => {
    if (window.matchMedia("(min-width: 768px)").matches) {
      gsap.to(elem, {
        duration: 0,
        backgroundColor: color,
        ease: "none",
      });
    }
  };

  /* Убрать предыдущий элемент в начальное положение за экраном */
  const setPrevState = (elem, isReverse) => {
    gsap.to(elem, {
      duration: isReverse ? 0.6 : 0,
      zIndex: 0,
      x: "-100%",
      y: "100%",
      scale: 1,
      ease: "none",
    });
  };

  /* Показать следующий элемент (блоб) на экране */
  const setNextState = (elem) => {
    gsap.to(elem, { duration: 0.6, zIndex: 1, x: 0, y: 0, scale: 1, ease: "none" });
  };

  /* Растянуть блоб на весь экран (бэкграунд) */
  const setCurrentState = (elem, callback) => {
    gsap.to(elem, {
      duration: 0.6,
      zIndex: 0,
      scale: 25,
      transformOrigin: "bottom left",
      ease: "none",
      onComplete: callback,
    });
  };

  const initSliders = () => {
    heroSliders.forEach((slider, index) => {
      if (window.matchMedia("(max-width: 767px)").matches && index > 0) {
        return;
      }

      new Swiper(slider, {
        modules: [Navigation, Pagination],
        slidesPerView: 1,
        loop: true,
        touchEventsTarget: "container",
        pagination: {
          el: pagination,
          clickable: true,
        },
        navigation: {
          nextEl: nextBtn,
          prevEl: prevBtn,
        },
        on: {
          navigationNext: function (swiper) {
            /* Блокируем кнопки на время анимации */
            navigationLock(prevBtn, nextBtn);

            changeBg(
              hero,
              blobItems[swiper.realIndex === 0 ? swiper.slides.length - 1 : swiper.realIndex - 1]
                .querySelector("path")
                .getAttribute("fill"),
            );

            setPrevState(
              blobItems[swiper.realIndex === 0 ? swiper.slides.length - 1 : swiper.realIndex - 1],
            );

            setNextState(
              blobItems[swiper.realIndex === swiper.slides.length - 1 ? 0 : swiper.realIndex + 1],
            );

            setCurrentState(blobItems[swiper.realIndex], function () {
              /* Разблокируем кнопки как только анимация закончилась */
              navigationUnlock(prevBtn, nextBtn);
            });
          },
          navigationPrev: function (swiper) {
            /* Блокируем кнопки на время анимации */
            navigationLock(prevBtn, nextBtn);

            /*changeBg(
              hero,
              blobItems[swiper.realIndex === swiper.slides.length - 1 ? 0 : swiper.realIndex + 1]
                .querySelector("path")
                .getAttribute("fill"),
            );*/

            setPrevState(
              blobItems[swiper.realIndex === 0 ? swiper.slides.length - 1 : swiper.realIndex - 1],
              true,
            );

            setNextState(
              blobItems[swiper.realIndex === swiper.slides.length - 1 ? 0 : swiper.realIndex + 1],
            );

            setCurrentState(blobItems[swiper.realIndex], function () {
              /* Разблокируем кнопки как только анимация закончилась */
              navigationUnlock(prevBtn, nextBtn);
            });
          },
          slideChange: function (swiper) {
            const contentActive = document.querySelector(".hero__content-item--visible");
            /* Меняем контент */
            contentActive.classList.remove("hero__content-item--visible");
            content[swiper.realIndex].classList.add("hero__content-item--visible");

            /* Меняем цвет у верхнего блоба */
            blob.setAttribute("fill", blobColors[swiper.realIndex]);
          },
        },
      });
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
