var semCount = 0;
var tableHolder;
var changes;

var selectA = "\
<div>Class Type: <select class='sel";

var selectB = "'>\
  <option value='none'>None</option>\
  <option value='regs'>Regs</option>\
  <option value='honors'>Honors</option>\
  <option value='ap'>AP</option>\
</select></div>";

var inputA = "\
<div>\
Grade: \
<input value='0' style='width:90px' type='text' class='inp"

var inputB = "'></input>\
</div>";

function setUp() {
  tableHolder = document.getElementById("tableHolder");
  addSem();
}

function addSem() {
  var tab = "\
  <table class='sem' id='sem + " + (++semCount) + "'>\
  <tr><th colspan='2'><br><div style='text-align:center;font-size:20px'>Semester: " + semCount + "</p></th></tr>\
  <td colspan='2'><div style='text-align:center' id='gpa" + semCount + "'>GPA: 0</div><br></td></tr>";
  for (var x = 0; x < 7; x++) {
    tab += "<tr>\
    <td style='padding-right:10px;padding-bottom:10px'>" + (x + 1) + "</td>\
    <td>" + inputA + semCount + inputB + selectA + semCount + selectB + "</td>\
    </tr>";
  }
  tab += "</table>"
  tableHolder.innerHTML += tab;
  addListeners();
  changeGPA(document.getElementById("sel" + semCount, false));
}

function addListeners() {
  var selects = document.getElementsByTagName("select");
  var inputs = document.getElementsByTagName("input");

  for (var x = 7 * (semCount - 1); x < selects.length; x++) {
    selects[x].addEventListener("change", function() {
      changeGPA(event.target, false);
    });
  }
  for (var x = 7 * (semCount - 1); x < inputs.length; x++) {
    inputs[x].addEventListener("input", function() {
      changeGPA(event.target, true);
    });
  }
}

function changeGPA(tar, inp) {
  if (isNaN(tar.value) && inp) {
    console.error("Not a number!");
    return;
  }
  var semChanged = parseInt(tar.className.substring(tar.className.length - 1, tar.className.length));
  var selects = Array.from(document.getElementsByClassName("sel" + semChanged));
  var inputs = Array.from(document.getElementsByClassName("inp" + semChanged));
  var currSem = document.getElementById("gpa" + semChanged);
  var sum = 0;
  var testG;
  var finalGPA;
  for (var x = 0; x < 7; x++) {
    testG = getGPA(inputs[x].value,selects[x].value);
    if (testG != -1) {
      sum += testG;
    }
  }
  finalGPA = Number.parseFloat(sum / calcFilled(semChanged)).toFixed(6);
  currSem.innerHTML = "GPA: " + finalGPA;

  sum = 0;
  for (var x = 0; x < semCount; x++) {
    sum += document.getElementById("gpa" + semCount).innerHTML.substring(5);
  }
  finalGPA = Number.parseFloat(sum / semCount).toFixed(6);
  document.getElementById("totalGPA").innerHTML = "Total GPA: " + finalGPA;
}

function calcFilled(sem) {
  var sels = document.getElementsByClassName("sel" + sem);
  var sum = 0;
  for (var x = 0; x < 7; x++) {
    if (sels[x].value != "none") {
      sum++;
    }
  }
  return sum;
}

function getGPA(grade, level) {
  var less;
  switch (level) {
    case "none":
      return -1;
    case "regs":
      less = 1.0;
      break;
    case "honors":
      less = 0.5;
      break;
    default:
      less = 0.0;
  }

  if (grade >= 97) {
    return 5.0 - less;
  }
  else if (grade >= 93) {
    return 4.8 - less;
  }
  else if (grade >= 90) {
    return 4.6 - less;
  }
  else if (grade >= 87) {
    return 4.4 - less;
  }
  else if (grade >= 83) {
    return 4.2 - less;
  }
  else if (grade >= 80) {
    return 4.0 - less;
  }
  else if (grade >= 77) {
    return 3.8 - less;
  }
  else if (grade >= 73) {
    return 3.6 - less;
  }
  else if (grade >= 71) {
    return 3.4 - less;
  }
  else if (grade == 70) {
    return 3.0 - less;
  }
  else {
    return 0.0;
  }
}
