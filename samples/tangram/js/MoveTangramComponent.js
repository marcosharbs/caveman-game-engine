function MoveTangramComponent(){}
MoveTangramComponent.prototype = new Component(); MoveTangramComponent.prototype.selectedPiece = null;
MoveTangramComponent.prototype.startX = 0;
MoveTangramComponent.prototype.startY = 0;
MoveTangramComponent.prototype.onMouseDown = function(x, y, wich){
    var point = MouseSystem.getNormalizedCoordinate(x, y);
    x = point.x;
    y = point.y;

    this.startX = x;
    this.startY = y;

    var selected = layer.queryGameObjects(x, y, 2, 2, 20);

    this.selectedPiece = selected[0] || null;

    if(this.selectedPiece == null){
      var go = null;
      if((x + y) % 2 == 0){
        go = new BoxObject().initialize(x, y, 40, 40, "white", "black");
      }else{
        go = new CircleObject().initialize(x, y, 20, "white", "black");  
      }  
    }else{
      if(ComponentUtils.getComponent(this.selectedPiece, "RIGID_BODY_COMPONENT").density == 0){
        this.selectedPiece = null;
      }
    }
  }
  MoveTangramComponent.prototype.onMouseUp = function(x, y, wich){
    this.startX = 0;
    this.startY = 0;
    this.selectedPiece = null;
  }
  MoveTangramComponent.prototype.onMouseMove = function(x, y, wich){
    if(this.selectedPiece != null){
      var point = MouseSystem.getNormalizedCoordinate(x, y);
      x = point.x;
      y = point.y;

      //movimentação
      var dx = (x - this.startX);
      var dy = (y - this.startY);

      this.selectedPiece.addMove(dx, dy);  

      this.startX = x;
      this.startY = y;
    }
  }
  MoveTangramComponent.prototype.onKeyDown = function(keyCode){
    if(keyCode == 69){
      if(this.selectedPiece != null){
        var rotate = ComponentUtils.getComponent(this.selectedPiece, "ROTATE_COMPONENT");
        var angle = rotate.getAngle() + (1/60);
        rotate.setRotate(angle);
      }
    }else if(keyCode == 70){
      if(this.selectedPiece != null){
        var rotate = ComponentUtils.getComponent(this.selectedPiece, "ROTATE_COMPONENT");
        var angle = rotate.getAngle() - (1/60);
        rotate.setRotate(angle);
      }
    }else if(keyCode == 71){
      if(layer.gravity == 0){
        layer.setGravity(1000);  
      }else{
        layer.setGravity(0);  
      }
    }
  }
  MoveTangramComponent.prototype.getSystems = function(){
    var systems = new Array();
    systems = ArrayUtils.addElement(systems, KeySystem.getTag());
    systems = ArrayUtils.addElement(systems, MouseSystem.getTag());
    return systems;
  }
  MoveTangramComponent.prototype.getTag = function(){
    return "MOVE_TANGRAM_COMPONENT";
  }