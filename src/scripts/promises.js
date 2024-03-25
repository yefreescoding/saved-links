export async function getTitleFromUrl(url, nodeComponent) {
  try {
    const response = await fetch(url);
    const html = await response.text();

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;

    const titleElement = tempDiv.querySelector("title");

    nodeComponent.setAttribute("aria-hidden", "false");
    nodeComponent.setAttribute("data-error", "false");
    nodeComponent.innerText = "Link successfully saved";

    return titleElement ? titleElement.textContent.trim() : "Untitled";
  } catch (error) {
    console.error("Error fetching title:", error);

    nodeComponent.setAttribute("aria-hidden", "false");
    nodeComponent.setAttribute("data-error", "true");
    nodeComponent.innerText = "Error getting title: " + error;
    return "error";
  }
}
