/* File: DyePack.js 
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function ThermometerPointer(spriteTexture,camera) {
    this.kCamera = camera;
    this.mThermometerPointer = new SpriteRenderable(spriteTexture);
    this.mThermometerPointer.setColor([0.2, 0.9, 0.6, 0]);
    this.mThermometerPointer.getXform().setPosition(-15,23.1);
    this.mThermometerPointer.getXform().setSize(5,2);
    this.mThermometerPointer.getXform().incRotationByDegree(90);
    this.mThermometerPointer.setElementPixelPositions(1790, 1986, 1658, 1757);
   GameObject.call(this, this.mThermometerPointer);
}
gEngine.Core.inheritPrototype(ThermometerPointer, GameObject);

ThermometerPointer.prototype.update=function(temperature){
    this.mThermometerPointer.getXform().setPosition((temperature-50)/(100/60)-15,23.1);
}