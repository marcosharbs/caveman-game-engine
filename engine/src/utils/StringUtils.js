/**
* Classe com funções comuns para operações em Strings.
*
* @author Marcos Harbs
* @class StringUtils
* @static
*/
﻿var StringUtils = new function(){

	/**
	* Método usado substituir todas as ocorrências de um token 
	* em uma string.
	*
	* @author Marcos Harbs
	* @method replaceAll
	* @static
	* @param {String} string
	* @param {String} token
	* @param {String} newToken 
	* @return {String} string
	*/	
	this.replaceAll = function(string, token, newToken) {
		while (string.indexOf(token) != -1) {
	 		string = string.replace(token, newToken);
		}
		return string;
	}

}