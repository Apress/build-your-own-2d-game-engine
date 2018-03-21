
"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Background(aCamera, aTexture){

    this.mCamera = aCamera;
    this.mTexture = aTexture;

//    this.mWidth = size[0];
//    this.mHeight = size[1];

    this.mBg = new LightRenderable(this.mTexture);
    this.mBgObj = new GameObject(this.mBg);
    //this.mFishObj = new GameObject(this.mFish);
    GameObject.call(this, this.mBgObj);

}
gEngine.Core.inheritPrototype(Background, GameObject);

Background.prototype.initialize = function(size, pos){
    this.mBgObj.getXform().setPosition(pos[0], pos[1]);
    this.mBgObj.getXform().setSize(size[0], size[1]);
};

Background.prototype.update = function(){
};

Background.prototype.draw = function(aCamera){
    //this.mCamera.setupViewProjection();
    this.mBgObj.draw(aCamera);
};

Background.prototype.setSize = function(x, y){
    this.mBgObj.getXform().setSize(x, y);
};

Background.prototype.setPosition = function(x, y){
    this.mBgObj.getXform().setPosition(x, y);
};

Background.prototype.getRenderable = function(){
    return this.mBg;
};

Background.prototype.move = function(x, y){
    this.mBgObj.getXform().incXPosBy(x);
    this.mBgObj.getXform().incYPosBy(y);
};