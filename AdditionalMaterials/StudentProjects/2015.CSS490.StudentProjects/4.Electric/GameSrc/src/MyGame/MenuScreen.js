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


function MenuScreen() {
     // audio clips: supports both mp3 and wav formats
    this.kBgBlueLandBG = "assets/blue_land.png";
    this.randomObjects = "assets/spritesheet_enemies.png";
    this.keysheet = "assets/spritesheet_hud.png";



    // The camera to view the scene
    this.mCamera = null;
    this.mBg = null;
    
    this.mMsg = null;
    this.mMsg2 = null;
    this.mInstructions = null;
    
    this.mNextScene = false;
    
    this.mBlink = 0;
    
    this.mFlyingThings = null;


}
gEngine.Core.inheritPrototype(MenuScreen, Scene);

MenuScreen.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kBgBlueLandBG);  
    gEngine.Textures.loadTexture(this.randomObjects); 
    gEngine.Textures.loadTexture(this.keysheet); 

};


MenuScreen.prototype.unloadScene = function() {
    gEngine.Textures.unloadTexture(this.kBgBlueLandBG);
    gEngine.Textures.unloadTexture(this.randomObjects);
    gEngine.Textures.unloadTexture(this.keysheet);
    
    this.mFlyingThings.removeAll();
    
    this.mCurrentScene = new MyGame(); 
    gEngine.Core.startScene(this.mCurrentScene);

};

MenuScreen.prototype.initialize = function () {
    
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
   
   
    this.mMsg = new FontRenderable("Adventures of Locke, the Key Enthusiast");
    this.mMsg.setColor([0, 0, 0, 1]);
    this.mMsg.getXform().setSize(100,10);
    this.mMsg.getXform().setPosition(40,80);
    
    this.mMsg2 = new FontRenderable("Press [Space] to Play!");
    this.mMsg2.setColor([0, 0, 0, 1]);
    this.mMsg2.getXform().setSize(50,5);
    this.mMsg2.getXform().setPosition(40,65);
    
    this.mBg = new TextureRenderable(this.kBgBlueLandBG);
    var BgXform = this.mBg.getXform();
    BgXform.setPosition(80,60);
    BgXform.setSize(160,120);  
    
    this.mInstructions = new GameObjectSet();
    
    var instructions1 = new FontRenderable("WASD - Move");
    instructions1.setColor([0, 0, 0, 1]);
    instructions1.setTextHeight(4);
    instructions1.getXform().setPosition(40,50);
    
    var instructions2 = new FontRenderable("E - Shoot");
    instructions2.setColor([0, 0, 0, 1]);
    instructions2.setTextHeight(4);
    instructions2.getXform().setPosition(40,45);
    
    var instructions3 = new FontRenderable("Space - Jump");
    instructions3.setColor([0, 0, 0, 1]);
    instructions3.setTextHeight(4);
    instructions3.getXform().setPosition(40,40);
    
    var instructions4 = new FontRenderable("M - Mini Map");
    instructions4.setColor([0, 0, 0, 1]);
    instructions4.setTextHeight(4);
    instructions4.getXform().setPosition(40,35);
    
    var instructions5 = new FontRenderable("Art: Kenny Art (http://kenney.nl/assets)");
    instructions5.setColor([0, 0, 0, 1]);
    instructions5.setTextHeight(3);
    instructions5.getXform().setPosition(5,10);
    
    var instructions6 = new FontRenderable("Audio: Happy Adventure (http://opengameart.org/content/happy-adventure-loop)");
    instructions6.setColor([0, 0, 0, 1]);
    instructions6.setTextHeight(3);
    instructions6.getXform().setPosition(5,5);
    
    this.mInstructions.addToSet(instructions1);
    this.mInstructions.addToSet(instructions2);
    this.mInstructions.addToSet(instructions3);
    this.mInstructions.addToSet(instructions4);
    this.mInstructions.addToSet(instructions5);
    this.mInstructions.addToSet(instructions6);
    
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

MenuScreen.prototype.update = function () {
    
    if(this.SceneComplete()){
        gEngine.GameLoop.stop();
        return;
     }
    
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

MenuScreen.prototype.SceneComplete = function () {
    return this.mNextScene;
};

MenuScreen.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();
    
    this.mBg.draw(this.mCamera);
    this.mFlyingThings.draw(this.mCamera);
    this.mMsg.draw(this.mCamera);
    this.mInstructions.draw(this.mCamera);
    
    if(this.mBlink < 40){
       this.mMsg2.draw(this.mCamera); 
    }
    
    
    
};