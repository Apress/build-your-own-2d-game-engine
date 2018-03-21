/* File: DyePack.js 
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObjectSet */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!
var ShieldCalculator = 0;
function PropShieldSet(sprite) {
    GameObjectSet.call(this);
    this.kPropShieldSheet = sprite;
}
gEngine.Core.inheritPrototype(PropShieldSet, GameObjectSet);

PropShieldSet.prototype.update = function(Hero1,Hero2) {
    
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
        obj.update(Hero1,Hero2);
    }
    
    //Create  randomly
    ShieldCalculator = ShieldCalculator+1;
    if(ShieldCalculator ===  800){
        var d = new PropShield(this.kPropShieldSheet, 100*Math.random(), 120);
        this.addToSet(d);
        ShieldCalculator =  0;
    }
    
};
