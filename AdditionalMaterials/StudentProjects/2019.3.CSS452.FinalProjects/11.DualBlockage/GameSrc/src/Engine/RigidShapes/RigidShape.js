
/*jslint node: true, vars: true, evil: true, bitwise: true */
"use strict";

/* global gEngine, vec2 */

/**
 * Default Constructor<p>
 * A shape attached to a transform to allow for Collision Handling <p>
 * @param {Transform} xf The transform that the RigidShape will be based off of
 * @class RigidShape
 * @type RigidShape
 */
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

/**
 * Return mInvMass
 * @memberOf RigidShape
 * @returns {float} mInvMass
 */
RigidShape.prototype.getInvMass = function() { return this.mInvMass; };
/**
 * Return mInertia
 * @memberOf RigidShape
 * @returns {float} mInertia
 */
RigidShape.prototype.getInertia = function() { return this.mInertia; };
/**
 * Return mFriction
 * @memberOf RigidShape
 * @returns {float} mFriction
 */
RigidShape.prototype.getFriction = function() { return this.mFriction; };
/**
 * Return mRestitution
 * @memberOf RigidShape
 * @returns {float} mRestitution
 */
RigidShape.prototype.getRestitution = function() { return this.mRestitution; };
/**
 * Return mAngularVelocity
 * @memberOf RigidShape
 * @returns {float} AngularVelocity
 */
RigidShape.prototype.getAngularVelocity = function() { return this.mAngularVelocity; };

/**
 * Sets the mass of the rigid body. Used for physics calculations
 * @memberOf RigidShape
 * @param {float} m The number to set the mass to
 */
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
/**
 * Sets the Inertia of the rigid body
 * @memberOf RigidShape
 * @param {float} i The number to set the Inertia to
 */
RigidShape.prototype.setInertia = function(i) { this.mInertia = i; };
/**
 * Sets the Inertia of the rigid body
 * @memberOf RigidShape
 * @param {float} f The number to set the Inertia to
 */
RigidShape.prototype.setFriction = function(f) { this.mFriction = f; };
/**
 * Sets the Restitution of the rigid body
 * @memberOf RigidShape
 * @param {float} r The number to set the Restitution to
 */
RigidShape.prototype.setRestitution = function(r) { this.mRestitution = r; };
/**
 * Sets the Angular Velocity of the rigid body
 * @memberOf RigidShape
 * @param {float} w The number to set the Angular Velocity to
 */
RigidShape.prototype.setAngularVelocity = function(w) { this.mAngularVelocity = w; };
/**
 * Sets the Angular Velocity delta of the rigid body
 * @memberOf RigidShape
 * @param {float} dw The number to set the Angular Velocity Delta to
 */
RigidShape.prototype.setAngularVelocityDelta = function(dw) { this.mAngularVelocity += dw; };

/**
 * Toggle the drawing of the rigidbody
 * @memberOf RigidShape
 */
RigidShape.prototype.toggleDrawBound = function() {
    this.mDrawBounds = !this.mDrawBounds;
};

/**
 * Return the center of the Rigid Body
 * @memberOf RigidShape
 * @returns {Float[]} Center Position [x,y]
 */
RigidShape.prototype.getCenter = function() {
    return this.mXform.getPosition();
};

/**
 * Set the radius of the bound
 * @memberOf RigidShape
 * @param {float} r The number to set the radius
 */
RigidShape.prototype.setBoundRadius = function(r) {
    this.mBoundRadius = r;
};
/**
 * Return the bound radius
 * @memberOf RigidShape
 * @returns {float} mBoundRadius
 */
RigidShape.prototype.getBoundRadius = function() {
    return this.mBoundRadius;
};

/**
 * Sets the velocity of the rigid shape
 * @memberOf RigidShape
 * @param {float} x The number to set the xVelocity to
 * @param {float} y The number to set the yVelocity to
 */
RigidShape.prototype.setVelocity = function(x, y) {
    this.mVelocity[0] = x;
    this.mVelocity[1] = y;
};
/**
 * Returns the velocity of the rigid shape
 * @memberOf RigidShape
 * @returns {float[]} The velocity [xVelocity, yVelocity]
 */
RigidShape.prototype.getVelocity = function() { return this.mVelocity;};
/**
 * Inverses both the x and y velocity
 * @memberOf RigidShape
 */
RigidShape.prototype.flipVelocity = function() { 
    this.mVelocity[0] = -this.mVelocity[0];
    this.mVelocity[1] = -this.mVelocity[1];
};

/**
 * Handles the motion of the rigid shape
 * @memberOf RigidShape
 */
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

/**
 * Adjusts the position of the rigid body by the parameters
 * @memberOf RigidShape
 * @param {float} v
 * @param {float} delta
 */
RigidShape.prototype.adjustPositionBy = function(v, delta) {
    var p = this.mXform.getPosition();
    vec2.scaleAndAdd(p, p, v, delta);
};

var kRigidShapeDelta = 0.01;
/**
 * Updates the RigidShape
 * @memberOf RigidShape
 */
RigidShape.prototype.update = function () {

    if (this.mInvMass === 0)
        return;
    
    if (gEngine.Physics.getHasMotion())
        this.travel();
};
 
/**
 * Allows for keyboard controls to manipulate the shape
 * @memberOf RigidShape
 */ 
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
            this.setMass(m + delta*10);
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

/**
 * Checks to see if this shape and the passed shape are overlapping
 * @memberOf RigidShape
 * @param {RigidShape} otherShape The shape being checked for overlapping
 * @returns {Boolean} Whether the shapes overlap or not
 */
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

/**
 * Draws the bounds of the Rigid Shape
 * @memberOf RigidShape
 * @param {Camera} aCamera The camera to draw the shape on
 */
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
/**
 * Draws the bounds of the Rigid Circle
 * @memberOf RigidShape
 * @param {Camera} aCamera The camera to draw the shape on
 * @param {float} r The radius of the circle
 */
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
/**
 * Gets the mass, inertia, friction, restitution of the shape and returns it as a string
 * @memberOf RigidShape
 * @returns {String} A string containing the physic values of the rigid shape
 */
RigidShape.prototype.getCurrentState = function() {
    var m = this.mInvMass;
    if (m !== 0)
        m = 1/m;
    
    return "M=" + m.toFixed(kPrecision) +
           "(I=" + this.mInertia.toFixed(kPrecision) + ")" +
           " F=" + this.mFriction.toFixed(kPrecision) +
           " R=" + this.mRestitution.toFixed(kPrecision);
};

/**
 * Get the type of shape it is
 * @memberOf RigidShape
 * @returns {String} The type of shape
 */
RigidShape.prototype.getType = function() { return this.mType; };

/**
 * Handles collision between 
 * @param {Particle} aParticle The particle to check for collisison
 * @param {Transform} xf The transform of the particle
 * @returns {boolean} status, Whether the rigid shape collided with a particle
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
 * @param {Transform} xf The transfomrm that you want to set the shape to
 * @memberOf RigidShape
 */
RigidShape.prototype.setTransform = function(xf){
    this.mXform = xf;
};