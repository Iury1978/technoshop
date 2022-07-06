const createItemPagination = (hrefLink, textContent, active) => {
  const li = document.createElement("li");
  li.className = "pagination__item";

  const a = document.createElement("a");
  a.className = "pagination__link";
  a.textContent = textContent;
  a.href = hrefLink;
  // если страница активная (page === n) - добалвяем класс
  if (active) {
    a.classList.add("pagination__link_active");
  }
  li.append(a);

  //  возвращаем готовый элемент списка
  return li;
};

export const pagination = (wrapper, pages, page, count) => {
  // создаю список и присваиваю ему класс
  const paginationList = document.createElement("ul");
  paginationList.className = "pagination__list";

  // прпроверяем, что это не стартовая страница (для стрелочек)
  const isNotStart = page - Math.floor(count / 2) > 1;
  // проверяем, что не послдедняя
  const isEnd = page + Math.floor(count / 2) > pages;

  // логика отображения стриниц пагинаици
  if (count > pages) {
    count = pages;
  }

  // цикл до count, что бы отображать в пагинации только то количество, которое надо
  for (let i = 0; i < count; i++) {
    // 0 страницы не бывает, поэтому отсчет с 1
    let n = i + 1;

    // логика отображения стриниц пагинации
    if (isNotStart) {
      if (isEnd) {
        n = pages - count + i + 1;
      } else {
        n = page - Math.floor(count / 2) + i;
      }
    }

    //  создаем ли элементы с помощью функции
    const li = createItemPagination(`index.html?page=${n}`, n, page === n);

    // добавляем в ul наши li
    paginationList.append(li);
  }

  // создаем стрелки навигации по пагинации

  const firstItem = document.createElement("a");
  firstItem.classList.add("pagination__arrow", "pagination__arrow_start");
  firstItem.href = isNotStart ? "index.html" : "";

  const LastItem = document.createElement("a");
  LastItem.classList.add("pagination__arrow", "pagination__arrow_end");
  LastItem.href = isEnd ? "" : `index.html?page=${pages}`;

  // добавляю в нашу обертку
  wrapper.append(firstItem, paginationList, LastItem);
};
