import {
  formatDate,
  shortedUrl,
  addLinkToDOM,
  notificationStyles,
} from "./function.js";

export async function getTitleFromUrl(url, nodeComp) {
  try {
    const response = await fetch(url);
    const html = await response.text();

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;

    const titleElement = tempDiv.querySelector("title");

    notificationStyles(nodeComp, true, "Link title successfully saved");
    return titleElement ? titleElement.textContent.trim() : "Untitled";
  } catch (error) {
    notificationStyles(nodeComp, false, "Could not ge the web title");
    console.error("Error fetching title:", error);
    return "error";
  }
}

export async function createNewLink(url, arr, nodeComp, nodeContainerComp) {
  let uuid = self.crypto.randomUUID();
  try {
    const title = await getTitleFromUrl(url, nodeComp);

    const newLink = {
      id: uuid,
      title: title === "error" ? shortedUrl(url) : title,
      shortedLink: shortedUrl(url),
      link: url,
      timeSubmitted: formatDate(new Date()),
    };

    arr.push(newLink);
    addLinkToDOM(newLink, nodeContainerComp);
    // console.log("New Object Created:", newLink);
  } catch (error) {
    console.error("Error creating the link", error);
  }
}

// function notificationStyles(nodeComp, state, message) {
//   if (state) {
//     nodeComp.setAttribute("aria-hidden", "false");
//     nodeComp.setAttribute("data-error", "false");
//     nodeComp.innerText = message;
//   } else {
//     nodeComp.setAttribute("aria-hidden", "false");
//     nodeComp.setAttribute("data-error", "true");
//     nodeComp.innerText = message;
//   }
// }
