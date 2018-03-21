/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* global gEngine, Scene, vec2, nextLevel */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MainScene() {
    var canvas=document.getElementById("GLCanvas");           
    this.WinSize = [canvas.width,canvas.height];
    this.mCamera = null;
    this.uiCamera = null;
    this.mapCamera = null;
    this.Avengers = null;
    this.playerImagePath = "assets/player.png";
    this.followEnemyPath = "assets/FollowEnemy.png";
    this.lifeCubePath = "assets/LifeCube.png";
    this.speedCubePath = "assets/SpeedCube.png";
    this.iceCubePath = "assets/IceCube.png";
    this.iceAreaPath = "assets/IceArea.png";
    this.winPath = "assets/win.png";
    this.failedPath = "assets/failed.png";
    this.aimEnemyPath = "assets/AimEnemy.png";
    this.win = null;
    this.failed = null;
    this.universeLayer = null;
    this.uiLayer = null;
    this.player = null;
    
    this.effectCubePool = [];
    this.maxAddEffectTime = 180;
    this.curAddEffectTime = 0;
    
    this.enemyPool = [];
    this.maxAddEnemyTime = 180;
    this.curAddEnemyTime = 0;
    
    this.GameState = 0;
}

gEngine.Core.inheritPrototype(MainScene, Scene);


MainScene.prototype.loadScene = function () {
   gEngine.Textures.loadTexture(this.playerImagePath);
   gEngine.Textures.loadTexture(this.followEnemyPath);
   gEngine.Textures.loadTexture(this.lifeCubePath);
   gEngine.Textures.loadTexture(this.speedCubePath);
   gEngine.Textures.loadTexture(this.iceCubePath);
   gEngine.Textures.loadTexture(this.iceAreaPath);
   gEngine.Textures.loadTexture(this.winPath);
   gEngine.Textures.loadTexture(this.failedPath);
   gEngine.Textures.loadTexture(this.aimEnemyPath);
   
};

MainScene.prototype.unloadScene = function () {
    var nextLevel = new ChooseScene();
    gEngine.Core.startScene(nextLevel);
};

MainScene.prototype.initialize = function () {
   
   this.mCamera = new Camera( 
           vec2.fromValues(0, 0),   
           this.WinSize[0]/2,                       
           [0, 0, this.WinSize[0], this.WinSize[1]]
    );
    this.mCamera.setBackgroundColor([0,0,0,1]);
    
    this.uiCamera = new Camera( 
           vec2.fromValues(0, 0),   
           this.WinSize[0]/2,                       
           [0,0, this.WinSize[0], this.WinSize[1]]
    );
    this.uiCamera.setBackgroundColor([0,0,0,1]);
    
    this.mapCamera = new Camera( 
           vec2.fromValues(0, 0),   
           500,                       
           [this.WinSize[0]-150, this.WinSize[1]-150, 150, 150]
    );
    this.mapCamera.setBackgroundColor([0.1,0.1,0.1,0.5]);
    
    this.Avengers = new AvengersLayer();
    this.Avengers.Init();
   
    this.universeLayer = new UniverseLayer();
    this.uiLayer = new UILayer();
    this.uiLayer.Init();
    
    this.player = new Player();
    
    this.win = new SpriteRenderable(this.winPath);
    var texInfo = gEngine.ResourceMap.retrieveAsset(this.winPath);
    this.win.getXform().setPosition(0, 0);
    this.win.setColor([1,1,1,0]);
    this.win.getXform().setSize(texInfo.mWidth/2, texInfo.mHeight/2);
    
    this.failed = new SpriteRenderable(this.failedPath);
    texInfo = gEngine.ResourceMap.retrieveAsset(this.failedPath);
    this.failed.getXform().setPosition(0, 0);
    this.failed.setColor([1,1,1,0]);
    this.failed.getXform().setSize(texInfo.mWidth/3, texInfo.mHeight/3);
    
    
    this.Level1Init();
    this.Level2Init();
    this.Level3Init();
    this.Level4Init();
    
    
    
    
};

MainScene.prototype.draw = function () {
    gEngine.Core.clearCanvas([0,0,0,1]); // clear to light gray
    
    
    this.mCamera.setupViewProjection();
    
    this.uiCamera.setupViewProjection();
    

    this.universeLayer.draw(this.mCamera);
    this.player.draw(this.mCamera);
    
    
    this.uiLayer.draw(this.uiCamera);
    
    for(var i = 0 ; i < this.effectCubePool.length;i++){
        this.effectCubePool[i].draw(this.mCamera);
    }
    for(var i = 0 ; i < this.enemyPool.length;i++){
        this.enemyPool[i].draw(this.mCamera);
    }

    this.win.draw(this.uiCamera);

    this.failed.draw(this.uiCamera);
    
    
    this.mapCamera.setupViewProjection();
    this.universeLayer.draw(this.mapCamera);
    this.player.draw(this.mapCamera);
        for(var i = 0 ; i < this.effectCubePool.length;i++){
        this.effectCubePool[i].draw(this.mapCamera);
    }

};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MainScene.prototype.updateCamera = function () {
        this.mCamera = new Camera( 
           vec2.fromValues(this.player.getCenterNow()[0], this.player.getCenterNow()[1]),   
           this.player.getWidthNow(),                       
           [0, 0, this.WinSize[0], this.WinSize[1]]
    );
    this.mCamera.setBackgroundColor([0,0,0,1]);
};

MainScene.prototype.update = function () {
    
    if(this.GameState !== 0){
        if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)){
            gEngine.GameLoop.stop();
        }
        return;
    };
    
    this.CheckOver();
    this.player.Input();
    if(!this.player.LinkUpdate(this.mCamera)){
        this.failed.setColor([1,1,1,1]);
        this.GameState = 2;
        return;
    }
    this.mCamera.update();
    this.updateCamera();
    //this.enemy.UpdateState(this.player);
    this.player.PlayerEffict();
    this.uiLayer.updateData(this.player.getLvLife(),this.player.getLvIce(),this.player.getLvFlash());
    for(var i = 0 ; i < this.effectCubePool.length;i++){
        this.player.addEffice(this.effectCubePool[i]);
    }
    for(var i = 0 ; i < this.enemyPool.length;i++){
        this.enemyPool[i].UpdateState(this.player);
        this.player.IceEffectFunc(this.enemyPool[i]);
        if(this.player.collideEnemy(this.enemyPool[i])){
            var del = this.enemyPool.splice(i,1);
            del = null;
            this.failed.setColor([1,1,1,1]);
            this.GameState = 2;
            
        };
        
    }
    this.addEffectCube();
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.One) && gEngine.Input.isKeyClicked(gEngine.Input.keys.Two) ){
        this.player.addFlash();
       
    }
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.Nine) && gEngine.Input.isKeyClicked(gEngine.Input.keys.Zero) ){
        this.player.addIce();
    }
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.Five) && gEngine.Input.isKeyClicked(gEngine.Input.keys.Six) ){
        this.player.addLife();;
    }
    
};

MainScene.prototype.addEffectCube = function (){
    if(this.curAddEffectTime > this.maxAddEffectTime){
        this.effectCubePool.push(new EffectCube(Math.floor(Math.random()*2+1),[Math.random()*600-300,Math.random()*600-300]));
        this.curAddEffectTime = 0;
    } else {
        this.curAddEffectTime++;
    }
};

MainScene.prototype.addEnemy = function () {
    if(this.curAddEnemyTime > this.maxAddEnemyTime){
        this.enemyPool.push(new FollowEnemy([100,100]));
        this.curAddEnemyTime = 0;
    }else{
        this.curAddEnemyTime++;
    }
};

MainScene.prototype.CheckOver = function () {
    if(this.player.getLvLife() >= 4){
        this.win.setColor([1,1,1,1]);
        this.GameState = 1;
    }
};

MainScene.prototype.Level1Init = function (){
    
    var center = [-200,-200];
    var prize = new EffectCube(0,center);
    this.effectCubePool.push(prize);
    
    for(var i = - 1; i <= 1 ; i++){
        var pos = [center[0] + i * 20,center[1] + 20];
        this.enemyPool.push(new FollowEnemy(pos,true));
    }
    
    for(var i = - 1; i <= 1 ; i+=2){
        var pos = [center[0] + i * 20,center[1]];
        this.enemyPool.push(new FollowEnemy(pos,true));
    }
    
    for(var i = - 1; i <= 1 ; i++){
        var pos = [center[0] + i * 20,center[1] - 20];
        this.enemyPool.push(new FollowEnemy(pos,true));
    }
    
    
};

MainScene.prototype.Level2Init = function() {
    var center = [-200,200];

    var prize1 = new EffectCube(0,center);
    this.effectCubePool.push(prize1);
    
    var sides = 14;
    for(var i = 0 ; i < sides ; i++){
        if(i === 1){
            continue;
        }
        this.enemyPool.push(new CircleEnemy(center,50,360/sides*i,false,0.75));
    }
    var sides2 = 8;
    for(var i = 0 ; i < sides2 ; i++){
        if(i === 6){
            continue;
        }
        this.enemyPool.push(new CircleEnemy(center,20,360/sides2*i,true,1));
    }
    
};

MainScene.prototype.Level3Init = function() {
    var center = [200,200];

    var prize1 = new EffectCube(0,center);
    this.effectCubePool.push(prize1);
    
    var sides = 12;
    for(var i = 0 ; i < sides ; i++){
        if(i === 1){
            continue;
        }
        this.enemyPool.push(new CircleEnemy(center,40,360/sides*i,false,1));
    }
    for(var i = - 1; i <= 1 ; i++){
    var pos = [center[0] + i * 20,center[1] + 20];
        this.enemyPool.push(new FollowEnemy(pos,true));
    }
    
    for(var i = - 1; i <= 1 ; i+=2){
        var pos = [center[0] + i * 20,center[1]];
        this.enemyPool.push(new FollowEnemy(pos,true));
    }
    
    for(var i = - 1; i <= 1 ; i++){
        var pos = [center[0] + i * 20,center[1] - 20];
        this.enemyPool.push(new FollowEnemy(pos,true));
    }
    
};

MainScene.prototype.Level4Init = function() {
    
    var center = [200,-200];

    var prize1 = new EffectCube(0,center);
    this.effectCubePool.push(prize1);
    
    for(var i = - 3; i <= 3 ; i++){
        var pos = [center[0] + i * 20,center[1] + 60];

            this.enemyPool.push(new FollowEnemy(pos,false));

        
    }
    
    for(var i = - 3; i <= 3 ; i++){
    var pos = [center[0] + i * 20,center[1] + 40];
        if(i === 3){
            this.enemyPool.push(new FollowEnemy(pos,false));
        } else {
        this.enemyPool.push(new FollowEnemy(pos,true));
        }
        
    }
    
    for(var i = - 3; i <= 3 ; i++){
    var pos = [center[0] + i * 20,center[1] + 20];
            if(i === 2){
        this.enemyPool.push(new FollowEnemy(pos,true));
    } else {
        this.enemyPool.push(new FollowEnemy(pos,false));
    }
    }
    
    for(var i = - 3; i <= 3 ; i++){
        if(i === 0) continue;
    var pos = [center[0] + i * 20,center[1] + 0];
            if(i === 2){
        this.enemyPool.push(new FollowEnemy(pos,true));
    } else {
        this.enemyPool.push(new FollowEnemy(pos,false));
    }
    }
    
    for(var i = - 3; i <= 3 ; i++){
    var pos = [center[0] + i * 20,center[1] - 20];
            if(i === 2 || i === 0){
        this.enemyPool.push(new FollowEnemy(pos,true));
    } else {
        this.enemyPool.push(new FollowEnemy(pos,false));
    }
    }
    
    for(var i = - 3; i <= 3 ; i++){
    var pos = [center[0] + i * 20,center[1] - 40];
    if(i >= 0 && i !== 3){
        this.enemyPool.push(new FollowEnemy(pos,true));
    } else {
        this.enemyPool.push(new FollowEnemy(pos,false));
    }
    }
    
    for(var i = - 3; i <= 3 ; i++){
    var pos = [center[0] + i * 20,center[1] - 60];

        this.enemyPool.push(new FollowEnemy(pos,false));
    
    }
    
};