/**
* Component que aplica a física de corpos rígidos no objeto.
*
* @author Marcos Harbs
* @class RigidBodyComponent
* @constructor
*/
function RigidBodyComponent(){}

RigidBodyComponent.prototype = new Component();

/**
* Método construtor da classe RigidBodyComponent.
*
* @author Marcos Harbs
* @method initialize
* @param {Float} restitution
* @param {Float} density
* @param {Boolean} preventRotation
* @param {allowSleep} allowSleep
* @param {Float} friction
* @return {RigidBodyComponent} object
*/
JSUtils.addMethod(RigidBodyComponent.prototype, "initialize", 
	function(restitution, density, preventRotation, allowSleep, friction){
		this.initialize();
		this.restitution = restitution;
		this.density = density;
		this.preventRotation = preventRotation;
		this.allowSleep = allowSleep;
		this.friction = friction;
		this.isSensor = false;
		this.isCollidable = true;
		return this;
	}
);

JSUtils.addMethod(RigidBodyComponent.prototype, "initialize", 
	function(restitution, density, preventRotation, allowSleep, friction, isSensor){
		this.initialize();
		this.restitution = restitution;
		this.density = density;
		this.preventRotation = preventRotation;
		this.allowSleep = allowSleep;
		this.friction = friction;
		this.isSensor = isSensor;
		this.isCollidable = true;
		return this;
	}
);

JSUtils.addMethod(RigidBodyComponent.prototype, "initialize", 
	function(restitution, density, preventRotation, allowSleep, friction, isSensor, isCollidable){
		this.initialize();
		this.restitution = restitution;
		this.density = density;
		this.preventRotation = preventRotation;
		this.allowSleep = allowSleep;
		this.friction = friction;
		this.isSensor = isSensor;
		this.isCollidable = isCollidable;
		return this;
	}
);

/**
* Retorna os sistemas que deverão gerenciar este component.
* (KEY_SYSTEM; LOGIC_SYSTEM; MOUSE_SYSTEM; RENDER_SYSTEM)
*
* @author Marcos Harbs
* @method getSystems
* @return {Array} systems
*/
RigidBodyComponent.prototype.getSystems = function(){
	var systems = new Array();
	systems = ArrayUtils.addElement(systems, LogicSystem);
	return systems;
}

/**
* Método sobrescrito da classe Component.
*
* @author Marcos Harbs
* @method onUpdate
* @param {Float} deltaTime
*/
RigidBodyComponent.prototype.onUpdate = function(deltaTime){
	if(this.owner.recreateBody){
		this.createPhysicsBody();
		this.owner.recreateBody = false;
	}
}

/**
* Método sobrescrito da classe Component.
*
* @author Marcos Harbs
* @method onLoad
*/
RigidBodyComponent.prototype.onLoad = function(){
	this.createPhysicsBody();
}

/**
* Método sobrescrito da classe Component.
*
* @author Marcos Harbs
* @method onDestroy
*/
RigidBodyComponent.prototype.onDestroy = function(){
	this.destroyBody();
}

/**
* Cria um corpo com base nas definições do GameObject
* e adiciona este corpo no mundo para ser gerenciado 
* pela Box2D.
*
* @author Marcos Harbs
* @method createPhysicsBody
*/
RigidBodyComponent.prototype.createPhysicsBody = function(){
	if(this.owner.body){
		this.destroyBody();
	}

	var bodyShape = this.owner.createBodyShape();
	bodyShape.restitution = this.restitution;
	bodyShape.density = this.density;
	bodyShape.friction = this.friction;

	var centerX = this.owner.getCenterX();
	var centerY = this.owner.getCenterY();

	var translate = ComponentUtils.getComponent(this.owner, "TRANSLATE_COMPONENT");
	if(translate && !translate.applied){
		centerX += translate.translatePoint.x;
		centerY += translate.translatePoint.y;
		translate.applied = true;
	}

	var bodyDef = this.owner.createBodyDef(centerX, centerY);
	bodyDef.preventRotation = this.preventRotation;
	bodyDef.allowSleep = this.allowSleep;
	bodyDef.AddShape(bodyShape);

	var ab = this.owner.getAngle();
	this.owner.body = this.owner.layer.world.CreateBody(bodyDef);
	this.owner.body.m_rotation = ab;
	this.owner.body.isSensor = this.isSensor;
	this.owner.body.isCollidable = this.isCollidable;
}

/**
* Destrói o corpo da Box2D.
*
* @author Marcos Harbs
* @method drestroyBody
*/
RigidBodyComponent.prototype.destroyBody = function(){
	this.owner.layer.world.DestroyBody(this.owner.body);
}

/**
* Método sobrescrito da classe Component.
*
* @author Marcos Harbs
* @method getTag
* @return {String} tag
*/
RigidBodyComponent.prototype.getTag = function(){
	return "RIGID_BODY_COMPONENT";
}