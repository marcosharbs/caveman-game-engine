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
		if(!object.listComponents){
			object.listComponents = new Array();
		}
		component.owner = object;
		object.listComponents = ArrayUtils.putElement(object.listComponents, component.getTag(), component);
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
		if(object.listComponents){
			object.listComponents = ArrayUtils.removeElementByKey(object.listComponents, component.getTag());
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