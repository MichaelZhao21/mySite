var turn = 1;
var bannedSpots = [];
var grid = [[0,0,0],[0,0,0],[0,0,0]];
var gameStart = true;
var pvp = true;

function setup() {
  document.getElementById("cpu").addEventListener("click", function (event) {
    pvp = !pvp;
    reset();
  });
}

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

  var winner = testForWin(grid);
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
  if (pvp) {
    turn = -turn;
  }
  console.log(grid);
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

function testForWin(testGrid) {
  var win = 0;
  for (var x = 0; x < 3; x++) {
    if (testGrid[x][0] != 0 && testGrid[x][0] == testGrid[x][1] && testGrid[x][1] == testGrid[x][2]) {
      win = testGrid[x][0];
    }
    if (testGrid[0][x] != 0 && testGrid[0][x] == testGrid[1][x] && testGrid[1][x] == testGrid[2][x]) {
      win = testGrid[0][x];
    }
  }
  if (testGrid[0][0] != 0 && testGrid[0][0] == testGrid[1][1] && testGrid[1][1] == testGrid[2][2]) {
    win = testGrid[0][0];
  }
  if (testGrid[0][2] != 0 && testGrid[0][2] == testGrid[1][1] && testGrid[1][1] == testGrid[2][0]) {
    win = testGrid[0][2];
  }
  var blank = 0;
  for (var y = 0; y < 3; y++) {
    for (var x = 0; x < 3; x++) {
      if (testGrid[y][x] == 0) {
        blank++;
      }
    }
  }
  if (blank == 0 && win == 0) {
    win = 3;
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

document.addEventListener("click", function (event) {
  if (event.srcElement.id.substr(0,3) == "box" && !banned(event.srcElement.id) && gameStart){
    selectedSpace(event.srcElement.id);
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key = " ") {
    cpuTurn();
  }
});

function cpuTurn() {
  var states = [new State(-1,-1,grid.slice())];
  var notDone = true;
  var levelStartIndices = [0,1];
  var level = 0;
  var newStates = [];
  var currState;
  var winState;

  console.log(states);
  var newStates = fillNext(states, level, levelStartIndices);
  console.log(newStates);

  // while (notDone) {
  //   notDone = false;
  //   newStates = fillNext(states, level, levelStartIndices);
  //   states = states.concat(newStates);
  //   levelStartIndices.push(states.length);
  //   for (var x = levelStartIndices[levelStartIndices.length - 2]; x < states.length; x++) {
  //     currState = states[x];
  //     winState = testForWin(currState.myGrid);
  //     if (winState == -1) {
  //       currState.score = 100 / (currState.level + 1);
  //     }
  //     else if (winState == 1) {
  //       currState.score = -100 / (currState.level + 1);
  //     }
  //     else {
  //       notDone = true;
  //     }
  //   }
  // }

}

function State(parent, level, myGrid) {
  this.parent = parent;
  this.level = level;
  this.myGrid = myGrid;
  this.childStart = 0;
  this.childEnd = 0;
  this.score = 0;
}

function fillNext(states, level, levelStartIndices) {
  var startIndex = levelStartIndices[levelStartIndices.length - 2];
  var index = states.length;
  var newStates = [];
  var newGrid;
  var testIndex = 0;

  for (var x = startIndex; x < states.length - startIndex; x++) {
    for (var a = 0; a < 3; a++) {
      for (var b = 0; b < 3; b++) {
        newGrid = states[x].myGrid.slice();
        if (newGrid[a][b] == 0) {
          newGrid[a][b] = (level % 2 == 0) ? -1 : 1;
          newStates.push(new State(x, level, newGrid.slice()));
        }
        console.log(newGrid);
      }
    }
  }
  return newStates;
}
