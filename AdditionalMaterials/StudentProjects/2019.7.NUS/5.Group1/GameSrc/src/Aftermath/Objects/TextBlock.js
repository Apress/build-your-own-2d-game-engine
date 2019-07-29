/* File: TextBlock.js 
 *
 * Creates and initializes a ploatform object
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, TextureRenderable, RigidRectangle */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function TextBlock(texture, atX, atY, w, h) {
    this.width = w === undefined ? 80 : w;
    this.height = h === undefined ? 20 : h;
    this.mTextBlock = new TextureRenderable(texture);

    this.mTextBlock.setColor([1, 1, 1, 0]);
    this.mTextBlock.getXform().setPosition(atX, atY);
    // this.mTextBlock.getXform().setSize(30, 3.75);
    this.mTextBlock.getXform().setSize(this.width, this.height);
    // show each element for mAnimSpeed updates
    GameObject.call(this, this.mTextBlock);

    // var rigidShape = new RigidRectangle(this.getXform(), 30, 3);
    var rigidShape = new RigidRectangle(this.getXform(), this.width, this.height);
    rigidShape.setMass(0);  // ensures no movements!
    // rigidShape.toggleDrawBound();
    this.toggleDrawRigidShape();

    // rigidShape.setDrawBounds(true);
    // rigidShape.setColor([1, 0.2, 0.2, 1]);
    this.setRigidBody(rigidShape);

    this.setCurrentFrontDir(vec2.fromValues(0, 1));
    this.setSpeed(0);

}

gEngine.Core.inheritPrototype(TextBlock, GameObject);