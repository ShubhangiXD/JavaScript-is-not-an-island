let n = 8;
let board = [];
let solutions = [];

function solve() {
  n = parseInt(document.getElementById("nInput").value);
  board = new Array(n).fill(-1);
  solutions = [];
  hillClimbing();
  showSolution(0);
}

function hillClimbing() {
  let currentScore = getScore(board);
  while (true) {
    let nextScore = -1;
    let nextBoard = board.slice();
    for (let col = 0; col < n; col++) {
      let row = board[col];
      for (let row2 = 0; row2 < n; row2++) {
        if (row2 != row) {
          let newBoard = board.slice();
          newBoard[col] = row2;
          let score = getScore(newBoard);
          if (score > nextScore) {
            nextScore = score;
            nextBoard = newBoard;
          }
        }
      }
    }
    if (nextScore <= currentScore) {
      solutions.push(board);
      return;
    }
    board = nextBoard;
    currentScore = nextScore;
  }
}

function getScore(board) {
  let score = 0;
  for (let col = 0; col < n; col++) {
    let row = board[col];
    for (let col2 = col + 1; col2 < n; col2++) {
      let row2 = board[col2];
      if (row == row2 || row - col == row2 - col2 || row + col == row2 + col2) {
        score++;
      }
    }
  }
  return score;
}

function showSolution(index) {
  let solution = solutions[index];
  let boardDiv = document.getElementById("board");
  boardDiv.innerHTML = "";
  boardDiv.className = "board";
  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
      let square = document.createElement("div");
      square.className = "square";
      if (row == solution[col]) {
        square.className += " queen";
      }
      boardDiv.appendChild(square);
    }
  }
}
