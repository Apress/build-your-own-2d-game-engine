/*
 * File: Player.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, SpriteAnimateRenderable, LineRenderable,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

Player.ePlayerState = Object.freeze({
    Normal: 0,
    OnIce: 1, 
    OnSand: 2
});

function Player(pos, sprite, normal, map) {
    this.mCurrentState = null;
    this.mSpeed = null;
    this._transitionToNormal();
    this.mSprite = new IllumRenderable(sprite, normal);
    this.mSprite.getXform().setPosition(pos[0], pos[1]);
    this.mSprite.getXform().setSize(7, 7);
    this.mSprite.setColor([1, 1, 1, 0]);
    this.mSprite.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
    this.mSprite.setAnimationSpeed(10);
    this.mSprite.setSpriteSequence(
            263, 0,     // top left pixel
            64, 64,    // width and height
            5, 0        // num sprites and padding
            );
    GameObject.call(this, this.mSprite);

    // Animation helpers
    this.mAnimationPos = {down:263, left:199, up:135, right:71};

    // Shake helpers
    this.mStartPos = null;
    this.mShakePos = null;
    
    // Map Interaction
    this.mMap = map;
    this.mDebugSlideMode = false;
    
    
    this.mFlashLight = new FlashLight();
}
gEngine.Core.inheritPrototype(Player, GameObject);

Player.prototype._transitionToNormal = function () {
    this.mSpeed = 30 / 60;
    this.mCurrentState = Player.ePlayerState.Normal;
};

Player.prototype._transitionToOnSand = function () {
    this.mSpeed = 15 / 60;
    this.mCurrentState = Player.ePlayerState.OnSand;
};

Player.prototype._transitionToOnIce = function () {
    this.mSpeed = 1;
    this.mCurrentState = Player.ePlayerState.OnIce;
};

Player.prototype._onSand = function () {
    return this.mMap.isOnSand();
};

Player.prototype._onIce = function () {
    if (this.mDebugSlideMode) {
        return true;
    }
    
    return this.mMap.isOnIce();
};

Player.prototype.getSprite = function () {
    return this.mSprite;
};

Player.prototype.getLowerBounds = function () {
    var xform = this.getXform();
    var offset = vec2.fromValues(0, xform.getHeight() / 4);
    vec2.sub(offset, xform.getPosition(), offset);
    var b = new BoundingBox(offset, xform.getWidth(), xform.getHeight() / 2);
    return b;
};

Player.prototype.setDebugSlideMode = function(currentDebugState) {
    this.mDebugSlideMode = currentDebugState;
    if (this.mDebugSlideMode) {
        this._transitionToOnIce();
    }
    
};