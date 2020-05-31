'use strict'
const IMAGE_COUNT = 3;
const ANIMATION_TIMER = 2000;
const BACK_SLIDE_TIMER = 1000;
let btnPrev = document.querySelector('.button--prev');
let btnNext = document.querySelector('.button--next');

let imageFront = document.querySelector('.galery__photo--showed-front img');
let imageBack = document.querySelector('.galery__photo--showed-back img');

let counterFront = 1;
let counterBack = 3;

let changeImageNext = function() {
  counterFront ++;
  counterBack ++;

  if (counterFront > IMAGE_COUNT) {
    counterFront = 1;
  }

  if (counterBack > IMAGE_COUNT) {
    counterBack = 1;
  }

imageFront.src = 'img/photo-slide' + counterFront + ".jpg";
imageBack.src = 'img/photo-slide' + counterBack + ".jpg";
};

let changeImagePrev = function () {
  counterFront --;
  counterBack --;
  if (counterFront < 1) {
    counterFront = 3;
  }

  if (counterBack < 1) {
    counterBack = 3;
  }

  imageFront.src = 'img/photo-slide' + counterFront + ".jpg";
  imageBack.src = 'img/photo-slide' + counterBack + ".jpg";
};

let animationImageNext = function () {
  imageFront.classList.add("animation__current");
  setTimeout(function () {
    imageBack.classList.add("animation__current");
  }, BACK_SLIDE_TIMER);

  setTimeout(function () {
    changeImageNext();
    imageFront.classList.add("animation__next");
    setTimeout(function () {
      imageBack.classList.add("animation__next");
    }, BACK_SLIDE_TIMER);
    setTimeout(function () {
      imageFront.removeAttribute("class");
      imageBack.removeAttribute("class");
    }, ANIMATION_TIMER);
  }, ANIMATION_TIMER);
};

let animationImageprev = function () {
  imageFront.classList.add("animation__current");
  setTimeout(function () {
    imageBack.classList.add("animation__current");
  }, BACK_SLIDE_TIMER);
    setTimeout(function () {
      changeImagePrev();
      imageFront.classList.add("animation__next");
      setTimeout(function () {
        imageBack.classList.add("animation__next");
      }, BACK_SLIDE_TIMER);
      setTimeout(function () {
        imageFront.removeAttribute("class");
        imageBack.removeAttribute("class");
      }, ANIMATION_TIMER);
    }, ANIMATION_TIMER);
};

let btnNextClickHandler = function () {
  animationImageNext();
};

let btnPrevClickHandler = function () {
  animationImageprev();
};

btnNext.addEventListener('click', btnNextClickHandler);
btnPrev.addEventListener('click', btnPrevClickHandler);



