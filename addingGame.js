var x = document.getElementById("answer");
var correct;

function check(){
	if (x.value == correct){
		document.getElementById("correct").innerHTML = "Correct!";
		window.setTimeout(function(){document.getElementById("correct").innerHTML = "";}, 1000);
	}else{
		document.getElementById("correct").innerHTML = x.value + " is wrong, " + correct + " is the right answer.";
		window.setTimeout(function(){document.getElementById("correct").innerHTML = "";}, 2000);
	}
	newQuestion();
	document.getElementById("answer").value = "";
}
function newQuestion(){
	var da = document.getElementById("d1").value;
	var db = document.getElementById("d2").value;
	var a = randomInt(Math.pow(10,da-1),Math.pow(10,da));
	var b = randomInt(Math.pow(10,db-1),Math.pow(10,db));
	correct = a + b;
	document.getElementById("question").innerHTML = String(a) + "+" + String(b);

}
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}
function start(){
	var db = document.getElementById("d1").value = 1;
	var da = document.getElementById("d2").value = 1;
	newQuestion();
}
function key(){
	y = document.getElementById("answer");
	y.addEventListener("keydown", function onEvent(event) {
		if (event.key == "Enter"){
			check();
		}
	});
}
key();
