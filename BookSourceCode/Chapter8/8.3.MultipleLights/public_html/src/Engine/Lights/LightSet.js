/* File: LightSet.js 
 *
 * Support for working with a set of Lights
 */

/*jslint node: true, vars: true */
/*global  */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function LightSet() {
    this.mSet = [];
}

LightSet.prototype.numLights = function () { return this.mSet.length; };

LightSet.prototype.getLightAt = function (index) {
    return this.mSet[index];
};

LightSet.prototype.addToSet = function (light) {
    this.mSet.push(light);
};