import { API_URI } from "./var";

export const getGoods = () => {
  // получаем URL параметры страницы
  const pageURL = new URL(location);
  const url = new URL(`${API_URI}api/goods`);
  // возвращает iterator, где хранятся все данные из адресной строки, такие как
  // номер страницы, id товара, номер страницы и ручки из API
  // http://localhost:3000/card.html?id=5552836205
  // http://localhost:3000/index.html?minprice=&maxprice=&category=&mindisplay=&maxdisplay=
  // console.log(pageURL.searchParams.entries());
  // проходимся по нему в цикле для получения нужных данных
  // set перезаписывает, а append добавляет, используем, на всякий случай, set
  // for (const item of pageURL.searchParams.entries()) {
    // console.log(item);
    // (2) ['id', '5963153421']
    // url.searchParams.set(item[0], item[1]);
    // console.log(item[0], item[1]);
    // id 5963153421
    // деструктурируем массив 
    for (const [name, value]of pageURL.searchParams.entries()) {
    // console.log(item);
    // (2) ['id', '5963153421']
    url.searchParams.set(name, value);
  }

  // достаем из промиса данные
  return fetch(url).then((response) => response.json());
};


// для получения одного товара(выбранного)
export const getGoodsItem = (id) =>
  fetch(`${API_URI}api/goods/${id}`)
    .then((response) => response.json());

    // выбор категории

export const getCategory = () =>
  fetch(`${API_URI}api/category`).then((response) => response.json());
    