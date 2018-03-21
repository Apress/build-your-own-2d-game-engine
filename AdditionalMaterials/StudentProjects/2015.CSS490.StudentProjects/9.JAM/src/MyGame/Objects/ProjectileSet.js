/* File: DyePack.js 
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObjectSet */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function ProjectileSet(lightsource, normalShot, shotgunShot, bigShot) {
    this.ksNormalShot = normalShot;
    this.ksShotgunShot = shotgunShot;
    this.ksBigShot = bigShot;
    this.mLight = lightsource;
    GameObjectSet.call(this);
}
gEngine.Core.inheritPrototype(ProjectileSet, GameObjectSet);

ProjectileSet.prototype.update = function(dyes, dyes2, dyes3, particle, func, aCamera, powerUpSet) {
    // remove the expired ones
    var i, obj;
    var numHit = 0;
    for (i=0; i<this.size(); i++) {
        obj = this.getObjectAt(i);
        if (obj.hasExpired()){
            this.removeFromSet(obj);
            this.mLight.setLightTo(false);
        }
    }
    
    // update all objects
    for (i=0; i<this.size(); i++) {
        obj = this.getObjectAt(i);
        if (obj.update(dyes, dyes2, dyes3, particle, func, aCamera, powerUpSet))
            numHit++;
    }
    return numHit;
};

ProjectileSet.prototype.generateChanceAt = function(pos) {
    gEngine.AudioClips.playACue(this.ksNormalShot);
    var p = new Projectile(pos[0], pos[1], this.mLight);
    this.addToSet(p);
};

ProjectileSet.prototype.newBigShotAt = function(pos) {
    gEngine.AudioClips.playACue(this.ksBigShot);
    var p = new BigShot(pos[0], pos[1], this.mLight);
    this.addToSet(p);
};

ProjectileSet.prototype.newShootGunAt = function(pos) {
    gEngine.AudioClips.playACue(this.ksShotgunShot);

    var p1 = new Projectile(pos[0], pos[1], this.mLight, [0.5, 1]);
    var p2 = new Projectile(pos[0], pos[1], this.mLight, [1, 0.5]);
    var p3 = new Projectile(pos[0], pos[1], this.mLight, [1, 0]);
    var p4 = new Projectile(pos[0], pos[1], this.mLight, [1, -0.5]);
    var p5 = new Projectile(pos[0], pos[1], this.mLight, [0.5, -1]);
    var p6 = new Projectile(pos[0], pos[1], this.mLight, [1, 1]);
    var p7 = new Projectile(pos[0], pos[1], this.mLight, [1, -1]);
    var p8 = new Projectile(pos[0], pos[1], this.mLight, [1, 0.25]);
    var p9 = new Projectile(pos[0], pos[1], this.mLight, [1, -0.25]);
     
    this.addToSet(p1);
    this.addToSet(p2);
    this.addToSet(p3);
    this.addToSet(p4);
    this.addToSet(p5);
    this.addToSet(p6);
    this.addToSet(p7);
    this.addToSet(p8);
    this.addToSet(p9);
};

