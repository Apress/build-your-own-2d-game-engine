/* File: Carrier.js 
 *
 * Creates and initializes the Carrier (Dye)
 * overrides the update funciton of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, GameObject, LightRenderable, IllumRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Carrier(spriteTexture, atX, atY, lgtSet, normalMap) {
    this.kDelta = 0.1;
    this.kWidth = 4.5;
    this.kHeight = 3;
    this.kHealthDelta = 0;

    this.mCarrier = new IllumRenderable(spriteTexture, normalMap);
    this.mCarrier.setColor([1, 1, 1, 0]);
    this.mCarrier.getXform().setPosition(atX, atY);
    //this.mCarrier.getXform().setZPos(1);
    this.mCarrier.getXform().setSize(this.kWidth, this.kHeight);

    //Health bar
    this.mHealth = new Renderable();
    this.mHealth.setColor([1, 0, 0, 1]);
    this.mHealth.getXform().setSize(2.5, 0.3);

    this.mTheLight = new Light();
    // this.mTheLight.setRadius(8);
    this.mTheLight.setZPos(2);
    this.mTheLight.setXPos(13);
    this.mTheLight.setYPos(14);
    this.mTheLight.setIntensity(0.4);
    this.mTheLight.setColor([1, 1, 1, 1]);

    this.mCarrier.addLight(this.mTheLight);

    //this.mCarrier.addLight(lgtSet.getLightAt(1));
    // this.mCarrier.addLight(lgtSet.getLightAt(3));

    var transform = new Transform();
    transform.setPosition(this.mCarrier.getXform().getXPos(), this.mCarrier.getXform().getYPos() - this.kHeight / 2);

    GameObject.call(this, this.mCarrier);
    var front = this.getCurrentFrontDir();
    front[0] = 1;
    front[1] = 0;

    //Plane
    this.mMiniMapRenderable = new Renderable();
    this.mMiniMapRenderable.setColor([0, 1, 0, 1]);


}
gEngine.Core.inheritPrototype(Carrier, GameObject);

Carrier.eCarrierState = Object.freeze({
    eFaceRight: 0,
    eFaceLeft: 1,
    eRunRight: 2,
    eRunLeft: 3,
    eJumpRight: 4,
    eJumpLeft: 5
});

Carrier.prototype.getCurrentDir = function () {
    return this.getCurrentFrontDir();
}


Carrier.prototype.update = function () {
    this.mCarrier.getXform().cloneTo(this.mMiniMapRenderable.getXform());
    var kDelta = 0.15;
    GameObject.prototype.update.call(this);
    var pos = this.getXform().getPosition();
    // vec2.scaleAndAdd(pos, pos, this.getCurrentFrontDir(), .05)
    var dir = this.getCurrentFrontDir();
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)) {
        vec2.rotate(dir, dir, .01);
        this.getXform().incRotationByRad(+.01);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W)) {

        vec2.scaleAndAdd(pos, pos, this.getCurrentFrontDir(), 0.04);

    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S)) {
        vec2.scaleAndAdd(pos, pos, this.getCurrentFrontDir(), -0.04);

    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
        vec2.rotate(dir, dir, -.01);
        this.getXform().incRotationByRad(-.01);
    }


    /*
     if (gEngine.Input.isKeyClicked(gEngine.Input.keys.X)) {
     this.mHealth.getXform().incWidthBy(-0.15);
     this.kHealthDelta -= 0.075; 
     }
     */
    this.mHealth.getXform().setPosition(this.mCarrier.getXform().getXPos() + this.kHealthDelta,
            this.mCarrier.getXform().getYPos() + 1.5);


};

Carrier.prototype.draw = function (aCamera) {
    GameObject.prototype.draw.call(this, aCamera);
    this.mHealth.draw(aCamera);
    // this.mJumpBox.draw(aCamera);
};

Carrier.prototype.getHealth = function () {
    return this.mHealth;
};

Carrier.prototype.decHealth = function (value) {
    this.mHealth.getXform().incWidthBy(-value);
    this.kHealthDelta -= value / 2;
};

Carrier.prototype.didShoot = function () {
    
};

Carrier.prototype.isPlane = function () {
    return false; 
}; 
