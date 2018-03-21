/* File: GameObject_PixelCollision.js 
 *
 * Implements the pixelTouch() function of GameObject
 */

/*jslint node: true, vars: true */
/*global GameObject, vec2 */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

/**
 * Implements the pixelTouch() function of GameObject
 * @memberOf GameObject
 * @param {GameObject} otherObj to check for pixel touch
 * @param {vec2} wcTouchPos out vector to set touch position to
 * @returns {Boolean} true if collision is detected
 */
GameObject.prototype.pixelTouches = function (otherObj, wcTouchPos) {
    // only continue if both objects have getColorArray defined 
    // if defined, should have other texture intersection support!
    var pixelTouch = false;
    var myRen = this.getRenderable();
    var otherRen = otherObj.getRenderable();

    if ((typeof myRen.pixelTouches === "function") && (typeof otherRen.pixelTouches === "function")) {
        if ((myRen.getXform().getRotationInRad() === 0) && (otherRen.getXform().getRotationInRad() === 0)) {
            // no rotation, we can use bbox ...
            var otherBbox = otherObj.getBBox();
            if (otherBbox.intersectsBound(this.getBBox())) {
                if (!this.mCollisionPixelFlag) {
                    return true;
                }
                myRen.setColorArray();
                otherRen.setColorArray();
                pixelTouch = myRen.pixelTouches(otherRen, wcTouchPos);
            }
            if (!this.mCollisionPixelFlag) {//why
                return false;
            }
        } else {
            // One or both are rotated, compute an encompassing circle
            // by using the hypotenuse as radius
            var mySize = myRen.getXform().getSize();
            var otherSize = otherRen.getXform().getSize();
            var myR = Math.sqrt(0.5*mySize[0]*0.5*mySize[0] + 0.5*mySize[1]*0.5*mySize[1]);
            var otherR = Math.sqrt(0.5*otherSize[0]*0.5*otherSize[0] + 0.5*otherSize[1]*0.5*otherSize[1]);
            var d = [];
            vec2.sub(d, myRen.getXform().getPosition(), otherRen.getXform().getPosition());
            if (vec2.length(d) < (myR + otherR)) {
                myRen.setColorArray();
                otherRen.setColorArray();
                pixelTouch = myRen.pixelTouches(otherRen, wcTouchPos);
            }
        }
    } else {
        // This else section is entered if one or both of the objects are regular (un-textured) Renderables
        // This function is VERY simplified.  If there is no rotation, both objects will do bbox to bbox.
        // If there is rotation, both objects will do circle to circle.
        
        // No rotation:  bbox to bbox
        if (this.mDestroy || otherObj.mDestroy) {
            return false; // No collisions will occur for objects that are destroyed
        }
        
        var xf1 = myRen.getXform();
        var xf2 = otherRen.getXform();
        
        if ((xf1.getRotationInRad() % 90 === 0) && (xf2.getRotationInRad() % 90 === 0)) {
            var otherBbox = otherObj.getBBox();
            if (otherBbox.intersectsBound(this.getBBox())) {
                return true;
            }
        } else {
            // Rotation: circle to circle
            var part1 = Math.pow(xf2.getXPos() - xf1.getXPos(), 2);
            var part2 = Math.pow(xf2.getYPos() - xf1.getYPos(), 2);
            var dist = Math.sqrt(part1 + part2);
            if (dist <= (Math.min(xf1.getWidth(), xf1.getHeight()) / 2) + (Math.min(xf2.getWidth(), xf2.getHeight()) / 2)) { // Math.min for interior bound
                // Collision found when the distance <= the sum of the 2 radii
                return true;
            }
        }
        
    }
    return pixelTouch;
};