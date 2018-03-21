/* File: DyePack.js 
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObjectSet */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declare before used!

function ProjectileSet() {
    GameObjectSet.call(this);
    this.obj=new GameObjectSet();
    
     this.kcollision = "assets/sounds/collision2.mp3";
}
gEngine.Core.inheritPrototype(ProjectileSet, GameObjectSet);

ProjectileSet.prototype.loadScene = function (){
    gEngine.AudioClips.loadAudio(this.kcollision);
};

ProjectileSet.prototype.unloadScene = function (){
    gEngine.AudioClips.stopBackgroundAudio();
    gEngine.AudioClips.unloadAudio(this.kcollision);
};

ProjectileSet.prototype.update = function(Hero,mAllParticles,func,mHero,dyes, aCamera) {
    // remove the expired ones
    var i,collisionPt = [0, 0];
    var rate=1;
    var numHit = 0;
    for (i=0; i<this.size(); i++) {
        this.obj = this.getObjectAt(i);
        if (this.obj.hasExpired())
            this.removeFromSet(this.obj);
       if (this.obj.pixelTouches(Hero, collisionPt)&&invincible===0) {
            this.removeFromSet(this.obj);
                gEngine.AudioClips.playACue(this.kcollision);
            Hero.die(); 
            mAllParticles.addEmitterAt(collisionPt, 200, func);
        }
    }
    
    // update all objects
    for (i=0; i<this.size(); i++) {
        this.obj = this.getObjectAt(i);
        if (this.obj.update(Hero,mAllParticles,func,dyes, aCamera))
            numHit++;
    }
    return numHit;
};

ProjectileSet.prototype.newAt = function(pos) {
    var rate=1;
    var p = new Projectile(pos[0], pos[1]);
    this.addToSet(p);
};

