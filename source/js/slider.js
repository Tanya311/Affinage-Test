let btn_prev = document.querySelector('.button--prev');
let btn_next = document.querySelector('.button--next');

let images = document.querySelectorAll('.galery__photo');
let i = 0;



btn_next.onclick = function(){
     i = i + 1; /* i++ */

     if(i >= images.length){
         i = 1;
     }

     alert(i);
     images[i - 1].classList.add('galery__photo--showed-back');
     images[i - 1].classList.remove('galery__photo--none');
     images[i - 1].classList.remove('galery__photo--showed-front');

     images[i].classList.add('galery__photo--showed-front');
     images[i].classList.remove('galery__photo--showed-back');
     images[i].classList.remove('galery__photo--none');

     images[i + 1].classList.add('galery__photo--none');
     images[i + 1].classList.remove('galery__photo--showed-front');
     images[i + 1].classList.remove('galery__photo--showed-back');

}

