"use strict";  // Operate in Strict mode such that variables must be declared before used!

function SelectUI(spriteTexture,camera,nameTexture,context) {
    this.mContext=context;
    this.spriteTexture=spriteTexture;
    this.mCamera=camera;
    this.nameTexture=nameTexture;
    this.display = false;
    this.modeBox = null;
    this.mapBox = null;
    this.modeButtons = [];
    this.mapButtons = [];
    this.modeSelected = 0;
    this.mapSelected = 0;
    this.backButton = null;
    this.startButton = null;
    this.modeText = null;
    this.mapText = null;
}
SelectUI.prototype.initialize=function(){
    var i;
    this.backButton = new UIButton(this.BackSelect,this,[600,50],[180,60],"Back",9);
    this.startButton = new UIButton(this.StartSelect,this,[950,50],[180,60],"Start",9);
    this.mapBox=new SpriteRenderable(this.spriteTexture);
    this.mapBox.setColor([0.9,0.9, 0.8,0]);
    this.mapBox.getXform().setPosition(-15.5,-5);
    this.mapBox.getXform().setSize(120,68);
    this.mapBox.setElementPixelPositions(1800,1900,200,300);
    var bx=0,by=591,dx=432,dy=-196;
    var pixelPos=[
        [bx,bx+dx,by-1,by+dy-1],
        [bx+dx,bx+2*dx,by-1,by+dy-1],
        [bx+dx*2,bx+dx*3,by-1,by+dy-1],
        [bx+dx*3,bx+dx*4,by-1,by+dy-1],
        [bx,bx+dx,by+dy-1,by+2*dy-1],
        [bx+dx,bx+2*dx,by+dy-1,by+2*dy-1],
        [bx+dx*2,bx+dx*3,by+dy-1,by+2*dy-1],
        [bx+dx*3,bx+dx*4,by+dy-1,by+2*dy-1],
        [bx,bx+dx,by+2*dy-1,by+dy*3-1],
        [bx+dx,bx+2*dx,by+2*dy-1,by+dy*3-1],
        [bx+dx*2,bx+dx*3,by+2*dy-1,by+dy*3-1],
        [bx+dx*3,bx+dx*4,by+2*dy-1,by+dy*3-1]
    ];
    var px=-38;
    var py=-20;
    var basey=-10;
    for(i=0;i<12;i++){
        var tempMapButton = new SpriteRenderable(this.nameTexture);
        tempMapButton.setColor([0.2,0.9,0.5,1]);
        tempMapButton.getXform().setPosition((i<4?i:(i<8?i-4:i-8))*22+px,i<4?basey:(i<8?basey-10:basey-20));
        tempMapButton.getXform().setSize(9*2.3,9);
        tempMapButton.setElementPixelPositions(pixelPos[i][0],pixelPos[i][1],pixelPos[i][3],pixelPos[i][2]);
        this.mapButtons.push(tempMapButton);
    }
    this.modeButtons[0] = new SpriteRenderable(this.nameTexture);
    this.modeButtons[0].setColor([0.2,0.9,0.5,0]);
    this.modeButtons[0].getXform().setPosition(-25,16);
    this.modeButtons[0].getXform().setSize(32,21);
    this.modeButtons[0].setElementPixelPositions(1024+512,2047,640,1023);
    this.modeButtons[1] = new SpriteRenderable(this.nameTexture);
    this.modeButtons[1].setColor([0.2,0.9,0.5,0]);
    this.modeButtons[1].getXform().setPosition(15,16);
    this.modeButtons[1].getXform().setSize(32,21);
    this.modeButtons[1].setElementPixelPositions(1024,1024+512,640,1023);
    
    this.modeText = new FontRenderable("Select Mode");
    this.modeText.setColor([0,0,0,1]);
    this.modeText.getXform().setPosition(-72,12);
    this.modeText.setTextHeight(5);    
    this.mapText = new FontRenderable("Select Map");
    this.mapText.setColor([0,0,0,1]);
    this.mapText.getXform().setPosition(-72,-20);
    this.mapText.setTextHeight(5);    
    this.classic = new FontRenderable("CLASSIC");
    this.classic.setColor([0,0,0,1]);
    this.classic.getXform().setPosition(-32,3);
    this.classic.setTextHeight(5);    
    this.survive = new FontRenderable("SURVIVE");
    this.survive.setColor([0,0,0,1]);
    this.survive.getXform().setPosition(7,3);
    this.survive.setTextHeight(5);
}
SelectUI.prototype.draw=function(){
    if(this.display){
        this.mapBox.draw(this.mCamera);
        this.modeButtons[0].draw(this.mCamera);
        this.modeButtons[1].draw(this.mCamera);
        var i;
        for(i=0;i<12;i++){
            this.mapButtons[i].draw(this.mCamera);
        }
        this.modeText.draw(this.mCamera);
        this.mapText.draw(this.mCamera);
        this.classic.draw(this.mCamera);
        this.survive.draw(this.mCamera);
        this.backButton.draw(this.mCamera);
        this.startButton.draw(this.mCamera);
    }
}
SelectUI.prototype.update=function(){
    var i;
    var index=this.getMouseIndex();
    if(index!==-1){
        if(gEngine.Input.isButtonClicked(0)){
            if(index<12){
                this.mapSelected=index;
            }else{
                this.modeSelected=index-12;
            }
        }
    }
    for(i=0;i<12;i++){
        this.mapButtons[i].setColor([0.2,0.9,0.5,0]);
    }
    this.modeButtons[0].setColor([0.2,0.9,0.5,0]);
    this.modeButtons[1].setColor([0.2,0.9,0.5,0]);
    this.mapButtons[this.mapSelected].setColor([221/255, 158/255, 82/255,1]);
    if(this.modeSelected===0){
        this.modeButtons[0].setElementPixelPositions(0,510,640,1023);
        this.modeButtons[1].setElementPixelPositions(1024,1024+512,640,1023);
    }else{
        this.modeButtons[1].setElementPixelPositions(512,1024,640,1023);
        this.modeButtons[0].setElementPixelPositions(1024+512,2047,640,1023);
    }
    this.startButton.update();
    this.backButton.update();
    
}
SelectUI.prototype.getMouseIndex=function(){
    var mousePos=getMousePosInWC();
    var i;
    for(i=0;i<12;i++){
        if(this.mapButtons[i].getXform().isIn(mousePos[0],mousePos[1])){
            return i;
        }
    }
    if(this.modeButtons[0].getXform().isIn(mousePos[0],mousePos[1])||this.classic.mXform.isIn(mousePos[0],mousePos[1])){
        return 12;
    }
    if(this.modeButtons[1].getXform().isIn(mousePos[0],mousePos[1])||this.survive.mXform.isIn(mousePos[0],mousePos[1])){
        return 13;
    }
    return -1;
}
SelectUI.prototype.StartSelect=function(){
    this.mContext.LevelSelect=this.modeSelected*12+this.mapSelected;
    gEngine.AudioClips.stopBackgroundAudio();
    gEngine.GameLoop.stop();
}
SelectUI.prototype.BackSelect=function(){
    this.display=false;
}