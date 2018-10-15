var turn = 1;
var bannedSpots = [];
var grid = [[0,0,0],[0,0,0],[0,0,0]];
var gameStart = true;
var pvp = false;

function selectedSpace(id) {
  var space = [Number(id.substring(3,5))];

  if (turn == 1) {
    document.getElementById(id).innerHTML = "<img src='X.png' alt='X'>";
  }
  else {
    document.getElementById(id).innerHTML = "<img src='O.png' alt='O'>";
  }

  bannedSpots.push(id);
  grid[Math.floor(space / 10)][space % 10] = turn;

  var winner = testForWin();
  if (winner != 0) {
    var win = document.getElementById("winner");
    win.style.display = "block";
    if (winner == 3) {
      win.innerHTML = "TIE!!!";
    }
    else {
      win.innerHTML = "Player " + winner + " Wins!!!"
    }
    document.getElementById("resetButt").style.display = "block";
    gameStart = false;
  }

  turn = -turn;
}

function banned(test) {
  var ban = false;
  for (var x = 0; x < bannedSpots.length; x++) {
    if (bannedSpots[x] == test) {
      ban = true;
    }
  }
  return ban;
}

function testForWin() {
  var win = 0;
  for (var x = 0; x < 3; x++) {
    if (grid[x][0] != 0 && grid[x][0] == grid[x][1] && grid[x][1] == grid[x][2]) {
      win = grid[x][0];
    }
    if (grid[0][x] != 0 && grid[0][x] == grid[1][x] && grid[1][x] == grid[2][x]) {
      win = grid[0][x];
    }
  }
  if (grid[0][0] != 0 && grid[0][0] == grid[1][1] && grid[1][1] == grid[2][2]) {
    win = grid[0][0];
  }
  if (grid[0][2] != 0 && grid[0][2] == grid[1][1] && grid[1][1] == grid[2][0]) {
    win = grid[0][2];
  }
  var blank = 0;
  for (var y = 0; y < 3; y++) {
    for (var x = 0; x < 3; x++) {
      if (grid[y][x] == 0) {
        blank++;
      }
    }
  }
  if (blank == 0) {
    return 3;
  }
  if (win == -1) {
    win = 2;
  }
  return win;
}

function reset() {
  document.getElementById("resetButt").style.display = "none";
  document.getElementById("winner").style.display = "none";
  var id;
  for (var y = 0; y < 3; y++) {
    for (var x = 0; x < 3; x++) {
      id = "box" + y + x;
      document.getElementById(id).innerHTML = "";
    }
  }
  gameStart = true;
  turn = 1;
  bannedSpots = [];
  grid = [[0,0,0],[0,0,0],[0,0,0]];
}

function cpuTurn() {

}

document.addEventListener("click", function onEvent(event) {
  if (event.srcElement.id.substr(0,3) == "box" && !banned(event.srcElement.id) && gameStart){
    selectedSpace(event.srcElement.id);

  }
});
