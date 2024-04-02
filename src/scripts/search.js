import { generateLinkHTML, attachEventListenersToButtons } from "./function";

// import { data } from "../data/globalVariables.js";

const dialog = document.querySelector(".search_dialog");
const showButton = document.querySelector("#search-btn");
const closeButton = document.querySelector(".search_dialog button");

showButton.addEventListener("click", () => {
  dialog.showModal();
  document.body.style.overflow = "hidden";
});

closeButton.addEventListener("click", () => {
  dialog.close();
  document.body.style.overflow = "";
});

window.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key === "k") {
    dialog.showModal();
    document.body.style.overflow = "hidden";
  }

  if (event.key === "Escape") {
    document.body.style.overflow = "";
  }
});

export function search(query, data) {
  const searchResults = document.getElementById("searchResults");
  searchResults.innerHTML = "";

  const filteredData = data.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.link.toLowerCase().includes(query.toLowerCase())
  );

  if (filteredData.length > 0) {
    filteredData.forEach((item) => {
      const li = document.createElement("li");
      li.innerHTML = generateLinkHTML(item);
      searchResults.appendChild(li);
      console.log("Data inside search if function: ", data);
      attachEventListenersToButtons(searchResults, data);
    });
  } else {
    const li = document.createElement("li");
    li.innerHTML = `<li class="main__link no_results">No results for <strong>"${query}"</strong></li>`;
    searchResults.appendChild(li);
  }

  console.log("Data inside search function: ", data);
}

// const searchInput = document.getElementById("search-input");

// formSearch.addEventListener("submit", (e) => {
//   e.preventDefault();
//   searchInput.value = "";
// });

// searchInput.addEventListener("input", () => {
//   const query = searchInput.value.trim();
//   search(query, data);
// });
