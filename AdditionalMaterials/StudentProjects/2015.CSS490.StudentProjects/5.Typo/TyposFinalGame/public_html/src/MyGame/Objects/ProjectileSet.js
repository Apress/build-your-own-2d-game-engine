/* File: 		ProjectileSet.js
 * Author:      	Ryu Muthui
 * Last Date Modified: 	12/15/2015
 * Description:		Logic for housing porjectiles. */
"use strict"; 

function ProjectileSet(owner) {
    GameObjectSet.call(this);
    this.mOwner = owner;
}
gEngine.Core.inheritPrototype(ProjectileSet, GameObjectSet);

ProjectileSet.prototype.update = function(target, aCamera, particles) {
    // remove the expired ones
    var i, obj;
    for (i=0; i<this.size(); i++) {
        obj = this.getObjectAt(i);
        if (obj.hasExpired()){
            this.removeFromSet(obj);
        }
    }
    
    // update all objects
    for (i=0; i<this.size(); i++) {
        obj = this.getObjectAt(i);
        obj.update(target, aCamera, particles);
    }
};

ProjectileSet.prototype.newAt = function(pos, rot) {
    var p = new Projectile(pos[0], pos[1], this.mOwner);
    p.getXform().setRotationInRad(this.mOwner.getXform().getRotationInRad());
    if (rot !== undefined) {
	vec2.rotate(p.getCurrentFrontDir(), p.getCurrentFrontDir(), rot);
	p.getXform().incRotationByRad(rot);
    }
    this.addToSet(p);
};

ProjectileSet.prototype.draw = function (aCamera) {
    var i;
    for (i = 0; i < this.mSet.length; i++) {
        this.mSet[i].draw(aCamera);
    }
};

ProjectileSet.prototype.getLength = function() { return this.mSet.length; };