const API_URL = "https://dummyjson.com/comments";
const $table = document.querySelector("#table");
const $sortModeSelect = document.querySelector("#sortMode");

const state = {
    data: [],
    sortMode: "ASC",
}

const fetchData = async () => {
    try{
        const response = await fetch(API_URL);
        state.data = (await response.json()).comments;
    } catch(error) {
        
        console.error(error)
    }
}

const sortData = () => {
    const _sortMethod = {
        "ASC": () => state.data.sort((a,b) => a.postId - b.postId),
        "DESC": () => state.data.sort((a,b) => b.postId - a.postId), //urca
    }
    state.data = _sortMethod[state.sortMode]();
}

const renderData = () => {
    // $table.innerHTML = "";
    // state.data.forEach((item) => {
    //     const HTML = `
    //     <tr>
    //             <td>${item.id}</td>
    //             <td>${item.postId}</td>
    //             <td>${item.user.username}</td>
    //             <td>${item.body}</td>
    //     </tr>
    //     `;
    //     $table.innerHTML += HTML;
    // })
    const HTML = state.data.map((item) => {
        return `
             <tr>
                     <td>${item.id}</td>
                     <td>${item.postId}</td>
                     <td>${item.user.username}</td>
                     <td>${item.body}</td>
             </tr>
             `
    }).join("");
    $table.innerHTML = HTML; 
}

const addSortEventListener = (callback = () => {}) => {
    $sortModeSelect.addEventListener("change", (event) => {
        state.sortMode = event.target.value;
        if (typeof callback === "function") {
            callback()
        }
    })
}

const renderUI = () => {
    sortData()
    renderData()
}

const init = async () => {
   await fetchData();
   renderUI();
   addSortEventListener(renderUI);
   //console.log(state.data);
}


init()