
function SpaceShipEnemyBehavior(){}

SpaceShipEnemyBehavior.prototype = new Component();

SpaceShipEnemyBehavior.prototype.lastShoot = null;

SpaceShipEnemyBehavior.prototype.loaded = false;

SpaceShipEnemyBehavior.prototype.enemyVelocity = 10;

SpaceShipEnemyBehavior.prototype.reload = 3500;

SpaceShipEnemyBehavior.prototype.getSystems = function(){
	var systems = new Array();
	systems = ArrayUtils.addElement(systems, LogicSystem.getTag());
	return systems;
}

SpaceShipEnemyBehavior.prototype.onCollide = function(otherGameObject){
   if(otherGameObject.getTag() == "PLAYER_SHOOT"){
     otherGameObject.destroy();

     if(!this.animation){
        this.animation = new AnimationRenderComponent().initialize(AssetStore.getAsset("explosion").getAssetInstance(), 4, 1);
        ComponentUtils.addComponent(this.owner, this.animation);
        this.animation.play("HORIZONTAL",0,0,3,1,250);
     }  
   }
}

SpaceShipEnemyBehavior.prototype.onUpdate = function(deltaTime){
     if(this.animation){      
       if(this.animation.stopped){
          this.owner.destroy();
       }else{
          this.owner.setLinearVelocityX(0); 
          this.owner.setLinearVelocityY(0); 
       }
     }
     var now = new Date();
     if((this.lastShoot == null || (now - this.lastShoot) > this.reload) && this.loaded == true){
		this.owner.setLinearVelocityX(this.enemyVelocity);
        this.enemyVelocity = this.enemyVelocity * -1;
        this.lastShoot = now;
	     var shoot = new BoxObject().initialize(this.owner.getCenterX(),this.owner.getCenterY() + 65,21,19, "red", "red");
	     var rbb = new RigidBodyComponent().initialize(0, 1, true, false, 0);
	     ComponentUtils.removeComponent(shoot, ComponentUtils.getComponent(shoot, "BOX_RENDER_COMPONENT"));
	     ComponentUtils.addComponent(shoot, new ImageRenderComponent().initialize(AssetStore.getAsset("bullet").getAssetInstance(), false, "HORIZONTAL"));
	     rbb.onUpdate = function(deltaTime){
		if(this.owner.recreateBody){
			this.createPhysicsBody();
		        this.owner.setLinearVelocityY(200);
			this.owner.recreateBody = false;
		}
	     }
	     shoot.getTag = function(){
		return "ENEMY_SHOOT";
	     }
	     ComponentUtils.addComponent(shoot, rbb);
	     layer.addGameObject(shoot);
     }
     if(this.loaded == false){
	     this.loaded = true;	
     }
}

SpaceShipEnemyBehavior.prototype.getTag = function(){
	return "SPACE_SHIP_ENEMY_BEHAVIOR";
}