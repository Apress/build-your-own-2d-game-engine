/* File: Golem_RangeAttacks.js 
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteAnimateRenderable, vec2, Arrow, Platform, Config, Golem, GolemBlastProjectile */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

/**
 * Update function for the projectile firing system. Selects
 * a specific update function based on the current state.
 * 
 * @returns {undefined}
 */
Golem.prototype._updateProjectileState = function () {
    switch (this.mCurrentProjectileState) {
        case Config.Golem.Projectiles.Homing:
            this._updateProjectileHoming();
            break;
        case Config.Golem.Projectiles.Blast:
            this._updateProjectileBlast();
            break;
        default:
            console.log("Golem._updateProjectileState called without Golem having a current projectile state.");
    }
};
/**
 * Update for the Blast projectile state. This is extremely straightforward.
 * Blast is a fire-and-forget projectile attack, so we just fire off the Blast
 * and exit our projectile state.
 * 
 * @returns {undefined}
 */
Golem.prototype._updateProjectileBlast = function () {
    this._fireBlast();
    this._exitProjectileState();
};

/**
 * Update for the Homing projectile state. This is also very straightforward.
 * A homing projectile is fire-and-foorget from the Golem's perspective.
 * 
 * @returns {undefined}
 */
Golem.prototype._updateProjectileHoming = function () {
    this._fireHoming();
    this._exitProjectileState();
};

/**
 * Sets the previousProjectileState to the current state, and then nulls
 * out the current state to indicate a projectile state is no longer active.
 * 
 * @returns {undefined}
 */
Golem.prototype._exitProjectileState = function () {
    this.mPreviousProjectileState = this.mCurrentProjectileState;
    this.mCurrentProjectileState = null;
};

/**
 * Fires a homing projectile towards the hero.
 * 
 * @returns {undefined}
 */
Golem.prototype._fireHoming = function () {
    this._fireProjectile(Config.Golem.Projectiles.Homing);
};

/**
 * Fires a projectile blast towards the hero.
 * 
 * @returns {undefined}
 */
Golem.prototype._fireBlast = function () {
    this._fireProjectile(Config.Golem.Projectiles.Blast);
};

/**
 * Fires a single projectile defined by the Config_Golem file and 
 * chosen by the type parameter.
 * 
 * @param {Config.Golem.Projectile} type    Type of projectile to fire.
 * @returns {undefined}
 */
Golem.prototype._fireProjectile = function (type) {
    var newProjectile = null;
    switch(type) {
        case Config.Golem.Projectiles.Homing:
            newProjectile = new GolemHomingProjectile(
                Config.BossBattle.Textures.BossHomingProjectileSprite,
                this.mGolem,
                this.mHero,
                this.mHomingProjectileLight
            );
            break;
        case Config.Golem.Projectiles.Blast:
            newProjectile = new GolemBlastProjectile(
                Config.BossBattle.Textures.BossProjectileSprite,
                this.mGolem,
                this.mHero,
                this.mBlastProjectileLight
            );
            break;
        default:
            console.log('invalid projectile type');
            break;
    }
    
    // If a projectile was successfully created, add it to the appropriate
    // GameObject sets.
    if (newProjectile !== null) {
        if (newProjectile.getRigidBody() === null) {
            this.mNonPhysicsSetRef.addToSet(newProjectile);
        } else {
            gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, newProjectile);
        }
        this.mTimeLastProjectileFired = Date.now();
    }
};