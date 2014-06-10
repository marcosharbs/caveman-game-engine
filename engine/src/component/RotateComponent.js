/**
* Component que aplica uma rotação no objeto associado.
*
* @author Marcos Harbs
* @class RotateComponent
* @constructor
*/
function RotateComponent(){}

RotateComponent.prototype = new Component();

/**
* Método construtor da classe RotateComponent.
*
* @author Marcos Harbs
* @method initialize
* @param {Float} angle 
* @return {RotateComponent} object
*/
JSUtils.addMethod(RotateComponent.prototype, "initialize", 
	function(angle){
		this.initialize();
		this.angle = angle;
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
RotateComponent.prototype.getSystems = function(){
	var systems = new Array();
	systems = ArrayUtils.addElement(systems, RenderSystem.getTag());
	return systems;
}

/**
* Define a rotação do objeto.
*
* @author Marcos Harbs
* @method setRotate
* @param {Float} angle
*/
RotateComponent.prototype.setRotate = function(angle){
	this.angle = angle;
	if(this.owner.body){
		if(this.owner instanceof PolygonObject){
			this.owner.body.m_shapeList.m_body.m_rotation = angle;
		}else{
			this.owner.body.m_rotation = angle;
		}
	}
}

/**
* Retorna o ângulo do objeto.
*
* @author Marcos Harbs
* @method getAngle
* @return {Float} angle
*/
RotateComponent.prototype.getAngle = function(){
	if(!this.owner.body || this.owner.body == null){
		return this.angle;
	}
	if(this instanceof PolygonObject){
		return this.owner.body.m_shapeList.m_body.m_rotation;
	}
	return this.owner.body.m_rotation;
}

/**
* Função que realiza a transformação de rotação no canvas.
*
* @author Marcos Harbs
* @method rotate
* @param {Context} context
*/
RotateComponent.prototype.rotate = function(context){
	if(!(this.owner instanceof PolygonObject) || !this.owner.body){
		context.translate(this.owner.getCenterX(), this.owner.getCenterY());
		context.rotate(this.owner.getAngle());
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
RotateComponent.prototype.onBeforeRender = function(context){
	this.rotate(context);
}

/**
* Método sobrescrito da classe Component.
*
* @author Marcos Harbs
* @method getTag
* @return {String} tag
*/
RotateComponent.prototype.getTag = function(){
	return "ROTATE_COMPONENT";
}