import ready from "../../js/utils/documentReady.js";

ready(function () {
  const foundersSection = document.querySelector(".founders");
  const foundersColors = ["#067256", "#B3315E"];
  const tabsWr = foundersSection.querySelector(".founders__wrapper");
  const tabs = foundersSection.querySelectorAll(".js-founders-tab");
  const tabsContent = foundersSection.querySelectorAll(".founders__content-item");

  const fadeIn = (el, timeout, display) => {
    el.style.opacity = 0;
    el.style.display = display || "block";
    el.style.transition = `opacity ${timeout}ms`;
    setTimeout(() => {
      el.style.opacity = 1;
    }, 10);
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", (e) => {
      tabs.forEach((item) => item.classList.remove("active"));
      tabsContent.forEach((item) => (item.style.display = "none"));

      e.currentTarget.classList.add("active");
      fadeIn(tabsContent[index], 300);
      foundersSection.style.backgroundColor = foundersColors[index];
    });

    const image = tab.querySelector(".founders__cursor");

    /* Картинка следующая за курсором */
    tab.addEventListener("mousemove", (e) => {
      if (!tab.classList.contains("active")) {
        image.style.left = `${
          e.pageX - tab.getBoundingClientRect().left - image.offsetWidth / 2
        }px`;
        image.style.top = `${
          e.pageY - tab.getBoundingClientRect().top - pageYOffset - image.offsetWidth / 2
        }px`;
      }
    });

    /* Анимировать подпись */
    const foundersObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sign = foundersSection.querySelectorAll(
              ".founders__content-item .founders__sign svg",
            );

            sign.forEach((el) => (el.style.animation = "dash 3s linear forwards"));
          } else {
            const sign = foundersSection.querySelectorAll(
              ".founders__content-item .founders__sign svg",
            );

            sign.forEach((el) => (el.style.animation = "none"));
          }
        });
      },
      { threshold: 0.1 },
    );

    foundersObserver.observe(tabsWr);
  });
});
