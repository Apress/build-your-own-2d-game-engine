/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
"use strict";  

function AllLevel(nowlevel){
    this.mCamera = null;
    this.mAllObjs = null;
    this.mMsg=null;
    this.mMsg1=null;
    this.mMsg2=null;
    this.mCui=null;
    this.mLevel= nowlevel;
    
    this.level1=null;
    this.level2=null;
    this.level3=null;
    this.level4=null;
    this.level5=null;
    this.level6=null;
    
    this.starset=new GameObjectSet();
    this.levelset=new GameObjectSet();
    this.msgset=new GameObjectSet();
    
    this.mStaritem1=null;
    this.mStaritem2=null;
    this.mStaritem3=null;
    this.mStaritem4=null;
    this.mStaritem5=null;
    this.mStaritem6=null;
    
    this.touchstar1=0;
    this.touchstar2=0;
    this.touchstar3=0;
    this.touchstar4=0;
    this.touchstar5=0;
    this.touchstar6=0;
    
    this.mx;
    this.my;
    this.sx;
    this.sy;
    this.fx;
    this.fy;
    
    this.mStaritem = null;
    //this.kStar = "assets/yellow.png";
    this.kSprite = "assets/animation.png";
    this.kbg ="assets/bg1.png";
    this.kclick="assets/click.png";
}
gEngine.Core.inheritPrototype(AllLevel, Scene);

AllLevel.prototype.loadScene=function(){
    //gEngine.Textures.loadTexture(this.kStar);
    gEngine.Textures.loadTexture(this.kSprite);
    gEngine.Textures.loadTexture(this.kbg);
    gEngine.Textures.loadTexture(this.kclick);
    
   
            if(gEngine.ResourceMap.isAssetLoaded("level6")){
                this.level6 = gEngine.ResourceMap.retrieveAsset("level6");
            }                       
        
        
            if(gEngine.ResourceMap.isAssetLoaded("level5")){
                this.level5 = gEngine.ResourceMap.retrieveAsset("level5");
            }
       
     
            if(gEngine.ResourceMap.isAssetLoaded("level4")){
                this.level4 = gEngine.ResourceMap.retrieveAsset("level4");
            }  
       
       
            if(gEngine.ResourceMap.isAssetLoaded("level3")){
                this.level3 = gEngine.ResourceMap.retrieveAsset("level3");
            }  
      
       
            if(gEngine.ResourceMap.isAssetLoaded("level2")){
                this.level2 = gEngine.ResourceMap.retrieveAsset("level2");
            }   
      
       
            //console.log(gEngine.ResourceMap.isAssetLoaded("level1"));
            if(gEngine.ResourceMap.isAssetLoaded("level1")){
                this.level1 = gEngine.ResourceMap.retrieveAsset("level1");
            }    
            //console.log(this.level1);
                
  
    if(this.level1!==null&&this.level2!==null&&this.level3!==null&&this.level4!==null&&this.level5!==null){
        this.mLevel=0;
    }
};

AllLevel.prototype.unloadScene=function(){
    //gEngine.Textures.unloadTexture(this.kStar);
    gEngine.Textures.unloadTexture(this.kSprite);
    gEngine.Textures.unloadTexture(this.kbg);
       gEngine.Textures.unloadTexture(this.kclick);
    
    if(this.touchstar1===1){
         var nextLevel =new Level1();
        gEngine.Core.startScene(nextLevel);
    }
    else if(this.touchstar2===1){
        var nextLevel =new MyGame();
       gEngine.Core.startScene(nextLevel);
    }
    else if(this.touchstar3===1){
        var nextLevel =new Level3();
       gEngine.Core.startScene(nextLevel);
    }
    else if(this.touchstar4===1){
        var nextLevel =new Level4();
       gEngine.Core.startScene(nextLevel);
    }
    else if(this.touchstar5===1){
        var nextLevel =new Level5();
       gEngine.Core.startScene(nextLevel);
    }
    else if(this.touchstar6===1){
        var nextLevel =new Level6();
       gEngine.Core.startScene(nextLevel);
    }
    
};

AllLevel.prototype.initialize=function(){
    this.mCamera = new Camera(
        vec2.fromValues(400, 300), // position of the camera
        800,                     // width of camera
        [0, 0, 800, 600]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.3,0.15,0.1, 1]);
    
     
    this.mbg = new TextureRenderable(this.kbg);
    this.mbg.getXform().setPosition(400,300);
    this.mbg.getXform().setSize(800,600);
    
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    
    this.mMsg1 = new FontRenderable("select a level :D");
    this.mMsg1.setColor([1,1,1, 1]);
    this.mMsg1.getXform().setPosition(240,500);
    this.mMsg1.setTextHeight(30);
    //this.msgset.addToSet(this.mMsg2);
    
    switch(this.mLevel){
        case 0:{
                
            this.mStaritem1 = new Star(this.kSprite,130,380,60,60);
            //this.mStaritem1.setColor([1,1,1,0]);
            //this.mStaritem1.getXform().setPosition(130,380);
            //this.mStaritem1.getXform().setSize(60,60);
            this.starset.addToSet(this.mStaritem1);
            
            this.msg1 = new FontRenderable("1");
            this.msg1.setColor([0,0,0, 1]);
            this.msg1.getXform().setPosition(130,387);
            this.msg1.setTextHeight(26);
            this.levelset.addToSet(this.msg1);
            
             this.mClick = new TextureRenderable(this.kclick);
            this.mClick.getXform().setPosition(130,430);
            this.mClick.getXform().setSize(50,25);
            
            this.msg200 = new FontRenderable("Only when you get the target number of stars can you unlock the next level");
            this.msg200.setColor([1,1,1, 1]);
            this.msg200.getXform().setPosition(80,280);
            this.msg200.setTextHeight(15);
            

            if(this.level1 ===null){
                break;
            }
        }
        case 6:{
            
            if(this.level6 !== null)
            {
                var msg = "star:"+this.level6;
    
                this.mMsg2 = new FontRenderable(msg);
                this.mMsg2.setColor([1,1,1, 1]);
                this.mMsg2.getXform().setPosition(615,200);
                this.mMsg2.setTextHeight(20);
                this.msgset.addToSet(this.mMsg2);
            }
        }
        case 5:{
                if(this.level5!==null&&this.level5>=3){
            this.mStaritem6 = new Star(this.kSprite,650,250,90,90);
            //this.mStaritem6.setColor([1,1,1,0]);
            //this.mStaritem6.getXform().setPosition(650,250);
            //this.mStaritem6.getXform().setSize(90,90);
            this.starset.addToSet(this.mStaritem6);
            
            this.msg6 = new FontRenderable("6");
            this.msg6.setColor([0,0,0, 1]);
            this.msg6.getXform().setPosition(650,260);
            this.msg6.setTextHeight(40);
            this.levelset.addToSet(this.msg6);
            
            }
            if(this.level5 !== null)
            {
                var msg = "star:"+this.level5+"/5";
    
                this.mMsg2 = new FontRenderable(msg);
                this.mMsg2.setColor([1,1,1, 1]);
                this.mMsg2.getXform().setPosition(515,380);
                this.mMsg2.setTextHeight(20);
                this.msgset.addToSet(this.mMsg2);
            }
        }
        case 4:{
                if(this.level4!==null&&this.level4>=6){
            this.mStaritem5 = new Star(this.kSprite,550,420,50,50);
            //this.mStaritem5.setColor([1,1,1,0]);
            //this.mStaritem5.getXform().setPosition(550,420);
            //this.mStaritem5.getXform().setSize(50,50);
            this.starset.addToSet(this.mStaritem5);
        
            this.msg5 = new FontRenderable("5");
            this.msg5.setColor([0,0,0, 1]);
            this.msg5.getXform().setPosition(551,425);
            this.msg5.setTextHeight(22);
            this.levelset.addToSet(this.msg5);
        } 
            if(this.level4 !== null)
            {
                var msg = "star:"+this.level4+"/8";
    
                this.mMsg2 = new FontRenderable(msg);
                this.mMsg2.setColor([1,1,1, 1]);
                this.mMsg2.getXform().setPosition(440,220);
                this.mMsg2.setTextHeight(20);
                this.msgset.addToSet(this.mMsg2);
            }
        }
        case 3:{
            if(this.level3!==null&&this.level3>=3){
            this.mStaritem4 = new Star(this.kSprite,460,270,60,60);
            //this.mStaritem4.setColor([1,1,1,0]);
            //this.mStaritem4.getXform().setPosition(460,270);
            //this.mStaritem4.getXform().setSize(60,60);
            this.starset.addToSet(this.mStaritem4);
            
            this.msg4 = new FontRenderable("4");
            this.msg4.setColor([0,0,0, 1]);
            this.msg4.getXform().setPosition(460,277);
            this.msg4.setTextHeight(27);
            this.levelset.addToSet(this.msg4);
        }
            if(this.level3 !== null)
            {
                var msg = "star:"+this.level3+"/5";
    
                this.mMsg2 = new FontRenderable(msg);
                this.mMsg2.setColor([1,1,1, 1]);
                this.mMsg2.getXform().setPosition(320,310);
                this.mMsg2.setTextHeight(20);
                this.msgset.addToSet(this.mMsg2);
            }
        }
        case 2:{
            if(this.level2!==null&&this.level2>=8){
            this.mStaritem3 = new Star(this.kSprite,350,350,70,70);
            //this.mStaritem3.setColor([1,1,1,0]);
            //this.mStaritem3.getXform().setPosition(350,350);
            //this.mStaritem3.getXform().setSize(70,70);
            this.starset.addToSet(this.mStaritem3);
            
            this.msg3 = new FontRenderable("3");
            this.msg3.setColor([0,0,0, 1]);
            this.msg3.getXform().setPosition(350,360);
            this.msg3.setTextHeight(30);
            this.levelset.addToSet(this.msg3);
        }
            if(this.level2 !== null)
            {
                var msg = "star:"+this.level2+"/14";
    
                this.mMsg2 = new FontRenderable(msg);
                this.mMsg2.setColor([1,1,1, 1]);
                this.mMsg2.getXform().setPosition(170,170);
                this.mMsg2.setTextHeight(20);
                this.msgset.addToSet(this.mMsg2);
            }
        }
        case 1:{
            
            if(this.level1!==null&&this.level1>=6){                            
            this.mStaritem2 = new Star(this.kSprite,230,220,80,80);
            //this.mStaritem2.setColor([1,1,1,0]);
            //this.mStaritem2.getXform().setPosition(230,220);
            //this.mStaritem2.getXform().setSize(80,80);
            this.starset.addToSet(this.mStaritem2);
            
            this.msg2 = new FontRenderable("2");
            this.msg2.setColor([0,0,0, 1]);
            this.msg2.getXform().setPosition(230,227);
            this.msg2.setTextHeight(33);
            this.levelset.addToSet(this.msg2);
            }
            //if(this.mStaritem1===null)
            if(this.mStaritem1===null){
            this.mStaritem1 = new Star(this.kSprite,130,380,60,60);
            //this.mStaritem1.setColor([1,1,1,0]);
            //this.mStaritem1.getXform().setPosition(130,380);
            //this.mStaritem1.getXform().setSize(60,60);
            this.starset.addToSet(this.mStaritem1);
            
            this.msg1 = new FontRenderable("1");
            this.msg1.setColor([0,0,0, 1]);
            this.msg1.getXform().setPosition(130,387);
            this.msg1.setTextHeight(26);
            this.levelset.addToSet(this.msg1);            
            }         
            if(this.level1 !== null)
            {
                var msg = "star:"+this.level1+"/10";
    
                this.mMsg2 = new FontRenderable(msg);
                this.mMsg2.setColor([1,1,1, 1]);
                this.mMsg2.getXform().setPosition(90,340);
                this.mMsg2.setTextHeight(20);
                this.msgset.addToSet(this.mMsg2);
            }
        }
        
    }
};
AllLevel.prototype.draw=function(){
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]);
      
    this.mCamera.setupViewProjection();
    
    this.mbg.draw(this.mCamera);
    this.starset.draw(this.mCamera); 
    this.levelset.draw(this.mCamera);   
    this.msgset.draw(this.mCamera);
    this.mMsg1.draw(this.mCamera);
    //this.mStaritem.draw(this.mCamera);
    if(this.mLevel===0&&this.level1===null) {
        this.mClick.draw(this.mCamera);
        this.msg200.draw(this.mCamera);    
    }

};

AllLevel.prototype.update=function(){
    
    this.starset.update();
    var mx,my;
    mx=gEngine.Input.getMousePosX();
    my=gEngine.Input.getMousePosY();
    
    if(this.mStaritem1!==null){
    if(mx<160&&mx>100&&my<410&&my>350){      
        this.mStaritem1.getXform().setYPos(375);
        this.msg1.getXform().setYPos(380);
        if(gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Left))
            {   
                this.touchstar1=1;            
                gEngine.GameLoop.stop();
            }
    }
    else{
        this.mStaritem1.getXform().setYPos(380);
        this.msg1.getXform().setYPos(385);
    }
    }
    
    if(this.mStaritem2!==null){
    if(mx<260&&mx>180&&my<270&&my>190){
        //this.touchstar2=1;
        this.mStaritem2.getXform().setYPos(215);
        this.msg2.getXform().setYPos(220);
        if(gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Left))
            {   
                this.touchstar2=1;            
                gEngine.GameLoop.stop();
            }
    }
    else{
        this.mStaritem2.getXform().setYPos(220);
        this.msg2.getXform().setYPos(225);
    }
    }
    
    if(this.mStaritem3!==null){
    if(mx<385&&mx>315&&my<385&&my>315){
        //this.touchstar3=1;
        this.mStaritem3.getXform().setYPos(345);
        this.msg3.getXform().setYPos(350);
        if(gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Left))
            {   
                this.touchstar3=1;            
                gEngine.GameLoop.stop();
            }
    }
    else{
        this.mStaritem3.getXform().setYPos(350);
        this.msg3.getXform().setYPos(355);
    }
    }
    
    if(this.mStaritem4!==null){
    if(mx<490&&mx>430&&my<300&&my>240){
        //this.touchstar4=1;
        this.mStaritem4.getXform().setYPos(265);
        this.msg4.getXform().setYPos(270);
        if(gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Left))
            {   
                this.touchstar4=1;            
                gEngine.GameLoop.stop();
            }
    }
    else{
        this.mStaritem4.getXform().setYPos(270);
        this.msg4.getXform().setYPos(275);
    }
    }
    
    if(this.mStaritem5!==null){
    if(mx<575&&mx>525&&my<445&&my>395){
        //this.touchstar5=1;
        this.mStaritem5.getXform().setYPos(415);
        this.msg5.getXform().setYPos(420);
        if(gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Left))
            {   
                this.touchstar5=1;            
                gEngine.GameLoop.stop();
            }
    }
    else{
        this.mStaritem5.getXform().setYPos(420);
        this.msg5.getXform().setYPos(425);
    }
    }
    
    if(this.mStaritem6!==null){
    if(mx<695&&mx>605&&my<295&&my>205){
        //this.touchstar6=1;
        this.mStaritem6.getXform().setYPos(245);
        this.msg6.getXform().setYPos(250);
        if(gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Left))
            {   
                this.touchstar6=1;            
                gEngine.GameLoop.stop();
            }
    }
    else{
        this.mStaritem6.getXform().setYPos(250);
        this.msg6.getXform().setYPos(255);
    }
    }
    
};

