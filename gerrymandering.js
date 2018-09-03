var grid = [];
var districtGrid = [];
var electionGrid;
var count = [0,0,0,0];
var winStat = [0,0];
var filled = 0;
var electionNum = 0;

function init() {
  setupGrid();
  document.addEventListener("keydown", function onEvent(event) {
      switch(event.key) {
        case "1":
          popGenerate(30,1000,false);
          break;
        case "2":
          redistrict(false);
          break;
        case "3":
          election(false);
          break;
        case "4":
          repeatElection(10);
          break;
        case "5":
          document.getElementById("el").innerHTML = "";
          electionNum = 0;
        case "6":
          runTrials(100, 100, 3);
          break;
        case "7":
          saveGraph();
          break;
        case "8":
          loadGraph();
          break;
      }
  });
}

function saveGraph(){
  var gridWord = "[";
  var distWord = "[";
  for (var x = 0; x < 50; x++){
    gridWord += "[";
    distWord += "[";
    for (var y = 0; y < 50; y++){
      gridWord += grid[x][y] + ",";
      distWord += districtGrid[x][y] + ",";
    }
    gridWord.substring(0,gridWord.length - 1);
    gridWord += "]";
    distWord += "]";
  }
  gridWord += "]";
  distWord += "]";
  document.getElementById("gridSave").innerHTML = gridWord;
  document.getElementById("distSave").innerHTML = distWord;
}

function loadGraph(){
  resetBoard();
  grid = document.getElementById("gridSave").value;
  districtGrid = document.getElementById("distSave").value;
  drawGrid();
  drawDistricts();
}

function runTrials(trials, distRep, distNum){
  var distTrials = [];
  var trialStorage = 0;
  var pop;
  var el;
  var storeMe;
  var winner = 0;
  var winValue = 1;
  for (var x = 0; x < distNum; x++) {
    distTrials[x] = [];
  }
  for (var t = 0; t < trials; t++) {
    popGenerate(30,1000,true);
    for (var d = 0; d < distNum; d++) {
      document.getElementById("districtType").value = x;
      trialStorage = 0;
      for (var y = 0; y < distRep; y++) {
        redistrict(true);
        pop = popVote();
        filled = 1;
        el = election(true);
        if (pop[0] == el[0]){
          trialStorage += Math.abs(pop[1] - el[1]);
        }
        else {
          trialStorage += Math.abs(pop[1] - (1 - el[1]));
        }
      }
      distTrials[d][t] = trialStorage / distRep;
    }
  }
  for (var x = 0; x < distNum; x++){
    storeMe = 0;
    for (var y = 0; y < trials; y++){
      storeMe += distTrials[x][y];
    }
    distTrials[x] = storeMe / trials;
    if (distTrials[x] < winValue){
      winValue = distTrials[x];
      winner = x;
    }
  }
  distTrials[distTrials.legnth] = winner;
  var disp = "";
  console.log(distTrials);
  for (var x = 0; x < distTrials.length; x++){
    disp += "<br>" + distTrials[x];
  }
  document.getElementById("bottomScroll").innerHTML = disp;
}

function setupGrid() {
  var fillGrid = [];
  grid = [];
  for (var x = 0; x < 50; x++) {
    for (var y = 0; y < 50; y++) {
      fillGrid.push(0);
    }
    grid.push(fillGrid);
    fillGrid = [];
  }
}

function setupDistrictGrid() {
  var fillGrid = [];
  districtGrid = [];
  for (var x = 0; x < 50; x++) {
    for (var y = 0; y < 50; y++) {
      fillGrid.push(0);
    }
    districtGrid.push(fillGrid);
    fillGrid = [];
  }
}

function drawGrid() {
  var a;
  var b;
  var c;
  for (var x = 0; x < 50; x++) {
    if (x < 10) {
      a = "0" + String(x);
    }
    else {
      a = String(x);
    }
    for (var y = 0; y < 50; y++) {
      if (y < 10) {
        b = "0" + String(y);
      }
      else {
        b = String(y);
      }
      c = grid[x][y];
      switch (c) {
        case 0:
          document.getElementById("box" + a + b).style.backgroundColor = "rgb(255,255,255)";
          break;
        case 1:
          document.getElementById("box" + a + b).style.backgroundColor = "rgb(255,0,0)";
          break;
        case 2:
          document.getElementById("box" + a + b).style.backgroundColor = "rgb(0,0,255)";
          break;
        case 3:
          document.getElementById("box" + a + b).style.backgroundColor = "rgb(255,0,255)";
          break;
        case 4:
          document.getElementById("box" + a + b).style.backgroundColor = "rgb(226,194,76)";
          break;
      }
    }
  }
}

function popGenerate(num, size, test) {
  setupGrid();
  resetBoard();
  var gridX;
  var gridY;
  var side;
  var sSize;
  var move;
  var giveUp;
  var success;
  for (var x = 0; x < num; x++) {
    side = sideGen();
    if (side == 4) {
      sSize = 100;
    }
    else {
      sSize = size;
    }
    gridX = randomInt(0,50);
    gridY = randomInt(0,50);
    for (var y = 0; y < sSize; y++) {
      if (grid[gridX][gridY] == 0 || grid[gridX][gridY] == side) {
        grid[gridX][gridY] = side;
      }
      giveUp = 0;
      success = 0;
      while (giveUp < 20 && success != 1) {
        move = randomInt(0,4);
        success = 1;
        if (move == 0 && gridX < 49) {
          gridX++;
        }
        else if (move == 1 && gridX > 0) {
          gridX--;
        }
        else if (move == 2 && gridY < 49) {
          gridY++;
        }
        else if (move == 3 && gridY > 0) {
          gridY--;
        }
        else {
          success = 0;
        }
        giveUp++;
      }
      if (giveUp == 20) {

      }
    }
  }
  fillRest();
  analysis();
  if (test) {
    return;
  }
  drawGrid();
}

function fillRest() {
  for (var x = 0; x < 50; x++) {
    for (var y = 0; y < 50; y++) {
      if (grid[x][y] == 0) {
        grid[x][y] = sideGen();
      }
    }
  }
}

function sideGen() {
  var side = randomInt(0,100);
  if (side < 1) {
    return 4;
  }
  else if (side < 10) {
    return 3;
  }
  else if (side < 60) {
    return 2;
  }
  else {
    return 1;
  }
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

function analysis() {
  count = [0,0,0,0];
  var value;
  for (var x = 0; x < 50; x++) {
    for (var y = 0; y < 50; y++) {
      value = grid[x][y] - 1;
          count[value]++;
    }
  }
  value = "";
  for (x = 0; x < count.length; x++) {
    value = value + ", " + count[x];
  }
  value = value.substring(2);
  document.getElementById("winStat").innerHTML = value;
}

function drawDistricts() {
  if (filled == 1) {
    return;
  }
  var a;
  var b;
  var el;
  var newDiv;
  for (var x = 0; x < 50; x++) {
    if (x < 10) {
      a = "0" + String(x);
    }
    else {
      a = String(x);
    }
    for (var y = 0; y < 50; y++) {
      if (y < 10) {
        b = "0" + String(y);
      }
      else {
        b = String(y);
      }
      el = document.getElementById("box" + a + b);
      if (x > 0) {
        if (districtGrid[x - 1][y] != districtGrid[x][y]) {
          newDiv = document.createElement("div");
          newDiv.className = "top";
          el.appendChild(newDiv);
        }
      }
      if (y > 0) {
        if (districtGrid[x][y - 1] != districtGrid[x][y]) {
          newDiv = document.createElement("div");
          if (x > 0) {
            if (districtGrid[x][y] != districtGrid[x - 1][y]) {
              newDiv.className = "rightSpecial";
            }
            else {
              newDiv.className = "right";
            }
          }
          else {
            newDiv.className = "right";
          }
          el.appendChild(newDiv);
        }
      }
    }
    filled = 1;
  }
  el = document.getElementById("box0000");
  var l = document.createElement("div");
  l.className = "Bleft";
  el.appendChild(l);
  var u = document.createElement("div");
  u.className = "Bup";
  el.appendChild(u);
  el = document.getElementById("box4949");
  var r = document.createElement("div");
  r.className = "Bright";
  el.appendChild(r);
  var d = document.createElement("div");
  d.className = "Bdown";
  el.appendChild(d);
}

function resetBoard() {
  var a;
  var b;
  for (var x = 0; x < 50; x++) {
    if (x < 10) {
      a = "0" + String(x);
    }
    else {
      a = String(x);
    }
    for (var y = 0; y < 50; y++) {
      if (y < 10) {
        b = "0" + String(y);
      }
      else {
        b = String(y);
      }
      document.getElementById("box" + a + b).innerHTML = "";
    }
  }
  filled = 0;
}

function redistrict(test) {
  setupDistrictGrid();
  var type = Number(document.getElementById("districtType").value);
  switch (type) {
    case 1:
      district1();
      break;
    case 2:
      district2();
      break;
    case 3:
      district3();
      break;
    case 4:
      district4();
      break;
    case 5:
      district5();
      break;
    default:
      break;
  }
  if (test) {
    return;
  }
  resetBoard();
  drawDistricts();
}

function district1() {
  var moveX;
  var moveY;
  for (var x = 0; x < 25; x++) {
    moveX = Math.floor(x / 5) * 10;
    moveY = (x % 5) * 10;
    for (var y = 0; y < 10; y++) {
      for (var z = 0; z < 10; z++) {
        districtGrid[moveX + y][moveY + z] = x;
      }
    }
  }
}

function district2() {
  for (var x = 0; x < 50; x++) {
    for (var y = 0; y < 50; y++) {
      districtGrid[x][y] = Math.floor(x/2);
    }
  }
}

function district3() {
  var mx;
  var my;
  district1();
  for (var x = 0; x < 1000; x++) {
    mx = randomInt(1,49);
    my = randomInt(1,49);
    for (var y = -1; y < 2; y++) {
      for (var z = -1; z < 2; z++) {
        districtGrid[mx + y][my + z] = districtGrid[mx][my];
      }
    }
  }
  loneyChecker();
  for (var rep = 0; rep < 0; rep++){
    lineSmoother();
  }
}

function district4() {
  var dx;
  var dy;
  var first;
  var distLen;
  var friend;
  for (var x = 0; x < 25; x++) {
    distLen = 0;
    first = 1;
    while (distLen == 0) {
      dx = randomInt(0,50);
      dy = randomInt(0,50);
      for (var y = 0; y < 10; y++) {
        for (var z = 0; z < 10; z++) {
          if (dx + y < 50 && dy + z < 50) {
            if (districtGrid[dx + y][dy + z] == 0) {
              if (first == 1) {
                districtGrid[dx + y][dy + z] = x;
                first = 0;
                distLen++;
              }
              else {
                friend = false;
                for (var rep = 0; rep < 4; rep++) {
                  switch (rep) {
                    case 1:
                      if (dx + y > 0) {
                        if (districtGrid[dx + y - 1][dy + z] == x) {
                          friend = true;
                        }
                      }
                      break;
                    case 1:
                      if (dx + y < 50) {
                        if (districtGrid[dx + y + 1][dy + z] == x) {
                          friend = true;
                        }
                      }
                      break;
                    case 2:
                      if (dy + z > 0) {
                        if (districtGrid[dx + y][dy + z - 1] == x) {
                          friend = true;
                        }
                      }
                      break;
                    default:
                      if (dy + z < 50) {
                        if (districtGrid[dx + y][dy + z + 1] == x) {
                          friend = true;
                        }
                      }
                  }
                }
                if (friend) {
                  districtGrid[dx + y][dy + z] = x;
                  distLen++;
                }
              }
            }
          }
        }
      }
    }
  }
  for (var y = 0; y < 50; y++) {
    for (var z = 0; z < 50; z++) {

    }
  }
}

function loneyChecker() {
  var curr;
  var alone;
  for (var x = 0; x < 50; x++) {
    for (var y = 0; y < 50; y++) {
      curr = districtGrid[x][y];
      alone = true;
      for (var z = 0; z < 4; z++) {
        switch (z) {
          case 0:
            if (x > 0) {
              if (districtGrid[x - 1][y] == curr) {
                alone = false;
              }
            }
            break;
          case 1:
            if (x < 49) {
              if (districtGrid[x + 1][y] == curr) {
                alone = false;
              }
            }
            break;
          case 2:
            if (y > 0) {
              if (districtGrid[x][y - 1] == curr) {
                alone = false;
              }
            }
            break;
          default:
            if (y < 49) {
              if (districtGrid[x][y + 1] == curr) {
                alone = false;
              }
            }
        }
      }
      if (alone) {
        if (y > 0) {
          districtGrid[x][y] = districtGrid[x][y - 1];
        }
        else {
          districtGrid[x][y] = districtGrid[x][y + 1];
        }
      }
    }
  }
}

function lineSmoother() {
  var curr;
  var match;
  var nonMatchFace;
  var edges;
  for (var x = 0; x < 50; x++) {
    for (var y = 0; y < 50; y++) {
      curr = districtGrid[x][y];
      alone = 0;
      nonMatchFace = -1;
      edges = 0;
      match = 0;
      for (var z = 0; z < 4; z++) {
        switch (z) {
          case 0:
            if (x > 0) {
              if (districtGrid[x - 1][y] == curr) {
                match++;
              }
              else {
                nonMatchFace = z;
              }
            }
            else {
              edges++;
            }
            break;
          case 1:
            if (x < 49) {
              if (districtGrid[x + 1][y] == curr) {
                match++;
              }
              else {
                nonMatchFace = z;
              }
            }
            else {
              edges++;
            }
            break;
          case 2:
            if (y > 0) {
              if (districtGrid[x][y - 1] == curr) {
                match++;
              }
              else {
                nonMatchFace = z;
              }
            }
            else {
              edges++;
            }
            break;
          default:
            if (y < 49) {
              if (districtGrid[x][y + 1] == curr) {
                match++;
              }
              else {
                nonMatchFace = z;
              }
            }
            else {
              edges++;
            }
        }
      }
      if (match < 3 - edges) {
        switch (nonMatchFace) {
          case 0:
            districtGrid[x][y] = districtGrid[x - 1][y];
            break;
          case 1:
            districtGrid[x][y] = districtGrid[x + 1][y];
            break;
          case 2:
            districtGrid[x][y] = districtGrid[x][y - 1];
            break;
          default:
            districtGrid[x][y] = districtGrid[x][y + 1];
        }
      }
    }
  }
}

function election(test) {
  if (filled == 0) {
    return;
  }
  electionGrid = [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],0,0,0];
  var col;
  var ran;
  var side;
  for (var x = 0; x < 50; x++) {
    for (var y = 0; y < 50; y++) {
      switch (grid[x][y]) {
        case 1:
          side = 0;
          break;
        case 2:
          side = 1;
          break;
        case 3:
          ran = randomInt(0,1000);
          if (ran < 500) {
            side = 0;
          }
          else {
            side = 1;
          }
          break;
        default:
          break;
      }
      electionGrid[side][districtGrid[x][y]]++;
    }
  }
  for (x = 0; x < 25; x++) {
    if (electionGrid[0][x] > electionGrid[1][x]) {
      electionGrid[2]++;
    }
    else if (electionGrid[0][x] < electionGrid[1][x]) {
      electionGrid[3]++;
    }
    else {
      ran = randomInt(0,1000);
      if (ran < 500) {
        electionGrid[2]++;
      }
      else {
        electionGrid[3]++;
      }
    }
  }
  if (electionGrid[2] > electionGrid[3]) {
    electionGrid[4] = 1;
  }
  else {
    electionGrid[4] = 2;
  }
  filled = 0;
  if (test == true){
    if (electionGrid[4] == 1){
      return [electionGrid[4], electionGrid[2]/25];
    }
    else {
      return [electionGrid[4], electionGrid[3]/25];
    }
  }
  showElection();
}

function popVote(){
  var rep = 0;
  var dem = 0;
  for (var x = 0; x < 50; x++) {
    for (var y = 0; y < 50; y++) {
      switch (grid[x][y]) {
        case 1:
          rep++;
          break;
        case 2:
          dem++;
          break;
        case 3:
          if (randomInt(0,10) < 5) {
            rep++;
          }
          else {
            dem++;
          }
          break;
      }
    }
  }
  if (rep > dem) {
    var win = 1;
    var winPercent = rep/2500;
  }
  else {
    var win = 2;
    var winPercent = dem/2500;
  }
  return [win, winPercent];
}

function showElection() {
  var distType = document.getElementById("districtType").value;
  var distWin = "";
  var winSide;
  for (var x = 0; x < 25; x++) {
    if (x % 5 == 0) {
      if (distWin.length != 0) {
        distWin += "<br>";
      }
    }
    distWin += String(x + 1) + ":[" + electionGrid[0][x] + "," + electionGrid[1][x] + "] ";
  }
  if (electionGrid[4] == 1) {
    winSide = "Republicans";
  }
  else {
    winSide = "Democrats";
  }
  electionNum++;
  document.getElementById("el").innerHTML += "<br><br>" + "<b>Election " + electionNum + "</b> - <i>District Type: " + distType + "</i><br>" + distWin + "<br>Rep: " + electionGrid[2] + " | Dem: " + electionGrid[3] + " | Winner: " + winSide
  document.getElementById("bottomScroll").scrollIntoView();
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

function leftToRightSelector(arr) {
  for (var a = 0; a < arr[0].length; a++) {
    for (var b = 0; b < arr; b++) {
      if (arr[a][b] == 0) {
        return [a,b];
      }
    }
  }
}

function repeatElection(iterations) {
  for (var x = 0; x < iterations; x++) {
    filled = 1;
    election(false);
  }
}
