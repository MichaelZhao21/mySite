var fileNames = ["T2U","T2D","T4U","T4D","T8U","T8D","I0","I4U","I4D","I5U","I5D","I8U","I8D"];
var audio = [];
var mode = 0;
var currAudio;
var names = ["Unison","Perfect 4th UP","Perfect 4th DOWN","Perfect 5th UP","Perfect 5th DOWN","Octave UP","Octave DOWN"];

function setup() {
  getAudio();
  makeButtons(0);
}

function getAudio() {
  for (var i = 0; i < fileNames.length; i++) {
    audio.push(new Audio("audio/" + fileNames[i] + ".wav"));
  }
}

function makeButtons(choice) {
  var div = document.getElementById("answers");
  switch (choice) {
    case 0:
      div.innerHTML += "<button onclick='makeButtons(1)'>(1) Tuning Exercise</button>";
      div.innerHTML += "<button onclick='makeButtons(2)'>(2) Interval Recognition</button>";
      break;
    case 1:
      mode = 1;
      currAudio = randInt(0,6);
      playTemplate.innerHTML = "<button onclick='playAudio()'>(SPACE) Play Audio</button>";
      div.innerHTML = "<button onclick='answer(0)'>(1) Higher</button>";
      div.innerHTML += "<button onclick='answer(1)'>(2) Lower</button>";
      break;
    default:
      mode = 2;
      currAudio = randInt(0,7) + 6;
      playTemplate.innerHTML = "<button onclick='playAudio()'>(SPACE) Play Audio</button>";
      div.innerHTML = "";
      for (var x = 0; x < names.length; x++) {
        div.innerHTML += "<button onclick='answer(" + x + ")'>" + "(" + (x + 1) + ") " + names[x] + "</button>";
      }
  }
}

function playAudio() {
  audio[currAudio].play();
}

function answer(choice) {
  var div = document.getElementById("correct");
  if (mode == 1) {
    if (choice == currAudio % 2) {
      div.innerHTML = "Correct!";
    }
    else {
      div.innerHTML = "Wrong!";
    }
    currAudio = randInt(0,6);
  }
  else {
    if (choice == currAudio - 6) {
      div.innerHTML = "Correct!";
    }
    else {
      div.innerHTML = "Wrong! ";
      div.innerHTML += "Correct answer: " + names[currAudio - 6];
    }
    currAudio = randInt(0,7) + 6;
  }
  resetTime();
}

function resetTime() {
  setTimeout(function () {
    document.getElementById("correct").innerHTML = "";
  }, 2000);
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

document.addEventListener("keydown",function(event) {
  if (event.key == " " && mode != 0) {
    playAudio();
  }
  else {
    var key = parseInt(event.key);
    if (key < 8 && key > 0 && mode == 2) {
      answer(key - 1);
    }
    else if (key == 1 || key == 2) {
      if (mode == 0) {
        makeButtons(key);
      }
      else {
        answer(key - 1);
      }
    }
  }
});
