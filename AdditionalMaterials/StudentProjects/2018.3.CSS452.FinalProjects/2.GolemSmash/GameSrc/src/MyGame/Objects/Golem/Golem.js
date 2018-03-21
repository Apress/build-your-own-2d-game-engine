/* File: Golem.js 
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, vec2, Arrow, Platform, Config,
 *       RigidSet, Interpolate */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

/**
 * Constructor for the Golem object.
 * 
 * @param {String}          sprite                          Path to the sprite.
 * @param {Hero}            heroRef                         Reference to the hero the boss interacts with.
 * @param {GameObjectSet}   physicsGameObjectArrayRef       Reference to the set of physics GameObjects.
 * @param {GameObjectSet}   nonPhysicsGameObjectArrayRef    Reference to the set of non-physics GameObjects.
 * @param {Light}           blastProjectileLight            Light for the blast projectile.
 * @param {Light}           homingProjectileLight           Light for the homing projectile.
 * @param {Boolean}         hardMode                        Whether or not hard mdoe is enabled.
 * @returns {Golem}
 */
function Golem(sprite, heroRef, physicsGameObjectArrayRef, nonPhysicsGameObjectArrayRef, blastProjectileLight, homingProjectileLight, hardMode) {
    // Save the reference to the game object sets.
    this.mPhysicsSetRef     = physicsGameObjectArrayRef;
    this.mNonPhysicsSetRef  = nonPhysicsGameObjectArrayRef;
    
    // Save a reference to the hero.
    this.mHero = heroRef;
    
    // References to torches.
    this.mTorches = [];
    
    // Reference to the light used by BlastProjectiles.
    this.mBlastProjectileLight = blastProjectileLight;
    this.mBlastProjectileLight.setLightTo(false);
    
    // Reference to the light used by the HomingProjectiles.
    this.mHomingProjectileLight = homingProjectileLight;
    this.mHomingProjectileLight.setLightTo(false);
    
    // Setup the renderable
    this.mGolem = new IllumRenderable(Config.BossBattle.Textures.BossSprite, Config.BossBattle.Textures.BossNormal);
    this.mGolem.setColor(Config.Golem.Properties.Color);
    this.mGolem.getXform().setPosition(
        Config.BossBattle.Boss.SpawnPosition.X,
        Config.BossBattle.Boss.SpawnPosition.Y
    );
    this.mGolem.getXform().setSize(
        Config.BossBattle.Boss.Size.Width,
        Config.BossBattle.Boss.Size.Height
    );
    GameObject.call(this, this.mGolem);
    
    // We want to initialize the Golem as invisible, as it hasn't spawned in yet.
    this.setVisibility(false);
    
    // Interpolation
    this.mCenterX = new Interpolate(
        this.mGolem.getXform().getXPos(),
        Config.Golem.Properties.Interpolation.DefaultStiffness,
        Config.Golem.Properties.Interpolation.DefaultDuration
    );
    this.mCenterY = new Interpolate(
        this.mGolem.getXform().getYPos(),
        Config.Golem.Properties.Interpolation.DefaultStiffness,
        Config.Golem.Properties.Interpolation.DefaultDuration
    );
    
    // Physics
    this.mRigidSet = new RigidSet();
    this._buildRigidbodies();
    this.mFacing = Config.Golem.States.FacingLeft;
    
    // HP
    this.mMaxHP      = Config.Golem.Properties.StartingHP;
    this.mCurrentHP  = this.mMaxHP;
    this.mTorchBoost = 1.0;
    
    // State handling
    this.mCurrentState            = Config.Golem.States.WaitingToSpawn;
    this.mPreviousState           = null;
    this.mCurrentStateInitialized = false;
    this.mIgnoreCollision         = false;
    this.mCurrentProjectileState  = null;
    this.mPreviousProjectileState = null;
    
    // Time tracking
    this.mStateStartTime          = null;
    this.mMiscTracker             = null;
    this.mTimeLastProjectileFired = null;
    
    // Stunned
    this.mStunned           = false;
    this.mStunTimeRemaining = 0;
    this.mInterrupt         = false;
    
    // Animation
    this.mCurrentRigidbodyAnimationSequenceReference = null;
    this.mCurrentSmashAttackHit                      = false;
    
    // Track if hardmode is switched on.
    this.mHardMode = hardMode;
}
gEngine.Core.inheritPrototype(Golem, GameObject);

/**
 * Draws calls the default draw function for a GameObject & the RigidSet.
 * 
 * @param {Camera} aCamera
 * @returns {undefined}
 */
Golem.prototype.draw = function (aCamera) {
    GameObject.prototype.draw.call(this, aCamera);
    this.mRigidSet.draw(aCamera);
};

/**
 * Golem's update effectively is just a function that calls the appropriate
 * update functions for each object owned by the Golem.
 * 
 * @returns {undefined}
 */
Golem.prototype.update = function () {
    // Our "stun" mechanic effectively just skips updates for the Golem while it's
    // active.
    if (this.mStunned === false) {
        this.updateState();
        this.calculateTorchBoost();
        this.mRigidBody.update();
        this.mRigidSet.update();
        this.updateRigidbodyAnimations();
    } else {
        this.updateStun();
    }
};

/**
 * Fucntion to allow any object with a reference to the golem to cause damage
 * to the golem equal to the parameter, modified by the Torch boost.
 * 
 * @param {float} damage
 * @returns {undefined}
 */
Golem.prototype.hit = function (damage) {    
    this.mCurrentHP -= (damage * this.mTorchBoost);
};

/**
 * Adds a Torch reference to the set mTorches set. These references are
 * used once each update to calculate what the current boost is.
 * 
 * @param {Torch} torch
 * @returns {undefined}
 */
Golem.prototype.addTorchRef = function (torch) {
    this.mTorches.push(torch);
};

/**
 * Calculates the torch boost by iterating through the torch set. and
 * adding it to the base boost value of 1.0.
 * 
 * @returns {undefined}
 */
Golem.prototype.calculateTorchBoost = function () {
    this.mTorchBoost = 1.0;
    for (var i = 0; i < this.mTorches.length; i++) {
        this.mTorchBoost += this.mTorches[i].getBoost();
    }
};

/**
 * Updates the interpolation. This keeps the code cleaner in each state.
 * 
 * @returns {undefined}
 */
Golem.prototype.interpolate = function () {
    this.mCenterX.updateInterpolation();
    this.mCenterY.updateInterpolation();
    this.mGolem.getXform().setXPos(this.mCenterX.getValue());
    this.mGolem.getXform().setYPos(this.mCenterY.getValue());
};

/**
 * Returns the current state of the Golem.
 * 
 * @returns {Config.Golem.States}
 */
Golem.prototype.getCurrentState = function () {
    return this.mCurrentState;
};

/**
 * This function handles the behavior of the Golem smashing the hero. It is
 * called from the userHandlesCollision function of GolemEmptyGameObject so the
 * logic of the collision is kept here in the Golem class.
 * 
 * @param {GolemEmptyGameObject} bodyPart   The blank GameObject containing the Rigidbody
 *                                          that collided with the hero.
 * @returns {undefined}
 */
Golem.prototype.triggerSmashEvent = function (bodyPart) {
    // The smash can only hit one time, or it would instakill the Hero.
    if (this.mCurrentSmashAttackHit === true) {
        return;
    }
    
    // Since it hasn't hit yet, flip that toggle.
    this.mCurrentSmashAttackHit = true;
    
    // Do the appropriate damage to the hero.
    this.mHero.hit(Config.Golem.Properties.SmashDamage);
    
    // Determine the knockback velocity for the collision.
    var velocity = Config.Golem.Properties.SmashVelocity;
    if (bodyPart.getXform().getYPos() > this.mHero.getXform().getYPos()) {
        velocity[1] *= -1;
    }
    if (bodyPart.getXform().getXPos() < this.mHero.getXform().getXPos()) {
        velocity[0] *= -1;
    }
    this.mHero.getRigidBody().setVelocity(velocity[0], velocity[1]);
    
    // Shake the camera.
    
};