/* 
 * File: Grenade.js
 * Created by phreeze Tang 25/7/2017
 * Defined the throw-able things in battle scene.
 * 
 * change log:
 * 25/7/2017 create the file
 * 27/7/2017 reconfiguration, add explode, damage define, wind effect.
 */

/* global GameObject, gEngine, vec2 */

"use strict";  

function Grenade (
    grenadeTexture, 
    posX, posY,
    radius,
    angle,
    owner, 
    damagePerHit,
    isexplode
) {
    
    
    // the grenade is designed to be rotate randomly to increase "fun".
    // now the grenade is static
    
    
    this.mGrenade = new SpriteRenderable(grenadeTexture);
    //this.mGrenade.setColor([1.0, 1.0, 1.0, 0.0]);
    if (owner === 1) this.mGrenade.setColor([1.0, 0.0, 0.0, 0.2]);
    else if (owner === 2) this.mGrenade.setColor([0.0, 0.0, 1.0, 0.2]);
    this.mGrenade.getXform().setPosition(posX, posY);
    this.mGrenade.getXform().setSize(radius * 2, radius * 2);
    this.mGrenade.setElementPixelPositions(0, 256, 0, 256);
    
    this.sOwnerIndex = owner;
    this.sIsExplode = isexplode;
    this.sDamagePerHit = damagePerHit;
    
    GameObject.call(this, this.mGrenade);
    var r = new RigidCircle(this.getXform(), radius);
    r.setMass(1);
    r.setRestitution(1); // what's this
    r.setColor([1.0, 0.0, 0.0, 1.0]);
    //r.setDrawBounds(true);
    r.setDrawBounds(false);
    this.setPhysicsComponent(r);
    
    // set the init speed
    var initVelocity = 32;
    var v = this.getPhysicsComponent().getVelocity();
    v[0] = initVelocity * Math.cos(angle / 180 * Math.PI);
    v[1] = initVelocity * Math.sin(angle / 180 * Math.PI);
}
gEngine.Core.inheritPrototype(Grenade, GameObject);


// Grenade.prototype.draw temporarily nothing to be changed.


Grenade.prototype.update = function () {
    //var a = this.getPhysicsComponent().getAcceleration();
    //a = vec2.fromValues(100, 100);
    GameObject.prototype.update.call(this);
};
