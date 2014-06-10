/**
* Classe que representa uma câmera.
*
* @author Marcos Harbs
* @class Camera
* @constructor
*/
function Camera(){}

/**
* Método construtor da classe Camera.
*
* @author Marcos Harbs
* @method initialize
* @param {Float} x
* @param {Float} y
* @return {Camera} object
*/
JSUtils.addMethod(Camera.prototype, "initialize", 
	function(x, y){
		this.centerPoint = new Point2D().initialize(x, y);
		this.scale = new ScaleComponent().initialize(1, 1);
		this.translate = new TranslateComponent().initialize(0, 0);
		this.rotate = new RotateComponent().initialize(0);
		ComponentUtils.addComponent(this, this.scale);
		ComponentUtils.addComponent(this, this.translate);
		ComponentUtils.addComponent(this, this.rotate);
		return this;
	}
);

/**
* Função que defini a escala da câmera.
*
* @author Marcos Harbs
* @method setScale
* @param {Float} x
* @param {Float} y
*/
Camera.prototype.setScale = function(x, y){
	this.scale.scalePoint.x = x;
	this.scale.scalePoint.y = y;
}

/**
* Função que defini a translação da câmera.
*
* @author Marcos Harbs
* @method setTranslate
* @param {Float} x
* @param {Float} y
*/
Camera.prototype.setTranslate = function(x, y){
	this.translate.translatePoint.x = x;
	this.translate.translatePoint.y = y;
}

/**
* Função que retorna o x central da câmera.
*
* @author Marcos Harbs
* @method getCenterX
* @return {Float} centerX
*/
Camera.prototype.getCenterX = function(){
	return this.centerPoint.x;
}

/**
* Função que retorna o y central da câmera.
*
* @author Marcos Harbs
* @method getCenterY
* @return {Float} centerY
*/
Camera.prototype.getCenterY = function(){
	return this.centerPoint.y;
}

/**
* Função que retorna o ângulo da câmera.
*
* @author Marcos Harbs
* @method getAngle
* @return {Float} angle
*/
Camera.prototype.getAngle = function(){
	if(this.rotate){
		return this.rotate.angle;
	}
	return 0;
}