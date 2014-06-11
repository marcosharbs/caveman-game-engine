function StarBoxObject(){}

StarBoxObject.prototype = new GameObject();

JSUtils.addMethod(StarBoxObject.prototype, "initialize", 
	function(x, y, width){
		this.initialize(x, y, width, 16);
		ComponentUtils.addComponent(this, new TranslateComponent().initialize(0, 0));
		ComponentUtils.addComponent(this, new ScaleComponent().initialize(1, 1));
		ComponentUtils.addComponent(this, new RotateComponent().initialize(0));
                ComponentUtils.addComponent(this, new ImageRenderComponent().initialize(AssetStore.getAsset("mario-star-box").getAssetInstance(),
                                                                         true, 
                           						 "HORIZONTAL"));
                ComponentUtils.addComponent(this, new RigidBodyComponent().initialize(0,0,false,true,0.2));

		return this;
	}
);

StarBoxObject.prototype.createBodyShape = function(){
	var shape = new b2BoxDef();
	var xb = this.getWidth();
	var yb = this.getHeight();
	var scale = ComponentUtils.getComponent(this, "SCALE_COMPONENT");
	if(scale){
		xb *= Math.abs(scale.scalePoint.x);
		yb *= Math.abs(scale.scalePoint.y);
	}
	shape.extents.Set(xb/2, yb/2);
	return shape;
}

StarBoxObject.prototype.getTag = function(){
	return "STAR_BOX_OBJECT";
}