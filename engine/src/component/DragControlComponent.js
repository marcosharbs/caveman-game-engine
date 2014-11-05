function DragControlComponent(){}

DragControlComponent.prototype = new Component();

DragControlComponent.prototype.selectedArray = {};

DragControlComponent.prototype.startX = {};

DragControlComponent.prototype.startY = {};

JSUtils.addMethod(DragControlComponent.prototype, "initialize", 
	function(onDropListener){
		this.initialize();
		this.onDropListener = onDropListener;
		return this;
	}
);

DragControlComponent.prototype.startDrag = function(x, y, identifier){
	var point = MouseSystem.getNormalizedCoordinate(x, y);

    x = point.x;
    y = point.y;

    var selected = this.owner.queryGameObjects(x, y, 2, 2, 20);

    var selectedGameObject = selected[0] || null;

    if(selectedGameObject != null && 
       ComponentUtils.getComponent(selectedGameObject, "DRAGGABLE_COMPONENT") &&
       ComponentUtils.getComponent(selectedGameObject, "DRAGGABLE_COMPONENT").canDrag == true){

    	this.startX[identifier] = x;
    	this.startY[identifier] = y;
    	this.selectedArray[identifier] = selectedGameObject;
    }
}

DragControlComponent.prototype.moveDrag = function(x, y, identifier){
	if(this.selectedArray[identifier] && this.selectedArray[identifier] != null){
    	var point = MouseSystem.getNormalizedCoordinate(x, y);

      	x = point.x;
      	y = point.y;

      	var dx = (x - this.startX[identifier]);
      	var dy = (y - this.startY[identifier]);

      	this.selectedArray[identifier].addMove(dx, dy);  

      	this.startX[identifier] = x;
      	this.startY[identifier] = y;
    }
}

DragControlComponent.prototype.endDrag = function(identifier){
	if(this.selectedArray[identifier] && 
	   this.selectedArray[identifier] != null &&
	    this.onDropListener){

		this.onDropListener["onDropGameObject"].apply(this.onDropListener, [this.selectedArray[identifier]]);
	}
	delete this.startX[identifier];
    delete this.startY[identifier];
    delete this.selectedArray[identifier];
}

DragControlComponent.prototype.onMouseDown = function(x, y, wich){
	this.startDrag(x, y, "MOUSE_DRAG");
}

DragControlComponent.prototype.onMouseMove = function(x, y){
	this.moveDrag(x, y, "MOUSE_DRAG");
}

DragControlComponent.prototype.onMouseUp = function(x, y, wich){
	this.endDrag("MOUSE_DRAG");
}

DragControlComponent.prototype.onTouchStart = function(touchList, changedTouches){
   for(var i=0; i<changedTouches.length; i++){
      this.startDrag(changedTouches[i].pageX - Game.canvas.offsetLeft, 
                     changedTouches[i].pageY - Game.canvas.offsetTop,
                     changedTouches[i].identifier);
   } 
}

DragControlComponent.prototype.onTouchMove = function(touchList, changedTouches){
	for(var i=0; i<changedTouches.length; i++){
      this.moveDrag(changedTouches[i].pageX - Game.canvas.offsetLeft, 
                    changedTouches[i].pageY - Game.canvas.offsetTop,
                    changedTouches[i].identifier);
    }
}

DragControlComponent.prototype.onTouchEnd = function(touchList, changedTouches){
	for(var i=0; i<changedTouches.length; i++){
		this.endDrag(changedTouches[i].identifier);
    }
}

DragControlComponent.prototype.getSystems = function(){
  var systems = new Array();
  systems = ArrayUtils.addElement(systems, TouchSystem);
  systems = ArrayUtils.addElement(systems, MouseSystem);
  return systems;
}

DragControlComponent.prototype.getTag = function(){
  return "DRAG_CONTROL_COMPONENT";
}