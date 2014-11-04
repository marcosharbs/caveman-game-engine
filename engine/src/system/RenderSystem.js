/**
* Classe responsável por propagar os eventos de renderização de objetos.
*
* @author Marcos Harbs
* @class RenderSystem
* @static
*/
var RenderSystem = new function(){

	this.clearCanvas = true;

	/**
	* Método usado para propagar o evento de render.
	*
	* @author Marcos Harbs
	* @method fireRenderListener
	* @static
	* @param {Context} context
	*/
	this.fireRenderListener = function(context){
		if(RenderSystem.clearCanvas == true){
			context.setTransform(1,0,0,1,0,0);
		    context.clearRect(0,0,Game.canvas.width,Game.canvas.height);
		}

		context.save();

		if(Game.camera){
			context.translate(-Game.camera.centerPoint.x+(Game.canvas.width/2),
				              -Game.camera.centerPoint.y+(Game.canvas.height/2));
			Game.camera.scale.onBeforeRender(context);
			Game.camera.translate.onBeforeRender(context);
			Game.camera.rotate.onBeforeRender(context);
		}

		if(Game.scene){
			for(var i in Game.scene[RenderSystem.getListName()]){
				var component = Game.scene[RenderSystem.getListName()][i];
				if(component instanceof Component /*&& ArrayUtils.contains(component.getSystems(), RenderSystem.getTag())*/){
					component.onBeforeRender(context);
				}
			}
			for(var i in Game.scene[RenderSystem.getListName()]){
				var component = Game.scene[RenderSystem.getListName()][i];
				if(component instanceof Component /*&& ArrayUtils.contains(component.getSystems(), RenderSystem.getTag())*/){
					component.onRender(context);
				}
			}
			for(var i in Game.scene.listLayers){
				var layer = Game.scene.listLayers[i];
				if(layer instanceof Layer){
					for(var j in layer[RenderSystem.getListName()]){
						var component = layer[RenderSystem.getListName()][j];
						if(component instanceof Component /*&& ArrayUtils.contains(component.getSystems(), RenderSystem.getTag())*/){
							component.onBeforeRender(context);
						}
					}
					for(var j in layer[RenderSystem.getListName()]){
						var component = layer[RenderSystem.getListName()][j];
						if(component instanceof Component /*&& ArrayUtils.contains(component.getSystems(), RenderSystem.getTag())*/){
							component.onRender(context);
						}
					}
					for(var j in layer.listGameObjects){
						var gameObject = layer.listGameObjects[j];
						if(gameObject instanceof GameObject){
							context.save();
							for(var k in gameObject[RenderSystem.getListName()]){
								var component = gameObject[RenderSystem.getListName()][k];
								if(component instanceof Component /*&& ArrayUtils.contains(component.getSystems(), RenderSystem.getTag())*/){
									component.onBeforeRender(context);
								}
							}
							for(var k in gameObject[RenderSystem.getListName()]){
								var component = gameObject[RenderSystem.getListName()][k];
								if(component instanceof Component /*&& ArrayUtils.contains(component.getSystems(), RenderSystem.getTag())*/){
									component.onRender(context);
								}
							}
							context.restore();
						}
					}
				}
			}
		}

		context.restore();

		for(var i in Game[RenderSystem.getListName()]){
			var component = Game[RenderSystem.getListName()][i];
			if(component instanceof Component /*&& ArrayUtils.contains(component.getSystems(), RenderSystem.getTag())*/){
				component.onBeforeRender(context);
			}
		}
		for(var i in Game[RenderSystem.getListName()]){
			var component = Game[RenderSystem.getListName()][i];
			if(component instanceof Component /*&& ArrayUtils.contains(component.getSystems(), RenderSystem.getTag())*/){
				component.onRender(context);
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
		return "RENDER_SYSTEM";
	}

	this.getListName = function(){
		return "listComponentsRender";
	}

}