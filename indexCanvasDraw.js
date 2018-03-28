var player;
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
function initPlayer(){
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	ctx.fillStyle = "#FF0000";
	ctx.fillRect(100,50,10,10);
	player = [100,50];
}
function movePlayer(direction){
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	switch (direction){
		case ("up"):
			player[1] = player[1] - 10;
			break;
		case ("down"):
			player[1] = player[1] + 10;
			break;
		case ("left"):
			player[0] = player[0] - 10;
			break;
		default:
			player[0] = player[0] + 10;
	}
	if (player[0] < 0){
		player[0] = 0;
	}
	else if (player[0] > 190){
		player[0] = 190;
	}
	else if (player[1] < 0){
		player[1] = 0;
	}
	else if (player[1] > 90){
		player[1] = 90;
	}
	ctx.clearRect(0,0,200,100);
	ctx.fillRect(player[0],player[1],10,10);
}
