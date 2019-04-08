/* File: DoorSet.js 
 *
 * Support for working with a set of GameObjects
 */

/*jslint node: true, vars: true */
/*global GameObject, GameObjectSet, gEngine */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function PushButtonSet(spriteTexture, normalTexture) {
    this.mSet = [];
    this.kSprite = spriteTexture;
    this.kNormal = normalTexture;
   // this.createButton(70, 45, 8,8);
   //GameObject.call(this, this.mSet);
}
gEngine.Core.inheritPrototype(PushButtonSet, GameObjectSet);

//update set
PushButtonSet.prototype.update = function (aCamera,sprite) {
    for (var i = 0; i < this.size(); i++)
        this.getObjectAt(i).update(aCamera,sprite);
};

//draw set
PushButtonSet.prototype.draw = function (aCamera) {
    for (var i = 0; i < this.size(); i++)
        this.getObjectAt(i).draw(aCamera);

};

//draw set 
PushButtonSet.prototype.createButton = function ( x,y,w,h, r,door) {
    var tempButton = new PushButtonPhysics(this.kSprite, this.kNormal, x, y, w, h,door);
    tempButton.setRot(r);       //set roatation
    this.addToSet(tempButton);
};
PushButtonSet.prototype.checkBounds = function(bounds) {
    for (var i = 0; i < this.size(); i++) {
        var bb = this.getObjectAt(i).getBBox();
        if(bb.intersectsBound(bounds)) {
            return true;
        }
    }
    return false;
}