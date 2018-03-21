/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine: false, Scene: false, SpriteRenderable: false, Camera: false, vec2: false,
 TextureRenderable: false, Renderable: false, SpriteAnimateRenderable: false, GameOver: false,
 FontRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyGame() {
    this.loadComplete=false;
    this.textfont="assets/fonts/Consolas-72";
    // textures: 
    this.mSpeedUpImage = null;
    this.mReverseImage = null;
    this.mInvincibilityImage = null;
    //this.kFontImage = "assets/Consolas-72.png";
    this.kBound = "assets/Bound.png";
    this.kHead1 = "assets/snake1head.png";
    this.kHead2 = "assets/snake2head.png";
    this.kBody1 = "assets/snake1body.png";
    this.kBody2 = "assets/snake2body.png";
    this.kUpgrade = "assets/snakeUpgrade.png";
    this.kPlayBGM = "assets/sound/GameBGM.mp3";
    this.kgetFruit = "assets/sound/tick.mp3";
    // The camera to view the scene
    this.leftCamera = new LeftView();
    this.rightCamera = new RightView();
    this.miniCamera = new MiniView();
    this.mCameras = [];
    this.mEnergy = new Energy();
    this.fruit = new Fruits();
    //this.mCamera = null;

    this.mCamera = null;
    this.mBound = null;
    this.mSnake1 = null;
    this.mSnake2 = null;
    this.mSnakeGroup = new SnakeGroup(2);
    this.signal = null;
    this.score = [0, 0];
    this.state = [0, 0];
    this.death = [0, 0];
    this.mLoading=[];
    this.realScore=[0,0];
}
    var vTime=false;
gEngine.Core.inheritPrototype(MyGame, Scene);
MyGame.prototype.loadScene=function(){
     gEngine.Fonts.loadFont(this.textfont);

};
MyGame.prototype.load = function () {
    gEngine.AudioClips.loadAudio(this.kPlayBGM);
    this.fruit.loadScene();
    this.mEnergy.loadScene();
    this.leftCamera.loadScene();
    this.rightCamera.loadScene();
    this.miniCamera.loadScene();
    this.mSnakeGroup.loadScene();
    gEngine.Textures.loadTexture(this.kHead1);
    gEngine.Textures.loadTexture(this.kHead2);
    gEngine.Textures.loadTexture(this.kBody1);
    gEngine.Textures.loadTexture(this.kBody2);
    
    gEngine.Textures.loadTexture(this.kUpgrade);
    
    gEngine.AudioClips.loadAudio(this.kgetFruit);
    gEngine.Textures.loadTexture(this.kBound);
};

MyGame.prototype.unloadScene = function () {
    gEngine.Fonts.unloadFont(this.textfont);
    this.fruit.unloadScene();
    this.mEnergy.unloadScene();
    this.leftCamera.unloadScene();
    this.rightCamera.unloadScene();
    this.miniCamera.unloadScene();
    this.mSnakeGroup.unloadScene();
    gEngine.AudioClips.stopBackgroundAudio();

    gEngine.AudioClips.unloadAudio(this.kPlayBGM);
    gEngine.AudioClips.unloadAudio(this.kgetFruit);
    //gEngine.Fonts.unloadFont(this.fontofplayer);
    gEngine.Textures.unloadTexture(this.kHead1);
    gEngine.Textures.unloadTexture(this.kHead2);
    gEngine.Textures.unloadTexture(this.kBody1);
    gEngine.Textures.unloadTexture(this.kBody2);
    gEngine.Textures.unloadTexture(this.kUpgrade);
    gEngine.Textures.unloadTexture(this.kBound);

    // unload the fonts
    // Step B: starts the next level
//    if(this.signal===0){
//    var nextLevel = new Reborn();  // next level to be loaded
//    gEngine.Core.startScene(nextLevel);
//}

    if (this.signal === 1) {

        var nextLevel = new GameOver(this.score);  // next level to be loaded
        gEngine.Core.startScene(nextLevel);
    }
};

MyGame.prototype.initialize = function () {
          this.mLoading[0]=new FontRenderable("Loading");
          this.mLoading[0].setFont(this.textfont);
          this._initText(this.mLoading[0], -10, 10, [0, 0, 0, 1], 4);
          this.mLoading[1]=new ProcessBar();
          this.mLoading[1].setColor([1,1,0,1],[0.5,0.5,0.5,1]);
          this.mLoading[1].setPosition(0,-10);
          this.mLoading[1].setSize(80,3);
          this.mLoadingCamera=new Camera(
       vec2.fromValues(0, 0),   // position of the camera
        100,                       // width of camera
        [0, 0, 860, 480]          
    );
    this.mLoadingCamera.setBackgroundColor([0.9, 0.9, 0.9, 1]);
    this.load();
};
MyGame.prototype.initializeGame = function () {
    this.mBound = new SpriteRenderable(this.kBound);
    this.mBound.getXform().setPosition(0, 0);
    this.mBound.getXform().setSize(205, 125);
    this.mBound.setColor([1, 1, 1, 0]);

    // Step A: set up the cameras
    /*this.mCamera = new Camera(
     vec2.fromValues(0, 0),   // position of the camera
     100,                       // width of camera
     [0, 0, 860, 480]           // viewport (orgX, orgY, width, height)
     );
     this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
     // sets the background to gray
     */


    this.leftCamera.initialize();
    this.rightCamera.initialize();
    this.miniCamera.initialize();
    this.mCameras.push(this.leftCamera);
    this.mCameras.push(this.rightCamera);
    this.mCameras.push(this.miniCamera);
    //this.rightCamera.setBackgroundColor([1,1,1, 1]);
//    this.miniCamera = new Camera(
//        vec2.fromValues(50, 33),   // position of the camera
//        100,                       // width of camera
//        [330, 359, 200, 120]           // viewport (orgX, orgY, width, height)
//    );
//    this.miniCamera.setBackgroundColor([1,1,1, 0.1]);


    this.mSnake1 = new NewSnake(this.kHead1, this.kBody1, this.leftCamera.getCamera().getWCCenter()[0], this.leftCamera.getCamera().getWCCenter()[1]);
    this.mSnake1.initialize();
    this.mSnake2 = new NewSnake(this.kHead2, this.kBody2, this.rightCamera.getCamera().getWCCenter()[0], this.rightCamera.getCamera().getWCCenter()[1]);
    this.mSnake2.initialize();
    this.mSnakeGroup.initialize(this.mSnake1, this.mSnake2);
    this.mEnergy.initialize(this.mSnake1, this.mSnake2);
    this.fruit.initialize(this.mSnake1, this.mSnake2);
    //</editor-fold>
    gEngine.AudioClips.playBackgroundAudio(this.kPlayBGM);

};
MyGame.prototype._initText = function (font, posX, posY, color, textH) {
    font.setColor(color);
    font.getXform().setPosition(posX, posY);
    font.setTextHeight(textH);
};
// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any s
// tate.
MyGame.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0, 0, 0, 1]); // clear to light gray
    if(!this.loadComplete){
        this.mLoadingCamera.setupViewProjection();
        for(var i=0;i<2;i++){
            this.mLoading[i].draw(this.mLoadingCamera.getVPMatrix());
        }
    }else{
        if (this.fruit.getName()[0] !== null || this.fruit.getName()[1] !== null) {
            gEngine.AudioClips.playACue(this.kgetFruit);
        }
        this.createViews(this.mCameras);
    }
};


MyGame.prototype.createViews = function (views) {
    for (var i = 0; i < views.length; i++) {
        this.mCamera = views[i].getCamera();
        this.mCamera.setupViewProjection();

        views[i].draw(this.mCamera.getVPMatrix());
        this.mSnakeGroup.draw(this.mCamera.getVPMatrix(), i);
        this.mEnergy.draw(this.mCamera.getVPMatrix());
        this.fruit.draw(this.mCamera.getVPMatrix());
        if (i !== 2) {
            this.mBound.draw(this.mCamera.getVPMatrix());
        }
        this.mSnakeGroup.drawEffects(this.mCamera.getVPMatrix(), i);
    }
//    alert(view.getCamera().getWCCenter());

};

// The 
//  function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
var getScore = function () {//还需要加上杀死敌人的加分项
    this.score[0] = this.mEnergy.getSumTotal()[1] * 10 + this.fruit.getSumTotal()[1] * 30 - ((this.death[0]*0.5)*this.state[0]);// lost half scores when they get killed
    this.score[1] = this.mEnergy.getSumTotal()[2] * 10 + this.fruit.getSumTotal()[2] * 30 - ((this.death[1]*0.5)*this.state[1]);
    // console.log(this.score[0], this.score[1]);
    document.getElementById("one").innerHTML = parseInt(this.score[0]);
    document.getElementById("two").innerHTML = parseInt(this.score[1]);
};





MyGame.prototype.update = function () {
    if(this.loadComplete){
        
    
    // let's only allow the movement of hero, 
    // and if hero moves too far off, this level ends, we will
    // load the next level
//    console.log(this.mEnergy.getSumTotal(),this.fruit.getSumTotal());//

    


//    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Q))
//    {       
//           this.signal=0;
//           gEngine.GameLoop.stop();
//      }
//      if(gEngine.Input.isKeyClicked(gEngine.Input.keys.P))
//    {       
//           
//      }
    this.leftCamera.update();
    this.rightCamera.update();


//    this.mEnergy.change(x,y,width);
    //播放吃水果音效


    //console.log(this.fruit.getName());
    //console.log(this.fruit.getName()[0]);
    this.mSnakeGroup.update(this.mEnergy, this.fruit);
    //this.mSnakeGroup.deathCheck();
    //console.log(this.mSnakeGroup.getState());

//    console.log(this.score[0],this.score[1]);

    getScore.call(this);
    
    if (this.mSnakeGroup.getState()[0] === true) {
        this.state[0]++;
        this.death[0] = this.score[0];
        document.getElementById("one" + this.state[0]).style.display = "none";
    }
    if (this.mSnakeGroup.getState()[1] === true) {
        this.state[1]++;
        this.death[1] = this.score[1];
        document.getElementById("two" + this.state[1]).style.display = "none";
    }
    if (this.state[0] >= 3 || this.state[1] >= 3) {
        this.signal = 1;
        this.score[0]=this.score[0]+(3-this.state[0])*50;
        this.score[1]=this.score[1]+(3-this.state[1])*50;
        document.getElementById("one").innerHTML = parseInt(this.score[0]);
        document.getElementById("two").innerHTML = parseInt(this.score[1]);
        gEngine.GameLoop.stop();
    }

    this.mEnergy.setSum();
    this.fruit.setSum();
    this.leftCamera.updateWCcenter(this.mSnake1);
    this.rightCamera.updateWCcenter(this.mSnake2);
    this.mEnergy.produce();
    this.fruit.produce();
    if(this.score[0]>=500){this.mSnake1.upgrade(this.kUpgrade);}
    if(this.score[1]>=500){this.mSnake2.upgrade(this.kUpgrade);}

    }else{
        gEngine.ResourceMap.setLoadCompleteCallback(function(){
                  vTime=true;
        });
            this.mLoading[1].setPosition(0,-10);
            this.mLoading[1].update(-1);//(this.mTimePreserved-this.mLoadTime)/this.mTimePreserved

        if(vTime){//this.mLoadTime===0||
            this.loadComplete=true;
            this.initializeGame();
            vTime=false;
        }
    }
};

