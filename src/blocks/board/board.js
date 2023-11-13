import ready from "../../js/utils/documentReady.js";
import Swiper from "swiper";
import { Navigation, EffectCards, EffectFade, Thumbs } from "swiper/modules";

ready(function () {
  const boardSection = document.querySelector(".board");
  const boardSliders = boardSection.querySelectorAll(".js-board-slider");
  const infoSliders = boardSection.querySelectorAll(".js-info-slider");
  const boardMobileSliders = boardSection.querySelectorAll(".js-mobile-board-slider");
  const prevBtn = boardSection.querySelector(".swiper-btn-prev");
  const nextBtn = boardSection.querySelector(".swiper-btn-next");

  /* Анимировать подпись */
  const boardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sign = boardSection.querySelectorAll(".board__sign svg");

          sign.forEach((el) => (el.style.animation = "dash 3s linear forwards"));
        } else {
          const sign = boardSection.querySelectorAll(".board__sign svg");

          sign.forEach((el) => (el.style.animation = "none"));
        }
      });
    },
    { threshold: 0.4 },
  );

  boardObserver.observe(boardSection);

  const initSliders = () => {
    boardSliders.forEach((slider, index) => {
      const thumbs = new Swiper(infoSliders[index], {
        modules: [EffectFade],
        slidesPerView: 1,
        effect: "fade",
        on: {
          slideChange: function (swiper) {
            sliderMain.slideTo(swiper.realIndex);
          },
        },
      });

      const sliderMain = new Swiper(slider, {
        modules: [Navigation, EffectCards, Thumbs],
        slidesPerView: 1,
        effect: "cards",
        cardsEffect: {
          perSlideOffset: 10,
          perSlideRotate: 0,
          slideShadows: false,
        },
        thumbs: {
          swiper: thumbs,
        },
        navigation: {
          nextEl: nextBtn,
          prevEl: prevBtn,
        },
      });
    });
  };

  const initMobileSliders = () => {
    boardMobileSliders.forEach((slider) => {
      new Swiper(slider, {
        slidesPerView: 1.1,
        spaceBetween: 20,
      });
    });
  };

  const destroySliders1 = () => {
    const boardSliders = document.querySelectorAll(".js-board-slider");

    boardSliders.forEach((slider) => {
      if (slider.swiper !== undefined) slider.swiper.destroy();
    });
  };

  const destroySliders2 = () => {
    const infoSliders = document.querySelectorAll(".js-info-slider");

    infoSliders.forEach((slider) => {
      if (slider.swiper !== undefined) slider.swiper.destroy();
    });
  };

  const destroyMobileSliders = () => {
    const boardMobileSliders = boardSection.querySelectorAll(".js-mobile-board-slider");

    boardMobileSliders.forEach((slider) => {
      if (slider.swiper !== undefined) slider.swiper.destroy();
    });
  };

  const initSection = () => {
    const sections = document.querySelectorAll(".board");

    const sectionResizeObserver = new ResizeObserver(() => {
      destroySliders2();
      destroySliders1();
      destroyMobileSliders();
      initSliders();
      initMobileSliders();
    });

    destroySliders2();
    destroySliders1();
    destroyMobileSliders();
    initSliders();
    initMobileSliders();

    sections.forEach((item) => {
      sectionResizeObserver.observe(item);
    });
  };

  initSection();
});
