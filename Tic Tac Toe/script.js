const cells = document.querySelectorAll(".cells div");
const gameStatusText = document.querySelector(".gameStatus");
const restartBtn = document.querySelector(".restart");

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "O";
let running = false;

function initialize() {
  cells.forEach((cell) => cell.addEventListener("click", clickCell));
  restartBtn.addEventListener("click", restartGame);
  gameStatusText.textContent = `${currentPlayer}'s turn`;
  running = true;
}

function clickCell() {
  const cellIndex = this.dataset.index;
  if (options[cellIndex] != "" || !running) return;
  updateCell(this, cellIndex);
  checkWinner();
}

function updateCell(cell, index) {
  options[index] = currentPlayer;
  cell.textContent = currentPlayer;
}

function changePlayer() {
  if (currentPlayer === "O") currentPlayer = "X";
  else currentPlayer = "O";
  gameStatusText.textContent = `${currentPlayer}'s turn`;
}

const checkWinner = () => {
  let roundWon = false;

  console.log(options);
  for (let i = 0; i < winConditions.length; i++) {
    const condition = winConditions[i];
    const cellA = options[condition[0]];
    const cellB = options[condition[1]];
    const cellC = options[condition[2]];

    if (cellA == "" || cellB == "" || cellC == "") {
      continue;
    }
    if (cellA == cellB && cellB == cellC) {
      roundWon = true;
      condition.forEach((i) => {
        cells[i].style.color = "green";
      });
      break;
    }
  }
  if (roundWon) {
    gameStatusText.style.color = "green";
    gameStatusText.textContent = `${currentPlayer} wins!`;
    running = false;
  } else if (!options.includes("")) {
    gameStatusText.textContent = "Draw!";
    running = false;
  } else {
    changePlayer();
  }
};

const restartGame = () => {
  currentPlayer = "O";
  options = ["", "", "", "", "", "", "", "", ""];
  gameStatusText.textContent = `${currentPlayer}'s turn`;
  gameStatusText.style.color = "black";
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.style.color = "black";
  });
  running = true;
};

initialize();
