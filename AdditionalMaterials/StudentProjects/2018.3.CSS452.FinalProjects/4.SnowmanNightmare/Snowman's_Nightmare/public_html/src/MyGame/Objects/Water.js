/*jslint node: true, vars: true */
/*global gEngine, GameObject, LightRenderable, IllumRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Water(spriteTexture, size, x, y) {
    
    this.size = 64;
    this.piece = 1;
    
    this.mSprite = new LightRenderable(spriteTexture);
    this.mSprite.setColor([1, 1, 1, 0]);
    this.mSprite.getXform().setPosition(x, y);
    this.mSprite.getXform().setSize(size, size);
    GameObject.call(this, this.mSprite);
    
     var r = new RigidRectangle(this.getXform(), 31, 31);
 //r.setDrawBounds(true);
    r.setColor([0, 0, 1, 1]);
     this.setPhysicsComponent(r);
    
}
gEngine.Core.inheritPrototype(Water, GameObject);

Water.prototype.setPiece = function (piece) {
    
    this.piece = piece;
    
};

Water.prototype.setDirection = function (dir) {
    
    var offset = this.size * this.piece + this.size * dir;

    if(this.piece === 0)
        
            this.mSprite.setElementPixelPositions(offset, offset + this.size, 0, this.size);
        
    else{
        
        offset += this.size;
        
        this.mSprite.setElementPixelPositions(offset, offset + this.size, 0, this.size);
    }    
};

Water.prototype.getScore = function () {
    
    return 0;
    
};

Water.prototype.handleCollision = function (otherObjectType) {
    
    if(otherObjectType === "Fire"){
        
        //do whatever needs to be done upon contacting a fire object
        
    }
    
};

Water.prototype.shouldDie = function () {
    
    return false;
    
};

