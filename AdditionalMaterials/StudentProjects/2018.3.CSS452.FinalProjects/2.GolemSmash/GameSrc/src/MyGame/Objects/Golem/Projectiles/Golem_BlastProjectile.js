/* File: Golem_BlastProjectile.js 
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteAnimateRenderable, vec2, Arrow, Platform, Config, Golem,
 *  , GolemProjectile, Hero, Light*/
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

/**
 * Constructor for the GolemBlastProjectile. This is essentially just a big
 * circle that spawns beneath the golem, expands & spins for awhile, and then
 * is launched at the hero.
 * 
 * @param {String} sprite   Path to the projectile sprite.
 * @param {Golem}  golem    Reference to the Golem object.
 * @param {Hero}   hero     Reference to the Hero object.
 * @param {Light}  light    Light to make the circle glow.
 * @returns {GolemBlastProjectile}
 */
function GolemBlastProjectile(sprite, golem, hero, light) {
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
    this.mRadiusDelta = (Config.Golem.Projectiles.Blast.EndRadius - Config.Golem.Projectiles.Blast.StartRadius) / Config.Golem.Projectiles.Blast.WindupTime;
   
    // This tracks how much we rotate the circle on each update. This value is
    // incremented by itself on each update, thereby mimicing a windup process.
    this.mRotationDelta = 0;
    
    // A vector that points from the Golem to the Hero at the time the projectile
    // is fired. This vector is used as the displacement for the projectile at each
    // update, and is scaled each time to increase the displacement per update.
    this.mFinalTargetVector = null;
    
    // Base power of the projectile firing. Once the direction is determined,
    // the final target vector is multiplied by this consntant to determine
    // the initial rate of change.
    this.mBasePower = Config.Golem.Projectiles.Blast.BasePower;
    
    // This is the amount the magnitude of the final target vector changes with
    // each update.
    this.mPowerDelta = Config.Golem.Projectiles.Blast.PowerDelta;
    
    // The base damage of the projectile.
    this.mBaseDamage = Config.Golem.Projectiles.Blast.BaseDamage;
    
    // Create the renderable.
    this.mProjectile = new TextureRenderable(sprite);
    this.mProjectile.setColor(Config.Golem.Projectiles.Blast.Color);
    this.mProjectile.getXform().setPosition(
        this.mGolem.getXform().getXPos(), 
        this.mGolem.getXform().getYPos()
    );
    this.mProjectile.getXform().setSize(
        Config.Golem.Projectiles.Blast.StartRadius,
        Config.Golem.Projectiles.Blast.StartRadius
    );   
    GolemProjectile.call(this, this.mProjectile);
    
    // Add a RigidCircle for cheap collision detection.
    var r = new RigidCircle(
        this.getXform(),
        this.getXform().getWidth()
    );
    r.setMass(Config.Golem.Projectiles.Blast.Physics.Mass);
    r.setRestitution(Config.Golem.Projectiles.Blast.Physics.Restitution);
    r.setFriction(Config.Golem.Projectiles.Blast.Physics.Friction);
    this.setRigidBody(r);
    
    // Our light to make the circle glow.
    this.mLight = light;
    this._setupLight();
}
gEngine.Core.inheritPrototype(GolemBlastProjectile, GolemProjectile);

/**
 * Update function for the projectile.
 * 
 * @returns {undefined}
 */
GolemBlastProjectile.prototype.update = function () {
    // Grab references to the projectile & golem xforms to clean the code up later.
    var projectileXform = this.mProjectile.getXform();
    var golemXform = this.mGolem.getXform();
    
    // This is the "Windup" section for the projectile.
    if (this.mFramesSinceCreated < Config.Golem.Projectiles.Blast.WindupTime) {
        // Keep the position relative to the golem constant.
        projectileXform.setPosition(
            golemXform.getXPos(), 
            golemXform.getYPos() + Config.Golem.Projectiles.Blast.YOffset
        );

        // As long as we still have room to grow, increase the size by the calculated
        // rate of change.
        if (projectileXform.getWidth() < Config.Golem.Projectiles.Blast.EndRadius) {  
            projectileXform.setSize(
                projectileXform.getWidth() + this.mRadiusDelta,
                projectileXform.getWidth() + this.mRadiusDelta
            );
        }
        // Also update the radius of the rigidbody because, for some reason, it doesn't
        // scale with the renderables size.
        this.getRigidBody().setRadius(projectileXform.getWidth() / 2);
        
        // Since we're in the windup phase, we increment the rotation rate of change
        // at each update.
        this.mRotationDelta += Config.Golem.Projectiles.Blast.RotationDelta;
        
        // Update the range of the light.
        this.mLight.setFar(projectileXform.getWidth());
        
        // Keep track of how many updates we've done in this phase.
        this.mFramesSinceCreated++;
    }
    // Windup is over now, but we only want to set the final target vector once,
    // so check if it's null before doing anything with it.
    else if (this.mFinalTargetVector === null) {
        this.mFinalTargetVector = vec2.fromValues(0, 0);
        vec2.subtract(this.mFinalTargetVector, this.mHero.getXform().getPosition(), projectileXform.getPosition());
        vec2.normalize(this.mFinalTargetVector, this.mFinalTargetVector);
        vec2.multiply(this.mFinalTargetVector, this.mFinalTargetVector, this.mBasePower);
    }
    
    // We always want to rotate the circle.
    projectileXform.incRotationByDegree(this.mRotationDelta);
    
    // If we've gotten to the point where the final target vector is set, scale it
    // by its rate of change and increment the X/Y positions
    if (this.mFinalTargetVector !== null) {
        vec2.multiply(this.mFinalTargetVector, this.mFinalTargetVector, this.mPowerDelta);
        projectileXform.incXPosBy(this.mFinalTargetVector[0]);
        projectileXform.incYPosBy(this.mFinalTargetVector[1]);
    }
    
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
 * Allows for user defined interactions between (this) and the parameter object.
 * Returning true skips the default Physics engine's handling of the collision.
 * 
 * We have special interaction with the hero, but beyond that we want this to
 * skip any normal collision handling behavior.
 * 
 * @param {GameObject} obj
 * @returns {Boolean}
 */
GolemBlastProjectile.prototype.userCollisionHandling = function (obj) {
    // Special interactions with the hero.
    if (obj instanceof Hero && this.mTouchedHero === false) {
        // Set mTouchedHero to true so we'll only ever hit the hero once with each
        // projectile. Also trigger the hit event for the hero.
        this.mTouchedHero = true;
        this.mHero.hit(this.mBaseDamage);
    }
    
    // Always skip the collision handling of the Physics engine.
    return true;
};

/**
 * Sets up the light for this projectile.
 *
 * @returns {undefined}
 */
GolemBlastProjectile.prototype._setupLight = function () {
    this.mLight.setLightType(Light.eLightType.ePointLight);
    this.mLight.setColor(Config.Golem.Projectiles.Blast.Light.Color);
    this.mLight.setXPos(this.mProjectile.getXform().getXPos());
    this.mLight.setYPos(this.mProjectile.getXform().getYPos());
    this.mLight.setZPos(Config.Golem.Projectiles.Blast.Light.ZPosition);
    this.mLight.setDirection(Config.Golem.Projectiles.Blast.Light.Direction);
    this.mLight.setNear(Config.Golem.Projectiles.Blast.Light.Near);
    this.mLight.setFar(Config.Golem.Projectiles.Blast.Light.StartFar);
    this.mLight.setInner(Config.Golem.Projectiles.Blast.Light.Inner);
    this.mLight.setOuter(Config.Golem.Projectiles.Blast.Light.Outer);
    this.mLight.setIntensity(Config.Golem.Projectiles.Blast.Light.Intensity);
    this.mLight.setDropOff(Config.Golem.Projectiles.Blast.Light.DropOff);
    this.mLight.setLightCastShadowTo(false);
    this.mLight.setLightTo(true);
};