/* File: Minion.js 
 *
 * Creates and initializes a Minion object
 * overrides the update function of GameObject to define
 * simple sprite animation behavior behavior
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteAnimateRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Hero_end(spriteTexture) {
        
    this.mode=1;  
    this.mHero = new LightRenderable(spriteTexture);
    this.mHero.setColor([0, 0, 0, 1]);  
    this.mHero.getXform().setPosition(50, 20);
    this.mHero.getXform().setSize(3.8, 6.5);
    this.mHero.setElementUVCoordinate(0.86, 1, 0.23, 0.48);
    this.sta=null;
    
    GameObject.call(this, this.mHero);


    this.mWalkHeroRight = new LightRenderable(spriteTexture);
    this.mWalkHeroRight.setColor([1, 1, 1, 0]);  // tints red
    this.mWalkHeroRight.getXform().setPosition(5, 29);
    this.mWalkHeroRight.getXform().setSize(4.1, 6.5);
    this.mWalkHeroRight.setElementUVCoordinate(0.1, 0.135, 0.84, 1); 
    this.mWalkHeroRight.setSpriteSequence(512, 0,     // first element pixel position: top-left 512 is top of image, 0 is left of image
                                    80, 125,       // widthxheight in pixels
                                    3,              // number of elements in this sequence
                                    0);             // horizontal padding in between)
    this.mWalkHeroRight.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
    this.mWalkHeroRight.setAnimationSpeed(13);
    
   
    
   
    this.mWalkHeroLeft = new LightRenderable(spriteTexture);
    this.mWalkHeroLeft.setColor([1, 1, 1, 0]);  // tints red
    this.mWalkHeroLeft.getXform().setPosition(5, 29);
    this.mWalkHeroLeft.getXform().setSize(4.1, 6.5);
    this.mWalkHeroLeft.setElementUVCoordinate(0.0, 0.135, 0.49, 0.69); 
    this.mWalkHeroLeft.setSpriteSequence(382, 0,     // first element pixel position: top-left 512 is top of image, 0 is left of image
                                    80, 130,       // widthxheight in pixels
                                    3,              // number of elements in this sequence
                                    0);             // horizontal padding in between)
    this.mWalkHeroLeft.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
    this.mWalkHeroLeft.setAnimationSpeed(13);
    
    
   
 
    this.mJumpHeroRightUp = new LightRenderable(spriteTexture);
    this.mJumpHeroRightUp.setColor([1, 1, 1, 0]);  // tints red
    this.mJumpHeroRightUp.getXform().setPosition(5, 29);
    this.mJumpHeroRightUp.getXform().setSize(4.1, 6.5);
    this.mJumpHeroRightUp.setElementUVCoordinate(0.18, 0.315, 0.24, 0.48); 
  
   
    this.mJumpHeroRightDown = new LightRenderable(spriteTexture);
    this.mJumpHeroRightDown.setColor([1, 1, 1, 0]);  // tints red
    this.mJumpHeroRightDown.getXform().setPosition(5, 29);
    this.mJumpHeroRightDown.getXform().setSize(4.1, 6.5);
    this.mJumpHeroRightDown.setElementUVCoordinate(0.32, 0.5, 0.24, 0.48); 
    
    
    this.mJumpHeroLeftUp = new LightRenderable(spriteTexture);
    this.mJumpHeroLeftUp.setColor([1, 1, 1, 0]);  // tints red
    this.mJumpHeroLeftUp.getXform().setPosition(5, 29);
    this.mJumpHeroLeftUp.getXform().setSize(4.1, 6.5);
    this.mJumpHeroLeftUp.setElementUVCoordinate(0.18, 0.315, 0.0, 0.25); 
    
    this.mJumpHeroLeftDown = new LightRenderable(spriteTexture);
    this.mJumpHeroLeftDown.setColor([1, 1, 1, 0]);  // tints red
    this.mJumpHeroLeftDown.getXform().setPosition(5, 29);
    this.mJumpHeroLeftDown.getXform().setSize(4.1, 6.5);
    this.mJumpHeroLeftDown.setElementUVCoordinate(0.32, 0.46, 0.0, 0.25); 
   
    this.mJumpHeroStraight = new LightRenderable(spriteTexture);
    this.mJumpHeroStraight.setColor([1, 1, 1, 0]);  // tints red
    this.mJumpHeroStraight.getXform().setPosition(5, 29);
    this.mJumpHeroStraight.getXform().setSize(3.2, 6.5);
    this.mJumpHeroStraight.setElementUVCoordinate(0.7, 0.82, 0.23, 0.48); 
    
    this.mPushHero = new SpriteAnimateRenderable(spriteTexture);
    this.mPushHero.setColor([1, 1, 1, 0]);  // tints red
    this.mPushHero.getXform().setPosition(5, 29);
    this.mPushHero.getXform().setSize(3.2, 6.5);
    this.mPushHero.setElementUVCoordinate(0.5, 0.82, 0.84, 1); 
    this.mPushHero.setSpriteSequence(512, 300,     // first element pixel position: top-left 512 is top of image, 0 is left of image
                                    78, 124,       // widthxheight in pixels
                                    3,              // number of elements in this sequence
                                    0);             // horizontal padding in between)
    this.mPushHero.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
    this.mPushHero.setAnimationSpeed(20);
  
    this.mDeadHero = new LightRenderable(spriteTexture);
    this.mDeadHero.setColor([1, 1, 1, 0]);  // tints red
    this.mDeadHero.getXform().setPosition(5, 29);
    this.mDeadHero.getXform().setSize(3.2, 6.5);
    this.mDeadHero.setElementUVCoordinate(0.7, 0.82, 0.5, 0.75);  
    
    this.mBalloonHero = new LightRenderable(spriteTexture);
    this.mBalloonHero.setColor([1, 1, 1, 0]);  // tints red
    this.mBalloonHero.getXform().setPosition(5, 29);
    this.mBalloonHero.getXform().setSize(4.1, 6.5);
    this.mBalloonHero.setElementUVCoordinate(0.46, 0.62, 0.0, 0.25); 

 
 
    var r;   
    r = new RigidRectangle(this.getXform(), 2.6, 6.5);
    this.r=r;
    this.setRigidBody(this.r);
    this.r.setMass(0.7);
    this.r.setInertia(0);
    this.r.setFriction(0);
    this.toggleDrawRenderable();
    this.toggleDrawRigidShape();
    this.jumpflag = 0;
    
}



gEngine.Core.inheritPrototype(Hero_end, GameObject);


Hero_end.prototype.update = function () {
    
    
    var xform = this.getXform();
    var xpos = xform.getXPos();
    var ypos = xform.getYPos();
    
    this.mWalkHeroLeft.updateAnimation();
    this.mWalkHeroRight.updateAnimation();
    this.mPushHero.updateAnimation();

    if(xpos<45)
        this.getXform().setXPos(45);
    var v=this.r.getVelocity();
    
    this.mode=1;

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W) && this.jumpflag===0&&this.mode!==10) {
        
        v[1]=23;
        this.r.setVelocity[v];      
        this.jumpflag =1;
    }
    

    if (v[1]<0&&this.mode!==10) {       
        v[1]=-22;
        this.r.setVelocity[v];
        this.jumpflag =1;
    }
    
    if(v[0]>0 && !(gEngine.Input.isKeyPressed(gEngine.Input.keys.D))&&this.mode!==10 && xpos<89 )
    {
        v[0]=0;
    }
    
    if(v[0]<0 && !(gEngine.Input.isKeyPressed(gEngine.Input.keys.A))&&this.mode!==10  &&xpos<89)
    {
        v[0]=0;
    }


   
    if (v[1]===0&&this.jumpflag===1&&this.mode!==10) {
        this.jumpflag = 0;      
        this.r.setVelocity[v];
    }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)&&this.mode!==10) {
        
        v[0]=-8;
        this.r.setVelocity[v];
    }
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)&&this.mode!==10) {
        v[0]=8;
        this.r.setVelocity[v];
    }
    
    if(v[0]>0&&v[1]===0&&this.mode!==10)
        this.mode=2;
    
    if(v[0]<0&&v[1]===0&&this.mode!==10)
        this.mode=3;
    
    if(v[0]>0&&v[1]>0&&this.mode!==10)
        this.mode=4;
    
    if(v[0]<0&&v[1]>0&&this.mode!==10)
        this.mode=5;
    
     if(v[0]>0&&v[1]<0&&this.mode!==10)
    { this.mode=6;}
    
     if(v[0]<0&&v[1]<0&&this.mode!==10)
    { this.mode=7;}
        
    if(v[0]===0&&v[1]<0&&this.mode!==10)
    { this.mode=8;}
    

    this.mHero.getXform().setPosition(this.getXform().getXPos(),this.getXform().getYPos());
    this.mWalkHeroRight.getXform().setPosition(this.getXform().getXPos(),this.getXform().getYPos());
    this.mWalkHeroLeft.getXform().setPosition(this.getXform().getXPos(),this.getXform().getYPos());
    this.mJumpHeroRightUp.getXform().setPosition(this.getXform().getXPos(),this.getXform().getYPos());
    this.mJumpHeroLeftUp.getXform().setPosition(this.getXform().getXPos(),this.getXform().getYPos());
    this.mJumpHeroRightDown.getXform().setPosition(this.getXform().getXPos(),this.getXform().getYPos());
    this.mJumpHeroLeftDown.getXform().setPosition(this.getXform().getXPos(),this.getXform().getYPos());
    this.mJumpHeroStraight.getXform().setPosition(this.getXform().getXPos(),this.getXform().getYPos());
    this.mPushHero.getXform().setPosition(this.getXform().getXPos(),this.getXform().getYPos());
    this.mDeadHero.getXform().setPosition(this.getXform().getXPos(),this.getXform().getYPos());
    this.mBalloonHero.getXform().setPosition(this.getXform().getXPos(),this.getXform().getYPos());
    
    
    
    
    
    

    console.log(xpos,ypos);
   
    GameObject.prototype.update.call(this);
    
    
};

Hero_end.prototype.draw=function(aCamera){
  
    if(this.mode===1){
      this.mHero.draw(aCamera);
    }
  if(this.mode===2){
      this.mWalkHeroRight.draw(aCamera);
    }
  if(this.mode===3){
   
      this.mWalkHeroLeft.draw(aCamera);
      
    }
    if(this.mode===4){
     
      this.mJumpHeroRightUp.draw(aCamera);
   
  }
  if(this.mode===5){
   
      this.mJumpHeroLeftUp.draw(aCamera);
  }
  if(this.mode===6){
   
      this.mJumpHeroRightDown.draw(aCamera);
  }
  if(this.mode===7){
   
      this.mJumpHeroLeftDown.draw(aCamera);
  }
  if(this.mode===8){
   
      this.mJumpHeroStraight.draw(aCamera);
  }
  if(this.mode===9){
   
      this.mPushHero.draw(aCamera);
  }
  if(this.mode===10){
   
      this.mDeadHero.draw(aCamera);
  }
  if(this.mode===11){
   
      this.mBalloonHero.draw(aCamera);
  }
 
};