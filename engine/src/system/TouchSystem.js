
var TouchSystem = new function(){

	this.fireTouchStartListener = function(evt) {
		if(evt.target.nodeName == "CANVAS"){
			evt.preventDefault();
		}
		if(evt.changedTouches && evt.changedTouches.length > 0) {
			for(var i in Game.listComponents){
				var component = Game.listComponents[i];
				if(component instanceof Component){
					component.onTouchStart(evt.touches, evt.changedTouches);
				}
			}
			if(Game.scene){
				for(var i in Game.scene.listComponents){
					var component = Game.scene.listComponents[i];
					if(component instanceof Component){
						component.onTouchStart(evt.touches, evt.changedTouches);
					}
				}
				for(var i in Game.scene.listLayers){
					var layer = Game.scene.listLayers[i];
					if(layer instanceof Layer){
						for(var j in layer.listComponents){
							var component = layer.listComponents[j];
							if(component instanceof Component){
								component.onTouchStart(evt.touches, evt.changedTouches);
							}
						}
						for(var j in layer.listGameObjects){
							var gameObject = layer.listGameObjects[j];
							if(gameObject instanceof GameObject){
								for(var k in gameObject.listComponents){
									var component = gameObject.listComponents[k];
									if(component instanceof Component){
										component.onTouchStart(evt.touches, evt.changedTouches);
									}
								}
							}
						}
					}
				}
			}
		}
	}

	this.fireTouchMoveListener = function(evt) {
		if(evt.target.nodeName == "CANVAS"){
			evt.preventDefault();
		}
		if(evt.changedTouches && evt.changedTouches.length > 0) {
			for(var i in Game.listComponents){
				var component = Game.listComponents[i];
				if(component instanceof Component){
					component.onTouchMove(evt.touches, evt.changedTouches);
				}
			}
			if(Game.scene){
				for(var i in Game.scene.listComponents){
					var component = Game.scene.listComponents[i];
					if(component instanceof Component){
						component.onTouchMove(evt.touches, evt.changedTouches);
					}
				}
				for(var i in Game.scene.listLayers){
					var layer = Game.scene.listLayers[i];
					if(layer instanceof Layer){
						for(var j in layer.listComponents){
							var component = layer.listComponents[j];
							if(component instanceof Component){
								component.onTouchMove(evt.touches, evt.changedTouches);
							}
						}
						for(var j in layer.listGameObjects){
							var gameObject = layer.listGameObjects[j];
							if(gameObject instanceof GameObject){
								for(var k in gameObject.listComponents){
									var component = gameObject.listComponents[k];
									if(component instanceof Component){
										component.onTouchMove(evt.touches, evt.changedTouches);
									}
								}
							}
						}
					}
				}
			}
		}
	}

	this.fireTouchEndListener = function(evt) {
		if(evt.target.nodeName == "CANVAS"){
			evt.preventDefault();
		}
		if(evt.changedTouches && evt.changedTouches.length > 0) {
			for(var i in Game.listComponents){
				var component = Game.listComponents[i];
				if(component instanceof Component){
					component.onTouchEnd(evt.touches, evt.changedTouches);
				}
			}
			if(Game.scene){
				for(var i in Game.scene.listComponents){
					var component = Game.scene.listComponents[i];
					if(component instanceof Component){
						component.onTouchEnd(evt.touches, evt.changedTouches);
					}
				}
				for(var i in Game.scene.listLayers){
					var layer = Game.scene.listLayers[i];
					if(layer instanceof Layer){
						for(var j in layer.listComponents){
							var component = layer.listComponents[j];
							if(component instanceof Component){
								component.onTouchEnd(evt.touches, evt.changedTouches);
							}
						}
						for(var j in layer.listGameObjects){
							var gameObject = layer.listGameObjects[j];
							if(gameObject instanceof GameObject){
								for(var k in gameObject.listComponents){
									var component = gameObject.listComponents[k];
									if(component instanceof Component){
										component.onTouchEnd(evt.touches, evt.changedTouches);
									}
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
		return "TOUCH_SYSTEM";
	}

}

window.addEventListener("touchstart", TouchSystem.fireTouchStartListener);
window.addEventListener("touchmove",  TouchSystem.fireTouchMoveListener);
window.addEventListener("touchend",   TouchSystem.fireTouchEndListener);