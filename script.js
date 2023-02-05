const cells = document.querySelectorAll("td");
const modal = document.getElementById("modal");
const modalText = document.getElementById("modal-text");
const close = document.querySelector(".close");

let grid = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

const players = ['X', 'O'];

let currentPlayer = 0;

const getPlayer = () => {
  return players[currentPlayer];
};

const makeMove = (row, col) => {
  if (grid[row][col] === null) {
    grid[row][col] = getPlayer();
    currentPlayer = (currentPlayer + 1) % 2;
  } else {
    console.log("This cell is already filled. Try another one.");
  }
};

function computerMove() {
    let emptyCells = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[i][j] === null) {
          emptyCells.push([i, j]);
        }
      }
    }
  
    if (emptyCells.length > 0) {
      const randomIndex = Math.floor(Math.random() * emptyCells.length);
      const [row, col] = emptyCells[randomIndex];
      makeMove(row, col);
      let cell = document.getElementById(`${row}-${col}`);
      cell.textContent = grid[row][col];
      cell.classList.add("no-click");
    }
  }

const checkWinner = () => {
  // Check rows
  for (let i = 0; i < 3; i++) {
    if (grid[i][0] === grid[i][1] && grid[i][1] === grid[i][2]) {
      return grid[i][0];
    }
  }

  // Check columns
  for (let i = 0; i < 3; i++) {
    if (grid[0][i] === grid[1][i] && grid[1][i] === grid[2][i]) {
      return grid[0][i];
    }
  }

  // Check diagonals
  if (grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2]) {
    return grid[0][0];
  }
  if (grid[0][2] === grid[1][1] && grid[1][1] === grid[2][0]) {
    return grid[0][2];
  }

  return null;
};

const resetGame = () => {
    grid = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
      ];
      cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("no-click");
    });
}

// Show the modal and display the winner
function showModal(message) {
    modalText.textContent = message;
    modal.style.display = "block";
  }
  
  // Close the modal when the close button is clicked
close.addEventListener("click", () => {
    modal.style.display = "none";
    resetGame();
  });
  
  // Close the modal when the user clicks outside of the modal content
window.addEventListener("click", event => {
    if (event.target == modal) {
      modal.style.display = "none";
      resetGame();
    }
  });

const play = (row, col) => {
  makeMove(row, col);
  computerMove();
  const winner = checkWinner();
  if (winner==="X") {
    let message = ("Congratulations, you win!");
    showModal(message);
  }
  else if (winner==="O") {
    let message = ("Computer wins!");
    showModal(message);    
  }
  else{
    return;
  }
};

cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
      const row = Math.floor(index / 3);
      const col = index % 3;
      play(row, col);
      cell.textContent = grid[row][col];
      cell.classList.add("no-click");
    });
  });
