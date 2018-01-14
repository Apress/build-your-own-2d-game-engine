/* File: Hero.js 
 *
 * Creates and initializes the Hero (Dye)
 * overrides the update function of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, GameObject, SpriteRenderable, RigidCircle, RigidRectangle, Particle */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Hero(spriteTexture, atX, atY) {
    this.kXDelta = 1;
    this.kYDelta = 2.0;
    this.mDye = new SpriteRenderable(spriteTexture);
    this.mDye.setColor([1, 1, 1, 0]);
    this.mDye.getXform().setPosition(atX, atY);
    this.mDye.getXform().setSize(18, 24);
    this.mDye.setElementPixelPositions(0, 120, 0, 180);
    GameObject.call(this, this.mDye);
    var r = new RigidRectangle(this.getXform(), 16, 22);
    r.setMass(0.7);  // less dense than Minions
    r.setRestitution(0.3);
    r.setColor([0, 1, 0, 1]);
    r.setDrawBounds(true);
    this.setPhysicsComponent(r);
}
gEngine.Core.inheritPrototype(Hero, GameObject);

Hero.prototype.update = function (dyePacks, allParticles, func) {
    // must call super class update
    GameObject.prototype.update.call(this);

    // control by WASD
    var v = this.getPhysicsComponent().getVelocity();
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W)) {
        v[1] += this.kYDelta;
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S)) {
        v[1] -= this.kYDelta;
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)) {
        v[0] -= this.kXDelta;
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
        v[0] += this.kXDelta;
    }
    
    // now interact with the dyePack ...
    var i, obj, collisionPt = [0, 0];
    
    var p = this.getXform().getPosition();
    for (i=0; i<dyePacks.size(); i++) {
        obj = dyePacks.getObjectAt(i);
        // chase after hero
        obj.rotateObjPointTo(p, 0.8);
        if (obj.pixelTouches(this, collisionPt)) {
            dyePacks.removeFromSet(obj);
            allParticles.addEmitterAt(collisionPt, 200, func);
        }
    }
};