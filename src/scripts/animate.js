import autoAnimate from "@formkit/auto-animate";

const dropdown = document.getElementById("dropdown");
// const dropdownArticle = document.querySelector(".dropdown__article");
autoAnimate(dropdown);

// Create the element initially
const myArticle = document.createElement("article");
myArticle.classList.add("dropdown__article");

myArticle.innerHTML = ` <h2>Dear valued users,</h2>
            <p>
              We appreciate your enthusiasm and support for our app! As we
              continue to enhance your experience, we want to inform you that
              the login feature is currently in its early stages of development.
              Our team is diligently working to create a seamless and secure
              login process for you.
            </p>
            <h3>What to Expect:</h3>
            <ul class="dropdown__article_ul">
              <li>
                Limited Functionality: During this initial phase, you may notice
                some limitations or missing features on the login page. Rest
                assured, we are actively addressing these areas to provide a
                robust solution.
              </li>
              <li>
                Notifications: As soon as the login page is fully functional, we
                will notify you promptly. You’ll receive an update directly
                within the app or via email.
              </li>
              <li>
                Your Feedback Matters: We value your feedback! If you encounter
                any issues or have suggestions, please feel free to reach out to
                our support team. Your insights will help us refine the login
                experience.
              </li>
            </ul>
            <p>
              Thank you for your patience and understanding. We’re committed to
              delivering a top-notch login process that ensures security and
              ease of use. Stay tuned for further updates! Best regards,
            </p>
            <p>The Saved Link Team 🚀</p>`;

function toggleElement() {
  if (dropdown.contains(myArticle)) {
    dropdown.removeChild(myArticle);
  } else {
    dropdown.appendChild(myArticle);
  }
}

const dropdownBtn = document.getElementById("dropdown-btn");

dropdownBtn.addEventListener("click", () => {
  toggleElement();
  console.log("click");
});
