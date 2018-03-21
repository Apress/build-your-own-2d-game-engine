
/* File: MissleSet.js 
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObjectSet */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!
function rebirthSet() {
    GameObjectSet.call(this);
}
gEngine.Core.inheritPrototype(rebirthSet, GameObjectSet);

rebirthSet.prototype.update = function() {
    
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
        obj.update();
    }
    
};

rebirthSet.prototype.newAt = function(atX,atY) {
    var p = new rebirth(atX,atY);
    this.addToSet(p);
};
