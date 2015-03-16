function MarioMoveComponent(){}

MarioMoveComponent.prototype = new Component();

MarioMoveComponent.prototype.animationType = "FRENTE";

MarioMoveComponent.prototype.leftPressed = false;
MarioMoveComponent.prototype.rightPressed = false;

MarioMoveComponent.prototype.getSystems = function(){
	var systems = new Array();
	systems = ArrayUtils.addElement(systems, LogicSystem);
        systems = ArrayUtils.addElement(systems, KeySystem);
	return systems;
}

MarioMoveComponent.prototype.onCollide = function(otherGameObject){

}

MarioMoveComponent.prototype.onKeyDown = function(keyCode){
  if(keyCode == 38){
    this.owner.setLinearVelocityY(-500);
  }else if(keyCode == 37){
     this.leftPressed = true;
  }else if(keyCode == 39){
      this.rightPressed = true;
  }
}

MarioMoveComponent.prototype.onKeyUp = function(keyCode){
  if(keyCode == 38){
     this.owner.setLinearVelocityY(0);
  }else if(keyCode == 37){
      this.leftPressed = false;
     this.owner.setLinearVelocityX(0);
      this.animationType = "FRENTE";
      ComponentUtils.getComponent(this.owner,                    "ANIMATION_RENDER_COMPONENT").play("HORIZONTAL",
                                                                                 0,
                                                                                 5,
                                                                                 5,
                                                                                 -1,
                                                                                 150);
  }else if(keyCode == 39){
      this.rightPressed = false;
      this.owner.setLinearVelocityX(0);
      this.animationType = "FRENTE";
      ComponentUtils.getComponent(this.owner, "ANIMATION_RENDER_COMPONENT").play("HORIZONTAL",
                                                                                 0,
                                                                                 5,
                                                                                 5,
                                                                                 -1,
                                                                                 150);
  }
}

MarioMoveComponent.prototype.onButtonPressed = function(button){
  if(button == "button-1"){
    this.owner.setLinearVelocityY(-500);
  }else if(button == "button-dpad-left"){
     this.leftPressed = true;
  }else if(button == "button-dpad-right"){
      this.rightPressed = true;
  }
}

MarioMoveComponent.prototype.onButtonReleased = function(button){
   if(button == "button-1"){
     this.owner.setLinearVelocityY(0);
  }else if(button == "button-dpad-left"){
      this.leftPressed = false;
     this.owner.setLinearVelocityX(0);
      this.animationType = "FRENTE";
      ComponentUtils.getComponent(this.owner,                    "ANIMATION_RENDER_COMPONENT").play("HORIZONTAL",
                                                                                 0,
                                                                                 5,
                                                                                 5,
                                                                                 -1,
                                                                                 150);
  }else if(button == "button-dpad-right"){
      this.rightPressed = false;
      this.owner.setLinearVelocityX(0);
      this.animationType = "FRENTE";
      ComponentUtils.getComponent(this.owner, "ANIMATION_RENDER_COMPONENT").play("HORIZONTAL",
                                                                                 0,
                                                                                 5,
                                                                                 5,
                                                                                 -1,
                                                                                 150);
  }
}

MarioMoveComponent.prototype.onUpdate = function(delta){
  if(this.leftPressed){
     this.owner.setLinearVelocityX(-150);
      var anim = ComponentUtils.getComponent(this.owner, "ANIMATION_RENDER_COMPONENT");
      if(this.animationType != "ESQUERDA"){
        this.animationType = "ESQUERDA";
        anim.play("HORIZONTAL",0,0,4,-1,50);
      }
  }else if(this.rightPressed){
      this.owner.setLinearVelocityX(150);
      var anim = ComponentUtils.getComponent(this.owner, "ANIMATION_RENDER_COMPONENT");
      if(this.animationType != "DIREITA"){
        this.animationType = "DIREITA";
        anim.play("HORIZONTAL",0,7,11,-1,50);
      }
  }
}

MarioMoveComponent.prototype.getTag = function(){
	return "MARIO_MOVE_COMPONENT";
}