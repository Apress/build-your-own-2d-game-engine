/*
 * File: UIDemo.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function UIDemo() {
    this.kHealthBar = "assets/UI/healthbar.png";
    this.kUIButton = "assets/UI/button.png";
    this.kBG = "assets/UI/bg.png";
    
    // The camera to view the scene
    this.mCamera = null;
    this.bg = null;
    this.UIHealth = null;
    this.radarbox = null;
    this.UIButton1 = null;
    this.UIButton2 = null;
    this.UIText = null;
    this.UIRadio = null;
    this.UITextBox = null;
    this.UIDDButton = null;
    this.backButton = null;
    this.demoSelect = 0;
    this.cameraFlip = false;
}
gEngine.Core.inheritPrototype(UIDemo, Scene);


UIDemo.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kHealthBar);
    gEngine.Textures.loadTexture(this.kUIButton);
    gEngine.Textures.loadTexture(this.kBG);
};

UIDemo.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kHealthBar);
    gEngine.Textures.unloadTexture(this.kUIButton);
    gEngine.Textures.unloadTexture(this.kBG);
    gEngine.Core.startScene(new MyGame());
};

UIDemo.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 40), // position of the camera
        100,                     // width of camera
        [0, 0, 800, 600]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
            // sets the background to gray
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    
    this.UIHealth = new UIHealthBar(this.kHealthBar,[250,400],[480,40],0);
    this.UIButton1 = new UIButton(this.kUIButton,this.hpDown,this,[200,310],[160,40],"HP-10",4,[1,1,1,1],[0,0,0,1]);
    this.UIButton2 = new UIButton(this.kUIButton,this.hpUp,this,[200,350],[160,40],"HP+10",4,[1,1,1,1],[0,0,0,1]);
    this.UIText = new UIText("UI Testing Ground",[400,600],8,1,0,[1,1,1,1]);
    this.UITextBox = new UITextBox([500,200],6,35,[1,1,1,1],[0,0,0,1],this.UITextBoxTest,this);
    this.radarbox=new Renderable();
    this.radarbox.getXform().setPosition(40,30);
    this.radarbox.getXform().setSize(20,20);
    this.radarbox.setColor([1,1,1,1]);
    this.bg = new TextureRenderable(this.kBG);
    this.bg.getXform().setSize(200,160);
    this.bg.getXform().setPosition(30,20);
    this.UIDDButton = new UIDropDown([400,500],"Pick",6,[0,0,0,1],[1,1,1,1]);
    this.UIDDButton.addToSet("HP Demo",[0,0,0,1],[1,0,0,1],this.hpSelect,this,this.mCamera);
    this.UIDDButton.addToSet("Text Demo",[0,0,0,1],[0,0,1,1],this.textBoxSelect,this,this.mCamera);
    this.UIDDButton.addToSet("Radio Demo",[0,0,0,1],[0,1,0,1],this.radarSelect,this,this.mCamera);
    this.UIDDButton.addToSet("All Demos",[0,0,0,1],[1,1,1,1],this.allSelect,this,this.mCamera);
    this.UIRadio=new UIRadio(this.setToRed,this,[200,200],"Red",2,[0.5,0.5,0.5,1],this.mCamera);
    this.UIRadio.addToSet(this.setToBlue,this,"Blue",[0.5,0.5,0.5,1],this.mCamera);
    this.UIRadio.addToSet(this.setToGreen,this,"Green",[0.5,0.5,0.5,1],this.mCamera);
    this.backButton = new UIButton(this.kUIButton,this.backSelect,this,[80,20],[160,40],"Go Back",4,[1,1,1,1],[1,1,1,1]);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
UIDemo.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    
    this.mCamera.setupViewProjection();
    this.bg.draw(this.mCamera);
    this.radarbox.draw(this.mCamera);
    if(this.demoSelect===1||this.demoSelect===4){
        this.UIHealth.draw(this.mCamera);
        this.UIButton1.draw(this.mCamera);
        this.UIButton2.draw(this.mCamera);
    }
    if(this.demoSelect===2||this.demoSelect===4){
        this.UITextBox.draw(this.mCamera);
    }
    if(this.demoSelect===3||this.demoSelect===4){
        this.UIRadio.draw(this.mCamera);
    }
    this.UIText.draw(this.mCamera);
    this.UIDDButton.draw(this.mCamera);
    this.backButton.draw(this.mCamera);
};

UIDemo.prototype.update = function () {
    if(this.demoSelect===1||this.demoSelect===4){
        this.UIHealth.update();
        this.UIButton1.update();
        this.UIButton2.update();
    }
    if(this.demoSelect===2||this.demoSelect===4){
        this.UITextBox.update(this.mCamera);
    }
    if(this.demoSelect===3||this.demoSelect===4){
        this.UIRadio.update();
    }
    this.UIDDButton.update(this.mCamera);
    this.backButton.update();
    var center = this.mCamera.getWCCenter();
    if(this.cameraFlip===false){
        this.mCamera.setWCCenter(center[0]+.1,center[1]);
    }
    else{
        this.mCamera.setWCCenter(center[0]-.1,center[1]);
    }
    if(center[0]>60){
        this.cameraFlip=true;
    }
    else if(center[0]<10){
        this.cameraFlip=false;
    }
    this.mCamera.update();
};

UIDemo.prototype.hpUp = function() {
    this.UIHealth.incCurrentHP(10);
};

UIDemo.prototype.hpDown = function(){
    this.UIHealth.incCurrentHP(-10);
};

UIDemo.prototype.setToRed = function() {
    this.radarbox.setColor([1,0,0,1]);
};

UIDemo.prototype.setToBlue = function() {
    this.radarbox.setColor([0,0,1,1]);
};

UIDemo.prototype.setToGreen = function() {
    this.radarbox.setColor([0,1,0,1]);
};

UIDemo.prototype.hpSelect = function(){
    this.demoSelect=1;
};

UIDemo.prototype.textBoxSelect = function(){
    this.demoSelect=2;
};

UIDemo.prototype.radarSelect = function(){
    this.demoSelect=3;
};

UIDemo.prototype.allSelect = function(){
    this.demoSelect=4;
};

UIDemo.prototype.UITextBoxTest = function(){
    this.UIText.setText(this.UITextBox.getEnteredValue());
};

UIDemo.prototype.backSelect = function(){
    gEngine.GameLoop.stop();
};