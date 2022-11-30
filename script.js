"use strict";

const projectsOverlay = document.querySelectorAll(".project-overlay");
const navBar = document.querySelector("nav");
const navLinks = document.querySelectorAll(".nav-link");
const projectContainers = document.querySelectorAll(".projects");
const socials = document.querySelectorAll(".social");

let projectsOptions = { rootMargin: "0px", threshold: "0.4" };
let socialOptions = { rootMargin: "0px", threshold: "1.0" };

const socialObserver = new IntersectionObserver(socialAnimation, socialOptions);

const projectObserver = new IntersectionObserver(
  projectObserverCallBack,
  projectsOptions
);

function socialAnimation(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.remove("social-animation");
      socialObserver.unobserve(entry.target);
    }
  });
}

function projectObserverCallBack(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.remove("intersection-animation");
      projectObserver.unobserve(entry.target);
    }
  });
}

socials.forEach((i) => {
  if (i) {
    socialObserver.observe(i);
  }
});

projectContainers.forEach((i) => {
  if (i) {
    projectObserver.observe(i);
  }
});

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
