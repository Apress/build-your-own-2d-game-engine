/*
* Car.js
*
*/

"use strict";

function Car(spriteTexture) {

	this.mCar = new LightRenderable(spriteTexture);
    this.mCar.setColor([1, 1, 1, 0]);
    this.mCar.getXform().setPosition(0, 0);
    this.mCar.getXform().setSize(5, 5);
    // this.mCar.setElementPixelPositions(0, 120, 0, 180);
    GameObject.call(this, this.mCar);

    var r = new RigidCircle(this.getXform(), 2.5); // size of Xform is 10
    this.setRigidBody(r);

    this.mScore = 0; // initialize Score to 0

}
gEngine.Core.inheritPrototype(Car, GameObject);

Car.prototype.getScore = function () {
    return this.mScore;
}

Car.prototype.score = function () {
    this.mScore++;
}
