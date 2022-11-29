"use strict";

const canvas = document.querySelector("canvas");
const canvasContainer = document.querySelector(".bouncing-balls-container");
const ballCountP = document.querySelector(".ball-count");
const ballGameStatusH1 = document.querySelector(".ball-game-status");
const gameGuideH2 = document.querySelector(".ball-game-guide");

//Game guide
setTimeout(() => {
  gameGuideH2.classList.add("hidden");
}, 8000);
//CANVAS - Bouncing Balls - Objects
// setup canvas
const ctx = canvas.getContext("2d");
let ballCount = 25;
ballCountP.textContent = `Ball count: ${ballCount}`;

const width = (canvas.width = canvasContainer.offsetWidth);
const height = (canvas.height = canvasContainer.offsetHeight);
console.log(canvasContainer.offsetHeight, canvasContainer.offsetWidth);
// function to generate random number
function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

// function to generate random color
function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

class Shape {
  constructor(x, y, velX, velY) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
  }
}

class Ball extends Shape {
  constructor(x, y, velX, velY, color, size) {
    super(x, y, velX, velY);
    this.color = color;
    this.size = size;
    this.exists = true;
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }
  update() {
    if (this.x + this.size >= width) {
      this.velX = -this.velX;
    }

    if (this.x - this.size <= 0) {
      this.velX = -this.velX;
    }

    if (this.y + this.size >= height) {
      this.velY = -this.velY;
    }

    if (this.y - this.size <= 0) {
      this.velY = -this.velY;
    }

    this.x += this.velX;
    this.y += this.velY;
  }
  collisionDetect() {
    for (const ball of balls) {
      if (ball && !(this === ball) && ball.exists) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          ball.color = this.color = randomRGB();
        }
      }
    }
  }
}

class EvilCircle extends Shape {
  constructor(x, y) {
    super(x, y, 20, 20);
    this.color = "#fff";
    this.size = 10;
    window.addEventListener("keydown", (e) => {
      console.log(e.key);
      switch (e.key) {
        case "a":
        case "A":
        case "ArrowLeft":
          evil.x -= evil.velX;
          console.log(e.key);
          break;
        case "d":
        case "D":
        case "ArrowRight":
          evil.x += evil.velX;
          console.log(e.key);
          break;
        case "w":
        case "W":
        case "ArrowUp":
          evil.y -= evil.velY;
          console.log(e.key);
          break;
        case "s":
        case "S":
        case "ArrowDown":
          evil.y += evil.velY;
          console.log(e.key);
          break;
      }
    });
  }
  draw() {
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
  }
  checkBounds() {
    if (this.x + this.size >= width) {
      this.x -= this.size;
    }

    if (this.x - this.size <= 0) {
      this.x += this.size;
    }

    if (this.y + this.size >= height) {
      this.y -= this.size;
    }

    if (this.y - this.size <= 0) {
      this.y += this.size;
    }
  }
  collisionDetect() {
    for (let i = 0; i < balls.length; i++) {
      if (balls[i] && balls[i].exists) {
        const dx = this.x - balls[i].x;
        const dy = this.y - balls[i].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + balls[i].size) {
          delete balls[i];
          ballCount--;
          ballCountP.textContent = `Ball count: ${ballCount}`;
        }
        if (ballCount === 0) {
          ballGameStatusH1.textContent = "GAME-OVER, Thanks for playing 😊";
        }
      }
    }
  }
}
const evil = new EvilCircle(width / 2, height / 2);

const balls = [];

while (balls.length < ballCount) {
  const size = random(10, 20);
  const ball = new Ball(
    // ball position always drawn at least one ball width
    // away from the edge of the canvas, to avoid drawing errors
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size
  );

  balls.push(ball);
}

function loop() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, width, height);

  for (const ball of balls) {
    if (ball && ball.exists) {
      ball.draw();
      ball.collisionDetect();
      ball.update();
    }
  }
  evil.draw();
  evil.checkBounds();
  evil.collisionDetect();
  requestAnimationFrame(loop);
}
loop();
