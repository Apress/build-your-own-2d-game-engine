/* File: Platform.js 
 *
 * Creates and initializes a ploatform object
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, TextureRenderable, RigidRectangle */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Platform(pixelPosition, spriteTexture, pos, size) {
    this.mPlatform = new LightRenderable(spriteTexture);

    this.mPlatform.setColor([1, 1, 1, 0]);
    this.mPlatform.getXform().setPosition(pos[0], pos[1]);
    this.mPlatform.getXform().setSize(size[0],size[1]);
    this.mPlatform.setElementPixelPosArray(pixelPosition);
    
    GameObject.call(this, this.mPlatform);

    var rigidShape = new RigidRectangle(this.getXform(), size[0], size[1]);
    rigidShape.setMass(0);  // ensures no movements!
    //rigidShape.setDrawBounds(true);
    rigidShape.setColor([1, 0.2, 0.2, 1]);
    this.setPhysicsComponent(rigidShape);
}
gEngine.Core.inheritPrototype(Platform, GameObject);

Platform.prototype.getWidth = function () {
    return this.mPlatform.getXform().getWidth();
};

Platform.prototype.update = function (hero) {
    GameObject.prototype.update.call(this);
    
};






