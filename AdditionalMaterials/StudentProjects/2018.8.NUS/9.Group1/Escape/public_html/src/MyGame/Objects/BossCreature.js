"use strict";

function BossCreature(spriteTexture , light, x, y, width, height) {
    this.mDye = null;
    
    
    this.mDye = new LightRenderable(spriteTexture);
    this.mDye.setColor([1, 1, 1, 0]);
    this.mDye.getXform().setPosition(x, y);
    this.mDye.getXform().setSize(width, height);
    this.mDye.setElementPixelPositions(0,1024,0,512);
    this.mDye.addLight(light);
    GameObject.call(this,this.mDye);

    var r = new RigidRectangle(this.getXform(), 125, 200);
    this.setRigidBody(r);
    this.toggleDrawRenderable();
    this.toggleDrawRigidShape();
}
try{
    gEngine.Core.inheritPrototype(BossCreature, WASDObj);
}catch(err){
    console.log(err);
}


BossCreature.prototype.update = function () {
    GameObject.prototype.update.call(this);
    // remember to update this.mMinion's animation
};