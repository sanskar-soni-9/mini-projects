let number;
let score = 20;
let highScore = 0;

function randomNumber() {
  number = Math.trunc(Math.random() * 100) + 1;
}
randomNumber();

document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector("#user-input").value);
  if (!guess) {
    document.querySelector(".status").textContent = "No number";
  } else if (guess === number) {
    document.querySelector(".status").textContent = "Correct Answer";
    document.querySelector(".right-answer").textContent = number;
    document.querySelector("header").classList.add("won");
    document.querySelector("main").classList.add("won");
    document.querySelector("footer").classList.add("won");
    document.querySelector("input").style.backgroundColor =
      "rgb(197, 194, 194)";
    document.querySelector("input").style.color = "rgb(40, 40, 40)";
    document.querySelector("input").style.borderColor = "rgb(197, 194, 194)";
    if (score > highScore) {
      highScore = score;
      document.querySelector(".highscore").textContent = highScore;
    }
  } else {
    if (score > 1) {
      document.querySelector(".status").textContent =
        guess > number ? `${guess} is too High!` : `${guess} is too Low!`;
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      document.querySelector(".status").textContent = "You Lost!!";
      score = 0;
      document.querySelector(".score").textContent = score;
    }
  }
});

document.querySelector(".reset").addEventListener("click", function () {
  score = 20;
  document.querySelector(".score").textContent = score;
  document.querySelector(".status").textContent = "Start Guessing...";
  randomNumber();
  document.querySelector("header").classList.remove("won");
  document.querySelector("main").classList.remove("won");
  document.querySelector("footer").classList.remove("won");
  document.querySelector(".right-answer").textContent = "?";
});
