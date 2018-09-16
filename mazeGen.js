var c;
var wallW = 10;
var sideL = 800;
var boxH = 20;
var innerH = boxH - (2 * wallW);
var grid = [];
var stack = [];
var speed = 1;
var player = {x:10, y:10};
var playing = false;
var g;

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

var paint;
(function (paint) {

  function box(x, y, up, right, down, left, visited) {
    side = [up, right, down, left];
    if (!visited) {
      c.fillStyle = "#fff";
    }
    else {
      c.fillStyle = "#80aaff";
    }
    if (!side[0]) {
      c.fillRect(x + wallW, y, boxH - wallW, wallW);
    }
    if (!side[1]) {
      c.fillRect(x + boxH, y + wallW, wallW, boxH - wallW);
    }
    if (!side[2]) {
      c.fillRect(x + wallW, y + boxH, boxH - wallW, wallW);
    }
    if (!side[3]) {
      c.fillRect(x, y + wallW, wallW, boxH - wallW);
    }
    c.fillRect(x + wallW, y + wallW, boxH - wallW, boxH - wallW)
  }
  paint.box = box;

  function finalBox(x, y, state) {
    if (state) {
      c.fillStyle = "#fff";
    }
    else {
      c.fillStyle = "#000";
    }
    c.fillRect(x, y, 10, 10);
  }
  paint.finalBox = finalBox;

  function character(x, y, op) {
    if (op == "draw") {
      c.fillStyle = "#ff6600";
    }
    else {
      c.fillStyle = "#fff";
    }
    c.fillRect(x + 1, y + 1, 8, 8);
  }
  paint.character = character;

})(paint || (paint = {}));

function Cell(x, y, up, right, down, left) {
  this.x = x;
  this.y = y;
  this.up = up;
  this.right = right;
  this.down = down;
  this.left = left;
  this.visited = false;
}

function getGrid(x, y) {
  return grid[(40 * (y / 20)) + (x / 20)];
}

function drawCanvas() {
  var canvas = document.getElementById("mainCanvas");
  canvas.width = sideL + wallW;
  canvas.height = canvas.width;
  c = canvas.getContext("2d");
  c.fillStyle = "#000"
  c.fillRect(0,0,sideL + wallW,sideL + wallW);
}

function setup() {
  var intro = document.getElementById("intro");
  intro.style.display = "none";
  makeGrid();
  run();
}

function makeGrid() {
  for (var y = 0; y < sideL; y += boxH) {
    for (var x = 0; x < sideL; x += boxH) {
      grid.push(new Cell(x, y, true, true, true, true));
    }
  }
}

function run() {
  var ax = randomInt(0, 40) * 20;
  var ay = randomInt(0, 40) * 20;
  g = getGrid(ax, ay);
  var next, choice, by, bx;
  var dx = 0;
  var dy = 0;
  paint.box(g.x, g.y, g.up, g.right, g.down, g.left, g.visited);
  g.visited = true;
  stack.push(g);
  var int = setInterval(function(){
    if (stack.length == 0) {
      finalizeGrid();
      clearInterval(int);
      var playButton = document.getElementById("play");
      playButton.style.display = "block";
    }
    else {
      runTest();
    }
  }, speed);
}

function runTest() {
  dx = 0;
  dy = 0;
  g = stack[stack.length - 1];
  next = findNext(g.x, g.y);
  if (next.length != 0) {
    choice = next[Math.floor(Math.random() * next.length)];
    if (choice / 200 >= 1) {
      dy = (choice % 200) - 20;
      by = g.y + dy;
      bx = g.x;
    }
    else {
      dx = (choice % 100) - 20;
      bx = g.x + dx;
      by = g.y;
    }
    g = getGrid(bx, by);
    if (dy == -20) {
      g.down = false;
    }
    else if (dx == 20) {
      g.left = false;
    }
    else if (dy == 20) {
      g.up = false;
    }
    else if (dx == -20) {
      g.right = false;
    }
    else {
      console.error(":(");
    }
    paint.box(g.x, g.y, g.up, g.right, g.down, g.left, g.visited);
    g.visited = true;
    stack.push(g);
  }
  else {
    g = stack[stack.length - 1];
    paint.box(g.x, g.y, g.up, g.right, g.down, g.left, g.visited);
    stack.pop();
  }
}

function findNext(x, y) {
  var unvisited = [];
  if (x + 20 < sideL) {
    if (!getGrid(x + 20, y).visited) {
      unvisited.push(140);
    }
  }
  if (x - 20 >= 0) {
    if (!getGrid(x - 20, y).visited) {
      unvisited.push(100);
    }
  }
  if (y + 20 < sideL) {
    if (!getGrid(x, y + 20).visited) {
      unvisited.push(240);
    }
  }
  if (y - 20 >= 0) {
    if (!getGrid(x, y - 20).visited) {
      unvisited.push(200);
    }
  }
    return unvisited;
}

function finalizeGrid() {
  var newGrid = [];
  var newGridRow = [];
  var newGridRow2 = [];
  var g;
  var gridIncr = 0;

  for (var y = 0; y < sideL; y += boxH) {
    for (var x = 0; x < sideL; x += boxH) {
      g = getGrid(x, y);
      if (g.x < 780) {
        if (!getGrid(g.x + 20, g.y).left) {
          g.right = false;
        }
      }
      if (g.x > 20) {
        if (!getGrid(g.x - 20, g.y).right) {
          g.left = false;
        }
      }
      if (g.y < 780) {
        if (!getGrid(g.x, g.y + 20).up) {
          g.down = false;
        }
      }
      g.visited = false;
      grid[gridIncr] = g;
      gridIncr++;
    }
  }

  for (var x = 0; x < 80; x++) {
    newGridRow.push(false);
  }
  newGrid.push(newGridRow);

  for (var y = 0; y < sideL; y += boxH) {
    newGridRow = [false];
    newGridRow2 = [false];
    for (var x = 0; x < sideL; x += boxH) {
      g = getGrid(x, y);
      newGridRow.push(true);
      newGridRow.push(!g.right);
      newGridRow2.push(!g.down);
      newGridRow2.push(false);
    }
    newGrid.push(newGridRow);
    newGrid.push(newGridRow2);
  }
  c.fillStyle = "#000";
  c.fillRect(0, 0, sideL, sideL);
  for (var y = 0; y < 800; y += 10) {
    for (var x = 0; x < 800; x += 10) {
      paint.finalBox(x, y, newGrid[y / 10][x / 10]);
    }
  }
  grid = newGrid;
  grid[1][0] = true;
}

function playGame() {
  resetGame();
  var playB = document.getElementById("play");
  playB.style.display = "none";
  playing = true;
  window.addEventListener('scroll', noScroll);
}

function resetGame() {
  c.fillStyle = "#000";
  c.fillRect(0, 0, sideL, sideL);
  c.fillStyle = "#fff";
  c.fillRect(0,10,10,10);
  c.fillRect(800, 790, 10, 10);
  for (var y = 0; y < 800; y += 10) {
    for (var x = 0; x < 800; x += 10) {
      paint.finalBox(x, y, grid[y / 10][x / 10]);
    }
  }
  paint.character(player.x, player.y, "draw");
}

function loadGrid() {
  var saveLoadInfo = document.getElementById("saveLoadInfo");
  var input = document.getElementById("loadData").value;
  var incr = 0;
  var inTest;
  var gridRow = [];

  if (input.length != 6400) {
    saveLoadInfo.innerHTML = "Invalid input!";
    return;
  }

  c.fillStyle = "#000";
  c.fillRect(0, 0, sideL, sideL);

  for (var y = 0; y < 80; y++) {
    gridRow = [];
    for (var x = 0; x < 80; x++) {
      inTest = input.substring(incr, incr + 1);
      gridRow.push(inTest == "1");
      incr++;
    }
    grid.push(gridRow);
  }

  for (var y = 0; y < 800; y += 10) {
    for (var x = 0; x < 800; x += 10) {
      paint.finalBox(x, y, grid[y / 10][x / 10]);
    }
  }
  playGame();
}

function saveGrid() {
  var saveLoadInfo = document.getElementById("saveLoadInfo");
  var outputBox = document.getElementById("loadData");
  var output = "";

  if (grid.length == 0) {
    saveLoadInfo.innerHTML = "Nothing to save!";
    return;
  }
  finalizeGrid();
  for (var y = 0; y < 80; y++) {
    for (var x = 0; x < 80; x++) {
      if (grid[y][x]) {
        output += 1;
      }
      else {
        output += 0;
      }
    }
  }
  outputBox.value = output;
}

function movePerson(dir) {
  oldX = player.x;
  oldY = player.y;
  switch (dir) {
    case "up":
      if (grid[(player.y / 10) - 1][player.x / 10]) {
        player.y -= 10;
      }
      break;
    case "right":
      if (player.y == 790 && player.x == 790) {
        endGame();
        return;
      }
      if (grid[player.y / 10][(player.x / 10) + 1]) {
        player.x += 10;
      }
      break;
    case "down":
      if (grid[(player.y / 10) + 1][player.x / 10]) {
        player.y += 10;
      }
      break;
    case "left":
      if (grid[player.y / 10][(player.x / 10) - 1]) {
        player.x -= 10;
      }
      break;
    default:
      return;
  }
  paint.character(oldX, oldY, "erase");
  paint.character(player.x, player.y, "draw");
}

function teleport() {
  var x = Number(document.getElementById("teleX").value);
  var y = Number(document.getElementById("teleY").value);
  if (grid[y / 10][x / 10]) {
    paint.character(player.x, player.y, "erase");
    paint.character(x, y, "draw");
    player.x = x;
    player.y = y;
  }
}

function endGame() {
  window.removeEventListener('scroll', noScroll());
  paint.character(player.x, player.y, "erase");
  paint.character(player.x + 10, player.y, "draw");
  alert("YOU WIN!!!!!!!!!!!!!!!!");
}

function noScroll() {
  window.scrollTo( 0, 0 );
}

document.addEventListener("keydown", function onEvent(event) {
  if (playing) {
    console.log(event.key);
    switch(event.key){
      case "ArrowUp":
        movePerson("up");
        break;
      case "ArrowRight":
        movePerson("right");
        break;
      case "ArrowDown":
        movePerson("down");
        break;
      case "ArrowLeft":
        movePerson("left");
        break;
      default:
        return;
    }
  }
});
