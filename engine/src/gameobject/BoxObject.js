/**
* Classe que representa um objeto do tipo box.
*
* @author Marcos Harbs
* @class BoxObject
* @constructor
*/
function BoxObject(){}

BoxObject.prototype = new GameObject();

/**
* Método construtor da classe BoxObject.
*
* @author Marcos Harbs
* @method initialize
* @param {Float} x
* @param {Float} y 
* @param {Float} width
* @param {Float} height  
* @param {String} fillStyle 
* @param {String} fillStroke 
* @return {BoxObject} object
*/
JSUtils.addMethod(BoxObject.prototype, "initialize", 
	function(x, y, width, height, fillStyle, fillStroke){
		this.initialize(x, y, width, height);
		ComponentUtils.addComponent(this, new BoxRenderComponent().initialize(fillStyle, fillStroke));
		ComponentUtils.addComponent(this, new TranslateComponent().initialize(0, 0));
		ComponentUtils.addComponent(this, new ScaleComponent().initialize(1, 1));
		ComponentUtils.addComponent(this, new RotateComponent().initialize(0));
		return this;
	}
);

/**
* Cria o formato do corpo para a Box2D.
*
* @author Marcos Harbs
* @method createBodyShape
* @return {b2ShapeDef} bodyShape
*/
BoxObject.prototype.createBodyShape = function(){
	var shape = new b2BoxDef();
	var xb = this.getWidth();
	var yb = this.getHeight();
	var scale = ComponentUtils.getComponent(this, "SCALE_COMPONENT");
	if(scale){
		xb *= Math.abs(scale.scalePoint.x);
		yb *= Math.abs(scale.scalePoint.y);
	}
	shape.extents.Set(xb/2, yb/2);
	return shape;
}

/**
* Retorna a tag deste objeto.
*
* @author Marcos Harbs
* @method getTag
* @return {String} tag
*/
BoxObject.prototype.getTag = function(){
	return "BOX_OBJECT";
}