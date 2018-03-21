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


function WinScreen() {
     // audio clips: supports both mp3 and wav formats
    this.kBgBlueLandBG = "assets/blue_land.png";
    this.randomObjects = "assets/spritesheet_enemies.png";
    this.keysheet = "assets/spritesheet_hud.png";



    // The camera to view the scene
    this.mCamera = null;
    this.mBg = null;
    
    this.mMsg = null;
    this.mMsg2 = null;
    
    this.mNextScene = false;
    
    this.mBlink = 0;
    
    this.mFlyingThings = null;
    
    this.cycles = 0;


}
gEngine.Core.inheritPrototype(WinScreen, Scene);

WinScreen.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kBgBlueLandBG);  
    gEngine.Textures.loadTexture(this.randomObjects); 
    gEngine.Textures.loadTexture(this.keysheet); 

};


WinScreen.prototype.unloadScene = function() {
    gEngine.Textures.unloadTexture(this.kBgBlueLandBG);
    gEngine.Textures.unloadTexture(this.randomObjects);
    gEngine.Textures.unloadTexture(this.keysheet);
    
    this.mFlyingThings.removeAll();
    var nextScene = new MenuScreen(); 
    gEngine.Core.startScene(nextScene);

};

WinScreen.prototype.initialize = function () {
    
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    

    this.mFlyingThings = new GameObjectSet();
    
    var mainCamH = 600;
    var mainCamW = 800;
    this.mCamera = new Camera(
        vec2.fromValues(80, 60), 
        160,                       
        [0, 0, mainCamW, mainCamH]           
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]); 
   
   
    this.mMsg = new FontRenderable("You Saved the Princess!!");
    this.mMsg.setColor([0, 0, 0, 1]);
    this.mMsg.getXform().setSize(100,10);
    this.mMsg.getXform().setPosition(40,80);
    
    this.mMsg2 = new FontRenderable("Press [Space] to Try Again!");
    this.mMsg2.setColor([0, 0, 0, 1]);
    this.mMsg2.getXform().setSize(50,5);
    this.mMsg2.getXform().setPosition(40,65);

    
    this.mBg = new TextureRenderable(this.kBgBlueLandBG);
    var BgXform = this.mBg.getXform();
    BgXform.setPosition(80,60);
    BgXform.setSize(160,120);  
    
//    var randomObj = new SpriteRenderable(this.randomObjects);
//    var xform = randomObj.getXform();
//    xform.setPosition(Math.random() * 160,Math.random() * 120);
//    xform.setSize(10,10);
//    randomObj.setElementPixelPosArray([384,512,1928,2056]);
//    this.mFlyingThings.addToSet(randomObj);
    
    var randomObj = new SpriteRenderable(this.keysheet);
    var xform = randomObj.getXform();
    xform.setPosition(Math.random() * 160,Math.random() * 120);
    xform.setSize(10,10);
    randomObj.setElementPixelPosArray([256,384,128,256]);
    this.mFlyingThings.addToSet(randomObj);    
    
    randomObj = new SpriteRenderable(this.keysheet);
    xform = randomObj.getXform();
    xform.setPosition(Math.random() * 160,Math.random() * 120);
    xform.setSize(10,10);
    randomObj.setElementPixelPosArray([256,384,128,256]); 
    this.mFlyingThings.addToSet(randomObj);    
    
    randomObj = new SpriteRenderable(this.keysheet);
    xform = randomObj.getXform();
    xform.setPosition(Math.random() * 160,Math.random() * 120);
    xform.setSize(10,10);
    randomObj.setElementPixelPosArray([256,384,128,256]); 
    this.mFlyingThings.addToSet(randomObj);
    
    randomObj = new SpriteRenderable(this.keysheet);
    xform = randomObj.getXform();
    xform.setPosition(Math.random() * 160,Math.random() * 120);
    xform.setSize(10,10);
    randomObj.setElementPixelPosArray([256,384,128,256]); 
    this.mFlyingThings.addToSet(randomObj);    
    
    randomObj = new SpriteRenderable(this.keysheet);
    xform = randomObj.getXform();
    xform.setPosition(Math.random() * 160,Math.random() * 120);
    xform.setSize(10,10);
    randomObj.setElementPixelPosArray([256,384,128,256]); 
    this.mFlyingThings.addToSet(randomObj); 
    
    randomObj = new SpriteRenderable(this.keysheet);
    xform = randomObj.getXform();
    xform.setPosition(Math.random() * 160,Math.random() * 120);
    xform.setSize(10,10);
    randomObj.setElementPixelPosArray([256,384,128,256]); 
    this.mFlyingThings.addToSet(randomObj);     
};

WinScreen.prototype.update = function () {
    
    if(this.hasExpired()){


        gEngine.GameLoop.stop();
        return;
     }
     this.cycles++;
    
     if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)) {
         this.mNextScene = true;
     };
     
     this.mBlink++;
     if(this.mBlink > 80){
         this.mBlink = 0;
     }
     
     var i;
     for(i = 0; i < this.mFlyingThings.size(); i++){
         
         var obj = this.mFlyingThings.getObjectAt(i);
         var xform = obj.getXform();
         
         xform.incXPosBy(-0.25);
         
         if(xform.getXPos() < -10){
             xform.setXPos(170);
         }
     }
     
     this.mFlyingThings.update();

     
    
};

WinScreen.prototype.hasExpired = function () {
    return this.cycles > 300;
};



WinScreen.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();
    
    this.mBg.draw(this.mCamera);
    this.mFlyingThings.draw(this.mCamera);
    
    
    if(this.mBlink < 40){
        this.mMsg.draw(this.mCamera);
       //this.mMsg2.draw(this.mCamera); 
    }
    
    
    
};