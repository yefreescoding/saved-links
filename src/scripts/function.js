export function formatDate(date) {
  const options = { weekday: "short", month: "long", day: "numeric" };
  return date.toLocaleString("en-US", options);
}

export function shortedUrl(url) {
  const parsedUrl = new URL(url);
  return parsedUrl.hostname;
}
