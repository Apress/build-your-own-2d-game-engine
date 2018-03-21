/* File: GranadeSet.js
 *
 * Creates a pack of granades which can be launched
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObjectSet */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function GrenadeSet(texture, x, y) {
    GameObjectSet.call(this);
    this.kSpriteSheet = texture;
    var i, c;
    for(i=0; i<8; i++){        
        c = new Grenade(this.kSpriteSheet, x, y);        
        this.addToSet(c);
    }
}
gEngine.Core.inheritPrototype(GrenadeSet, GameObjectSet);


GrenadeSet.prototype.update = function(hero, aCamera) {
    // remove the expired ones
    var i, obj;
    for (i=0; i<this.size(); i++) {
        obj = this.getObjectAt(i);
        if (obj.hasHit())
            this.removeFromSet(obj);
    }
    
    // update all objects
    var i, obj;
    for (i=0; i<this.size(); i++) {
        obj = this.getObjectAt(i);
            if(obj.hasExpired()){
                obj.update(hero, aCamera, i);
        }
    }
};

