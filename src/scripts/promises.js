import {
  formatDate,
  shortedUrl,
  addLinkToDOM,
  notificationStyles,
  attachEventListenersToButtons,
} from "./function.js";

export async function createNewLink(url, data, nodeComp, nodeContainerComp) {
  let uuid = self.crypto.randomUUID();
  try {
    const title = await getTitleFromUrl(url, nodeComp);
    const newLink = {
      key: data.length,
      id: uuid,
      title: title === "error" ? shortedUrl(url) : title,
      shortedLink: shortedUrl(url),
      link: url,
      timeSubmitted: formatDate(new Date()),
    };
    addLinkToDOM(newLink, nodeContainerComp, data);

    return [...data, newLink];
  } catch (error) {
    console.error("Error creating the link", error);
    return data;
  }
}

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
