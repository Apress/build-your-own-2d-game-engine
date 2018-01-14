/* File: Wall.js 
 *
 * Creates and initializes a Wall object
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, TextureRenderable, RigidRectangle */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Wall(texture, atX, atY) {
    this.mWall = new TextureRenderable(texture);

    this.mWall.setColor([1, 1, 1, 0]);
    this.mWall.getXform().setPosition(atX, atY);
    this.mWall.getXform().setSize(4, 16);
                                // show each element for mAnimSpeed updates
    GameObject.call(this, this.mWall);

    var rigidShape = new RigidRectangle(this.getXform(), 2, 16);
    rigidShape.setMass(0);  // ensures no movements!
    rigidShape.setDrawBounds(true);
    rigidShape.setColor([1, 1, 1, 1]);
    this.setPhysicsComponent(rigidShape);
}
gEngine.Core.inheritPrototype(Wall, GameObject);