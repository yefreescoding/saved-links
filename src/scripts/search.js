import dataLinks from "../data/mock-links.json";
import { generateLinkHTML } from "./function";

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

// Function to perform search
function search(query, arr) {
  const searchResults = document.getElementById("searchResults");
  searchResults.innerHTML = "";

  const filteredData = arr.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.link.toLowerCase().includes(query.toLowerCase())
  );

  if (filteredData.length > 0) {
    filteredData.forEach((item) => {
      const li = document.createElement("li");
      li.innerHTML = generateLinkHTML(item);
      searchResults.appendChild(li);
    });
  } else {
    const li = document.createElement("li");
    li.innerHTML = `<li class="main__link"><strong>No matches</strong></li>`;
    searchResults.appendChild(li);
  }
}

const searchInput = document.getElementById("search-input");
const form = document.getElementById("search-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  searchInput.value = "";
});

searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim();
  search(query, dataLinks);
});
