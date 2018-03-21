/* File: Wall.js 
 *
 * Creates and initializes a Wall object
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, TextureRenderable, RigidRectangle */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Flower(texture, atX, atY, width, height) {
    this.mFlower = new TextureRenderable(texture);

    this.mFlower.setColor([0.9, 0.9, 0.9, 0]);
    this.mFlower.getXform().setPosition(atX, atY);
    this.mFlower.getXform().setSize(width, height);
    
    GameObject.call(this, this.mFlower);
}
gEngine.Core.inheritPrototype(Flower, GameObject);

Flower.prototype.getTouchingResult = function(posCather) {
    var xform = this.mFlower.getXform();
    var leftBorder = xform.getXPos() - xform.getWidth() / 2;
    var rightBorder = xform.getXPos() + xform.getWidth() / 2;
    var topBorder = xform.getYPos() + xform.getHeight() / 2;
    var bottomBorder = xform.getYPos() - xform.getHeight() / 2;
    if (leftBorder <= posCather[0] && posCather[0] <= rightBorder)
        if (bottomBorder <= posCather[1] && posCather[1] <= topBorder)
            return true;
    return false;
};

Flower.prototype.update = function(delta) {
    
    if (delta > 0) {
        var mColor = this.mFlower.getColor();
        if (mColor[3] > 0.95) {
            this.mFlower.getXform().setPosition(200, -30);
            return true;
        };
        
        mColor[3] += delta;;
        this.mFlower.setColor(mColor);
    }
    else {
        var mColor = this.mFlower.getColor();
        if (mColor[3] > 0)   {
            mColor[3] += delta;
            this.mFlower.setColor(mColor);
        }  
        if (mColor[3] < 0.05) {
            return true;
        }
    }
    return false;
};

Flower.prototype.initColor = function() {
    this.mFlower.setColor([0.9, 0.9, 0.9, 1]);
};