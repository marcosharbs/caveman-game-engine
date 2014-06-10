/**
* Classe que defini o comportamento de um Componente.
*
* @author Marcos Harbs
* @class Component
* @constructor
*/
function Component(){}

/**
* Método construtor da classe Component.
*
* @author Marcos Harbs
* @method initialize
* @param {GameObject} owner
* @return {Component} object
*/
JSUtils.addMethod(Component.prototype, "initialize", 
	function(){
		this.id = JSUtils.generateUUID();
		this.enabled = true;
		this.owner = null;
		return this;
	}
);

/**
* Envia uma mensagem para os outros componentes do objeto.
*
* @author Marcos Harbs
* @method sendLocalMessage
* @param {String} message
* @param {Object} extras 
*/
Component.prototype.sendLocalMessage = function(message, extras){
	if(this.owner.listComponents){
		for(var i in this.owner.listComponents){
			var component = this.owner.listComponents[i];
			if(component instanceof Component){
				component.receiveMessage(message, extras);
			}
		}
	}
}

/**
* Envia uma mensagem para os outros componentes do objeto de parâmetro.
*
* @author Marcos Harbs
* @method sendMessage
* @param {Object} object
* @param {String} message
* @param {Object} extras 
*/
Component.prototype.sendMessage = function(object, message, extras){
	if(object.listComponents){
		for(var i in object.listComponents){
			var component = object.listComponents[i];
			if(component instanceof Component){
				component.receiveMessage(message, extras);
			}
		}
	}
}

/**
* Retorna os sistemas que deverão gerenciar este component.
* (KEY_SYSTEM; LOGIC_SYSTEM; MOUSE_SYSTEM; RENDER_SYSTEM)
* Este método deve ser sobrescrito nas subclasses.
*
* @author Marcos Harbs
* @method getSystems
* @return {Array} systems
*/
Component.prototype.getSystems = function(){return null;}

/**
* Callback chamado quando algum componente enviar uma mensagem para este.
* Este método deve ser sobrescrito nas subclasses.
*
* @author Marcos Harbs
* @method onReceiveMessage
* @param {String} message
* @param {Object} extras
*/
Component.prototype.onReceiveMessage = function(message, extras){}

/**
* Callback chamado quando o usuário apertar uma tecla.
* Este método deve ser sobrescrito nas subclasses.
*
* @author Marcos Harbs
* @method onKeyDown
* @param {Integer} keyCode
*/
Component.prototype.onKeyDown = function(keyCode){}

/**
* Callback chamado quando o usuário soltar uma tecla.
* Este método deve ser sobrescrito nas subclasses.
*
* @author Marcos Harbs
* @method onKeyUp
* @param {Integer} keyCode
*/
Component.prototype.onKeyUp = function(keyCode){}

/**
* Callback chamado quando o usuário clicar com o mouse.
* Este método deve ser sobrescrito nas subclasses.
*
* @author Marcos Harbs
* @method onClick
* @param {Integer} x
* @param {Integer} y
* @param {Integer} wich
*/
Component.prototype.onClick = function(x, y, wich){}

/**
* Callback chamado quando o usuário pressionar o mouse.
* Este método deve ser sobrescrito nas subclasses.
*
* @author Marcos Harbs
* @method onMouseDown
* @param {Integer} x
* @param {Integer} y
* @param {Integer} wich
*/
Component.prototype.onMouseDown = function(x, y, wich){}

/**
* Callback chamado quando o usuário soltar o mouse.
* Este método deve ser sobrescrito nas subclasses.
*
* @author Marcos Harbs
* @method onMouseUp
* @param {Integer} x
* @param {Integer} y
* @param {Integer} wich
*/
Component.prototype.onMouseUp = function(x, y, wich){}

/**
* Callback chamado quando o usuário mover o mouse.
* Este método deve ser sobrescrito nas subclasses.
*
* @author Marcos Harbs
* @method onMouseMove
* @param {Integer} x
* @param {Integer} y
*/
Component.prototype.onMouseMove = function(x, y){}

/**
* Callback chamado antes do objeto ser renderizado.
* Este método deve ser sobrescrito nas subclasses.
*
* @author Marcos Harbs
* @method onBeforeRender
* @param {Context} context
*/
Component.prototype.onBeforeRender = function(context){}

/**
* Callback chamado quando o objeto for renderizado.
* Este método deve ser sobrescrito nas subclasses.
*
* @author Marcos Harbs
* @method onRender
* @param {Context} context
*/
Component.prototype.onRender = function(context){}

/**
* Callback chamado quando o objeto for atualizado.
* Este método deve ser sobrescrito nas subclasses.
*
* @author Marcos Harbs
* @method onUpdate
* @param {Long} delta
*/
Component.prototype.onUpdate = function(delta){}

/**
* Callback chamado quando o objeto colidir com outro objeto.
* Este método deve ser sobrescrito nas subclasses.
*
* @author Marcos Harbs
* @method onCollide
* @param {GameObject} otherGameObject
*/
Component.prototype.onCollide = function(otherGameObject){}

/**
* Callback chamado quando o component é carregado.
* Este método deve ser sobrescrito nas subclasses.
*
* @author Marcos Harbs
* @method onLoad
*/
Component.prototype.onLoad = function(){}

/**
* Callback chamado quando o component é destruído.
* Este método deve ser sobrescrito nas subclasses.
*
* @author Marcos Harbs
* @method onDestroy
*/
Component.prototype.onDestroy = function(){}

Component.prototype.onButtonPressed = function(button){}

Component.prototype.onButtonReleased = function(button){}

Component.prototype.onStickMoved = function(value, stick, direction){}

/**
* Retorna a tag deste objeto.
* Este método deve ser sobrescrito nas subclasses.
*
* @author Marcos Harbs
* @method getTag
* @return {String} tag
*/
Component.prototype.getTag = function(){return null;}