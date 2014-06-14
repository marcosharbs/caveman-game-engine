/**
* Componente que movimenta uma espaço nave.
*
* @author Marcos Harbs
* @class MoveSpaceShipComponent
* @constructor
*/
function MoveSpaceShipComponent(){}

MoveSpaceShipComponent.prototype = new Component();

MoveSpaceShipComponent.prototype.lastShoot = null;

MoveSpaceShipComponent.prototype.life = 5;

MoveSpaceShipComponent.prototype.onStickMoved = function(value, stick, direction){
	var vel = 14 * value;
	if(stick == "stick-1"){
		if(direction == "HORIZONTAL"){
			this.owner.setLinearVelocityX(vel);
		}else {
			this.owner.setLinearVelocityY(vel);
		}
	}
}

MoveSpaceShipComponent.prototype.onButtonPressed = function(button){
  if(button == "button-1"){
     var now = new Date();
     if(this.lastShoot == null || now - this.lastShoot > 350){
        this.lastShoot = now;
        var shoot = new BoxObject().initialize(this.owner.getCenterX(),this.owner.getCenterY() - 65,21,19, "red", "red");
     var rbb = new RigidBodyComponent().initialize(0, 1, true, false, 0);
     rbb.onCollide = function(other){
       if(other.getTag() == "ENEMY_SHOOT" || other.getTag() == "PLAYER_SHOOT"){
         other.destroy();
         this.owner.destroy();
       }
     }
     ComponentUtils.removeComponent(shoot, ComponentUtils.getComponent(shoot, "BOX_RENDER_COMPONENT"));
      shoot.getTag = function(){
		return "PLAYER_SHOOT";
	     }
     ComponentUtils.addComponent(shoot, new ImageRenderComponent().initialize(AssetStore.getAsset("bullet").getAssetInstance(), false, "HORIZONTAL"));
     rbb.onUpdate = function(deltaTime){
	if(this.owner.recreateBody){
		this.createPhysicsBody();
                this.owner.setLinearVelocityY(-400);
		this.owner.recreateBody = false;
	}
     }
     ComponentUtils.addComponent(shoot, rbb);
     layer.addGameObject(shoot);
     }
  }
}

/**
  * Movimenta a espaço nave.
  *
  * @author Marcos Harbs
  * @method fireKeyDownListener
  * @param {Float} keyCode
  */
MoveSpaceShipComponent.prototype.onKeyDown = function(keyCode){
  if(keyCode == 65){
     this.owner.setLinearVelocityX(-350); 
  }else if(keyCode == 68){
     this.owner.setLinearVelocityX(350);
  }else if(keyCode == 87){
     this.owner.setLinearVelocityY(-350);
  }else if(keyCode == 83){
     this.owner.setLinearVelocityY(350);
  }else if(keyCode == 32){
     var now = new Date();
     if(this.lastShoot == null || now - this.lastShoot > 350){
        this.lastShoot = now;
        var shoot = new BoxObject().initialize(this.owner.getCenterX(),this.owner.getCenterY() - 65,21,19, "red", "red");
     var rbb = new RigidBodyComponent().initialize(0, 1, true, false, 0);
     rbb.onCollide = function(other){
       if(other.getTag() == "ENEMY_SHOOT" || other.getTag() == "PLAYER_SHOOT"){
         other.destroy();
         this.owner.destroy();
       }
     }
     ComponentUtils.removeComponent(shoot, ComponentUtils.getComponent(shoot, "BOX_RENDER_COMPONENT"));
      shoot.getTag = function(){
		return "PLAYER_SHOOT";
	     }
     ComponentUtils.addComponent(shoot, new ImageRenderComponent().initialize(AssetStore.getAsset("bullet").getAssetInstance(), false, "HORIZONTAL"));
     rbb.onUpdate = function(deltaTime){
	if(this.owner.recreateBody){
		this.createPhysicsBody();
                this.owner.setLinearVelocityY(-400);
		this.owner.recreateBody = false;
	}
     }
     ComponentUtils.addComponent(shoot, rbb);
     layer.addGameObject(shoot);
     }
  }
}

MoveSpaceShipComponent.prototype.onKeyUp = function(keyCode){
  if(keyCode == 65){
     this.owner.setLinearVelocityX(0); 
  }else if(keyCode == 68){
     this.owner.setLinearVelocityX(0);
  }else if(keyCode == 87){
     this.owner.setLinearVelocityY(0);
  }else if(keyCode == 83){
     this.owner.setLinearVelocityY(0);
  }
}

MoveSpaceShipComponent.prototype.onCollide = function(otherGameObject){
     if(otherGameObject.getTag() == "ENEMY_SHOOT"){
           otherGameObject.destroy();
           this.life--;
      }
      if(this.life <= 0){
          //alert("GAME OVER!");
      }
}

/**
* Retorna os sistemas que deverão gerenciar este component.
* (KEY_SYSTEM; LOGIC_SYSTEM; MOUSE_SYSTEM; RENDER_SYSTEM)
*
* @author Marcos Harbs
* @method getSystems
* @return {Array} systems
*/
MoveSpaceShipComponent.prototype.getSystems = function(){
  var systems = new Array();
  systems = ArrayUtils.addElement(systems, KeySystem.getTag());
  return systems;
}

/**
* Método sobrescrito da classe Component.
*
* @author Marcos Harbs
* @method getTag
* @return {String} tag
*/
MoveSpaceShipComponent.prototype.getTag = function(){
  return "MOVE_SPACE_SHIP_COMPONENT";
}