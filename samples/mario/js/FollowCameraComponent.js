function FollowCameraComponent(){}

FollowCameraComponent.prototype = new Component();

FollowCameraComponent.prototype.onUpdate = function(delta){
    Game.camera.centerPoint.x = this.owner.getCenterX();
}

FollowCameraComponent.prototype.getSystems = function(){
  var systems = new Array();
  systems = ArrayUtils.addElement(systems, LogicSystem.getTag());
  return systems;
}

FollowCameraComponent.prototype.getTag = function(){
  return "FOLLOW_CAMERA_COMPONENT";
}