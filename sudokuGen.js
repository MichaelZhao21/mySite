var grid = [[],[],[],[],[],[],[],[],[]];
var correctGrid = [[],[],[],[],[],[],[],[],[]];

function makeAnswer(){
var possibleNumbers = [1,2,3,4,5,6,7,8,9];
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
  for (var x = 0; x < 9; x++){
    for (var y = 0; y < 9; y++){
      correctGrid[x][y] = grid[x][y];
    }
  }
  drawTable();
}

function drawTable(){
  for (x = 0; x < 9; x++){
    for (y = 0; y < 9; y++){
      z = document.getElementById("box" + String(x) + String(y));
      if (grid[x][y] == 0){
        z.innerHTML = "<input type=\"text\" id=\"answer" + String(x) + String(y) + "\" maxlength=\"1\"></input>";
      }
      else{
        z.innerHTML = grid[x][y];
      }
    }
  }
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

function findEmptySpots(){
  var emptyGrid = [];
  for (var x = 0; x < 9; x++){
    for (var y = 0; y < 9; y++){
      if(grid[x][y] == 0){
        emptyGrid.append(String(x) + String(y));
      }
    }
  }
}

function makeSpotsEmpty(spots){
  var r;
  var c;
  var test = 0;
  for (var x = 0; x < spots; x++){
    test = 0;
    while (test == 0){
      r = randomInt(0,9);
      c = randomInt(0,9);
      if (grid[r][c] == 0){
        test = 0;
      }
      else{
        grid[r][c] = 0;
        test = 1;
      }
    }
  }
  drawTable();
}

function testCorrect(){
  var value;
  for (var x = 0; x < 9; x++){
    for (var y = 0; y < 9; y++){
      if (grid[x][y] == 0){
        value = document.getElementById("answer" + String(x) + String(y)).value;
        if (value == ""){
        }
        else if (Number(value) != correctGrid[x][y]){
          document.getElementById("answer" + String(x) + String(y)).style.color = "red";
        }
      }
    }
  }
}
