var drawPhases = [
  ["|==|",
  "|",
  "|",
  "|",
  "="],
  ["|==|",
  "|  O",
  "|",
  "|",
  "="],
  ["|==|",
  "|  O",
  "|  |",
  "|",
  "="],
  ["|==|",
  "|  O",
  "| /|",
  "|",
  "="],
  ["|==|",
  "|  O",
  "| /|\\",
  "|",
  "="],
  ["|==|",
  "|  O ",
  "| /|\\",
  "| /",
  "="],
  ["|==|",
  "|  O",
  "| /|\\",
  "| / \\",
  "="],
];

var hangmanPhase;
var ansArray = [];
var correctAnswer = [];
const USER_ANS = 0;
const RAND_ANS = 1;

function setup() {
  $(".hangmanDrawing").html(arrToHTML(drawPhases[0]));
  hangmanPhase = 0;
  $(".guess").css("display", "none");
  $(":input[name='submitAnswer']").click(function (event) {
    startGame(USER_ANS);
  });
  $(":input[name='randomAnswer']").click(function (event) {
    startGame(RAND_ANS);
  });
}

function startGame(choice) {
  if (choice == USER_ANS) {
    correctAnswer = $(":input[name='inputAnswer']").val();
  }
  else {
    correctAnswer = pickRandomAnswerFromFile();
  }

  for (var x = 0; x < correctAnswerString.length; x++) {
    ansArray.push(correctAnswerString.substring(x, x + 1));
  }
  $(document).keydown(function (event) {
    if (event.originalEvent.key.match(/^[a-z]$/)) {
      makeGuess(event.originalEvent.key.toUpperCase());
    }
  });
  $(".guess").css("display", "block");
  $(".menu").css("display", "none");
  $(".guessLetters").html(lettersToSpaces());
}

function pickRandomAnswerFromFile() {
  
}

function makeGuess(key) {

}

function lettersToSpaces() {
  var output = ""
  for (var x = 0; x < ansArray.length; x++) {
    output += "_ ";
  }
  return output;
}

function incrementAndDrawHangman() {
  hangmanPhase++;
  $(".hangmanDrawing").html(arrToHTML(drawPhases[hangmanPhase]));
}

function arrToHTML(inputArr) {
  var output = "";
  inputArr.forEach(function(value, index, array) {
    output += value + "<br>"
  });
  return output;
}
