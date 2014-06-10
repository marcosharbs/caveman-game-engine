/**
* Classe que guarda um par de objetos de colidiram.
*
* @author Marcos Harbs
* @class CollideInfo
* @constructor
*/
function CollideInfo(){}

/**
* Método construtor da classe CollideInfo.
*
* @author Marcos Harbs
* @method initialize
* @param {GameObject} gameObject1
* @param {GameObject} gameObject2
* @return {CollideInfo} object
*/
JSUtils.addMethod(CollideInfo.prototype, "initialize", 
	function(gameObject1, gameObject2){
		this.gameObject1 = gameObject1;
		this.gameObject2 = gameObject2;
		return this;
	}
);