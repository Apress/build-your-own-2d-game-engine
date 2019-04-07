
/*jslint node: true, vars: true */
/*global gEngine, GameObject, LightRenderable, SpriteAnimateRenderable, vec2,NonPhysicsGameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!
function Door(spriteTexture, normalTexture, x, y, w, h,pushNum) {
    this.mDoor = new IllumRenderable(spriteTexture, normalTexture);
    this.mDoor.setColor([1, 1, 1, 0]);
    this.mDoor.getXform().setSize(w, h);
    this.mDoor.getXform().setPosition(x, y);
    this.visable = true;
    this.mNum = pushNum;
    GameObject.call(this, this.mDoor);  
}
gEngine.Core.inheritPrototype(Door, GameObject);

//test pushing button when clicking 2 or 3 
Door.prototype.update = function() {
    //gEngine.Physics.processCollision(temp,h);
    if (!this.visable) {
        this.mDoor.getXform().setSize(0,0);
    }  
    
    this.mDoor.update();
};
Door.prototype.setVisable = function(vis) {
    this.visable = vis;
};

Door.prototype.set = function() {
    this.mNum--;
    if(this.mNum <= 0) {
        this.setVisable(false);
    }
    return this.mNum;
}

Door.prototype.draw = function(aCamera) {
    this.mDoor.draw(aCamera);
};
Door.prototype.setRot = function(rot) {
    this.mDoor.getXform().setRotationInDegree(rot);
};
Door.prototype.getBBox = function() {
    var b = null;
    var xform = this.getXform();
    if (xform.getRotationInDegree() / 90 === 1 || xform.getRotationInDegree() / 90 === -1) {
        b = new BoundingBox(xform.getPosition(), xform.getHeight(), xform.getWidth());
    } else {
        b = new BoundingBox(xform.getPosition(), xform.getWidth(), xform.getHeight());
    }
    return b;
}


