const themeToggles = document.querySelectorAll(".theme_toggle");

themeToggles.forEach((toggle) =>
  toggle.addEventListener("click", () => {
    handleThemeClick(toggle);
  })
);

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

function saveTheme(theme) {
  const expirationDate = new Date();
  expirationDate.setTime(expirationDate.getTime() + 365 * 86400000);
  document.cookie = `theme=${theme}; expires=${expirationDate.toUTCString()}`;
}

function handleThemeClick(e) {
  const themeValue = e.getAttribute("data-theme");

  turnOffAnimations();
  setTheme(themeValue);
  saveTheme(themeValue);
}

window.addEventListener("DOMContentLoaded", () => {
  const cookies = document.cookie;
  const match = cookies.match("theme=([^;]+)");
  let theme = "system";

  if (match) {
    theme = match[1];
  }
  setTheme(theme);
  console.log(match);
  console.log(match[1]);
});

function turnOffAnimations() {
  const css = document.createElement("style");
  css.type = "text/css";
  css.appendChild(
    document.createTextNode(
      `* {
       -webkit-transition: none !important;
       -moz-transition: none !important;
       -o-transition: none !important;
       -ms-transition: none !important;
       transition: none !important;
    }`
    )
  );

  document.head.appendChild(css);

  requestAnimationFrame(() => {
    const _ = window.getComputedStyle(css).opacity;
    document.head.removeChild(css);
  });
}
