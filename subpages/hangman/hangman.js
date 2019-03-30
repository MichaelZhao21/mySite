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

function setup() {
  $(".hangmanDrawing").html(arrToHTML(drawPhases[0]));
  hangmanPhase = -1;
  $(".hangmanDrawing").css("display", "none");
}

$(document).keydown(function (event) {
  incrementAndDrawHangman();
});

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
