var cursor = null;

document.addEventListener("mousemove", (e) => {
  if (cursor == null && matchMedia("(pointer:fine)").matches) {
    cursor = new MouseFollower({
      el: null,
      container: document.body,
      className: "mf-cursor",
      innerClassName: "mf-cursor-inner",
      textClassName: "mf-cursor-text",
      mediaClassName: "mf-cursor-media",
      mediaBoxClassName: "mf-cursor-media-box",
      iconSvgClassName: "mf-svgsprite",
      iconSvgNamePrefix: "-",
      iconSvgSrc: "",
      dataAttr: "cursor",
      hiddenState: "-hidden",
      textState: "-text",
      iconState: "-icon",
      activeState: "-active",
      mediaState: "-media",
      stateDetection: {
        "-pointer": "a,button",
        "-hidden": "iframe"
      },
      visible: true,
      visibleOnState: false,
      speed: 0.55,
      ease: "expo.out",
      overwrite: true,
      skewing: 0,
      skewingText: 0,
      skewingIcon: 0,
      skewingMedia: 0,
      skewingDelta: 0.001,
      skewingDeltaMax: 0.3,
      stickDelta: 0.15,
      showTimeout: 20,
      hideOnLeave: true,
      hideTimeout: 300,
      hideMediaTimeout: 300
    });
  }
});

document.querySelectorAll("button").forEach((b) => {
  b.setAttribute("data-cursor-stick", "");
});

var numbers = document.querySelectorAll(".game-item-image-selectors-number");
var rights = document.querySelectorAll(".game-item-image-right-arrow");
var lefts = document.querySelectorAll(".game-item-image-left-arrow");
var imgContainers = document.querySelectorAll(".game-item-images-container");

var realtimeNumbers = [];

for (var i = 0; i < imgContainers.length; i++) {
  (function (i) {
    numbers[i].innerHTML = `1/${imgContainers[i].childElementCount}`;
    if (imgContainers[i].childElementCount == 1) {
      numbers[i].classList.add("hidden");
    }

    realtimeNumbers.push(1);

    imgContainers[i].scrollTo(0, 0);

    if (realtimeNumbers[i] > 1) {
      lefts[i].classList.add("active");
    }
    if (realtimeNumbers[i] >= imgContainers[i].childElementCount) {
      rights[i].classList.remove("active");
    }

    if (realtimeNumbers[i] < imgContainers[i].childElementCount) {
      rights[i].classList.add("active");
    }
    if (realtimeNumbers[i] <= 1) {
      lefts[i].classList.remove("active");
    }

    rights[i].addEventListener("click", () => {
      if (realtimeNumbers[i] < imgContainers[i].childElementCount) {
        imgContainers[i].scrollLeft += imgContainers[i].querySelector("img").offsetWidth;
        realtimeNumbers[i] += 1;
        numbers[i].innerHTML = `${realtimeNumbers[i]}/${imgContainers[i].childElementCount}`;
      }

      if (realtimeNumbers[i] > 1) {
        lefts[i].classList.add("active");
      }
      if (realtimeNumbers[i] >= imgContainers[i].childElementCount) {
        rights[i].classList.remove("active");
      }
    });

    lefts[i].addEventListener("click", () => {
      if (realtimeNumbers[i] > 1) {
        imgContainers[i].scrollLeft -= imgContainers[i].querySelector("img").offsetWidth;
        realtimeNumbers[i] -= 1;
        numbers[i].innerHTML = `${realtimeNumbers[i]}/${imgContainers[i].childElementCount}`;
      }

      if (realtimeNumbers[i] < imgContainers[i].childElementCount) {
        rights[i].classList.add("active");
      }
      if (realtimeNumbers[i] <= 1) {
        lefts[i].classList.remove("active");
      }
    });
  })(i);
}

document.querySelectorAll(".button-with-menu").forEach((b) => {
  b.addEventListener("click", (e) => {
    if (e.target.classList.contains("active")) {
      e.target.classList.remove("active");
      e.target.parentElement.querySelector(".header-menu").classList.remove("active");
    } else {
      e.target.classList.add("active");
      e.target.parentElement.querySelector(".header-menu").classList.add("active");
    }
  });
});

const header = document.querySelector(".header");
const headerMenu = header.querySelector(".header-menu");
const buttonWithMenu = header.querySelector(".button-with-menu");

var wasActive = false;
var lastScroll = 0;
window.onscroll = () => {
  if (getScrollPosition() > lastScroll) {
    header.classList.remove("active");
    headerMenu.classList.remove("active");
    buttonWithMenu.classList.remove("active");
  } else {
    header.classList.add("active");
  }
  lastScroll = getScrollPosition();
};

const getScrollPosition = () => {
  return window.pageYOffset !== undefined ? window.pageYOffset : window.scrollTop;
};
