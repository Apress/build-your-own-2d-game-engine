/*
* Goal.js
*
*/

"use strict";

function Goal(spriteTexture, left) {

	// left is a bool that indicates the goal is on the left side of the viewport
	// when left is false, the goal is on the right side of the viewport
	this.mGoal = new SpriteRenderable(spriteTexture);
    this.mGoal.setColor([1, 1, 1, 0]);
    this.mGoal.getXform().setSize(5, 20);

    if (left) {
    	this.mGoal.getXform().setPosition(-95, 0);
    } else { // right
    	this.mGoal.getXform().setPosition(95, 0);
    }

    GameObject.call(this, this.mGoal);

    var r = new RigidRectangle(this.getXform(), 5, 20); // 5 is width of Xform, 20 is height of Xform
    this.setRigidBody(r);
    this.toggleDrawRenderable();
    this.toggleDrawRigidShape();


}
gEngine.Core.inheritPrototype(Goal, GameObject);

// Goal.prototype.update = function() { // implement this };

// Goal.prototype.draw = function() { // implement this };
