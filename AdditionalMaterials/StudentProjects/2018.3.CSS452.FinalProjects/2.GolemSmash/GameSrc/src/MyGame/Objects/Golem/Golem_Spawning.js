/* File: Golem_Spawning.js 
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteAnimateRenderable, vec2, Arrow, Platform, Config, Golem */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

/**
 * Update function for the "waiting to spawn" state.
 * 
 * @returns {undefined}
 */
Golem.prototype._serviceWaitingToSpawn = function () {
    // Initialize state.
    if (this.mCurrentStateInitialized === false) {
        // If the boss isn't spawned in we definitely don't want the
        // rigidbodies colliding with anything.
        if (this.mIgnoreCollision === false) {
            this.ignoreCollision();
            this.mIgnoreCollision = true;
        }
        
        this.setVisibility(false);
        this.mStateStartTime = Date.now();
        this.mCurrentStateInitialized = true;
    }
    
    // If the hero approaches the spawn location or an amount of time passes we
    // spawn the boss.
    if (vec2.distance(
            this.getXform().getPosition(), 
            this.mHero.getXform().getPosition()
        ) < Config.BossBattle.Boss.SpawnDistance || 
        Date.now() >= this.mStateStartTime + Config.BossBattle.Boss.MaxTimeBeforeSpawn) {
        this.mCurrentState = Config.Golem.States.Spawning;
        this.mCurrentStateInitialized = false;
    }
};

/**
 * Update function for the Spawning state.
 * 
 * @returns {undefined}
 */
Golem.prototype._serviceSpawning = function () {
    // Initialize state.
    if (this.mCurrentStateInitialized === false) {
        // Don't want collisions as we spawn in.
        if (this.mIgnoreCollision === false) {
            this.ignoreCollision();
            this.mIgnoreCollision = true;
        }
        
        // Technically unnecessary for our game. However, there is no guarantee
        // in practice that Golem couldn't spawn multiple times, so resetting
        // the base properties when this state is initialized is not a bad idea.
        this.mGolem.setColor(Config.Golem.Properties.Color);
        this.mGolem.getXform().setPosition(
            Config.BossBattle.Boss.SpawnPosition.X,
            Config.BossBattle.Boss.SpawnPosition.Y
        );
        this.mGolem.getXform().setSize(
            Config.BossBattle.Boss.Size.Width,
            Config.BossBattle.Boss.Size.Height
        );
        this.setVisibility(true);
        this._animate(Config.Golem.Animations.Spawn, true);
        this.mStateStartTime = Date.now();
        this.mCurrentStateInitialized = true;
    }
    
    // When spawning is complete we transition to the idle state.
    if (this._animationComplete()) {
        this.mMaxHP = Config.Golem.Properties.StartingHP;
        this.mCurrentHP = this.mMaxHP;
        this.mCurrentState = Config.Golem.States.Idle;
        this.mCurrentStateInitialized = false;
    }
    
    this.mGolem.updateAnimation();
};