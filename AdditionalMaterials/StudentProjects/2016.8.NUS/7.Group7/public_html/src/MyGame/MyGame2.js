

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyGame2() {
    this.kMinionSprite = "assets/minion.png";
    this.kProjectileTexture = "assets/zidan.png";
    this.kStatus = "Status: ";
    // The camera to view the scene
    this.mCamera = null;
    this.mMsg = null;
    this.mMsg2 = null;
    this.mbackgg = null;
    this.backgg = "assets/backgg.png";
    this.backg = null;
    this.mHero = null;
    this.mPath = null;
    this.mDyePackSet = null;
    this.st = null;
    // Projectile.js has already been read in ...
    Projectile.kTexture = this.kProjectileTexture;
}
gEngine.Core.inheritPrototype(MyGame2, Scene);

MyGame2.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kMinionSprite);
    gEngine.Textures.loadTexture(this.kProjectileTexture);
    gEngine.Textures.loadTexture(this.backgg);
};

MyGame2.prototype.unloadScene = function () {  
    gEngine.Textures.unloadTexture(this.kMinionSprite);
    gEngine.Textures.unloadTexture(this.kProjectileTexture);
    gEngine.Textures.unloadTexture(this.backgg);
    if(this.st===0){
         var nextlevel= new Pass2();
    gEngine.Core.startScene(nextlevel);
    }
    else if (this.st===1){
    var nextlevel= new Fail();
    gEngine.Core.startScene(nextlevel);
    }
    
    
    
};
MyGame2.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 34),  // position of the camera
        150,                      // width of camera
        [0, 0, 1000, 700],        // viewport (orgX, orgY, width, height)
        2
    );
    this.mCamera.setBackgroundColor([0.3, 0.7, 0.7, 1]);
            // sets the background to gray
            
    gEngine.DefaultResources.setGlobalAmbientIntensity(3.6);
    this.mbackgg = new TextureRenderable(this.backgg);
    this.backg = new GameObject(this.mbackgg);
    this.backg.getXform().setSize(152, 135);
    this.backg.getXform().setPosition(50, 40);
    this.mMsg = new FontRenderable(this.kStatus);
    this.mMsg.setColor([0.7, 0.1, 0.1, 1]);
    this.mMsg.getXform().setPosition(90, -15);
    this.mMsg.setTextHeight(3);
     this.mMsg2 = new FontRenderable(this.kStatus);
    this.mMsg2.setColor([1, 1, 0.5, 1]);
    this.mMsg2.getXform().setPosition(-22, -15);
    this.mMsg2.setTextHeight(3);
    this.mPath = new LineSet();
    this.mHero = new Hero(this.kMinionSprite, this.mPath,40, -10);
    
    this.mDyePackSet = new DyePackSet2(this.kMinionSprite);
    
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame2.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    this.mCamera.setupViewProjection();
    this.backg.draw(this.mCamera);
    this.mMsg.draw(this.mCamera);
    this.mMsg2.draw(this.mCamera);
    this.mPath.draw(this.mCamera);
    
    this.mDyePackSet.draw(this.mCamera);
    this.mHero.draw(this.mCamera);
        
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame2.prototype.update = function () {
    this.mCamera.update();// to ensure proper interpolated movement effects
    
    this.mPath.update(this.mCamera);
    
   this.mHero.update(this.mDyePackSet, this.mCamera);
   
    this.mDyePackSet.update(this.mHero, this.mCamera);
    
    this.mMsg.setText(this.mHero.getStatus());
    this.mMsg2.setText("The Goal is Score reach 150!");

    if(gHighScore===150){
        this.st=0;
        gEngine.GameLoop.stop();
    }
    if(this.mHero.mHit===0){
        this.st=1;
       gEngine.GameLoop.stop();
       gHighScore = 0;
    }
};
