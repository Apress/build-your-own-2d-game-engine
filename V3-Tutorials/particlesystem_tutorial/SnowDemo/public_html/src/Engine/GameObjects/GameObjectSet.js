/* File: GameObjectSet.js 
 *
 * Support for working with a set of GameObjects
 */

/*jslint node: true, vars: true */
/*global  */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

/**
 * Default Constructor<p>
 * Support for working with a set of GameObjects
 * @returns {GameObjectSet} New instance of GameObjectSet
 * @class GameObjectSet
 */
function GameObjectSet() {
    this.mSet = [];
}

/**
 * Return the count of GameObjects in set
 * @returns {Number} count of GameObjects in set
 * @memberOf GameObjectSet
 */
GameObjectSet.prototype.size = function () { return this.mSet.length; };

/**
 * Return the GameObject at index
 * @param {Number} index of GameObject to return
 * @returns {GameObject}
 * @memberOf GameObjectSet
 */
GameObjectSet.prototype.getObjectAt = function (index) {
    return this.mSet[index];
};

/**
 * Add GameObject to this GameObjectSet
 * @param {GameObject} obj to add to this GameObjectSet
 * @returns {void}
 * @memberOf GameObjectSet
 */
GameObjectSet.prototype.addToSet = function (obj) {
    this.mSet.push(obj);
};

/**
 * Remove GameObject from GameObjectSet
 * @param {GameObject} obj to remove from GameObjectSet
 * @returns {void}
 * @memberOf GameObjectSet
 */
GameObjectSet.prototype.removeFromSet = function (obj) {
    var index = this.mSet.indexOf(obj);
    if (index > -1)
        this.mSet.splice(index, 1);
};

/**
 * Move GameObject to end of GameObjectSet
 * @param {GameObjec} obj to move to end of GameObjectSet
 * @returns {void}
 * @memberOf GameObjectSet
 */
GameObjectSet.prototype.moveToLast = function (obj) {
    this.removeFromSet(obj);
    this.addToSet(obj);
};

/**
 * Update function called by GameLoop calls all GameObject's in GameObjectSet
 * @returns {void}
 * @memberOf GameObjectSet
 */
GameObjectSet.prototype.update = function () {
    var i;
    for (i = 0; i < this.mSet.length; i++) {
        this.mSet[i].update();
    }
};

/**
 * Draw function called by GameLoop calls all GameObject's in GameObjectSet
 * @param {type} aCamera
 * @returns {undefined}
 * @memberOf GameObjectSet
 */
GameObjectSet.prototype.draw = function (aCamera) {
    var i;
    for (i = 0; i < this.mSet.length; i++) {
        this.mSet[i].draw(aCamera);
    }
};
