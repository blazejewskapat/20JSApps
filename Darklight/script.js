const toggleSwitch = document.querySelector("input[type=checkbox]");
const toggleIcon = document.getElementById("toggle-icon");
const textBox = document.getElementById("text-box");
const img1 = document.getElementById("img1");
const img2 = document.getElementById("img2");
const img3 = document.getElementById("img3");
const nav = document.getElementById("nav");

function imageMode(color) {
  img1.src = `img/undraw_proud_coder_${color}.svg`;
  img2.src = `img/undraw_feeling_proud_${color}.svg`;
  img3.src = `img/undraw_conceptual_idea_${color}.svg`;
}

function darkModeOn() {
  toggleIcon.children[0].innerText = "Dark Mode";
  toggleIcon.children[1].classList.replace("fa-sun", "fa-moon");
  nav.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  textBox.style.backgroundColor = "rgba(255 255 255 / 90%)";
  imageMode("dark");
}

function lightModeOn() {
  toggleIcon.children[0].innerText = "Light Mode";
  toggleIcon.children[1].classList.replace("fa-moon", "fa-sun");
  nav.style.backgroundColor = "rgba(255 255 255 / 50%)";
  textBox.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  imageMode("light");
}

function switchTheme(event) {
  if (event.target.checked) {
    localStorage.setItem("theme", "dark");
    darkModeOn();
  } else {
    localStorage.setItem("theme", "light");
    lightModeOn();
  }
}

const currentTheme = localStorage.getItem("theme");
if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);

  if (currentTheme === "dark") {
    toggleSwitch.checked = true;
    darkModeOn();
  }
}

toggleSwitch.addEventListener("change", switchTheme);
