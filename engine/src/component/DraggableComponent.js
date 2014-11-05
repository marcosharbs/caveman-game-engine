
function DraggableComponent(){}

DraggableComponent.prototype = new Component();

DraggableComponent.prototype.canDrag = true;

DraggableComponent.prototype.getSystems = function(){
  var systems = new Array();
  return systems;
}

DraggableComponent.prototype.getTag = function(){
  return "DRAGGABLE_COMPONENT";
}