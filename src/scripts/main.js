import { displayLinks, attachEventListenersToButtons } from "./function.js";
import { createNewLink } from "./promises.js";
import { data } from "../data/globalVariables.js";
import { search } from "./search.js";
import autoAnimate from "@formkit/auto-animate";

import "./index.js";
import "./search.js";
import "./theme.js";

const mainLinksContainer = document.getElementById("links-container");
const formLinks = document.getElementById("form-link");
const linkNotify = document.getElementById("loading-message");

displayLinks(data, mainLinksContainer);

formLinks.addEventListener("submit", (e) => {
  e.preventDefault();
  if (e.value === "") return;

  let linkValue = formLinks.querySelector("#user-link").value;

  createNewLink(linkValue, data, linkNotify, mainLinksContainer);

  setTimeout(() => {
    linkNotify.setAttribute("aria-hidden", "true");
  }, "2500");

  formLinks.querySelector("#user-link").value = "";
});

// Animate the ul every time a new link is added
autoAnimate(mainLinksContainer, { duration: 120 });

// Attach eventListeners to new dynamically add buttons.
attachEventListenersToButtons(document, data);
