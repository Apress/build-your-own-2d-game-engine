/* File: Hero.js 
 *
 * Creates and initializes the Hero (Dye)
 * overrides the update function of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, TextureRenderable, vec2, RigidShape, RigidRectangle,
 *       Platform, Hero, Torch, GolemEmptyGameObject, IceArrow, GolemProjectile, Config, Light, Boundary */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

function Arrow(position,power,degree) {
    // Create the sprite
    this.mArrow = new TextureRenderable("assets/projectiles/arrow.png");
    this.mArrow.setColor([1, 1, 1, 0]);
    this.mArrow.getXform().setPosition(position[0], position[1]);
    this.mArrow.getXform().setSize(2/1.5, 12/1.5);
    this.power=power;
    this.degree=degree;
    this.mArrow.getXform().incRotationByDegree(degree+270);
    GameObject.call(this, this.mArrow);
    
    this.kBasePower = 180;
    this.mTimeSinceSpawn = 0;
    this.mTimeLimit = 600;
    this.mExpired=false;
    this.mCollided = false;
    this.mCollidedObj = null;
    this.mCollidedOffset = null;
    this.mReducedTimeLimit = this.mTimeLimit;
    
    // Physics
    var r = new RigidRectangle(
        this.getXform(),
        this.getXform().getWidth()*.8,
        this.getXform().getHeight()
    );
    r.setMass(2);
    r.setRestitution(.3);
    r.setFriction(1);  
    this.setRigidBody(r);
    var x=this.degree*(Math.PI/180);
    var y=this.degree*(Math.PI/180);
    x=Math.cos(x);
    y=Math.sin(y);
    this.getRigidBody().setVelocity(x*this.power* this.kBasePower, y*this.power* this.kBasePower);
    
    // Light.
    this.mLight = null;
}
gEngine.Core.inheritPrototype(Arrow, GameObject);

Arrow.prototype.getTimeAlive = function () {
    return this.mTimeSinceSpawn;
};

Arrow.prototype.update = function () {
    if (this.mTimeSinceSpawn >= this.mReducedTimeLimit && this.mDrawRenderable === true) {
        this.toggleDrawRenderable();
    }
    
    this.mTimeSinceSpawn++;
    var xform = this.mArrow.getXform();
    var vel = this.getRigidBody().getVelocity();
    if(!this.getCollided()){
        if (vel[0] >0) {
            xform.setRotationInRad(Math.atan(vel[1]/(vel[0] + .0001)) - Math.PI/2);
        }
        else {
            xform.setRotationInRad(Math.atan(vel[1]/(vel[0] + .0001)) + Math.PI/2);
        }
    }
    if(this.mTimeSinceSpawn > this.mTimeLimit){
        this.setExpired(true);
    }
    if(this.mCollided === true) {
        //this.mRigidBody.setFriction(1);
        xform.setXPos(this.mCollidedObj.getXform().getXPos() + this.mCollidedOffset[0]);
        xform.setYPos(this.mCollidedObj.getXform().getYPos() + this.mCollidedOffset[1]);
    }
    if (!this.mCollided) {
        this.mRigidBody.update();
    }
    this.setCurrentFrontDir(vel);
    
    if (this.mLight instanceof Light) {
        this.mLight.setXPos(xform.getXPos());
        this.mLight.setYPos(xform.getYPos());
    }
};

Arrow.prototype.getPosition = function(){
    return this.mArrow.getXform().getPosition();
};

Arrow.prototype.setCollided = function(value) {
    this.mCollided = value;
};

Arrow.prototype.getCollided = function() {
    return this.mCollided;
};


Arrow.prototype.userCollisionHandling = function(obj){
    if (this.mCollided === true) {
        return true;
    }
    
    if (obj instanceof Arrow){
        return true;
    }
    if (obj instanceof Boundary){
        return true;
    }
    
    if (obj instanceof Hero) {
        if (this.getTimeAlive() < 30 || this.mCollided) {
            return true;
        }
        
        obj.hit(this.getDamage());
    }
  
    if (obj instanceof Torch) {
        return true;
    }
    
    if (obj instanceof GolemProjectile) {
        return true;
    }
    
    if (obj instanceof GolemEmptyGameObject) {
        if (obj.mIgnoreCollision === true) {
            return true;
        }
        
        this.mReducedTimeLimit = 60;
        if (this instanceof IceArrow) {
            this.mReducedTimeLimit = Config.Arrows.Ice.EffectDuration  + 60;
        }
    }
    
    this.setCollided(true);
    this.mCollidedObj = obj;
    this.mCollidedOffset = vec2.fromValues(
            this.getXform().getXPos() - obj.getXform().getXPos(),
            this.getXform().getYPos() - obj.getXform().getYPos()
    );
    return false;
};

Arrow.prototype.getDamage = function () {
    return this.power * this.kBasePower;
};

Arrow.prototype.getEffectDuration = function () {
    return 0;
};

Arrow.prototype.setLight = function(light) {
    this.mLight = light;
    this.mLight.setLightTo(true);
};

Arrow.prototype.turnLightOff = function() {
    if (this.mLight instanceof Light) {
        this.mLight.setLightTo(false);
    }
};