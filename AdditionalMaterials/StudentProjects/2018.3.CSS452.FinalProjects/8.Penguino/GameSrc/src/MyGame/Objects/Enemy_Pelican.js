/* File: Enemy_Pelican.js 
 *
 *-This class is used to create a new Seal Enemy
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, WASDObj, SpriteAnimateRenderable, Penguin, Enemy,
NonPhysicsGameObject*/
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

Enemy_Pelican.eStatePhaseBit = Object.freeze({
   eRed: 0,
   eBlue: 1
});

Enemy_Pelican.eEnemy_PelicanState = Object.freeze({
    eTopLeftRegion: 0,
    eTopRightRegion: 1,
    eBottomLeftRegion: 2,
    eBottomRightRegion: 3,
    eExcitedRedExpress: 10,
    eExcitedRNormExpress: 11,
    eChaseState: 12,
    eCoolDownBlueExpress: 13,
    eCoolDownBNormExpress: 14
});

function Enemy_Pelican(spriteTexture, atX, atY, w, h, hero) {
    //this.mScene = scene;
    this.kSpeed = 50 / (5*60);
    this.kWeight = null;
    this.terminate = false; //This is used to tell if an object to stop updating
    this.kDetectThreshold = 35;
    this.kChaseThreshold = this.kDetectThreshold * 2; 
    this.kIsOnSurface = false;
    this.kOrigin = null;
    this.kHero = hero; //This is a reference to the hero object
    this.kReferencePosition = []; //Array that will hold different patrol sectors
    this.kCurrentStatePhase = null;

    //Step A: Define the Object (Enemy)
    this.mPelican = new SpriteAnimateRenderable(spriteTexture);
    this.mPelican.setColor([1, 1, 1, 0]);
    this.mPelican.getXform().setPosition(atX, atY);
    this.mPelican.getXform().setSize(w, h);
    this.mPelican.setSpriteSequence(512, 0,      // first element pixel position: top-left 512 is top of image, 0 is left of image
                                    130, 70,   // widthxheight in pixels
                                    1,          // number of elements in this sequence
                                    0);         // horizontal padding in between
    //this.mPelican.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
    //this.mPelican.setAnimationSpeed(30);
                                // show each element for mAnimSpeed updates

    NonPhysicsGameObject.call(this, this.mPelican);
    this.kOrigin = vec2.fromValues(atX, atY);
    this.setPatrolArea(); //Sets the states (positions) where the pelican can fly to
    this._computeNextState();
    
    
    
    //Variables to support chasing state
    this.mStateTimeTick = 0; //This is the time
    this.kColorShiftTime = 0.5 * 60 * (0.8 + 0.2 * Math.random());
    this.kColorRate = 0.5; //Rate at which color is changed 
    
   
}
gEngine.Core.inheritPrototype(Enemy_Pelican, NonPhysicsGameObject);

Enemy_Pelican.prototype.setPatrolArea =  function () {  
    var sector1 = [this.kOrigin[0] - 10, this.kOrigin[1] + 10];
    var sector2 = [this.kOrigin[0] + 10, this.kOrigin[1] + 10];
    var sector3 = [this.kOrigin[0] - 10, this.kOrigin[1] - 10];
    var sector4 = [this.kOrigin[0] + 10, this.kOrigin[1] - 10];
    
    this.kReferencePosition.push(sector1);
    this.kReferencePosition.push(sector2);
    this.kReferencePosition.push(sector3);
    this.kReferencePosition.push(sector4);
};

//Defualt enemy update
Enemy_Pelican.prototype.update = function () {
    this.getXform().setRotationInRad(0);
//   if (gEngine.Input.isKeyClicked(gEngine.Input.keys.six))
//       this.terminate = true;
   if (!this.terminate) {
        //NonPhysicsGameObject.prototype.update.call(this);    
        this.behavior();
    }   
};

////This is defualt Enemy Movement
Enemy_Pelican.prototype.behavior = function () {
    //Use chase behavior (State machine)   
    switch (this.mCurrentState) {
        case Enemy_Pelican.eEnemy_PelicanState.eTopLeftRegion: 
        case Enemy_Pelican.eEnemy_PelicanState.eTopRightRegion: 
        case Enemy_Pelican.eEnemy_PelicanState.eBottomLeftRegion: 
        case Enemy_Pelican.eEnemy_PelicanState.eBottomRightRegion: 
            this._servicePatrolStates();
            break;        
        case Enemy_Pelican.eEnemy_PelicanState.eExcitedRedExpress: 
            this._serviceRedShift();
            break;
        case Enemy_Pelican.eEnemy_PelicanState.eNormExpress: 
            this._serviceWhiteShift();
            break;
        case Enemy_Pelican.eEnemy_PelicanState.eChaseState: 
            this._serviceChase();
            break;
        case Enemy_Pelican.eEnemy_PelicanState.eCoolDownBlueExpress: 
            this._serviceBlueShift();
            break;
//        case Enemy_Pelican.eEnemy_PelicanState.eCoolDownNormExpress:
//            this._serviceShrink();
//            break;
    }
};

////Defualt enemy Hit event
Enemy_Pelican.prototype.hitEvent = function (multiplier = 1) {
    //NOTE: Here we want it to do a Color Shake (The objects alpha channel to flash to show that you hit it)
    
    //PlaceHolderCode: For now enemy alpha channel will only increase
    var color = this.getRenderable().getColor();
    color[3] += 0.5 * multiplier;
    
    if (color[3] >= 1)
    {
        this.setVisibility(false);
        this.terminate = true;
        this.mScene.addScore(10);
    }
    else
        this.getRenderable().setColor(color);
};


////STATE MACHINE Functions
Enemy_Pelican.prototype.setExpired = function() {
    this.mExpired = true;
};
Enemy_Pelican.prototype.hasExpired = function() {
    return this.mExpired;
};


Enemy_Pelican.prototype._computeNextState = function() {
    this.mCurrentState = this._getRandomState();
        
    var nextState = this._getRandomState();
    this.mTargetPosition = this._getRandomizedPosition(nextState);
    this._computeSpeed();
};
    
Enemy_Pelican.prototype._computeSpeed = function() {
    // var toNextPos = [];
    // vec2.subtract(toNextPos, this.mTargetPosition, this.getXform().getPosition());
    // DO NOT set this now! Move there gradually
    //      this.setCurrentFrontDir(toNextPos);
    // 
    this.setSpeed((0.8 + 0.4 * Math.random()) * this.kSpeed);
        // +-20% variation from covering 100 units in 5 seconds
};

Enemy_Pelican.prototype._getRandomizedPosition = function(region) {
    var p = this.kReferencePosition[region];
    var x = p[0] + ((Math.random() - 0.5) * 15);
    var y = p[1] + ((Math.random() - 0.5) * 10);
    return vec2.fromValues(x, y);
};

Enemy_Pelican.prototype._getRandomState = function() {
    var r = Math.random();
    var s;
    if (r < 0.25)
        s = Enemy_Pelican.eEnemy_PelicanState.eTopLeftRegion;
    else if (r < 0.5)
        s = Enemy_Pelican.eEnemy_PelicanState.eTopRightRegion;
    else if (r < 0.75)
        s = Enemy_Pelican.eEnemy_PelicanState.eBottomLeftRegion;
    else 
        s = Enemy_Pelican.eEnemy_PelicanState.eBottomRightRegion;
    return s;
};

Enemy_Pelican.prototype._distToHero = function() {
    var toHero = [];
    vec2.subtract(toHero, this.kHero.getXform().getPosition(), this.getXform().getPosition());
    return vec2.length(toHero);
};

Enemy_Pelican.prototype._servicePatrolStates = function() {
    if (this._distToHero(this.kHero) < this.kDetectThreshold) {
        // transition to chase!
        this.mCurrentState = Enemy_Pelican.eEnemy_PelicanState.eExcitedRedExpress;
        this.mStateTimeTick = 0;
        this.mTargetPosition = this.kHero.getXform().getPosition();
    } else {
       // Continue patrolling!
       NonPhysicsGameObject.prototype.update.call(this);
       var toTarget = [];
       vec2.subtract(toTarget, this.mTargetPosition, this.getXform().getPosition());
       var d = vec2.length(toTarget);
       if (d > 10) { 
           this.rotateObjPointTo(this.mTargetPosition, 0.05); // rotate rather quickly
       } else {
           this._computeNextState();
       }
   }
};

Enemy_Pelican.prototype._serviceChase = function() {
    if (this._distToHero(this.kHero) > this.kChaseThreshold) {
        // Transition to cool down
        this.mCurrentState = Enemy_Pelican.eEnemy_PelicanState.eCoolDownBlueExpress;
       // this.mEnemy_Pelican.setColor([1, 1, 1, 0.1]);
        this.mStateTimeClick = 0;
    } else {
        var p = vec2.fromValues(0, 0);
        if (this.pixelTouches(this.kHero, p)) {
            this.mPelican.setColor([1,0,1,1]);
            this.pixelCollision();
           //this.setExpired();
        } else {
            // Give chase!
            this.mTargetPosition = this.kHero.getXform().getPosition();
            this.rotateObjPointTo(this.mTargetPosition, 0.05); // rotate rather quickly
            //this.getXform().setPosition(50,40);
            NonPhysicsGameObject.prototype.update.call(this, this.kHero.getXform().getPosition());
        }
   }
};

Enemy_Pelican.prototype._serviceRedShift = function() {
    this.kCurrentStatePhase = Enemy_Pelican.eStatePhaseBit.eRed; 
    // 1. check for state transition
    if (this.mStateTimeTick > this.kColorShiftTime) {
        // done with current state, transition to next
        // make sure state variables are properly initialized
        this.mStateTimeTick = 0;
        this.mCurrentState = Enemy_Pelican.eEnemy_PelicanState.eNormExpress;
    } else {
        // continue ...
        this.mStateTimeTick++;
        console.log(this.mStateTimeTick);
        var color = this.getRenderable().getColor;
        color[1] -= 0.2;
        color[2] -= 0.2;
        
        //this.getRenderable().setColor(color);
        this.mPelican.setColor([1,0,0,0.3]);
    }
};

Enemy_Pelican.prototype._serviceBlueShift = function() {
    this.kCurrentStatePhase = Enemy_Pelican.eStatePhaseBit.eBlue;
    // 1. check for state transition
    if (this.mStateTimeTick > this.kColorShiftTime) {
        // done with current state, transition to next
        // make sure state variables are properly initialized
        this.mStateTimeTick = 0;
        this.mCurrentState = Enemy_Pelican.eEnemy_PelicanState.eNormExpress;
    } else {
        // continue ...
        this.mStateTimeTick++;
//        var color = this.getRenderable().getColor;
//        color[0] -= 0.2;
//        color[1] -= 0.2;
        
        this.getRenderable().setColor([0, 0, 1, 0.3]);
    }
};

Enemy_Pelican.prototype._serviceWhiteShift = function() {
    // 1. check for state transition
    if (this.mStateTimeTick > this.kColorShiftTime) {
        // done with current state, transition to next
        // make sure state variables are properly initialized
        this.mStateTimeTick = 0;
        
        if (this.kCurrentStatePhase === Enemy_Pelican.eStatePhaseBit.eRed)
            //this._serviceChase();
            this.mCurrentState = Enemy_Pelican.eEnemy_PelicanState.eChaseState;
        else if (this.kCurrentStatePhase === Enemy_Pelican.eStatePhaseBit.eBlue)
            this._computeNextState();
    } else {
        // continue ...
        this.mStateTimeTick++; 
        var color = this.getRenderable().getColor;
       
//       if (color[0] < 1)
//           color[0] += 0.2;
//       if (color[1] < 1)
//           color[1] += 0.2;
//       if (color[2] < 1)
//           color[2] += 0.2;
        
        this.getRenderable().setColor([1, 1, 1, 0]);
    }
};

//Defualt enemy Hit event
Enemy_Pelican.prototype.hitEvent = function (multiplier = 1) {
    var color = this.getRenderable().getColor();
    color[3] += 0.5 * multiplier;
    if(!this.terminate)
    {
      if (color[3] >= 1)
      {
        this.setVisibility(false);
        this.terminate = true;
        this.mScene.addScore(10);
      }
      else
        this.getRenderable().setColor(color);  
    }
    
};


Enemy_Pelican.prototype.pixelCollision = function () {
        if (this.kHero.getRigidBody().getVelocity()[1] < -30 || this.kHero.getRigidBody().getVelocity()[0] < -40)
            this.hitEvent(2); 
        else if (this.kHero.getRigidBody().getVelocity()[1] <= -15 || this.kHero.getRigidBody().getVelocity()[0] < -18)
        {
            this.hitEvent();
        }
        else{
            this.kHero.die();   
        }
};



