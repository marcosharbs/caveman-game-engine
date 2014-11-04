/**
* Componente usado para medir o frame rate do jogo.
*
* @author Marcos Harbs
* @class FpsMeterComponent
* @constructor
*/
function FpsMeterComponent(){}

FpsMeterComponent.prototype = new Component();

FpsMeterComponent.prototype.fpsCount = 0;
FpsMeterComponent.prototype.currentFps = 0;
FpsMeterComponent.prototype.lastUpdate = 0;

/**
* Retorna os sistemas que deverão gerenciar este component.
* (KEY_SYSTEM; LOGIC_SYSTEM; MOUSE_SYSTEM; RENDER_SYSTEM)
*
* @author Marcos Harbs
* @method getSystems
* @return {Array} systems
*/
FpsMeterComponent.prototype.getSystems = function(){
	var systems = new Array();
	systems = ArrayUtils.addElement(systems, RenderSystem);
	return systems;
}

/**
* Método sobrescrito da classe Component.
*
* @author Marcos Harbs
* @method onBeforeRender
* @param {Context} context
*/
FpsMeterComponent.prototype.onBeforeRender = function(context){}

/**
* Método sobrescrito da classe Component.
*
* @author Marcos Harbs
* @method onRender
* @param {Context} context
*/
FpsMeterComponent.prototype.onRender = function(context){
	var now = Date.now();
	if((now - this.lastUpdate)/1000 >= 1){
		this.currentFps = this.fpsCount;
		this.fpsCount = 0;
		this.lastUpdate = now;
	}
	this.fpsCount++;
	context.fillStyle = "red";
	context.font = "bold 20px Arial";
	context.fillText("FPS: "+this.currentFps, 20, 30);
}


/**
* Método sobrescrito da classe Component.
*
* @author Marcos Harbs
* @method getTag
* @return {String} tag
*/
FpsMeterComponent.prototype.getTag = function(){
	return "FPS_METER_COMPONENT";
}