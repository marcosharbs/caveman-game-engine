/**
* Classe responsável por propagar os eventos de atualização de objetos.
*
* @author Marcos Harbs
* @class LogicSystem
* @static
*/
var LogicSystem = new function(){

	this.listCollides = {};

	/**
	* Método usado para propagar o evento de update.
	*
	* @author Marcos Harbs
	* @method fireUpdateListener
	* @param {Float} deltaTime
	* @static
	*/
	this.fireUpdateListener = function(deltaTime){
		ComponentUtils.fireComponentEvent(LogicSystem.getListName(), "onUpdate", [deltaTime]);
	}

	/**
	* Método usado para propagar o evento de collide.
	*
	* @author Marcos Harbs
	* @method fireCollideListener
	* @static
	*/
	this.fireCollideListener = function(){
		for(var i in this.listCollides){
			var collide = this.listCollides[i];
			for(var j in collide.gameObject1[LogicSystem.getListName()]){
				var component = collide.gameObject1[LogicSystem.getListName()][j];
				component.onCollide(collide.gameObject2);
			}
			for(var j in collide.gameObject2[LogicSystem.getListName()]){
				var component = collide.gameObject2[LogicSystem.getListName()][j];
				component.onCollide(collide.gameObject1);
			}
		}
		this.clearCollideInfo();
	}

	/**
	* Método usado para guardar uma colisão detectada pela Box2D.
	*
	* @author Marcos Harbs
	* @method putCollideInfo
	* @static
	* @param {GameObject} gameObject1
	* @param {GameObject} gameObject2
	*/
	this.putCollideInfo = function(gameObject1, gameObject2){
		var keyCollide1 = this.getCollideKey(gameObject1, gameObject2);
		var keyCollide2 = this.getCollideKey(gameObject2, gameObject1);	

		if(!ArrayUtils.getElementByKey(this.listCollides, keyCollide1)  &&
		   !ArrayUtils.getElementByKey(this.listCollides, keyCollide2)){

			var collideInfo = new CollideInfo().initialize(gameObject1, gameObject2);
			this.listCollides = ArrayUtils.putElement(this.listCollides, keyCollide1, collideInfo);
		}
	}

	/**
	* Método usado gerar uma chave com base nos objetos colididos.
	*
	* @author Marcos Harbs
	* @method getCollideKey
	* @static
	* @param {GameObject} gameObject1
	* @param {GameObject} gameObject2
	* @return {String} key
	*/
	this.getCollideKey = function(gameObject1, gameObject2){
		return ("KEY_" + gameObject1.id + "_" + gameObject2.id);
	}

	/**
	* Método usado para limpar a lista de colisões.
	*
	* @author Marcos Harbs
	* @method clearCollideInfo
	* @static
	*/
	this.clearCollideInfo = function(){
		this.listCollides = {};
	}

	/**
	* Retorna o tipo do sistema.
	*
	* @author Marcos Harbs
	* @method getTag
	* @static
	* @return {String} tag
	*/
	this.getTag = function(){
		return "LOGIC_SYSTEM";
	}

	this.getListName = function(){
		return "listComponentsLogic";
	}

}