import ready from "../../js/utils/documentReady.js";

ready(function () {
  function makeTabs(tabs, panes) {
    const tabsLabels = tabs.children;
    const tabsPanes = panes.children;

    Array.from(tabsLabels).forEach((elem) => {
      elem.addEventListener("click", activateTab);
    });

    function activateTab(e) {
      e.preventDefault();
      Array.from(tabsLabels).forEach(function (label) {
        label.classList.remove("tabs__label--active");
      });
      [].forEach.call(tabsPanes, function (pane) {
        pane.classList.remove("tabs__pane--active");
      });
      e.target.classList.add("tabs__label--active");
      let clickedTab = e.target.getAttribute("data-href");
      document.querySelector(clickedTab).classList.add("tabs__pane--active");
    }
  }

  let tabs = document.querySelector(".tabs__labels");
  let panes = document.querySelector(".tabs__panes");

  makeTabs(tabs, panes);
});
