/* 
 * File: 		GameObjectSet.js 
 * Author:      	Ryu Muthui
 * Last Date Modified: 	11/19/2015
 * Description:		Support for working with a set of GameObjects
 */

/*jslint node: true, vars: true */
/*global*/
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

"use strict";  // Operate in Strict mode such that variables must be declared before used!


function GameObjectSet() {
    this.mSet = [];
}

GameObjectSet.prototype.size = function () { return this.mSet.length; };

GameObjectSet.prototype.getObjectAt = function (index) {
    return this.mSet[index];
};

GameObjectSet.prototype.addToSet = function (obj) {
    this.mSet.push(obj);
};

GameObjectSet.prototype.removeFromSet = function (obj) {
    var index = this.mSet.indexOf(obj);
    if (index > -1)
        this.mSet.splice(index, 1);
};

GameObjectSet.prototype.moveToLast = function (obj) {
    this.removeFromSet(obj);
    this.addToSet(obj);
};

GameObjectSet.prototype.update = function (hero) {
    var i;
    for (i = 0; i < this.mSet.length; i++) {
        this.mSet[i].update(hero);
    }
};

GameObjectSet.prototype.draw = function (aCamera) {
    var i;
    for (i = 0; i < this.mSet.length; i++) {
        this.mSet[i].draw(aCamera);
    }
};
