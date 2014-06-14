/**
* Classe que representa um objeto do tipo nave espacial.
*
* @author Marcos Harbs
* @class SpaceShipObject
* @constructor
*/
function SpaceShipObject(){}

SpaceShipObject.prototype = new GameObject();

/**
* Método construtor da classe SpaceShipObject.
*
* @author Marcos Harbs
* @method initialize
* @param {Float} x
* @param {Float} y 
* @param {Float} width
* @param {Float} height 
* @param {Image} shipImage
* @return {SpaceShipObject} object
*/
JSUtils.addMethod(SpaceShipObject.prototype, "initialize", 
	function(x, y, width, height, shipImage){
		this.initialize(x, y, width, height);
		ComponentUtils.addComponent(this, new TranslateComponent().initialize(0, 0));
		ComponentUtils.addComponent(this, new ScaleComponent().initialize(1, 1));
		ComponentUtils.addComponent(this, new RotateComponent().initialize(0));
                ComponentUtils.addComponent(this, new ImageRenderComponent().initialize(shipImage,
                                                                         false, 
                           						 "HORIZONTAL"));
                ComponentUtils.addComponent(this, new RigidBodyComponent().initialize(0, 1, true, false, 0));
                ComponentUtils.addComponent(this, new MoveSpaceShipComponent().initialize());

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
SpaceShipObject.prototype.createBodyShape = function(){
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
SpaceShipObject.prototype.getTag = function(){
	return "SPACE_SHIP_OBJECT";
}