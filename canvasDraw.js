function line(){
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	ctx.moveTo(0, 0);
	ctx.lineTo(200, 100);
	ctx.stroke();
}
function clearCanvas(){
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	ctx.clearRect(0, 0, 200, 100);
}