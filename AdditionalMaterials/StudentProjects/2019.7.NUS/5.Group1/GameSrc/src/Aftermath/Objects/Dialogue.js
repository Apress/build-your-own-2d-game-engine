/* File: Dialogue.js 
 *
 * Creates and initializes a ploatform object
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, TextureRenderable, RigidRectangle */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Dialogue(word) {
    this.width = 100;
    this.height = 25;

    // this.mBack = new TextureRenderable(textureBack);
    // this.mBack.getXform().setPosition(20, 20);
    this.mWord = new TextureRenderable(word);
    this.mWord.getXform().setPosition(100, 30);
    this.mWord.getXform().setSize(this.width, this.height);


    // this.mDialogue = new TextureRenderable(texture);
    //
    // this.mDialogue.setColor([1, 1, 1, 0]);
    // this.mDialogue.getXform().setPosition(atX, atY);
    // // this.mDialogue.getXform().setSize(30, 3.75);
    // this.mDialogue.getXform().setSize(this.width, this.height);
    // // show each element for mAnimSpeed updates
    // GameObject.call(this, this.mDialogue);
    //
    // // var rigidShape = new RigidRectangle(this.getXform(), 30, 3);
    // var rigidShape = new RigidRectangle(this.getXform(), this.width, this.height);
    // rigidShape.setMass(0);  // ensures no movements!
    // // rigidShape.toggleDrawBound();
    // this.toggleDrawRigidShape();
    //
    // // rigidShape.setDrawBounds(true);
    // // rigidShape.setColor([1, 0.2, 0.2, 1]);
    // this.setRigidBody(rigidShape);
    //
    // this.setCurrentFrontDir(vec2.fromValues(0, 1));
    // this.setSpeed(0);

}

// gEngine.Core.inheritPrototype(Dialogue, GameObject);

Dialogue.prototype.draw = function (aCamera) {
    // this.mBack.draw(aCamera);
    this.mWord.draw(aCamera);
};

Dialogue.prototype.setTexture = function (newWord) {
    this.mWord.setTexture(newWord)

};
