/*jslint node: true, vars: true */
/*global gEngine, GameObject, LightRenderable, IllumRenderable, CameraManager */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Block(spriteTexture, size, x, y) {
    
    this.size = size;
    
    this.mSprite = new LightRenderable(spriteTexture);
    this.mSprite.setColor([1, 1, 1, 0]);
    this.mSprite.getXform().setPosition(x, y);
    this.mSprite.getXform().setSize(size, size);

    this.mSprite.setElementPixelPositions(0, size, 0, size);  

    GameObject.call(this, this.mSprite);
    
    var rigidShape = new RigidRectangle(this.getXform(), size, size);
    rigidShape.setMass(0);  // ensures no movements!
    rigidShape.setFriction(0);
  
    //rigidShape.setDrawBounds(true);
    rigidShape.setColor([0, 0, 1, 1]);
    this.setPhysicsComponent(rigidShape);

}
gEngine.Core.inheritPrototype(Block, GameObject);

Block.prototype.getScore = function () {
    
    return 0;
    
};

Block.prototype.shouldDie = function () {
    
    if(!this.isVisible())
        return true;
    
    return false;
    
};

Block.prototype.handleCollision = function (otherObjectType) {
    
    if(otherObjectType === "Fire"){
        this.setVisibility(false);
        CameraManager.Core.shakeMainCam(3, 3, 5, 20);
    }
    
};

Block.prototype.update = function () {
    
        GameObject.prototype.update.call(this);

};



