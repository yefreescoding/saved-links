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
