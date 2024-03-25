export function formatDate(date) {
  const options = { weekday: "short", month: "long", day: "numeric" };
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

export function displayLinks(arr, container) {
  let allLinks = arr.map((link) => {
    return `
          <li class="main__link">
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

  allLinks = allLinks.reverse().join("");
  container.innerHTML = allLinks;
}
