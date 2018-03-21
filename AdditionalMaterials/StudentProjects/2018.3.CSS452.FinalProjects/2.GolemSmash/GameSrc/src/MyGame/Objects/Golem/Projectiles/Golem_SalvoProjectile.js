/* File: Golem_SalvoProjectile.js 
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteAnimateRenderable, vec2, Arrow, Platform, Config, Golem, 
 * , GolemProjectile*/
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

/**
 * This file is currently fucked and doesn't work.
 * 
 * @param {type} sprite
 * @param {type} golemLoc
 * @param {type} golemOrientation
 * @param {type} targetPos
 * @returns {GolemSalvoProjectile}
 */
function GolemSalvoProjectile(sprite, golemLoc, golemOrientation, targetPos) {  
    // Create the renderable
    this.mProjectile = new TextureRenderable(sprite);
    GolemProjectile.call(this, this.mProjectile);
    
    // Keep a record of the target position
    this.mGolemLoc = vec2.clone(golemLoc);
    this.mVertexPos = null;
    this.mTargetPos = null;

    // Various things to keep track of.
    this.mFinalTargetPos = this._calcTargetPos(targetPos);
    this.mLaunchPos = this._calcLaunchPos();
    this.mVertexPos = this._calcVertex();
    this.mLaunchDir = this._calcLaunchDir(golemOrientation);
    this.mCurrentTargetPos = this.mVertexPos;
    this.mParticles = null;
    this.mAccuracyDelta = 
        (Config.Golem.Projectiles.Salvo.MaxAccuracy - 
        Config.Golem.Projectiles.Salvo.MinAccuracy) /
        Config.Golem.Projectiles.Salvo.AccuracyDivisor;
    this.mCurrentAccuracy = Config.Golem.Projectiles.Salvo.MinAccuracy;
    this.mSpeedDelta =
        (Config.Golem.Projectiles.Salvo.MaxSpeed -
        Config.Golem.Projectiles.Salvo.MinSpeed) /
        Config.Golem.Projectiles.Salvo.SpeedDivisor;
    this.mCurrentSpeed = Config.Golem.Projectiles.Salvo.MinSpeed;
    
    // Setup the position & physics.
    this.mProjectile.setColor(Config.Golem.Projectiles.Salvo.Color);
    this.mProjectile.getXform().setPosition(
        this.mLaunchPos[0], 
        this.mLaunchPos[1]
    );
    this.mProjectile.getXform().setSize(
        Config.Golem.Projectiles.Salvo.Radius,
        Config.Golem.Projectiles.Salvo.Radius
    );
    var r = new RigidCircle(
        this.getXform(),
        Config.Golem.Projectiles.Salvo.Radius
    );
    r.setGravity(Config.Golem.Projectiles.Salvo.Physics.Gravity);
    r.setMass(Config.Golem.Projectiles.Salvo.Physics.Mass);
    r.setRestitution(Config.Golem.Projectiles.Salvo.Physics.Restitution);
    r.setFriction(Config.Golem.Projectiles.Salvo.Physics.Friction);
    this.setRigidBody(r);
}
gEngine.Core.inheritPrototype(GolemSalvoProjectile, GolemProjectile);

GolemSalvoProjectile.prototype._calcTargetPos = function (targetPos) {
    var offset = vec2.fromValues(0, 0);
    vec2.scaleAndAdd(
        offset, 
        targetPos, 
        Config.Golem.Projectiles.Salvo.TargetOffset,
        vec2.fromValues(Math.random(), 0)
    );
    
    return offset;
};

GolemSalvoProjectile.prototype._calcLaunchPos = function () {
    var pos = vec2.fromValues(0, 0);
    vec2.add(
        pos,
        Config.Golem.Projectiles.Salvo.LaunchOffset,
        this.mGolemLoc
    );
    
    return pos;
};

GolemSalvoProjectile.prototype._calcVertex = function () {
    var vertex = vec2.fromValues(0, 0);
    var distance = this.mGolemLoc[0] - this.mFinalTargetPos[0];
    if (this.mGolemLoc[0] > this.mFinalTargetPos[0]) {
        vec2.add(vertex, distance, vec2.fromValues(this.mFinalTargetPos[0], 0));
    } else {
        vec2.add(vertex, distance, vec2.fromValues(this.mGolemLoc[0], 0));
    }
    if (this.mGolemLoc[1] > this.mFinalTargetPos[1]) {
        vec2.add(vertex, Config.Golem.Projectiles.Salvo.TravelHeight, vec2.fromValues(0, this.mGolemLoc[1]));
    } else {
         vec2.add(vertex, Config.Golem.Projectiles.Salvo.TravelHeight, vec2.fromValues(0, this.mFinalTargetPos[1]));
    }
    return vertex;
};

GolemSalvoProjectile.prototype._calcLaunchDir = function (orientation) {
    var dir = Config.Golem.Projectiles.Salvo.DefaultFireDirection;
    dir[0] *= -orientation;
    vec2.normalize(dir, dir);
    return dir;
};

GolemSalvoProjectile.prototype.update = function () {
    if (this.mParticles !== null) {
        this.mParticles.updaate();
    }
    
    if (vec2.sqrDist(this.mVertexPos, this.getXform().getPosition()) <= 1) {
        this.mCurrentTargetPos = this.mFinalTargetPos;
    }
    
    if (vec2.sqrDist(this.mFinalTargetPos, this.getXform().getPosition()) <= 1) {
        this.mCurrentTargetPos = vec2.fromValues(this.mFinalTargetPos[0], -20);
    }
    
    this._chase(); 
};

GolemSalvoProjectile.prototype._chase = function () {
    if (this.mCurrentSpeed > Config.Golem.Projectiles.Salvo.MaxSpeed) {
        this.mCurrentSpeed = Config.Golem.Projectiles.Salvo.MaxSpeed;
    } else {
        this.mCurrentSpeed += this.mSpeedDelta;
    }
    
    if (this.mCurrentAccuracy > Config.Golem.Projectiles.Salvo.MaxAccuracy) {
        this.mCurrentAccuracy = Config.Golem.Projectiles.Salvo.MaxAccuracy;
    } else {
        this.mCurrentAccuracy += this.mAccuracyDelta;
    }
    
    this.mRigidBody.update();
    this._updateVelocity();
};

GolemSalvoProjectile.prototype._updateVelocity = function () {
    var currentDirection = this.getRigidBody().getVelocity();
    var targetDirection = vec2.fromValues(0, 0);
    vec2.subtract(targetDirection, this.mCurrentTargetPos, this.getRigidBody().getCenter());
    var currentAngleDiff = 
        Math.acos(
            vec2.dot(
                targetDirection, 
                currentDirection) / (
            vec2.length(
                targetDirection) * 
                vec2.length(currentDirection)));
        
    var crossResult = vec3.fromValues(0, 0, 0);
    vec2.cross(crossResult, targetDirection, currentDirection);
    var theta = -Math.sign(crossResult[2]) * currentAngleDiff * this.mCurrentAccuracy;
    
    var newDir = vec2.fromValues(0, 0);
    vec2.normalize(currentDirection, currentDirection);
    vec2.rotate(newDir, currentDirection, theta);
    this.getRigidBody().setVelocity(newDir[0] * this.mCurrentSpeed, newDir[1] * this.mCurrentSpeed);
};

GolemSalvoProjectile.prototype.userCollisionHandling = function (other) {
    return true;
};