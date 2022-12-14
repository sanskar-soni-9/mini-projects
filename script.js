"use strict";

const projectsOverlay = document.querySelectorAll(".project-overlay");
const navBar = document.querySelector("nav");
const navLinks = document.querySelectorAll(".nav-link");
const projectContainers = document.querySelectorAll(".projects");
const projects = document.querySelectorAll(".project");
const socials = document.querySelectorAll(".social");
const menuBtn = document.querySelector(".menu-button svg");
const menuOverlay = document.querySelector(".menu-overlay");
const menuCloseBtn = document.querySelector(".close-menu");
const arrowLeftBtn = document.querySelector(".arrow-left");
const arrowRightBtn = document.querySelector(".arrow-right");
const topProjects = document.querySelectorAll(".top-project");
const codedamnProjects = document.querySelectorAll(".codedamn-project");
const otherProjects = document.querySelectorAll(".other-project");
const dots = document.querySelectorAll(".dot");
const dotsContainer = document.querySelector(".dots-container");

//Menu
function showMenu() {
  menuOverlay.classList.remove("hidden-perm");
  menuCloseBtn.classList.remove("hidden-perm");
  navBar.classList.add("menu");
}
function closeMenu() {
  menuOverlay.classList.add("hidden-perm");
  menuCloseBtn.classList.add("hidden-perm");
  navBar.classList.remove("menu");
}

//Mobile arrow buttons function
const curPositions = [0, 100, 200, 300];
dots[0].classList.add("active-dot");

function topProjectsSlider(num) {
  for (let i = 0; i < topProjects.length; i++) {
    curPositions[i] += num * 100;
    topProjects[i].style.transform = `translateX(${curPositions[i]}%)`;
    dots[i].classList.remove("active-dot");
    if (curPositions[i] === 0) dots[i].classList.add("active-dot");
  }
}
function moveLeft() {
  if (curPositions[curPositions.length - 1] === 0) topProjectsSlider(3);
  else topProjectsSlider(-1);
}
function moveRight() {
  if (curPositions[0] === 0) topProjectsSlider(-3);
  else topProjectsSlider(1);
}

//Animation
otherProjects.forEach(
  (element, key) => (element.style.transitionDelay = `${key / 10 + 0.2}s`)
);
let projectsOptions = { rootMargin: "200px", threshold: "0.1" };
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

projects.forEach((i) => {
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

//Projects hover overlay animation
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

//Top projects slider arrow buttons
arrowLeftBtn.addEventListener("click", moveRight);
arrowRightBtn.addEventListener("click", moveLeft);
