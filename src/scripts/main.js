import { displayLinks, attachEventListenersToButtons } from "./function.js";
import { createNewLink } from "./promises.js";
import links from "../data/mock-links.json";
import autoAnimate from "@formkit/auto-animate";

import "./index.js";
import "./search.js";
import "./theme.js";

const mainLinksContainer = document.getElementById("links-container");
const formLinks = document.getElementById("form-link");
const linkNotify = document.getElementById("loading-message");
const copyLinksBtn = document.querySelectorAll(".copy_link");

displayLinks(links, mainLinksContainer);

formLinks.addEventListener("submit", (e) => {
  e.preventDefault();
  if (e.value === "") return;

  let linkValue = formLinks.querySelector("#user-link").value;

  createNewLink(linkValue, links, linkNotify, mainLinksContainer);

  setTimeout(() => {
    linkNotify.setAttribute("aria-hidden", "true");
  }, "2500");

  formLinks.querySelector("#user-link").value = "";
});

autoAnimate(mainLinksContainer, { duration: 120 });

attachEventListenersToButtons(document, copyLinksBtn);
