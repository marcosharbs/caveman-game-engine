
function DraggableComponent(){}

DraggableComponent.prototype = new Component();

DraggableComponent.prototype.dragging = false;

DraggableComponent.prototype.startX = 0;

DraggableComponent.prototype.startY = 0;

DraggableComponent.prototype.touchIdentifier = -1;

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
    this.touchIdentifier = -1;
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

DraggableComponent.prototype.onTouchStart = function(touchList, changedTouches){
  if(this.dragging == false){
    for(var i=0; i<changedTouches.length; i++){
      this.startDrag(changedTouches[i].pageX - Game.canvas.offsetLeft, 
                     changedTouches[i].pageY - Game.canvas.offsetTop);
      if(this.dragging == true){
        this.touchIdentifier = changedTouches[i].identifier;
        break;
      }
    } 
  }
}

DraggableComponent.prototype.onTouchMove = function(touchList, changedTouches){
  if(this.dragging == true){
    var touchIndex = 0;
    for(var i=0; i<changedTouches.length; i++){
      if(changedTouches[i].identifier == this.touchIdentifier){
        touchIndex = i;
        break;
      }
    }
    this.moveDrag(changedTouches[touchIndex].pageX - Game.canvas.offsetLeft, 
                  changedTouches[touchIndex].pageY - Game.canvas.offsetTop);
  }
}

DraggableComponent.prototype.onTouchEnd = function(touchList, changedTouches){
  if(this.dragging == true){
    for(var i=0; i<changedTouches.length; i++){
      if(changedTouches[i].identifier == this.touchIdentifier){
        this.endDrag();
        break;
      }
    }
  }
}

DraggableComponent.prototype.getSystems = function(){
  var systems = new Array();
  systems = ArrayUtils.addElement(systems, TouchSystem);
  systems = ArrayUtils.addElement(systems, MouseSystem);
  return systems;
}

DraggableComponent.prototype.getTag = function(){
  return "DRAGGABLE_COMPONENT";
}