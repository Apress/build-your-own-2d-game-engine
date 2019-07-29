"use strict";  // Operate in Strict mode such that variables must be declared before used!

function PowerBarPointer(spriteTexture,camera) {
    this.kCamera = camera;
    this.mPowerBarPointer = new SpriteRenderable(spriteTexture);
    this.mPowerBarPointer.setColor([229/255, 229/255, 229/255, 1]);
    this.mPowerBarPointer.getXform().setPosition(25,-5);
    this.mPowerBarPointer.getXform().setSize(40,4);
    this.mPowerBarPointer.getXform().setRotationInDegree(90);
    this.mPowerBarPointer.setElementPixelPositions(1, 1, 1, 1);
   GameObject.call(this, this.mPowerBarPointer);
}
gEngine.Core.inheritPrototype(PowerBarPointer, GameObject);
PowerBarPointer.prototype.update=function(val){
    var length=40-val*0.9;
    if(length<0){
        return;
    }
    this.mPowerBarPointer.getXform().setWidth(length);
    this.mPowerBarPointer.getXform().setYPos(-5+val*0.9/2);    
}