/* File: ShadowReceiverSet.js 
 *
 * Support for working with a set of ShadowReceivers
 */

/*jslint node: true, vars: true */
/*global  */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!


function ShadowReceiverSet() {
    this.mSet = [];
}

ShadowReceiverSet.prototype.size = function () { return this.mSet.length; };

ShadowReceiverSet.prototype.getObjectAt = function (index) {
    return this.mSet[index];
};

ShadowReceiverSet.prototype.addToSet = function (obj) {
    this.mSet.push(obj);
};

ShadowReceiverSet.prototype.removeFromSet = function (obj) {
    var index = this.mSet.indexOf(obj);
    if (index > -1)
        this.mSet.splice(index, 1);
};

ShadowReceiverSet.prototype.moveToLast = function (obj) {
    this.removeFromSet(obj);
    this.addToSet(obj);
};

ShadowReceiverSet.prototype.update = function () {
    var i;
    for (i = 0; i < this.mSet.length; i++) {
        this.mSet[i].update();
    }
};

ShadowReceiverSet.prototype.draw = function (aCamera) {
    var i;
    for (i = 0; i < this.mSet.length; i++) {
        this.mSet[i].draw(aCamera);
    }
};
