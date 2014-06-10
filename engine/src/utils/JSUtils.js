/**
* Classe com funções Javascript comuns.
*
* @author Marcos Harbs
* @class JSUtils
* @static
*/
var JSUtils = new function(){
	
	/**
	* Método usado para sobrecarga de funções Javascript.
	* By John Resig (MIT Licensed)
	*
	* @author John Resig
	* @method addMethod
	* @static
	* @param {Prototype} object
	* @param {String} name
	* @param {Function} fn 
	* @return {Function} function
	*/	
	this.addMethod = function(object, name, fn){
		var old = object[ name ];
		if ( old )
			object[ name ] = function(){
				if ( fn.length == arguments.length )
					return fn.apply( this, arguments );
				else if ( typeof old == 'function' )
					return old.apply( this, arguments );
			};
		else
		object[ name ] = fn;
	}

	/**
	* Método usado gerar um id universal único.
	*
	* @author Marcos Harbs
	* @method generateUUID
	* @static 
	* @return {String} uuid
	*/
	this.generateUUID = function(){
		var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
			return v.toString(16);
		});
		return uuid;
	}

}