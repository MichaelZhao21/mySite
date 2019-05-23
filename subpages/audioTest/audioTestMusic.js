var fileNames = ["Blue Sky", "Fireball!", "Blue and Green Music", "Army of the Nile", "Winter on Emerald Bay", "Viva!", "El Palomino Noble", "Seis Manuel", "Carmina Burana", "The Melody Shop", "Equus", "Jupiter from the Planets"];
var audio = [];
var mode = 0;
var currAudio;
var names = ["Blue Sky - Owens", "Fireball! - Beck", "Blue and Green Music - Hazo", "Army of the Nile - Alford/Fennell", "Winter on Emerald Bay - Silva", "Viva! - Wilds", "El Palomino Noble - Compello", "Seis Manuel - Hanson", "Carmina Burana - Orff/Krance", "The Melody Shop - King/Glover", "Equus - Whitacre", "Jupiter from The Planets - Holst/Patterson"];

function setup() {
  getAudio();
  makeButtons();
}

function getAudio() {
  for (var i = 0; i < fileNames.length; i++) {
    audio.push(new Audio("audioMusic/" + fileNames[i] + ".mp3"));
  }
}

function makeButtons() {
  var div = document.getElementById("answers");
    currAudio = randInt(0, 12);
    playTemplate.innerHTML = "<button onclick='playAudio()'>(SPACE) Play Audio</button>";
    div.innerHTML = "";
    for (var x = 0; x < names.length; x++) {
      div.innerHTML += "<button onclick='answer(" + x + ")'>" + "(" + (x + 1) + ") " + names[x] + "</button>";
    }
}

function playAudio() {
  resetAudio();
  audio[currAudio].play();
}

function resetAudio() {
  audio[currAudio].pause();
  audio[currAudio].currentTime = 0;
}

function answer(choice) {
  var div = document.getElementById("correct");
  if (choice == currAudio) {
    div.innerHTML = "Correct!";
  }
  else {
    div.innerHTML = "Wrong! It's " + names[currAudio];
  }
  resetAudio();
  currAudio = randInt(0, 12);
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
  if (event.key == " ") {
    playAudio();
  }
  else if (event.key == "a") {
    audio[currAudio].pause();
  }
  else if (event.key == "s") {
    audio[currAudio].play();
  }
  var key = parseInt(event.key);
  if (key > 0 && key < 10) {
    answer(key - 1);
  }
  else if (key == 0) {
    answer(9);
  }
  else if (event.key == "-") {
    answer(10);
  }
  else if (event.key == "=") {
    answer(11);
  }
});
