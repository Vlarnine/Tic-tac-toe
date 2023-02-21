// Определяем игровое поле
var gameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];
  
  // Определяем возможные ходы игрока и бота
  var player = 'X';
  var bot = 'O';
  
  // Определяем функцию, которая будет проверять, выиграл ли кто-то из игроков
  function checkWinner(board) {
    // Проверяем горизонтали
    for (var i = 0; i < 3; i++) {
      if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== null) {
        return board[i][0];
      }
    }
  
    // Проверяем вертикали
    for (var j = 0; j < 3; j++) {
      if (board[0][j] === board[1][j] && board[1][j] === board[2][j] && board[0][j] !== null) {
        return board[0][j];
      }
    }
  
    // Проверяем диагонали
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== null) {
      return board[0][0];
    }
    if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== null) {
      return board[0][2];
    }
  
    // Если никто не выиграл, возвращаем null
    return null;
  }
  
  // Определяем функцию, которая будет делать ход бота
  function botMove(board) {
    // Ищем свободную клетку
    var row, col;
    do {
      row = Math.floor(Math.random() * 3);
      col = Math.floor(Math.random() * 3);
    } while (board[row][col] !== null);
  
    // Ставим туда символ бота
    board[row][col] = bot;
  }
  
  // Определяем функцию, которая будет обновлять игровое поле в HTML
  function updateBoard(board) {
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        var cell = document.getElementById('cell-' + i + j);
        cell.textContent = board[i][j] || '';
      }
    }
  }
  
  // Определяем функцию, которая будет обрабатывать ход игрока
  function handlePlayerMove(row, col) {
    // Проверяем, что клетка свободна
    if (gameBoard[row][col] !== null) {
      alert  
('Эта клетка уже занята, выберите другую!');
return;
}

// Ставим туда символ игрока
gameBoard[row][col] = player;

// Обновляем игровое поле в HTML
updateBoard(gameBoard);

// Проверяем, выиграл ли игрок
var winner = checkWinner(gameBoard);
if (winner !== null) {
alert('Поздравляем! Вы выиграли!');
return;
}

// Делаем ход бота
botMove(gameBoard);

// Обновляем игровое поле в HTML
updateBoard(gameBoard);

// Проверяем, выиграл ли бот
var winner = checkWinner(gameBoard);
if (winner !== null) {
alert('К сожалению, вы проиграли.');
return;
}
}

// Определяем функцию, которая будет запускать новую игру
function newGame() {
// Очищаем игровое поле
gameBoard = [
[null, null, null],
[null, null, null],
[null, null, null]
];

// Обновляем игровое поле в HTML
updateBoard(gameBoard);

// Случайным образом определяем, кто будет ходить первым
if (Math.random() < 0.5) {
alert('Вы ходите первым!');
} else {
botMove(gameBoard);
updateBoard(gameBoard);
alert('Бот ходит первым!');
}
}

// Назначаем обработчики событий для клеток игрового поля
for (var i = 0; i < 3; i++) {
for (var j = 0; j < 3; j++) {
var cell = document.getElementById('cell-' + i + j);
cell.addEventListener('click', (function(row, col) {
  return function() {
    handlePlayerMove(row, col);
  };
})(i, j));
}
}

// Запускаем новую игру
newGame();