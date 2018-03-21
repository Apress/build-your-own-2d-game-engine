/* File: DyePack.js 
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObjectSet */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function ChasePackSet(sprite) {
    GameObjectSet.call(this);
    this.kSpriteSheet = sprite;
    var i, x, y, c;
    for(i=0; i<30; i++){
        x = 100 + 900*Math.random();
        y = 10 + 60 * Math.random();
        c = new ChasePack(this.kSpriteSheet, x, y);
        
        this.addToSet(c);
    }
}
gEngine.Core.inheritPrototype(ChasePackSet, GameObjectSet);


ChasePackSet.prototype.update = function(hero, aCamera) {
    var x, y, d;
    if (gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Left)) {
        x = aCamera.mouseWCX();
        y = aCamera.mouseWCY();
        d = new ChasePack(this.kSpriteSheet, x, y);
        this.addToSet(d);
    }
    
    
    
    // remove the expired ones
    var i, obj;
    for (i=0; i<this.size(); i++) {
        obj = this.getObjectAt(i);
        if (obj.hasExpired())
            this.removeFromSet(obj);
    }
    
    // update all objects
    for (i=0; i<this.size(); i++) {
        obj = this.getObjectAt(i);
        obj.update(hero, aCamera);
    }
};

