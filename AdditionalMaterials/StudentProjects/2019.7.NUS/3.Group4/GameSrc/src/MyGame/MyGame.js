    /*
     * File: MyGame.js 
     * This is the logic of our game. 
     */

    /*jslint node: true, vars: true */
    /*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
      FontRenderable, SpriteRenderable, LineRenderable,
      GameObject */
    /* find out more about jslint: http://www.jslint.com/help.html */

    "use strict";  // Operate in Strict mode such that variables must be declared before used!

    function MyGame() {
        //this.kUIButton = "assets/UI/button.png";
        this.kLogo = "assets/logo.png";

        // The camera to view the scene
        this.mCamera = null;
        this.mLogo = null;
        this.mSpark = null;
        // For the state of spark
        this.mSign = null;
        // For echo message
        this.mMsg = null;
        this.mCaption = null;
        
        
    }
    gEngine.Core.inheritPrototype(MyGame, Scene);


    MyGame.prototype.loadScene = function () {
        gEngine.Textures.loadTexture(this.kLogo);
    };

    MyGame.prototype.unloadScene = function () {
        gEngine.Textures.unloadTexture(this.kLogo);
        gEngine.Core.startScene(new StartUI());   
    };

    MyGame.prototype.initialize = function () {
        
        // set up the cameras
        this.mCamera = new Camera(
            vec2.fromValues(50, 40), // position of the camera
            100,                     // width of camera
            [0, 0, 630, 630]         // viewport (orgX, orgY, width, height)
        );
        this.mCamera.setBackgroundColor([0, 0, 0, 1]);
        
        // set up the cameras
        this.mCamera2 = new Camera(
            vec2.fromValues(50, 40), // position of the camera
            100,                     // width of camera
            [0, 0, 80, 80]         // viewport (orgX, orgY, width, height)
        );
        this.mCamera2.setBackgroundColor([0, 0.8, 0, 1]);
        
 
        // What is this ??????????
        gEngine.DefaultResources.setGlobalAmbientIntensity(3);


        // initialize the game logo
        this.mLogo = new TextureRenderable(this.kLogo);
        this.mLogo.getXform().setPosition(50,40);
        this.mLogo.getXform().setSize(50,50);
        
        // initialize the spark
        this.mSpark = new Renderable();
        this.mSpark.setColor([1,0.98,0.85,1]);
        this.mSpark.getXform().setPosition(56.4, 54.8);
        this.mSpark.getXform().setRotationInRad(0.78); // In Radians
        this.mSpark.getXform().setSize(1.5,1.5);
        
        // initialize the sign of spark and the message
        this.mSign = 1;
        this.mMsg2 = new FontRenderable("- PRESS ENTER TO START -");
        this.mMsg2.setColor([1,1,1,1]);
        this.mMsg2.getXform().setPosition(37, 9);
        this.mMsg2.setTextHeight(2);
        
        

        
        


    };

    // This is the draw function, make sure to setup proper drawing environment, and more
    // importantly, make sure to _NOT_ change any state.
    MyGame.prototype.draw = function () {
        // Step A: clear the canvas
        gEngine.Core.clearCanvas([0., 0.8, 0.6, 1.0]); // clear to light gray


        this.mCamera.setupViewProjection();
        this.mLogo.draw(this.mCamera);
//        this.mSpark.draw(this.mCamera);
//      this.mMsg.draw(this.mCamera);
        this.mMsg2.draw(this.mCamera);
        
        this.mCaption.draw(this.mCamera);
        
//        this.mCamera2.setupViewProjection();
//        this.mLogo.draw(this.mCamera2);
//        this.mSpark.draw(this.mCamera2);
////      this.mMsg.draw(this.mCamera);
//        this.mMsg2.draw(this.mCamera2);
        

        
        
    };

    MyGame.prototype.update = function () {
        
        this.mCamera.update();
        this.mCamera2.update();
        
        // For test
//        gEngine.GameLoop.stop();

        
        // Update the size and color of the spark
        var temp = this.mSpark.getXform().getWidth();
        var miniChange = 0.01;
        if (temp > 3) {
            this.mSign = 0;
        }
        
        if (temp < 1.5) {
            this.mSign = 1;
        }
        
        if (this.mSign == 0) {
            this.mSpark.getXform().setSize(temp-miniChange, temp-miniChange);
            this.mSpark.setColor([temp/5,temp/3,temp/4,1])
        } else {
            this.mSpark.getXform().setSize(temp+miniChange, temp+miniChange);
            this.mSpark.setColor([temp/3,temp/4,temp/5,1])
        } 
        
        
        // switch to start UI when press ENTER
        if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter)) {
            gEngine.GameLoop.stop();
        }
        

    };

