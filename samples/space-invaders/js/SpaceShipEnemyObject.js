/**
* Classe que representa um objeto do tipo nave espacial inimiga.
*
* @author Marcos Harbs
* @class SpaceShipEnemyObject
* @constructor
*/
function SpaceShipEnemyObject(){}

SpaceShipEnemyObject.prototype = new GameObject();

/**
* Método construtor da classe SpaceShipEnemyObject.
*
* @author Marcos Harbs
* @method initialize
* @param {Float} x
* @param {Float} y 
* @return {SpaceShipEnemyObject} object
*/
JSUtils.addMethod(SpaceShipEnemyObject.prototype, "initialize", 
	function(x, y){
		this.initialize(x, y, 37, 28);
		ComponentUtils.addComponent(this, new TranslateComponent().initialize(0, 0));
		ComponentUtils.addComponent(this, new ScaleComponent().initialize(1, 1));
		ComponentUtils.addComponent(this, new RotateComponent().initialize(0));
                ComponentUtils.addComponent(this, new ImageRenderComponent().initialize(AssetStore.getAsset("ship_enemy").getAssetInstance(),
                                                                         false, 
                           						 "HORIZONTAL"));
                ComponentUtils.addComponent(this, new RigidBodyComponent().initialize(0, 1, true, false, 0));
                ComponentUtils.addComponent(this, new SpaceShipEnemyBehavior().initialize());

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
SpaceShipEnemyObject.prototype.createBodyShape = function(){
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
SpaceShipEnemyObject.prototype.getTag = function(){
	return "SPACE_SHIP_ENEMY_OBJECT";
}