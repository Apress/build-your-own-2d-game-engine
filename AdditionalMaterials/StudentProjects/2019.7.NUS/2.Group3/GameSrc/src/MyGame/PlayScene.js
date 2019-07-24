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

function PlayScene(mapIndex) {
    //to Upload the background
    this.kBG = "assets/ClassicalBackGround.png";
    this.kSprite = "assets/sprite.png";
    this.kAtlas = "assets/white.png";
    this.kUIButton = "assets/UI/button.png";
    this.kUIButton = "assets/UI/SimpleButton.png";
    this.kThermometer ="assets/thermometer.png";
    this.kButtons ="assets/buttons.png";
    this.kKunkun ="assets/kunkun.png";
    this.kPlaySceneBgm ="assets/AudioTest/PlaySceneBackGround.wav";
    this.kWinBgm = "assets/AudioTest/Win.mp3";
    this.kLoseBgm = "assets/AudioTest/Lose.wav";
    this.kBeenHit = "assets/AudioTest/BeenHit.wav";
    this.kFallDown = "assets/AudioTest/FallDown.mp3";
    this.kTrap = "assets/AudioTest/Trap.mp3";
    this.kJinitaimei = "assets/AudioTest/jinitaimei.mp3";
    this.kStoringForce = "assets/AudioTest/StoringForce.mp3";
    this.kGiveOutForce = "assets/AudioTest/GiveOutForce.wav";
    this.kShooterWeapon = "assets/AudioTest/ShooterWeapon.mp3";
    //need the wav file(to play audio)
    this.kPlayerEatIceCream = "assets/AudioTest/EatIceCream.wav";
    
    // The camera to view the scene
    this.mCamera = null;
    
    this.mBg = null;//background
    this.mMapManager = null;
    this.mIceCreamManager = null;
    this.mShadowManager = null;
    this.mPlayer = null;
    this.mFireManager = null;
    this.mKunkun = null;
    
    this.mGeneralUI = null;
    this.mPlayUI = null;
    this.mFinishUI = null;
    this.mPlayerDirectionUI = null;
    this.mEventUI = null;
    
    this.mapIndex = mapIndex;
    
    this.timeLast = 0;
    this.timeLastFrameCount = 0;
    
    this.hasWin_LosePlayOnce = false;
    
    this.stopUpdating = false;
    this.isVictory = false;
    this.isLost = false;
    this._VictoryFrameLast = 100 * 60;//距离胜利还有多少帧
    
    
    //To change the Scene
    this.LevelSelect = null;
}
gEngine.Core.inheritPrototype(PlayScene, Scene);


PlayScene.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kUIButton);
    gEngine.Textures.loadTexture(this.kSprite);
    gEngine.Textures.loadTexture(this.kBG);
    gEngine.Textures.loadTexture(this.kAtlas);
    gEngine.Textures.loadTexture(this.kButtons);
    gEngine.Textures.loadTexture(this.kKunkun);
    
    gEngine.AudioClips.loadAudio(this.kPlaySceneBgm);
    gEngine.AudioClips.loadAudio(this.kPlayerEatIceCream);
    gEngine.AudioClips.loadAudio(this.kWinBgm);
    gEngine.AudioClips.loadAudio(this.kLoseBgm);
    gEngine.AudioClips.loadAudio(this.kBeenHit);
    gEngine.AudioClips.loadAudio(this.kFallDown);
    gEngine.AudioClips.loadAudio(this.kTrap);
    gEngine.AudioClips.loadAudio(this.kStoringForce);
    gEngine.AudioClips.loadAudio(this.kGiveOutForce);
    gEngine.AudioClips.loadAudio(this.kShooterWeapon);
    gEngine.AudioClips.loadAudio(this.kJinitaimei);
};

PlayScene.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kUIButton);
    gEngine.Textures.unloadTexture(this.kBG);
    gEngine.Textures.unloadTexture(this.kAtlas);
    gEngine.Textures.unloadTexture(this.kSprite);
    gEngine.Textures.unloadTexture(this.kButtons);
    gEngine.Textures.unloadTexture(this.kKunkun);
    
    gEngine.AudioClips.unloadAudio(this.kPlaySceneBgm);
    gEngine.AudioClips.unloadAudio(this.kPlayerEatIceCream);
    gEngine.AudioClips.unloadAudio(this.kWinBgm);
    gEngine.AudioClips.unloadAudio(this.kLoseBgm);
    gEngine.AudioClips.unloadAudio(this.kBeenHit);
    gEngine.AudioClips.unloadAudio(this.kFallDown);
    gEngine.AudioClips.unloadAudio(this.kTrap);
    gEngine.AudioClips.unloadAudio(this.kStoringForce);
    gEngine.AudioClips.unloadAudio(this.kGiveOutForce);
    gEngine.AudioClips.unloadAudio(this.kShooterWeapon);
    gEngine.AudioClips.unloadAudio(this.kJinitaimei);
    if(this.mFinishUI.levelSelect === "PlayScene" + this.mapIndex.toString()){
        gEngine.Core.startScene(new PlayScene(this.mapIndex));
    }else if(this.mFinishUI.levelSelect === "PlayScene" + (this.mapIndex + 1).toString()){
        gEngine.Core.startScene(new PlayScene(this.mapIndex + 1));
    }else if(this.mFinishUI.levelSelect === "PlayScene" + (this.mapIndex - 1).toString()){
        gEngine.Core.startScene(new PlayScene(this.mapIndex - 1));
    }else if((this.mFinishUI.levelSelect === "MyGame")||(this.mPlayUI.levelSelect==="MyGame")){
        gEngine.Core.startScene(new MyGame());
    }
};

PlayScene.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(-15.5, -10), // position of the camera
        140,                     // width of camera
        [0,0,1500,900]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([1,234/255,167/255, 1]);
            // sets the background to gray
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    
    //set background
    var bgR = new SpriteRenderable(this.kBG);
    bgR.setElementPixelPositions(0, 4095, 0, 2047);
    bgR.getXform().setSize(140, 84);
    bgR.getXform().setPosition(-15.5, -10);
    this.mBg = new GameObject(bgR);
    
    this.mGeneralUI = new GeneralUI(this.kButtons,this.mCamera);
    this.mGeneralUI.initialize();    
    this.mFinishUI = new FinishUI(this.kSprite,this.mCamera,this);
    this.mFinishUI.initialize();
    this.mMapManager = new MapManager(this.kSprite,this.mCamera,this.mapIndex);
    this.mMapManager.initialize();
    this.mPlayUI = new PlayUI(this.kSprite,this.kButtons,this.mCamera,this,true);
    this.mPlayUI.initialize();
    this.mShadowManager = new ShadowManager(this.kSprite,this.mCamera);
    this.mKunkun=new Kunkun(this.kKunkun);
//    console.log(this.kShooterWeapon);
    this.mIceCreamManager = new IceCreamManager(this.kSprite,this.mCamera,this,false);
    this.mFireManager = new FireManager(this.kSprite,this.mCamera,this.mIceCreamManager,this.mMapManager,this.kShooterWeapon);
    this.mPlayer = new Player(this.kSprite,this.mCamera,this.mFireManager,this.kPlayerEatIceCream,this.kBeenHit,this.kFallDown,this.kTrap,this.kStoringForce,this.kGiveOutForce,false);
    this.mPlayer.initialize();
    
    gEngine.AudioClips.playBackgroundAudio(this.kPlaySceneBgm);
    this.mEventUI = new EventUI(this.kSprite,this.mPlayer,this.mCamera);
    this.mPlayerDirectionUI = new PlayerDirectionUI(this.kSprite,this.mPlayer);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
PlayScene.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    this.mCamera.setupViewProjection();
    this.mBg.draw(this.mCamera);
    this.mMapManager.draw();
    this.mShadowManager.draw();
    this.mIceCreamManager.beforePlayerDraw(this.mPlayer);
    this.mPlayer.draw(this.mCamera);
    this.mIceCreamManager.afterPlayerDraw(this.mPlayer);
    this.mGeneralUI.draw(this.mCamera);
    this.mPlayUI.draw(this.mCamera);
    this.mFireManager.draw();
    this.mPlayerDirectionUI.draw(this.mCamera,this.mPlayer);
    this.mEventUI.draw();
    this.mKunkun.draw(this.mCamera);
    this.mFinishUI.draw(this.mCamera);
};

PlayScene.prototype.update = function () {
    if(!this.stopUpdating){
        
        this.timeLastFrameCount++;
        this.timeLast = Number.parseFloat(this.timeLastFrameCount / 60).toFixed(1);
        
        this.mIceCreamManager.update(this.mMapManager);
        this.mMapManager.update();
        this._updatePlayerPositionByIndex();
//        console.log(this.mPlayer.canEatIceCream);
        if(this.mPlayer.t_pre_isDead === true && this.mPlayer.mIsDead === false){
            this.mPlayer.mIsDead = true;
        }
        this.mPlayer.update(this.mIceCreamManager.mIceCreamArray,this.mMapManager,this.mPlayUI);
        //_updatePlayerPositionByIndex必须要在this.mPlayer.update前面
        
        this.mShadowManager.HahaUpdate([this.mPlayer.originalX,this.mPlayer.originalY]);
        //press z to create an iceCream
        
        this._approachVictory();
        if(this.isVictory){
            this.playWin_LoseOnce = false;
            this.stopUpdating = true;
        }
        this._detectLost();
        if(this.isLost){
            this.stopUpdating = true;
        }
        
//        this._setMsg();
        this.mFireManager.update();
        this.mPlayerDirectionUI.update();
        this.mEventUI.update();
    }else{
        this.mFinishUI.update(this.mPlayer.eatIceCreamCount);
        
        if(this.isVictory && !this.hasWin_LosePlayOnce){
            gEngine.AudioClips.setCueVolume(30);
            gEngine.AudioClips.playACue(this.kWinBgm,30);
            gEngine.AudioClips.stopBackgroundAudio();
            this.hasWin_LosePlayOnce = true;
            
        }else if(this.isLost && !this.hasWin_LosePlayOnce){
            gEngine.AudioClips.setCueVolume(30);
            gEngine.AudioClips.playACue(this.kLoseBgm,30);
            gEngine.AudioClips.stopBackgroundAudio();
            this.hasWin_LosePlayOnce = true;
        }
    }
    this.mGeneralUI.update();
    this.mPlayUI.update();
    
    this._egg();
    
    
};

PlayScene.prototype._egg = function(){
    if(this.mPlayer.accumulateValue>0.15*60*10){//触发彩蛋
        this.mKunkun.play=true;
        this.mPlayUI.pauseSelect();
        gEngine.AudioClips.stopBackgroundAudio();
        gEngine.AudioClips.playJiNiTaiMeiAudio(this.kJinitaimei);
        this.mKunkun.mKunkun.getXform().setPosition(this.mPlayer.getXform().getXPos(),this.mPlayer.getXform().getYPos());
        this.mPlayer.accumulateValue=0;
        this.mPlayer.setBack();
    }
    if(this.mKunkun.play){
        this.mPlayer.setBack();
        this.mPlayer.accumulateValue=0;
        gEngine.AudioClips.setCueVolume(0);
        if(this.mKunkun.timecount>60 ){
            if(gEngine.Input.isAnyKeyClicked()){//结束彩蛋
                this.mKunkun.play=false;
                this.mKunkun.timecount=0;
            }
        }
        this.mKunkun.update();
        if(!this.mKunkun.play){
            gEngine.AudioClips.setCueVolume(30);
            gEngine.AudioClips.stopJiNiTaiMeiAudio();
            gEngine.AudioClips.playBackgroundAudio(this.kPlaySceneBgm);
            this.mPlayUI.pauseSelect();
        }

    }
};
PlayScene.prototype._detectLost = function(){
    if(this.mPlayer.temperature >= 100){
        this.isLost = true;
    }
};

//means survive the fixed time to win the game
PlayScene.prototype._approachVictory = function(){
    if(this._VictoryFrameLast <= 0 || this.mPlayer.temperature <= 0){
        this.isVictory = true;
    }else{
        this._VictoryFrameLast--;
    }
};

PlayScene.prototype._setMsg = function(){
    var dir = null;
    var msg;
    switch(this.mPlayer.direction){
        case this.mPlayer.DirectionEnum.RIGHT:  dir = "right";  break;
        case this.mPlayer.DirectionEnum.TOPRIGHT:   dir = "topright";   break;
        case this.mPlayer.DirectionEnum.TOP:    dir = "top";    break;
        case this.mPlayer.DirectionEnum.TOPLEFT:    dir = "topleft";    break;
        case this.mPlayer.DirectionEnum.LEFT:   dir = "left";   break;
        case this.mPlayer.DirectionEnum.BOTTOMLEFT: dir = "bottomleft"; break;
        case this.mPlayer.DirectionEnum.BOTTOM: dir = "bottom"; break;
        case this.mPlayer.DirectionEnum.BOTTOMRIGHT:    dir = "bottomright";    break;
    }
    document.getElementById("st1").innerHTML="player direction: " + dir;
    
    var tmp = Number.parseFloat(this.mPlayer.accumulateValue).toFixed(1);
    msg = "Storing Force Val: " + tmp.toString(); 

    document.getElementById("st2").innerHTML=msg;
    
    msg = "Player position(index) X: " + this.mPlayer.mXindex + ",Y: " + this.mPlayer.mYindex;
    document.getElementById("st3").innerHTML=msg;
    
    msg = "Player temperature: " + this.mPlayer.temperature;
    document.getElementById("st4").innerHTML=msg;    
    
    if(this.isLost){
        msg = "Gaming State: Lost";
    }else if(this.isVictory){
        msg = "Gaming State: Victory";
    }else{
        msg = "Gaming State: Playing";
    }
    document.getElementById("st5").innerHTML=msg;
};

//判断主角是否死亡
PlayScene.prototype._updatePlayerPositionByIndex = function(){
    var mapArr = this.mMapManager.MapArray;
    var i,j,l;
    var hasIterateAll = false;
    var pos = this.mPlayer.getXform().getPosition();
    breakpoint:{
        for(i=0;i<this.mMapManager.kHeight;i++){
            for(j=0;j<this.mMapManager.kWidth;j++){
                l = mapArr[i][j];
                if((!this.mPlayer.isJumping) && 
                        l.kXpos - l.kXsize / 2 <= pos[0]  && pos[0] <= l.kXpos + l.kXsize / 2 &&
                        l.kYpos - l.kYsize / 2 <= pos[1] - this.mPlayer.kCenterOffset && pos[1] - this.mPlayer.kCenterOffset  <= l.kYpos + l.kYsize / 2){
                    this.mPlayer.mXindex = l.kXindex;
                    this.mPlayer.mYindex = l.kYindex;
                    if(l.kTag === "Grass"){
                        this.mPlayer.mIsDead = false;
                        this.mPlayer.mLastXpos = l.kXpos;
                        this.mPlayer.mLastYpos = l.kYpos;
                    }else if(this.mPlayer.isJumping){
                        this.mPlayer.mIsDead = false;
                    }else{
                        this.mPlayer.mIsDead = true;
                        this.mPlayer.deathReason = this.mPlayer.DeathEnum.FALL;
                    }
//                    console.log("whether the player is dead: " + this.mPlayer.mIsDead);
                    break breakpoint;
                }
                if(i === this.mMapManager.kHeight - 1 && j === this.mMapManager.kWidth - 1){
                    hasIterateAll = true;
                }
            }
        }
    }

    if(hasIterateAll && !this.mPlayer.isJumping){
        this.mPlayer.mXindex = null;
        this.mPlayer.mYindex = null;
        this.mPlayer.mIsDead = true;
        this.mPlayer.deathReason = this.mPlayer.DeathEnum.FALL;
    }
};

