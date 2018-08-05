/*
 * File: Intro.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  Renderable, TextureRenderable, FontRenderable, SpriteRenderable, LightRenderable, IllumRenderable,
  GameObject, TiledGameObject, ParallaxGameObject, Hero, Minion, Dye, Light */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Select(){
    var flag=0;
    this.kBg="assets/Select.png";
    this.kArrow="assets/Arrow2.png";
    this.mBg = null;
    this.mArrow = null;

    this.newStatus=true;
    this.roomNo=null;

    // Network
    var connectionOpen = function(evt) {
        console.log("Connection open ...");
    }.bind(this);

    var connectionClose = function(evt) {
        console.log("Connection closed.");
    }.bind(this);

    gEngine.Network.setUp("127.0.0.1:7001",connectionOpen,connectionClose);
}
gEngine.Core.inheritPrototype(Select, Scene);

Select.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kBg);
    gEngine.Textures.loadTexture(this.kArrow);
};

Select.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(512, 256), // position of the camera
        1024,                        // width of camera
        [0, 0, 1024, 512]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([1, 1, 1, 1]);
    gEngine.DefaultResources.setGlobalAmbientColor([1, 1, 1, 1]);
    gEngine.DefaultResources.setGlobalAmbientIntensity(1.0);
    
    this.mArrow = new TextureRenderable(this.kArrow);
    this.mArrow.setColor([0, 0, 0, 1]);
    this.mArrow.getXform().setPosition(162, 276);
    this.mArrow.getXform().setSize(32, 64);
    
    var bgR = new SpriteRenderable(this.kBg);
    bgR.setElementPixelPositions(0, 1024, 0, 512);
    bgR.getXform().setSize(1024, 512);
    bgR.getXform().setPosition(512, 256);
    this.mBg = new GameObject(bgR);
};

Select.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([1, 1, 1, 1.0]); // clear to light gray
    
    this.mCamera.setupViewProjection();
    
    this.mBg.draw(this.mCamera);
    this.mArrow.draw(this.mCamera);
};

Select.prototype.update = function(){
    // select which character to work with
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.J)){
        this.newStatus=false;
        this.roomNo=prompt("Please input the room no");
        gEngine.GameLoop.stop();
    }

    if((gEngine.Input.isKeyClicked(gEngine.Input.keys.A)||gEngine.Input.isKeyClicked(gEngine.Input.keys.Left)) && this.mArrow.getXform().getXPos()!==162){
        this.mArrow.getXform().setXPos(this.mArrow.getXform().getXPos()-350);
    }
    if((gEngine.Input.isKeyClicked(gEngine.Input.keys.D)||gEngine.Input.isKeyClicked(gEngine.Input.keys.Right)) && this.mArrow.getXform().getXPos()!==862){
        this.mArrow.getXform().setXPos(this.mArrow.getXform().getXPos()+350);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Return)){
        if(this.mArrow.getXform().getXPos()===162){
            this.flag=-1;
            gEngine.GameLoop.stop();
        }
        if(this.mArrow.getXform().getXPos()===512){
            this.flag=0;
            gEngine.GameLoop.stop();
        }
        if(this.mArrow.getXform().getXPos()===862){
            this.flag=1;
            gEngine.GameLoop.stop();
        }
    }
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Esc)){
        this.flag=2;
        gEngine.GameLoop.stop();
    }

};

Select.prototype._receiveStartSignal=function(evt){
    this.roomNo=evt.data;
    alert("Successful! Enjoy the game");
    if(this.flag===-1){
        var nextLevel = new GameLevel_01("myLevel1",1,1,this.newStatus,this.roomNo,0);
        gEngine.Core.startScene(nextLevel);
        gEngine.Network.setCallback("message",nextLevel._updateFromServer.bind(nextLevel));

    }
    if(this.flag===0){
        var nextLevel = new GameLevel_01("myLevel2",0,1,this.newStatus,this.roomNo,1);
        gEngine.Core.startScene(nextLevel);
        gEngine.Network.setCallback("message",nextLevel._updateFromServer.bind(nextLevel));

    }
    if(this.flag===1){
        var nextLevel = new GameLevel_01("myLevel3",0,0,this.newStatus,this.roomNo,1);
        gEngine.Core.startScene(nextLevel);
        gEngine.Network.setCallback("message",nextLevel._updateFromServer.bind(nextLevel));

    }
    if(this.flag===2){
        var nextLevel = new TheCollisionOfBlackAndWhite();
        gEngine.Core.startScene(nextLevel);
    }

};

Select.prototype._receiveRoomNo=function(evt){
    this.roomNo=evt.data.split("_")[0];
    alert("Successful create room! Your room no is:" + this.roomNo + ". Please waiting for another player!");
    gEngine.Network.setCallback("message",Select.prototype._receiveStartSignal.bind(this));
};

Select.prototype._receiveJoinStatus=function(evt){
    var data=evt.data.split("_");
    if(data[0]==="error"){
        alert("Wrong no!");
        gEngine.GameLoop.stop();
    }
    alert("Successful! Enjoy the game");
    gEngine.Network.setCallback("message",GameLevel_01.prototype._updateFromServer.bind(nextLevel));
    var nextLevel;
    if(data[1]==="myLevel1"){
        nextLevel = new GameLevel_01("myLevel1",1,1,this.newStatus,this.roomNo);
        gEngine.Network.setCallback("message",nextLevel._updateFromServer.bind(nextLevel));

    }
    if(data[1]==="myLevel2"){
        nextLevel = new GameLevel_01("myLevel2",0,1,this.newStatus,this.roomNo);
        gEngine.Network.setCallback("message",nextLevel._updateFromServer.bind(nextLevel));

    }
    if(data[1]==="myLevel3"){
        nextLevel = new GameLevel_01("myLevel3",0,0,this.newStatus,this.roomNo);
        gEngine.Network.setCallback("message",nextLevel._updateFromServer.bind(nextLevel));

    }
    if(data[1]==="myLevel4"){
        nextLevel = new TheCollisionOfBlackAndWhite();
        gEngine.Network.cancelCallback("message");
    }
    gEngine.Core.startScene(nextLevel);

};

Select.prototype.unloadScene = function() {
    gEngine.Textures.unloadTexture(this.kBg);

    if(this.newStatus){
        gEngine.Network.setCallback("message",Select.prototype._receiveRoomNo.bind(this));
        gEngine.Network.send(String("new_myLevel"+String(this.flag+2)));
    }
    else {
        gEngine.Network.setCallback("message",Select.prototype._receiveJoinStatus.bind(this));
        gEngine.Network.send(String("join_"+this.roomNo));
    }
};

