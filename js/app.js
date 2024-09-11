const cardList = [
  "⚽",
  "⚽",
  "🏈",
  "🏈",
  "🏀",
  "🏀",
  "🤾🏼",
  "🤾🏼",
  "🏐",
  "🏐",
  "🎾",
  "🎾",
  "🥊",
  "🥊",
  "🏊",
  "🏊",
];

const cards = document.querySelectorAll(".card");

const main = document.querySelector("main");

const moves = document.querySelector(".moves");
const timer = document.querySelector(".timer");

const resultContainer = document.querySelector(".result-container");
const totalMoves = document.querySelector(".total-moves");
const totalTime = document.querySelector(".total-time");

const restartGameButton = document.querySelector(".restart-game-button");
const playAgainButton = document.querySelector(".play-again-button");

let openedCardCounter = 0;
let firstOpenedCard;
let secondOpenedCard;

let moveCounter = 0;

let successCounter = 0;

let timerState = false;
let seconds = 0;
let minutes = 0;

let hiddenCardTimeout;
let timerInterval;

cardList.sort(() => {
  return Math.random() - 0.5;
});

cards.forEach((element) => {
  element.addEventListener("click", () => {
    const id = element.id;
    chooseCard(id);
  });
});

const chooseCard = (id) => {
  openedCardCounter++;

  if (timerState === false) {
    startTimer();
    timerState = true;
  }

  if (openedCardCounter === 1) {
    firstOpenedCard = document.getElementById(id);
    firstOpenedCard.textContent = cardList[id];

    firstOpenedCard.disabled = true;
  } else if (openedCardCounter === 2) {
    secondOpenedCard = document.getElementById(id);
    secondOpenedCard.textContent = cardList[id];

    secondOpenedCard.disabled = true;

    moveCounter++;
    moves.textContent = `${moveCounter} Movimiento(s)`;

    if (firstOpenedCard.textContent === secondOpenedCard.textContent) {
      successCounter++;
      openedCardCounter = 0;

      if (successCounter === 8) {
        finishGame();
      }
    } else {
      hiddenCardTimeout = setTimeout(() => {
        openedCardCounter = 0;
        firstOpenedCard.textContent = "";
        firstOpenedCard.disabled = false;
        secondOpenedCard.textContent = "";
        secondOpenedCard.disabled = false;
      }, 2000);
    }
  }
};

const startTimer = () => {
  timerInterval = setInterval(() => {
    seconds++;
    if (seconds === 60) {
      minutes++;
      seconds = 0;
    }
    timer.innerHTML = minutes + "min(s) " + seconds + "seg(s)";
  }, 1000);
};

restartGameButton.addEventListener("click", () => {
  restartGame();
});

const finishGame = () => {
  clearInterval(timerInterval);
  setTimeout(() => {
    main.style.display = "none";
    resultContainer.style.display = "flex";

    totalMoves.textContent = moves.textContent;
    totalTime.textContent = timer.textContent;
  }, 500);

  playAgainButton.addEventListener("click", () => {
    resultContainer.style.display = "none";
    main.style.display = "flex";
    restartGame();
  });
};

const restartGame = () => {
  openedCardCounter = 0;

  moveCounter = 0;

  successCounter = 0;

  timerState = false;
  seconds = 0;
  minutes = 0;

  moves.textContent = `${moveCounter} Movimiento(s)`;

  for (let i = 0; i < cards.length; i++) {
    cards[i].textContent = "";
    cards[i].disabled = false;
  }

  timer.innerHTML = 0 + "min(s) " + 0 + "seg(s)";

  clearTimeout(hiddenCardTimeout);
  clearInterval(timerInterval);

  cardList.sort(() => {
    return Math.random() - 0.5;
  });
};
