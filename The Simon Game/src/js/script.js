"use strict";

const gameContainer = document.querySelector(".game-container");
const startButton = document.querySelector(".btn-start");
const gameStatus = document.querySelector(".status");

let level = 0;
let playStatus = 0;
let userClick = -1;
const gameData = [];
const userData = [];

const randomNumGenerator = function (min, max) {
  return Math.trunc(Math.random() * (max - min) + min);
};

const delaySound = (sound) =>
  new Promise((resolve) => setTimeout(() => resolve(sound), 750));

const playSound = function (sound) {
  document.getElementById(sound).play();
  document
    .querySelector(`.tile-${sound.slice(-1)}`)
    .classList.add("tile-active");
  setTimeout(
    () =>
      document
        .querySelector(`.tile-${sound.slice(-1)}`)
        .classList.remove("tile-active"),
    500
  );
};

const playComputer = async () => {
  playStatus = 0;
  userData.length = 0;
  for (const sound of gameData) {
    playSound(await delaySound(sound));
  }
  playStatus = 1;
};

const init = async function () {
  level++;
  userClick = -1;
  startButton.classList.add("hidden");
  gameStatus.classList.remove("hidden");
  gameStatus.textContent = `Level - ${level}`;
  gameData.push(`sound${randomNumGenerator(1, 5)}`);
  await playComputer();
};

startButton.addEventListener("click", init);

gameContainer.addEventListener("click", (e) => {
  if (e.target.closest(".tile") && playStatus) {
    userClick++;
    userData.push(e.target.dataset.sound);
    if (gameData[userClick] === userData[userClick]) {
      playSound(e.target.dataset.sound);
      if (userClick === gameData.length - 1) {
        init();
      }
    } else {
      document.getElementById("wrong").play();
      startButton.classList.remove("hidden");
      gameStatus.classList.add("hidden");
      playStatus = 0;
      userClick = -1;
      level = 0;
      gameData.length = 0;
      userData.length = 0;
    }
  }
});
