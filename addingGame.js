var x = document.getElementById("answer");
var correct;
var score;

function check(){
	if (digitRight == 1){
		if (x.value == correct){
			scoreIncr();
			document.getElementById("correct").innerHTML = "Correct!";
			window.setTimeout(function(){document.getElementById("correct").innerHTML = "";}, 1000);
		}else{
			document.getElementById("correct").innerHTML = x.value + " is wrong, " + correct + " is the right answer.";
			window.setTimeout(function(){document.getElementById("correct").innerHTML = "";}, 2000);
		}
		newQuestion();
		document.getElementById("answer").value = "";
	}
}

function newQuestion(){
	var da = document.getElementById("d1").value;
	var db = document.getElementById("d2").value;
	var a = randomInt(Math.pow(10,da-1),Math.pow(10,da));
	var b = randomInt(Math.pow(10,db-1),Math.pow(10,db));
	correct = a + b;
	document.getElementById("question").innerHTML = String(a) + "+" + String(b);
	if (da > 10 || db > 10){
		document.getElementById("question").innerHTML = "Cannot add more than 10 digit numbers!"
		digitRight = 0;
	}
	else if (da < 1 || db < 1) {
		document.getElementById("question").innerHTML = "Cannot add numbers with negative number of digits!"
		digitRight = 0;
	}
	else{
		digitRight = 1;
	}
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

function start(){
	var db = document.getElementById("d1").value = 1;
	var da = document.getElementById("d2").value = 1;
	newQuestion();
	score = -1;
	scoreIncr();
	y = document.getElementById("answer");
	y.addEventListener("keydown", function onEvent(event) {
		if (event.key == "Enter" && y.value != ""){
			check();
		}
	});
}

function scoreIncr(){
	score++;
	document.getElementById("score").innerHTML = score;
}
