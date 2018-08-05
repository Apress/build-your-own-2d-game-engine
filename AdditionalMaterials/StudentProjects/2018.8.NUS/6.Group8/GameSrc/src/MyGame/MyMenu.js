/*
* MyMenu.js
* This file describe the menu
* 2018.7.24
*
*/

"use strict";
var AllEndings = [{name:"Ending 1: you are killed", pic:"assets/Endings/Ending_0.png", flag:false},
                  {name:"Ending 2: die because of starvation",pic:"assets/Endings/Ending_1.png", flag:false},
                  {name:"Ending 3: defeated and arrested",pic:"assets/Endings/Ending_2.png", flag:false},
                  {name:"Ending 4: go for the princess and arrested",pic:"assets/Endings/Ending_3.png", flag:false},
                  {name:"Ending 5: beat the king with the princess",pic:"assets/Endings/Ending_4.png", flag:false},
                  {name:"Ending 6: killed by the king",pic:"assets/Endings/Ending_5.png", flag:false},
                  {name:"Ending 7: killed by the princess",pic:"assets/Endings/Ending_6.png", flag:false},
                  {name:"Ending 8: defeat the king",pic:"assets/Endings/Ending_7.png", flag:false},
                  {name:"Ending 9: defeat the duke and save the king",pic:"assets/Endings/Ending_8.png", flag:false},
                  {name:"Ending 10: defeat the duke but the king die",pic:"assets/Endings/Ending_9.png", flag:false},
                  {name:"Ending 11: killed by the duke",pic:"assets/Endings/Ending_10.png", flag:false},
                  {name:"Ending 12: defeat the princess",pic:"assets/Endings/Ending_11.png", flag:false},
                  {name:"Ending 13: normal life",pic:"assets/Endings/Ending_12.png", flag:false}];

var center_0 = [650,300];
function MyMenu(){
    //console.log(AllEndings);
    this.bgBackground = "assets/StartScene/background.png";
    this.CursorTexture = "assets/StartScene/CrownIcons_007.png";
    this.NameTexture = "assets/StartScene/Name.png";
    this.HelpTexture = "assets/StartScene/Help.png";
    
    this.mBackground = null;
    this.back = null;
    this.Cursor = null;
    this.Name = null;
    
    this.EndingCursor = null;
    this.mText = [];
    this.bgMsg = null;
    this.endingView = null;
    
    this.current = [0,6];
    
    this.choice = 0;
    this.isShow = false;
    
    this.mCamera = null;
    this.EndingCamera = null;
    
    this.mText1 = null;
    this.mText2 = null;
    this.mText3 = null;
    this.mText4 = null;
    
    this.Help = null;
    
    this.isHelpOpen = false;
    this.isEndingOpen = false;
    
    this.BGM = "assets/StartScene/PilotsOfStone.mp3";
    
    this.endingChoice = 0;
    this.endingFlag = [];

    this.hint1 = null;
    this.hint2 = null;

    // cookie
    this.cookiemanager = new cookieManager();
    
    
    if(!gEngine.ResourceMap.isAssetLoaded("endings")){
        console.log("request");
        gEngine.ResourceMap.asyncLoadRequested("endings");
        gEngine.ResourceMap.asyncLoadCompleted("endings",AllEndings);
    }else{
        console.log("load");
        AllEndings = gEngine.ResourceMap.retrieveAsset("endings");
        console.log(AllEndings);
    }
}

//gEngine.Core.inheritPrototype(MyMenu, Scene);

MyMenu.prototype.loadScene = function () {
    //暂时没有图片
    gEngine.Textures.loadTexture(this.bgBackground);
    gEngine.Textures.loadTexture(this.CursorTexture);
    gEngine.Textures.loadTexture(this.NameTexture);
    gEngine.Textures.loadTexture(this.HelpTexture);
    gEngine.AudioClips.loadAudio(this.BGM);
    
    for(var i=0;i<13;i++){
        gEngine.Textures.loadTexture(AllEndings[i].pic);
    }

}

MyMenu.prototype.unloadScene = function () {

    //暂时没有图片
     gEngine.Textures.unloadTexture(this.bgBackground);
     gEngine.Textures.unloadTexture(this.CursorTexture);
     gEngine.Textures.unloadTexture(this.NameTexture);
     gEngine.Textures.unloadTexture(this.HelpTexture);
    //开始游戏
    for(var i=0;i<13;i++){
        gEngine.Textures.unloadTexture(AllEndings[i].pic);
    }
    
    gEngine.AudioClips.stopBackgroundAudio();
    gEngine.AudioClips.unloadAudio(this.BGM);
    
    var nextscene= new MyGame();
    gEngine.Core.startScene(nextscene);
}

MyMenu.prototype.initialize = function () {
    this.mCamera = new Camera(
        vec2.fromValues(650, 300), // position of the camera
        1300,                     // width of camera
        [0, 0, 1300, 600],         // viewport (orgX, orgY, width, height)
        1
    );
    this.mCamera.setBackgroundColor([0,0.8,0.8,0]);
    
    this.mBackground = new TextureRenderable(this.bgBackground);
    this.mBackground.getXform().setSize(1800,600);
    this.mBackground.setColor([1,0,0,0]);
    this.mBackground.getXform().setPosition(505,300);
    
    this.Cursor = new TextureRenderable(this.CursorTexture);
    this.Cursor.getXform().setSize(70,90);
    this.Cursor.setColor([1,0,0,0]);
    this.Cursor.getXform().setPosition(830,250);
    
    this.Help = new TextureRenderable(this.HelpTexture);
    this.Help.getXform().setSize(512,512);
    this.Help.setColor([1,0,0,0]);
    this.Help.getXform().setPosition(350,300);
    
    this.Name = new TextureRenderable(this.NameTexture);
    this.Name.getXform().setSize(1024,200);
    this.Name.setColor([1,0,0,0]);
    this.Name.getXform().setPosition(1130,450);

    this.mText1 = new FontRenderable("Start Game");
    this.mText1.setColor([0,0,0,1]);
    this.mText1.getXform().setPosition(900,250);
    this.mText1.setTextHeight(35);
    
    this.mText2 = new FontRenderable("How to Play");
    this.mText2.setColor([0,0,0,1]);
    this.mText2.getXform().setPosition(900,180);
    this.mText2.setTextHeight(35);
    
    this.mText3 = new FontRenderable("Endings Overview");
    this.mText3.setColor([0,0,0,1]);
    this.mText3.getXform().setPosition(900,110);
    this.mText3.setTextHeight(35);

    this.mText4 = new FontRenderable("[press ENTER to confirm]");
    this.mText4.setColor([1,1,1,1]);
    this.mText4.getXform().setPosition(900,50);
    this.mText4.setTextHeight(25);
    
    this.hint1 = new FontRenderable("[press ENTER to show the detail]");
    this.hint1.setColor([1,1,1,1]);
    this.hint1.getXform().setPosition(830,40);
    this.hint1.setTextHeight(25);
    
    this.hint2 = new FontRenderable("[press SPACE to return]");
    this.hint2.setColor([1,1,1,1]);
    this.hint2.getXform().setPosition(830,40);
    this.hint2.setTextHeight(25);
    
    this.EndingCamera = new Camera(
        vec2.fromValues(650, 300), // position of the camera
        1100,                     // width of camera
        [100, 50, 1100, 500],         // viewport (orgX, orgY, width, height)
        1
    );
    this.EndingCamera.setBackgroundColor([0,0.8,0.8,0]);
    
    
    this.EndingCursor = new TextureRenderable(this.CursorTexture);
    this.EndingCursor.getXform().setSize(60,80);
    this.EndingCursor.setColor([1,0,0,0]);
    this.EndingCursor.getXform().setPosition(140,500);

    for(var i=0;i<13;i++){
        var fr;
        //console.log(i);

        var flag = this.cookiemanager.getCookie("Ending"+i);
        if(flag=="true"){
            AllEndings[i].flag = true;
        }
        else if(flag=="false"){
            AllEndings[i].flag = false;
        }
        console.log("cookie test:"+flag);

        if(AllEndings[i].flag)
            fr = new FontRenderable(AllEndings[i].name);
        else
            fr = new FontRenderable("Ending "+(i+1)+":     ???      ");
        fr.setColor([1,1,1,1]);
        fr.getXform().setPosition(200,500-i*70);
        fr.setTextHeight(35);
        this.mText.push(fr);
        
    }
    
    this.bgMsg = new Renderable();
    this.bgMsg.getXform().setPosition(650,300);
    this.bgMsg.getXform().setSize(1100,500);
    this.bgMsg.setColor([0,0,0,0.2]);
    
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    
    gEngine.AudioClips.playBackgroundAudio(this.BGM);   
    



}

MyMenu.prototype.draw = function () {
    gEngine.Core.clearCanvas([0,0,0,1]);

    this.mCamera.setupViewProjection();
    this.mBackground.draw(this.mCamera);
    if(this.isEndingOpen==false){
        this.Cursor.draw(this.mCamera);
        this.Name.draw(this.mCamera);
        if(this.isHelpOpen==true){
            this.Help.draw(this.mCamera);
        }
        this.mText1.draw(this.mCamera);
        this.mText2.draw(this.mCamera);
        this.mText3.draw(this.mCamera);
        this.mText4.draw(this.mCamera);
    }
    else{
        if(this.isShow==false) this.hint1.draw(this.mCamera);
        else{
            this.hint2.draw(this.mCamera);
        }
        this.EndingCamera.setupViewProjection();       
        this.bgMsg.draw(this.EndingCamera);
        this.EndingCursor.draw(this.EndingCamera);
        for(var i=0;i<13;i++){
            this.mText[i].draw(this.EndingCamera);
        }
        if(this.isShow==true){       
            this.endingView.draw(this.EndingCamera);
        }
    }
}

MyMenu.prototype.update = function () {
    if(this.choice==0){
        if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter)){
            gEngine.GameLoop.stop();
        }
        if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Up)){
            this.choice = 2;
            var temp = this.Cursor.getXform().mPosition;
            this.Cursor.getXform().setPosition(temp[0],temp[1]-70*2);
        }
        if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Down)){
            this.choice = 1;
            var temp = this.Cursor.getXform().mPosition;
            this.Cursor.getXform().setPosition(temp[0],temp[1]-70);
        }
    }
    else if(this.choice==1){
        if(this.isHelpOpen == true){
            if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)){
                this.isHelpOpen=false;
            }
        }
        else{
            if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter)){
                this.isHelpOpen=true;
            }
        }  
        if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Up)){
            this.choice = 0;
            var temp = this.Cursor.getXform().mPosition;
            this.Cursor.getXform().setPosition(temp[0],temp[1]+70);
        }
        if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Down)){
            this.choice = 2;
            var temp = this.Cursor.getXform().mPosition;
            this.Cursor.getXform().setPosition(temp[0],temp[1]-70);
        }
    }
    else if(this.choice==2){
        if(this.isEndingOpen==false){   //还没打开ending overview
            if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter)){
                this.isEndingOpen = true;
            }
            if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Up)){
                this.choice = 1;
                var temp = this.Cursor.getXform().mPosition;
                this.Cursor.getXform().setPosition(temp[0],temp[1]+70);
            }
            if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Down)){
                this.choice = 0;
                var temp = this.Cursor.getXform().mPosition;
                this.Cursor.getXform().setPosition(temp[0],temp[1]+70*2);
            }
        }
        else{   //已经打开ending overview
            if(this.isShow==false){   //没有打开结局
                if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Esc)){   //按空格返回
                   this.isEndingOpen = false;
                }
                if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter) && AllEndings[this.endingChoice].flag){   
                   this.isShow=true;
                   this.endingView = new TextureRenderable(AllEndings[this.endingChoice].pic);
                   this.endingView.getXform().setSize(1100,500);
                   this.endingView.setColor([1,0,0,0]);
                   var temp = this.EndingCamera.getWCCenter();
                   this.endingView.getXform().setPosition(temp[0],temp[1]);
                }
                if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Up)){
                    if(this.endingChoice > 0){
                        this.endingChoice -= 1;
                        this.EndingCursor.getXform().setPosition(150,500-70*this.endingChoice);
                        if(this.endingChoice<this.current[0]){
                            var temp = this.EndingCamera.getWCCenter();
                            temp[1] += 70;
                            this.EndingCamera.setWCCenter(temp[0],temp[1]);
                            this.bgMsg.getXform().setPosition(temp[0],temp[1]);
                            console.log(this.endingChoice+"  pos  "+this.EndingCamera.getWCCenter());
                            this.current[0] = this.current[0]-1;
                            this.current[1] = this.current[1]-1;
                        }
                    }
                } 
                if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Down)){
                    if(this.endingChoice < 12){
                        this.endingChoice += 1;
                        this.EndingCursor.getXform().setPosition(150,500-70*this.endingChoice);
                        if(this.endingChoice>this.current[1]){
                            var temp = this.EndingCamera.getWCCenter();
                            temp[1] -= 70;
                            this.EndingCamera.setWCCenter(temp[0],temp[1]);
                            this.bgMsg.getXform().setPosition(temp[0],temp[1]);
                            console.log(this.endingChoice+"  pos  "+this.EndingCamera.getWCCenter());
                            this.current[0] = this.current[0]+1;
                            this.current[1] = this.current[1]+1;
                        }
                    }
                    
                } 
            }
            else{    //打开结局
               if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)){   //按空格返回
                   this.isShow = false;
               }
            }
        }
    }
}
