/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";  // Operate in Strict mode such that variables must be declared before used!

function StartUI() {
    //this.kUIButton = "assets/UI/button.png";
    this.kLogo1 = "assets/menu.png";

    // The camera to view the scene
    this.mCamera = null;
    this.mLogo = null;
    this.mMsg = null;
    this.mMsg = null;
    this.mOpCode = null;
    this.msg = "";
    this.mNextScene = null;
    
}

gEngine.Core.inheritPrototype(StartUI, Scene);

StartUI.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kLogo1);
    
};

// Load the scenes base on the value of mNextScene
StartUI.prototype.unloadScene = function () {
//    gEngine.Textures.unloadTexture(this.kLogo1);
    if (this.mNextScene == "PlayGame") {
        gEngine.Core.startScene(new PlayGame());
    } else if (this.mNextScene == "AuthorInfo") {
        gEngine.Core.startScene(new AuthorInfo());
    } else if (this.mNextScene == "GameRuleInfo") {
        gEngine.Core.startScene(new GameRuleInfo());
    } else if (this.mNextScene == "MainPage") {
        gEngine.Core.startScene(new MyGame());
    } 
};

StartUI.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 40), // position of the camera
        100,                     // width of camera
        [0, 0, 630, 630]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([1, 1, 1, 1]);
            // sets the background to gray
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
//  
//    // logo2
    this.mLogo = new TextureRenderable(this.kLogo1);
    this.mLogo.getXform().setPosition(50,39);
    this.mLogo.getXform().setSize(100,100);
    
//    // the message on the screen
//    this.mMsg = new FontRenderable("@404");
//    this.mMsg.setColor([0,0,0,1]);
//    this.mMsg.getXform().setPosition(80, 1);
//    this.mMsg.setTextHeight(4);
    
    this.mMsg = new FontRenderable("Status Message");
    this.mMsg.setColor([1, 1, 1, 1]);
    this.mMsg.getXform().setPosition(1, -5  );
    this.mMsg.setTextHeight(3);
        
};

StartUI.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0, 0.8, 0.6, 1.0]); // clear to light gray


    this.mCamera.setupViewProjection();
    this.mLogo.draw(this.mCamera);
    this.mMsg.draw(this.mCamera);

};



// this function will judge if the mouse clicks in the area of buttons.
StartUI.prototype.updateButton = function(posX, posY, radius) {
    var mouseX = gEngine.Input.getMousePosX();
    var mouseY = gEngine.Input.getMousePosY();
    
    var distance = (mouseX-posX)*(mouseX-posX) + (mouseY-posY)*(mouseY-posY);   
    if (radius*radius > distance) {
        return 1;
    }
}

StartUI.prototype.update = function () {
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Space)) {
        this.mNextScene = "MainPage";
        gEngine.GameLoop.stop();
    }

    // Judge which button the user has clicked.
    if (gEngine.Input.isButtonPressed(gEngine.Input.mouseButton.Left)) {

        // jump to the corresponding page when click the button.
        // Button 1: Play the game
        if (this.updateButton(469, 364, 96) == 1) {
            this.mNextScene = "PlayGame";
            gEngine.GameLoop.stop();   
        }
        
        // Button 2: How to play the game
        if (this.updateButton(122, 247, 80) == 1) {
            this.mNextScene = "GameRuleInfo";
            gEngine.GameLoop.stop();
        }
        
        // Button 3: The team information
        if (this.updateButton(413, 102, 50) == 1) {
            this.mNextScene = "AuthorInfo";
            gEngine.GameLoop.stop();
        }
        
    }

    // Display the location and button information
    if (this.updateButton(469, 364, 96) == 1) {
        this.mMsg.setText("  Play");
    } else if (this.updateButton(122, 247, 80) == 1) {
        this.mMsg.setText("  Rule");
    } else if (this.updateButton(413, 102, 50) == 1) {
        this.mMsg.setText("  Authors");
    } else {
        var msg = " X=" + gEngine.Input.getMousePosX() + " Y=" + gEngine.Input.getMousePosY();
        this.mMsg.setText(msg);
    }
  
    
};
