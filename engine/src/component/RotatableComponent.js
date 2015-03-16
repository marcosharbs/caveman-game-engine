function RotatableComponent(){}

RotatableComponent.prototype = new Component();

RotatableComponent.prototype.fX = null;
RotatableComponent.prototype.fY = null;
RotatableComponent.prototype.sX = null;
RotatableComponent.prototype.sY = null;
RotatableComponent.prototype.initAngle = 0;
RotatableComponent.prototype.touchCount = 0;
RotatableComponent.prototype.rotating = false;

RotatableComponent.prototype.onKeyDown = function(keyCode){
    if(keyCode == 39){
      if(this.rotating == true){
        var rotate = ComponentUtils.getComponent(this.owner, "ROTATE_COMPONENT");
        var angle = rotate.getAngle() + (1/60);
        rotate.setRotate(angle);
      }
    }else if(keyCode == 37){
      if(this.rotating == true){
        var rotate = ComponentUtils.getComponent(this.owner, "ROTATE_COMPONENT");
        var angle = rotate.getAngle() - (1/60);
        rotate.setRotate(angle);
      }
    }
 }

RotatableComponent.prototype.onMouseDown = function(x, y, wich){
    var point = MouseSystem.getNormalizedCoordinate(x, y);
    x = point.x;
    y = point.y;

    var selected = layer.queryGameObjects(x, y, 2, 2, 20);
    var selectedPiece = selected[0] || null;

    if(selectedPiece != null &&
       selectedPiece.id == this.owner.id){
      this.rotating = true;
    }
}

RotatableComponent.prototype.onMouseUp = function(x, y, wich){
	this.rotating = false;
}

RotatableComponent.prototype.onTouchStart = function(touchList){
	if(this.touchCount ==  0){
        this.touchCount++;
	}else if(this.touchCount == 1 && touchList.length == 2){
		var fPoint = MouseSystem.getNormalizedCoordinate(touchList[0].pageX, touchList[0].pageY);
		var sPoint = MouseSystem.getNormalizedCoordinate(touchList[1].pageX, touchList[1].pageY);
		
		var fSelected = layer.queryGameObjects(fPoint.x, fPoint.y, 2, 2, 20);
		var fObjSelected = fSelected[0] || null;
		var sSelected = layer.queryGameObjects(sPoint.x, sPoint.y, 2, 2, 20);
		var sObjSelected = sSelected[0] || null;


		if((fObjSelected != null && fObjSelected.id == this.owner.id) ||
		   (sObjSelected != null && sObjSelected.id == this.owner.id)) {
			this.sX = fPoint.x;
	        this.sY = fPoint.y;
			this.fX = sPoint.x;
	        this.fY = sPoint.y;
	    	this.touchCount++;
	    	var rotateComp = ComponentUtils.getComponent(this.owner, "ROTATE_COMPONENT");
	    	this.initAngle = rotateComp.getAngle();
		}else{
			this.touchCount = 0;
		}
	}
}

RotatableComponent.prototype.onTouchMove = function(touchList, changedTouches){
	if(this.touchCount == 2 && touchList.length == 2){
		var dragComp = ComponentUtils.getComponent(this.owner.layer, "DRAG_CONTROL_COMPONENT");
		if(dragComp != null){
			for(var i=0; i<changedTouches.length; i++){
				dragComp.endDrag(changedTouches[i].identifier);
			}
		}

		var fPoint = MouseSystem.getNormalizedCoordinate(touchList[0].pageX, touchList[0].pageY);
		var sPoint = MouseSystem.getNormalizedCoordinate(touchList[1].pageX, touchList[1].pageY);
		
		var nfX = fPoint.x; 
		var nfY = fPoint.y;
		var nsX = sPoint.x; 
		var nsY = sPoint.y;
		
		var angle = this.getAngleBetweenLines(this.fX, this.fY, this.sX, this.sY, nfX, nfY, nsX, nsY);
		var rotateComp = ComponentUtils.getComponent(this.owner, "ROTATE_COMPONENT");
        
        if(angle > 0){
        	angle -=  Math.PI;
        }else if(angle < 0){
			angle +=  Math.PI;
        }

        rotateComp.setRotate(angle + this.initAngle);
	}
}

RotatableComponent.prototype.getAngleBetweenLines = function(fX, fY, sX, sY, nfX, nfY, nsX, nsY){
	var angle1 = Math.atan2( (fY - sY), (fX - sX) );
    var angle2 = Math.atan2( (nfY - nsY), (nfX - nsX) );

    var angle = (this.toDegrees(angle1 - angle2)) % 360;

    if (angle < -180) {
    	angle += 360;
    }
    if (angle > 180) {
    	angle -= 360;	
    }

    return this.toRadians(angle) * -1;
}

RotatableComponent.prototype.toDegrees = function(rad) {
	return rad*(180/Math.PI);
}

RotatableComponent.prototype.toRadians = function(deg) {
	return deg * (Math.PI/180);
}

RotatableComponent.prototype.onTouchEnd = function(touchList){
	if(this.touchCount > 0){
		this.touchCount--;
	}
}

RotatableComponent.prototype.getSystems = function(){
  var systems = new Array();
  systems = ArrayUtils.addElement(systems, TouchSystem);
  systems = ArrayUtils.addElement(systems, MouseSystem);
  systems = ArrayUtils.addElement(systems, KeySystem);
  return systems;
}

RotatableComponent.prototype.getTag = function(){
  return "ROTATABLE_COMPONENT";
}