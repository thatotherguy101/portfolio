function restartGame() {
    activePlayer = 0;
    roundNum = 1;
    isGameOver = false;
    winnerMess.firstElementChild.innerHTML = "<h2>You won, <span id=\"winner-name\">Player 1</span>!</h2>";
    winnerMess.style.display = "none";
    
    let i = 0;
    for(let x = 0; x < 3; x++){
        for(let y = 0; y < 3; y++){
            gameState[x][y] = 0;
            gameGrid.children[i].textContent = '';
            gameGrid.children[i].classList.remove('disabled');
            i++;
        }
    }
}

function startGame(event) {
  if (!players[0].name || !players[1].name) {
    alert("Please set names for both players");
    return;
  }

  restartGame();

  currentPlayer.textContent = players[activePlayer].name;
  gameArea.style.display = "block";
}

function gameOver(result) {
  if (result === 0) {
    return;
  }

  winnerMess.style.display = "block";
  if (result > 0) {
    const winnerName = document.getElementById("winner-name");
    winnerName.textContent = players[result - 1].name;
  } else {
    winnerMess.firstElementChild.textContent = "It's a draw!";
  }
  isGameOver = true;
}

function determineWinner() {
  for (let x = 0; x < 3; x++) {
    if (
      gameState[x][0] > 0 &&
      gameState[x][0] === gameState[x][1] &&
      gameState[x][1] === gameState[x][2]
    ) {
      return gameState[x][0];
    }
  }

  for (let x = 0; x < 3; x++) {
    if (
      gameState[0][x] > 0 &&
      gameState[0][x] === gameState[1][x] &&
      gameState[1][x] === gameState[2][x]
    ) {
      return gameState[0][x];
    }
  }

  if (
    gameState[0][0] > 0 &&
    gameState[0][0] === gameState[1][1] &&
    gameState[1][1] === gameState[2][2]
  ) {
    return gameState[0][0];
  }

  if (
    gameState[0][2] > 0 &&
    gameState[0][2] === gameState[1][1] &&
    gameState[1][1] === gameState[2][0]
  ) {
    return gameState[0][2];
  }

  if (roundNum === 9) {
    return -1;
  }

  return 0;
}

function changeTurn() {
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }

  currentPlayer.textContent = players[activePlayer].name;
}

function handlePanelClick(event) {
  if (event.target.tagName != "LI" || isGameOver) {
    return;
  }

  gridTile = event.target;
  const row = gridTile.dataset.row - 1;
  const col = gridTile.dataset.col - 1;

  if (gameState[row][col] > 0) {
    alert("You must choose an empty field.");
    return;
  }

  gridTile.textContent = players[activePlayer].symbol;
  gridTile.classList.add("disabled");

  gameState[row][col] = activePlayer + 1;

  gameOver(determineWinner());
  roundNum++;
  changeTurn();
}
