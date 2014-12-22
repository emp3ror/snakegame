
var canvas = document.getElementById("snakeboard");
var ctx = canvas.getContext("2d");
var regularMove;

var score=0,lastScore=0; //store score

var snake = function () {
	this.sizeSegment = 10;
	this.startSegments = 4;
	this.head = "right";
	this.oppositeHead = {
		right : "left",
		left : "right",
		up : "down",
		down : "up",
	};
	this.width = 500;
	this.height = 500;
	this.sizeOfCanvas = 500;
	this.snakeMovementTime = 100; //millisecond
	this.interrupt = true; //interrupt to start and stop loop
	this.totalLinearSegments = this.sizeOfCanvas/this.sizeSegment;
	this.initialPostions = [[5,5],[4,5],[3,5],[2,5]];
	this.positions = [[5,5],[4,5],[3,5],[2,5]];
	this.foodCoordinates = []; //food coordinates initialization
	this.foodAte = false; //to add tail for snake

	this.resetSnake = function () {
		clearInterval(regularMove);
		this.positions.slice(0,0);
		this.positions = this.initialPostions.slice(0);
		// console.log(this.initialPostions);
		// console.log("positions "+this.postions);
		ctx.clearRect(0,0,this.width,this.height);
			ctx.width= this.width;
			ctx.height = this.height;
			this.createSnake();

		lastScore = score;
		score = 0;
		showLastScore();
	}

	this.move = function (direction) {
		var storePosition = this.positions.slice(0);
		// console.log(storePosition);
		if (typeof direction === "undefined") {
			direction = this.head;
		} else {
			this.interrupt = true;
		}

		if (direction==this.oppositeHead[this.head]) {

		} else {
			if (direction==="right") {var storePosition = this.positions.slice(0);
				this.positions[0] = [this.positions[0][0]+1,this.positions[0][1]];	
			} else if (direction==="left") {
				this.positions[0] = [this.positions[0][0]-1,this.positions[0][1]];	
			} else if (direction==="up") {
				this.positions[0] = [this.positions[0][0],this.positions[0][1]-1];	
			} else if (direction==="down") {
				this.positions[0] = [this.positions[0][0],this.positions[0][1]+1];
			};

			// console.log("regularMove"+this.totalLinearSegments);
			if (this.positions[0][0]<0 || this.positions[0][1]<0 || this.positions[0][0]===this.totalLinearSegments || this.positions[0][1]===this.totalLinearSegments) {
				// alert("dead by strike border");
				this.resetSnake();

			} else if (contains(storePosition,this.positions[0])) {
				/*console.log(this.positions[0]);
				console.log(storePosition);*/
				// alert("dead by own");
				this.resetSnake();
				// alert("is inside");
			} else {
				for (var i = 1; i < this.positions.length; i++) {
					this.positions[i] = storePosition[i-1];
				};
				ctx.clearRect(0,0,this.width,this.height);
				ctx.width= this.width;
				ctx.height = this.height;
				this.createSnake();
				this.head = direction;
				if (this.interrupt===true) {
					this.interrupt=false;
				// this.regularMove(this.snakeMovementTime);
				};

				if (this.foodAte) {
					this.positions.push(this.foodCoordinates);
					this.foodAte = false;
				}
			}
			
			
			
		}
	};
	this.createSnake = function () {
		for (var i = 0; i < this.positions.length; i++) {
			// this.positions[i]
			// console.log(this.positions);
			ctx.save();
				ctx.fillStyle = "#009900";
				x = this.positions[i][0]*this.sizeSegment;
				y = this.positions[i][1]*this.sizeSegment;
				ctx.fillRect(x,y, this.sizeSegment,this.sizeSegment);
				ctx.strokeStyle = "#fff";
				ctx.lineWidth   = 1;
				ctx.strokeRect(x,y, this.sizeSegment,this.sizeSegment);
			ctx.restore();

			// this.createFood();

		};

		this.foodProcess();
	};

	/*method for food
	*/
	this.newFood = function () {
		this.foodCoordinates = generateRandom(this.totalLinearSegments-1,this.totalLinearSegments-1,this.positions);
		// console.log(this.foodCoordinates);
		this.createFood();
	};

	this.createFood = function () {
		ctx.save();
			ctx.fillStyle = "#EA198C";
			var x = this.foodCoordinates[0]*this.sizeSegment;
			var y = this.foodCoordinates[1]*this.sizeSegment;
			// console.log(x+" "+y);
			ctx.fillRect(x,y, this.sizeSegment,this.sizeSegment);
			ctx.strokeStyle = "#fff";
			ctx.lineWidth   = 1;
			ctx.strokeRect(x,y, this.sizeSegment,this.sizeSegment);
		ctx.restore();
	}

	this.eatingFood = function () {
		console.log("eatingFood");
		console.log(this.positions);
		console.log(this.foodCoordinates);
		return contains(this.positions, this.foodCoordinates);
	}

	this.foodProcess = function () {
		// console.log(this.foodCoordinates.length);
		if (this.foodCoordinates.length<=0) {
			this.newFood();
		} else {
				
			if (this.eatingFood()==true) {
				var len = this.positions.length;
				var lastSegment = this.positions[len-1];
				if (lastSegment[0]===this.foodCoordinates[0] && lastSegment[1]===this.foodCoordinates[1] ) {
					this.foodAte = true;
					this.newFood();
					scoreUp();
				};
				
				console.log("foodProcess1");
			} else {
				this.createFood();
			}
		}
	}

}

/*generates the random coordinates which is not in the segments of snake (arraySeg) and within x and y*/
function generateRandom (totalX,totalY,arraySeg) {
	var minRange = 0; //min x or y , 
	var rndX = Math.floor((Math.random()*(totalX-minRange+ 1)))+minRange;
	var rndY = Math.floor((Math.random()*(totalY-minRange+ 1)))+minRange;
	if (contains(arraySeg,[rndX,rndY])) {
		generateRandom(totalX,totalY,arraySeg); //google recursion :P
	} else {
		return [rndX,rndY];
	}
}




var snake1 = new snake();
snake1.createSnake();
// snake1.newFood();


function contains(totalArray, hasIt) {
    for (var i = 0; i < totalArray.length; i++) {
        if (totalArray[i][0] === hasIt[0] && totalArray[i][1]=== hasIt[1]) {
            return true;
        }
    }
    return false;
}

function scoreUp () {
	score++;
	var addup = score*10;
	var text = "score "+addup;
	$(".sidebar .score").text(text);
}

function showLastScore () {
	var score = lastScore*10;
	var text = "score "+score;
	$(".sidebar .lastScore").text(text);
	$(".sidebar .msg").show();
}

/*
* keyCode = 37 // left arrow
* keyCode = 38 // up arrow
* keyCode = 39 // right arrow
* keyCode = 40 // down arrow
* charCode = 97 // letter A
* charCode = 115 // letter s
* charCode = 100 // letter d
* charCode = 119 // letter w
*/

$(document).keypress(function (event) {
	// console.log(event.charCode);
	clearInterval(regularMove);
	if (event.keyCode===37 || event.charCode===97) {
		
		regularMove = setInterval(function () {
			snake1.move("left");
		},snake1.snakeMovementTime);
	} else if (event.keyCode===38 || event.charCode===119) {
		// snake1.move("up");
		regularMove = setInterval(function () {
			snake1.move("up");
	},snake1.snakeMovementTime);
	} else if (event.keyCode===39 || event.charCode===100) {
		// snake1.move("right");
		regularMove = setInterval(function () {
			snake1.move("right");
	},snake1.snakeMovementTime);
	} else if (event.keyCode===40 || event.charCode===115) {
		// snake1.move("down");
		regularMove = setInterval(function () {
			snake1.move("down");
	},snake1.snakeMovementTime);
	}

})