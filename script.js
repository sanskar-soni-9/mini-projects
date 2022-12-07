"use strict";

const projectsOverlay = document.querySelectorAll(".project-overlay");
const navBar = document.querySelector("nav");
const navLinks = document.querySelectorAll(".nav-link");
const projectContainers = document.querySelectorAll(".projects");
const socials = document.querySelectorAll(".social");
const menuBtn = document.querySelector(".menu-button svg");
const menuOverlay = document.querySelector(".menu-overlay");
const menuCloseBtn = document.querySelector(".close-menu");
const arrowLeftBtn = document.querySelector(".arrow-left");
const arrowRightBtn = document.querySelector(".arrow-right");
const topProjects = document.querySelectorAll(".top-project");
const codedamnProjects = document.querySelectorAll(".codedamn-project");
const otherProjects = document.querySelectorAll(".other-project");
const dots = document.querySelectorAll(".dots");

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
let curPositions = [];
for (let i = 0; i < topProjects.length; i++) {
  topProjects[i].style.transform = `translateX(${i * 100}%)`;
  curPositions.push(i * 100);
}

function topProjectsSlider(num) {
  for (let i = 0; i < topProjects.length; i++) {
    console.log("hi");
    curPositions[i] = curPositions[i] + num * 100;
    topProjects[i].style.transform = `translateX(${curPositions[i]}%)`;
    console.log(curPositions[i] + num * 100);
  }
}
function moveLeft() {
  topProjectsSlider(-1);
}
function moveRight() {
  topProjectsSlider(1);
}

//Animation
let projectsOptions = { rootMargin: "0px", threshold: "0.1" };
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
// Navigation
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

menuBtn.addEventListener("click", showMenu);
menuCloseBtn.addEventListener("click", closeMenu);
menuOverlay.addEventListener("click", closeMenu);

// Animation
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

arrowLeftBtn.addEventListener("click", moveRight);
arrowRightBtn.addEventListener("click", moveLeft);
