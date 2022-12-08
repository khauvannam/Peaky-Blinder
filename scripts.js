"use strict";

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

const time = setInterval(autoSlide, 3000);

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
