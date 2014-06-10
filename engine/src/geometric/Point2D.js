/**
* Classe usada para representar um ponto no espaço 2D.
*
* @author Marcos Harbs
* @class Point2D
* @constructor
*/
function Point2D(){}

/**
* Método construtor da classe Point2D.
*
* @author Marcos Harbs
* @method initialize
* @param {Float} x
* @param {Float} y 
* @return {Point2D} object
*/
JSUtils.addMethod(Point2D.prototype, "initialize", 
	function(x, y){
		this.x = x;
		this.y = y;
		return this;
	}
);

/**
* Exibe as informações do objeto em forma textual.
*
* @author Marcos Harbs
* @method toString
* @return {String} objectString
*/
Point2D.prototype.toString = function(){
	return '[' + this.x + ',' + this.y + ']';
}