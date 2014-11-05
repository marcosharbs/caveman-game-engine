
var GamepadSystem = new function(){

  this.TYPICAL_BUTTON_COUNT = 16;
  this.TYPICAL_AXIS_COUNT = 4;
  this.ticking = false;
  this.gamepads = [];
  this.prevRawGamepadTypes = [];
  this.prevTimestamps = [];
  this.ANALOGUE_BUTTON_THRESHOLD = .5;
  this.STICK_OFFSET = 25;
  this.pressedButtons = new Array();

  this.init = function() {
    var gamepadSupportAvailable = !!navigator.webkitGetGamepads ||
        !!navigator.webkitGamepads ||
        (navigator.userAgent.indexOf('Firefox/') != -1);

    if (gamepadSupportAvailable) {
      window.addEventListener('MozGamepadConnected',
                              GamepadSystem.onGamepadConnect, false);
      window.addEventListener('MozGamepadDisconnected',
                              GamepadSystem.onGamepadDisconnect, false);

      if (!!navigator.webkitGamepads || !!navigator.webkitGetGamepads) {
        GamepadSystem.startPolling();
      }
    }
  }
  
  this.onGamepadConnect = function(event) {
    GamepadSystem.gamepads.push(event.gamepad);
    GamepadSystem.startPolling();
  }
  
  this.onGamepadDisconnect = function(event) {
    for (var i in GamepadSystem.gamepads) {
      if (GamepadSystem.gamepads[i].index == event.gamepad.index) {
        GamepadSystem.gamepads.splice(i, 1);
        break;
      }
    }
    if (GamepadSystem.gamepads.length == 0) {
      GamepadSystem.stopPolling();
    }
  }
  
  this.startPolling = function() {
    if (!GamepadSystem.ticking) {
      GamepadSystem.ticking = true;
      GamepadSystem.tick();
    }
  }
  
  this.stopPolling = function() {
    GamepadSystem.ticking = false;
  }
  
  this.tick = function() {
    GamepadSystem.pollStatus();
    GamepadSystem.scheduleNextTick();
  }
  
  this.scheduleNextTick = function() {
    if (GamepadSystem.ticking) {
      if (window.requestAnimationFrame) {
        window.requestAnimationFrame(GamepadSystem.tick);
      } else if (window.mozRequestAnimationFrame) {
        window.mozRequestAnimationFrame(GamepadSystem.tick);
      } else if (window.webkitRequestAnimationFrame) {
        window.webkitRequestAnimationFrame(GamepadSystem.tick);
      }
    }
  }
  
  this.pollStatus = function() {
    GamepadSystem.pollGamepads();

    for (var i in GamepadSystem.gamepads) {
      var gamepad = GamepadSystem.gamepads[i];
      if (gamepad.timestamp &&
          (gamepad.timestamp == GamepadSystem.prevTimestamps[i])) {
        continue;
      }
      GamepadSystem.prevTimestamps[i] = gamepad.timestamp;

      GamepadSystem.updateDisplay(i);
    }
  }
  
  this.pollGamepads = function() {
    var rawGamepads =
        (navigator.webkitGetGamepads && navigator.webkitGetGamepads()) ||
        navigator.webkitGamepads;

    if (rawGamepads) {
      GamepadSystem.gamepads = [];

      var gamepadsChanged = false;

      for (var i = 0; i < rawGamepads.length; i++) {
        if (typeof rawGamepads[i] != GamepadSystem.prevRawGamepadTypes[i]) {
          gamepadsChanged = true;
          GamepadSystem.prevRawGamepadTypes[i] = typeof rawGamepads[i];
        }

        if (rawGamepads[i]) {
          GamepadSystem.gamepads.push(rawGamepads[i]);
        }
      }
    }
  }
  
  this.updateDisplay = function(gamepadId) {
    var gamepad = GamepadSystem.gamepads[gamepadId];
	
	if(gamepad.buttons){
		GamepadSystem.updateButton(gamepad.buttons[0], gamepadId, 'button-1');
		GamepadSystem.updateButton(gamepad.buttons[1], gamepadId, 'button-2');
		GamepadSystem.updateButton(gamepad.buttons[2], gamepadId, 'button-3');
		GamepadSystem.updateButton(gamepad.buttons[3], gamepadId, 'button-4');

		GamepadSystem.updateButton(gamepad.buttons[4], gamepadId, 'button-left-shoulder-top');
		GamepadSystem.updateButton(gamepad.buttons[6], gamepadId, 'button-left-shoulder-bottom');
		GamepadSystem.updateButton(gamepad.buttons[5], gamepadId, 'button-right-shoulder-top');
		GamepadSystem.updateButton(gamepad.buttons[7], gamepadId, 'button-right-shoulder-bottom');

		GamepadSystem.updateButton(gamepad.buttons[8], gamepadId, 'button-select');
		GamepadSystem.updateButton(gamepad.buttons[9], gamepadId, 'button-start');

		GamepadSystem.updateButton(gamepad.buttons[10], gamepadId, 'stick-1');
		GamepadSystem.updateButton(gamepad.buttons[11], gamepadId, 'stick-2');

		GamepadSystem.updateButton(gamepad.buttons[12], gamepadId, 'button-dpad-top');
		GamepadSystem.updateButton(gamepad.buttons[13], gamepadId, 'button-dpad-bottom');
		GamepadSystem.updateButton(gamepad.buttons[14], gamepadId, 'button-dpad-left');
		GamepadSystem.updateButton(gamepad.buttons[15], gamepadId, 'button-dpad-right');
	}
	
	if(gamepad.axes){
		GamepadSystem.updateAxis(gamepad.axes[0], gamepadId, 'stick-1-axis-x', 'stick-1', true);
		GamepadSystem.updateAxis(gamepad.axes[1], gamepadId, 'stick-1-axis-y', 'stick-1', false);
		GamepadSystem.updateAxis(gamepad.axes[2], gamepadId, 'stick-2-axis-x', 'stick-2', true);
		GamepadSystem.updateAxis(gamepad.axes[3], gamepadId, 'stick-2-axis-y', 'stick-2', false);
	}
  }
  
  this.updateButton = function(value, gamepadId, id) {
    if (value > GamepadSystem.ANALOGUE_BUTTON_THRESHOLD) {
	  GamepadSystem.fireButtonPressed(id);
	  this.pressedButtons = ArrayUtils.addElement(this.pressedButtons, id);
    } else if(ArrayUtils.contains(this.pressedButtons, id)) {
    	this.pressedButtons = ArrayUtils.removeElement(this.pressedButtons, id);
	   GamepadSystem.fireButtonReleased(id);
    }
  }
  
  this.updateAxis = function(value, gamepadId, labelId, stickId, horizontal) {

	var offsetVal = value * GamepadSystem.STICK_OFFSET;

    if (horizontal) {
	    GamepadSystem.fireStickMoved(offsetVal, stickId, "HORIZONTAL");
	} else {
	    GamepadSystem.fireStickMoved(offsetVal, stickId, "VERTICAL");
    }

  }
  
  this.fireStickMoved = function(value, stick, direction){
  	ComponentUtils.fireComponentEvent(GamepadSystem.getListName(), "onStickMoved", [value, stick, direction]);
  }
	
  this.fireButtonPressed = function(button){
  	ComponentUtils.fireComponentEvent(GamepadSystem.getListName(), "onButtonPressed", [button]);
  }
  
  this.fireButtonReleased = function(button){
  	ComponentUtils.fireComponentEvent(GamepadSystem.getListName(), "onButtonReleased", [button]);
  }
  
  this.getTag = function(){
	return "GAMEPAD_SYSTEM";
  }

  this.getListName = function(){
		return "listComponentsGamepad";
	}

}

GamepadSystem.init();