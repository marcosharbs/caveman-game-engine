/**
* Classe que representa um objeto do tipo polígono.
*
* @author Marcos Harbs
* @class PolygonObject
* @constructor
*/
function PolygonObject(){}

PolygonObject.prototype = new GameObject();

/**
* Método construtor da classe PolygonObject.
*
* @author Marcos Harbs
* @method initialize
* @param {Float} x
* @param {Float} y 
* @param {Array<Point2D>} points 
* @param {String} fillStyle 
* @param {String} fillStroke 
* @return {PolygonObject} object
*/
JSUtils.addMethod(PolygonObject.prototype, "initialize", 
	function(x, y, points, fillStyle, fillStroke){
		this.initialize(x, y, 0, 0);
		this.points = points;
		ComponentUtils.addComponent(this, new PolygonRenderComponent().initialize(fillStyle, fillStroke));
		ComponentUtils.addComponent(this, new ScaleComponent().initialize(1, 1));
		ComponentUtils.addComponent(this, new TranslateComponent().initialize(0, 0));
		ComponentUtils.addComponent(this, new RotateComponent().initialize(0));
		return this;
	}
);

/**
* Cria o formato do corpo para a Box2D.
*
* @author Marcos Harbs
* @method createBodyShape
* @return {b2ShapeDef} bodyShape
*/
PolygonObject.prototype.createBodyShape = function(){
	var shape = new b2PolyDef();
	shape.vertexCount = this.points.length;
	var scale = ComponentUtils.getComponent(this, "SCALE_COMPONENT");
	for(var i=0; i<shape.vertexCount; i++){
		var point = this.points[i];
		if(scale){
			shape.vertices[i].Set(point.x * Math.abs(scale.scalePoint.x), 
				                  point.y * Math.abs(scale.scalePoint.y));
		}else{
			shape.vertices[i].Set(point.x, point.y);
		}
	}
	return shape;
}

/**
* Retorna os pontos do polígono.
*
* @author Marcos Harbs
* @method getPoints
* @return {Array<Point2D>} radius
*/
PolygonObject.prototype.getPoints = function(){
	if(this.body){
		var poly = this.body.m_shapeList;
		var newPoints = [];
		for(var i=0; i<poly.m_vertexCount; i++){
			var v = b2Math.AddVV(poly.m_position, b2Math.b2MulMV(poly.m_R, poly.m_vertices[i]));
			newPoints[i] = new Point2D().initialize(v.x, v.y);
		}
		return newPoints;
	}
	return this.points;
}

/**
* Retorna a tag deste objeto.
*
* @author Marcos Harbs
* @method getTag
* @return {String} tag
*/
PolygonObject.prototype.getTag = function(){
	return "POLYGON_OBJECT";
}