var grid = [];
var districtGrid = [];

function init(){
  setupGrid();
  document.addEventListener("keydown", function onEvent(event) {
      switch(event.key){
        case "1":
          popGenerate(30,1000);
          break;
        default:
          return;
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
      if (c == 0){
        document.getElementById("box" + a + b).style.backgroundColor = "rgb(255,255,255)";
      }
      else if (c == 1){
        document.getElementById("box" + a + b).style.backgroundColor = "rgb(255,0,0)";
      }
      else if (c == 2){
        document.getElementById("box" + a + b).style.backgroundColor = "rgb(0,0,255)";
      }
      else if (c == 3){
        document.getElementById("box" + a + b).style.backgroundColor = "rgb(255,0,255)";
      }
      else if (c == 4){
        document.getElementById("box" + a + b).style.backgroundColor = "rgb(226,194,76)";
      }
    }
  }
}

function popGenerate(num, size){
  setupGrid();
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

function redistrict(){
  
}
