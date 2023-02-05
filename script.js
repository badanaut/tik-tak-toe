const cells = document.querySelectorAll("td");

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    const row = Math.floor(index / 3);
    const col = index % 3;
    play(row, col);
    cell.textContent = grid[row][col];
  });
});


const grid = [
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

const play = (row, col) => {
  makeMove(row, col);
  const winner = checkWinner();
  if (winner) {
    console.log(`Player ${winner} won the game!`);

    return;
  }
  console.log("No winner yet.");
};
