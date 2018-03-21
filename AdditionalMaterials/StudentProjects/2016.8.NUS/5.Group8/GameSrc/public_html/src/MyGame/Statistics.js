/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function Statistics(text) {
    this.heroTexture1 = "assets/Hero1.1.png";
    this.heroTexture2 = "assets/Hero2.1.png";
    // The camera to view the scene
    this.mCamera = null;
    this.mMsg = null;
    this.text=text;
}
gEngine.Core.inheritPrototype(Statistics, Scene);

Statistics.prototype.loadScene = function () {
};


Statistics.prototype.unloadScene = function() {
    // Step B: starts the next level
    // starts the next level
    var start = new ChooseHero();  // next level to be loaded
    gEngine.Core.startScene(start);
};

Statistics.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(80, 45), // position of the camera
        160,                        // width of camera
        [0, 0, 1280, 720],         // viewport (orgX, orgY, width, height)
        2
    );
    
    this.mCamera.setBackgroundColor([0, 0.75, 1, 1]);

    this.mMsg = new FontRenderable("This is splash screen");
    this.mMsg.setColor([1, 0, 0, 1]);
    this.mMsg.getXform().setPosition(16, 80);
    this.mMsg.setTextHeight(5);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
Statistics.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    this.mCamera.setupViewProjection();
    this.mMsg.setText(this.text);
    this.mMsg.getXform().setPosition(64,70);
    this.mMsg.draw(this.mCamera);
    this.mMsg.setText("Thank you for playing!");
    this.mMsg.getXform().setPosition(50, 60);
    this.mMsg.draw(this.mCamera);;
    this.mMsg.setText("Press <R> to Restart");
    this.mMsg.getXform().setPosition(52, 45);
    this.mMsg.draw(this.mCamera);
    
    this.mMsg.setText("Group8 Teamwork! !");
    this.mMsg.getXform().setPosition(56, 30);
    this.mMsg.draw(this.mCamera);
    
    this.mMsg.setText("Producted By Min Tianchen, Xiong Zi and Tang Li");
    this.mMsg.getXform().setPosition(10, 15);
    this.mMsg.draw(this.mCamera);
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
Statistics.prototype.update = function () {
    
    // select which character to work with
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.R))
    {
        gEngine.GameLoop.stop();
    }
};




