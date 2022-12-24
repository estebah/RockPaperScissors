'use strict';

const choices = document.querySelectorAll('button');
const playerIMG = document.getElementById('player');
const robotIMG = document.getElementById('robot');
const resultDisplay = document.getElementById('resultDisplay');

let scorePlayer = document.getElementById('scorePlayer');
let scoreRobot = document.getElementById('scoreRobot');

const ROCK = 'rock';
const PAPER = 'paper';
const SCISSORS = 'scissors';

const WIN = 0;
const LOSE = 1;
const DRAW = 2;

let robot;
let result;
let score;

let currentScorePlayer = 0;
let currentScoreRobot = 0;

let gameover = false;

choices.forEach((choice) => {
  choice.addEventListener('click', (player) => {
    startGame(player);
  });
});

function startGame(player) {
  if (gameover) return;
  gameover = true;
  player = player.currentTarget.id;
  playerIMG.src = `./img/${player}.png`;
  robot = robotConfig();
  robotIMG.src = `./img/${robot}.png`;
  result = getResult(player, robot);
  switch (result) {
    case DRAW:
      resultDisplay.innerHTML = "NO POINT FOR NONE";
      new Audio(`./audio/draw.wav`).play();
      break;
    case LOSE:
      resultDisplay.innerHTML = "+1 POINT FOR ROBOT";
      new Audio(`./audio/lose.wav`).play();
      break;
    case WIN:
      resultDisplay.innerHTML = "+1 POINT FOR PLAYER";
      new Audio(`./audio/win.wav`).play();
      break;
  }
  gameover = false;
  borderColor(result);
  getWinner();
}

function robotConfig() {
  const value = Math.floor(Math.random() * 3);
  switch (value) {
    case 0:
      return ROCK;
    case 1:
      return PAPER;
    case 2:
      return SCISSORS;
  }
}

function getResult(player, robot) {
  if (player === robot) {
    return DRAW;
  } else if (
    (player === ROCK && robot === SCISSORS) ||
    (player === PAPER && robot === ROCK) ||
    (player === SCISSORS && robot === PAPER)
  ) {
    return WIN;
  } else {
    return LOSE;
  }
}

function borderColor(result) {
  if (result === WIN) {
    playerIMG.classList.add('win');
    robotIMG.classList.add('lose');
    setTimeout(() => {
      playerIMG.classList.remove('win');
      robotIMG.classList.remove('lose');
    }, 1000);
  } else if (result === LOSE) {
    playerIMG.classList.add('lose');
    robotIMG.classList.add('win');
    setTimeout(() => {
      playerIMG.classList.remove('lose');
      robotIMG.classList.remove('win');
    }, 1000);
  } else {
    playerIMG.classList.add('draw');
    robotIMG.classList.add('draw');
    setTimeout(() => {
      playerIMG.classList.remove('draw');
      robotIMG.classList.remove('draw');
    }, 1000);
  }
}

function getScore(result) {
  if (result === WIN) {
    currentScorePlayer++;
    scorePlayer.innerHTML = currentScorePlayer;
  } else if (result === LOSE) {
    currentScoreRobot++;
    scoreRobot.innerHTML = currentScoreRobot;
  } else {
    return currentScorePlayer, currentScoreRobot;
  }
}

function getWinner() {
  score = getScore(result);
  if (currentScorePlayer == 3) {
    resultDisplay.innerHTML = "YOU ARE THE WINNER";
    gameover = true;
    resetGame();
  } else if (currentScoreRobot == 3) {
    gameover = true;
    resultDisplay.innerHTML = "THE ROBOT IS THE WINNER";
    resetGame();
  }
}

function resetGame() {
  setTimeout(() => {
    gameover = false;
    currentScorePlayer = 0;
    currentScoreRobot = 0;
    scorePlayer.innerHTML = 0;
    scoreRobot.innerHTML = 0;
    resultDisplay.innerHTML = "PLAY AGAIN :)";
    playerIMG.src = `./img/player.png`;
    robotIMG.src = `./img/robot.png`;
  }, 3500);
}
