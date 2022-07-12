import Swiper, { Thumbs, Scrollbar } from "swiper";
// import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";

import { API_URI } from "./var";

export const renderRecommendedItems = (goods, id) => {
  const recommendedCarusel = document.querySelector(".recommended__carusel");

  const ul = document.createElement("ul");
  ul.className = "swiper-wrapper";

  const cardsRecommended = goods.map((item) => {
    if (id != item.id) {
      const li = document.createElement("li");
      li.className = "swiper-slide";
      li.innerHTML = `
       <article class="goods-item">

        <a href="card.html?id=${item.id}">
          <img class="goods-item__image" src="${
            API_URI + item.images.present
          }" alt="${item.title}">
          <h3 class="goods-item__title">${item.title}</h3>
        </a>

        <div class="goods-item__buy">
          <p class="goods-item__price">${item.price}</p>
          <button class="goods-item__to-cart"
            data-id-goods = "${item.id}"
            aria-label="добавить товар в корзину">
            В корзину
          </button>
        </div>
      </article>
    `;
      return li;
    }
  });
  const swiperScrollBar = document.createElement("div");
  swiperScrollBar.className = "swiper-scrollbar";

  ul.append(...cardsRecommended);
  recommendedCarusel.append(ul, swiperScrollBar);

  new Swiper(".recommended__carusel", {
    spaceBetween: 10,
    slidesPerView: 2,
    scrollbar: {
      el: ".swiper-scrollbar",
      draggable: true,
    },
    modules: [Scrollbar],
    breakpoints: {
      768: {
        spaceBetween: 20,
        slidesPerView: 2,
      },

      1001: {
        spaceBetween: 20,
        slidesPerView: 3,
      },

      1300: {
        spaceBetween: 30,
        slidesPerView: 4,
      },
      1601: {
        spaceBetween: 30,
        slidesPerView: 5,
      },
    },
  });
};
