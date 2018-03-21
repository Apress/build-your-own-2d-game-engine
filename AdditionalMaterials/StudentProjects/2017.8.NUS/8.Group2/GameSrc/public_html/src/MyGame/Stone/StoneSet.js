/* File: DyePack.js 
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObjectSet */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!
var StoneCalculator = 0;
function StoneSet(sprite) {
    GameObjectSet.call(this);
    this.kStoneSheet = sprite;
}
gEngine.Core.inheritPrototype(StoneSet, GameObjectSet);

StoneSet.prototype.update = function() {
    
    // remove the expired ones
    var i, obj;
    for (i=0; i<this.size(); i++) {
        obj = this.getObjectAt(i);
        if(obj.mHP <= 0){
            obj.setExpired();
        }
        if (obj.hasExpired())
            this.removeFromSet(obj);
    }
    
    // update all objects
    for (i=0; i<this.size(); i++) {
        obj = this.getObjectAt(i);
        obj.update();
    }
    
    //Create stone randomly
    StoneCalculator = StoneCalculator+1;
    if(StoneCalculator ===  20){
        var d = new Stone(this.kStoneSheet, 100*Math.random(), 140, Math.random());
        this.addToSet(d);
        StoneCalculator =  0;
    }
    
    
    
};
