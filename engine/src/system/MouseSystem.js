/**
* Classe responsável por propagar os eventos de mouse.
*
* @author Marcos Harbs
* @class MouseSystem
* @static
*/
var MouseSystem = new function(){

	/**
	* Método que normaliza a coordenada com base nas
	* transformações da câmera setada no jogo.
	*
	* @author Marcos Harbs
	* @method getNormalizedCoordinate
	* @static
	* @param {Float} x
	* @param {Float} y
	* @return {Point2D} normalizedCoordinate
	*/
	this.getNormalizedCoordinate = function(x, y){
		//aplica o deslocamento inverso
	    x -= -Game.camera.centerPoint.x+(Game.canvas.width/2);
	    y -= -Game.camera.centerPoint.y+(Game.canvas.height/2);

	    //aplica a escala inversa
	    x -= Game.camera.centerPoint.x; 
	    x /= Game.camera.scale.scalePoint.x;
	    x += Game.camera.centerPoint.x;

	    y -= Game.camera.centerPoint.y; 
	    y /= Game.camera.scale.scalePoint.y;
	    y += Game.camera.centerPoint.y;

	    //aplica a translação inversa
	    x -= Game.camera.translate.translatePoint.x;
	    y -= Game.camera.translate.translatePoint.y;

	    //aplica a rotação inversa
	    var sine = Math.sin(-Game.camera.rotate.angle);
	    var cosine = Math.cos(-Game.camera.rotate.angle);
	    x -= Game.camera.centerPoint.x;
	    y -= Game.camera.centerPoint.y;
	    var xn = x * cosine - y * sine;
	    var yn = x * sine + y * cosine;
	    x = xn + Game.camera.centerPoint.x;
	    y = yn + Game.camera.centerPoint.y;

	    //Retorna o coordenada normalizada
	    return new Point2D().initialize(x, y);
	}

	/**
	* Método usado para propagar o evento de click.
	*
	* @author Marcos Harbs
	* @method fireClickListener
	* @static
	* @param {Event} evt
	*/
	this.fireClickListener = function(evt){
		
		var x = evt.offsetX || evt.layerX;
		var y = evt.offsetY || evt.layerY;
		var wich = evt.wich;

		ComponentUtils.fireComponentEvent(MouseSystem.getListName(), "onClick", [x, y, wich]);
	}

	/**
	* Método usado para propagar o evento de mousedown.
	*
	* @author Marcos Harbs
	* @method fireMouseDownListener
	* @static
	* @param {Event} evt
	*/
	this.fireMouseDownListener = function(evt){
		
		var x = evt.offsetX || evt.layerX;
		var y = evt.offsetY || evt.layerY;
		var wich = evt.wich;

		ComponentUtils.fireComponentEvent(MouseSystem.getListName(), "onMouseDown", [x, y, wich]);
	}

	/**
	* Método usado para propagar o evento de mouseup.
	*
	* @author Marcos Harbs
	* @method fireMouseUpListener
	* @static
	* @param {Event} evt
	*/
	this.fireMouseUpListener = function(evt){

		var x = evt.offsetX || evt.layerX;
		var y = evt.offsetY || evt.layerY;
		var wich = evt.wich;

		ComponentUtils.fireComponentEvent(MouseSystem.getListName(), "onMouseUp", [x, y, wich]);
	}

	/**
	* Método usado para propagar o evento de mousemove.
	*
	* @author Marcos Harbs
	* @method fireMouseMoveListener
	* @static
	* @param {Event} evt
	*/
	this.fireMouseMoveListener = function(evt){

		var x = evt.offsetX || evt.layerX;
		var y = evt.offsetY || evt.layerY;

		ComponentUtils.fireComponentEvent(MouseSystem.getListName(), "onMouseMove", [x, y]);
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
		return "MOUSE_SYSTEM";
	}

	this.getListName = function(){
		return "listComponentsMouse";
	}

}

window.addEventListener("click",      MouseSystem.fireClickListener);
window.addEventListener("mousedown",  MouseSystem.fireMouseDownListener);
window.addEventListener("mouseup",    MouseSystem.fireMouseUpListener);
window.addEventListener("mousemove",  MouseSystem.fireMouseMoveListener);