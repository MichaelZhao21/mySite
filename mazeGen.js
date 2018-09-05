var c;
var wallW = 10;
var sideL = 800;
var boxH = 20;
var innerH = boxH - (2 * wallW);
var grid = [];
var stack = [];
var intCount = 0;

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


})(paint || (paint = {}));

function Cell(x, y) {
  this.x = x;
  this.y = y;
  this.up = true;
  this.right = true;
  this.down = true;
  this.left = true;
  this.visited = false;
}

function getGrid(x, y) {
  return grid[(40 * (y / 20)) + (x / 20)];
}

function setup() {
  var intro = document.getElementById("intro");
  intro.style.display = "none";
  var canvas = document.getElementById("mainCanvas");
  canvas.width = sideL + wallW;
  canvas.height = canvas.width;
  c = canvas.getContext("2d");
  c.fillStyle = "#000"
  c.fillRect(0,0,sideL + wallW,sideL + wallW);
  makeGrid();
  run();
}

function makeGrid() {
  for (var y = 0; y < sideL; y += boxH) {
    for (var x = 0; x < sideL; x += boxH) {
      grid.push(new Cell(x, y));
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
  // while (stack.length > 0) {
  var int = setInterval(function(){
    if (stack.length == 0) {
      clearInterval(int);
    }
    runTest();
    intCount++;
  }, 5);
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
    console.log(g);
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
