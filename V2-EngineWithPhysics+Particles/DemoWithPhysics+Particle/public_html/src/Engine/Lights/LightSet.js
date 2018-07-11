/* File: LightSet.js 
 *
 * Support for working with a set of Lights
 */

/*jslint node: true, vars: true */
/*global  */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

/**
 * Support for working with a set of Lights
 * @returns {LightSet} New instance of LightSet
 * @class LightSet
 */
function LightSet() {
    this.mSet = [];
}

/**
 * Return the count of lights in set
 * @returns {Number} number of lights in set
 * @memberOf LightSet
 */
LightSet.prototype.numLights = function () { return this.mSet.length; };

/**
 * Return the light at index
 * @param {Number} index of light to return
 * @returns {Light} Light at index
 * @memberOf LightSet
 */
LightSet.prototype.getLightAt = function (index) {
    return this.mSet[index];
};

/**
 * Add a light to the current set
 * @param {Light} light to add to set
 * @returns {void}
 * @memberOf LightSet
 */
LightSet.prototype.addToSet = function (light) {
    this.mSet.push(light);
};