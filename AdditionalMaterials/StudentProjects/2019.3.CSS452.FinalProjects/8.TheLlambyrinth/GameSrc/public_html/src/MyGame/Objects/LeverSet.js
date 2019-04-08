/* File: DoorSet.js 
 *
 * Support for working with a set of GameObjects
 */

/*jslint node: true, vars: true */
/*global GameObject, GameObjectSet, gEngine */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function LeverSet(spriteTexture, normalTexture) {
    this.mSet = [];
    this.kSprite = spriteTexture; 
    this.kNormal = normalTexture;
    //this.createLever(0, 2, 5, 8, 0);
    //this.createLever(72, 20, 5, 8, 270);
    //this.createLever(12, 70, 5, 8, 270);
   GameObject.call(this, this.mSet);
}
gEngine.Core.inheritPrototype(LeverSet, GameObjectSet);
//update set
LeverSet.prototype.update = function (cam, hero) {
    for (var i = 0; i < this.size(); i++)
        this.getObjectAt(i).update();
    for (var i = 0; i < this.size(); i++)
    {
        var lever = this.getObjectAt(i);
        if (lever.pixelTouches(hero, []) && gEngine.Input.isKeyClicked(gEngine.Input.keys.Space))  
        {
            lever.set();
            cam.shake(-5, -5, 5, 50);  
            hero.shake();
        }
    }

};

//draw set
LeverSet.prototype.draw = function (aCamera) {
    var i;
    for (i = 0; i < this.mSet.length; i++) {
        this.mSet[i].draw(aCamera);
    }
};

//draw set
LeverSet.prototype.createLever = function ( x,y,w,h, r,doorIndex) {
    var tempLever = new Lever(this.kSprite, this.kNormal, x, y, w, h,doorIndex);
    tempLever.setRot(r);
    this.addToSet(tempLever);
};

