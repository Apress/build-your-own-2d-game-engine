/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectSet, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */
"use strict";

function LevelPlatform() {
    this.mCurrentTime = Date.now();
    this.mElapsedTime = 0;
    this.mPreviousTime = this.mCurrentTime;
    
    this.mEndMarkerPos = null;
    this.mEndOfWorld = null;
    this.mPlayerStart = null;
    this.mCamera = null;
    this.mMiniCamera = null;
    this.mIsScrolling = true;
    this.mIsGhostEnabled = false;
    this.mIsLightEnabled = false;
    
    this.mCameraSpeed = 17;
    
    // draw object if it is within x% horizontal distance to the right of the 
    // center of the camera. Example, draw if within 120% distane from cam
    this.kDrawBoundary = 120; 
    this.mLastStarterDrawIndex = 0;
    this.mIsRendering = false;
    
    this.mMsg = new FontRenderable("Renderables :");
    this.mMsg.setColor([0, 0, 0, 1]);
    this.mMsg.getXform().setPosition(2, 70);
    this.mMsg.setTextHeight(3);
    GameObjectSet.call(this);
};
gEngine.Core.inheritPrototype(LevelPlatform, GameObjectSet);

LevelPlatform.prototype.update = function () {
    GameObjectSet.prototype.update.call(this);
    if (this.mIsScrolling) {
        this._updateScrollingCamera();
    }
    var i=1;
    var pl = this.mSet[0];
    for(i=1;i<this.mSet.length;i++){
        var o = this.mSet[i];
        var ot = o.getRigidBody();
        var col = new CollisionInfo();
        var status = pl.getRigidBody().collisionTest(ot,col);
        if(status){
            pl.setFall(false);
            break;
        }
    }
};

LevelPlatform.prototype.stopScroll = function(){this.mIsScrolling=false;};
LevelPlatform.prototype._updateScrollingCamera = function () {
    var wcCenterMini = this.mMiniCamera.getWCCenter();
    var wcCenter = this.mCamera.getWCCenter();
    var msgCenter = this.mMsg.getXform().getPosition();
    
    this.mCurrentTime = Date.now();
    this.mElapsedTime = this.mCurrentTime - this.mPreviousTime;
    this.mPreviousTime = this.mCurrentTime;
    
    vec2.scaleAndAdd(wcCenter, wcCenter, [1,0], 
        ( this.mCameraSpeed * this.mElapsedTime)/1000);
    vec2.scaleAndAdd(wcCenterMini, wcCenter, [1,0], 
        ( this.mCameraSpeed * this.mElapsedTime)/1000);
    vec2.scaleAndAdd(msgCenter, msgCenter, [1,0], 
        ( this.mCameraSpeed * this.mElapsedTime)/1000);
    if(wcCenter[0] >= this.mEndOfWorld) {
        this.mIsScrolling = false;
    }
};

// this function will only draw the renderables that should be visible.
LevelPlatform.prototype.draw = function () {
    var i = this.mLastStarterDrawIndex, l;
    var count = 0;
    l = this.mSet[0];
    l.draw(this.mCamera);
    //this.mMsg.draw(this.mCamera);
//     start drawing at last known visible object
    for (i; i < this.mSet.length; i++) {
        //ignore first object (playerobject)
        if(i!==0){
            l = this.mSet[i];
            var lr = l.getRenderable();
        if(this._isVisible(lr)) {
            l.draw(this.mCamera);
            this.mIsRendering = true;
            count++;
        } else if (!this.mIsRendering) {
            // as the camera scrolls objects will move off screen to the 
            // left and we wont render them anymore so update index to
            // skip those objects
            this.mLastStarterDrawIndex += 1;
        }
        }
    }
    this.mIsRendering = false;
    this.mMsg.setText("Renderables drawn: " + count);
    //this.mMsg.draw(this.mCamera);   // only draw status in the main camera
    return i;
};

LevelPlatform.prototype._isVisible = function(object) {
    // Check right edge
    var camRightEdge = this.mCamera.getWCCenter()[0] + 
            ((this.mCamera.getWCWidth()/2) * (this.kDrawBoundary/100));
    var objLeftEdge = object.getXform().getXPos() - (object.getXform().getWidth()/2);
    if( objLeftEdge <= camRightEdge) {
        // Check left edge
        var camLeftEdge = this.mCamera.getWCCenter()[0] - 
            (this.mCamera.getWCWidth()/2);
        var objRightEdge = object.getXform().getXPos() + 
                (object.getXform().getWidth()/2);
        if(objRightEdge <= camLeftEdge) {
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }
};

LevelPlatform.prototype.getRenderableSet = function(){return this.mSet;};

//the set gets initialized before everything so camera and end gets set later
LevelPlatform.prototype.setCamera = function(aCamera){this.mCamera = aCamera;};
LevelPlatform.prototype.setMiniCamera = function(aCamera) { this.mMiniCamera = aCamera; };

LevelPlatform.prototype.setWorldEnd = function(worldEnd){this.mEndOfWorld = worldEnd;};
LevelPlatform.prototype.getWorldEnd = function(){return this.mEndOfWorld;};

LevelPlatform.prototype.setGhostEnabled = function(isEnabled){this.mIsGhostEnabled = isEnabled;};
LevelPlatform.prototype.isGhostEnabled = function(){return this.mIsGhostEnabled;};

LevelPlatform.prototype.setLightEnabled = function(isEnabled){this.mIsLightEnabled = isEnabled;};
LevelPlatform.prototype.isLightEnabled = function(){return this.mIsLightEnabled;};

LevelPlatform.prototype.setPlayerStart = function(pos){this.mPlayerStart = pos;};
LevelPlatform.prototype.getPlayerStart = function(){return this.mPlayerStart;};

LevelPlatform.prototype.setEndMarkerPosition = function (pos) {
    this.mEndMarkerPos = pos;
};
LevelPlatform.prototype.getEndMarkerPosition = function () {
    return this.mEndMarkerPos;
};

LevelPlatform.prototype.drawAll = function(cam){
    var i;
    for(i=0;i<this.mSet.length;i++){
        this.mSet[i].draw(cam);
    }
};