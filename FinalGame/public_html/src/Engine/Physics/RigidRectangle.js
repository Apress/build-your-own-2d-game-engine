/* 
 * File: RigidRectangle.js
 * Defines a rigid Rectangle
 */

/*jslint node: true, vars:true , white: true*/
/*global gEngine, RigidShape, vec2, LineRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */
"use strict";

/**
 * 
 * @param {Transform} xform Transform object
 * @param {Number} w Width of rectangle
 * @param {Number} h Height of rectangle
 * @returns {RigidRectangle} New instance of RigidRectangle
 * @class RigidRectangle
 */
function RigidRectangle(xform, w, h) {
    RigidShape.call(this, xform);
    this.mSides = new LineRenderable();
    
    this.mWidth = w;
    this.mHeight = h;
}
gEngine.Core.inheritPrototype(RigidRectangle, RigidShape);

/**
 * Return the type of Rigidshape
 * @returns {enum|eRigidType}
 * @memberOf RigidRectangle
 */
RigidRectangle.prototype.rigidType = function () {
    return RigidShape.eRigidType.eRigidRectangle;
};

/**
 * Draw function called by GameLoop
 * @param {Camera} aCamera Camera to draw too
 * @returns {void}
 * @memberOf RigidRectangle
 */
RigidRectangle.prototype.draw = function (aCamera) {
    if (!this.mDrawBounds) {
        return;
    }
    RigidShape.prototype.draw.call(this, aCamera);
    var x = this.getPosition()[0];
    var y = this.getPosition()[1];
    var w = this.mWidth/2;
    var h = this.mHeight/2;
    
    this.mSides.setFirstVertex(x - w, y + h);  //TOP LEFT
    this.mSides.setSecondVertex(x + w, y + h); //TOP RIGHT
    this.mSides.draw(aCamera);
    this.mSides.setFirstVertex(x + w, y - h); //BOTTOM RIGHT
    this.mSides.draw(aCamera);
    this.mSides.setSecondVertex(x - w, y - h); //BOTTOM LEFT
    this.mSides.draw(aCamera);
    this.mSides.setFirstVertex(x - w, y + h); //TOP LEFT
    this.mSides.draw(aCamera);
};

/**
 * Return the width of the rectangle
 * @returns {Number} Width of rectangle
 * @memberOf RigidRectangle
 */
RigidRectangle.prototype.getWidth = function () { return this.mWidth; };

/**
 * Return the height of the rectangle
 * @returns {Number} Height of rectangle
 * @memberOf RigidRectangle
 */
RigidRectangle.prototype.getHeight = function () { return this.mHeight; };

/**
 * Set the Color of the position marker and sides
 * @param {Float[]} color new color of marker and sides [R, G, B, A]
 * @returns {void}
 * @memberOf RigidRectangle
 */
RigidRectangle.prototype.setColor = function (color) {
    RigidShape.prototype.setColor.call(this, color);
    this.mSides.setColor(color);
};