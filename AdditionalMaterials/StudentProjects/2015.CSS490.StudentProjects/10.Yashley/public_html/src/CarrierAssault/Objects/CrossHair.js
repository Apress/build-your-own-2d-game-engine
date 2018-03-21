/* File: Plane.js 
 *
 * Creates and initializes the Plane (Dye)
 * overrides the update funciton of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, GameObject, LightRenderable, IllumRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function CrossHair(spriteTexture, atX, atY) {
    this.kDelta = 0.1;
    this.kWidth = 40;
    this.kHeight = 40;
    this.mCrossHair = new LightRenderable(spriteTexture);
    //this.mCrossHair = new Renderable;
    this.mCrossHair.setColor([1, 1, 1, 0]);
    this.mCrossHair.getXform().setPosition(atX, atY);
    //this.mPlane.getXform().setZPos(1);
    this.mCrossHair.getXform().setSize(this.kWidth, this.kHeight);
    GameObject.call(this, this.mCrossHair);

    this.mMiniMapRenderable = new Renderable();
    this.mMiniMapRenderable.setColor([1,1,1,1]);
     
}
gEngine.Core.inheritPrototype(CrossHair, GameObject);

CrossHair.prototype.getXform = function() {
    return this.mCrossHair.getXform();
};


CrossHair.prototype.update = function () {
    if(this.getXform().getWidth() >3){
        this.getXform().incWidthBy(-1);
        this.getXform().incHeightBy(-1);
    }

};

CrossHair.prototype.draw = function (aCamera) {
    GameObject.prototype.draw.call(this, aCamera);

};
