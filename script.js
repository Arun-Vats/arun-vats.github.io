
const modeSwitch = document.getElementById("mode-switch");
const icon = modeSwitch.querySelector("i");

modeSwitch.addEventListener("click", function() {
  document.body.classList.toggle("dark-mode");
  if (icon.classList.contains("fa-sun-o")) {
    icon.classList.remove("fa-sun-o");
    icon.classList.add("fa-moon-o");
  } else {
    icon.classList.remove("fa-moon-o");
    icon.classList.add("fa-sun-o");
  }
});
