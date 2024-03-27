import {
  formatDate,
  shortedUrl,
  displayLinks,
  addLinkToDOM,
} from "./function.js";
import { getTitleFromUrl } from "./promises.js";
import links from "../data/mock-links.json";
import autoAnimate from "@formkit/auto-animate";

import "./index.js";
import "./search.js";

const mainLinksContainer = document.getElementById("links-container");
const formLinks = document.getElementById("form-link");
const linkNotify = document.getElementById("loading-message");

window.addEventListener("DOMContentLoaded", () => {
  displayLinks(links, mainLinksContainer);
});

formLinks.addEventListener("submit", (e) => {
  e.preventDefault();
  if (e.value === "") return;

  let linkValue = formLinks.querySelector("#user-link").value;

  createNewLink(linkValue);

  setTimeout(() => {
    linkNotify.setAttribute("aria-hidden", "true");
  }, "2500");

  formLinks.querySelector("#user-link").value = "";
});

async function createNewLink(url) {
  let uuid = self.crypto.randomUUID();
  try {
    const title = await getTitleFromUrl(url, linkNotify);

    const newLink = {
      id: uuid,
      title: title === "error" ? shortedUrl(url) : title,
      shortedLink: shortedUrl(url),
      link: url,
      timeSubmitted: formatDate(new Date()),
    };

    links.push(newLink);
    addLinkToDOM(newLink, mainLinksContainer);
    console.log("New Object Created:", newLink);
  } catch (error) {
    console.error("Error creating the link", error);
  }
}

autoAnimate(mainLinksContainer, { duration: 120 });
