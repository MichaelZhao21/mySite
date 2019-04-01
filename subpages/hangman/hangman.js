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
    console.log(ansArray);
}

// $(document).keydown(function (event) {
//   incrementAndDrawHangman();
// });

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
