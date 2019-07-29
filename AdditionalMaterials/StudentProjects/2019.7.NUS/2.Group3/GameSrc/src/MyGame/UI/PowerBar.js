"use strict";  // Operate in Strict mode such that variables must be declared before used!

function PowerBar(spriteTexture,camera) {
    this.kCamera = camera;
    this.mPowerBar = new SpriteRenderable(spriteTexture);
    this.mPowerBar.setColor([1, 0.7, 0.1, 0]);
    this.mPowerBar.getXform().setPosition(25,-5);
    this.mPowerBar.getXform().setSize(40,5);
    this.mPowerBar.getXform().setRotationInDegree(90);
    this.mPowerBar.setElementPixelPositions(31, 1660, 1900, 2048);
   GameObject.call(this, this.mPowerBar);
}
gEngine.Core.inheritPrototype(PowerBar, GameObject);