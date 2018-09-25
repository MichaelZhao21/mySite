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
  var shiftGrid3 = [3,4,5,6,7,8,0,1,2];
  var shiftGrid1 = [1,2,3,4,5,6,7,8,0];
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
  makeSpotsEmpty(20);
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
  var saveNum;
  var giveUp = 0;
  var test = 0;
  for (var x = 0; x < spots; x++){
    test = 0;
    giveUp = 0;
    while (test == 0){
      r = randomInt(0,9);
      c = randomInt(0,9);
      if (grid[r][c] == 0){
        test = 0;
      }
      else{
        saveNum = grid[r][c];
        grid[r][c] = 0;
        if (giveUp > 100){
          test = 1;
        }
        if (isPossible() == false){
          grid[r][c] = saveNum;
          console.log(String(r) + String(c));
          giveUp++;
        }
        else{
          test = 1;
        }
      }
    }
  }
  drawTable();
}

function testCorrect(){
  var value;
  var allRight = 0;
  for (var x = 0; x < 9; x++){
    for (var y = 0; y < 9; y++){
      if (grid[x][y] == 0){
        value = document.getElementById("answer" + String(x) + String(y)).value;
        if (value == ""){
          document.getElementById("answer" + String(x) + String(y)).style.color = "";
          allRight++;
        }
        else if (Number(value) != correctGrid[x][y]){
          document.getElementById("answer" + String(x) + String(y)).style.color = "red";
          allRight++;
        }
        else{
          document.getElementById("answer" + String(x) + String(y)).style.color = "";
        }
      }
    }
  }
  if (allRight == 0){
    alert("You got the entire puzzle right!");
  }
}

function isPossible(){
  var imagGrid = [[],[],[],[],[],[],[],[],[]];
  for (var x = 0; x < 9; x++){
    for (var y = 0; y < 9; y++){
      imagGrid[x][y] = grid[x][y];
    }
  }
  var num;
  var zeros = testForZeros();
  var x;
  var y;
  var ans;
  var notPoss = 0;
  while (zeros.length != 0){
    notPoss++;
    if (notPoss > 20){
      return false;
    }
    for (var l = 0; l <zeros.length; l++){
      x = String(zeros[l]).substr(0,1);
      y = String(zeros[l]).substr(1,1);
      if (grid[x][y] == 0){
        ans = getAnswer(x, y);
        if (ans != 0){
          zeros.splice(l,1);
          imagGrid[x][y] == ans;
        }
        else {
          zeros.slice(l,1);
        }
      }
    }
  }
  return true;
}

function getAnswer(row, column){
  var testGrid = ["00", "01", "02", "10", "11", "12", "20", "21", "22", "03", "04", "05", "13", "14", "15", "23", "24", "25", "06", "07", "08", "16", "17", "18", "26", "27", "28", "30", "31", "32", "40", "41", "42", "50", "51", "52", "33", "34", "35", "43", "44", "45", "53", "54", "55", "36", "37", "38", "46", "47", "48", "56", "57", "58", "60", "61", "62", "70", "71", "72", "80", "81", "82", "63", "64", "65", "73", "74", "75", "83", "84", "85", "66", "67", "68", "76", "77", "78", "86", "87", "88"];
  var testNum = [1,2,3,4,5,6,7,8,9];
  var testColumn;
  var testRow;
  var testBox;
  for (var x = 0; x < 9; x++){
    testRow = testInArray(testNum, grid[row][x]);
    if (testRow != -1){
      testNum.splice(testRow,1);
    }
  }
  if (testNum.length == 1){
    return testNum[0];
  }
  for (var x = 0; x < 9; x++){
    testColumn = testInArray(testNum, grid[x][column]);
    if (testColumn != -1){
      testNum.splice(testColumn,1);
    }
  }
  if (testNum.length == 1){
    return testNum[0];
  }
  var zx;
  var zy;
  var testzx;
  var testxy = testInArray(testGrid, String(row) + String(column));
  textxy = Math.floor(testxy/9);
  for (var x = testxy * 9; x < (textxy + 1) * 9; x++){
    testzx = testGrid[x];
    zx = testzx.substr(0,1);
    zy = testzx.substr(1,1);
    testBox = testInArray(testNum, grid[zx][zy]);
    if (testBox != -1){
      testNum.splice(testBox,1);
    }
  }
  if (testNum.length == 1){
    return testNum[0];
  }
  else{
    return 0;
  }
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

function testInArray(list, num){
  for (var listTest = 0; listTest < list.length; listTest++){
    if (list[listTest] == num){
      return listTest;
    }
  }
  return -1;
}

function testForZeros(){
  var zeroList = [];
  for (var x = 0; x < 9; x++){
    for (var y = 0; y < 9; y++){
      if (grid[x][y] == 0){
        zeroList.push(String(x) + String(y));
      }
    }
  }
  return zeroList;
}

/*python code to generate testGrid:
for w in range(0,3):
	for x in range(0,3):
		for y in range(0,3):
			for z in range(0,3):
				bob = bob + ", \"" + str(w * 3 + y) + str(x * 3 + z) + "\""
*/
