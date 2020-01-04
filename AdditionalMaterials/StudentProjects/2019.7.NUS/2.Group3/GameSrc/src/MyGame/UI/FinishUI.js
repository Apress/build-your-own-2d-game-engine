
"use strict";  // Operate in Strict mode such that variables must be declared before used!

function FinishUI(spriteTexture,camera,playscene,isEndless) {
    this.isEndless = isEndless;
    this.kPlayscene=playscene;
    this.kspriteTexture=spriteTexture;
    this.mCamera=camera;//UIText
    this.timeLast = new UIText("text",[750,350],5,1,0,[1,1,1,1]);
    this.iceCreamEatCountText = new UIText("text",[750,300],5,1,0,[1,1,1,1]);
    this.ReplayButton = new UIButton(this.replaySelect,this,[750,200],[200,50],"Replay",6);
    this.MainMenuButton = new UIButton(this.mainMenuSelect,this,[750,100],[200,50],"Main Menu",6);
    this.NextMapButton = new UIButton(this.nextSelest,this,[1000,150],[200,40],"Next Map",4);
    this.PreMapButton = new UIButton(this.preSelest,this,[500,150],[200,40],"Previous Map",4);
    this.winScene=null;
    this.lostScene=null;
    this.timecount=1;
    this.darkness=null;
    this.levelSelect = null;
}
FinishUI.prototype.initialize=function(){    
    this.winScene = new SpriteRenderable(this.kspriteTexture);
    this.winScene.setColor([0.8, 0.6, 0.2, 0]);
    this.winScene.getXform().setPosition(-15.5, 0);
    this.winScene.getXform().setSize(30,40);
    this.winScene.setElementPixelPositions(0, 280, 512, 832);    
    this.lostScene = new SpriteRenderable(this.kspriteTexture);
    this.lostScene.setColor([0, 0.6, 0.8, 0]);
    this.lostScene.getXform().setPosition(-15.5, 0);
    this.lostScene.getXform().setSize(30,40);
    this.lostScene.setElementPixelPositions(0, 256, 832, 1152);    
    this.darkness = new SpriteRenderable(this.kspriteTexture);
    this.darkness.setColor([0,0,0, 0.5]);
    this.darkness.getXform().setPosition(-15.5, 0);
    this.darkness.getXform().setSize(1000,1000);
    this.darkness.setElementPixelPositions(560,590,40,60);
    this.firstPic=true;
};
FinishUI.prototype.update = function(iceCreamEatCount){
    this.timecount++;
    if(this.timecount>30){
        this.timecount=0;
        this.changePic();
    }
    this.ReplayButton.update();
    this.MainMenuButton.update();
    if(this.kPlayscene.mapIndex<11){
        this.NextMapButton.update();
    }
    if(this.kPlayscene.mapIndex>0){
        this.PreMapButton.update();
    }
    this.iceCreamEatCountText.setText("Ice creams you ate: " + iceCreamEatCount);
    this.timeLast.setText("Time you have survived: " + this.kPlayscene.timeLast);
};
FinishUI.prototype.changePic=function(){
    this.firstPic=!this.firstPic;
    if(this.firstPic){
        this.winScene.setElementPixelPositions(0, 280, 520, 832);    
        this.lostScene.setElementPixelPositions(0, 256, 832, 1152);
    }else{
        this.winScene.setElementPixelPositions(280, 520, 520, 832);    
        this.lostScene.setElementPixelPositions(256, 512, 832, 1152);
    }
};
FinishUI.prototype.draw = function () {
    if(this.kPlayscene.isVictory||this.kPlayscene.isLost){
        this.darkness.draw(this.mCamera);
        this.ReplayButton.draw(this.mCamera);
        this.MainMenuButton.draw(this.mCamera); 
        this.iceCreamEatCountText.draw(this.mCamera);
        this.timeLast.draw(this.mCamera);
        if(this.kPlayscene.mapIndex<11){
            this.NextMapButton.draw(this.mCamera);
        }
        if(this.kPlayscene.mapIndex>0){
            this.PreMapButton.draw(this.mCamera);
        }
    }      
    if(this.kPlayscene.isVictory){
        this.winScene.draw(this.mCamera);
    }    
    if(this.kPlayscene.isLost){
        this.lostScene.draw(this.mCamera);
    }
    

};
FinishUI.prototype.replaySelect=function(){
    var i=this.kPlayscene.mapIndex;
    this.levelSelect = "PlayScene" + i.toString();
    gEngine.GameLoop.stop();
    gEngine.AudioClips.setCueVolume(0);
    
};
FinishUI.prototype.mainMenuSelect=function(){
    this.levelSelect = "MyGame";
    gEngine.AudioClips.setCueVolume(0);
    gEngine.GameLoop.stop();
};
FinishUI.prototype.nextSelest=function(){
    var i=this.kPlayscene.mapIndex;
    this.levelSelect = "PlayScene" + (i+1).toString();
    gEngine.AudioClips.setCueVolume(0);
    gEngine.GameLoop.stop();
};
FinishUI.prototype.preSelest=function(){
    var i=this.kPlayscene.mapIndex;
    this.levelSelect = "PlayScene" + (i-1).toString();
    gEngine.AudioClips.setCueVolume(0);
    gEngine.GameLoop.stop();
}