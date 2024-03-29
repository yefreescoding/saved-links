import dataLinks from "../data/mock-links.json";
import {
  generateLinkHTML,
  shortedUrl,
  displayLinks,
  addLinkToDOM,
} from "./function";

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
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    document.body.style.overflow = "";
  }
});

// Sample array of objects (replace this with your actual data)
const data = [
  { id: 1, title: "Example 1", description: "Description 1" },
  { id: 2, title: "Example 2", description: "Description 2" },
  // Add more objects as needed
];

// Function to perform search
function search(query, arr) {
  // Clear previous search results
  const searchResults = document.getElementById("searchResults");
  searchResults.innerHTML = "";

  // Filter the data based on the search query
  const filteredData = arr.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.link.toLowerCase().includes(query.toLowerCase())
  );

  // Display search results
  if (filteredData.length > 0) {
    filteredData.forEach((item) => {
      const li = document.createElement("li");
      li.innerHTML = generateLinkHTML(item);
      searchResults.appendChild(li);
    });
  } else {
    const li = document.createElement("li");
    li.innerHTML = `<li class="main__link">No matches</li>`;
    searchResults.appendChild(li);
  }
}

// Event listener for changes in the search input
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
