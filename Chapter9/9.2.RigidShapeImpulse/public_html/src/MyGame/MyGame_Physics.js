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
    
    // Hero Minion
    gEngine.Physics.processObjSet(this.mHero, this.mAllMinions);
    
    // Minion platform
    gEngine.Physics.processSetSet(this.mAllMinions, this.mAllPlatforms);
    
    // DyePack platform
    gEngine.Physics.processSetSet(this.mAllDyePacks, this.mAllPlatforms);
    
    // DyePack Minions
    gEngine.Physics.processSetSet(this.mAllDyePacks, this.mAllMinions);
    
    // Hero DyePack
    gEngine.Physics.processObjSet(this.mHero, this.mAllDyePacks);
    
    // all rigid shapes
    gEngine.Physics.processSetSet(this.mAllRigidShapes, this.mAllPlatforms);
    gEngine.Physics.processSelfSet(this.mAllRigidShapes);
    
    // add rigid shapes if keys are pressed
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Z)) {
        var c = new Minion(this.kMinionSprite, this.mCamera.mouseWCX(), this.mCamera.mouseWCY());
        var p = c.getPhysicsComponent();
        p.setAcceleration(gEngine.Physics.getSystemtAcceleration());
        p.setColor([1, 1, 1, 1]);
        this.mAllRigidShapes.addToSet(c);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.C)) {
        // Give all rigid shape a random velocity
        var i = 0, s, v;
        for (i=0; i<this.mAllRigidShapes.size(); i++) {
            s = this.mAllRigidShapes.getObjectAt(i).getPhysicsComponent();
            v = s.getVelocity();
            v[0] += (Math.random()-0.5)*10;
            v[1] += (Math.random()-0.5)*10;
        }
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.V)) {
        this.mAllRigidShapes = new GameObjectSet();
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.X)) {
        // find the current rigid shape under the mouse and move it with the mouse
        var i = 0, s;
        var pos = vec2.fromValues(this.mCamera.mouseWCX(), this.mCamera.mouseWCY());
        var found = false;
        while ((i<this.mAllRigidShapes.size()) && (!found)) {
            s = this.mAllRigidShapes.getObjectAt(i).getPhysicsComponent();
            found = s.containsPos(pos);
            i++;
        }
        if (found) {
            s.setPosition(pos[0], pos[1]);
        }
    }
};
