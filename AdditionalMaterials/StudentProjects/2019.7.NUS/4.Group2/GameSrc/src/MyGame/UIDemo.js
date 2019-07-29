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
    this.kUIButton = "assets/UI/ElectricButton.png";
    this.kUIButton2 = "assets/UI/BlueButton.png";
    this.kBG = "assets/UI/bg.png";
    this.kBgClip = "assets/AudioTest/BGClip.mp3";
    this.kCue = "assets/AudioTest/BlueLevel_cue.wav";

    
    // The camera to view the scene
    this.mCamera = null;
    this.bg = null;
    this.Slider = null;
    this.Slider2 = null;
    this.Bar = null;
    this.Bar2 = null;
    this.Toggle = null;
    this.Toggle2 = null;
    this.SwitchToggle = null;
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
    gEngine.Textures.loadTexture(this.kUIButton);
    gEngine.Textures.loadTexture(this.kUIButton2);
    gEngine.Textures.loadTexture(this.kBG);
    gEngine.AudioClips.loadAudio(this.kBgClip);
    gEngine.AudioClips.loadAudio(this.kCue);
};

UIDemo.prototype.unloadScene = function () {
    gEngine.AudioClips.stopBackgroundAudio();
    gEngine.AudioClips.unloadAudio(this.kBgClip);
    gEngine.AudioClips.unloadAudio(this.kCue);
    gEngine.Textures.unloadTexture(this.kUIButton);
    gEngine.Textures.unloadTexture(this.kUIButton2);
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
    gEngine.DefaultResources.setGlobalAmbientIntensity(10);
    
    // for Bar Demo
    this.Bar = new UIBar([400, 400],[480,40]);
    this.Bar.setMidElemColor([0.6,0,0,1]);
    this.Bar2 = new UIBar([125, 290],[40,480]);
    this.Bar2.setMidVisible(false);
    this.Bar2.configInterpolation(240,0.025);
    this.Bar2.setTopElemColor([0.4,1,0.4,1]);
    this.UIButton1 = new UISpriteButton(this.kUIButton, this.barValueDown,this,[300,350],[160,40],"-10",3.5);
    this.UIButton1.setTextColor([1,1,1,1]);
    this.UIButton2 = new UISpriteButton(this.kUIButton2, this.barValueUp,this,[500,350],[160,40],"+10",3.5);
    this.UIButton2.setTextColor([1,1,1,1]);
    
    // for Slider Demo
    this.Slider = new UISlider([400, 100],[480,40]);
    this.Slider.setMaxValue(1);
    this.Slider.setMultiplier(100);
    this.Slider.setToFixedValue(0);
    this.Slider.setSnap(true);
    this.Slider.setSnapBy(0.1);
    this.Slider2 = new UISlider([50, 290],[40,480]);
    this.Slider2.setColor([1,1,0,1]);
    this.Slider2.setHandleColor([1,0.50,0,1]);
    this.Slider2.setTextColor([1,1,1,1]);
    
    // for Toggle Demo
    this.Toggle = new UIToggle([350,300], [300,40],["A","B","C","D", "E"],4);
    this.Toggle2 = new UIToggle([650,300], [110, 115],["Look","I'm","Vertical"],2.5);
    this.Toggle2.setSelectionColor([1,0,0.5,1]);
    this.Toggle2.setSelectedTextColor([0.75,1,0,1]);
    this.SwitchToggle = new UISwitchToggle([500, 250], [80,40]);
    
    // for Text Demo
    this.UIText = new UIText("UI Testing Ground",[400,600],8,1,0,[1,1,1,1]);
    this.UITextBox = new UITextBox([500,200],6,35,[1,1,1,1],[0,0,0,1],this.UITextBoxTest,this);
    
    // for Radio Demo
    this.radarbox=new Renderable();
    this.radarbox.getXform().setPosition(40,30);
    this.radarbox.getXform().setSize(20,20);
    this.radarbox.setColor([1,1,1,1]);
    
    // general
    this.bg = new TextureRenderable(this.kBG);
    this.bg.getXform().setSize(200,160);
    this.bg.getXform().setPosition(30,20);
    this.UIDDButton = new UIDropDown([400,500],"Pick",6,[0,0,0,1],[1,1,1,1]);
    this.UIDDButton.addToSet("Bar Demo",[0,0,0,1],[1,0,0,1],this.barSelect,this,this.mCamera);
    this.UIDDButton.addToSet("Slider Demo",[0,0,0,1],[1,1,0,1],this.sliderSelect,this,this.mCamera);
    this.UIDDButton.addToSet("Toggle Demo",[0,0,0,1],[1,0,1,1],this.toggleSelect,this,this.mCamera);
    this.UIDDButton.addToSet("Text Demo",[0,0,0,1],[0,0,1,1],this.textBoxSelect,this,this.mCamera);
    this.UIDDButton.addToSet("Radio Demo",[0,0,0,1],[0,1,0,1],this.radarSelect,this,this.mCamera);
    this.UIDDButton.addToSet("All Demos",[0,0,0,1],[1,1,1,1],this.allSelect,this,this.mCamera);
    this.UIRadio=new UIRadio(this.setToRed,this,[200,200],"Red",2,[0.5,0.5,0.5,1],this.mCamera);
    this.UIRadio.addToSet(this.setToBlue,this,"Blue",[0.5,0.5,0.5,1],this.mCamera);
    this.UIRadio.addToSet(this.setToGreen,this,"Green",[0.5,0.5,0.5,1],this.mCamera);
    this.backButton = new UIButton(this.backSelect,this,[80,20],[160,40],"Go Back",4);
    gEngine.AudioClips.playBackgroundAudio(this.kBgClip);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
UIDemo.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    this.mCamera.setupViewProjection();
    
    this.bg.draw(this.mCamera);
    
    this.radarbox.draw(this.mCamera);
    if(this.demoSelect===1||this.demoSelect===6){
        this.Bar.draw(this.mCamera);
        this.Bar2.draw(this.mCamera);
        this.UIButton1.draw(this.mCamera);
        this.UIButton2.draw(this.mCamera);
    }
    if(this.demoSelect===2||this.demoSelect===6){
        this.Slider.draw(this.mCamera);
        this.Slider2.draw(this.mCamera);
    }
    if(this.demoSelect===3||this.demoSelect===6){
        this.Toggle.draw(this.mCamera);
        this.Toggle2.draw(this.mCamera);
        this.SwitchToggle.draw(this.mCamera);
    }
    if(this.demoSelect===4||this.demoSelect===6){
        this.UITextBox.draw(this.mCamera);
    }
    if(this.demoSelect===5||this.demoSelect===6){
        this.UIRadio.draw(this.mCamera);
    }
    this.UIText.draw(this.mCamera);
    this.UIDDButton.draw(this.mCamera);
    this.backButton.draw(this.mCamera);
};

UIDemo.prototype.update = function () {
    if(this.demoSelect===1||this.demoSelect===6){
        this.Slider.update();
        this.Bar.update();
        this.Bar2.update();
        this.UIButton1.update();
        this.UIButton2.update();
    }
    // to demonstrate both sliders and audio control
    if(this.demoSelect===2||this.demoSelect===6){
        this.Slider.update();
        gEngine.AudioClips.setBackgroundVolume(this.Slider.getCurrentValue());
        this.Slider2.update();
        gEngine.AudioClips.setMasterVolume(this.Slider2.getCurrentValue());
        if(gEngine.Input.isKeyClicked(gEngine.Input.keys.C)){
            gEngine.AudioClips.playACue(this.kCue, 0.5);
        }
    }
    // so music only plays for Slider Demo
    else {
        gEngine.AudioClips.setBackgroundVolume(0);
    }
    if(this.demoSelect===3||this.demoSelect===6){
        this.Toggle.update();
        this.Toggle2.update();
        this.SwitchToggle.update();
    }
    if(this.demoSelect===4||this.demoSelect===6){
        this.UITextBox.update(this.mCamera);
    }
    if(this.demoSelect===5||this.demoSelect===6){
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

UIDemo.prototype.barValueUp = function() {
    this.Bar.incCurrentValue(10);
    this.Bar2.incCurrentValue(10);
};

UIDemo.prototype.barValueDown = function(){
    this.Bar.incCurrentValue(-10);
    this.Bar2.incCurrentValue(-10);
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

UIDemo.prototype.barSelect = function(){
    this.demoSelect=1;
};

UIDemo.prototype.sliderSelect = function() {
    this.demoSelect=2;
};

UIDemo.prototype.toggleSelect = function() {
    this.demoSelect=3;
};

UIDemo.prototype.textBoxSelect = function(){
    this.demoSelect=4;
};

UIDemo.prototype.radarSelect = function(){
    this.demoSelect=5;
};

UIDemo.prototype.allSelect = function(){
    this.demoSelect=6;
};

UIDemo.prototype.UITextBoxTest = function(){
    this.UIText.setText(this.UITextBox.getEnteredValue());
};

UIDemo.prototype.backSelect = function(){
    gEngine.GameLoop.stop();
};