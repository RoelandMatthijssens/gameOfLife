function getMousePosition(canvas, event){
	var bounds = canvas.getBoundingClientRect();
	return {
		x: event.clientX - bounds.left,
		y: event.clientY - bounds.top
	}
}

function drawPixelOnPosition(world, position, color){
	var context = world.canvas.getContext("2d");
	context.fillStyle = color;
	var cellSize = world.cellSize;
	var x = position.x*cellSize;
	var y = position.y*cellSize;
	context.fillRect(x, y, cellSize, cellSize);
}

function bindWorldClick(world){
	var canvas = world.canvas;
	canvas.addEventListener("click", function(event){
		var mousePosition = getMousePosition(canvas, event);
		var cellPosition = convertPositionToCellPosition(mousePosition, world);
		var cell = toggleLife(world, cellPosition);
		var color = cell.state == 'alive' ? world.cellColor : world.backgroundColor;
		drawPixelOnPosition(world, cellPosition, color);
	});
}

function redrawWorld(world){
	eachCellDo(world, function(cell){
		if(cell.state == 'alive'){
			drawPixelOnPosition(world, cell, world.cellColor);
		} else {
			drawPixelOnPosition(world, cell, world.backgroundColor);
		}
	});
}

function convertPositionToCellPosition(mousePosition, world){
	var x = Math.floor(mousePosition.x/world.cellSize);
	var y = Math.floor(mousePosition.y/world.cellSize);
	return {x:x,y:y};
}

function bindStepButton(button, world){
	button.onclick = function(){step(world)};
}

function bindPlayButton(button, world){
	button.onclick = function(){
		world.state = 'running';
		setInterval(function() {
			if(world.state == 'running'){
				step(world);
			}
		}, 0);
	};
}
function bindPauseButton(button, world){
	button.onclick = function(){
		world.state = 'paused';
	};
}

function startGame(worldSize, pixelSize){
	var canvas = document.getElementById("world");
	world = createWorld(worldSize, canvas, pixelSize);
	var stepButton = document.getElementById("stepButton");
	var pauseButton = document.getElementById("pauseButton");
	var playButton = document.getElementById("playButton");
	stretchCanvas(world);
	bindWorldClick(world);
	bindStepButton(stepButton, world);
	bindPauseButton(pauseButton, world);
	bindPlayButton(playButton, world);
}

function createWorld(worldSize, canvas, cellSize){
	var world = {
		cells:[],
		canvas:canvas,
		worldSize:worldSize,
		cellSize:cellSize,
		cellColor:"#000000",
		backgroundColor:"#FFFFFF"
	};
	function newCell(x,y){
		return {
			state: 'dead',
			age: 0,
			x:x,
			y:y
		}
	}
	for(i=0;i<=world.worldSize; i++){
		row = [];
		for(j=0;j<=world.worldSize;j++){
			row[j] = newCell(i,j);
		}
		world.cells[i] = row;
	}
	return world;
}

function stretchCanvas(world){
	world.canvas.width = world.worldSize*world.cellSize;
	world.canvas.height = world.worldSize*world.cellSize;
}

function eachCellDo(world, funct){
	var cells = flattenWorld(world);
	for(i in cells){
		funct(cells[i]);
	}
}