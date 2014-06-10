/**
* Component que renderiza um círculo.
*
* @author Marcos Harbs
* @class CircleRenderComponent
* @constructor
*/
function CircleRenderComponent(){}

CircleRenderComponent.prototype = new Component();

/**
* Método construtor da classe CircleRenderComponent.
*
* @author Marcos Harbs
* @method initialize
* @param {Color} fillStyle
* @param {Color} strokeStyle
* @return {CircleRenderComponent} object
*/
JSUtils.addMethod(CircleRenderComponent.prototype, "initialize", 
	function(fillStyle, strokeStyle){
		this.initialize();
		this.fillStyle = fillStyle;
		this.strokeStyle = strokeStyle;
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
CircleRenderComponent.prototype.getSystems = function(){
	var systems = new Array();
	systems = ArrayUtils.addElement(systems, RenderSystem.getTag());
	return systems;
}

/**
* Método sobrescrito da classe Component.
*
* @author Marcos Harbs
* @method onRender
* @param {Context} context
*/
CircleRenderComponent.prototype.onRender = function(context){
	context.beginPath();
	context.arc(this.owner.getCenterX(), 
		        this.owner.getCenterY(), 
		        this.owner.getRadius(), 
		        2 * Math.PI, 
		        false);
	
	if(this.fillStyle != null){
		context.fillStyle = this.fillStyle;
		context.fill();
	}
	if(this.strokeStyle != null){
		context.strokeStyle = this.strokeStyle;
		context.stroke();
	}
}

/**
* Método sobrescrito da classe Component.
*
* @author Marcos Harbs
* @method getTag
* @return {String} tag
*/
CircleRenderComponent.prototype.getTag = function(){
	return "CIRCLE_RENDER_COMPONENT";
}