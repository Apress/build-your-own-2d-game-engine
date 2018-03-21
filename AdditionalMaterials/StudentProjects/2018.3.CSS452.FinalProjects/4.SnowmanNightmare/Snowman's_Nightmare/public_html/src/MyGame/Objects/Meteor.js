/*jslint node: true, vars: true */
/*global gEngine, GameObject, LightRenderable,vec3,Fire,Light, IllumRenderable, HelperFunctions, SpriteAnimateRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Meteor(spriteTexture, bg, igloo) {

    this.kDelta = 1;
    this.downSize = 1;
    this.interp = null;
    this.name = "Meteor";
    
    Fire.call(this, spriteTexture, bg, igloo);
    
    this.lightColor = [1, 0, 1, 1];

    this.mLight.setNear(50);
    this.mLight.setFar(100);
    this.mLight.setInner(64);
    this.mLight.setOuter(70);
    this.mLight.setIntensity(2);
    this.mLight.setColor([0.5, 0.7, 0.5, 1]);
//    this.interpolateBy(0, -this.kDelta);
}
gEngine.Core.inheritPrototype(Meteor, Fire);

Meteor.prototype.update = function () {
    
    //call parent update
    Fire.prototype.update.call(this);
    
    if(this.shouldMove) {
        
        this.mLight.setYPos(this.mSprite.getXform().getYPos());
        this.mLight.setXPos(this.mSprite.getXform().getXPos());
    }
    
    GameObject.prototype.update.call(this);
};

Meteor.prototype.getScore = function () {
    return 400;
};

Meteor.prototype.getType = function () {

    return "Meteor";

};

Meteor.prototype.handleCollision = function (otherObjectType) {

    Fire.prototype.handleCollision.call(this, otherObjectType);

    if (otherObjectType === "Water") {
        this.shouldScore = true;
        this.scoreAmount = this.getXform().getPosition()[1] * 5;
    }
};

