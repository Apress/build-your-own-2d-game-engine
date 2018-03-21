/* File: Penguin.js 
 *
 * Creates and initializes a Penguin object
 * overrides the update function of GameObject to define
 * simple sprite animation behavior
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteAnimateRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

function Penguin(scene, spr, x, y)
{
  this.mScene = scene;
  this.kSpriteSheet = spr;
  
  this.mStartx = x;
  this.mStarty = y;

  this.mSolid = false;

  this.xvel = 0;

  this.mSprite = new LightRenderable(spr);

  this.mSprite.setColor([1,1,1,0]);
  this.mSprite.getXform().setPosition(x,y);
  this.mSprite.getXform().setSize(9,12);
  
  this.mSprite.setSpriteSequence(512, 9,      // first element pixel position: top-left 512 is top of image, 0 is left of image
                                    128, 128,   // widthxheight in pixels
                                    4,          // number of elements in this sequence
                                    0);         // horizontal padding in between
    this.mSprite.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
    this.mSprite.setAnimationSpeed(10);
                                // show each element for mAnimSpeed updates
                                
    GameObject.call(this, this.mSprite);

  var r = new RigidCircle(this.getXform(), 5);
  r.setMass(1);
  r.setFriction(100);
  r.setRestitution(0);
  this.setRigidBody(r);
  
  this.toggleDrawRigidShape();
 

  this.mFloorNormal = [0,0];
  this.mLanded = false;
  this.mMaxStandableAngle = 10; // the maximum angle for a platform
                                // we can walk on
  this.mMaxSlideableAngle = 60; // the maximum angle for a platform
                                // we slide off of (and not just be stopped)
  this.mMaxWalkSpeed = 50; // the maximum speed we can walk on a flat platform, 
                           // otherwise we'll slide (walk speed is usu. 42-ish)
}
gEngine.Core.inheritPrototype(Penguin, GameObject);

Penguin.prototype.initialize = function()
{
};

Penguin.prototype.update = function()
{
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.A))
    {
        
        // flip sprite if facing right (dir == true)
        if (this.mSprite.getDirection()) {
            this.mSprite.setSpriteSequence(384, 9,  // first element pixel position: top-left 512 is top of image, 0 is left of image
                                      128, 128,     // widthxheight in pixels
                                      4,            // number of elements in this sequence
                                      0);           // horizontal padding in between
            this.mSprite.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
            this.mSprite.setAnimationSpeed(10);
            this.mSprite.reverseDirection();
      
         }
         
    if(this.mLanded)
    {
      this.xvel -= 0.05;
      if(this.xvel < -0.7) this.xvel = -0.7;
    }
    else
    {
      this.xvel -= 0.2 / 60;
      this.getRigidBody().accelerate(-0.2,0);
    }
    }
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.D))
    {
        // flip sprite if facing left (dir == false)
        
        if (!this.mSprite.getDirection()) {
            this.mSprite.setSpriteSequence(512, 9,  // first element pixel position: top-left 512 is top of image, 0 is left of image
                                      128, 128,     // widthxheight in pixels
                                      4,            // number of elements in this sequence
                                      0);           // horizontal padding in between
            this.mSprite.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
            this.mSprite.setAnimationSpeed(10);
            this.mSprite.reverseDirection();
        }
        
        
        if(this.mLanded)
        {
          this.xvel += 0.05;
          if(this.xvel > 0.7) this.xvel = 0.7;
        }
        else
        {
          this.xvel += 0.2 / 60;
         this.getRigidBody().accelerate(0.2,0);
        }
    }

  if(!gEngine.Input.isKeyPressed(gEngine.Input.keys.A)
  && !gEngine.Input.isKeyPressed(gEngine.Input.keys.D) && this.mLanded)
  {
    this.xvel *= 0.95;
  }

  this.touchingFloor = this.isTouchingFloor();

  if(this.mLanded)
  {
    var dx = this.xvel *  this.mFloorNormal[1];
    var dy = this.xvel * -this.mFloorNormal[0];

    this.getRigidBody().adjustPositionBy([dx,dy],1);
    this.getRigidBody().setVelocity(dx * 60,dy * 60);

    if(this.isTouchingWall()) this.getRigidBody().adjustPositionBy([dx,dy],-1);
  }
  else
  {
    this.xvel = this.getRigidBody().getVelocity()[0] / 60;
  }

  if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Space) && 
     !(this.mFloorNormal[0] == 0 && this.mFloorNormal[1] == 0))
  {
    gEngine.AudioClips.playACue(this.mScene.jump);
    this.getRigidBody().setMass(1);
    this.getRigidBody().accelerate(0,60);
    this.touchingFloor=false;
    this.mFloorNormal = [0,0];
  }

  this.getRigidBody().update();
  
  var pos = this.getRigidBody().getCenter();
  this.mSprite.getXform().setPosition(pos[0], pos[1]);
  this.mSprite.getXform().setRotationInRad(0);
  
  // die if we go too low
  if(pos[1] < this.mScene.mLowestObject - 100)
      this.die();
  
  this.mSprite.updateAnimation();
  
  if(gEngine.Input.isKeyClicked(gEngine.Input.keys.X))
  {
      this.die();
  }

  
  
  //------------------------------------------------SLIDE
  if(this.isSliding()){
      //this.mSprite.setColor([1,0,0,1]);

      this.switchToSlide();
      this.slideMode=true;
     
  }
  else{
                //this.mSprite.setColor([1,1,1,0]); 
                
                if(this.slideMode){
                    this.slideMode=false;
                    this.switchToWalk();
                }

      }  

    

};

/*
Penguin.prototype.draw = function(aCamera)
{
  this.mSprite.draw(aCamera);
};
*/

Penguin.prototype.resetPhysics = function()
{
  this.getRigidBody().setMass(1);
  this.mFloorNormal = [0,0];
  this.mLanded = false;
};

Penguin.prototype.setFloorNormal = function(normal)
{
  this.mFloorNormal = [normal[0], normal[1]];
};

Penguin.prototype.land = function(normal)
{
  this.mFloorNormal = [normal[0], normal[1]];
  //console.log(normal, this.getLength(this.getRigidBody().getVelocity()));
  if(!gEngine.Input.isKeyPressed(gEngine.Input.keys.J) &&
     this.getLength(this.getRigidBody().getVelocity()) < this.mMaxWalkSpeed)
  {
    this.mLanded = true;
    this.xvel = this.getRigidBody().getVelocity()[0] / 60;
    this.getRigidBody().setMass(0);
    //this.getRigidBody().adjustPositionBy([0,0.01],1);
    //this.stayOnTop([0,0]);
    if(this.xvel >  0.7) this.xvel =  0.7;
    if(this.xvel <- 0.7) this.xvel = -0.7;
  }
};

Penguin.prototype.stayOnTop = function(dp)
{
  var dy = 0;
  var inTheAir = true;
  var i=0.05;
  while(i>0.001)
  {
    if(this.isTouchingFloor())
    {
      // inch up a bit
      this.getRigidBody().adjustPositionBy([0,i],1);
      dy += i;
      inTheAir = false;
    }
    else
    {
      // inch down a bit
      this.getRigidBody().adjustPositionBy([0,-i],1);
      dy -= i;
    }
    // inch half as much last time
    i /= 2;
  }
  
  while(!this.isTouchingFloor())
    {
      this.getRigidBody().adjustPositionBy([0,-i],1);
      dy -= i;
    }
  /*
  if(inTheAir || dy < (this.getRigidBody().getVelocity()[1] - 20) / 60 )
  {
    // we're floating in the air, undo the moving we did
    this.getRigidBody().adjustPositionBy([0,-dy],1);
  }
  else
  {
    while(!inTheAir && !this.isTouchingFloor())
    {
      this.getRigidBody().adjustPositionBy([0,-i],1);
      dy -= i;
    }
    //dp[1] += dy;
  }
  */
};

Penguin.prototype.isTouchingFloor = function()
{
  var ci = new CollisionInfo;
  for(var i=0; i<this.mScene.mObjects.size(); i++)
  {
    if(this.getRigidBody().collisionTest(
       this.mScene.mObjects.getObjectAt(i).getRigidBody(), ci)
       && Math.abs(ci.getNormal()[1]) > Math.cos(
         this.mMaxStandableAngle * Math.PI/180))
    {
      //this.touchingFloor = true;
      return true;
    }  
  }
  //this.touchingFloor = false;
  return false;
};

Penguin.prototype.getTouchingFloor = function()
{
  return this.touchingFloor;
};

Penguin.prototype.isTouchingWall = function()
{
  var ci = new CollisionInfo;
  for(var i=0; i<this.mScene.mObjects.size(); i++)
  {
    if(this.mScene.mObjects.getObjectAt(i).mSolid &&
       this.getRigidBody().collisionTest(
       this.mScene.mObjects.getObjectAt(i).getRigidBody(), ci) && 
       Math.abs(ci.getNormal()[1]) <= Math.cos(
         this.mMaxSlideableAngle * Math.PI/180))
    {
      console.log(ci.getNormal());
      // manually check collision for the other object
      if(typeof this.mScene.mObjects.getObjectAt(i).collision === "function")
        this.mScene.mObjects.getObjectAt(i).collision(this,ci);
      
            
        //if(){
        //    return false;
        //}
            
            return true;
    }
  }

  return false;
};

Penguin.prototype.getVelocity = function()
{
  var retval = [];
  retval[0] = (this.mLanded ? this.xvel *  this.mFloorNormal[1] * 60
                            : this.getRigidBody().getVelocity()[0]);
  retval[1] = (this.mLanded ? this.xvel * -this.mFloorNormal[0] * 60
                            : this.getRigidBody().getVelocity()[1]);
  return retval;
};

Penguin.prototype.getLength = function(vec)
{
  return Math.sqrt(vec[0]*vec[0] + vec[1]*vec[1]);
};

Penguin.prototype.die = function()
{    
    //var lives = this.mScene.Lives;
    //this.mScene.initialize();
    this.mScene.Lives--;
    this.getXform().setPosition(this.mStartx, this.mStarty);
    this.getXform().setRotationInRad(0);
    this.getRigidBody().setVelocity(0,0);
    gEngine.GameLoop.stop();
};

Penguin.prototype.isSliding = function()
{
    // we're allowed to stop sliding mid-air, but not start sliding
    // so only check if we're on the floor or we're sliding (mid air)

    // the penguin is sliding if it has physics enabled (mass != 0)
    // and either A: it's not in the air ( |floor notmal| != 0, i.e., there's a floor
    //         or B: it's going fast enough
    if(this.getLength(this.mFloorNormal) > 0.5 || this.mIsSliding)
    {
      this.mIsSliding = (this.getRigidBody().getInvMass() !== 0 && 
                        (this.getLength(this.mFloorNormal) > 0.5 ||
                         Math.abs(this.getRigidBody().getVelocity()[0]) > this.mMaxWalkSpeed));
    }
  
  return this.mIsSliding;
};

Penguin.prototype.switchToSlide = function()
{
      //this.mSprite.setColor([1,0,0,1]);
             if (this.getVelocity()[0]<=0){ //slide left 
                this.mSprite.setSpriteSequence(128, 9,  // first element pixel position: top-left 512 is top of image, 0 is left of image
                                          128, 128,     // widthxheight in pixels
                                          1,            // number of elements in this sequence
                                          0);           // horizontal padding in between
                this.mSprite.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
                this.mSprite.setAnimationSpeed(10);
                if(this.getLength(this.getVelocity()) > 2)
                this.mSprite.getXform().setRotationInRad(Math.PI + Math.atan2(this.getVelocity()[1], this.getVelocity()[0]));
                //this.mSprite.reverseDirection();
            }
            
            else{
                this.mSprite.setSpriteSequence(256, 9,  // first element pixel position: top-left 512 is top of image, 0 is left of image
                                          128, 128,     // widthxheight in pixels
                                          0,            // number of elements in this sequence
                                          0);           // horizontal padding in between
                this.mSprite.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
                this.mSprite.setAnimationSpeed(10);
                if(this.getLength(this.getVelocity()) > 2)
                this.mSprite.getXform().setRotationInRad(Math.atan2(this.getVelocity()[1], this.getVelocity()[0]));
                //this.mSprite.reverseDirection();
            } 
            
};


Penguin.prototype.switchToWalk = function()
{
    
    
            if (this.getVelocity()[0]<=0) {
                this.mSprite.setSpriteSequence(384, 9,  // first element pixel position: top-left 512 is top of image, 0 is left of image
                                          128, 128,     // widthxheight in pixels
                                          4,            // number of elements in this sequence
                                          0);           // horizontal padding in between
                this.mSprite.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
                this.mSprite.setAnimationSpeed(10);
                this.mSprite.reverseDirection();
            }
            else{
                this.mSprite.setSpriteSequence(512, 9,  // first element pixel position: top-left 512 is top of image, 0 is left of image
                                          128, 128,     // widthxheight in pixels
                                          4,            // number of elements in this sequence
                                          0);           // horizontal padding in between
                this.mSprite.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
                this.mSprite.setAnimationSpeed(10);
                this.mSprite.reverseDirection();
            
            }
    
    
    
    
};
