/**
* Classe que defini um recurso utilizado pelo jogo (imagem, som, etc...).
*
* @author Marcos Harbs
* @class Asset
* @constructor
*/
function Asset(){}

/**
* Método construtor da classe Asset.
*
* @author Marcos Harbs
* @method initialize
* @param {String} id
* @param {String} path
* @param {String} assetType
* @return {Asset} object
*/
JSUtils.addMethod(Asset.prototype, "initialize", 
	function(id, path, assetType){
		this.id = id;
		this.path = path;
		this.assetType = assetType;
		this.loadAsset();
		return this;
	}
);

/**
* Retorna a instância do asset com base no tipo informado.
*
* @author Marcos Harbs
* @method getAssetInstance
* @return {Object} instance
*/
Asset.prototype.getAssetInstance = function(){
	return this.instance;
}

/**
* Carrega o asset.
*
* @author Marcos Harbs
* @method loadAsset
*/
Asset.prototype.loadAsset = function(){
	if(this.assetType == "IMAGE"){
		this.instance = new Image();
		this.instance.src = this.path;
	}else if(this.assetType == "AUDIO"){
		this.instance = new Audio();
		this.instance.pause();
		this.instance.volume = 1;
		this.instance.loop = false;
		this.instance.preload = 'auto';
		this.instance.src = this.path;
	}
}