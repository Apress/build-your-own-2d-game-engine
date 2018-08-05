/* File: WASD_Obj.js
 *
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!
var kWASDDelta = 0.3;

var offset = new Array();
var id;
offset = [0,0,0,0,0,0,0,0,0];

function WASDObj() {
}
gEngine.Core.inheritPrototype(WASDObj, GameObject);

WASDObj.prototype.keyControl = function () {
    this.getRigidBody().userSetsState();
};