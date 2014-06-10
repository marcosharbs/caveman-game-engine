/**
* Classe que guarda e gerencia os assets do jogo.
*
* @author Marcos Harbs
* @class AssetStore
* @static
*/
var AssetStore = new function(){

	this.listAssets = new Array();

	/**
	* Retorna um asset do jogo.
	*
	* @author Marcos Harbs
	* @method getAsset
	* @param {String} id
	* @return {Asset} asset
	*/
	this.getAsset = function(id){
		if(this.listAssets){
			return ArrayUtils.getElement(this.listAssets, id);
		}
		return null;
	}

	/**
	* Adiciona um asset no jogo.
	*
	* @author Marcos Harbs
	* @method addAsset
	* @param {Asset} asset
	*/
	this.addAsset = function(asset){
		this.listAssets = ArrayUtils.addElement(this.listAssets, asset);
 	}

}