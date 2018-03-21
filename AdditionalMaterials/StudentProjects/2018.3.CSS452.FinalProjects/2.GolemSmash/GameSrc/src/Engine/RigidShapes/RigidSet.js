/** 
 * File: RigidSet.js
 * 
 * RigidSet is a collection of rigidshapes for one object.
 */

/*jslint node: true, vars: true, evil: true, bitwise: true */
"use strict";

/* global gEngine, vec2, Transform, RigidRectangle, RigidCircle, RigidShape */

function RigidSet() {
    this.mRigidBodySet = {};
}

RigidSet.prototype.insert = function (key, emptyRigidGameObject) {
    this.mRigidBodySet[key] = emptyRigidGameObject;
};

RigidSet.prototype.get = function (key) {
    return this.mRigidBodySet[key];
};

RigidSet.prototype.size = function () {
    return this.mRigidBodySet.length;
};

RigidSet.prototype.update = function () {            
    for (var elem in this.mRigidBodySet) {
        this.mRigidBodySet[elem].update();
    }
};

RigidSet.prototype.draw = function (camera) {
    for (var elem in this.mRigidBodySet) {
        this.mRigidBodySet[elem].draw(camera);
    }
};

RigidSet.prototype.execFuncForAll = function (func, params) {
    for (var elem in this.mRigidBodySet) {
        func.call(this.get(elem), params);
    }
};

RigidSet.prototype.purgeOffsets = function (flip) {
    for (var elem in this.mRigidBodySet) {
        this.mRigidBodySet[elem].purgeOffsets(flip);
    }
};