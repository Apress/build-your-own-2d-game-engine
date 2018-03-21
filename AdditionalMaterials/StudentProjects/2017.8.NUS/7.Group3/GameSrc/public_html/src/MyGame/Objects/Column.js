/* File: Platform.js 
 *
 * Creates and initializes a ploatform object
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, TextureRenderable, RigidRectangle */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Column(texture,atX, atY) {
    this.mColumn = new LightRenderable(texture);

    this.mColumn.setColor([1, 1, 1, 0]);
    this.mColumn.getXform().setPosition(atX, atY);
    this.mColumn.getXform().setSize(12,96);
                                // show each element for mAnimSpeed updates
    GameObject.call(this, this.mColumn);

//    var rigidShape = new RigidRectangle(this.getXform(), 30, 3);
//    rigidShape.setMass(0);  // ensures no movements!
//    rigidShape.setDrawBounds(true);
//    rigidShape.setColor([1, 0.2, 0.2, 1]);
//    this.setPhysicsComponent(rigidShape);
}
gEngine.Core.inheritPrototype(Column, GameObject);