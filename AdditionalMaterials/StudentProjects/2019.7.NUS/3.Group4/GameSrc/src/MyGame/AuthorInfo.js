/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";  // Operate in Strict mode such that variables must be declared before used!

function AuthorInfo() {
    //this.kUIButton = "assets/UI/button.png";
    this.kLogo = "assets/team.png";

    // The camera to view the scene
    this.mCamera = null;
    this.mLogo = null;

}

gEngine.Core.inheritPrototype(AuthorInfo, Scene);

AuthorInfo.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kLogo);
    
};

AuthorInfo.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kLogo);
    gEngine.Core.startScene(new StartUI());
};


AuthorInfo.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 40), // position of the camera
        100,                     // width of camera
        [0, 0, 630, 630]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([1, 1, 1, 1]);
            // sets the background to gray
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);

    // logo2
    this.mLogo = new TextureRenderable(this.kLogo);
    this.mLogo.getXform().setPosition(50,40);
    this.mLogo.getXform().setSize(100,100);
     
        
};

AuthorInfo.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0, 0.8, 0.6, 1.0]); // clear to light gray
    this.mCamera.setupViewProjection();
    this.mLogo.draw(this.mCamera);

};

AuthorInfo.prototype.update = function () {
    
    
    
    this.mCamera.update();  // for smoother camera movements
           
    if (gEngine.Input.isButtonPressed(gEngine.Input.mouseButton.Middle)) {
        gEngine.GameLoop.stop();   
    }

};
