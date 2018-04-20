var grid = [];
var districtGrid = [];
var electionGrid;
var count = [0,0,0,0];
var winStat = [0,0];
var filled = 0;

function test(num){
  for (var x = 0; x < num; x++){
    popGenerate(30,1000);
  }
}

function init(){
  setupGrid();
  document.addEventListener("keydown", function onEvent(event) {
      switch(event.key){
        case "1":
          popGenerate(30,1000);
          break;
        case "2":
          redistrict();
          break;
        case "3":
          resetBoard();
          break;
        case "4":
          test(document.getElementById("testTimes").value);
          break;
        case "5":
          election();
        default:
          break;
      }
  });
}

function setupGrid(){
  var fillGrid = [];
  grid = [];
  for (var x = 0; x < 50; x++){
    for (var y = 0; y < 50; y++){
      fillGrid.push(0);
    }
    grid.push(fillGrid);
    fillGrid = [];
  }
}

function setupDistrictGrid(){
  var fillGrid = [];
  districtGrid = [];
  for (var x = 0; x < 50; x++){
    for (var y = 0; y < 50; y++){
      fillGrid.push(0);
    }
    districtGrid.push(fillGrid);
    fillGrid = [];
  }
}

function drawGrid(){
  var a;
  var b;
  var c;
  for (var x = 0; x < 50; x++){
    if (x < 10){
      a = "0" + String(x);
    }
    else{
      a = String(x);
    }
    for (var y = 0; y < 50; y++){
      if (y < 10){
        b = "0" + String(y);
      }
      else{
        b = String(y);
      }
      c = grid[x][y];
      switch (c){
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

function popGenerate(num, size){
  setupGrid();
  resetBoard();
  var gridX;
  var gridY;
  var side;
  var sSize;
  var move;
  var giveUp;
  var success;
  for (var x = 0; x < num; x++){
    side = sideGen();
    if (side == 4){
      sSize = 10;
    }
    else{
      sSize = size;
    }
    gridX = randomInt(0,50);
    gridY = randomInt(0,50);
    for (var y = 0; y < sSize; y++){
      if (grid[gridX][gridY] == 0 || grid[gridX][gridY] == side){
        grid[gridX][gridY] = side;
      }
      giveUp = 0;
      success = 0;
      while (giveUp < 20 && success != 1){
        move = randomInt(0,4);
        success = 1;
        if (move == 0 && gridX < 49){
          gridX++;
        }
        else if (move == 1 && gridX > 0){
          gridX--;
        }
        else if (move == 2 && gridY < 49){
          gridY++;
        }
        else if (move == 3 && gridY > 0){
          gridY--;
        }
        else {
          success = 0;
        }
        giveUp++;
      }
      if (giveUp == 20){

      }
    }
  }
  fillRest();
  drawGrid();
  analysis();
}

function fillRest(){
  for (var x = 0; x < 50; x++){
    for (var y = 0; y < 50; y++){
      if (grid[x][y] == 0){
        grid[x][y] = sideGen();
      }
    }
  }
}

function sideGen(){
  var side = randomInt(0,100);
  if (side < 1){
    return 4;
  }
  else if (side < 10){
    return 3;
  }
  else if (side < 60){
    return 2;
  }
  else {
    return 1;
  }
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

function analysis(){
  count = [0,0,0,0];
  var value;
  for (var x = 0; x < 50; x++){
    for (var y = 0; y < 50; y++){
      value = grid[x][y] - 1;
          count[value]++;
    }
  }
  value = "";
  for (x = 0; x < count.length; x++){
    value = value + ", " + count[x];
  }
  value = " | " + value.substring(2);
  if (count[0] > count[1]){
    winStat[0]++;
  }
  else{
    winStat[1]++;
  }
  document.getElementById("winStat").innerHTML = winStat + value;
}

function drawDistricts(){
  if (filled == 1){
    return;
  }
  var a;
  var b;
  var el;
  var newDiv;
  for (var x = 0; x < 50; x++){
    if (x < 10){
      a = "0" + String(x);
    }
    else{
      a = String(x);
    }
    for (var y = 0; y < 50; y++){
      if (y < 10){
        b = "0" + String(y);
      }
      else{
        b = String(y);
      }
      el = document.getElementById("box" + a + b);
      if (x > 0){
        if (districtGrid[x - 1][y] != districtGrid[x][y]){
          newDiv = document.createElement("div");
          newDiv.className = "top";
          el.appendChild(newDiv);
        }
      }
      if (y > 0){
        if (districtGrid[x][y - 1] != districtGrid[x][y]){
          newDiv = document.createElement("div");
          newDiv.className = "right";
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

function resetBoard(){
  var a;
  var b;
  for (var x = 0; x < 50; x++){
    if (x < 10){
      a = "0" + String(x);
    }
    else{
      a = String(x);
    }
    for (var y = 0; y < 50; y++){
      if (y < 10){
        b = "0" + String(y);
      }
      else{
        b = String(y);
      }
      document.getElementById("box" + a + b).innerHTML = "";
    }
  }
  filled = 0;
}

function redistrict(){
  setupDistrictGrid();
  resetBoard();
  var type = Number(document.getElementById("districtType").value);
  switch (type){
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
  drawDistricts();
}

function district1(){
  var moveX;
  var moveY;
  for (var x = 0; x < 25; x++){
    moveX = Math.floor(x / 5) * 10;
    moveY = (x % 5) * 10;
    for (var y = 0; y < 10; y++){
      for (var z = 0; z < 10; z++){
        districtGrid[moveX + y][moveY + z] = x;
      }
    }
  }
}

function district2(){
  for (var x = 0; x < 50; x++){
    for (var y = 0; y < 50; y++){
      districtGrid[x][y] = Math.floor(x/2);
    }
  }
}

function election(){
  electionGrid = [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],0,0,0];
  var col;
  var ran;
  var side;
  for (var x = 0; x < 50; x++){
    for (var y = 0; y < 50; y++){
      switch (grid[x][y]){
        case 1:
          side = 0;
          break;
        case 2:
          side = 1;
          break;
        case 3:
          ran = randomInt(0,1000);
          if (ran < 500){
            side = 0;
          }
          else {
            side = 1;
          }
          break;
      }
      electionGrid[side][districtGrid[x][y]]++;
    }
  }
  for (x = 0; x < 25; x++){
    if (electionGrid[0][x] > electionGrid[1][x]){
      electionGrid[2]++;
    }
    else if (electionGrid[0][x] < electionGrid[1][x]){
      electionGrid[3]++;
    }
    else {
      ran = randomInt(0,1000);
      if (ran < 500){
        electionGrid[2]++;
      }
      else {
        electionGrid[3]++;
      }
    }
  }
  if (electionGrid[2] > electionGrid[3]){
    electionGrid[4] = 1;
  }
  else {
    electionGrid[4] = 2;
  }
  console.log(electionGrid);
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}
