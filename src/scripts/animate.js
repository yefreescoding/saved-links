import autoAnimate from "@formkit/auto-animate";

const dropdown = document.getElementById("dropdown");
autoAnimate(dropdown);

const p = document.createElement("p");
p.classList.add("login_p");
p.innerText =
  "El proximo paso de este proyecto es permitir que los usuarios puedan guardar sus sesiones. Crear un usuario y de esa manera tener sus links guardados por mayor tiempo.";

function toggle() {
  dropdown.contains(p) ? p.remove() : dropdown.appendChild(p);
}
const dropdownBtn = document.getElementById("dropdown-btn");

dropdownBtn.addEventListener("click", () => {
  toggle();
  console.log("click");
});
