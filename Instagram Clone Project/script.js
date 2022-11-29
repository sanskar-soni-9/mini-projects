"use strict";

/*HEADER*/
function closeProfileMenu() {
  document.querySelector(".profile-menu").style.display = "none";
  document.querySelector(".overlay").style.display = "none";
}
function profileMenu() {
  if (document.querySelector(".profile-menu").style.display === "none") {
    document.querySelector(".profile-menu").style.display = "block";
    document.querySelector(".overlay").style.display = "block";
  } else {
    closeProfileMenu();
  }
}
