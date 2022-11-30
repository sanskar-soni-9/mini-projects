"use strict";

const projectsOverlay = document.querySelectorAll(".project-overlay");
const navBar = document.querySelector("nav");
const navLinks = document.querySelectorAll(".nav-link");

//Event Handlers
navBar.addEventListener("click", function (e) {
  for (const link of navLinks) {
    if (e.target === link) {
      document
        .querySelector(`.${link.dataset.target}`)
        .scrollIntoView({ behavior: "smooth" });
    }
  }
});

window.addEventListener("mouseover", function (e) {
  for (const project of projectsOverlay) {
    if (e.target.closest(".project-overlay") === project) {
      project.classList.remove("hidden-temp");
    }
  }
});

window.addEventListener("mouseout", function (e) {
  for (const project of projectsOverlay) {
    if (e.target.closest(".project-overlay") === project) {
      project.classList.add("hidden-temp");
    }
  }
});
