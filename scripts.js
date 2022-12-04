"use strict";

//? SLIDE CREATE.
const btnRight = document.querySelector(".slider__btn--right");
const btnleft = document.querySelector(".slider__btn--left");
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dots__dot");
let curSlide = 0;
const maxSlide = slides.length;
const dotContainer = document.querySelector(".dots");
const creatDots = () => {
  slides.forEach((_, i) => {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};
creatDots();

const initSlide = (slideNumbers) => {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slideNumbers)}%)`;
  });
};
initSlide(curSlide);

const nextSlide = () => {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  initSlide(curSlide);
};

const previousSlide = () => {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  initSlide(curSlide);
};

btnRight.addEventListener("click", nextSlide);
btnleft.addEventListener("click", previousSlide);

//? KEY IMPLEMENT.
document.addEventListener("keydown", (e) => {
  e.key === "ArrowRight" && nextSlide();
  e.key === "ArrowLeft" && preSlide();
});

//? ACTIVE DOTS
dotContainer.addEventListener("click", (e) => {
  const dotBtn = e.target.closest(".dots__dot");
  dots.forEach((dot) => {
    dot.classList.remove("dots__dot--active");
  });
  dotBtn.classList.add("dots__dot--active");
});
