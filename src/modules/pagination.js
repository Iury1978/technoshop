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

// передаем 4 параметра: wrapper, pages, page, count
// 1 paginationWrapper
// 2. количество найденных страниц /сначала оно неизвестно, прсото ставлю 20
// 3. текущий номер страницы
// 4. сколько  страниц отображать в пагинации
const pagination = (wrapper, pages, page, count) => {
  // обнуляем перед каждым вызовом
  wrapper.textContent = "";
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

    const url = new URL(location);

    url.searchParams.set('page', n);
 
    //  создаем ли элементы с помощью функции
    const li = createItemPagination(url, n, page === n);

    // добавляем в ul наши li
    paginationList.append(li);
  }

  // создаем стрелки навигации по пагинации

  const firstItem = document.createElement("a");
  firstItem.classList.add("pagination__arrow", "pagination__arrow_start");
  firstItem.ariaLabel = "стрелка перехода на первую страницу";
  firstItem.href = isNotStart ? "index.html" : "";

  const LastItem = document.createElement("a");
  LastItem.classList.add("pagination__arrow", "pagination__arrow_end");
  LastItem.ariaLabel = "стрелка перехода на последнюю страницу";
  LastItem.href = isEnd ? "" : `index.html?page=${pages}`;

  // добавляю в нашу обертку
  wrapper.append(firstItem, paginationList, LastItem);
};

export const startPagination = (paginationWrapper, pages, page) => {
  // так же делаем флаг
  let isMobile = false;

  if (window.innerWidth <= 560) {
    pagination(paginationWrapper, pages, page, 4);
    isMobile = true;
  } else {
    pagination(paginationWrapper, pages, page, 6);
    isMobile = false;
  }
  //  уменльшаем количство отображаемых страниц пагинации в мобильной версии с 6 на 4
  window.addEventListener("resize", () => {
    if (window.innerWidth <= 560 && !isMobile) {
      pagination(paginationWrapper, pages, page, 4);
      isMobile = true;
    }
    if (window.innerWidth > 560 && isMobile) {
      pagination(paginationWrapper, pages, page, 6);
      isMobile = false;
    }
  });
};
