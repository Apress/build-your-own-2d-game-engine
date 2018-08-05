/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

"use strict";
var numbers = ["+3","+8","*3","*4","+7","+8",
                   "+1","+5","+4","+3","+11","+8",
                   "+2","+9","-5","-17","+3","+12","*2","*5","+2","-5"];
    var shown = ["+3","*3","+7",
                 "+1","+4","+11",
                 "+2","-5","+3","*2","+2"];
             
    var msg1,msg2,msg3;
    
    var isLevel6Win;
    
function Level6(){
    
    isLevel6Win = true;
    
    this.kBg = "assets/bg7-3.png";
    
    this.mCamera = null;

    this.mMsg = null;
    this.mShapeMsg = null;
    
    this.mAllObjs = null;
    this.mAllParticles = null;
    this.mBounds = null;
    this.mCollisionInfos = [];
    this.mHero = null;
    this.mHerine = null;
    //this.mtrigger=null;
    this.mCurrentObj = 0;
    this.mTarget = null;
    this.mRain = null;
}
gEngine.Core.inheritPrototype(Level6, Scene);

Level6.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kBg);
};

Level6.prototype.unloadScene = function() {
    gEngine.LayerManager.cleanUp();
    
    gEngine.Textures.unloadTexture(this.kBg);
   
   if(isLevel6Win === true) {
        var nextLevel = new Level4();  // next level to be loaded
        gEngine.Core.startScene(nextLevel);
    }
   
};

Level6.prototype.initialize = function() {
    this.mCamera = new Camera(
        vec2.fromValues(50, 40), // position of the camera
        100,                     // width of camera
        [0, 0, 720, 720]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    
    msg1 = "31 =  "+shown[0]+" "+shown[1]+" "+shown[2];
    msg2 = "17 =  "+shown[3]+" "+shown[4]+" "+shown[5];
    msg3 = "30 =  "+"( "+shown[6]+shown[7]+shown[8]+" ) "+shown[9]+" "+shown[10];
    var bgR = new IllumRenderable(this.kBg,this.kBg);
        bgR.getXform().setSize(100, 100);
        bgR.getXform().setPosition(50, 40);        
    this.mBg = new GameObject(bgR);
    this.mTrigger = new Renderable();
    this.mTrigger.getXform().setPosition(38,79);
    this.mTrigger.setColor([1,0,0,1]);
    
    this.mTrigger1 = new Renderable();
    this.mTrigger1.getXform().setPosition(60,79);
    this.mTrigger1.setColor([1,0,0,1]);
    
    this.mTrigger2 = new Renderable();
    this.mTrigger2.getXform().setPosition(82,79);
    this.mTrigger2.setColor([1,0,0,1]);
    
    this.mTrigger3 = new Renderable();
    this.mTrigger3.getXform().setPosition(38,65);
    this.mTrigger3.setColor([1,0,0,1]);
    
    this.mTrigger4 = new Renderable();
    this.mTrigger4.getXform().setPosition(60,65);
    this.mTrigger4.setColor([1,0,0,1]);
    
    this.mTrigger5 = new Renderable();
    this.mTrigger5.getXform().setPosition(82,65);
    this.mTrigger5.setColor([1,0,0,1]);
    
    this.mTrigger6 = new Renderable();
    this.mTrigger6.getXform().setPosition(25,51);
    this.mTrigger6.setColor([1,0,0,1]);
    
    this.mTrigger7 = new Renderable();
    this.mTrigger7.getXform().setPosition(41,51);
    this.mTrigger7.setColor([1,0,0,1]);
    
    this.mTrigger8 = new Renderable();
    this.mTrigger8.getXform().setPosition(57,51);
    this.mTrigger8.setColor([1,0,0,1]);

    this.mTrigger9 = new Renderable();
    this.mTrigger9.getXform().setPosition(73,51);
    this.mTrigger9.setColor([1,0,0,1]);
    
    this.mTrigger10 = new Renderable();
    this.mTrigger10.getXform().setPosition(90,51);
    this.mTrigger10.setColor([1,0,0,1]);
    
    this.mMsg = new FontRenderable("We met at 17th");
    this.mMsg.setColor([1, 1, 1, 1]);
    this.mMsg.getXform().setPosition(24, 33);
    this.mMsg.setTextHeight(3);
    
    this.mMsg5 = new FontRenderable("I decided to talk to you at 30th");;
    this.mMsg5.setColor([1, 1, 1, 1]);
    this.mMsg5.getXform().setPosition(24,29);
    this.mMsg5.setTextHeight(3);
    
    this.mMsg6 = new FontRenderable("Today is 31th");
    this.mMsg6.setColor([1, 1, 1, 1]);
    this.mMsg6.getXform().setPosition(24,25);
    this.mMsg6.setTextHeight(3);
    
    this.mMsg1 = new FontRenderable("Status");
    this.mMsg1.setColor([0, 1, 0, 1]);
    this.mMsg1.getXform().setPosition(24, 72);
    this.mMsg1.setTextHeight(3);
    
    this.mMsg2 = new FontRenderable("Status");
    this.mMsg2.setColor([0, 1, 0, 1]);
    this.mMsg2.getXform().setPosition(24, 59);
    this.mMsg2.setTextHeight(3);
    
    this.mMsg3 = new FontRenderable("Status");
    this.mMsg3.setColor([0, 1, 0, 1]);
    this.mMsg3.getXform().setPosition(24, 45);
    this.mMsg3.setTextHeight(3);
    
    this.mMsg4 = new FontRenderable("Click the Boxes to change number");
    this.mMsg4.setColor([0, 1, 0, 1]);
    this.mMsg4.getXform().setPosition(24, 10);
    this.mMsg4.setTextHeight(2.3);
;}

Level6.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    this.mCamera.setupViewProjection();
    
    this.mBg.draw(this.mCamera);
    this.mTrigger.draw(this.mCamera);
    this.mTrigger1.draw(this.mCamera);
    this.mTrigger2.draw(this.mCamera);
    this.mTrigger3.draw(this.mCamera);
    this.mTrigger4.draw(this.mCamera);
    this.mTrigger5.draw(this.mCamera);
    this.mTrigger6.draw(this.mCamera);
    this.mTrigger7.draw(this.mCamera);
    this.mTrigger8.draw(this.mCamera);
    this.mTrigger9.draw(this.mCamera);
    this.mTrigger10.draw(this.mCamera);
    this.mMsg.draw(this.mCamera);
    this.mMsg1.draw(this.mCamera);
    this.mMsg2.draw(this.mCamera);
    this.mMsg3.draw(this.mCamera);
    this.mMsg5.draw(this.mCamera);
    this.mMsg6.draw(this.mCamera);
        this.mMsg4.draw(this.mCamera);
};
    
Level6.prototype.update = function () {
    
    var pX = gEngine.Input.getMousePosX();
    var pY = gEngine.Input.getMousePosY();
    //this.mMsg.setText(" " + pX +" "+pY);
    this.mMsg1.setText(msg1);
    this.mMsg2.setText(msg2);
    this.mMsg3.setText(msg3);
    
    
    if(gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Left)){
        //row0
        if(pX>136&&pY>417&&pX<235&&pY<459){
            this.mTrigger6.getXform().setPosition(52-this.mTrigger6.getXform().getPosition()[0],51);
            if(shown[6]===numbers[12]){shown[6]=numbers[13];}
            else{shown[6]=numbers[12];}
            msg3 = "30 =  "+"( "+shown[6]+shown[7]+shown[8]+" ) "+shown[9]+" "+shown[10];
            this.mMsg3.setText(msg3);
        }
        if(pX>250&&pY>417&&pX<352&&pY<459){
            this.mTrigger7.getXform().setPosition(84-this.mTrigger7.getXform().getPosition()[0],51);
            if(shown[7]===numbers[14]){shown[7]=numbers[15];}
            else{shown[7]=numbers[14];}
            msg3 = "30 =  "+"( "+shown[6]+shown[7]+shown[8]+" ) "+shown[9]+" "+shown[10];
            this.mMsg3.setText(msg3);
        }
        if(pX>368&&pY>417&&pX<468&&pY<459){
            this.mTrigger8.getXform().setPosition(116-this.mTrigger8.getXform().getPosition()[0],51);
             if(shown[8]===numbers[16]){shown[8]=numbers[17];}
            else{shown[8]=numbers[16];}
            msg3 = "30 =  "+"( "+shown[6]+shown[7]+shown[8]+" ) "+shown[9]+" "+shown[10];
            this.mMsg3.setText(msg3);
        }
        if(pX>485&&pY>417&&pX<586&&pY<459){
            this.mTrigger9.getXform().setPosition(148-this.mTrigger9.getXform().getPosition()[0],51);
            if(shown[9]===numbers[18]){shown[9]=numbers[19];}
            else{shown[9]=numbers[18];}
            msg3 = "30 =  "+"( "+shown[6]+shown[7]+shown[8]+" ) "+shown[9]+" "+shown[10];
            this.mMsg3.setText(msg3);
        }
        if(pX>602&&pY>417&&pX<703&&pY<459){
            this.mTrigger10.getXform().setPosition(182-this.mTrigger10.getXform().getPosition()[0],51);
             if(shown[10]===numbers[20]){shown[10]=numbers[21];}
            else{shown[10]=numbers[20];}
            msg3 = "30 =  "+"( "+shown[6]+shown[7]+shown[8]+" ) "+shown[9]+" "+shown[10];
            this.mMsg3.setText(msg3);
        }
        
        //row1
        if(pX>228&&pY>515&&pX<332&&pY<561){
            this.mTrigger3.getXform().setPosition(78-this.mTrigger3.getXform().getPosition()[0],65);
            if(shown[3]===numbers[6]){shown[3]=numbers[7];}
            else{shown[3]=numbers[6];}
            msg2 = "17 =  "+shown[3]+" "+shown[4]+" "+shown[5];
            this.mMsg3.setText(msg3);
        }
        if(pX>388&&pY>515&&pX<489&&pY<561){
            this.mTrigger4.getXform().setPosition(122-this.mTrigger4.getXform().getPosition()[0],65);
             if(shown[4]===numbers[8]){shown[4]=numbers[9];}
            else{shown[4]=numbers[8];}
            msg2 = "17 =  "+shown[3]+" "+shown[4]+" "+shown[5];
            this.mMsg3.setText(msg3);
        }
        if(pX>546&&pY>515&&pX<649&&pY<561){
            this.mTrigger5.getXform().setPosition(166-this.mTrigger5.getXform().getPosition()[0],65);
             if(shown[5]===numbers[10]){shown[5]=numbers[11];}
            else{shown[5]=numbers[10];}
            msg2 = "17 =  "+shown[3]+" "+shown[4]+" "+shown[5];
            this.mMsg3.setText(msg3);
        }
        
        //row2
        if(pX>228&&pY>615&&pX<332&&pY<663){
            this.mTrigger.getXform().setPosition(78-this.mTrigger.getXform().getPosition()[0],79);
            if(shown[0]===numbers[0]){shown[0]=numbers[1];}
            else{shown[0]=numbers[0];}
            msg1 = "31 =  "+shown[0]+" "+shown[1]+" "+shown[2];
            this.mMsg3.setText(msg3);
        }
        if(pX>388&&pY>615&&pX<489&&pY<663){
            this.mTrigger1.getXform().setPosition(122-this.mTrigger1.getXform().getPosition()[0],79);
             if(shown[1]===numbers[2]){shown[1]=numbers[3];}
            else{shown[1]=numbers[2];}
            msg1 = "31 =  "+shown[0]+" "+shown[1]+" "+shown[2];
            this.mMsg3.setText(msg3);
        }
        if(pX>546&&pY>615&&pX<649&&pY<663){
            this.mTrigger2.getXform().setPosition(166-this.mTrigger2.getXform().getPosition()[0],79);
            if(shown[2]===numbers[4]){shown[2]=numbers[5];}
            else{shown[2]=numbers[4];}
            msg1 = "31 =  "+shown[0]+" "+shown[1]+" "+shown[2];
            this.mMsg3.setText(msg3);
        }
        
        if((msg1 === "31 =  +8 *3 +7")&&
            (msg2 === "17 =  +5 +4 +8")&&
            (msg3 === "30 =  ( +9-5+3 ) *5 -5"))
        {
            isLevel6Win = true;
            gEngine.GameLoop.stop();
        }
        
        
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.L)){
        gEngine.GameLoop.stop();
    }
    if(gEngine.Input.isButtonPressed(gEngine.Input.keys.Right)) {
            isLevel6Win = true;
            gEngine.GameLoop.stop();
        }
    
};


