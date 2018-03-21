/*
 * File: MyGame_Physics.js 
 * Relaxation support for behaviors
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, CollisionInfo, MyGame, RigidCircle, RigidRectangle, Transform, Minion, GameObjectSet, vec2 */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

MyGame.prototype._physicsSimulation = function() {
    
    // Hero platform
    gEngine.Physics.processObjSet(this.mHero, this.mAllPlatforms);

    // Enemy platform
    gEngine.Physics.processSetSet(this.mBlobs, this.mAllPlatforms);
};
