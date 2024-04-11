export function formatDate(date) {
  const options = { weekday: "short", month: "short", day: "numeric" };
  return date.toLocaleString("en-US", options);
}

export function shortedUrl(url) {
  const parsedUrl = new URL(url);
  let hostname = parsedUrl.hostname;

  // Remove 'www.' prefix if present
  if (hostname.startsWith("www.")) {
    hostname = hostname.slice(4);
  }
  return hostname;
}

export function createTitle(url) {
  // Check if the URL is a valid YouTube channel URL
  const regex =
    /^(https?:\/\/)?(www\.)?youtube\.com\/(user\/|channel\/|c\/)([^/?]+)/;

  const match = url.match(regex);

  // If the URL matches the pattern, extract the channel name
  if (match && match[4]) {
    return "Youtube Channel " + match[4];
  } else {
    console.error("Not a valid YouTube channel URL");
    return getWebsiteName(url);
  }
}

export function getWebsiteName(url) {
  try {
    let hostname = new URL(url).hostname;

    if (hostname.startsWith("www.")) {
      hostname = hostname.slice(4);
    }

    let name = hostname.split(".")[0]; // Assuming the name is the first part of the hostname

    return name;
  } catch (error) {
    console.error("Error:", error);
    return "Unknown";
  }
}

export function displayLinks(arr, container) {
  let allLinks = arr.map((link, key) => {
    return generateLinkHTML(link, key);
  });

  allLinks = allLinks.reverse().join("");
  container.innerHTML = allLinks;
}

export function generateLinkHTML(link) {
  return `
    <li data-key="${link.key}" class="main__link" data-link-id="${link.id}">
      <a  href=${link.link} target="_blank">
        <svg
        width="25px"
        height="25px"
        stroke-width="1.9"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        color="currentColor"
        >
        <path
          d="M14 11.9976C14 9.5059 11.683 7 8.85714 7C8.52241 7 7.41904 7.00001 7.14286 7.00001C4.30254 7.00001 2 9.23752 2 11.9976C2 14.376 3.70973 16.3664 6 16.8714C6.36756 16.9525 6.75006 16.9952 7.14286 16.9952"
          stroke="currentColor"
          stroke-width="1.9"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
        <path
          d="M10 11.9976C10 14.4893 12.317 16.9952 15.1429 16.9952C15.4776 16.9952 16.581 16.9952 16.8571 16.9952C19.6975 16.9952 22 14.7577 22 11.9976C22 9.6192 20.2903 7.62884 18 7.12383C17.6324 7.04278 17.2499 6.99999 16.8571 6.99999"
          stroke="currentColor"
          stroke-width="1.9"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
        </svg>
        <div>
          <h3>${link.title}</h3>
          <span> ${link.shortedLink} </span>
        </div>
      </a>
      <div class="main__link_actions">
        <button data-link-id="${link.id}" type="button" class="copy_link" aria-action="copy">
          <svg class="copied_svg" width="20px" height="20px" stroke-width="1.2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M1.5 12.5L5.57574 16.5757C5.81005 16.8101 6.18995 16.8101 6.42426 16.5757L9 14" stroke="#000000" stroke-width="1.2" stroke-linecap="round"></path><path d="M16 7L12 11" stroke="#000000" stroke-width="1.2" stroke-linecap="round"></path><path d="M7 12L11.5757 16.5757C11.8101 16.8101 12.1899 16.8101 12.4243 16.5757L22 7" stroke="#000000" stroke-width="1.2" stroke-linecap="round"></path></svg>
          <svg class="copy_svg" width="20px" height="20px" stroke-width="1.2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M19.4 20H9.6C9.26863 20 9 19.7314 9 19.4V9.6C9 9.26863 9.26863 9 9.6 9H19.4C19.7314 9 20 9.26863 20 9.6V19.4C20 19.7314 19.7314 20 19.4 20Z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 9V4.6C15 4.26863 14.7314 4 14.4 4H4.6C4.26863 4 4 4.26863 4 4.6V14.4C4 14.7314 4.26863 15 4.6 15H9" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
          Copy
        </button>
        <button data-link-id="${link.id}" data-key="${link.key}" class="erase_link" type="button" id="erase-link" aria-action="erase" aria-label="button to erase links">
          <svg width="16px" height="16px" viewBox="0 0 24 24" stroke-width="1.2" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M20 9L18.005 20.3463C17.8369 21.3026 17.0062 22 16.0353 22H7.96474C6.99379 22 6.1631 21.3026 5.99496 20.3463L4 9" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M21 6L15.375 6M3 6L8.625 6M8.625 6V4C8.625 2.89543 9.52043 2 10.625 2H13.375C14.4796 2 15.375 2.89543 15.375 4V6M8.625 6L15.375 6" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
        </button>
      </div>
      <p>${link.timeSubmitted}</p>
    </li>
  `;
}

// Function to add a new link to the DOM
export function addLinkToDOM(link, container) {
  const linkHTML = generateLinkHTML(link);
  container.insertAdjacentHTML("afterbegin", linkHTML);
}
function removeLinkFromDOM(id) {
  const listItemToRemove = document.querySelector(
    `.main__link[data-link-id="${id}"]`
  );
  if (listItemToRemove) {
    listItemToRemove.remove();
  } else {
    console.log("not found");
  }
}

function deleteExistingLink(key, data) {
  const newData = data.filter((dat) => {
    return key !== dat.id;
  });

  data = newData;
  localStorage.setItem("data", JSON.stringify(data));
  console.log("Data inside deleteExisting function: ", data);
}

// Function to attach event listeners to copy and delete buttons
export function attachEventListenersToButtons(container, data) {
  const copyLinksBtn = container.querySelectorAll(".copy_link");
  const eraseLinksBtn = container.querySelectorAll(".erase_link");

  copyLinksBtn.forEach((copyBtn) => {
    copyBtn.addEventListener("click", () => {
      const anchor = copyBtn.closest("li").querySelector("a");
      if (anchor) {
        const url = anchor.getAttribute("href");

        navigator.clipboard
          .writeText(url)
          .then(() => {
            console.log("URL copied to clipboard:", url);

            copyBtn.classList.add("copied");
            setTimeout(() => {
              copyBtn.classList.remove("copied");
            }, 1500);
          })
          .catch((error) => {
            console.error("Failed to copy URL to clipboard:", error);
          });
      }
    });
  });

  eraseLinksBtn.forEach((button) => {
    button.addEventListener("click", () => {
      const linkId = button.getAttribute("data-link-id");

      console.log(linkId);
      removeLinkFromDOM(linkId);
      deleteExistingLink(linkId, data);

      setTimeout(() => {
        location.reload();
      }, "1500");
      console.log("Data inside remove function: ", data);
    });
  });

  console.log("Data inside attach function: ", data);
}

export function notificationStyles(nodeComp, state, message) {
  if (state) {
    nodeComp.setAttribute("aria-hidden", "false");
    nodeComp.setAttribute("data-error", "false");
    nodeComp.innerText = message;
  } else {
    nodeComp.setAttribute("aria-hidden", "false");
    nodeComp.setAttribute("data-error", "true");
    nodeComp.innerText = message;
  }
}
