/* File: DyePack.js 
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObjectSet */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function ProjectileSet() {
    GameObjectSet.call(this);
}
gEngine.Core.inheritPrototype(ProjectileSet, GameObjectSet);

ProjectileSet.prototype.update = function(dyes, aCamera) {
    // remove the expired ones
    var i, obj;
    var numHit = 0;
    for (i=0; i<this.size(); i++) {
        obj = this.getObjectAt(i);
        if (obj.hasExpired())
            this.removeFromSet(obj);
    }
    
    // update all objects
    for (i=0; i<this.size(); i++) {
        obj = this.getObjectAt(i);
        if (obj.update(dyes, aCamera))
            gHighScore++;
    }
    return numHit;
};

ProjectileSet.prototype.newAt = function(pos) {
    var p = new Projectile(pos[0], pos[1]);
    this.addToSet(p);
};
