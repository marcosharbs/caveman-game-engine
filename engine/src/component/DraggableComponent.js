
function DraggableComponent(){}

DraggableComponent.prototype = new Component();

DraggableComponent.prototype.dragging = false;

DraggableComponent.prototype.startX = 0;

DraggableComponent.prototype.startY = 0;

DraggableComponent.prototype.startDrag = function(x, y){
	  var point = MouseSystem.getNormalizedCoordinate(x, y);

    x = point.x;
    y = point.y;

    this.startX = x;
    this.startY = y;

    var selected = layer.queryGameObjects(x, y, 2, 2, 20);

    var objectSelected = selected[0] || null;

    if(objectSelected != null &&
       objectSelected.id == this.owner.id){
    	this.dragging = true;
    }
}

DraggableComponent.prototype.moveDrag = function(x, y){
	if(this.dragging == true){
    	  var point = MouseSystem.getNormalizedCoordinate(x, y);

      	x = point.x;
      	y = point.y;

      	var dx = (x - this.startX);
      	var dy = (y - this.startY);

      	this.owner.addMove(dx, dy);  

      	this.startX = x;
      	this.startY = y;
    }
}

DraggableComponent.prototype.endDrag = function(){
	  this.startX = 0;
    this.startY = 0;
    this.dragging = false;
}

DraggableComponent.prototype.onMouseDown = function(x, y, wich){
	this.startDrag(x, y);
}

DraggableComponent.prototype.onMouseMove = function(x, y){
	this.moveDrag(x, y);
}

DraggableComponent.prototype.onMouseUp = function(x, y, wich){
	this.endDrag();
}

DraggableComponent.prototype.onTouchStart = function(touchList){
	this.startDrag(touchList[0].pageX, touchList[0].pageY);
}

DraggableComponent.prototype.onTouchMove = function(touchList){
	this.moveDrag(touchList[0].pageX, touchList[0].pageY);
}

DraggableComponent.prototype.onTouchEnd = function(touchList){
	this.endDrag();
}

DraggableComponent.prototype.getSystems = function(){
  var systems = new Array();
  systems = ArrayUtils.addElement(systems, TouchSystem.getTag());
  systems = ArrayUtils.addElement(systems, MouseSystem.getTag());
  return systems;
}

DraggableComponent.prototype.getTag = function(){
  return "DRAGGABLE_COMPONENT";
}