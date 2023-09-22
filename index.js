const $tableData = document.querySelector("#tableData");
const $currentPage = document.querySelector("#currentPage");
const $totalPages = document.querySelector("#totalPages");
const $pageBtn = document.querySelector("#pageBtn");
const $refreshBtn = document.querySelector("#refresh");
const $limitSelect = document.querySelector("#limit");
const $sortSelect = document.querySelector("#sort");
const $orderBySelect = document.querySelector("#orderBy");
const $searchInput = document.querySelector("#search");
const $searchBySelect = document.querySelector("#searchBy");

const API_URL = "https://jsonplaceholder.typicode.com/posts";

const state = {
  data: [], // array di rendering 
  _data: [], // array di cache
  pageInfo: {
    page: 1,
    limit: 10,
    totalCount: 0,
    totalPages: 1,
    hasPrevPage: false,
    hasNextPage: false,
  },
  sortInfo: {
    mode: 'asc',
    orderBy: 'id'
  },
  searchInfo: {
    query: '',
    searchBy: 'title'
  }
}

/**
 * 
 * UTILITY 
 */

const outError = (error) => {
  console.log(error);
}

const generateTableRowHTML = (item) => {
  return `
    <tr>
        <td>${item.id}</td>
        <td>${item.userId}</td>
        <td>${item.title}</td>
        <td>${item.body}</td>
    </tr>
    `
}

const sortData = (data) => {
  const isNumber = state.sortInfo.orderBy === 'id' || state.sortInfo.orderBy === 'userId';
  if (isNumber) {
    if (state.sortInfo.mode === 'asc') {
      return data.sort((a, b) => a[state.sortInfo.orderBy] - b[state.sortInfo.orderBy]);
    } else if (state.sortInfo.mode === 'desc') {
      return data.sort((a, b) => b[state.sortInfo.orderBy] - a[state.sortInfo.orderBy]);
    }
  } else {
    if (state.sortInfo.mode === 'asc') {
      return data.sort((a, b) => a[state.sortInfo.orderBy].localeCompare(b[state.sortInfo.orderBy]));
    } else if (state.sortInfo.mode === 'desc') {
      return data.sort((a, b) => b[state.sortInfo.orderBy].localeCompare(a[state.sortInfo.orderBy]));
    }
  }
}

/**
 * FN
 */

const fetchData = async () => {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
    });

    state._data = sortData(await response.json());

  } catch (error) {
    outError(error);
  }
}

const renderData = () => {
  const HTML = state.data.map((item) => generateTableRowHTML(item)).join("");
  $tableData.innerHTML = HTML;
}

const renderPageBtn = () => {
  $pageBtn.innerHTML = `
    <button disabled id="prev">prev</button>
    <button id="next">next</button>
    `
}

const updatePaginationUI = () => {
  const $prevBtn = document.querySelector("#prev");
  const $nextBtn = document.querySelector("#next");

  if (state.pageInfo.hasPrevPage) {
    $prevBtn.removeAttribute("disabled");
  } else {
    $prevBtn.setAttribute("disabled", true);
  }

  if (state.pageInfo.hasNextPage) {
    $nextBtn.removeAttribute("disabled");
  } else {
    $nextBtn.setAttribute("disabled", true);
  }

  $currentPage.innerHTML = state.pageInfo.page;
  $totalPages.innerHTML = state.pageInfo.totalPages;
}

const paginateData = () => {
  const startIndex = state.pageInfo.limit * (state.pageInfo.page - 1);

  state.data = [...state._data].splice(startIndex, state.pageInfo.limit);

  state.pageInfo.totalCount = state._data.length;

  state.pageInfo.totalPages = Math.ceil(state.pageInfo.totalCount / state.pageInfo.limit);

  state.pageInfo.hasPrevPage = state.pageInfo.page > 1;

  state.pageInfo.hasNextPage = state.pageInfo.page < state.pageInfo.totalPages;

  updatePaginationUI();

  renderData();
}

const searchData = () => {
  if (state.searchInfo.query !== '') {
    const results = [...state._data].filter((item) => {
      const regex = new RegExp(state.searchInfo.query, 'ig');
      return item[state.searchInfo.searchBy].match(regex);
    })
    const HTML = results.map((item) => generateTableRowHTML(item)).join('');
    $tableData.innerHTML = HTML;
  } else {
    paginateData();
  }
}

// const setEventListner = () => {
//     $prevBtn.addEventListener("click", () => {
//         if(state.pageInfo.page > 1) {
//             state.pageInfo.page -= 1;
//             paginateData();
//         }
//     });

//     $nextBtn.addEventListener("click", () => {
//         if(state.pageInfo.page < state.pageInfo.totalPages) {
//             state.pageInfo.page += 1;
//             paginateData();
//         }
//     })
// }

const refreshData = async () => {
  state.pageInfo.page = 1;
  state.sortInfo.mode = 'asc';
  state.sortInfo.orderBy = 'id';
  await fetchData();
  paginateData();
  $sortSelect.value = 'asc';
  $orderBySelect.value = 'id';
}

const setEventListner = () => {
  document.addEventListener("click", (event) => {
    if (event.target.id === "next") {
      if (state.pageInfo.page < state.pageInfo.totalPages) {
        state.pageInfo.page += 1;
        paginateData();
      }
    } else if (event.target.id === "prev") {
      if (state.pageInfo.page > 1) {
        state.pageInfo.page -= 1;
        paginateData();
      }
    }
  })

  $refreshBtn.addEventListener('click', refreshData);

  $limitSelect.addEventListener('change', (event) => {
    const limit = Number(event.target.value);
    state.pageInfo.limit = limit;
    state.pageInfo.page = 1;
    paginateData();
  });

  $sortSelect.addEventListener('change', (event) => {
    const sort = event.target.value;
    state.sortInfo.mode = sort;
    state._data = sortData(state._data);
    state.pageInfo.page = 1;
    paginateData();
  });

  $orderBySelect.addEventListener('change', (event) => {
    const orderBy = event.target.value;
    state.sortInfo.orderBy = orderBy;
    state._data = sortData(state._data);
    state.pageInfo.page = 1;
    paginateData();
  })

  $searchBySelect.addEventListener('change', (event) => {
    const searchBy = event.target.value;
    state.searchInfo.searchBy = searchBy;
    searchData();
  })

  $searchInput.addEventListener('input', (event) => {
    const query = event.target.value;
    state.searchInfo.query = query;
    searchData();
  })
}

const init = async () => {
  await fetchData();
  renderPageBtn();
  paginateData();
  setEventListner();
}

init();
