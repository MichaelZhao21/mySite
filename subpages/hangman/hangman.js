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

function setup() {
  $(".hangmanDrawing").html(arrToHTML(drawPhases[0]));
  hangmanPhase = 0;
  $(".guess").css("display", "none");
  $(":input[name='submitAnswer']").click(function (event) {
    startGame();
  });
  $(":input[name='randomAnswer']")
}

function startGame() {
  var correctAnswerString = $(":input[name='inputAnswer']").val();
  for (var x = 0; x < correctAnswerString.length; x++) {
    ansArray.push(correctAnswerString.substring(x, x + 1));
  }
  $(document).keydown(function (event) {
    if (event.originalEvent.key.match(/^[a-z]$/)) {
      console.log(event.originalEvent.key.toUpperCase());
    }
  });
  $(".guess").css("display", "block");
  $(".menu").css("display", "none");
  $(".guessLetters").html(lettersToSpaces());
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
