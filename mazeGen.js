var c;
var wallW = 10;
var sideL = 800;
var boxH = 20;
var innerH = boxH - (2 * wallW);
var grid = [];
var stack = [];
var speed = 1;
var player = {x:0, y:10};

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

  function character(x, y) {
    c.fillStyle = "#ff6600";
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
  var g = getGrid(ax, ay);
  var next, choice, by, bx;
  var dx = 0;
  var dy = 0;
  paint.box(g.x, g.y, g.up, g.right, g.down, g.left, g.visited);
  g.visited = true;
  stack.push(g);
  var int = setInterval(function(){
    if (stack.length == 0) {
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
}

function playGame() {
  resetGame();
  var playB = document.getElementById("play");
  playB.style.display = "none";
  finalizeGrid();
}

function resetGame() {
  c.fillStyle = "#000";
  c.fillRect(0, 0, sideL, sideL);
  c.fillStyle = "#fff";
  c.fillRect(0,10,10,10);
  c.fillRect(800, 790, 10, 10);
  for (var x = 0; x < 1600; x++) {
    g = grid[x];
    paint.box(g.x, g.y, g.up, g.right, g.down, g.left, false);
  }
  paint.character(player.x, player.y);
}

function loadGrid() {
  var saveLoadInfo = document.getElementById("saveLoadInfo");
  var input = document.getElementById("loadData").value;
  var cutInput = [];

  if (input.length != 6400) {
    saveLoadInfo.innerHTML = "Invalid input!";
    return;
  }
  grid = [];
  while (input.length > 0) {
    cutInput.push(Number(input.substring(0, 1)) == 1);
    cutInput.push(Number(input.substring(1, 2)) == 1);
    cutInput.push(Number(input.substring(2, 3)) == 1);
    cutInput.push(Number(input.substring(3, 4)) == 1);
    input = input.substring(4);
  }
  for (var y = 0; y < sideL; y += boxH) {
    for (var x = 0; x < sideL; x += boxH) {
      grid.push(new Cell(x, y, cutInput[0], cutInput[1], cutInput[2], cutInput[3], false));
      for (var z = 0; z < 4; z++) {
        cutInput.shift();
      }
    }
  }
  resetGame();
}

function saveGrid() {
  var saveLoadInfo = document.getElementById("saveLoadInfo");
  var outputBox = document.getElementById("loadData");
  var output = "";
  var g;
  if (grid.length == 0) {
    saveLoadInfo.innerHTML = "Nothing to save!";
    return;
  }
  for (var x = 0; x < 1600; x++) {
    g = grid[x];
    if (g.up) {
      output += "1";
    }
    else {
      output += "0";
    }
    if (g.right) {
      output += "1";
    }
    else {
      output += "0";
    }
    if (g.down) {
      output += "1";
    }
    else {
      output += "0";
    }
    if (g.left) {
      output += "1";
    }
    else {
      output += "0";
    }
  }
  outputBox.value = output;
}
