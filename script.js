const boardSize = 5; // 5x5 board
let board = [];

// Initialize the board
function createBoard() {
    const gameBoard = document.getElementById("game-board");
    gameBoard.innerHTML = "";

    for (let i = 0; i < boardSize; i++) {
        board[i] = [];
        for (let j = 0; j < boardSize; j++) {
            const tile = document.createElement("div");
            tile.classList.add("tile");
            tile.dataset.row = i;
            tile.dataset.col = j;

            // Add click event listener
            tile.addEventListener("click", () => handleClick(i, j));
            board[i][j] = tile;
            gameBoard.appendChild(tile);
        }
    }

    randomizeBoard();
}

// Toggle a tile and its neighbors
function toggleTile(row, col) {
    if (row >= 0 && row < boardSize && col >= 0 && col < boardSize) {
        board[row][col].classList.toggle("is-off");
    }
}

// Handle tile click
function handleClick(row, col) {
    toggleTile(row, col);
    toggleTile(row - 1, col); // Above
    toggleTile(row + 1, col); // Below
    toggleTile(row, col - 1); // Left
    toggleTile(row, col + 1); // Right

    if (checkWin()) {
        displayWinMessage();
    }
}

// Display a custom win message
function displayWinMessage() {
    const winMessage = document.createElement("div");
    winMessage.id = "win-message";
    winMessage.textContent = "🎉 Congratulations! You won the game! 🎉";
    winMessage.style.position = "fixed";
    winMessage.style.top = "50%";
    winMessage.style.left = "50%";
    winMessage.style.transform = "translate(-50%, -50%)";
    winMessage.style.padding = "20px";
    winMessage.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    winMessage.style.color = "white";
    winMessage.style.borderRadius = "10px";
    winMessage.style.fontSize = "1.5em";
    winMessage.style.textAlign = "center";
    winMessage.style.zIndex = "1000";

    document.body.appendChild(winMessage);

    setTimeout(() => {
        winMessage.remove(); // Remove the message after 3 seconds
        createBoard(); // Restart the game
    }, 3000);
}

// Check if all tiles are off
function checkWin() {
    return Array.from(document.querySelectorAll(".tile")).every(tile =>
        tile.classList.contains("is-off")
    );
}

// Randomize the board while ensuring it's solveable
function randomizeBoard() {
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            if (Math.random() < 0.5) {
                handleClick(i, j); // Simulate a random click
            }
        }
    }
}

// Initialize the game
createBoard();
