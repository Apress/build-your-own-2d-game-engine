/* File: DyePack.js 
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObjectSet */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!
function ShowSet(sprite) {
    GameObjectSet.call(this);
    this.kShowSheet = sprite;
}
gEngine.Core.inheritPrototype(ShowSet, GameObjectSet);

ShowSet.prototype.update = function(Num1,Num2,height) {
    

    this.mSet = [];
    for(var i = 0; i<Num1; i++){
        var b = new Show(this.kShowSheet, 2.5+2.5*i, height);
        this.addToSet(b);
    }
    for(var i = 0; i<Num2; i++){
        var b = new Show(this.kShowSheet, 97.5-2.5*i, height);
        this.addToSet(b);
    }
   
};