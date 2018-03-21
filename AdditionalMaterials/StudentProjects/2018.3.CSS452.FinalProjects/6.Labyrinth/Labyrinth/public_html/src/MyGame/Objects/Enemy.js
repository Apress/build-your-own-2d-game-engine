/*
 * File: Enemy.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, SpriteAnimateRenderable, LineRenderable,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

Enemy.eEnemyState = Object.freeze({
    Patrol: 0,
    Chase: 1, 
    Alert: 2,
    Catch: 3
});

function Enemy(pos, sprite, normal) {
    this.mTargetPos = null;
    this.mSpeed = null;       //Units per frame
    this.mCurrentState = null;
    this.mSprite = new IllumRenderable(sprite, normal);
    this.mSprite.getXform().setPosition(pos[0][0], pos[0][1]);
    this.mSprite.getXform().setSize(12, 6);
    this.mSprite.setColor([1, 1, 1, 0]);
    this.mSprite.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
    this.mSprite.setAnimationSpeed(10);
    this.mSprite.setSpriteSequence(
            519, 0,     // top left pixel
            128, 64,    // width and height
            4, 0        // num sprites and padding
            );
    GameObject.call(this, this.mSprite);
    
    // Animation helpers
    this.mAnimationPos = {down:519, left:455, up:391, right:327};
    
    // Shake helpers
    this.mStartPos = null;
    this.mShakePos = null;
    
    // Patrol locations
    this.mHoldChase = false;
    this.mCurrentPatrol = -1;
    this.mPatrolPos = pos;
    this.transitionToPatrol();
    
    // Patrol/Chase threshold
    this.kChaseThreshold = 40;
    this.kPatrolThreshold = 30;
    
    // Rotation interpolator
    this.mRotater = new InterpolateVec2(this.getCurrentFrontDir(), 60, .05);
}
gEngine.Core.inheritPrototype(Enemy, GameObject);

Enemy.prototype.transitionToCatch = function () {
    this.mSpeed = 0;
    this.mCurrentState = Enemy.eEnemyState.Catch;
};

Enemy.prototype.transitionToPatrol = function () {
    this.mSpeed = 20 / 60;
    this.mCurrentState = Enemy.eEnemyState.Patrol;
    this.mCurrentPatrol = (this.mCurrentPatrol + 1) % this.mPatrolPos.length;
    this.mTargetPos = this.mPatrolPos[this.mCurrentPatrol];
    this.mHoldChase = false;
};

Enemy.prototype.transitionToAlert = function () {
    this.mSpeed = 0;
    this.mCurrentState = Enemy.eEnemyState.Alert;
    this.mStartPos = this.mSprite.getXform().getPosition();
    this.mShakePos = new ShakePosition(1, 1, 20, 60);
};

Enemy.prototype.transitionToChase = function (hero, holdChase) {
    this.mSpeed = 24 / 60;
    this.mCurrentState = Enemy.eEnemyState.Chase;
    this.mCurrentFrontDir = vec2.sub(this.mCurrentFrontDir, hero.getXform().getPosition(), this.getXform().getPosition());
    if(holdChase !== null)
    {
        this.mHoldChase = holdChase;
    }
};

Enemy.prototype._getNextPatrolNode = function () {
    if(vec2.distance(this.mSprite.getXform().getPosition(), this.mTargetPos) < 1)
    {
        this.mCurrentPatrol = (this.mCurrentPatrol + 1) % this.mPatrolPos.length;
        this.mTargetPos = this.mPatrolPos[this.mCurrentPatrol];
        this.mTargetPos[0] += Math.random() * 10 - 5;
        this.mTargetPos[1] += Math.random() * 10 - 5;
    }
    return this.mTargetPos;
};

Enemy.prototype.addLight = function (l) {
    this.mSprite.addLight(l);
};