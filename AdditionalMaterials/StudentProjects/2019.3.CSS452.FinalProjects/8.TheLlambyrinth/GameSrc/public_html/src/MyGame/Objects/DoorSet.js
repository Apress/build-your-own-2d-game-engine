/* File: DoorSet.js 
 *
 * Support for working with a set of GameObjects
 */

/*jslint node: true, vars: true */
/*global GameObject, GameObjectSet, gEngine */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function DoorSet(spriteTexture, normalTexture) {
    this.mSet = [];
    this.kSprite = spriteTexture;
    this.kNormal = normalTexture;
    
   // this.createDoor(30,20, 2, 10);
   GameObject.call(this, this.mSet);
}
gEngine.Core.inheritPrototype(DoorSet, GameObjectSet);

//update set
DoorSet.prototype.update = function () {
    for (var i = 0; i < this.size(); i++)
        this.getObjectAt(i).update();
};

//draw set
DoorSet.prototype.draw = function (aCamera) {
    for (var i = 0; i < this.size(); i++)
        this.getObjectAt(i).draw(aCamera);

};

//draw set
DoorSet.prototype.createDoor = function ( x,y,w,h, r,pushNum) {
    var tempDoor = new Door(this.kSprite, this.kNormal, x, y, w, h,pushNum);
    tempDoor.setRot(r);
    this.addToSet(tempDoor);
};

