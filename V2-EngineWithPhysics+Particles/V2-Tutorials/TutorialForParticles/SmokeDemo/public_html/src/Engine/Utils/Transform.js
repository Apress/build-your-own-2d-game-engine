/* 
 * File: Transform.js
 * Encapsulates the matrix transformation functionality, meant to work with
 * Renderable
 */

/*jslint node: true, vars: true */
/*global gEngine: false, vec2: false, Math: false, mat4: false, vec3: false */
/* find out more about jslint: http://www.jslint.com/help.html */
"use strict";

/**
 * Defualt Constructor.
 * @memberOf Transform
 * @returns {Transform}
 */
function Transform() {
    this.mPosition = vec2.fromValues(0, 0); // this is the translation
    this.mScale = vec2.fromValues(1, 1);    // this is the width (x) and height (y)
    this.mZ = 0.0;                          // must be a positive number, larger is closer to eye
    this.mRotationInRad = 0.0;              // in radians!
}

/**
 * Clone this transform properties to the paramater object.
 * @memberOf Transform
 * @param {type} aXform to clone this transform properties to.
 * @returns {void}
 */
Transform.prototype.cloneTo = function (aXform) {
    aXform.mPosition = vec2.clone(this.mPosition);
    aXform.mScale = vec2.clone(this.mScale);
    aXform.mZ = this.mZ;
    aXform.mRotationInRad = this.mRotationInRad;
};
// <editor-fold desc="Public Methods">

//<editor-fold desc="Setter/getter methods">
// // <editor-fold desc="Position setters and getters ">
/**
 * Sets the X and Y position.
 * @memberOf Transform
 * @param {Number} xPos of the transform.
 * @param {Number} yPos of the transform.
 * @returns {void}
 */
Transform.prototype.setPosition = function (xPos, yPos) { this.setXPos(xPos); this.setYPos(yPos); };

/**
 * Returns the 2D Position.
 * @memberOf Transform
 * @returns {vec2} 2D Position.
 */
Transform.prototype.getPosition = function () { return this.mPosition; };

/**
 * Returns the 3D Position.
 * @memberOf Transform
 * @returns {vec3} 3D Position.
 */
Transform.prototype.get3DPosition = function () {
    return vec3.fromValues(this.getXPos(), this.getYPos(), this.getZPos());
};

/**
 * Returns the X Position.
 * @memberOf Transform
 * @returns {Number} X Position.
 */
Transform.prototype.getXPos = function () { return this.mPosition[0]; };

/**
 * Sets the X Position.
 * @memberOf Transform
 * @param {Number} xPos New X Position.
 * @returns {void}
 */
Transform.prototype.setXPos = function (xPos) { this.mPosition[0] = xPos; };

/**
 * Increment the X Position value by param.
 * @memberOf Transform
 * @param {Number} delta to increment X Position.
 * @returns {void}
 */
Transform.prototype.incXPosBy = function (delta) { this.mPosition[0] += delta; };

/**
 * Returns the Y Position.
 * @memberOf Transform
 * @returns {Number} Y Position.
 */
Transform.prototype.getYPos = function () { return this.mPosition[1]; };

/**
 * Sets the Y Position.
 * @memberOf Transform
 * @param {Number} yPos new Y Position.
 * @returns {void}
 */
Transform.prototype.setYPos = function (yPos) { this.mPosition[1] = yPos; };

/**
 * Increment the Y Position value by param.
 * @memberOf Transform
 * @param {Number} delta to increment the Y Position.
 * @returns {void}
 */
Transform.prototype.incYPosBy = function (delta) { this.mPosition[1] += delta; };

/**
 * Sets the Z Position.
 * @memberOf Transform
 * @param {Number} d new Z Position.
 * @returns {void}
 */
Transform.prototype.setZPos = function (d) { this.mZ = d; };

/**
 * Returns the Z Position.
 * @memberOf Transform
 * @returns {Number}
 */
Transform.prototype.getZPos = function () { return this.mZ; };

/**
 * Increment the Z Position by delta.
 * @memberOf Transform
 * @param {Number} delta to increment the Z Position.
 * @returns {void}
 */
Transform.prototype.incZPosBy = function (delta) { this.mZ += delta; };
//</editor-fold>
// <editor-fold desc="size setters and getters">

/**
 * Set the Size.
 * @memberOf Transform
 * @param {Number} width new width of the Transform.
 * @param {Number} height new height of the Transform.
 * @returns {void}
 */
Transform.prototype.setSize = function (width, height) {
    this.setWidth(width);
    this.setHeight(height);
};

/**
 * Returns the Size.
 * @memberOf Transform
 * @returns {vec2} Size of the Transform.
 */
Transform.prototype.getSize = function () { return this.mScale; };

/**
 * Increment the Width and Height by delta.
 * @memberOf Transform
 * @param {Number} delta to increment the width and height.
 * @returns {void}
 */
Transform.prototype.incSizeBy = function (delta) {
    this.incWidthBy(delta);
    this.incHeightBy(delta);
};

/**
 * Returns the Width of the Transform.
 * @memberOf Transform
 * @returns {Number} Width of the Transform.
 */
Transform.prototype.getWidth = function () { return this.mScale[0]; };

/**
 * Sets the Width of the Transform.
 * @memberOf Transform
 * @param {Number} width new width of the transform.
 * @returns {void}
 */
Transform.prototype.setWidth = function (width) { this.mScale[0] = width; };

/**
 * Increment Width of the Transform.
 * @memberOf Transform
 * @param {Number} delta to increment the width by.
 * @returns {void}
 */
Transform.prototype.incWidthBy = function (delta) { this.mScale[0] += delta; };

/**
 * Returns the Height of the Transform.
 * @memberOf Transform
 * @returns {Number} Height of the Transform.
 */
Transform.prototype.getHeight = function () { return this.mScale[1]; };

/**
 * Sets the Height of the Transform.
 * @memberOf Transform
 * @param {Number} height new height of the Transform.
 * @returns {void}
 */
Transform.prototype.setHeight = function (height) { this.mScale[1] = height; };

/**
 * Increment the Height of the Transform.
 * @memberOf Transform
 * @param {Number} delta to increment the height by.
 * @returns {void}
 */
Transform.prototype.incHeightBy = function (delta) { this.mScale[1] += delta; };
//</editor-fold>
// <editor-fold desc="rotation getters and setters">

/**
 * Set the Transform's Rotation in Radians.
 * @memberOf Transform
 * @param {Number} rotationInRadians Radian to set the Transform.
 * @returns {void}
 */
Transform.prototype.setRotationInRad = function (rotationInRadians) {
    this.mRotationInRad = rotationInRadians;
    while (this.mRotationInRad > (2 * Math.PI)) {
        this.mRotationInRad -= (2 * Math.PI);
    }
};

/**
 * Set the Transform's Rotation in Degree's.
 * @memberOf Transform
 * @param {Number} rotationInDegree Degree to set the Transform.
 * @returns {void}
 */
Transform.prototype.setRotationInDegree = function (rotationInDegree) {
    this.setRotationInRad(rotationInDegree * Math.PI / 180.0);
};

/**
 * Increment the Rotation by delta Degree.
 * @memberOf Transform
 * @param {Number} deltaDegree to increment the rotatation by.
 * @returns {void}
 */
Transform.prototype.incRotationByDegree = function (deltaDegree) {
    this.incRotationByRad(deltaDegree * Math.PI / 180.0);
};

/**
 * Increment the Rotation by delta Radian.
 * @memberOf Transform
 * @param {Number} deltaRad to increment the rotation by.
 * @returns {void}
 */
Transform.prototype.incRotationByRad = function (deltaRad) {
    this.setRotationInRad(this.mRotationInRad + deltaRad);
};

/**
 * Returns the Rotation in Radian.
 * @memberOf Transform
 * @returns {Number} Radian rotation of the Transform.
 */
Transform.prototype.getRotationInRad = function () {  return this.mRotationInRad; };

/**
 * Returns the Rotation in Degree.
 * @memberOf Transform
 * @returns {Number} Degree rotation of the Transform.
 */
Transform.prototype.getRotationInDegree = function () { return this.mRotationInRad * 180.0 / Math.PI; };
    //</editor-fold>
//</editor-fold>

/**
 * returns the matrix the concatenates the transformations defined
 * @memberOf Transform
 * @returns {mat4} Maxtrix 4 representation of the Transform.
 */
Transform.prototype.getXform = function () {
    // Creates a blank identity matrix
    var matrix = mat4.create();

    // The matrices that WebGL uses are transposed, thus the typical matrix
    // operations must be in reverse.

    // Step A: compute translation, for now z is the mHeight
    mat4.translate(matrix, matrix, this.get3DPosition());
    // Step B: concatenate with rotation.
    mat4.rotateZ(matrix, matrix, this.getRotationInRad());
    // Step C: concatenate with scaling
    mat4.scale(matrix, matrix, vec3.fromValues(this.getWidth(), this.getHeight(), 1.0));

    return matrix;
};
//</editor-fold>