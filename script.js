"use strict";

const projectsOverlay = document.querySelectorAll(".project-overlay");
const navBar = document.querySelector("nav");
const navLinks = document.querySelectorAll(".nav-link");
const projectContainers = document.querySelectorAll(".projects");
const socials = document.querySelectorAll(".social");
const menuBtn = document.querySelector(".menu-button svg");
const menuOverlay = document.querySelector(".menu-overlay");
const menuCloseBtn = document.querySelector(".close-menu");
const arrowLeftBtns = document.querySelectorAll(".arrow-left");
const arrowRightBtns = document.querySelectorAll(".arrow-right");
const topProjects = document.querySelectorAll(".top-project");
const codedamnProjects = document.querySelectorAll(".codedamn-project");
const otherProjects = document.querySelectorAll(".other-project");

//Menu
function showMenu() {
  menuOverlay.classList.remove("hidden-perm");
  navBar.classList.add("menu");
  menuCloseBtn.classList.remove("hidden-perm");
}
function closeMenu() {
  menuOverlay.classList.add("hidden-perm");
  navBar.classList.remove("menu");
  menuCloseBtn.classList.add("hidden-perm");
}

//Mobile arrow buttons function
function moveLeft(projects) {
  console.log("--Under Construction--");
}
function moveRight(projects) {
  console.log("--Under Construction--");
}

//Animation
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
      closeMenu();
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

menuBtn.addEventListener("click", showMenu);
menuCloseBtn.addEventListener("click", closeMenu);
menuOverlay.addEventListener("click", closeMenu);

for (const leftBtn of arrowLeftBtns) {
  console.log(leftBtn);
  leftBtn.addEventListener("click", function (e) {
    if (e.target.closest(".top-projects-container")) moveRight(topProjects);
    else if (e.target.closest(".codedamn-projects-container"))
      moveRight(codedamnProjects);
    else if (e.target.closest(".other-projects-container"))
      moveRight(otherProjects);
  });
}
for (const rightBtn of arrowRightBtns) {
  rightBtn.addEventListener("click", function (e) {
    if (e.target.closest(".top-projects-container")) moveLeft(topProjects);
    else if (e.target.closest(".codedamn-projects-container"))
      moveLeft(codedamnProjects);
    else if (e.target.closest(".other-projects-container"))
      moveLeft(otherProjects);
  });
}
