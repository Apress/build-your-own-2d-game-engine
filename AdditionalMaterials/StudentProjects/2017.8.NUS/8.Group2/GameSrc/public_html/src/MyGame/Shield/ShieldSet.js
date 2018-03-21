/* File: MissleSet.js 
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObjectSet */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!
function ShieldSet(sprite) {
    GameObjectSet.call(this);
    this.kShieldSheet = sprite;
}
gEngine.Core.inheritPrototype(ShieldSet, GameObjectSet);

ShieldSet.prototype.update = function(Hero,StoneSet) {
    
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
        obj.update(Hero,StoneSet);
    }
    
};

ShieldSet.prototype.newAt = function(pos) {
    var p = new Shield(pos[0], pos[1]);
    this.addToSet(p);
};

