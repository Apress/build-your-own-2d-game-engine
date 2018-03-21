/* 
 * The template for a scene.
 */

/*jslint node: true, vars: true */
/*global gEngine: false, Transform: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

// Constructor
function Pass2() {
    this.mCamera = null;
    this.msg = null;
    this.msg2 = null;
}
gEngine.Core.inheritPrototype(Pass2, Scene);

Pass2.prototype.loadScene = function () {};
Pass2.prototype.unloadScene = function () {
    var nextlevel= new Boss();
    gEngine.Core.startScene(nextlevel);
};
Pass2.prototype.initialize = function () {
    this.mCamera = new Camera(
		vec2.fromValues(50, 40),    // position of the camera
		150,                        // camera width
		[0, 0, 1000, 700]            // viewport (orgX, orgY, width, height)
	);
	// set the background color of our view to medium grey
	this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1.0]);
        
    
        this.msg = new FontRenderable("Sample Text");
	this.msg.setColor([0.5, 1, 1, 1]);
	this.msg.getXform().setPosition(20, 60);
	this.msg.setTextHeight(10);
       
        
        this.msg2 = new FontRenderable("Sample Text");
	this.msg2.setColor([1, 1, 0.5, 1]);
	this.msg2.getXform().setPosition(17, 30);
	this.msg2.setTextHeight(5);
        this.msg.setText("level 2 pass");
        this.msg2.setText("Press P to the level 3!");
	gEngine.DefaultResources.setGlobalAmbientIntensity(5);
};

Pass2.prototype.update = function () {
    
    
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.P)){
        gEngine.GameLoop.stop();
    }
};

Pass2.prototype.draw = function () {
        gEngine.Core.clearCanvas([0.8, 0.8, 0.8, 1.0]);
	this.mCamera.setupViewProjection();
        this.msg.draw(this.mCamera);
        this.msg2.draw(this.mCamera);
};


