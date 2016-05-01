function step(world){
	eachCellDo(world, function(cell){
		var newState = calculateNewState(cell, world);
		cell.state = newState;
	});
	eachCellDo(world, function(cell){
		if(cell.state == 'dying'){cell.state='dead'}
		if(cell.state == 'born'){cell.state='alive'}
	});
	redrawWorld(world);
}

function getLivingNeighbours(cell, world){
	var x = cell.x;
	var y = cell.y;
	var neighbours = [];
	neighbours.push(getCell(world,x-1,y));
	neighbours.push(getCell(world,x+1,y));
	neighbours.push(getCell(world,x,y-1));
	neighbours.push(getCell(world,x,y+1));
	neighbours.push(getCell(world,x-1,y-1));
	neighbours.push(getCell(world,x+1,y-1));
	neighbours.push(getCell(world,x-1,y+1));
	neighbours.push(getCell(world,x+1,y+1));
	return neighbours.filter(identity).filter(function(x){return x.state=='alive' || x.state=='dying'});
}

function identity(i){
	return i;
}

function calculateNewState(cell, world){
	var neighbours = getLivingNeighbours(cell, world);
	var currentState = cell.state;
	switch(neighbours.length){
		case 0:if(currentState=='alive') {return 'dying';}  else {return 'dead';}
		case 1:if(currentState=='alive') {return 'dying';}  else {return 'dead';}
		case 2:if(currentState=='alive') {return 'alive';}  else {return 'dead';}
		case 3:if(currentState=='alive') {return 'alive';}  else {return 'born';}
		case 4:if(currentState=='alive') {return 'dying';}  else {return 'dead';}
		case 5:if(currentState=='alive') {return 'dying';}  else {return 'dead';}
		case 6:if(currentState=='alive') {return 'dying';}  else {return 'dead';}
		case 7:if(currentState=='alive') {return 'dying';}  else {return 'dead';}
		case 8:if(currentState=='alive') {return 'dying';}  else {return 'dead';}
	}
}

function getCell(world, x, y){
	if(positionWithinBound(world, x, y)){
		return world.cells[x][y];
	} else {
		return null;
	}
}

function positionWithinBound(world, x, y){
	return (x in world.cells) && (y in world.cells[x]);
}

function toggleLife(world, position){
	var cell = getCell(world, position.x, position.y);
	if(cell.state=='dead'){
		cell.state='alive';
	} else {
		cell.state='dead';
	}
	return cell;
}

function getCellsForState(world, state){
	var cells = flattenWorld(world);
	return cells.filter(function(x){return x.state==state});
}

function flattenWorld(world){
	return [].concat.apply([], world.cells);
}