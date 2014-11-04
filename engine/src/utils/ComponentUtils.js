/**
* Classe com funções comuns para operações em Componentes.
*
* @author Marcos Harbs
* @class ComponentUtils
* @static
*/
var ComponentUtils = new function(){

	/**
	* Método usado para adicionar um novo
	* componente a um objeto.
	*
	* @author Marcos Harbs
	* @method addComponent
	* @static
	* @param {Object} object
	* @param {Component} component
	*/
	this.addComponent = function(object, component){
		var systems = component.getSystems();
		for(var i=0; i<systems.length; i++){
			var system = systems[i];
			if(!object[system.getListName()]){
				object[system.getListName()] = new Array();
			}
			object[system.getListName()] = ArrayUtils.putElement(object[system.getListName()], 
																 component.getTag(), 
																 component);
		}
		if(!object.listComponents){
			object.listComponents = new Array();
		}
		object.listComponents = ArrayUtils.putElement(object.listComponents, 
													  component.getTag(), 
													  component);
		component.owner = object;
	}

	/**
	* Método usado para remover um
	* componente de um objeto.
	*
	* @author Marcos Harbs
	* @method removeComponent
	* @static
	* @param {Object} object
	* @param {Component} component
	*/
	this.removeComponent = function(object, component){
		var systems = component.getSystems();
		for(var i=0; i<systems.length; i++){
			var system = systems[i];
			if(object[system.getListName()]){
				object[system.getListName()] = ArrayUtils.removeElementByKey(object[system.getListName()], 
					                                                         component.getTag());
			}
		}
		if(object.listComponents){
			object.listComponents = ArrayUtils.removeElementByKey(object.listComponents, 
					                                              component.getTag());
		}
	}

	/**
	* Método usado para recuperar 
	* um componente de um objeto.
	*
	* @author Marcos Harbs
	* @method getComponent
	* @static
	* @param {Object} object
	* @param {String} tag
	* @return {Component} component
	*/
	this.getComponent = function(object, tag){
		if(object.listComponents){
			return ArrayUtils.getElementByKey(object.listComponents, tag);
		}
	}

}
