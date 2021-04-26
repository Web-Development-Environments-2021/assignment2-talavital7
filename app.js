var context;
var shape = new Object();
var board;
var score;
var pac_color = "yellow";
var pac_lives=5;
var pac_dir=4;
var pacman_remain = 1;
var start_time;
var time_elapsed;
var interval;
var ghost1 =new Object();
var ghost2 =new Object();
var ghost3 =new Object();
var ghost4 =new Object();
var num_of_ghosts=4;
var all_ghosts=[];
var special_food;
var special_clock; 
var food_color_5p="white";
var food_color_15p="green";
var food_color_25p="blue";
var food_remain;
var game_food;
var food_num_5p;
var food_num_15p;
var food_num_25p;
var up=38;
var down=40;
var left=37;
var right=39;

$(document).ready(function() {
	context = canvas.getContext("2d");
	Start();
});


function Start() {
	board = new Array();
	score = 0;
	var cnt = 100;
	food_remain = 50;
	game_food= food_remain
	ghost_left=num_of_ghosts
	food_num_5p=Math.round(food_remain*0.6);
	food_num_15p=Math.round(food_remain*0.3);
	food_num_25p=food_remain-(food_num_5p+food_num_15p);
	start_time = new Date();
	for(var g=0;g<num_of_ghosts;g++){
		if(g==0){
			ghost1.i=0;
			ghost1.j=0;
			ghost1.id=10;
			all_ghosts.push(ghost1);
			ghost1.color="green";


		}else if(g==1){
			ghost2.i=9;
			ghost2.j=0;
			ghost2.id=11;
			all_ghosts.push(ghost2);
			ghost2.color="pink";

		}else if(g==2){
			ghost3.i=9;
			ghost3.j=9;
			ghost3.id=12;
			all_ghosts.push(ghost3);
			ghost3.color="red";

		}else if(g==3){
			ghost4.i=0;
			ghost4.j=9;
			ghost1.id=13;
			all_ghosts.push(ghost4);
			ghost4.color="#07f3df";

		}
	}

	for (var i = 0; i < 10; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 10; j++) {
			if (
				(i == 4 && j == 1) ||
				(i == 2 && j == 1) ||
				(i == 1 && j == 2) ||
				(i == 1 && j == 1) ||
				(i == 8 && j == 4) ||
				(i == 8 && j == 3) ||
				(i == 5 && j == 6) ||
				(i == 5 && j == 7) ||
				(i == 5 && j == 8) ||
				(i == 4 && j == 8) ||
				(i == 1 && j == 7) ||
				(i == 1 && j == 8) ||
				(i == 2 && j == 8) ||
				(i == 8 && j == 8) ||
				(i == 8 && j == 7) ||
				(i == 3 && j == 3) ||
				(i == 3 && j == 4) ||
				(i == 3 && j == 5) ||
				(i == 6 && j == 1) ||
				(i == 7 && j == 1) ||
				(i == 6 && j == 2)
			) {
				board[i][j] = 4;
			} 
			else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt) {
					var RandomNumber = Math.random()*3;
					if(RandomNumber==1 && food_num_5p>0){
						food_num_5p--;
						food_remain--;
						board[i][j] = 5;
					}
					else if(RandomNumber==2 && food_num_15p>0){
						food_num_15p--;
						food_remain--;
						board[i][j] = 15;
					}
					else if(RandomNumber==3 && food_num_25p>0){
						food_num_25p--;
						food_remain--;
						board[i][j] = 25;
					}
				}
				else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
					if(!((i==0 && j==0) || (i==9 && j==0) || (i==0 && j==9) ||(i==9 && j==9))){
						shape.i = i;
						shape.j = j;
						pacman_remain--;
						board[i][j] = 2;
					}
				
				}
				if ((i==0 && j==0) || (i==9 && j==0) || (i==0 && j==9) ||(i==9 && j==9)) {
					
					board[i][j] = 66;
				}
				else {
					board[i][j] = 0;
				}
				cnt--;
			}
		}
	}
	if(pacman_remain!=0){
		var emptyCellPac=findRandomEmptyCell(board);
		board[emptyCellPac[0]][emptyCellPac[1]]=2;
		shape.i=emptyCellPac[0];
		shape.j=emptyCellPac[1];
		pacman_remain--;
	}
	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		var RandomNumber = Math.floor(Math.random() * 3) + 1;
		if(RandomNumber==1 && food_num_5p>0){
			food_num_5p--;
			
			board[emptyCell[0]][emptyCell[1]] = 5;
		}
		else if(RandomNumber==2 && food_num_15p>0){
			food_num_15p--;
			
			board[emptyCell[0]][emptyCell[1]] = 15;
		}
		else if(RandomNumber==3 && food_num_25p>0){
			food_num_25p--;
			
			board[emptyCell[0]][emptyCell[1]] = 25;
		}
		else if (food_num_5p>0){
			food_num_5p--;
			board[emptyCell[0]][emptyCell[1]] = 5;
		}
		else if (food_num_15p>0){
			food_num_15p--;
			board[emptyCell[0]][emptyCell[1]]=15;
		}
		else{
			food_num_25p--;
			board[emptyCell[0]][emptyCell[1]] = 25;
		}
		food_remain--;
	}

	
	keysDown = {};
	addEventListener(
		"keydown",
		function(e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	interval = setInterval(UpdatePosition, 250);
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 9 + 1);
	var j = Math.floor(Math.random() * 9 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 9 + 1);
		j = Math.floor(Math.random() * 9 + 1);
	}
	return [i, j];
}

function GetKeyPressed() {
	if (keysDown[up]) {
		return 1;
	}
	if (keysDown[down]) {
		return 2;
	}
	if (keysDown[left]) {
		return 3;
	}
	if (keysDown[right]) {
		return 4;
	}
}

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (board[i][j] == 2) {
				DraePac(center);
			} else if (board[i][j] == 5) {
				DrawBall(5, center);
				
			}else if (board[i][j] == 15) {
				DrawBall(15, center);
				
			}else if (board[i][j] == 25) {
				DrawBall(25, center);
				
			} else if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "red"; //color
				context.fill();
			}
			
		}
	}
	Draw_ghosts();

}

function Draw_ghosts(){
	for(var g=0;g<num_of_ghosts;g++){
		DrawGhost(all_ghosts[g])
	}
	
}

function DrawBall(type, center){
	context.beginPath();
	if(type ==5){
		context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
		context.fillStyle =food_color_5p; //color

	}else if(type ==15){
		context.arc(center.x, center.y, 12, 0, 2 * Math.PI); // circle
		context.fillStyle = food_color_15p; //color

	}else if(type == 25){
		context.arc(center.x, center.y, 8, 0, 2 * Math.PI); // circle
		context.fillStyle = food_color_25p; //color
	}
	context.fill();


}

function DraePac(center){
	if(pac_dir==1){
		context.beginPath();
		context.arc(center.x, center.y, 30, 1.65 * Math.PI, 1.35 * Math.PI); // half circle
		context.lineTo(center.x, center.y);
		context.fillStyle = pac_color; //color
		context.fill();
		context.beginPath();
		context.arc(center.x +15, center.y -5, 5, 0, 2 * Math.PI); // circle
		context.fillStyle = "black"; //color
		context.fill();

	}else if(pac_dir==2){
		context.beginPath();
		context.arc(center.x, center.y, 30, 0.65 * Math.PI, 0.3 * Math.PI); // half circle
		context.lineTo(center.x, center.y);
		context.fillStyle = pac_color; //color
		context.fill();
		context.beginPath();
		context.arc(center.x + 15, center.y - 5, 5, 0, 2 * Math.PI); // circle
		context.fillStyle = "black"; //color
		context.fill();

	}else if(pac_dir==3){
		context.beginPath();
		context.arc(center.x, center.y, 30, 1.15 * Math.PI, 0.85 * Math.PI); // half circle
		context.lineTo(center.x, center.y);
		context.fillStyle = pac_color; //color
		context.fill();
		context.beginPath();
		context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
		context.fillStyle = "black"; //color
		context.fill();

	}else if(pac_dir==4){//right
		context.beginPath();
		context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
		context.lineTo(center.x, center.y);
		context.fillStyle = pac_color; //color
		context.fill();
		context.beginPath();
		context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
		context.fillStyle = "black"; //color
		context.fill();
	}

}

function DrawGhost(g) {
	//ghost body
	cen=new Object();
	cen.i=g.i* 60 + 30;
	cen.j=g.j* 60 + 30;
	context.beginPath();
	context.fillStyle = g.color; //color
	context.arc(cen.i, cen.j, 20, Math.PI, 0, false);
	context.moveTo(cen.i-20, cen.j);
	context.lineTo(cen.i-20, cen.j+20);
	context.lineTo(cen.i-20+20/3, cen.j+20-20/4);
	context.lineTo(cen.i-20+20/3*2, cen.j+20);
	context.lineTo(cen.i, cen.j+20-20/4);
	context.lineTo(cen.i+20/3, cen.j+20);
	context.lineTo(cen.i+20/3*2, cen.j+20-20/4);
	context.lineTo(cen.i+20, cen.j+20);
	context.lineTo(cen.i+20, cen.j);
	context.fill();
	// EYES
	context.fillStyle = "white"; //left eye
	context.beginPath();
	context.arc(cen.i-20/2.5, cen.j-20/5, 20/3, 0, Math.PI*2, true); // white
	context.fill();

	context.fillStyle = "white"; //right eye
	context.beginPath();
	context.arc(cen.i+20/2.5, cen.j-20/5, 20/3, 0, Math.PI*2, true); // white
	context.fill();
	context.fillStyle="black"; //left eyeball
	context.beginPath();
	context.arc(cen.i-20/3, cen.j-20/5+20/6, 20/6, 0, Math.PI*2, true); //black
	context.fill();

	context.fillStyle="black"; //right eyeball
	context.beginPath();
	context.arc(cen.i+20/3, cen.j-20/5+20/6, 20/6, 0, Math.PI*2, true); //black
	context.fill();


}

function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			pac_dir=1;
			shape.j--;
		}
	}
	if (x == 2) {
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
			pac_dir=2;
			shape.j++;
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			pac_dir=3;
			shape.i--;
		}
	}
	if (x == 4) {
		if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
			pac_dir=4;
			shape.i++;
		}
	}
	if (board[shape.i][shape.j] == 5) {
		score+=5;
		game_food--;
	}
	if (board[shape.i][shape.j] == 15) {
		score+=15;
		game_food--;
	}
	if (board[shape.i][shape.j] == 25) {
		score+=25;
		game_food--;
	}
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 100;
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if (game_food==0) {
		window.clearInterval(interval);
		window.alert("Game completed");
	} else {
		Draw();
	}
}

