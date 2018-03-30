function makeAnswer(){
var possibleNumbers = [1,2,3,4,5,6,7,8,9];
var grid = [[],[],[],[],[],[],[],[],[]];
  for (var x = 0; x < 9; x++){
    for (var y = 0; y < 9; y++){
      grid[x][y] = 0;
    }
  }
  var tempGrid = possibleNumbers;
  var shiftGrid3 = [3,4,5,6,7,8,0,1,2]
  var shiftGrid1 = [1,2,3,4,5,6,7,8,0]
  var spot;
  for(var y = 0; y < 9; y++){
    spot = randomInt(0,tempGrid.length);
    grid[0][y] = tempGrid[spot];
    tempGrid.splice(spot,1);
  }
  for (var y = 1; y < 9; y++){
    if (y%3 == 0){
      for (var x = 0; x < 9; x++){
        grid[y][x] = grid[y-1][shiftGrid1[x]];
      }
    }
    else{
      for (var x = 0; x < 9; x++){
        grid[y][x] = grid[y-1][shiftGrid3[x]];
      }
    }
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
