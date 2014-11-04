/**
* Componentel que movimenta a camera atual do jogo.
*
* @author Marcos Harbs
* @class MoveCameraComponent
* @constructor
*/
function MoveCameraComponent(){}

MoveCameraComponent.prototype = new Component();

/**
* Método construtor da classe MoveCameraComponent.
*
* @author Marcos Harbs
* @method initialize
* @param {Integer} leftKey
* @param {Integer} rightKey
* @param {Integer} upKey
* @param {Integer} downKey
* @param {Integer} zoomInKey
* @param {Integer} zoomOutKey
* @param {Integer} rotatetKey
* @param {Integer} rotatetInverseKey
* @param {Float} translateFactor
* @param {Float} scaleFactor
* @param {Float} rotateFactor
* @return {MoveCameraComponent} object
*/
JSUtils.addMethod(MoveCameraComponent.prototype, "initialize", 
  function(leftKey, 
           rightKey, 
           upKey, 
           downKey, 
           zoomInKey, 
           zoomOutKey,
           rotateKey,
           rotateInverseKey, 
           translateFactor, 
           scaleFactor,
           rotateFactor){

    this.initialize();
    this.leftKey = leftKey;
    this.rightKey = rightKey;
    this.upKey = upKey;
    this.downKey = downKey;
    this.zoomInKey = zoomInKey;
    this.zoomOutKey = zoomOutKey;
    this.rotateKey = rotateKey;
    this.rotateInverseKey = rotateInverseKey;
    this.translateFactor = translateFactor;
    this.scaleFactor = scaleFactor;
    this.rotateFactor = rotateFactor;
    return this;
  }
);

/**
  * Movimenta a camera com base na função escolhida.
  *
  * @author Marcos Harbs
  * @method fireKeyDownListener
  * @param {Float} keyCode
  */
MoveCameraComponent.prototype.onKeyDown = function(keyCode){
  if(keyCode == this.leftKey){
    Game.camera.centerPoint.x -= this.translateFactor;
  }else if(keyCode == this.rightKey){
    Game.camera.centerPoint.x += this.translateFactor;
  }else if(keyCode == this.upKey){
    Game.camera.centerPoint.y -= this.translateFactor;
  }else if(keyCode == this.downKey){
    Game.camera.centerPoint.y += this.translateFactor;
  }else if(keyCode == this.zoomInKey){
    Game.camera.scale.scalePoint.x += this.scaleFactor;
    Game.camera.scale.scalePoint.y += this.scaleFactor;
  }else if(keyCode == this.zoomOutKey){
    Game.camera.scale.scalePoint.x -= this.scaleFactor;
    Game.camera.scale.scalePoint.y -= this.scaleFactor;
    if(Game.camera.scale.scalePoint.x < 0){
      Game.camera.scale.scalePoint.x = 0;
      Game.camera.scale.scalePoint.y = 0;
    }
  }else if(keyCode == this.rotateKey){
    Game.camera.rotate.angle += (Math.PI * this.rotateFactor / 180);
  }else if(keyCode == this.rotateInverseKey){
    Game.camera.rotate.angle -= (Math.PI * this.rotateFactor / 180);
  }  
}

/**
* Retorna os sistemas que deverão gerenciar este component.
* (KEY_SYSTEM; LOGIC_SYSTEM; MOUSE_SYSTEM; RENDER_SYSTEM)
*
* @author Marcos Harbs
* @method getSystems
* @return {Array} systems
*/
MoveCameraComponent.prototype.getSystems = function(){
  var systems = new Array();
  systems = ArrayUtils.addElement(systems, KeySystem);
  return systems;
}

/**
* Método sobrescrito da classe Component.
*
* @author Marcos Harbs
* @method getTag
* @return {String} tag
*/
MoveCameraComponent.prototype.getTag = function(){
  return "MOVE_CAMERA_COMPONENT";
}