/* File: DyePack.js 
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObjectSet */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!
var PointCalculator = 0;
function PointSet(sprite) {
    GameObjectSet.call(this);
    this.kPointSheet = sprite;
}
gEngine.Core.inheritPrototype(PointSet, GameObjectSet);

PointSet.prototype.update = function(Hero1,Hero2) {
    
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
    PointCalculator = PointCalculator+1;
    if(PointCalculator ===  100){
        var d = new Point(this.kPointSheet, 100*Math.random(), 120);
        this.addToSet(d);
        PointCalculator =  0;
    }
    
};
