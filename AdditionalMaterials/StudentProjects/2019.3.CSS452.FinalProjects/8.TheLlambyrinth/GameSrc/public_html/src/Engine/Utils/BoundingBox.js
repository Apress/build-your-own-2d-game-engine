/* 
 * File: BoundingBox.js
 * Encapsulates an axis aligned box
 */

/*jslint node: true, vars: true, bitwise: true */
/*global vec2 */
/* find out more about jslint: http://www.jslint.com/help.html */
"use strict";

/**
 * Default Constructor
 * Encapsulates an axis aligned box
 * @memberOf BoundingBox
 * @param {vec2} centerPos Center postion of the bounding box
 * @param {Number} w Width of the bounding box
 * @param {Number} h Height of the bounding box
 * @returns {BoundingBox} New instance of BoundingBox
 */
function BoundingBox(centerPos, w, h) {
    this.mLL = vec2.fromValues(0, 0);
    this.setBounds(centerPos, w, h);
}

/**
 * Collision Status values
 * @memberOf BoundingBox
 * @type {enum|eboundCollideStatus}
 */
BoundingBox.eboundCollideStatus = Object.freeze({
    eCollideLeft: 1,
    eCollideRight: 2,
    eCollideTop: 4,
    eCollideBottom: 8,
    eInside : 16,
    eOutside: 0
});
/**
 * Set the BoundingBox Location and Size. rotation is ignored.
 * @memberOf BoundingBox
 * @param {vec2} centerPos Center postion of the bounding box
 * @param {Number} w Width of the bounding box
 * @param {Number} h Height of the bounding box
 * @returns {void}
 */
BoundingBox.prototype.setBounds = function (centerPos, w, h) {
    this.mWidth = w;
    this.mHeight = h;
    this.mLL[0] = centerPos[0] - (w / 2);
    this.mLL[1] = centerPos[1] - (h / 2);
};

/**
 * Determines if x,y point is inside BoundingBox
 * @memberOf BoundingBox
 * @param {type} x X location to check
 * @param {type} y Y location to check
 * @returns {Boolean} true if x,y point is inside this BoundingBox
 */
BoundingBox.prototype.containsPoint = function (x, y) {
    return ((x > this.minX()) && (x < this.maxX()) &&
             (y > this.minY()) && (y < this.maxY()));
};

/**
 * Determines if parameter BoundingBox intersects with this BoundingBox
 * @memberOf BoundingBox
 * @param {BoundingBox} otherBound to check intersect status
 * @returns {Boolean} true if paramater intersects this BoundingBox
 */
BoundingBox.prototype.intersectsBound = function (otherBound) {
    return ((this.minX() < otherBound.maxX()) &&
            (this.maxX() > otherBound.minX()) &&
            (this.minY() < otherBound.maxY()) &&
            (this.maxY() > otherBound.minY()));
};

/**
 * Return the collision status of parameter BoundingBox
 * @memberOf BoundingBox
 * @param {BoundingBox} otherBound to check collision status
 * @returns {eboundCollideStatus} collision status
 */
// returns the status of otherBound wrt to this.
BoundingBox.prototype.boundCollideStatus = function (otherBound) {
    var status = BoundingBox.eboundCollideStatus.eOutside;

    if (this.intersectsBound(otherBound)) {
        if (otherBound.minX() < this.minX()) {
            status |= BoundingBox.eboundCollideStatus.eCollideLeft;
        }
        if (otherBound.maxX() > this.maxX()) {
            status |= BoundingBox.eboundCollideStatus.eCollideRight;
        }
        if (otherBound.minY() < this.minY()) {
            status |= BoundingBox.eboundCollideStatus.eCollideBottom;
        }
        if (otherBound.maxY() > this.maxY()) {
            status |= BoundingBox.eboundCollideStatus.eCollideTop;
        }

        // if the bounds intersects and yet none of the sides overlaps
        // otherBound is completely inside thisBound
        if (status === BoundingBox.eboundCollideStatus.eOutside) {
            status = BoundingBox.eboundCollideStatus.eInside;
        }
    }
    return status;
};

/**
 * Return the left position of the BoundingBox
 * @memberOf BoundingBox
 * @returns {Number} left position
 */
BoundingBox.prototype.minX = function () { return this.mLL[0]; };

/**
 * Return the right position of the BoundingBox
 * @memberOf BoundingBox
 * @returns {Number} right position
 */
BoundingBox.prototype.maxX = function () { return this.mLL[0] + this.mWidth; };

/**
 * Return the bottom position of the BoundingBox
 * @memberOf BoundingBox
 * @returns {Number} bottom position
 */
BoundingBox.prototype.minY = function () { return this.mLL[1]; };

/**
 * Return the top position of the BoundingBox
 * @memberOf BoundingBox
 * @returns {Number} top position
 */
BoundingBox.prototype.maxY = function () { return this.mLL[1] + this.mHeight; };
//</editor-fold>