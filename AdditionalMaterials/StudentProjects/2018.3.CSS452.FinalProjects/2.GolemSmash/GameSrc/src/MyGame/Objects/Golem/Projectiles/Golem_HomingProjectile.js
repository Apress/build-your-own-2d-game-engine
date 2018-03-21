/* File: Golem_BlastProjectile.js 
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteAnimateRenderable, vec2, Arrow, Platform, Config, Golem,
 *  , GolemProjectile, Hero, Light, IceArrow*/
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

/**
 * Constructor for the GolemHomingProjectile. This is just a medium
 * sized circle that spins above the Golem's head, and then chases
 * the Hero. An Ice Arrow can be used to neutralize the projectile,
 * otherwiise it will hit the hero for BIG damage.
 * 
 * @param {String}  sprite  Path to the projectile sprite.
 * @param {Golem}   golem   Reference to the Golem object.
 * @param {Hero}    hero    Reference to the Hero object.
 * @param {Light}   light   Light to make the circle glow.
 * @returns {GolemHomingProjectile}
 */
function GolemHomingProjectile(sprite, golem, hero, light) {
    // Tracker to see if the projectile has touched the hero yet. It can only
    // touch a single time. Once this is set to true, the projectile becomes
    // harmless.
    this.mTouchedHero = false;
    
    // Save our references to the Hero and Golem.
    this.mHero = hero;
    this.mGolem = golem;
    
    // Track how long the projectile has been active.
    this.mFramesSinceCreated = 0;
    
    // Calculate the rate of change for the radius during the windup period.
    this.mRadiusDelta = (Config.Golem.Projectiles.Homing.EndRadius - Config.Golem.Projectiles.Homing.StartRadius) / Config.Golem.Projectiles.Homing.WindupTime;
   
    // This tracks how much we rotate the circle on each update. This value is
    // incremented by itself on each update, thereby mimicing a windup process.
    this.mRotationDelta = 0;
    
    // A vector that points from the Golem to the Hero at the time the projectile
    // is stunned, or after the projectile hits the hero. This vector is used as 
    // the displacement for the projectile at each update, and is scaled each time 
    // to increase the displacement per update.
    this.mFinalTargetVector = null;
    
    // Power of the projectile firing. This is scaled by the power delta on each
    // update in the Chasing state, but reset when the projectile is stunned.
    this.mPower = vec2.clone(Config.Golem.Projectiles.Homing.BasePower);
    
    // This is the amount the magnitude of the final target vector changes with
    // each update.
    this.mPowerDelta = Config.Golem.Projectiles.Homing.PowerDelta;
    
    // The base damage of the projectile.
    this.mBaseDamage = Config.Golem.Projectiles.Homing.BaseDamage;
    
    // Create the renderable.
    this.mProjectile = new TextureRenderable(sprite);
    this.mProjectile.setColor(Config.Golem.Projectiles.Homing.Color);
    this.mProjectile.getXform().setPosition(
        this.mGolem.getXform().getXPos(), 
        this.mGolem.getXform().getYPos()
    );
    this.mProjectile.getXform().setSize(
        Config.Golem.Projectiles.Homing.StartRadius,
        Config.Golem.Projectiles.Homing.StartRadius
    );   
    GolemProjectile.call(this, this.mProjectile);
    
    // Add a RigidCircle for cheap collision detection.
    var r = new RigidCircle(
        this.getXform(),
        this.getXform().getWidth()
    );
    r.setMass(Config.Golem.Projectiles.Homing.Physics.Mass);
    r.setRestitution(Config.Golem.Projectiles.Homing.Physics.Restitution);
    r.setFriction(Config.Golem.Projectiles.Homing.Physics.Friction);
    this.setRigidBody(r);
    
    // Our light to make the circle glow.
    this.mLight = light;
    this._setupLight();
    
    // Track current state.
    this.mCurrentState = Config.Golem.Projectiles.Homing.States.Windup;
    this.mStunnedStateTimer = null;
}
gEngine.Core.inheritPrototype(GolemHomingProjectile, GolemProjectile);

GolemHomingProjectile.prototype.update = function () {
    switch (this.mCurrentState) {
        case Config.Golem.Projectiles.Homing.States.Windup:
            this._updateWindup();
            break;
        case Config.Golem.Projectiles.Homing.States.Chasing:
            this._updateChasing();
            break;
        case Config.Golem.Projectiles.Homing.States.Stunned:
            this._updateStunned();
            break;
        case Config.Golem.Projectiles.Homing.States.Linear:
            this._updateLinear();
            break;
    }
    
    var projectileXform = this.mProjectile.getXform();
    
    // Keep the light centered on the projectile.
    this.mLight.setXPos(projectileXform.getXPos());
    this.mLight.setYPos(projectileXform.getYPos());
 
    // This checks if the projectile has left the user's possible field of vision
    // before setting it to expire.
    // instead of hard-coded, but whatever.
    if (projectileXform.getXPos() < Config.Golem.Projectiles.Blast.KillRange.Left ||
        projectileXform.getXPos() > Config.Golem.Projectiles.Blast.KillRange.Right || 
        projectileXform.getYPos() < Config.Golem.Projectiles.Blast.KillRange.Bottom ||
        projectileXform.getYPos() > Config.Golem.Projectiles.Blast.KillRange.Top) {
        this.setExpired(true);
    }
};

/**
 * Updates the windup state for the projectile. Consists of spinning, staying
 * above the Golem, and increasing in size.
 * 
 * @returns {undefined}
 */
GolemHomingProjectile.prototype._updateWindup = function () {
    // Grab references to the projectile & golem xforms to clean the code up later.
    var projectileXform = this.mProjectile.getXform();
    var golemXform = this.mGolem.getXform();
    
    // Keep the position relative to the golem constant.
    projectileXform.setPosition(
        golemXform.getXPos(), 
        golemXform.getYPos() + Config.Golem.Projectiles.Homing.YOffset
    );
    
    // As long as we still have room to grow, increase the size by the calculated
    // rate of change.
    if (projectileXform.getWidth() < Config.Golem.Projectiles.Homing.EndRadius) {  
        projectileXform.setSize(
            projectileXform.getWidth() + this.mRadiusDelta,
            projectileXform.getWidth() + this.mRadiusDelta
        );
    }
    
    // Also update the radius of the rigidbody because, for some reason, it doesn't
    // scale with the renderables size.1
    this.getRigidBody().setRadius(projectileXform.getWidth() / 2);
    
    // Since we're in the windup phase, we increment the rotation rate of change
    // at each update.
    this.mRotationDelta += Config.Golem.Projectiles.Homing.RotationDelta;
    
    // Update the range of the light.
    this.mLight.setFar(projectileXform.getWidth());

    // Rotate the circle.
    projectileXform.incRotationByDegree(this.mRotationDelta);

    // Keep track of how many updates we've done in this phase.
    this.mFramesSinceCreated++;
    
    if (this.mFramesSinceCreated >= Config.Golem.Projectiles.Homing.WindupTime) {
        this.mCurrentState = Config.Golem.Projectiles.Homing.States.Chasing;
    }
};

/**
 * Update the chase state of the projectile. Basically just hone in the Hero.
 * 
 * @returns {undefined}
 */
GolemHomingProjectile.prototype._updateChasing = function () {
    // Grab references to the projectile & golem xforms to clean the code up later.
    var projectileXform = this.mProjectile.getXform();
    var heroXform = this.mHero.getXform();
    
    this.mFinalTargetVector = vec2.fromValues(0, 0);
    vec2.subtract(this.mFinalTargetVector, heroXform.getPosition(), projectileXform.getPosition());
    vec2.normalize(this.mFinalTargetVector, this.mFinalTargetVector);
    vec2.multiply(this.mFinalTargetVector, this.mFinalTargetVector, this.mPower);
    vec2.multiply(this.mPower, this.mPower, this.mPowerDelta);
    projectileXform.incXPosBy(this.mFinalTargetVector[0]);
    projectileXform.incYPosBy(this.mFinalTargetVector[1]);
    
    // Rotate the circle.
    projectileXform.incRotationByDegree(this.mRotationDelta);
    
    // If we get close enough to the hero, switch to linear movement so the 
    // projectile keeps traveling.
    if (vec2.distance(heroXform.getPosition(), projectileXform.getPosition()) < 10) {
        this.mCurrentState = Config.Golem.Projectiles.Homing.States.Linear;
    } 
};

/**
 * Update the stunned state of the projectile. Basically do nothing but check
 * if the stun is expired.
 * 
 * @returns {undefined}
 */
GolemHomingProjectile.prototype._updateStunned = function () {
    this.mStunnedStateTimer++;

    if (this.mStunnedStateTimer > this.mTimeToBeStunned) {
        this.mCurrentState = Config.Golem.Projectiles.Homing.States.Linear;
    }  
};

/**
 * Update the Lineaar state of the projectile. Just move in a straight line.
 * 
 * @returns {undefined}
 */
GolemHomingProjectile.prototype._updateLinear = function () {
    // Make sure the this.mFinalTargetVector is set.
    this._calcFinalTargetVector();
    
    // Grab references to the projectile & golem xforms to clean the code up later.
    var projectileXform = this.mProjectile.getXform();
    
    vec2.multiply(this.mFinalTargetVector, this.mFinalTargetVector, this.mPowerDelta);
    projectileXform.incXPosBy(this.mFinalTargetVector[0]);
    projectileXform.incYPosBy(this.mFinalTargetVector[1]);
    
    // Rotate the circle.
    projectileXform.incRotationByDegree(this.mRotationDelta);
};

/**
 * 
 * @param {GameObject} obj
 * @returns {Boolean}
 */
GolemHomingProjectile.prototype.userCollisionHandling = function (obj) {
    // Special interactions with the hero.
    if (obj instanceof Hero && 
        this.mTouchedHero === false) {
        // Set mTouchedHero to true so we'll only ever hit the hero once with each
        // projectile. Also trigger the hit event for the hero.
        this.mTouchedHero = true;
        this.mHero.hit(this.mBaseDamage);
        this.mCurrentState = Config.Golem.Projectiles.Homing.States.Linear;
    }
    
    // IceArrows can stun the projectile, but they require that it has at least
    // started to chase the hero first.
    if (obj instanceof IceArrow &&
        this.mCurrentState === Config.Golem.Projectiles.Homing.States.Chasing) {
        this.mCurrentState = Config.Golem.Projectiles.Homing.States.Stunned;
        this.mStunnedStateTimer = 0;
        this.mTimeToBeStunned = obj.getEffectDuration();
    }
    
    // Always skip the collision handling of the Physics engine.
    return true;
};

/**
 * Call at the start of Lienar state to be safe.
 * 
 * @returns {undefined}
 */
GolemHomingProjectile.prototype._calcFinalTargetVector = function () {
    if (this.mFinalTargetVector === null) {
         var projectileXform = this.mProjectile.getXform();
        var heroXform = this.mHero.getXform();

        this.mFinalTargetVector = vec2.fromValues(0, 0);
        vec2.subtract(this.mFinalTargetVector, heroXform.getPosition(), projectileXform.getPosition());
        vec2.normalize(this.mFinalTargetVector, this.mFinalTargetVector);
        vec2.multiply(this.mFinalTargetVector, this.mFinalTargetVector, this.mPower);
    }
};

GolemHomingProjectile.prototype._setupLight = function () {
    this.mLight.setLightType(Light.eLightType.ePointLight);
    this.mLight.setColor(Config.Golem.Projectiles.Homing.Light.Color);
    this.mLight.setXPos(this.mProjectile.getXform().getXPos());
    this.mLight.setYPos(this.mProjectile.getXform().getYPos());
    this.mLight.setZPos(Config.Golem.Projectiles.Homing.Light.ZPosition);
    this.mLight.setDirection(Config.Golem.Projectiles.Homing.Light.Direction);
    this.mLight.setNear(Config.Golem.Projectiles.Homing.Light.Near);
    this.mLight.setFar(Config.Golem.Projectiles.Homing.Light.StartFar);
    this.mLight.setInner(Config.Golem.Projectiles.Homing.Light.Inner);
    this.mLight.setOuter(Config.Golem.Projectiles.Homing.Light.Outer);
    this.mLight.setIntensity(Config.Golem.Projectiles.Homing.Light.Intensity);
    this.mLight.setDropOff(Config.Golem.Projectiles.Homing.Light.DropOff);
    this.mLight.setLightCastShadowTo(false);
    this.mLight.setLightTo(true);
};

