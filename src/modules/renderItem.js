import Swiper, { Thumbs, Scrollbar } from "swiper";
// import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";

import { API_URI } from "./var";

const createCardImageSlider = (largeImages) => {
  const ul = document.createElement("ul");
  ul.className = "swiper-wrapper";

  const cardImageSlides = largeImages.map((url) => {
    const li = document.createElement("li");
    li.className = "swiper-slide";

    const img = new Image();
    img.src = `${API_URI}${url}`;
    li.append(img);
    return li;
  });
  ul.append(...cardImageSlides);
  return ul;
};

const createCardImageThumbSlider = (smallImages) => {
  const ul = document.createElement("ul");
  ul.className = "swiper-wrapper";

  const cardImageSlides = smallImages.map((url) => {
    const li = document.createElement("li");
    li.className = "swiper-slide";
    const button = document.createElement("button");
    button.className = "card__thumb-btn";
    const img = new Image();
    img.src = `${API_URI}${url}`;
    button.append(img);
    li.append(button);
    return li;
  });
  ul.append(...cardImageSlides);
  return ul;
};

const createParams = (params) => {
  const list = [];
  for (const key in params) {
    const li = document.createElement("li");
    li.className = "card__params-item";
    li.innerHTML = `
      <span>${key}</span>
      <span>${params[key]}</span>
    `;
    list.push(li);
  }
  return list;
};

const createDescritionText = (descriptions) => {
  const list = [];
  for (const description of descriptions) {
    const p = document.createElement("p");
    p.innerHTML = description;
    list.push(p);
  }
  return list;
};

export const renderItem = (item) => {
  const cardImage = document.querySelector(".card__image");

  cardImage.append(createCardImageSlider(item.images.large));

  const cardSliderThumb = document.querySelector(".card__slider-thumb");

  const swiperScrollBar = document.createElement("div");
  swiperScrollBar.className = "swiper-scrollbar";
  cardSliderThumb.append(
    createCardImageThumbSlider(item.images.small),
    swiperScrollBar
  );

  const cardTitle = document.querySelector(".card__title");
  cardTitle.textContent = item.title;

  const cardVendorCode = document.querySelector(".card__vendor-code");
  cardVendorCode.textContent = `Артикул: ${item.id}`;

  const cardPrice = document.querySelector(".card__price");
  cardPrice.textContent = new Intl.NumberFormat("ru-Ru", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(item.price);

  const cardAddCart = document.querySelector(".card__add-cart ");
  cardAddCart.dataset.idGoods = item.id;

  const cardParamsList = document.querySelector(".card__params-list");
  cardParamsList.append(...createParams(item.characteristic));

  const cardDescriptionText = document.querySelector(".card__description-text");
  cardDescriptionText.append(...createDescritionText(item.description));

  const thumbSwiper = new Swiper(".card__slider-thumb", {
    spaceBetween: 15,
    slidesPerView: 3,
    scrollbar: {
      el: ".swiper-scrollbar",
      draggable: true,
    },
    modules: [Scrollbar],

    breakpoints: {
      768: {
        spaceBetween: 20,
        slidesPerView: 3,
      },

      1001: {
        spaceBetween: 27,
        slidesPerView: 3,
      },

      1300: {
        spaceBetween: 44,
        slidesPerView: 3,
      },
    },
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
};
