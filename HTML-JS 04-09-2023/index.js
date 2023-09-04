const $tableData = document.querySelector("#tableData");
const $currentPage = document.querySelector("#currentPage");
const $totalPages = document.querySelector("#totalPages");
const $pageBtn = document.querySelector("#pageBtn")

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

/**
 * FN
 */

const fetchData = async () => {
    try {
        const response = await fetch(API_URL, {
            method: "GET",
        });

        state._data = await response.json();

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

}

const init = async () => {
    await fetchData();
    renderPageBtn();
    paginateData();
    setEventListner();
}



init();
