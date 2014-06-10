/**
* Classe que representa o jogo.
*
* @author Marcos Harbs
* @class Game
* @static
*/
var Game = new function(){

	this.canvas = null;
	this.context = null;
	this.camera = null;
	this.listComponents = null;
	this.listAssets = null;
	this.scene = null;
	this.lastUpdateTime = null;
	this.frameRate = null;
	this.running = false;
	this.paused = false;

	/**
	* Método que inicializa o jogo.
	*
	* @author Marcos Harbs
	* @method init
	* @param {Canvas} canvas
	* @param {Scene} scene
	*/
	this.init = function(canvas, scene){
		this.canvas = canvas;
		this.context = canvas.getContext("2d");
		this.camera = new Camera().initialize(canvas.width/2, canvas.height/2);
		this.loadGame();
		this.setScene(scene);
		this.lastUpdateTime = 0;
		this.frameRate = 60;
		this.startGameLoop();
		this.running = true;
		this.paused = false;
	}

	/**
	* Executa o onLoad dos componentes do jogo.
	*
	* @author Marcos Harbs
	* @method loadGame
	*/
	this.loadGame = function(){
		for(var i in this.listComponents){
			var component = this.listComponents[i];
			if(component instanceof Component){
				component.onLoad();
			}
		}
	}

	/**
	* Inicia o loop principal do jogo.
	*
	* @author Marcos Harbs
	* @method startGameLoop
	*/
	this.startGameLoop = function(){
		window.cancelRequestAnimFrame = ( function() {
		    return window.cancelAnimationFrame              ||
		           window.webkitCancelRequestAnimationFrame ||
		           window.mozCancelRequestAnimationFrame    ||
		           window.oCancelRequestAnimationFrame      ||
		           window.msCancelRequestAnimationFrame     ||
		           clearTimeout
		} )();
		window.requestAnimFram = (function(){
			return window.requestAnimationFrame       ||
			       window.webkitRequestAnimationFrame ||
			       window.mozRequestAnimationFrame    ||
			       window.oRequestAnimationFrame      ||
			       window.msRequestAnimationFrame     ||
			       function(callback, element){
			       		window.setTimeout(callback, 1000/Game.frameRate);
			       };
		})();

		window.windowLoop = function(){
			Game.requestAnimFram = requestAnimFram(windowLoop);
			Game.gameLoop();
		}

		windowLoop();
	}

	/**
	* Para o Loop principal do jogo.
	*
	* @author Marcos Harbs
	* @method stopGame
	*/
	this.stopGame = function(){
		cancelRequestAnimFrame(Game.requestAnimFram);
		window.removeEventListener("click",      MouseSystem.fireClickListener);
		window.removeEventListener("mousedown",  MouseSystem.fireMouseDownListener);
		window.removeEventListener("mouseup",    MouseSystem.fireMouseUpListener);
		window.removeEventListener("mousemove",  MouseSystem.fireMouseMoveListener);
		window.removeEventListener("touchstart", MouseSystem.fireMouseDownListener);
		window.removeEventListener("touchmove",  MouseSystem.fireMouseMoveListener);
		window.removeEventListener("touchend",   MouseSystem.fireMouseUpListener);
		window.removeEventListener("keydown",    KeySystem.fireKeyDownListener);
		window.removeEventListener("keyup",      KeySystem.fireKeyUpListener);
	}
	
	/**
	* Loop principal do jogo.
	*
	* @author Marcos Harbs
	* @method gameLoop
	*/
	this.gameLoop = function(){
		var deltaTime = (Date.now() - this.lastUpdateTime) / 1000;
		if(!Game.paused){
			this.updateGame(deltaTime);
			this.stepGame();
			this.renderGame();
		}
		this.lastUpdateTime = Date.now();
	}

	/**
	* Chama o onUpdate dos componentes do jogo.
	*
	* @author Marcos Harbs
	* @method updateGame
	* @param {Float} deltaTima
	*/
	this.updateGame = function(deltaTime){
		LogicSystem.fireUpdateListener(deltaTime);
	}

	/**
	* Realiza as verficiações do mundo da Box2D
	* e dispara o evento de onCollide dos objetos
	* do jogo.
	*
	* @author Marcos Harbs
	* @method stepGame
	*/
	this.stepGame = function(){
		for(var i in this.scene.listLayers){
			var layer = this.scene.listLayers[i];
			if(layer instanceof Layer){
				layer.world.Step((1.0/60), 1);
			}
		}
		LogicSystem.fireCollideListener();
	}

	/**
	* Dispara o onRender dos componentes do jogo.
	*
	* @author Marcos Harbs
	* @method renderGame
	*/
	this.renderGame = function(){
		RenderSystem.fireRenderListener(this.context);
	}

	/**
	* Seta a cena atual.
	*
	* @author Marcos Harbs
	* @method setScene
	*/
	this.setScene = function(scene){
		this.scene = scene;
		this.loadScene();
	}

	/**
	* Carrega a cena atual.
	*
	* @author Marcos Harbs
	* @method loadScene
	*/
	this.loadScene = function(){
		this.scene.onLoad();
		for(var i in this.scene.listComponents){
			var component = this.scene.listComponents[i];
			if(component instanceof Component){
				component.onLoad();
			}
		}
		for(var i in this.scene.listLayers){
			var layer = this.scene.listLayers[i];
			if(layer instanceof Layer){
				layer.onLoad();
				for(var j in layer.listComponents){
					var component = layer.listComponents[j];
					if(component instanceof Component){
						component.onLoad();
					}
				}
				for(var j in layer.listGameObjects){
					var gameObject = layer.listGameObjects[j];
					if(gameObject instanceof GameObject){
						gameObject.onLoad();
						for(var k in gameObject.listComponents){
							var component = gameObject.listComponents[k];
							if(component instanceof Component){
								component.onLoad();
							}
						}
					}
				}
			}
		}
	}

}
