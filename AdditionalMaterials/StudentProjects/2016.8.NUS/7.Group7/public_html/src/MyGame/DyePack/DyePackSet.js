/* File: DyePack.js 
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObjectSet */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function DyePackSet(sprite) {
    GameObjectSet.call(this);
    this.kSpriteSheet = sprite;
    this.timeclicks=0;
}
gEngine.Core.inheritPrototype(DyePackSet, GameObjectSet);


DyePackSet.prototype.update = function(hero, aCamera) {
    var x, y, d, e,x2,y2,f,g;
    this.timeclicks++;
    if(this.timeclicks>30){
        x = 140*Math.random()-22;
        y = 90;
        d = new DyePack(this.kSpriteSheet, x, y);
        this.addToSet(d);
        e = new DyePack2(this.kSpriteSheet, x, y);
        this.addToSet(e);
        this.timeclicks = 0;
    }
    
    
    // remove the expired ones
    var i, obj;
    for (i=0; i<this.size(); i++) {
        obj = this.getObjectAt(i);
        if (obj.hasExpired()===0)
            this.removeFromSet(obj);
    }
    
    
    // update all objects
    for (i=0; i<this.size(); i++) {
        obj = this.getObjectAt(i);
        obj.update(hero);
    }
};

