/* 
 * The template for a scene.
 */

/*jslint node: true, vars: true */
/*global gEngine: false, Transform: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

// Constructor
function Start() {
    this.mCamera = null;
    this.msg = null;
    this.msg2 = null;
    this.msg3 = null;
    this.kstatus = "Status: ";
}
gEngine.Core.inheritPrototype(Start, Scene);

Start.prototype.loadScene = function () {};
Start.prototype.unloadScene = function () {
    var MyGame1= new MyGame();
    gEngine.Core.startScene(MyGame1);
};
Start.prototype.initialize = function () {
    this.mCamera = new Camera(
		vec2.fromValues(50, 40),    // position of the camera
		150,                        // camera width
		[0, 0, 1000, 700]            // viewport (orgX, orgY, width, height)
	);
	// set the background color of our view to medium grey
	this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1.0]);
        
    
        this.msg = new FontRenderable(this.kstatus);
	this.msg.setColor([0.5, 1, 1, 1]);
	this.msg.getXform().setPosition(20, 60);
	this.msg.setTextHeight(10);
       
        
        this.msg2 = new FontRenderable(this.kstatus);
	this.msg2.setColor([1, 1, 0.5, 1]);
	this.msg2.getXform().setPosition(5, 30);
	this.msg2.setTextHeight(5);
        
        this.msg3 = new FontRenderable(this.kstatus);
	this.msg3.setColor([1, 1, 0.5, 1]);
	this.msg3.getXform().setPosition(20, 10);
	this.msg3.setTextHeight(5);
        
	gEngine.DefaultResources.setGlobalAmbientIntensity(5);
};

Start.prototype.update = function () {
    
    this.msg.setText("Plane Fight");
    this.msg2.setText("Press the P and start this game!");
    this.msg3.setText("Move: WASD Shoot: J");
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.P)){
        gEngine.GameLoop.stop();
    }
};

Start.prototype.draw = function () {
        gEngine.Core.clearCanvas([0.8, 0.8, 0.8, 1.0]);
	this.mCamera.setupViewProjection();
        this.msg.draw(this.mCamera);
        this.msg2.draw(this.mCamera);
        this.msg3.draw(this.mCamera);
};


