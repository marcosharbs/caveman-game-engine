/**
* Classe que defini uma cena do jogo.
*
* @author Marcos Harbs
* @class Scene
* @constructor
*/
function Scene(){}

/**
* Método construtor da classe Scene.
*
* @author Marcos Harbs
* @method initialize
* @param {Float} minX
* @param {Float} minY
* @param {Float} maxX
* @param {Float} maxY
* @return {Scene} object
*/
JSUtils.addMethod(Scene.prototype, "initialize", 
	function(minX, minY, maxX, maxY){
		this.id = JSUtils.generateUUID();
		this.minPoint = new Point2D().initialize(minX, minY);
		this.maxPoint = new Point2D().initialize(maxX, maxY);
		this.listLayers = new Array();
		this.listComponents = new Array();
		return this;
	}
);

/**
* Adicona uma camada na cena.
*
* @author Marcos Harbs
* @method addLayer
* @param {Layer} layer
*/
Scene.prototype.addLayer = function(layer){
	this.listLayers = ArrayUtils.addElement(this.listLayers, layer);
	layer.scene = this;
}

/**
* Remove uma camada da cena.
*
* @author Marcos Harbs
* @method removeLayer
* @param {Layer} layer
*/
Scene.prototype.removeLayer = function(layer){
	this.listLayers = ArrayUtils.removeElement(this.listLayers, layer);
}

/**
* Callback chamado quando a cena é carregada.
*
* @author Marcos Harbs
* @method onLoad
*/
Scene.prototype.onLoad = function(){}