/*
 * @auth: Joey Guinasso
 * @file: AnglerFish.js
 * @date: 11-28-15
 * @brief: AnglerFish is a fish with a light on its head that gives the player
 *         a longer fishing line if caught.
 */

/* global GameObject, gEngine, Fish, Light, vec3, SpriteAnimateRenderable, vec2 */

'use strict';

function AnglerFish(texture, normal){
    this.mFish = new IllumRenderable(texture, normal); 
    this.mFish.setSpriteSequence(1024, 0, 1024, 1024, 4, 0);
    this.mFish.setAnimationSpeed(20);
    this.mFish.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
    this.mFish.setColor([1,1,1,0]);
    //this.mChaseDist = 10;
    this.mRotateRate = 1;
    this.mSpeed = 0.5;
    GameObject.call(this, this.mFish);
    this.mStatus = 0;
    this.mScore = 1;
    this.mBounces = 0;
    var front = vec2.fromValues(1, 0);
    
    this.setCurrentFrontDir(front);
    this.mFish.getXform().setRotationInRad(0);
    this.mAnglerLight = null;
    
    // pre-computed value:
    this.mTheta = 0.56255858;
}

gEngine.Core.inheritPrototype(AnglerFish, Fish);

AnglerFish.prototype.createLight = function () {
    var light = new Light();
    light.setLightType(Light.eLightType.ePointLight);
    light.setColor([0.6, 0.6, 0.6, 0.5]);
    light.setXPos(15);
    light.setYPos(50);      
    light.setZPos(5);
    light.setDirection([-0.2, -0.2, -1]);
    light.setNear(4);
    light.setFar(6);
    light.setInner(0.5);
    light.setOuter(1.4);
    light.setIntensity(1.2);
    light.setDropOff(0.5);

    this.mAnglerLight = light;
    this.mFish.addLight(this.mAnglerLight);

};

AnglerFish.eStatus = Object.freeze({
    eChase: 8
});

AnglerFish.prototype.getLight = function (){
    return this.mAnglerLight;
};

AnglerFish.prototype.setLight = function (light){
    this.mAnglerLight = light ;
};

AnglerFish.prototype.update = function (){
    Fish.prototype.update.call(this);
    var xform = this.getXform();
    var pos = vec3.fromValues(0, 0, 0);
    pos = this._rotateLight(pos);
    this.mAnglerLight.set2DPosition(pos);
};

// calculate the new position for the light as the fish moves, is rotated
AnglerFish.prototype._rotateLight = function(p) {
    
    var adjTheta;
    if(this.getXform().getWidth() > 0){
        adjTheta = this.mTheta + this.getXform().getRotationInRad();
    }else{
        adjTheta = (Math.PI - this.mTheta) + this.getXform().getRotationInRad();
    }
    
    var x = (Math.abs(this.getXform().getWidth()) * 0.5) * Math.cos(adjTheta);
    var y = (Math.abs(this.getXform().getHeight()) * 0.4) * Math.sin(adjTheta);

    p[0] = x + this.getXform().getXPos();
    p[1] = y + this.getXform().getYPos();

    return p;
};
