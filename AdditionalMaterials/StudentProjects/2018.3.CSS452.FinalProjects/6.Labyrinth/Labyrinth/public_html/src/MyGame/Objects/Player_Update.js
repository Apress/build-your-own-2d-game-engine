/*
 * File: Player.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject, Player */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
Player.prototype.update = function () {
    switch(this.mCurrentState) {
        case Player.ePlayerState.Normal:
            this._updateNormal();
            break;
        case Player.ePlayerState.OnSand:
            this._updateOnSand();
            break;
        case Player.ePlayerState.OnIce:
            this._updateOnIce();
            break;
    }
    this._updateAnimation();
    GameObject.prototype.update.call(this);
};

Player.prototype._updateAnimation = function () {
    var dir = this.getCurrentFrontDir();
    var xComp = dir[0];
    var yComp = dir[1];
    
    if(Math.abs(xComp) >= Math.abs(yComp))
    {
        if(xComp < 0)
            this.getRenderable().setTopSpriteSequence(this.mAnimationPos.left);
        else
            this.getRenderable().setTopSpriteSequence(this.mAnimationPos.right);            
    }
    else
    {
        if(yComp < 0)
            this.getRenderable().setTopSpriteSequence(this.mAnimationPos.down);
        else
            this.getRenderable().setTopSpriteSequence(this.mAnimationPos.up);    
    }
    
    this.getRenderable().updateAnimation();
};

Player.prototype._updateNormal = function () {
    this._updatePos();
    this.mMap.update();
};

Player.prototype._updateOnSand = function () {
    if(!this._onSand())
    {
        this._transitionToNormal();
    }
    else
    {
        this._updatePos();
    }
};

Player.prototype._updateOnIce = function () {
    if(!this._onIce())
    {
        this._transitionToNormal();
    }
    else
    {
        this._updatePos();
    }
};


Player.prototype._updateFlashLight = function(){
    var x = this.getXform().getXPos();
    var y = this.getXform().getYPos();
    this.mFlashLight.setPosition(x, y);
    this.mFlashLight.setMagnitude();
};

Player.prototype._updatePos = function () {

    if (this.mSpeed !== 0) {
        
        var direction = vec2.fromValues(0,0);
        
        var horiz = 0;
        var vert = 0;
        var buttonPressed = false;
        
        if(gEngine.Input.isKeyPressed(gEngine.Input.keys.W))
        {
            buttonPressed = true;
            vert = 1;
            vec2.add(direction, direction, vec2.fromValues(0,1));
        }
        
        if(gEngine.Input.isKeyPressed(gEngine.Input.keys.S))
        {
            buttonPressed = true;
            vert = -1;
            vec2.add(direction, direction, vec2.fromValues(0,-1));
        }
        
        if(gEngine.Input.isKeyPressed(gEngine.Input.keys.A))
        {
            buttonPressed = true;
            horiz = -1;
            vec2.add(direction, direction, vec2.fromValues(-1,0));
        }
        
        if(gEngine.Input.isKeyPressed(gEngine.Input.keys.D))
        {
            buttonPressed = true;
            horiz = 1;
            vec2.add(direction, direction, vec2.fromValues(1,0));
        }
        
        if(gEngine.Input.isKeyClicked(gEngine.Input.keys.H))
        {
            this.mFlashLight.toggle();
        }
        
        if(buttonPressed){
            this.mFlashLight.mVerticalFactor = vert;
            this.mFlashLight.mHorizontalFactor = horiz;
        }
        
        vec2.normalize(direction,direction);
        if(this.mCurrentState === Player.ePlayerState.OnIce)
        {
            if(direction[0] === 0 && direction[1] === 0)
            {
                direction = this.getCurrentFrontDir();
            }
        }
        vec2.scale(direction,direction,this.mSpeed);
        this.getXform().incXPosBy(direction[0]);
        this.getXform().incYPosBy(direction[1]);
        this.setCurrentFrontDir(direction);
        this._updateFlashLight();
    }
};