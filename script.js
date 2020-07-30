// Name any p5.js functions we use in the global so Glitch can recognize them.
// Add to this list as you consult the p5.js documentation for other functions.
/* global createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, ellipse, stroke, image, loadImage, collideCircleCircle, text, mouseX, mouseY, 
          strokeWeight, line, mouseIsPressed, windowWidth, windowHeight, noStroke, keyIsPressed, textStyle, 
          NORMAL, BOLD, */

let brushHue,
  backgroundColor,
  coinX,
  coinY,
  coinA,
  coinB,
  score,
  time,
  gameIsOver,
  hit,
  hit2,
  highestScore,
  ellipse1,
  ellipse2,
  ellipse3,
  xVelocity1,
  yVelocity1,
  xVelocity2,
  yVelocity2;
const CIRCLE_SIZE = 20,
  canvasWidth = 400,
  canvasLength = 400,
  globalVelocity1 = 3,
  globalVelocity2 = 6;

function setup() {
  // Canvas & color settings
  createCanvas(canvasWidth, canvasLength);
  colorMode(HSB, 360, 100, 100);
  brushHue = 0;
  backgroundColor = 95;
  coinX = random(width);
  coinY = random(height);
  coinA = random(width);
  coinB = random(height);
  time = 1000;
  gameIsOver = false;
  score = 0;
  noStroke();
  highestScore = 0;

  xVelocity1 = globalVelocity1;
  yVelocity1 = globalVelocity1;
  xVelocity2 = globalVelocity2;
  yVelocity2 = globalVelocity2;
}

function draw() {
  background(backgroundColor);

  //first circle
  fill(50, 80, 100);
  ellipse1 = ellipse(coinX, coinY, 20);
  fill(0);
  text("1", coinX - 4, coinY + 3);
  move1();

  //second circle
  fill(170, 80, 100);
  ellipse2 = ellipse(coinA, coinB, 20);
  fill(0);
  text("2", coinA - 4, coinB + 3);
  move2();

  fill(290, 80, 100);
  ellipse3 = ellipse(mouseX, mouseY, 20);

  fill(0);
  text(`Time remaining: ${time}`, 20, 40);
  text(`Score: ${score}`, 20, 60);
  text(`Highest Score: ${highestScore}`, 20, 80);

  handleCollision();
  handleTime();
  if (keyIsPressed === true) {
    time = 1000;
    gameIsOver = false;
    score = 0;
  }
}

function handleCollision() {
  if (gameIsOver) {
    return;
  }
  // We'll write code for what happens if your character hits a coin.
  // check pointer is where the coin is
  hit = collideCircleCircle(
    mouseX,
    mouseY,
    CIRCLE_SIZE,
    coinX,
    coinY,
    CIRCLE_SIZE
  );
  hit2 = collideCircleCircle(
    mouseX,
    mouseY,
    CIRCLE_SIZE,
    coinA,
    coinB,
    CIRCLE_SIZE
  );
  // text(`Hit: ${hit}`, 20, 80); for debug

  if (hit) {
    score += 1;
    coinX = random(width);
    coinY = random(height);
  }
  if (hit2) {
    score += 2;
    coinA = random(width);
    coinB = random(height);
  }
}

function handleTime() {
  // We'll write code to handle the time.
  if (time <= 0 || gameIsOver) {
    gameIsOver = true;
    if (score > highestScore) {
      highestScore = score;
    }
    textStyle(BOLD);
    text("GAME OVER!", width / 2 - 50, height / 2);
    textStyle(NORMAL);
    text("press any key to start over", width / 2 - 80, height / 2 + 10);
  } else {
    time--;
  }
}

function move1() {
  if (gameIsOver) {
    return;
  }
  coinX += xVelocity1;
  coinY += yVelocity1;

  if (coinX > canvasWidth || coinX < 0) {
    xVelocity1 = -xVelocity1;
  }

  if (coinY > canvasLength || coinY < 0) {
    yVelocity1 = -yVelocity1;
  }
}

function move2() {
  if (gameIsOver) {
    return;
  }
  coinA += xVelocity2;
  coinB += yVelocity2;

  if (coinA > canvasWidth || coinA < 0) {
    xVelocity2 = -xVelocity2;
  }

  if (coinB > canvasLength || coinB < 0) {
    yVelocity2 = -yVelocity2;
  }
}
