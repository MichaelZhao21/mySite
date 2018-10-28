var grid = [];
var answerGrid = [];
var mineCount = 40;
var flag = false;
var flagCount = 0;
var clickedBoxes = 0;

(function(){
  var id;
  document.write("<p class='title'>Minesweeper</p>");
  document.write("<div id='game'></div>");
  for(var y = 0; y < 20; y++) {
      document.getElementById("game").innerHTML += ("<div class='row' id='row" + y + "'></div>");
      for (var x = 0; x < 20; x++) {
        id = getId(x, y);
        document.getElementById("row" + y).innerHTML += "<div class='cell' id='box" + id + "'><button class='clicky' onclick='clicked(\"" + id + "\")'></button></div>";
      }
  }
  document.write("<p class='text' id='end'></p>");
  setup();
})();

document.addEventListener("keydown", function (event) {
  if (event.key == "Shift") {
    flag = true;
  }
});
document.addEventListener("keyup", function (event) {
  if (event.key == "Shift") {
    flag = false;
  }
});

function setup() {
  newGrid();
  deployMines();
  countMines();
  console.log(grid);
}

function newGrid() {
  grid = [];
  var tempGrid = [];
  for (var y = 0; y < 20; y++) {
    tempGrid = [];
    for (var x = 0; x < 20; x++) {
      tempGrid.push(0);
    }
    grid.push(tempGrid);
  }
}

function deployMines() {
  var x;
  var y;
  var count = 0;
  while(count < mineCount) {
    x = randInt(0, 20);
    y = randInt(0, 20);
    if (grid[y][x] != -1) {
      grid[y][x] = -1;
      count++;
    }
  }
}

function countMines() {
  var bombCount = 0;
  for (var y = 0; y < 20; y++) {
    for (var x = 0; x < 20; x++) {
      if (grid[y][x] != -1) {
        bombCount = 0;
        for (var dy = -1; dy <= 1; dy++) {
          for (var dx = -1; dx <= 1; dx++) {
            if (y + dy >= 0 && y + dy < 20 && x + dx >= 0 && x + dx < 20) {
              if (grid[y + dy][x + dx] == -1) {
                bombCount++;
              }
            }
          }
        }
        grid[y][x] = bombCount;
      }
    }
  }
}

function deFlag(id) {
  var box = document.getElementById("box" + id);
  box.style.backgroundColor = "#d9d9d9";
  box.innerHTML = "<button class='clicky' onclick='clicked(\"" + id + "\")'></button>"
}

function clicked(id) {
  var box = document.getElementById("box" + id);
  box.style.backgroundColor = "white";
  var x = Number(id.substring(2,4));
  var y = Number(id.substring(0,2));
  checkClicked(x, y, box);
}

function checkClicked(x, y, box) {
  clickedBoxes++;
  if (flag) {
    flagCount++;
    box.innerHTML = "<button class='clicky' onclick='deFlag(\"" + getId(x, y) + "\")'>|&gt</button>";
    box.childNodes[0].style.color = "#6699ff";
  }
  else if (grid[y][x] == -1) {
    box.style.color = "red";
    exploded(x, y);
  }
  else if (grid[y][x] == 0) {
    findSurrounding(x, y);
  }
  else {
    box.innerHTML = grid[y][x];
    box.style.color = numToColor(grid[y][x]);
  }
}

function exploded() {
  var box;
  for (var y = 0; y < 20; y++) {
    for (var x = 0; x < 20; x++) {
      box = document.getElementById("box" + getId(x, y));
      box.style.backgroundColor = "white";
      if (grid[y][x] == -1) {
        box.innerHTML = "O";
        box.style.fontWeight = "bold";
      }
      else if (grid[y][x] == 0) {
        box.innerHTML = " ";
      }
      else {
        box.innerHTML = grid[y][x];
        box.style.color = numToColor(grid[y][x]);
      }
    }
  }
}

function numToColor(num) {
  switch (num) {
    case 1:
      return "#267326";
      break;
    case 2:
      return "#a23211";
      break;
    case 3:
      return "#ff33cc";
      break;
    case 4:
      return "#cc0066";
      break;
    case 5:
      return "#660066";
      break;
  }
}

function findSurrounding(x, y) {
  var testArr = [new Space(x, y, grid[y][x])];
  var currSpace;
  var createSpaces;
  var box;
  var testedArr = [];
  while (testArr.length != 0) {
    currSpace = testArr[0];
    box = document.getElementById("box" + getId(currSpace.x, currSpace.y));
    box.style.backgroundColor = "white";
    box.innerHTML = " ";
    createSpaces = surround(currSpace, testArr.concat(testedArr));
    testArr = testArr.concat(createSpaces);
    testedArr.push(testArr.shift());
  }
}

function Space(x, y, value) {
  this.x = x;
  this.y = y;
  this.value = value;
}

function inArr(currSpace, testArr) {
  for (var z = 0; z < testArr.length; z++) {
    if (testArr[z].x == currSpace.x && testArr[z].y == currSpace.y) {
      return true;
    }
  }
  return false;
}

function surround(currSpace, testArr) {
  var newArr = [];
  var box;
  if (currSpace.x + 1 < 20) {
    if (grid[currSpace.y][currSpace.x + 1] == 0 && !inArr(new Space(currSpace.x + 1, currSpace.y, grid[currSpace.x + 1, currSpace.y]), testArr)) {
      newArr.push(new Space(currSpace.x + 1, currSpace.y, grid[currSpace.x + 1, currSpace.y]));
    }
    if (grid[currSpace.y][currSpace.x + 1] != 0) {
      box = document.getElementById("box" + getId(currSpace.x + 1, currSpace.y));
      box.innerHTML = grid[currSpace.y][currSpace.x + 1];
      box.style.backgroundColor = "white";
      box.style.color = numToColor(grid[currSpace.y][currSpace.x + 1]);
    }
  }
  if (currSpace.x - 1 >= 0) {
    if (grid[currSpace.y][currSpace.x - 1] == 0 && !inArr(new Space(currSpace.x - 1, currSpace.y, grid[currSpace.x - 1, currSpace.y]), testArr)) {
      newArr.push(new Space(currSpace.x - 1, currSpace.y, grid[currSpace.x - 1, currSpace.y]));
    }
    if (grid[currSpace.y][currSpace.x - 1] != 0) {
      box = document.getElementById("box" + getId(currSpace.x - 1, currSpace.y));
      box.innerHTML = grid[currSpace.y][currSpace.x - 1];
      box.style.backgroundColor = "white";
      box.style.color = numToColor(grid[currSpace.y][currSpace.x - 1]);
    }
  }
  if (currSpace.y + 1 < 20) {
    if (grid[currSpace.y + 1][currSpace.x] == 0 && !inArr(new Space(currSpace.x, currSpace.y + 1, grid[currSpace.x, currSpace.y + 1]), testArr)) {
      newArr.push(new Space(currSpace.x, currSpace.y + 1, grid[currSpace.x, currSpace.y + 1]));
    }
    if (grid[currSpace.y + 1][currSpace.x] != 0) {
      box = document.getElementById("box" + getId(currSpace.x, currSpace.y + 1));
      box.innerHTML = grid[currSpace.y + 1][currSpace.x];
      box.style.backgroundColor = "white";
      box.style.color = numToColor(grid[currSpace.y + 1][currSpace.x]);
    }
  }
  if (currSpace.y - 1 >= 0) {
    if (grid[currSpace.y - 1][currSpace.x] == 0 && !inArr(new Space(currSpace.x, currSpace.y - 1, grid[currSpace.x, currSpace.y - 1]), testArr)) {
      newArr.push(new Space(currSpace.x, currSpace.y - 1, grid[currSpace.x, currSpace.y - 1]));
    }
    if (grid[currSpace.y - 1][currSpace.x] != 0) {
      box = document.getElementById("box" + getId(currSpace.x, currSpace.y - 1));
      box.innerHTML = grid[currSpace.y - 1][currSpace.x];
      box.style.backgroundColor = "white";
      box.style.color = numToColor(grid[currSpace.y - 1][currSpace.x]);
    }
  }
  return newArr;
}

function getId(x, y) {
  return "" + (y < 10 ? "0" + y : y) + (x < 10 ? "0" + x : x);
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}
