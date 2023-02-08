// Add animation to header on scroll
window.onscroll = function() {
  var header = document.querySelector("header");
  var aboutSection = document.querySelector("#about");
  var aboutSectionTop = aboutSection.offsetTop;

  if (window.pageYOffset > aboutSectionTop) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
};

// Add icon animation on hover
var icons = document.querySelectorAll(".icon");

for (var i = 0; i < icons.length; i++) {
  icons[i].addEventListener("mouseenter", function() {
    this.classList.add("animated");
  });

  icons[i].addEventListener("mouseleave", function() {
    this.classList.remove("animated");
  });
}
