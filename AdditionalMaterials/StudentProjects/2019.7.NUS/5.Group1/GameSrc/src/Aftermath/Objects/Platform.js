/* File: Platform.js 
 *
 * Creates and initializes a ploatform object
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, TextureRenderable, RigidRectangle */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Platform(texture, atX, atY) {
    this.mPlatform = new TextureRenderable(texture);

    this.mPlatform.setColor([1, 1, 1, 0]);
    this.mPlatform.getXform().setPosition(atX, atY);
    // this.mPlatform.getXform().setSize(30, 3.75);
    this.mPlatform.getXform().setSize(8, 8);
                                // show each element for mAnimSpeed updates
    GameObject.call(this, this.mPlatform);

    // var rigidShape = new RigidRectangle(this.getXform(), 30, 3);
    var rigidShape = new RigidRectangle(this.getXform(), 8, 6);
    rigidShape.setMass(0);  // ensures no movements!
    // rigidShape.toggleDrawBound();
    this.toggleDrawRigidShape();

    // rigidShape.setDrawBounds(true);
    // rigidShape.setColor([1, 0.2, 0.2, 1]);
    this.setRigidBody(rigidShape);

    this.setCurrentFrontDir(vec2.fromValues(0, 1));
    this.setSpeed(0);

    this.move = .3;
}
gEngine.Core.inheritPrototype(Platform, GameObject);