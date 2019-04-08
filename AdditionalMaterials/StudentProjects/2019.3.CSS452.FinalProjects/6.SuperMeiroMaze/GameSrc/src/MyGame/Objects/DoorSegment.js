/* File: TextureObject.js 
 *
 * Defines the behavior of an GameObject that references to a TextureRenderable
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, TextureRenderable*/
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function DoorSegment(texture) {
    this.mRenderable = new LightRenderable(texture);
    this.mRenderable.setColor([1, 1, 1, 0.1]);
    this.mRenderable.setElementPixelPositions(510, 595, 23, 153);
    GameObject.call(this, this.mRenderable);
}
gEngine.Core.inheritPrototype(DoorSegment, GameObject);

DoorSegment.prototype.update = function () {

    
};