/**
* Classe que representa um objeto do jogo.
*
* @author Marcos Harbs
* @class GameObject
* @constructor
*/
function GameObject(){}

/**
* Método construtor da classe GameObject.
*
* @author Marcos Harbs
* @method initialize
* @param {Float} x
* @param {Float} y 
* @param {Float} width
* @param {Float} height  
* @return {GameObject} object
*/
JSUtils.addMethod(GameObject.prototype, "initialize", 
	function(x, y, width, height){
		this.id = JSUtils.generateUUID();
		this.origin = new Point2D().initialize(x, y);
		this.width = width;
		this.height = height;
		this.body = null;
		this.layer = null;
		this.listComponents = new Array();
		return this;
	}
);

/**
* Método executado quando o GameObject
* é carregado na cena.
*
* @author Marcos Harbs
* @method onLoad
*/
GameObject.prototype.onLoad = function(){}

/**
* Retorna a largura do objeto.
*
* @author Marcos Harbs
* @method getWidth
* @return {Float} width
*/
GameObject.prototype.getWidth = function(){
	if(!this.width || this.width == null){
		return 0;
	}
	return this.width;
}

/**
* Retorna a altura do objeto.
*
* @author Marcos Harbs
* @method getHeight
* @return {Float} height
*/
GameObject.prototype.getHeight = function(){
	if(!this.height || this.height == null){
		return 0;
	}
	return this.height;
}

/**
* Retorna o x central do objeto.
*
* @author Marcos Harbs
* @method getCenterX
* @return {Float} centerX
*/
GameObject.prototype.getCenterX = function(){
	if(!this.body || this.body == null){
		return this.origin.x;
	}
	if(this instanceof PolygonObject){
		return this.body.m_shapeList.m_body.m_position.x;
	}
	return this.body.m_position.x;
}

/**
* Retorna o y central do objeto.
*
* @author Marcos Harbs
* @method getCenterY
* @return {Float} centerY
*/
GameObject.prototype.getCenterY = function(){
	if(!this.body || this.body == null){
		return this.origin.y;
	}
	if(this instanceof PolygonObject){
		return this.body.m_shapeList.m_body.m_position.y;
	}
	return this.body.m_position.y;
}

/**
* Incrementa a posição do objeto.
*
* @author Marcos Harbs
* @method addMove
* @param {Float} x
* @param {Float} y
*/
GameObject.prototype.addMove = function(x, y){
	if(this.body){
		if(this instanceof PolygonObject){
			this.body.m_shapeList.m_body.m_position.x += x;
			this.body.m_shapeList.m_body.m_position.y += y;
		}else{
			this.body.m_position.x += x;
			this.body.m_position.y += y;
		}
	}else{
		this.origin.x += x;
		this.origin.y += y;
	}
}

/**
* Define a velocidade linear do objeto em x.
*
* @author Marcos Harbs
* @method setLinearVelocityX
* @param {Float} x
*/
GameObject.prototype.setLinearVelocityX = function(x){
	if(this.body){
		var linearVelocity = null;
		if(this instanceof PolygonObject){
			linearVelocity = this.body.m_shapeList.m_body.GetLinearVelocity();
		}else{
			linearVelocity = this.body.GetLinearVelocity();
		}
		linearVelocity.x = x;
	}
}

/**
* Define a velocidade linear do objeto em y.
*
* @author Marcos Harbs
* @method setLinearVelocityY
* @param {Float} y
*/
GameObject.prototype.setLinearVelocityY = function(y){
	if(this.body){
		var linearVelocity = null;
		if(this instanceof PolygonObject){
			linearVelocity = this.body.m_shapeList.m_body.GetLinearVelocity();
		}else{
			linearVelocity = this.body.GetLinearVelocity();
		}
		linearVelocity.y = y;
	}
}

/**
* Retorna o ângulo do objeto.
*
* @author Marcos Harbs
* @method getAngle
* @return {Float} angle
*/
GameObject.prototype.getAngle = function(){
	if(!this.body || this.body == null){
		var rotate = ComponentUtils.getComponent(this, "ROTATE_COMPONENT");
		if(rotate){
			return rotate.angle;
		}
		return 0;
	}
	if(this instanceof PolygonObject){
		return this.body.m_shapeList.m_body.m_rotation;
	}
	return this.body.m_rotation;
}

/**
* Cria a definição do corpo para a Box2D.
*
* @author Marcos Harbs
* @method createBodyDef
* @param {Float} x
* @param {Float} y
* @return {b2BodyDef} bodyDefinition
*/
GameObject.prototype.createBodyDef = function(x, y){
	var bodyDefinition = new b2BodyDef();
	bodyDefinition.userData = this;
	bodyDefinition.position.Set(x, y);
	return bodyDefinition;
}

/**
* Remove o GameObject do jogo.
*
* @author Marcos Harbs
* @method destroy
*/
GameObject.prototype.destroy = function(){
	for(var i in this.listComponents){
		var component = this.listComponents[i];
		if(component instanceof Component){
			component.onDestroy();
		}
	}
	this.layer.listGameObjects = ArrayUtils.removeElement(this.layer.listGameObjects, this);
}

/**
* Cria o formato do corpo para a Box2D.
* Este método deve ser sobrescrito nas subclasses.
*
* @author Marcos Harbs
* @method createBodyShape
* @return {b2ShapeDef} bodyShape
*/
GameObject.prototype.createBodyShape = function(){return null;}

/**
* Retorna a tag deste objeto.
* Este método deve ser sobrescrito nas subclasses.
*
* @author Marcos Harbs
* @method getTag
* @return {String} tag
*/
GameObject.prototype.getTag = function(){return null;}