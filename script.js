"use strict";

const projectsOverlay = document.querySelectorAll(".project-overlay");

//Event Handlers
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
