/**
* Classe que defini uma camada de uma cena.
*
* @author Marcos Harbs
* @class Layer
* @constructor
*/
function Layer(){}

/**
* Método construtor da classe Layer.
*
* @author Marcos Harbs
* @method initialize
* @return {Layer} object
*/
JSUtils.addMethod(Layer.prototype, "initialize", 
	function(){
		this.id = JSUtils.generateUUID();
		this.scene = null;
		this.world = null;
		this.gravity = 1000;
		this.doSleep = true;
		this.listComponents = new Array();
		this.listGameObjects = new Array();
		return this;
	}
);

/**
* Faz uma query no mundo da Box2D e retorna os 
* objetos selecionados.
*
* @author Marcos Harbs
* @method queryGameObjects
* @param {Float} x
* @param {Float} y
* @param {Float} w
* @param {Float} h
* @param {Float} max
* @return {Array} gameObjects
*/
Layer.prototype.queryGameObjects = function(x, y, w, h, max){
	var aabb = new b2AABB();
    var shapes = [];
    var gameObjects = [];
    aabb.minVertex.Set(x-w/2, y-h/2);
    aabb.maxVertex.Set(x+w/2, y+h/2);
    this.world.Query(aabb, shapes, max);
    if(shapes.length > 0){
      for(var i=0; i<shapes.length; i++){
        if(shapes[i].TestPoint(new b2Vec2(x, y))){
        	gameObjects[gameObjects.length] = shapes[i].m_body.m_userData;  
        }
      }
    }
    return gameObjects;
}

/**
* Muda a gravidade do mundo da Box2D.
*
* @author Marcos Harbs
* @method setGravity
* @param {Float} gravity
*/
Layer.prototype.setGravity = function(gravity){
	this.gravity = gravity;
	if(this.world){
		this.world.m_gravity.y = gravity;
		var velocity = 1;
		if(gravity == 0){
			velocity = 0;
		}
		for(var i in this.listGameObjects){
          var go = this.listGameObjects[i];
          if(go instanceof GameObject){
            if(go.body){
            	go.body.m_shapeList.m_body.m_angularDamping = velocity;
              	go.body.m_shapeList.m_body.m_linearDamping = velocity;
            }
          }
        }
	}
}

/**
* Adicona um objeto na camada.
*
* @author Marcos Harbs
* @method addGameObject
* @param {GameObject} gameObject
*/
Layer.prototype.addGameObject = function(gameObject){
	this.listGameObjects = ArrayUtils.addElement(this.listGameObjects, gameObject);
	gameObject.layer = this;
	if(Game.running){
		gameObject.recreateBody = true;
	}
}

/**
* Remove um objeto da camada.
*
* @author Marcos Harbs
* @method removeGameObject
* @param {GameObject} gameObject
*/
Layer.prototype.removeGameObject = function(gameObject){
	this.listGameObjects = ArrayUtils.removeElement(this.listGameObjects, gameObject);
}

/**
* Callback chamado quando a camada é carregada.
*
* @author Marcos Harbs
* @method onLoad
*/
Layer.prototype.onLoad = function(){
	var worldAABB = new b2AABB();
	worldAABB.minVertex.Set(this.scene.minPoint.x, this.scene.minPoint.y);
	worldAABB.maxVertex.Set(this.scene.maxPoint.x, this.scene.maxPoint.y);
	var worldGravity = new b2Vec2(0, this.gravity);
	this.world = new b2World(worldAABB, worldGravity, this.doSleep);
	var listener = new b2WorldListener();
	listener.NotifyBoundaryViolated = function(b){
		var go = b.GetUserData();
		go.layer.removeGameObject(go);
		return 1;
	};
	this.world.SetListener(listener);
}