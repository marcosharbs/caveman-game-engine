/**
* Component que aplica uma translação no objeto associado.
*
* @author Marcos Harbs
* @class TranslateComponent
* @constructor
*/
function TranslateComponent(){}

TranslateComponent.prototype = new Component();

/**
* Método construtor da classe TranslateComponent.
*
* @author Marcos Harbs
* @method initialize
* @param {Float} x
* @param {Float} y 
* @return {TranslateComponent} object
*/
JSUtils.addMethod(TranslateComponent.prototype, "initialize", 
	function(x, y){
		this.initialize();
		this.translatePoint = new Point2D().initialize(x, y);
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
TranslateComponent.prototype.getSystems = function(){
	var systems = new Array();
	systems = ArrayUtils.addElement(systems, RenderSystem.getTag());
	return systems;
}

/**
* Define a translação do objeto.
*
* @author Marcos Harbs
* @method setTranslate
* @param {Float} x
* @param {Float} y
*/
TranslateComponent.prototype.setTranslate = function(x, y){
	this.translatePoint.x = x;
	this.translatePoint.y = y;
	this.applied = false;
	if(this.owner.body){
		if(this.owner instanceof PolygonObject){
			this.owner.body.m_shapeList.m_body.m_position.x += this.translatePoint.x;
			this.owner.body.m_shapeList.m_body.m_position.y += this.translatePoint.y;
		}else{
			this.owner.body.m_position.x += this.translatePoint.x;
			this.owner.body.m_position.y += this.translatePoint.y;
		}
		this.applied = true;
	}
}

/**
* Função que realiza a transformação de translação no canvas.
*
* @author Marcos Harbs
* @method translate
* @param {Context} context
*/
TranslateComponent.prototype.translate = function(context){
	if(!this.owner.body){
		context.translate(this.owner.getCenterX(), this.owner.getCenterY());
		context.translate(this.translatePoint.x, this.translatePoint.y);
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
TranslateComponent.prototype.onBeforeRender = function(context){
	this.translate(context);
}

/**
* Método sobrescrito da classe Component.
*
* @author Marcos Harbs
* @method getTag
* @return {String} tag
*/
TranslateComponent.prototype.getTag = function(){
	return "TRANSLATE_COMPONENT";
}