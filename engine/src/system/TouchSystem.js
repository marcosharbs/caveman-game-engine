
var TouchSystem = new function(){

	this.fireTouchStartListener = function(evt) {
		if(evt.target.nodeName == "CANVAS"){
			evt.preventDefault();
		}
		if(evt.changedTouches && evt.changedTouches.length > 0) {
			ComponentUtils.fireComponentEvent(TouchSystem.getListName(), "onTouchStart", [evt.touches, evt.changedTouches]);
		}
	}

	this.fireTouchMoveListener = function(evt) {
		if(evt.target.nodeName == "CANVAS"){
			evt.preventDefault();
		}
		if(evt.changedTouches && evt.changedTouches.length > 0) {
			ComponentUtils.fireComponentEvent(TouchSystem.getListName(), "onTouchMove", [evt.touches, evt.changedTouches]);
		}
	}

	this.fireTouchEndListener = function(evt) {
		if(evt.target.nodeName == "CANVAS"){
			evt.preventDefault();
		}
		if(evt.changedTouches && evt.changedTouches.length > 0) {
			ComponentUtils.fireComponentEvent(TouchSystem.getListName(), "onTouchEnd", [evt.touches, evt.changedTouches]);
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
		return "TOUCH_SYSTEM";
	}

	this.getListName = function(){
		return "listComponentsTouch";
	}

}

window.addEventListener("touchstart", TouchSystem.fireTouchStartListener);
window.addEventListener("touchmove",  TouchSystem.fireTouchMoveListener);
window.addEventListener("touchend",   TouchSystem.fireTouchEndListener);