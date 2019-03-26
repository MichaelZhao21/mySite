var triangle;

var Cases = {
  ASA: 0,
  AAS: 1,
  SSA: 2,
  SSS: 3,
  SAS: 4
}

function Triangle(a, b, c, angleA, angleB, angleC, htmlElements) {
  this.a = a;
  this.b = b;
  this.c = c;
  this.angleA = angleA;
  this.angleB = angleB;
  this.angleC = angleC;
  this.htmlElements = htmlElements;
  type = -1;
  this.secondTriangle = -1;
}

function setup() {
  var calculateButton = document.getElementById("calculate");
  calculateButton.addEventListener("click",function onEvent(event) {
    solveTriangle();
  });
}

function solveTriangle() {
  getTriangle();
  checkForRealTriangle();
  var orderedTriangleArray = getOrderedArrayFromTriangle();
  var triangleType = getTriangleType(orderedTriangleArray);
  getRestOfAngles();
}

function getTriangle() {
  var triangleNameList = ["a", "b", "c", "angleA", "angleB", "angleC"];
  var triangleElementsList = [];
  var triangleValueList = [];
  var retrievedValue;
  for (var x = 0; x < triangleNameList.length; x++) {
    triangleElementsList.push(document.getElementById(triangleNameList[x]));
    retrievedValue = triangleElementsList[x].value;
    triangleValueList.push(retrievedValue > 0 ? retrievedValue : 0);
  }
  triangle = makeTriangleFromMeasuresAndElements(triangleValueList, triangleElementsList);
}

function makeTriangleFromMeasuresAndElements(v, elements) {
  return new Triangle(v[0], v[1], v[2], v[3], v[4], v[5], elements);
}

function getOrderedArrayFromTriangle() {
  var output = [];
  output.push(triangle.angleA);
  output.push(triangle.b);
  output.push(triangle.angleC);
  output.push(triangle.a);
  output.push(triangle.angleB);
  output.push(triangle.c);
  return output;
}

function getTriangleType(triangleArray) {
  var caseList = [Cases.AAS, Cases.ASA, Cases.SAS, Cases.SSA, Cases.SSS];
  for (var i = 0; i < caseList.length; i++) {
    if (isTriangleType(triangleArray, caseList[i])) {
      return caseList[i];
    }
  }
}

function isTriangleType(triangleArray, currCase) {
  var testArr = getBitArrayFromTriangleArray(triangleArray);
  switch (currCase) {
    case Cases.SSS:
      return isTriangleSameCase(testArr, [0,1,0,1,0,1]);
      break;
    case Cases.SAS:
      if (isTriangleSameCase(testArr, [0,1,1,1,0,0]) ||
          isTriangleSameCase(testArr, [0,0,0,1,1,1]) ||
          isTriangleSameCase(testArr, [1,1,0,0,0,1])) {
        return true;
      }
      return false;
      break;
    case Cases.ASA:
      if (isTriangleSameCase(testArr, [1,1,1,0,0,0]) ||
          isTriangleSameCase(testArr, [0,0,1,1,1,0]) ||
          isTriangleSameCase(testArr, [1,0,0,0,1,1])) {
        return true;
      }
      return false;
      break;
    case Cases.AAS:
      if (isTriangleSameCase(testArr, [1,0,1,1,0,0]) ||
          isTriangleSameCase(testArr, [0,0,1,0,1,1]) ||
          isTriangleSameCase(testArr, [1,1,0,0,1,0])) {
        return true;
      }
      return false;
      break;
    case Cases.SSA:
      if (isTriangleSameCase(testArr, [0,1,0,1,1,0]) ||
          isTriangleSameCase(testArr, [1,0,0,1,0,1]) ||
          isTriangleSameCase(testArr, [0,1,1,0,0,1])) {
        return true;
      }
      return false;
      break;
    default:
      console.warn("isTriangleType(shiftedArray, case) Error: Invalid case");
      return false;
  }
}

function getBitArrayFromTriangleArray(triangleArray) {
  var output = [];
  for (var x = 0; x < triangleArray.length; x++) {
    output.push(triangleArray[x] > 0 ? 1 : 0);
  }
  return output;
}

function isTriangleSameCase(testArr, testCase) {
  if (testArr.length != testCase.length) {
    return false;
  }
  for (var x = 0; x < testArr.length; x++) {
    if (testCase[x] == 1 && testArr[x] != testCase[x]) {
      return false;
    }
  }
  return true;
}
