const editPlayer1Btn = document.getElementById('player-1-btn');
const editPlayer2Btn = document.getElementById('player-2-btn');
const model = document.getElementById('config-overlay');
const backdrop = document.querySelector('.backdrop');
const configCancelBtn = document.getElementById('config-cancel');
const form = document.querySelector('form');
const configErrMess = document.getElementById('config-errors');

let configedPlayer = 0;
const players = [{name: '', symbol:'X'}, {name: '', symbol:'0'}];

const newGameBtn = document.getElementById('new-game-btn');
const gameArea = document.getElementById('game-section');
const currentPlayer = document.getElementById('current-player');
const gameGrid = document.getElementById('game-grid');
const winnerMess = document.getElementById('winner-message');

let activePlayer = 0;
const gameState = [[0,0,0],[0,0,0],[0,0,0]];
let roundNum = 1;
let isGameOver = false;


editPlayer1Btn.addEventListener('click', displayModel);
editPlayer2Btn.addEventListener('click', displayModel);
backdrop.addEventListener('click', hideConfig);
configCancelBtn.addEventListener('click', hideConfig);
form.addEventListener('submit', saveConfig);


newGameBtn.addEventListener('click', startGame);
gameGrid.addEventListener('click', handlePanelClick);
