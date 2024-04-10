import {
  attachEventListenersToButtons,
  displayLinks,
  createTitle,
} from "./function.js";
import { search } from "./search.js";
import { createNewLink } from "./promises.js";
// import { data } from "../data/globalVariables.js";
import autoAnimate from "@formkit/auto-animate";

import "./index.js";
import "./search.js";
import "./theme.js";

const mainLinksContainer = document.getElementById("links-container");
const formLinks = document.getElementById("form-link");
const linkInput = formLinks.querySelector("#user-link");
const linkNotify = document.getElementById("loading-message");
const searchInput = document.getElementById("search-input");
const formSearch = document.getElementById("search-form");

// console.log(data);

export let data = [];

(() => {
  data = JSON.parse(localStorage.getItem("data")) || [];
  console.log(data);
  displayLinks(data, mainLinksContainer);
  attachEventListenersToButtons(document, data);
})();

formSearch.addEventListener("submit", (e) => {
  e.preventDefault();
  searchInput.value = "";
});

searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim();
  search(query, data);
});

// Attach eventListeners to new dynamically add buttons.
formLinks.addEventListener("submit", (e) => {
  e.preventDefault();

  formValidation();

  setTimeout(() => {
    linkNotify.setAttribute("aria-hidden", "true");
  }, "3000");
});

const formValidation = async () => {
  if (linkInput.value === "") {
    formLinks.setAttribute("data-error", "true");
    linkInput.setAttribute("placeholder", "This field cannot be blank");
    return;
  } else {
    const linkValue = linkInput.value;

    formLinks.setAttribute("data-error", "false");
    linkInput.setAttribute("placeholder", "");

    const newData = await createNewLink(
      linkValue,
      data,
      linkNotify,
      mainLinksContainer
    );

    data = newData;
    console.log("Este es la data dentro de formValidation: ", data);
    attachEventListenersToButtons(document, data);
    linkInput.value = "";
    localStorage.setItem("data", JSON.stringify(data));
  }
};

// Animate the ul every time a new link is added
autoAnimate(mainLinksContainer, { duration: 120 });

if (navigator.userAgent.indexOf("iPhone") > -1) {
  document
    .querySelector("[name=viewport]")
    .setAttribute(
      "content",
      "width=device-width, initial-scale=1, maximum-scale=1"
    );
}

console.log(createTitle("https://www.youtube.com/@juliafei"));
