/* File: Hero.js 
 *
 * Creates and initializes the Hero (Dye)
 * overrides the update function of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, RigidCircle, RigidRectangle */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Enemy(spriteSheet) {
    
    this.mEnemy = new LightRenderable(spriteSheet);
    this.mEnemy.getXform().setPosition(0, 0);
    this.mEnemy.getXform().setSize(10, 5);

    GameObject.call(this, this.mEnemy);

    this.mHero = null;
    
    this.mRange = 30;
}

gEngine.Core.inheritPrototype(Enemy, GameObject);

Enemy.prototype.update = function () {
    // must call super class update
    GameObject.prototype.update.call(this);
    
    if(this.mHero !== null) {                                                   // if the hero is null or not set do not do anything with the enemy
        if(this.mState === null) {console.log("Enemy is missing estate");}      // if the state is set to null then the enemy has no AI or logic
        else {this.mState();}                                                   // update the state
        this._heroCollision();                                                  // check for collisions with the hero
    }
};

// this looks for hero collisions and maybe reports to the hero
// when a collision has been detected
Enemy.prototype._heroCollision = function () {
    
    var enemyBBox = this.getBBox();
    var heroBBox = this.mHero.getBBox();
    var status = enemyBBox.intersectsBound(heroBBox);

    if(status){ 
        if(heroBBox.minY() > this.getXform().getYPos()){
            this.getXform().setPosition(-100,-100);
            var v = this.mHero.getPhysicsComponent().getVelocity();
            v[1] += 30;
            
        }
        else {
            this.mHero.handleEnemyCollision(this);
        }
    }
};

// sets the enemy AI state
// set the function to be called. fancy Javascript right here.
Enemy.prototype._updateState = function (func) {
    this.mState = func;
    
};

// set the hero object, each update state uses the hero
// different however they want
// set the hero for the enemy to interact with
Enemy.prototype.setHeroObject = function(hero) {
    this.mHero = hero;
};

Enemy.prototype.reset = function() {
    this.getXform().setPosition(this.mInitialPosition[0], this.mInitialPosition[1]);
};