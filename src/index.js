import "./index.html";
import "./card.html";
import "./cart.html";
import "./index.scss";

// import Swiper JS
import Swiper, { Thumbs, Scrollbar } from "swiper";
// import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";

import { pagination } from "./modules/pagination";

const paginationWrapper = document.querySelector(".pagination");
// получаем URL параметры страницы
const pageURL = new URL(location);
// из URL получаем параметр текущей страницы page
// если параметра нет- задаем страницу 1

// +    это делаем строку числом
const page = +pageURL.searchParams.get("page") || 1;

// передаем 4 параметра: wrapper, pages, page, count
// 1 paginationWrapper
// 2. количество найденных страниц /сначала оно неизвестно, прсото ставлю 20
// 3. текущий номер страницы
// 4. сколько  страниц отображать в пагинации

try {
  pagination(paginationWrapper, 10, page, 6);
} catch (error) {
  console.warn(error);
  console.warn("Это не главная страница");
}

const thumbSwiper = new Swiper(".card__slider-thumb", {
  spaceBetween: 44,
  slidesPerView: 3,
  scrollbar: {
    el: ".swiper-scrollbar",
    draggable: true,
  },
  modules: [Scrollbar],
});

new Swiper(".card__image", {
  spaceBetween: 10,
  slidesPerView: 1,
  thumbs: {
    swiper: thumbSwiper,
    slideThumbActiveClass: "card__thumb-btn_active",
  },
  modules: [Thumbs],
});

new Swiper(".recommended__carusel", {
  spaceBetween: 30,
  slidesPerView: 5,
});
