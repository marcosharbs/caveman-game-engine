/**
* Component que aplica uma escala no objeto associado.
*
* @author Marcos Harbs
* @class ScaleComponent
* @constructor
*/
function ScaleComponent(){}

ScaleComponent.prototype = new Component();

/**
* Método construtor da classe ScaleComponent.
*
* @author Marcos Harbs
* @method initialize
* @param {Float} x
* @param {Float} y 
* @return {ScaleComponent} object
*/
JSUtils.addMethod(ScaleComponent.prototype, "initialize", 
	function(x, y){
		this.initialize();
		this.scalePoint = new Point2D().initialize(x, y);
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
ScaleComponent.prototype.getSystems = function(){
	var systems = new Array();
	systems = ArrayUtils.addElement(systems, RenderSystem.getTag());
	return systems;
}

/**
* Define a escala do objeto.
*
* @author Marcos Harbs
* @method setScale
* @param {Float} x
* @param {Float} y
*/
ScaleComponent.prototype.setScale = function(x, y){
	this.scalePoint.x = x;
	this.scalePoint.y = y;
	this.owner.recreateBody = true;
}

/**
* Função que realiza a transformação escala no canvas.
*
* @author Marcos Harbs
* @method scale
* @param {Context} context
*/
ScaleComponent.prototype.scale = function(context){
	if(!(this.owner instanceof PolygonObject) || !this.owner.body){
		context.translate(this.owner.getCenterX(), this.owner.getCenterY());
		context.scale(this.scalePoint.x, this.scalePoint.y);
		context.translate(-this.owner.getCenterX(), -this.owner.getCenterY());
	}
}

/**
* Método sobrescrito da classe Component.
*
* @author Marcos Harbs
* @method onBeforeRender
* @param {Context} context
*/
ScaleComponent.prototype.onBeforeRender = function(context){
	this.scale(context);
}

/**
* Método sobrescrito da classe Component.
*
* @author Marcos Harbs
* @method getTag
* @return {String} tag
*/
ScaleComponent.prototype.getTag = function(){
	return "SCALE_COMPONENT";
}