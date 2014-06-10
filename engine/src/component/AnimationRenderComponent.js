/**
* Component que renderiza uma animação baseada em sprites.
*
* @author Marcos Harbs
* @class AnimationRenderComponent
* @constructor
*/
function AnimationRenderComponent(){}

AnimationRenderComponent.prototype = new Component();

/**
* Método construtor da classe AnimationRenderComponent.
*
* @author Marcos Harbs
* @method initialize
* @param {Image} spriteSheet
* @param {Integer} columns
* @param {Integer} rows
* @return {AnimationRenderComponent} object
*/
JSUtils.addMethod(AnimationRenderComponent.prototype, "initialize", 
	function(spriteSheet, columns, rows){
		this.initialize();
		this.spriteSheet = spriteSheet;
		this.columns = columns;
		this.rows = rows;
		this.uv = new Point2D().initialize(0,0);
		this.stopped = true;
		this.direction = "HORIZONTAL";
		this.animation = 0;
		this.start = 0;
		this.end = 0;
		this.interactions = 0;
		this.duration = 0;
		this.lastUpdate = null;
		this.currentInteraction = 0;
		this.currentFrame = 0;
		return this;
	}
);

/**
* Método sobrescrito da classe Component.
*
* @author Marcos Harbs
* @method onRender
* @param {Context} context
*/
AnimationRenderComponent.prototype.onRender = function(context){
	this.uv = new Point2D().initialize(this.spriteSheet.width/this.columns,this.spriteSheet.height/this.rows);
	if(!this.stopped && 
		this.spriteSheet && 
		this.spriteSheet.width > 0 && 
		this.spriteSheet.height > 0 &&
		this.uv.x > 0 
		&& this.uv.y > 0){
		
		var x = 0;
		var y = 0;
		if(this.direction == "HORIZONTAL"){
			x = this.uv.x * this.currentFrame;
			y = this.uv.y * this.animation;
		}else if(this.direction == "VERTICAL"){
			x = this.uv.x * this.animation;
			y = this.uv.y * this.currentFrame;
		}
		context.drawImage(this.spriteSheet,
				          x, y,
				          this.uv.x, this.uv.y,
				          this.owner.getCenterX()-(this.uv.x/2), 
		                  this.owner.getCenterY()-(this.uv.y/2),
		                  this.uv.x, this.uv.y);
		var now = Date.now();
		if(this.lastUpdate == null || (now - this.lastUpdate) >= this.duration){
			this.lastUpdate = now;
			this.currentFrame++;
			if(this.currentFrame > this.end){
				this.currentFrame = this.start;
				this.currentInteraction++;
			}
			if(this.interactions != -1 && this.currentInteraction == this.interactions){
				this.stopped = true;
			}
		}
	}
}

/**
* Método usado para tocar uma animação da sprite sheet.
*
* @author Marcos Harbs
* @method play
* @param {String} direction
* @param {Integer} animation
* @param {Integer} start
* @param {Integer} end
* @param {Integer} interactions
* @param {Long} duration
*/
AnimationRenderComponent.prototype.play = function(direction, animation, start, end, interactions, duration){
	this.direction = direction;
	this.animation = animation;
	this.start = start;
	this.end = end;
	this.interactions = interactions;
	this.duration = duration;
	this.lastUpdate = null;
	this.currentInteraction = 0;
	this.currentFrame = start;
	this.stopped = false;
}

/**
* Método usado para parar uma animação.
*
* @author Marcos Harbs
* @method stop
*/
AnimationRenderComponent.prototype.stop = function(){
	this.stopped = true;
}

/**
* Retorna os sistemas que deverão gerenciar este component.
* (KEY_SYSTEM; LOGIC_SYSTEM; MOUSE_SYSTEM; RENDER_SYSTEM)
*
* @author Marcos Harbs
* @method getSystems
* @return {Array} systems
*/
AnimationRenderComponent.prototype.getSystems = function(){
	var systems = new Array();
	systems = ArrayUtils.addElement(systems, RenderSystem.getTag());
	return systems;
}

/**
* Método sobrescrito da classe Component.
*
* @author Marcos Harbs
* @method getTag
* @return {String} tag
*/
AnimationRenderComponent.prototype.getTag = function(){
	return "ANIMATION_RENDER_COMPONENT";
}