/* File: Enemy.js 
 * Date: 12/07/2015
 * Author(s): Dexter Hu
 * 
 * The enemy object.  It can change states.  The functionality of the states
 * will be defined in the update function of the children classes.  Enemies also
 * have default behavior for interacting with a player.  Enemies also destroy themselves
 * if they enter the screen and later leave.
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, LightRenderable, IllumRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Enemy(renderableObj, collisionType, camera, player, radarSprite) {      
    this.mState = 0;
    this.mActive = false;
    
    this.mCollisionType = collisionType;
    this.mCamera = camera;
    this.mObj = renderableObj;
    
    this.kTarget = player;
    this.kLeeway = 30;  // Horizontal leeway for zoomed-out radar (activate enemies sooner, delete later)
    
    var xForm = renderableObj.getXform();
    var pos = xForm.getPosition();
    
    this.mRadarRenderable = new TextureRenderable(radarSprite);
    this.mRadarRenderable.setColor([1, 1, 1, 1]);
    this.mRadarRenderable.getXform().setPosition(pos[0], pos[1]);
    this.mRadarRenderable.getXform().setZPos(0);
    this.mRadarRenderable.getXform().setSize(10, 10);
    
    GameObject.call(this, renderableObj);
}
gEngine.Core.inheritPrototype(Enemy, GameObject);

Enemy.prototype.update = function () {
    // Override this function for implementing behaviors based on the state
    
    // Default behavior:
//    if (!this.updateAllowed()) {
//        return;
//    }

    var pos = this.getXform().getPosition();
    
    this.mRadarRenderable.getXform().setPosition(pos[0], pos[1]);
    
    // Perform state changes or any other updates here
};

Enemy.prototype.updateState = function () {
    // Override this function to be able to check for and handle state updates (it's called from updateAllowed() automatically)
};

Enemy.prototype.updateAllowed = function () {
    /* Must be called FIRST each update.  See this.update() for a default behavior template.
     * The purpose is to combine all the typical update calls to make update() neater.
     * 
     * Screen bounds checking: Causes the function to return false if the object isn't in-screen (i.e., halt the updates).
     * Collision checking: Checks collision based on collision type, and calls the overriden collide() (empty function by default) when applicable.
     * Update state: Calls the overriden updateState() (empty function by default).
     * 
     * If this function returns false, return (exit) out of the update function completely.
     * That would mean the object isn't in screen, so don't update it.
     */
    var result = false;
    if (this._checkScreen()) {
        this.updateState();
        this.checkCollisionWith(this.kTarget);
        result = true;
    }
    return result;
};

Enemy.prototype.collided = function () {
    // Override this function for what happens after a collision with the player
};

Enemy.prototype.checkCollisionWith = function (other) {
    // Contains all collision-checking code, per collision type.  Call this each update.
    
    if (this.mCollisionType === 0) {
        // A standard bounding box collision
        var bbox = this.getBBox();
        var bbox2 = other.getBBox();
        if (bbox.boundCollideStatus(bbox2) > 0) {
            this.collided();
        }
    } else if (this.mCollisionType === 1) {
        // A pixel-accurate collision
        var h = [];
        if(this.pixelTouches(other, h)) {
            this.collided();
        }
    }
};

Enemy.prototype.isInScreen = function () {
    // Returns true if inside viewable area
    
    var left = this.mCamera.getWCCenter()[0] - (this.mCamera.getWCWidth() / 2) - this.kLeeway;
    var right = this.mCamera.getWCCenter()[0] + (this.mCamera.getWCWidth() / 2) + this.kLeeway;
    var top = this.mCamera.getWCCenter()[1] + (this.mCamera.getWCHeight() / 2);
    var bot = this.mCamera.getWCCenter()[1] - (this.mCamera.getWCHeight() / 2);
    var xform = this.mObj.getXform();
    var result = true;
    
    if (xform.getXPos() - (xform.getWidth() / 2) > right ||
        xform.getXPos() + (xform.getWidth() / 2) < left ||
        xform.getYPos() - (xform.getHeight() / 2) > top ||
        xform.getYPos() + (xform.getHeight() / 2) < bot) {
        result = false;
    }

    return result;
};

Enemy.prototype.isInScreenX = function () {
    // Returns true if inside viewable area, only in terms of X
    
    var left = this.mCamera.getWCCenter()[0] - (this.mCamera.getWCWidth() / 2) - this.kLeeway;
    var right = this.mCamera.getWCCenter()[0] + (this.mCamera.getWCWidth() / 2) + this.kLeeway;
    var xform = this.mObj.getXform();
    var result = true;
           
    if (xform.getXPos() + (xform.getWidth() / 2) < left ||
        xform.getXPos() - (xform.getWidth() / 2) > right) {
        result = false;
    }

    return result;
};

Enemy.prototype.destroy = function () {
    // Remove this object from the game
    gEngine.LayerManager.removeFromLayer(gEngine.eLayer.eActors, this);
};

Enemy.prototype.checkFlashlight = function () {
    // Returns true if hit by flashlight
    var result = false;
    if (this.kTarget.mFlashlightIsOn) {
        var x1 = this.mObj.getXform().getXPos();
        var x2 = this.kTarget.getXform().getXPos();
        var y1 = this.mObj.getXform().getYPos();
        var y2 = this.kTarget.getXform().getYPos();
        if (Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)) <= 50) { // 50 is the flashlight distance
            result = true;
        }
    }
    return result;
};

Enemy.prototype.drawRadarRepresentation = function (camera) {
    // Draw the radar representation
    
//    var rend = new TextureRenderable();
//    var xform = this.mObj.getXform();
//    rend.setColor([1, 1, 1, 1]);
//    rend.getXform().setSize(2, 2);
//    rend.getXform().setPosition(xform.getXPos(), xform.getYPos());

    
    this.mRadarRenderable.draw(camera);
};

Enemy.prototype._checkScreen = function () {
    /* This activates the object once in the screen's Y bounds, and destroys it after it leaves anywhere.
     * Also, if this method returns false, return and don't do any update computation.
     */
    
    var result = true;
    
    if (this.mActive && !this.isInScreenX()) {
        this.destroy();         // The object was once in the screen, but has left.  Destroy it.
    }
    if (!this.isInScreenX()) {
        result = false;         // Don't do anything unless in the screen in terms of X
    } else {
        this.mActive = true;    // Entered the screen for the first time
    }
    
    return result;  // If this is false, return (exit) out of the update function!
};