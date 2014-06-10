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
		for(var i in Game.listComponents){
			var component = Game.listComponents[i];
			if(component instanceof Component /*&& ArrayUtils.contains(component.getSystems(), KeySystem.getTag())*/){
				component.onKeyDown(evt.keyCode);
			}
		}
		if(Game.scene){
			for(var i in Game.scene.listComponents){
				var component = Game.scene.listComponents[i];
				if(component instanceof Component /*&& ArrayUtils.contains(component.getSystems(), KeySystem.getTag())*/){
					component.onKeyDown(evt.keyCode);
				}
			}
			for(var i in Game.scene.listLayers){
				var layer = Game.scene.listLayers[i];
				if(layer instanceof Layer){
					for(var j in layer.listComponents){
						var component = layer.listComponents[j];
						if(component instanceof Component /*&& ArrayUtils.contains(component.getSystems(), KeySystem.getTag())*/){
							component.onKeyDown(evt.keyCode);
						}
					}
					for(var j in layer.listGameObjects){
						var gameObject = layer.listGameObjects[j];
						if(gameObject instanceof GameObject){
							for(var k in gameObject.listComponents){
								var component = gameObject.listComponents[k];
								if(component instanceof Component /*&& ArrayUtils.contains(component.getSystems(), KeySystem.getTag())*/){
									component.onKeyDown(evt.keyCode);
								}
							}
						}
					}
				}
			}
		}
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
		for(var i in Game.listComponents){
			var component = Game.listComponents[i];
			if(component instanceof Component /*&& ArrayUtils.contains(component.getSystems(), KeySystem.getTag())*/){
				component.onKeyUp(evt.keyCode);
			}
		}
		if(Game.scene){
			for(var i in Game.scene.listComponents){
				var component = Game.scene.listComponents[i];
				if(component instanceof Component /*&& ArrayUtils.contains(component.getSystems(), KeySystem.getTag())*/){
					component.onKeyUp(evt.keyCode);
				}
			}
			for(var i in Game.scene.listLayers){
				var layer = Game.scene.listLayers[i];
				if(layer instanceof Layer){
					for(var j in layer.listComponents){
						var component = layer.listComponents[j];
						if(component instanceof Component /*&& ArrayUtils.contains(component.getSystems(), KeySystem.getTag())*/){
							component.onKeyUp(evt.keyCode);
						}
					}
					for(var j in layer.listGameObjects){
						var gameObject = layer.listGameObjects[j];
						if(gameObject instanceof GameObject){
							for(var k in gameObject.listComponents){
								var component = gameObject.listComponents[k];
								if(component instanceof Component /*&& ArrayUtils.contains(component.getSystems(), KeySystem.getTag())*/){
									component.onKeyUp(evt.keyCode);
								}
							}
						}
					}
				}
			}
		}
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

}

window.addEventListener("keydown", KeySystem.fireKeyDownListener);
window.addEventListener("keyup",   KeySystem.fireKeyUpListener);