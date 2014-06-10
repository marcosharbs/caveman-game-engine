/**
* Classe com funções comuns para operações em Arrays.
*
* @author Marcos Harbs
* @class ArrayUtils
* @static
*/
﻿var ArrayUtils = new function(){

	/**
	* Método usado para adicionar um objeto a um Array
	* indexado por uma chave.
	*
	* @author Marcos Harbs
	* @method putElement
	* @static
	* @param {Array} array
	* @param {String} key
	* @param {Object} element 
	* @return {Array} array
	*/
	this.putElement = function(array, key, element){
		array[key] = element;
		return array;
	}

	/**
	* Método usado para remove um elemento do array pela chave.
	*
	* @author Marcos Harbs
	* @method removeElementByKey
	* @static
	* @param {Array} array
	* @param {String} key
	* @return {Array} array
	*/
	this.removeElementByKey = function(array, key){
		array[key] = undefined;
		return array;
	}

	/**
	* Retorna o objeto do array indexado pela chave.
	*
	* @author Marcos Harbs
	* @method getElementByKey
	* @static
	* @param {Array} array
	* @param {String} key
	* @return {Object} object
	*/
	this.getElementByKey = function(array, key){
		return array[key];
	}

	/**
	* Método usado para adicionar um objeto a um Array.
	*
	* @author Marcos Harbs
	* @method addElement
	* @static
	* @param {Array} array
	* @param {Object} element 
	* @return {Array} array
	*/	
	this.addElement = function(array, element){
		array.push(element);
		return array;
	}

	/**
	* Método usado para remover um objeto de um Array.
	*
	* @author Marcos Harbs
	* @method removeElement
	* @static
	* @param {Array} array
	* @param {Object} element 
	* @return {Array} array
	*/	
	this.removeElement = function(array, element){
		var indexOf = ArrayUtils.getIndexOf(array, element);
		//var rest = array.slice(indexOf + 1 || array.length);
		//array.length = indexOf < 0 ? array.length + indexOf : indexOf;
		//array.push.apply(array, rest);
		if(indexOf == -1){
			return array;
		}
		array.splice(indexOf, 1);
		return array;
	}

	/**
	* Método usado para retornar um objeto de um Array.
	*
	* @author Marcos Harbs
	* @method getElement
	* @static
	* @param {Array} array
	* @param {String} id 
	* @return {Object} element
	*/
	this.getElement = function(array, id){
		for(var i in array){
			var e = array[i];
			if(e.id == id){
				return e;
			}
		}
		return null;
	}

	/**
	* Método usado para retornar o index de um elemento em um Array.
	*
	* @author Marcos Harbs
	* @method getIndexOf
	* @static
	* @param {Array} array
	* @param {Object} element 
	* @return {Integer} index
	*/	
	this.getIndexOf = function(array, element){
		for(var i in array){
			var e = array[i];
			if(e.id == element.id){
				return i;
			}
		}
		return -1;
	}

	/**
	* Método usado para verificar se um elemento está contido em um Array.
	*
	* @author Marcos Harbs
	* @method contains
	* @static
	* @param {Array} array
	* @param {Object} element 
	* @return {Boolean} contains
	*/	
	this.contains = function(array, element){
		for(var i in array){
			var e = array[i];
			if(e == element){
				return true;
			}
		}
		return false;
	}

}