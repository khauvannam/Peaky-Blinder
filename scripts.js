"use strict";

const overlay = document.querySelector(".overlay");

//* SLIDE CREATE.
const btnRight = document.querySelector(".slider__btn--right");
const btnleft = document.querySelector(".slider__btn--left");
const slides = document.querySelectorAll(".slide");
let curSlide = 0;
const maxSlide = slides.length;
const dotContainer = document.querySelector(".dots");
let timeOut;

const creatDots = () => {
  slides.forEach((_, i) => {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};
creatDots();
const dots = document.querySelectorAll(".dots__dot");

//? ACTIVE DOTS
const activeDots = (slideNumber) => {
  dots.forEach((dot) => {
    dot.classList.remove("dots__dot--active");
  });
  document
    .querySelector(`.dots__dot[data-slide="${slideNumber}"]`)
    .classList.add("dots__dot--active");
};

//? SLIDE NEXT AND PREVIOUS.
const initSlide = (slideNumbers) => {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slideNumbers)}%)`;
  });
};
initSlide(curSlide);
activeDots(curSlide);

const nextSlide = () => {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  initSlide(curSlide);
  activeDots(curSlide);
  repeatAutoSlide();
};

const previousSlide = () => {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  initSlide(curSlide);
  activeDots(curSlide);
  repeatAutoSlide();
};

btnRight.addEventListener("click", nextSlide);
btnleft.addEventListener("click", previousSlide);

//? KEY IMPLEMENT.
document.addEventListener("keydown", (e) => {
  e.key === "ArrowRight" && nextSlide();
  e.key === "ArrowLeft" && preSlide();
});

//? MOVE SLIDE WITH DOTS.
dotContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("dots__dot")) {
    curSlide = +e.target.dataset.slide;
    initSlide(curSlide);
    activeDots(curSlide);
    repeatAutoSlide();
  }
});

//? AUTOMATIC SLIDE.
const autoSlide = () => {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  initSlide(curSlide);
  activeDots(curSlide);
};

// const time = setInterval(autoSlide, 3000);

const repeatAutoSlide = () => {
  clearInterval(time);
  clearTimeout(timeOut);
  timeOut = setTimeout(() => {
    setInterval(autoSlide, 3000);
  }, 15000);
};

//* STICKY HEADER.
const header = document.querySelector(".header__container");
const headerHeight = header.getBoundingClientRect().height;
const slider = document.querySelector(".slider");
const discount = document.querySelector(".discount");

const headerSticky = (entries) => {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    header.classList.add("is--sticky");
  }
};
const disCountRemoveSticky = (entries) => {
  const [entry] = entries;
  if (entry.isIntersecting) {
    header.classList.remove("is--sticky");
  }
};
const headerObserver = new IntersectionObserver(headerSticky, {
  root: null,
  threshold: 0,
  rootMargin: `${-headerHeight}px`,
});
const discountObserver = new IntersectionObserver(disCountRemoveSticky, {
  root: null,
  threshold: 1,
});

headerObserver.observe(slider);
discountObserver.observe(discount);

//* ACCESSORIES IMPLEMENTS.
const buttonContainer = document.querySelector(".button__container");
const buttonItem = document.querySelectorAll(".buttons__container--item");
const accessoriesProduct = document.querySelectorAll(".accessories__product");

buttonContainer.addEventListener("click", (e) => {
  const dataTab = e.target.closest(".buttons__container--item").dataset.tab;

  //? ADD CLASSLIST TO ALL TAGS
  buttonItem.forEach((item) => item.classList.remove("opacity--03"));
  accessoriesProduct.forEach((product) => product.classList.add("dp-none"));

  //? IMPLEMENT DOM
  e.target.closest(".buttons__container--item").classList.add("opacity--03");
  document
    .querySelector(`.accessories__products--${dataTab}`)
    .classList.remove("dp-none");
});

//* DROP--MENU IMPLEMENT.

const obj = {
  clothing: [
    "hoodies",
    "long sleeves",
    "sweatshirts",
    "t-shirt",
    "women t-shirt",
  ],
  accessories: [
    "bags",
    "cushions",
    "drinkware",
    "facemask",
    "hats",
    "notebooks",
    "phonecases",
    "socks",
    "wall art",
  ],
  characters: ["arthur shelby", "tommy shelby", "polly grey"],
  info: ["about peakyblinder", "faq", "return", "size guide", "delivery times"],
};

const headerItem = document.querySelectorAll(".header__button");
const headerContainer = document.querySelector(".header__nav");
const dropMenuContainer = document.querySelector(".drop--menu__list");
const dropMenu = document.querySelector(".drop--menu");
const fistChildHeader =
  document.querySelector(".header__nav").firstElementChild;

headerContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("header__nav--item")) return; //? Guard.

  const dropItemsData = e.target.closest(".header__button").dataset.head;
  const dropItems = e.target.closest(".header__button");
  dropMenuContainer.innerHTML = "";

  obj[dropItemsData].forEach((items) => {
    const html = `<div class="drop--menu__item">${items}</div>`;
    dropMenuContainer.insertAdjacentHTML("beforeend", html);
  });

  dropMenu.classList.remove("dp-none");
  overlay.classList.remove("dp-none");

  if (!dropItems.classList.contains("is--active")) {
    headerItem.forEach((e) => {
      e.classList.remove("is--active");
    });
  } else {
    dropMenu.classList.add("dp-none");
    overlay.classList.add("dp-none");
  }

  dropItems.classList.toggle("is--active");
});

overlay.addEventListener("click", function () {
  overlay.classList.add("dp-none");
  dropMenu.classList.add("dp-none");

  headerItem.forEach((e) => {
    e.classList.remove("is--active");
  });
});

//* PRODUCTS R2L ANIMATION.
const products = document.querySelectorAll(".product");

const productR2L = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.classList.add("is--Opacity");
  observer.unobserve(entry.target);
};

const productObserver = new IntersectionObserver(productR2L, {
  root: null,
  threshold: 0,
});

products.forEach((product) => {
  productObserver.observe(product);
});
