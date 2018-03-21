/* File: EnemyStatePace.js  */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, RigidCircle, RigidRectangle, Enemy */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

// sets the enemy state to pace around an initial position
Enemy.prototype.setPaceState = function(initPos, dist, range) {
    console.log("pace");
    var r = new RigidRectangle(this.getXform(), 5, 5);
    r.setMass(0.7);  // less dense than Minions
    r.setRestitution(0.3);
    this.setPhysicsComponent(r);
    
    this.mInitialPosition = vec2.create(initPos[0]);
    this.getXform().setPosition(initPos[0], initPos[1]);
    
    this.kXDelta = .1;
    this.mDir = 1;
    this.mState = null;
    this.mSpeedVel = 1;
    this.mLastPosition = initPos;
    
    this._updateState(this.updatePace);
    
    this.mRange = range;
    
    this.mEnemy.getXform().setSize(8.38, 5);
    this.mEnemy.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateLeft);
    this.mEnemy.setAnimationSpeed(15); 
    this.mEnemy.setSpriteSequence(68, 57, 57, 34, 2, 0);
};

Enemy.prototype.updatePace = function () {
    
    var xform = this.getXform();
   var updateSprite = false;
    
    // check to see if the enemy has not moved
    if(vec2.distance(this.mLastPosition, xform.getPosition()) === 0){
        this._turn();
        updateSprite = true;
    }
    
    // check to see if the enemy is within range of the hero to attack
    if(vec2.distance(xform.getPosition(), this.mHero.getXform().getPosition()) < this.mRange) {     
       
        // see what side of the enemy the hero is on
        var heroXPos = this.mHero.getXform().getXPos();
        if(heroXPos > xform.getXPos()) { // chase right
            if(this.mDir < 1){
                this.mDir = 1;
                updateSprite = true;
            }
        }                             
        else { // chase left
            if(this.mDir > -1){
                this.mDir = -1;
                updateSprite = true;
            }
        }
        
        //increase the speed to make it a little harder!
        this.mSpeedVel = 2.1;                                                     // increase speed
        if(Math.abs(heroXPos - xform.getXPos()) < 0.11) {this.mSpeedVel = 0;}   // if the enemy is under the hero stop pacing
        this.mEnemy.setColor([1, 0, 0, .3]);                                    // show red on chase
        this.mEnemy.setAnimationSpeed(15 / this.mSpeedVel); 
    }
    // not in range of the hero, go back to patrol
    else {
        this.mSpeedVel = 1;                                                     // set speed to normal
        this.mEnemy.setColor([1, 1, 1, 0]);                                     // show nothing on patrol
        this.mEnemy.setAnimationSpeed(15 / this.mSpeedVel); 
    }
    
    this.mLastPosition = vec2.clone(xform.getPosition());
    xform.incXPosBy(this.kXDelta * this.mDir * this.mSpeedVel);                 // change position
    
    if(updateSprite === true) {
        this._updateSprite();
    }
    
    this.mEnemy.updateAnimation();
};

Enemy.prototype._turn = function () {
    this.mDir *= -1;
};

Enemy.prototype._updateSprite = function () {
    if(this.mDir === 1) {
        this.mEnemy.setSpriteSequence(68, 57, 57, 34, 2, 0);
    }
    else {
        this.mEnemy.setSpriteSequence(34, 57, 57, 34, 2, 0);
    }
};