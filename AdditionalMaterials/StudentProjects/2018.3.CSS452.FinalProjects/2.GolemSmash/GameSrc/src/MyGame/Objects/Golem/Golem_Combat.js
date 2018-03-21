/* File: Golem_Combat.js 
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteAnimateRenderable, vec2, Arrow, Platform, Config, Golem */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

/**
 * The update function for the Golem's idle state. This is a state the Golem enters
 * after its spawning animation is completed, but before it begins patrolling. The
 * idea is to give the player a brief moment before the boss starts attacking them.
 * In theory, this state could also be transitioned to a sort of "cooldown" state,
 * but we don't currently use it as so.
 * 
 * @returns {undefined}
 */
Golem.prototype._serviceIdle = function () {
    // Initialize state.
    if (this.mCurrentStateInitialized === false) {
        // We want collisions if the boss is idle
        if (this.mIgnoreCollision === true) {
            this.allowCollision();
            this.mIgnoreCollision = false;
        }
        
        this.setVisibility(true);
        this._animate(Config.Golem.Animations.Idle, true);
        this.mStateStartTime = Date.now();
        this.mMiscTracker = Date.now();
        this.mCurrentStateInitialized = true;
    } 
    
    // This state has no actual behavior or interaction, so we move directly to
    // the transitioning phase.
    if (this.mCurrentHP <= 0) {
        // If the Golem's HP has hit 0, it obviously needs to die.
        this.switchToState(Config.Golem.States.Dying);
    } else if (this.mCurrentHP < this.mMaxHP || 
        Date.now() >= this.mStateStartTime + Config.BossBattle.Boss.MaxTimeIdle) {
        // This condition will transition the Golem from Idle to Patrolling after
        // a time period, defined in Config_BossBattle, passes.
        this.switchToState(Config.Golem.States.Patrolling);
    }

    // The idle state is animated, so we do want to update that animation.
    this.mGolem.updateAnimation();
};

/**
 * The update function for the Patrolling state. This is the "main" state
 * the boss will find itself in. While Patrolling, the boss will move around,
 * keeping within a certain distance of the Hero, and periodically fire off
 * projectile attacks. Also, if the Hero gets close enough, it will transition
 * to the Smashing state.
 * 
 * @returns {undefined}
 */
Golem.prototype._servicePatrolling = function () {
    // Initialize state.
    if (this.mCurrentStateInitialized === false) {
        // We want collisions if the boss is idle
        if (this.mIgnoreCollision === true) {
            this.allowCollision();
            this.mIgnoreCollision = false;
        }
        
        this.setVisibility(true);
        this._animate(Config.Golem.Animations.Idle, true);
        this.mCenterX.configInterpolation(
            Config.Golem.States.Patrolling.Interpolation.Stiffness,
            Config.Golem.States.Patrolling.Interpolation.Duration
        );
        this.mCenterY.configInterpolation(
            Config.Golem.States.Patrolling.Interpolation.Stiffness,
            Config.Golem.States.Patrolling.Interpolation.Duration
        );
        this.mStateStartTime = Date.now();
        this.mMiscTracker = Date.now();
        this.xOffset = Config.Golem.States.Patrolling.Interpolation.XOffset;
        this.yOffset = Config.Golem.States.Patrolling.Interpolation.YOffset;
        this.mCurrentStateInitialized = true;
    }
    
    // Get refernces to the Golem and Hero xforms to reduce code clutter later on.
    var golemXform = this.mGolem.getXform();
    var heroXform = this.mHero.getXform();
    
    // We have a misc tracker that, for this state, is used to keep track of when
    // the Golem last switched directions. This direction-changing interval is
    // randomized from a base value provided in the Config_Golem file. This does
    // not actually change the movement speed of the Gole, only its movement
    // direction.
    if (Date.now() >= this.mMiscTracker + Config.Golem.States.Patrolling.Interpolation.Interval * Math.random()) {
        // Reset the tracker for the next direction change.
        this.mMiscTracker = Date.now();
        
        // We currently have a 50% chance of changing directions, which is not
        // listed in our Config files. If we ever need a more in-depth determination
        // process this will be easy to fix, but for now these values will do the trick.
        if (Math.random() > 0.5) {
            this.yOffset *= -1;
        }
        if (Math.random() > 0.5) {
            this.xOffset *= -1;
        }
    }
    
    // X-position is only adjusted if the hero exceeds the maximum chase distance, as the boss does not TRY to
    // get into melee range.
    if (golemXform.getXPos() - heroXform.getXPos() >= Config.Golem.States.Patrolling.MaxNonChaseXDistance) {
        this.xOffset = Math.abs(golemXform.getXPos() - heroXform.getXPos()) - Config.Golem.States.Patrolling.MaxNonChaseXDistance;
        this.xOffset *= -1;
    }
    if (heroXform.getXPos() - golemXform.getXPos() >= Config.Golem.States.Patrolling.MaxNonChaseXDistance) {
        this.xOffset = Math.abs(golemXform.getXPos() - heroXform.getXPos()) - Config.Golem.States.Patrolling.MaxNonChaseXDistance;        
    }
    
    
    // Y-position is adjusted randomly based on a random chance scale by the current
    // ratio of the hero & golem's y-positions. This means the golem is more likely to
    // move towards the hero's y-position. Currently has some erratic behavior at the
    // extreme ends of the range of y positions for the golem, will try to look into
    // that eventually.
    if (heroXform.getYPos() > golemXform.getYPos() && 
        Math.random() < Config.Golem.States.Patrolling.ChanceToChaseHeroYPos * Math.abs(heroXform.getYPos() / golemXform.getYPos()) &&
        this.yOffset <= 0) {
        this.yOffset *= -1;
    }
    if (heroXform.getYPos() < golemXform.getYPos() && 
        Math.random() < Config.Golem.States.Patrolling.ChanceToChaseHeroYPos * Math.abs(golemXform.getYPos() / heroXform.getYPos()) &&
        this.yOffset >= 0) {
        this.yOffset *= -1;
    }
    
    // These checks keep the golem from travelling too high or too low.
    if (this.mCenterY.getValue() <= Config.Golem.States.Patrolling.MinHeight && this.yOffset < 0) {
        this.yOffset *= -1;
    }
    if (this.mCenterY.getValue() >= Config.Golem.States.Patrolling.MaxHeight && this.yOffset > 0) {
        this.yOffset *= -1;
    }
    
    // We've determined the movement, now set the interpolation values.
    this.mCenterX.setFinalValue(golemXform.getXPos() + this.xOffset);
    this.mCenterY.setFinalValue(golemXform.getYPos() + this.yOffset);
    
    // Have the boss face the hero
    this.faceHero();
    
    // Projectile firing. Only fire a projectile if there is no active projectile state.
    if (this.mCurrentProjectileState === null) {
        // Also only fire a projectile after a defined cooldown period has passed.
        if (this.mTimeLastProjectileFired === null || 
            Date.now() >= this.mTimeLastProjectileFired + Config.Golem.States.Patrolling.ProjectileFiringInterval) {
            // Use a random number to pick the next projectile type, and then initialize that projectile state.
            var nextProjectile = Math.random();
            if (nextProjectile < Config.Golem.Projectiles.Homing.Chance &&
             //   this.mHardMode === true &&
                this.mPreviousProjectileState !== Config.Golem.Projectiles.Homing) {
                this.mCurrentProjectileState = Config.Golem.Projectiles.Homing;                
            } else {
                this.mCurrentProjectileState = Config.Golem.Projectiles.Blast;
            }
        }
    } else {
        // Projectile attack in progress, do appropriate things.
        this._updateProjectileState();
    }

    // Conditions to transition to other states.
    if (this.mCurrentHP <= 0) {
        this.switchToState(Config.Golem.States.Dying);
    } else if (Math.abs(heroXform.getXPos() - golemXform.getXPos()) < 40 && Math.abs(heroXform.getYPos() - golemXform.getYPos()) < 30 && Date.now() > this.mStateStartTime + Config.Golem.States.Smashing.Cooldown) {
        // If the golem & the hero are close enough, transition to the smashing state.
        this.switchToState(Config.Golem.States.Smashing);
    }
    
    // Update the interpolation and animation.
    this.interpolate();
    this.mGolem.updateAnimation();
};