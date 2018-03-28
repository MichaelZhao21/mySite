function makeAnswer(){
var possibleNumbers = [1,2,3,4,5,6,7,8,9];
var grid = [[],[],[],[],[],[],[],[],[]];
  for (var x = 0; x < 9; x++){
    for (var y = 0; y < 9; y++){
      grid[x][y] = 0;
    }
  }

  var tempGrid = possibleNumbers;
  var spot;
  for(var x = 0; x < 9; x++){
    spot = randomInt(0,tempGrid.length);
    grid[0][x] = tempGrid[spot];
    tempGrid.splice(spot,1);
  }
  drawTable(grid);
}

function drawTable(grid){
  for (x = 0; x < 9; x++){
    for (y = 0; y < 9; y++){
      z = document.getElementById("box" + String(x) + String(y));
      z.innerHTML = grid[x][y];
    }
  }
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}
