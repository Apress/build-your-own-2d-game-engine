/*
* Ball.js
*
*/

"use strict";

function Ball(spriteTexture) {

	this.mBall = new SpriteAnimateRenderable(spriteTexture);
    this.mBall.setColor([1, 1, 1, 0]);
    this.mBall.getXform().setPosition(0, 0);
    this.mBall.getXform().setSize(5, 5);
    // Have 4+ animation sequences for rolling left, right, up, down
    // and change sequence with setSpriteSequence to the correct sequence based on physics x and y velocity signs

    this.mBall.setSpriteSequence(460, 50, 125, 125, 5, 40); // top, left, width, height, numElements, padding
    // this.mBall.setElementPixelPositions(50, 170, 340, 460); // left, right, bottom, top
    // Size 120 x 120

    // change animation speed based on x and y velocity

    this.mBall.setAnimationSpeed(10); // number of update calls before advancing
    GameObject.call(this, this.mBall);

    var r = new RigidCircle(this.getXform(), 3);
    this.setRigidBody(r);
    // this.toggleDrawRenderable();
    // this.toggleDrawRigidShape();
}
gEngine.Core.inheritPrototype(Ball, GameObject);

Ball.prototype.update = function() {
    this.getRenderable().updateAnimation();
		GameObject.prototype.update.call(this);
};

// Ball.prototype.draw = function() { // implement this };
