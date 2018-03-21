/* File: DyePack.js 
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObjectSet */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!
var SupplyCalculator = 0;
function PropSupplySet(sprite) {
    GameObjectSet.call(this);
    this.kPropSupplySheet = sprite;
}
gEngine.Core.inheritPrototype(PropSupplySet, GameObjectSet);

PropSupplySet.prototype.update = function(Hero1,Hero2) {
    
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
    SupplyCalculator = SupplyCalculator+1;
    if(SupplyCalculator ===  500){
        var d = new PropSupply(this.kPropSupplySheet, 100*Math.random(), 120);
        this.addToSet(d);
        SupplyCalculator =  0;
    }
    
};
