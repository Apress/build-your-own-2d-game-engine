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

function Level6(){
    //texture
    this.kSprite="assets/animation.png";
    this.kSpiked="assets/tooth.png";
    this.kStar="assets/yellow.png";
    this.kHole="assets/Hole.png";
    this.kTutorial="assets/tutorial_level6.png";
    this.kBackground="assets/bgbg.png";
    //this.kPlatform="assets/platform.png";
    
    //camera
    this.mCamera=null;
    this.mCamera2=null;
    this.mCui=null;
    this.mFontTimer=null;
    
    //object
    this.mHero=null;
    this.mSpiked=null;
    this.mMsg=null;
    this.mMsg2=null;
    this.mMsg3=null;
    this.mMsg4=null;
    this.mStaritem=null;
    this.mHole=null;
    
    //Set
    this.mPlatformSet=null;
    this.mSpringSet=null;
    this.mStarSet=null;
    this.mHoleSet=null;
   
    //variable
    this.springcount=0;
    this.springflag=0;
    this.springfirst=0;
    this.touchspring=0;
    
    this.starcount=0;
    this.time=500;
    this.time2=650;
    this.wholeTime=1800;//3600===1min

    this.FontTime=120;//2s
    this.timeKey=0;
    //flags
    this.restart=0;//0 for not restart
    this.begin=0;//0 for not begin
    
    this.starNumber=20;
}

gEngine.Core.inheritPrototype(Level6, Scene);

Level6.prototype.loadScene=function(){
    gEngine.Textures.loadTexture(this.kSprite);
    gEngine.Textures.loadTexture(this.kSpiked);
    gEngine.Textures.loadTexture(this.kStar);
    gEngine.Textures.loadTexture(this.kHole);
    gEngine.Textures.loadTexture(this.kTutorial);
    gEngine.Textures.loadTexture(this.kBackground);
    //gEngine.Textures.loadTexture(this.kPlatform);
};

Level6.prototype.unloadScene=function(){
    gEngine.Textures.unloadTexture(this.kSprite);
    gEngine.Textures.unloadTexture(this.kSpiked);
    gEngine.Textures.unloadTexture(this.kStar);
    gEngine.Textures.unloadTexture(this.kHole);
    gEngine.Textures.unloadTexture(this.kTutorial);
    gEngine.Textures.unloadTexture(this.kBackground);
    //gEngine.Textures.unloadTexture(this.kPlatform);
    this.mHero.setWASDDelta(2);
    gEngine.Physics.setSystemtAcceleration(400);
/*    if(this.restart){
        var new_level=new Level6();
        gEngine.Core.startScene(new_level);
    }
    else{*/
    gEngine.ResourceMap.loadstar("star6",this.starcount);
        var new_level=new Level6_2();
        gEngine.Core.startScene(new_level);
 //   }
};

Level6.prototype.initialize=function(){
    gEngine.Physics.setSystemtAcceleration(700);
    this.initialize_Camera();
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    
    this.mPlatformSet=new GameObjectSet();
    this.mSpringSet= new GameObjectSet();
    this.mStarSet= new GameObjectSet();
    this.mHoleSet = new GameObjectSet();
    
    this.initialize_Words();

    this.mHero=new Hero(this.kSprite,750,600,40,40,1024);
    this.mHero.setWASDDelta(3);
    this.mFirstObject = this.mPlatformSet.size();
    this.mCurrentObj = this.mFirstObject;
    this.mPlatformSet.addToSet(this.mHero);
    
    this.initialize_Platform();
    this.initialize_Spring();
    //this.initializeKeyN();
        
    //this.mSpiked = new Item(600,920,90,40,40,this.kSpiked);
    this.initialize_Star();
    this.mBackground= new Item(750,600,0,1500,1500,this.kBackground);
};
Level6.prototype.initialize_Words=function(){
    this.mTutorial=new TextureRenderable(this.kTutorial);
    this.mTutorial.setColor([0,1,0,0]);
    this.mTutorial.getXform().setPosition(750,700);
    this.mTutorial.getXform().setSize(400,400);
    
    this.mMsg = new FontRenderable("Now  :0");
     this.mMsg.setColor([0.8,0.8,0.8, 1]);
    this.mMsg.getXform().setPosition(43,27);
    this.mMsg.setTextHeight(10);
    this.mStaritem = new TextureRenderable(this.kStar);
    this.mStaritem.getXform().setPosition(20,24);
    this.mStaritem.getXform().setSize(30,30);
    this.mMsg2 = new FontRenderable("Level6");
    this.mMsg2.setColor([222/255, 212/255, 173/255, 1]);
    this.mMsg2.getXform().setPosition(15,9);
    this.mMsg2.setTextHeight(12);
    this.mMsg3=new FontRenderable("Time :60s");
    this.mMsg3.setColor([0.8,0.8,0.8,1]);
    this.mMsg3.getXform().setPosition(68,27);
    this.mMsg3.setTextHeight(10);
    this.mMsg4 = new FontRenderable("Time Up!");
    this.mMsg4.setColor([1,1,1,1]);
    this.mMsg4.getXform().setPosition(23,25);
    this.mMsg4.setTextHeight(8);
    this.mMsg5 = new FontRenderable("Find the hole!");
    this.mMsg5.setColor([1,1,1,1]);
    this.mMsg5.getXform().setPosition(10,15);
    this.mMsg5.setTextHeight(8);
};
Level6.prototype.initialize_Camera=function(){
    this.mCamera=new Camera(
        vec2.fromValues(750,600),
        800,
        [0,0,800,600]
        );
    this.mCamera.setBackgroundColor([0.8,0.8,0.8,1]);

    this.mCamera2=new Camera(
        vec2.fromValues(750,600),
        1508,
        [680,510,120,90]
        );
    this.mCamera2.setBackgroundColor([0.9,0.9,0.9,1]);
    
    this.mCui = new Camera(
            vec2.fromValues(this.mCamera.mCameraState.getCenter()[0]-370, this.mCamera.mCameraState.getCenter()[1]+270),
            200/3,
            [0,510,100,90]);
    
    this.mFontTimer = new Camera(
            vec2.fromValues(40,20),
            80,
            [250,225,300,150]
        );
    this.mFontTimer.setBackgroundColor([0.8,0.8,0.8,1]);
};
Level6.prototype.initialize_Platform=function(){
   this.mPlatform1=new MapObject(750,535,0,100,16,null);
    this.mPlatform1.mySetcolor();
    this.mPlatformSet.addToSet(this.mPlatform1);
    this.mPlatform2=new MapObject(450,300,0,120,16,null);
    this.mPlatform2.mySetcolor();
    this.mPlatformSet.addToSet(this.mPlatform2);
    this.mPlatform3= new MapObject(750,8,0,1500,16,null);//down bound
    this.mPlatform3.mySetcolor();
    this.mPlatformSet.addToSet(this.mPlatform3);
    this.mPlatform4 = new MapObject(-8,600,0,16,1200,null);//left bound
    this.mPlatform4.mySetcolor();
    this.mPlatformSet.addToSet(this.mPlatform4);
    this.mPlatform5 = new MapObject(1504,640,0,16,1120,null);//first scene right up bound
    this.mPlatform5.mySetcolor();
    this.mPlatformSet.addToSet(this.mPlatform5);
    this.mPlatform7 = new MapObject(1504,40,0,16,80,null);//first scene right down bound
    this.mPlatform7.mySetcolor();
    this.mPlatformSet.addToSet(this.mPlatform7);
    this.mPlatform6 = new MapObject(750,1208,0,1500,16,null);//up bound
    this.mPlatform6.mySetcolor();
    this.mPlatformSet.addToSet(this.mPlatform6);
    this.mPlatform8 = new MapObject(25,520,0,50,16,null);//Spring2's platform
    this.mPlatform8.mySetcolor();
    this.mPlatformSet.addToSet(this.mPlatform8);
    this.mPlatform9 = new MapObject(450,970,0,140,16,null);
    this.mPlatform9.mySetcolor();
    this.mPlatformSet.addToSet(this.mPlatform9);
    this.mPlatform10 = new MapObject(600,900,0,300,16,null);//danger platform
    this.mPlatform10.mySetcolor();
    this.mPlatformSet.addToSet(this.mPlatform10);
    this.mPlatform11 = new MapObject(1200,450,0,180,16,null);
    this.mPlatform11.mySetcolor();
    this.mPlatformSet.addToSet(this.mPlatform11);
    this.mPlatform12 = new MapObject(1475,520,0,50,16,null);//Spring4'ss platform
    this.mPlatform12.mySetcolor();
    this.mPlatformSet.addToSet(this.mPlatform12);
};
Level6.prototype.initialize_Spring=function(){
    this.mSpring1= new Spring(this.kSprite,150,43,50,50,574,0);
    this.mSpringSet.addToSet(this.mSpring1);
    this.mSpring2 = new Spring(this.kSprite,25, 553, 50, 50, 574,0);
    this.mSpringSet.addToSet(this.mSpring2);
    this.mSpring3 = new Spring(this.kSprite,1400, 43, 50, 50,574,0);
    this.mSpringSet.addToSet(this.mSpring3);
    this.mSpring4 = new Spring(this.kSprite,1475, 553, 50, 50, 574,0);
    this.mSpringSet.addToSet(this.mSpring4);
};
Level6.prototype.initialize_Star=function(){
    var a;
    for(a=0;a<this.starNumber;a++){
        this.mStar = new Star(this.kSprite,Math.random()*1400+50,Math.random()*1100+50,40,40);
        this.mStarSet.addToSet(this.mStar);
    }
};
Level6.prototype.initializeKeyN = function(){
    
    this.mKeyNset=new GameObjectSet(); 
    this.mKeyNTip = new FontRenderable("Hold [N] to skip to Win");
    this.mKeyNTip.setColor([0.6,0.6,0.6, 1]);
    this.mKeyNTip.getXform().setPosition(650,450);
    this.mKeyNTip.setTextHeight(14);
    this.mKeyNset.addToSet(this.mKeyNTip);
    
    this.mKeyNBar =new Renderable();
    this.mKeyNBar.setColor([0.6,0.6,0.6,1]);
    this.mKeyNBar.getXform().setPosition(745,430);
    this.mKeyNBar.getXform().setSize(200,3);
    this.mKeyNset.addToSet(this.mKeyNBar);
};
Level6.prototype.draw=function(){
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]);
    
    this.mCamera.setupViewProjection();
    this.mBackground.draw(this.mCamera);
    this.mSpringSet.draw(this.mCamera);
    this.mStarSet.draw(this.mCamera);
    if(this.begin===0){
        this.mTutorial.draw(this.mCamera);
    }
  //  this.mSpiked.draw(this.mCamera);
    this.mPlatformSet.draw(this.mCamera);   
    this.mHoleSet.draw(this.mCamera);
    //this.mKeyNset.draw(this.mCamera);
    
    this.mCamera2.setupViewProjection();
    this.mBackground.draw(this.mCamera2);
    this.mPlatformSet.draw(this.mCamera2);
    this.mSpringSet.draw(this.mCamera2);
 //   this.mSpiked.draw(this.mCamera2);
    this.mStarSet.draw(this.mCamera2);
    
    this.mCui.setupViewProjection();
    this.mBackground.draw(this.mCui);
    this.mMsg.draw(this.mCui); 
    this.mMsg2.draw(this.mCui); 
    this.mMsg3.draw(this.mCui);
    this.mStaritem.draw(this.mCui);
    
    if(this.wholeTime===0&&this.FontTime>0){
        this.mFontTimer.setupViewProjection();
        this.mMsg4.draw(this.mFontTimer);
        this.mMsg5.draw(this.mFontTimer);
        //console.log("*");
    }
    
    this.mCollisionInfos = [];
};

var flag=0;//0 for go right
Level6.prototype.update=function(){
    var obj = this.mPlatformSet.getObjectAt(this.mCurrentObj);
    obj.getRigidBody().userSetsState();
    
    gEngine.Physics.processCollision(this.mPlatformSet, this.mCollisionInfos);
    
    
   // this.updateKey();
    this.updatePlatform();
    this.updateCamera();
    
    this.updateSpring(this.mSpring1,1);
    this.updateSpring(this.mSpring2,1);
    this.updateSpring(this.mSpring3,1);
    this.updateSpring(this.mSpring4,1);
    
    //console.log(this.touchspring);
    
    if(this.touchspring===0){
        obj.keyControl(this.mPlatformSet,this.mSpringSet,450);
    }
    this.updateStarFlicker();
    

    var msg = "Now  :"+this.starcount;
    this.mMsg.setText(msg);
    
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.b)||gEngine.Input.isKeyClicked(gEngine.Input.keys.B)){
        this.begin=1;
    }
    if(this.wholeTime>0&&this.begin===1){
        this.wholeTime--;
       
    }
    if(this.wholeTime%60===0){
        var k=this.wholeTime/60;
        msg="Time :"+k+"s";
        this.mMsg3.setText(msg);
    }
    this.updatemCui();
    this.mCui.update();
    if(this.wholeTime===0){
        if(this.FontTime>0){
            this.FontTime--;
        }

            if(this.mHoleSet.size()===0){
                this.mHole=new Item(1200,240,0,80,80,this.kHole);
                this.mHoleSet.addToSet(this.mHole);
            }
            else if(this.mHero.boundTest(this.mHole)){
                gEngine.GameLoop.stop();
            }
            this.mHole.getXform().incRotationByDegree(1);
    }

};

Level6.prototype.updatemFonttime=function(){
    
};

Level6.prototype.updatemCui= function(){
    var newcenterx =this.mCamera.mCameraState.getCenter()[0]-370 ;
    var newcentery=this.mCamera.mCameraState.getCenter()[1]+270;
   
     
    this.mCui.setWCCenter(newcenterx,newcentery);  

    this.mMsg2.getXform().setPosition(this.mCui.getWCCenter()[0]-20,this.mCui.getWCCenter()[1]+20);

    this.mMsg3.getXform().setPosition(this.mCui.getWCCenter()[0]-23,this.mCui.getWCCenter()[1]-8);

    //this.mMsg4.getXform().setPosition(this.mCui.getWCCenter()[0]-23,this.mCui.getWCCenter()[1]-20);
  
    this.mMsg.getXform().setPosition(this.mCui.getWCCenter()[0]-22,this.mCui.getWCCenter()[1]+3);
    
    //this.mCui.mCameraState.updateCameraState();
};
Level6.prototype.updateStarFlicker=function(){
    this.time--;
    this.time2--;
    this.mStarSet.update();
    var i,j;
    if(this.begin===1&&this.wholeTime>0){
        for(i=0;i<this.mStarSet.size();i++){
        //if Hero touch the Star
        if(this.mHero.boundTest(this.mStarSet.getObjectAt(i))){
            this.starcount++;
            this.mStarSet.getObjectAt(i).setVisibility(false);
            this.mStarSet.removeFromSet(this.mStarSet.getObjectAt(i));
        }
        //if the Star life goes end
        if(this.time===0){
            for(j=0;j<this.mStarSet.size()/2;j++){
                this.mStarSet.getObjectAt(j).setVisibility(false);
                this.mStarSet.removeFromSet(this.mStarSet.getObjectAt(j));
            }
        }
        if(this.time2===0){
            for(j=0;j<this.mStarSet.size()/2;j++){
                this.mStarSet.getObjectAt(j).setVisibility(false);
                this.mStarSet.removeFromSet(this.mStarSet.getObjectAt(j));
            }
        } 
      }
    }

    if(this.mStarSet.size()<this.starNumber){
        for(i=0;i<this.starNumber-this.mStarSet.size();i++){
            this.mStar = new Star(this.kSprite,Math.random()*1400+50,Math.random()*1100+50,40,40);
            this.mStarSet.addToSet(this.mStar);
        }
    }
};
Level6.prototype.updateCamera=function(){
    this.mCamera.update();
    if(this.mHero.getXform().getXPos()>=400&&this.mHero.getXform().getXPos()<=1096){
        if(this.mHero.getXform().getYPos()>=300&&this.mHero.getXform().getYPos()<=900){
            this.mCamera.setWCCenter(this.mHero.getXform().getXPos(),this.mHero.getXform().getYPos());
        }
        else if(this.mHero.getXform().getYPos()<300){
            this.mCamera.setWCCenter(this.mHero.getXform().getXPos(),300);
        }
        else{
             this.mCamera.setWCCenter(this.mHero.getXform().getXPos(),900);
        }
    }
    else if(this.mHero.getXform().getXPos()<400){
        if(this.mHero.getXform().getYPos()>=300&&this.mHero.getXform().getYPos()<=900){
            this.mCamera.setWCCenter(400,this.mHero.getXform().getYPos());
        }
        else if(this.mHero.getXform().getYPos()<300){
            this.mCamera.setWCCenter(400,300);
        }
        else{
            this.mCamera.setWCCenter(400,900);
        }
    }
    else{
        if(this.mHero.getXform().getYPos()>=300&&this.mHero.getXform().getYPos()<=900){
             this.mCamera.setWCCenter(1096,this.mHero.getXform().getYPos());
        }
        else if(this.mHero.getXform().getYPos()<300){
            this.mCamera.setWCCenter(1096,300);
        }
        else{
            this.mCamera.setWCCenter(1096,900);
        }
    }
};
Level6.prototype.updatePlatform=function(){
    this.mPlatformSet.update();
     if(this.mPlatformSet.getObjectAt(10).getXform().getXPos()>=950){
        flag=1;
    }
    else if(this.mPlatformSet.getObjectAt(10).getXform().getXPos()<=600){
        flag=0;
    }
    if(flag===0){
        this.mPlatformSet.getObjectAt(10).getXform().incXPosBy(4);
        //this.mSpiked.getXform().incXPosBy(5);
        this.mHero.CheckUpdate_Platform(this.mPlatformSet.getObjectAt(10),0,4);
    }
    else{
        this.mPlatformSet.getObjectAt(10).getXform().incXPosBy(-4);
       // this.mSpiked.getXform().incXPosBy(-5);
        this.mHero.CheckUpdate_Platform(this.mPlatformSet.getObjectAt(10),0,-4);
    }
};
Level6.prototype.updateSpring=function(Spring,dir){
    this.Spring=Spring;
    if(dir===1){
        if((this.mHero.getXform().getYPos()-this.mHero.mHeight/2)<=(this.Spring.getXform().getYPos()+this.Spring.getXform().getHeight()/2)
            &&(this.mHero.getXform().getYPos()>=this.Spring.getXform().getYPos())
            &&(this.mHero.getXform().getXPos()>(this.Spring.getXform().getXPos()-this.Spring.getXform().getWidth()/2+5))
            &&(this.mHero.getXform().getXPos()<(this.Spring.getXform().getXPos()+this.Spring.getXform().getWidth()/2-5))
            &&(this.mHero.getRigidBody().getVelocity()[1]<=0)){

            if(this.springflag === 0){
                this.x=this.mHero.getXform().getXPos();
                this.y=this.mHero.getXform().getYPos();
                this.springflag=1;
                this.touchspring=1;
            }
        
        //this.springcount++;
       // console.log(this.mHero.getXform().getXPos()+"  "+this.mHero.getXform().getYPos());
            if(this.springfirst===0){
                if(this.springcount<5)
                {
                    this.Spring.update();
                    this.mHero.getXform().setPosition(this.x,this.y);
                    this.springcount++;
                }
                else{
                    this.mHero.getXform().setPosition(this.x,this.y);
                    this.mHero.getRigidBody().setVelocity(0,690);
                    this.springcount=0;
                    this.springflag=0;
                    this.springfirst=1;
                    this.touchspring=0;
                }           
            }
            else{
                if(this.springcount<6)
                {
                    this.Spring.update();
                    this.mHero.getXform().setPosition(this.x,this.y);
                    this.springcount++;
                }
                else{
                    this.mHero.getXform().setPosition(this.x,this.y);
                    this.mHero.getRigidBody().setVelocity(0,690);
                    this.springcount=0;
                    this.springflag=0;
                    this.springfirst=1;
                    this.touchspring=0;
                }            
            }
        } 
    
    }
};
Level6.prototype.updateKey=function(){
    this.timeKey++;
    var flag =0;
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.N)) 
    {
        if(this.LastKeyNTime=== this.timeKey-1){
            this.KeyNCount++;
        }
        else{
            this.KeyNCount=1;
        }
        var newwidth =200 -5*this.KeyNCount;
        this.mKeyNBar.getXform().setSize(newwidth,3);
        if(newwidth<=0)
        {
            this.skip=true;
            gEngine.GameLoop.stop();
        }
        this.LastKeyNTime=this.timeKey;
        flag =1;  // accept space 
    }
    if(flag===0)
    {
        this.mKeyNBar.getXform().setSize(200,3);
        this.KeyNCount=0;
    }
    this.mKeyNset.update(this.mCamera);
};