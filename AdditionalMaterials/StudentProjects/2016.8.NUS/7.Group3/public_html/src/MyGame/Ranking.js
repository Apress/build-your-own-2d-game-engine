/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  Renderable, TextureRenderable, FontRenderable, SpriteRenderable, LightRenderable, IllumRenderable,
  GameObject, TiledGameObject, ParallaxGameObject, Hero, Minion, Dye, Light */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

var mytext = [];
var count = 0;
var your_ranktext = null;
var sync = true;
function Ranking() {
    this.kBg = "assets/start.jpg";
   
    //this.kStartButton="assets/button/Start.png";
    //this.kSubmitButton="assets/button/Submit.png";
    this.kMenuButton="assets/button/Menu.png";
    this.kStartBalloon="assets/startballoon.png";
    this.kTitle="assets/RankTitle.png";
    //this.kHint="assets/Hint.png";
    this.mCamera = null;
    
    this.myfont = "assets/Consolas-32";
    this.myfont2 = "assets/Consolas-72";
    this.titlee = null;
    
    this.mBg = null;
    this.mLight = null;
    //this.mStartButton = null;
    this.mMenuButton = null;
    //this.mRankingButton = null;
    this.mHint=null;
    this.mBalloon=null;
    this.aRotateAngle = 10;
    
    this.aDeltaAngle = 0.5;
   
    this.mRotateDir = true;
    
    this.settime = 0;
    
    
}
gEngine.Core.inheritPrototype(Ranking, Scene);

Ranking.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kBg);
    //gEngine.Textures.loadTexture(this.kStartButton);
    //gEngine.Textures.loadTexture(this.kSubmitButton);
    gEngine.Textures.loadTexture(this.kMenuButton);
    gEngine.Textures.loadTexture(this.kStartBalloon);
    gEngine.Textures.loadTexture(this.kTitle);
    //gEngine.Textures.loadTexture(this.kHint);
    gEngine.Fonts.loadFont(this.myfont);
    gEngine.Fonts.loadFont(this.myfont2);
};

Ranking.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kBg);
   
    //gEngine.Textures.unloadTexture(this.kStartButton);
    //gEngine.Textures.unloadTexture(this.kSubmitButton);
    gEngine.Textures.unloadTexture(this.kMenuButton);
    gEngine.Textures.unloadTexture(this.kStartBalloon);
    gEngine.Textures.unloadTexture(this.kTitle);
    //gEngine.Textures.unloadTexture(this.kHint);
    while(sync);
    gEngine.Fonts.unloadFont(this.myfont);
    gEngine.Fonts.unloadFont(this.myfont2);
    gEngine.Core.startScene(this.nextLevel);
};

Ranking.prototype.initialize = function () {
    // Initialize Lights
    this._initializeLights();
    //Main Camera
    this.mCamera = new Camera(
            vec2.fromValues(40, 30),
            80,
            [0, 0, 800, 600]
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    
    
    this.mBg = new LightRenderable(this.kBg);
    this.mBg.setColor([0, 0, 0, 0]);
    this.mBg.getXform().setPosition(40, 30);
    this.mBg.getXform().setSize(80, 60);
    this.mBg.addLight(this.mLight);
  
    //button
    //this.mStartButton = new Button(this.kStartButton, null, [40, 26], [14, 5], this.mLight);
    //this.mRankingButton = new Button(this.kSubmitButton, null, [40, 18], [14, 5], this.mLight);
    this.mMenuButton = new Button(this.kMenuButton, null, [72, 5], [14, 5], this.mLight);
    this.mBalloon = new LightRenderable(this.kStartBalloon);
    this.mBalloon.getXform().setPosition(8, 52);
    this.mBalloon.getXform().setSize(10, 10);
    this.mBalloon.addLight(this.mLight);
    this.mTitle = new LightRenderable(this.kTitle);
    this.mTitle.getXform().setPosition(22, 52);
    this.mTitle.getXform().setSize(22, 8);
    this.mTitle.addLight(this.mLight);
    // this.mHint = new LightRenderable(this.kHint);
    // this.mHint.getXform().setPosition(30, 29);
    // this.mHint.getXform().setSize(45, 40);
    // this.mHint.addLight(this.mLight);
    
    this.titlee = new FontRenderable("rank name  score");
    this.titlee.setFont(this.myfont);
    this.titlee.setColor([0, 0.7, 1, 1]);
    this.titlee.getXform().setPosition(18, 40);
    this.titlee.setTextHeight(3);


    mytext[0] = new FontRenderable("");
    mytext[0].setFont(this.myfont);
    mytext[0].setColor([1, 0, 0, 1]);
    mytext[0].getXform().setPosition(20, 35);
    mytext[0].setTextHeight(2.5);

    mytext[1] = new FontRenderable("");
    mytext[1].setFont(this.myfont);
    mytext[1].setColor([1, 0.8, 0, 1]);
    mytext[1].getXform().setPosition(20, 30);
    mytext[1].setTextHeight(2.5);
    //mytext[1] = new FontRenderable("");

    mytext[2] = new FontRenderable("");
    mytext[2].setFont(this.myfont);
    mytext[2].setColor([0.6, 0.4, 0, 1]);
    mytext[2].getXform().setPosition(20, 25);
    mytext[2].setTextHeight(2.5);

    mytext[3] = new FontRenderable("");
    mytext[3].setFont(this.myfont);
    mytext[3].setColor([0, 0, 0, 1]);
    mytext[3].getXform().setPosition(20, 20);
    mytext[3].setTextHeight(2.5);

    mytext[4] = new FontRenderable("");
    mytext[4].setFont(this.myfont);
    mytext[4].setColor([0, 0, 0, 1]);
    mytext[4].getXform().setPosition(20, 15);
    mytext[4].setTextHeight(2.5);

    your_ranktext = new FontRenderable("");
    your_ranktext.setFont(this.myfont2);
    your_ranktext.setColor([0, 0, 1, 1]);
    your_ranktext.getXform().setPosition(43, 52);
    your_ranktext.setTextHeight(10);
    
    
};


// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
Ranking.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    this.mCamera.setupViewProjection();
    this.mBg.draw(this.mCamera);
    this.mBalloon.draw(this.mCamera);
    this.mTitle.draw(this.mCamera);
    this.titlee.draw(this.mCamera);
    your_ranktext.draw(this.mCamera);
    for(var j=0;j< count;j++){
        mytext[j].draw(this.mCamera);
    }
   // this.mHint.draw(this.mCamera);
   // this.mStartButton.draw(this.mCamera);
   // this.mRankingButton.draw(this.mCamera);
    this.mMenuButton.draw(this.mCamera);
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
Ranking.prototype.update = function () {

    if(this.settime % 60 ===0){

        var score = gEngine.ResourceMap.retrieveAsset(gScore);
        //console.log(score);
        var result = [];
        sync = true;
        $.ajax({url :"src/MyGame/select.php",dataType:'json', success: function(result){
               
                //alert(result);
            //for(var i=0; i< result.length;i++){
               // alert(a);
                if(result.length > 5)
                    count = 5;
                else 
                    count = result.length;
                for(var i = 0; i< count; i++){
                    
                    var j = i+1;
                    var len = result[i]['name'].length;
                    // mytext[i].setText(j + ":   " + result[i]['name'] +"     "+result[i]['num']);
                    mytext[i].setText(j + ":   " + result[i]['name'] );
                    for (var k = 0; k < 8 - len; k++) {
                        mytext[i].setText(mytext[i].getText() + " ");
                    }
                    mytext[i].setText(mytext[i].getText() + result[i]['num']);
                    console.log(result[i]['num']);
            }
                var your_rank = 0;
                while((result[your_rank]['num']) !== score.toString() ){
                    your_rank++;
                }
                your_rank++;
                //console.log(your_rank);
                your_ranktext.setText("" + your_rank);
                sync = false;
                //
            //}
        },error:function(){
            console.log("erre");
        }});

    }
    this.settime +=1;
    if(this.settime >=60)
        this.settime -=60;

     
    //mytext.setText("qwe");
    var mx = this.mCamera.mouseWCX();
    var my = this.mCamera.mouseWCY();
    //this.mStartButton.update(mx, my);
    //this.mRankingButton.update(mx, my);
    this.mMenuButton.update(mx, my);
    // if(this.mStartButton.getStatus() === Button.eButtonStatus.eClicked){
    //     this.nextLevel = new LevelOne();
    //     gEngine.GameLoop.stop();
    // }
    // if(this.mRankingButton.getStatus() === Button.eButtonStatus.eClicked){
    //      this.nextLevel = new Ranking();
    //     gEngine.GameLoop.stop();
    // }
    if(this.mMenuButton.getStatus() === Button.eButtonStatus.eClicked){
        this.nextLevel = new GameStart();
        gEngine.GameLoop.stop();
    }
    
    
     if(this.mRotateDir){
        this.mBalloon.getXform().incRotationByDegree(this.aDeltaAngle);
        if(this.mBalloon.getXform().getRotationInDegree() > this.aRotateAngle)
            this.mRotateDir = false;
    }
    else {
        this.mBalloon.getXform().incRotationByDegree(-this.aDeltaAngle);
        if(this.mBalloon.getXform().getRotationInDegree() < -this.aRotateAngle)
            this.mRotateDir = true;
    }
  


    
    GameStart.prototype.testScene.call(this);
};

Ranking.prototype._initializeLights = function(){
    this.mLight = new Light();
    this.mLight.setLightType(Light.eLightType.eDirectionalLight);
    this.mLight.setColor([0.8, 0.8, 0.8, 1]);
    this.mLight.setDirection([0, 0, -1]);
    this.mLight.setIntensity(1);
}