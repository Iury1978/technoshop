import { API_URI } from "./var";

export const getGoods = ({ page, category }) => {
  const url = new URL(`${API_URI}api/goods`);

  if (page) url.searchParams.append("page", page);
  

  if (category) url.searchParams.append("category", category);
// достаем из промиса данные
  return fetch(url).then(response => response.json())
};


// для получения одного товара(выбранного)
export const getGoodsItem = (id) =>
  fetch(`${API_URI}api/goods/${id}`)
    .then((response) => response.json());