
var canvas = document.getElementById("snakeboard");
var ctx = canvas.getContext("2d");

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
	this.totalLinearSegments = this.sizeOfCanvas/this.sizeSegment;
	this.positions = [[5,5],[4,5],[3,5],[2,5]];
	this.move = function (direction) {
		var storePosition = this.positions.slice(0);
		// console.log(storePosition);
		if (direction==this.oppositeHead[this.head]) {

		} else {
			if (direction==="right") {
				this.positions[0] = [this.positions[0][0]+1,this.positions[0][1]];	
			} else if (direction==="left") {
				this.positions[0] = [this.positions[0][0]-1,this.positions[0][1]];	
			} else if (direction==="up") {
				this.positions[0] = [this.positions[0][0],this.positions[0][1]-1];	
			} else if (direction==="down") {
				this.positions[0] = [this.positions[0][0],this.positions[0][1]+1];
			};

			console.log("smth"+this.totalLinearSegments);
			if (this.positions[0][0]<0 || this.positions[0][1]<0 || this.positions[0][0]===this.totalLinearSegments || this.positions[0][1]===this.totalLinearSegments) {
				alert("dead by strike border");
			} else if (contains(storePosition,this.positions[0])) {
				/*console.log(this.positions[0]);
				console.log(storePosition);*/
				alert("dead by own");
				// alert("is inside");
			};
			
			for (var i = 1; i < this.positions.length; i++) {
				this.positions[i] = storePosition[i-1];
			};
			ctx.clearRect(0,0,this.width,this.height);
			ctx.width= this.width;
			ctx.height = this.height;
			this.createSnake();
			this.head = direction;
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
		};
	}
}

var snake1 = new snake();
snake1.createSnake();

function contains(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i][0] === obj[0] && a[i][1]=== obj[1]) {
            return true;
        }
    }
    return false;
}


/*
* keyCode = 37 // left arrow
* keyCode = 38 // up arrow
* keyCode = 39 // right arrow
* keyCode = 40 // down arrow
*/

$(document).keypress(function (event) {
	if (event.keyCode===37) {
		snake1.move("left");
	} else if (event.keyCode===38) {
		snake1.move("up");
	} else if (event.keyCode===39) {
		snake1.move("right");
	} else if (event.keyCode===40) {
		snake1.move("down");
	}
})