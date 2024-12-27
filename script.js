// Tic Tac Toe Web Application

// Get HTML elements
const boxes = document.querySelectorAll('.box');
const infoText = document.querySelector('.info');
const resetButton = document.getElementById('reset');

// Initialize game state
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;

// Winning combinations
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Update the board UI
function updateBoard() {
  boxes.forEach((box, index) => {
    box.querySelector('.boxtext').textContent = board[index];
  });
}

// Highlight winning combination
function highlightWinningCombination(combination) {
  combination.forEach(index => {
    boxes[index].style.backgroundColor = "lightgreen";
  });
  const line = document.createElement('div');
  line.classList.add('winning-line');
  const container = document.querySelector('.container');
  const [a, b, c] = combination;
  const positions = [a, b, c].map(index => boxes[index].getBoundingClientRect());

  if (a === 0 && b === 4 && c === 8) {
    line.style.transform = "rotate(45deg)";
    line.style.left = "50%";
    line.style.top = "50%";
  } else if (a === 2 && b === 4 && c === 6) {
    line.style.transform = "rotate(-45deg)";
    line.style.left = "50%";
    line.style.top = "50%";
  } else if (positions.length) {
    // Adjust per needs for horizontal or vertical winning
  }
  container.appendChild(line);
}

// Handle box click
function handleBoxClick(event) {
  const boxIndex = Array.from(boxes).indexOf(event.currentTarget);

  if (board[boxIndex] !== "" || !isGameActive) {
    return;
  }

  board[boxIndex] = currentPlayer;
  updateBoard();
  checkWinner();
  if (isGameActive) switchPlayer();
}

// Switch player
function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  infoText.textContent = `Player ${currentPlayer}'s turn`;
}

// Check for winner or tie
function checkWinner() {
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;

    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      infoText.textContent = `Player ${board[a]} wins!`;
      highlightWinningCombination(combination);
      isGameActive = false;
      return;
    }
  }

  if (!board.includes("")) {
    infoText.textContent = "It's a tie!";
    isGameActive = false;
  }
}

// Reset the game
resetButton.addEventListener('click', () => {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  isGameActive = true;
  infoText.textContent = `Player ${currentPlayer}'s turn`;
  updateBoard();
  boxes.forEach(box => {
    box.style.backgroundColor = "";
  });
  const line = document.querySelector('.winning-line');
  if (line) line.remove();
});

// Add click event listeners to the boxes
boxes.forEach(box => {
  box.addEventListener('click', handleBoxClick);
});

// Initial setup
updateBoard();

