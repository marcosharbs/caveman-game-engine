/**
* Classe responsável por propagar os eventos de teclado.
*
* @author Marcos Harbs
* @class KeySystem
* @static
*/
var KeySystem = new function(){

	/**
	* Método usado para propagar o evento de keydown.
	*
	* @author Marcos Harbs
	* @method fireKeyDownListener
	* @static
	* @param {Event} evt
	*/
	this.fireKeyDownListener = function(evt){
		ComponentUtils.fireComponentEvent(KeySystem.getListName(), "onKeyDown", [evt.keyCode]);
	}

	/**
	* Método usado para propagar o evento de keyup.
	*
	* @author Marcos Harbs
	* @method fireKeyUpListener
	* @static
	* @param {Event} evt
	*/
	this.fireKeyUpListener = function(evt){
		ComponentUtils.fireComponentEvent(KeySystem.getListName(), "onKeyUp", [evt.keyCode]);
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
		return "KEY_SYSTEM";
	}

	this.getListName = function(){
		return "listComponentsKey";
	}

}

window.addEventListener("keydown", KeySystem.fireKeyDownListener);
window.addEventListener("keyup",   KeySystem.fireKeyUpListener);