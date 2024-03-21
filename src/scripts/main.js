const links = [
  {
    id: 103,
    title: "Invisible Details of Interaction Design",
    shortedLink: "rauno.me",
    link: "https://rauno.me/craft/interaction-design",
    timeSubmitted: "Wednesday, Mar 13",
    classAdded: false,
  },
  {
    id: 104,
    title: "uilabs",
    shortedLink: "uilabs.dev",
    link: "https://www.uilabs.dev",
    timeSubmitted: "Friday, Mar 15",
    classAdded: false,
  },
  {
    id: 106,
    title: "Habits of great software engineers",
    shortedLink: "vadimkravcenko.com",
    link: "https://vadimkravcenko.com/shorts/habits-of-great-software-engineers/?ref=dailydev",
    timeSubmitted: "Friday, Mar 15",
    classAdded: false,
  },
];

const mainLinksContainer = document.getElementById("links-container");
const formLinks = document.getElementById("form-link");
const loadingMessage = document.getElementById("loading-message");

let addVisible = true;

// Usar el formulario para crear objetos con datos de los usuarios
formLinks.addEventListener("submit", (e) => {
  e.preventDefault();
  if (e.value === "") return;

  let linkValue = formLinks.querySelector("#user-link").value;

  createNewLink(linkValue);
  // loadingMessage.style.display = "none";

  formLinks.querySelector("#user-link").value = "";
});

window.addEventListener("DOMContentLoaded", () => {
  displayLinks(links);
});

function displayLinks(arr) {
  let allLinks = arr.map((link) => {
    return `
          <li class="main__link" aria-hidden=${link.classAdded}>
            <a href=${link.link} target="_blank">
              <div>
                <?xml version="1.0" encoding="UTF-8"?><svg
                width="27px"
                height="27px"
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
                <h3>${link.title}</h3>
                <span> ${link.shortedLink} </span>
              </div>
                <p>${link.timeSubmitted}</p>
            </a>
          </li>
    `;
  });

  allLinks = allLinks.join("");
  mainLinksContainer.innerHTML = allLinks;
}

// Crear una function que cree un objeto nuevo.
async function createNewLink(url) {
  let uuid = self.crypto.randomUUID();
  try {
    const title = await getTitleFromUrl(url);

    const newLink = {
      id: uuid,
      title: title === "error" ? shortedUrl(url) : title,
      shortedLink: shortedUrl(url),
      link: url,
      timeSubmitted: formatDate(new Date()),
      classAdded: false,
    };

    links.push(newLink);
    console.log("New Object Created:", newLink);

    displayLinks(links);
  } catch (error) {
    console.error("Error creating the link", error);
  }
}

function addNewAnimation(stateVisible) {
  // return !stateVisible;
  // const elementsInsideMain = mainLinksContainer.querySelectorAll(".main__link");
  // const elementsArray = Array.from(elementsInsideMain);

  // const lastElement = elementsArray[elementsArray.length - 1];

  // lastElement.setAttribute("aria-hidden", "false");

  // elementsArray.forEach((element) => {
  //   element.setAttribute("aria-hidden", "false");
  // });

  console.log(elementsArray);
}

function shortedUrl(url) {
  const parsedUrl = new URL(url);
  return parsedUrl.hostname;
}

function formatDate(date) {
  const options = { weekday: "short", month: "long", day: "numeric" };
  return date.toLocaleString("en-US", options);
}

async function getTitleFromUrl(url) {
  try {
    // Fetch HTML content of the URL
    const response = await fetch(url);
    const html = await response.text();

    // Create a temporary div element to parse the HTML
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;

    // Extract the title element
    const titleElement = tempDiv.querySelector("title");

    // Return the text content of the title element
    return titleElement ? titleElement.textContent.trim() : "Untitled"; // Return "Untitled" if title not found
  } catch (error) {
    console.error("Error fetching title:", error);
    return "error";
  }
}

// Example usage
getTitleFromUrl("https://vercel.com/geist/icons").then((title) =>
  console.log(title)
);
