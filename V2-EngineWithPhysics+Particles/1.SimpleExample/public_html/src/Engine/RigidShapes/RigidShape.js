
/*jslint node: true, vars: true, evil: true, bitwise: true */
"use strict";

/* global gEngine, vec2 */

function RigidShape(xf) {
    this.mLine = new LineRenderable();
    this.mLine.setColor([1, 1, 1, 1]);
    
    this.mXform = xf;
    this.mAcceleration = gEngine.Physics.getSystemAcceleration();
    this.mVelocity = vec2.fromValues(0, 0);
    this.mType = "";
    
    this.mInvMass = 1;
    this.mInertia = 0;
    
    this.mFriction = 0.8;
    this.mRestitution = 0.2;
    
    this.mAngularVelocity = 0;
    
    this.mBoundRadius = 0;
    
    this.mDrawBounds = false;
}

RigidShape.prototype.getInvMass = function() { return this.mInvMass; };
RigidShape.prototype.getInertia = function() { return this.mInertia; };
RigidShape.prototype.getFriction = function() { return this.mFriction; };
RigidShape.prototype.getRestitution = function() { return this.mRestitution; };
RigidShape.prototype.getAngularVelocity = function() { return this.mAngularVelocity; };

RigidShape.prototype.setMass = function(m) { 
    if (m > 0) {
        this.mInvMass = 1 / m;
        this.mAcceleration = gEngine.Physics.getSystemAcceleration();
    } else {
        this.mInvMass = 0;
        this.mAcceleration = [0, 0];
        //this.mVelocity = [0, 0];
        //this.mAngularVelocity = 0;
    }
    this.updateInertia();
};
RigidShape.prototype.setInertia = function(i) { this.mInertia = i; };
RigidShape.prototype.setFriction = function(f) { this.mFriction = f; };
RigidShape.prototype.setRestitution = function(r) { this.mRestitution = r; };
RigidShape.prototype.setAngularVelocity = function(w) { this.mAngularVelocity = w; };
RigidShape.prototype.setAngularVelocityDelta = function(dw) { this.mAngularVelocity += dw; };

RigidShape.prototype.toggleDrawBound = function() {
    this.mDrawBounds = !this.mDrawBounds;
};

RigidShape.prototype.getCenter = function() {
    return this.mXform.getPosition();
};

RigidShape.prototype.setBoundRadius = function(r) {
    this.mBoundRadius = r;
};
RigidShape.prototype.getBoundRadius = function() {
    return this.mBoundRadius;
};

RigidShape.prototype.setVelocity = function(x, y) {
    this.mVelocity[0] = x;
    this.mVelocity[1] = y;
};
RigidShape.prototype.getVelocity = function() { return this.mVelocity;};
RigidShape.prototype.flipVelocity = function() { 
    this.mVelocity[0] = -this.mVelocity[0];
    this.mVelocity[1] = -this.mVelocity[1];
};

RigidShape.prototype.travel = function() {
    var dt = gEngine.GameLoop.getUpdateIntervalInSeconds();
    
    // update acceleration
    vec2.scaleAndAdd(this.mVelocity, this.mVelocity, this.mAcceleration, dt);
    
    //s += v*t  with new velocity
     // linear motion
    var p = this.mXform.getPosition();
    vec2.scaleAndAdd(p, p, this.mVelocity, dt);
    
    this.mXform.incRotationByRad(this.mAngularVelocity * dt);
};

RigidShape.prototype.adjustPositionBy = function(v, delta) {
    var p = this.mXform.getPosition();
    vec2.scaleAndAdd(p, p, v, delta);
};

var kRigidShapeDelta = 0.01;
RigidShape.prototype.update = function () {

    if (this.mInvMass === 0)
        return;
    
    if (gEngine.Physics.getHasMotion())
        this.travel();
};
    
RigidShape.prototype.userSetsState = function() {
    // keyboard control
    var delta = 0;
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Up)) {
        delta = kRigidShapeDelta;
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Down)) {
        delta = -kRigidShapeDelta;
    }
    if (delta !== 0) {
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.M)) {
            var m = 0;
            if (this.mInvMass > 0) 
                m = 1/this.mInvMass;
            this.setMass(m + delta);
        }
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.F)) {
            this.mFriction += delta;
            if (this.mFriction < 0)
                this.mFriction = 0;
            if (this.mFriction > 1)
                this.mFriction = 1;
        }
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.R)) {
            this.mRestitution += delta;
            if (this.mRestitution < 0)
                this.mRestitution = 0;
            if (this.mRestitution > 1)
                this.mRestitution = 1;
        }
    }
    
};


RigidShape.prototype.boundTest = function (otherShape) {
    var vFrom1to2 = [0, 0];
    vec2.subtract(vFrom1to2, otherShape.mXform.getPosition(), this.mXform.getPosition());
    var rSum = this.mBoundRadius + otherShape.mBoundRadius;
    var dist = vec2.length(vFrom1to2);
    if (dist > rSum) {
        //not overlapping
        return false;
    }
    return true;
};

RigidShape.prototype.draw = function(aCamera) {
    if (!this.mDrawBounds)
        return;
    
    var len = this.mBoundRadius * 0.5;
    //calculation for the X at the center of the shape
    var x = this.mXform.getXPos();
    var y = this.mXform.getYPos();
    
    this.mLine.setColor([1, 1, 1, 1]);
    this.mLine.setFirstVertex(x - len, y);  //Horizontal
    this.mLine.setSecondVertex(x + len, y); //
    this.mLine.draw(aCamera);
    
    this.mLine.setFirstVertex(x, y + len);  //Vertical
    this.mLine.setSecondVertex(x, y - len); //
    this.mLine.draw(aCamera);
};

RigidShape.kNumCircleSides = 16;
RigidShape.prototype.drawCircle = function(aCamera, r) {
    var pos = this.mXform.getPosition();    
    var prevPoint = vec2.clone(pos);
    var deltaTheta = (Math.PI * 2.0) / RigidShape.kNumCircleSides;
    var theta = deltaTheta;
    prevPoint[0] += r;
    var i, x, y;
    for (i = 1; i <= RigidShape.kNumCircleSides; i++) {
        x = pos[0] + r * Math.cos(theta);
        y = pos[1] +  r * Math.sin(theta);
        
        this.mLine.setFirstVertex(prevPoint[0], prevPoint[1]);
        this.mLine.setSecondVertex(x, y);
        this.mLine.draw(aCamera);
        
        theta = theta + deltaTheta;
        prevPoint[0] = x;
        prevPoint[1] = y;
    }
};

var kPrecision = 2;
RigidShape.prototype.getCurrentState = function() {
    var m = this.mInvMass;
    if (m !== 0)
        m = 1/m;
    
    return "M=" + m.toFixed(kPrecision) +
           "(I=" + this.mInertia.toFixed(kPrecision) + ")" +
           " F=" + this.mFriction.toFixed(kPrecision) +
           " R=" + this.mRestitution.toFixed(kPrecision);
};

RigidShape.prototype.getType = function() { return this.mType; };

/**
 * Handles collision between 
 * @param {Particle} aParticle, the particle to check for collisison
 * @param {Transform} xf, the transform of the particle
 * @returns {boolean} status, whether the rigid shape collided with a particle
 * @memberOf RigidShape
 */
RigidShape.prototype.resolveParticleCollision = function(aParticle, xf) {
    var status = false;
    if (this.getType()==="RigidCircle"){
        status = gEngine.ParticleSystem.resolveCirclePos(this, aParticle);
        return status;
    }
    else if( this.getType()==="RigidRectangle"){
        status = gEngine.ParticleSystem.resolveRectPos(this, xf);
        return status;
    }
    else{return status;}
};

/**
 * Return's the transform of the RigigdShape
 * @param {Transform} xf, the transfomrm that you want to set the shape to
 * @returns {void}
 * @memberOf RigidShape
 */
RigidShape.prototype.setTransform = function(xf){
    this.mXform = xf;
};