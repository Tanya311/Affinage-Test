'use strict'
const IMAGE_COUNT = 3;
let btnPrev = document.querySelector('.button--prev');
let btnNext = document.querySelector('.button--next');

let imageFontBlock = document.querySelector('.galery__photo--showed-front');
let imageBackBlock = document.querySelector('.galery__photo--showed-back');
let imageFront = document.querySelector('.galery__photo--showed-front img');
let imageBack = document.querySelector('.galery__photo--showed-back img');
let i = 1;
let j = 3;


let changeImageNext = function() {
  i++;
  j++;

  if (i > IMAGE_COUNT) {
    i = 1;
  }

  if (j > IMAGE_COUNT) {
    j = 1;
  }

imageFront.src = 'img/photo-slide' + i + ".jpg";
imageBack.src = 'img/photo-slide' + j + ".jpg";
};

let changeImagePrev = function () {
  i--;
  j--;
  if (i < 1) {
    i = 3;
  }

  if (j < 1) {
    j = 3;
  }

  imageFront.src = 'img/photo-slide' + i + ".jpg";
  imageBack.src = 'img/photo-slide' + j + ".jpg";
};

let btnNextClickHandler = function () {
  changeImageNext();
};

let btnPrevClickHandler = function () {
  changeImagePrev();
};

btnNext.addEventListener('click', btnNextClickHandler);
btnPrev.addEventListener('click', btnPrevClickHandler);



