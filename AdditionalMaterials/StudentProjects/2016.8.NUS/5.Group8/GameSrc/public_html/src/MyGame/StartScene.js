/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function SuperMe() {
    // The camera to view the scene
    this.mCamera = null;
    this.mMsg = null;
}
gEngine.Core.inheritPrototype(SuperMe, Scene);


SuperMe.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 50), // position of the camera
        100,                        // width of camera
        [0, 0, 1280, 720],         // viewport (orgX, orgY, width, height)
        2
    );
    this.mCamera.setBackgroundColor([0.753, 1, 0.243, 1]);

    this.mMsg = new FontRenderable("This is splash screen");
    this.mMsg.setColor([0, 0, 0, 1]);
    this.mMsg.getXform().setPosition(10, 50);
    
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
SuperMe.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    
    this.mCamera.setupViewProjection();
    this.mMsg.setTextHeight(5);
    this.mMsg.setText("Welcome to ShotoWin!");
    this.mMsg.getXform().setPosition(25, 75);
    this.mMsg.draw(this.mCamera);
    
    this.mMsg.setTextHeight(4);
    this.mMsg.setText("Player 1: WASD");
    this.mMsg.getXform().setPosition(24, 65);
    this.mMsg.draw(this.mCamera);
    this.mMsg.setText("Shot: Space  Gift: E");
    this.mMsg.getXform().setPosition(24, 60);
    this.mMsg.draw(this.mCamera);
    
    this.mMsg.setText("Player 2: Arrows");
    this.mMsg.getXform().setPosition(24, 50);
    this.mMsg.draw(this.mCamera);
    this.mMsg.setText("Shot: L     Gift: K");
    this.mMsg.getXform().setPosition(24, 45);
    this.mMsg.draw(this.mCamera);
    
    this.mMsg.setTextHeight(3);
    this.mMsg.setColor([1, 0, 0, 1]);
    this.mMsg.setText("Remember! You can jump twice! ");
    this.mMsg.getXform().setPosition(26, 40);
     this.mMsg.draw(this.mCamera);

    
    this.mMsg.setTextHeight(5);
    this.mMsg.setColor([0, 0, 0, 1]);
    this.mMsg.setText("Press <C> to Continue");
    this.mMsg.getXform().setPosition(18, 30);
    this.mMsg.draw(this.mCamera);
    this.mMsg.setText("Good Luck!");
    this.mMsg.getXform().setPosition(40, 20);
    this.mMsg.draw(this.mCamera);
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
SuperMe.prototype.update = function () {
    
    // select which character to work with
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.C))
    {
        gEngine.GameLoop.stop();
    }
};


SuperMe.prototype.unloadScene = function() {
    // Step B: starts the next level
    // starts the next level
    var choose = new ChooseHero();  // next level to be loaded
    gEngine.Core.startScene(choose);
};

