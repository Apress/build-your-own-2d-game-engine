/* File: DyePack.js 
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObjectSet */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function ProjectileSet(number) {
    GameObjectSet.call(this);
    this.number = number;
    
}
gEngine.Core.inheritPrototype(ProjectileSet, GameObjectSet);

ProjectileSet.prototype.update = function(Hero, StoneSet, allParticles, func, aCamera) {
    // remove the expired ones
    var i, obj;
    var numHit = 0;
    for (i=0; i<this.size(); i++) {
        obj = this.getObjectAt(i);
        if (obj.hasExpired())
            this.removeFromSet(obj);
    }
    
    // update all objects
    for (i=0; i<this.size(); i++) {
        obj = this.getObjectAt(i);
        if (obj.update(Hero, StoneSet, allParticles, func, aCamera))
            numHit++;
    }
    return numHit;
};

ProjectileSet.prototype.newAt = function(pos, Power,Speed, Num, HeroType) {
    switch(Num) {
    case 3:
        var p1 = new Projectile(pos[0], pos[1],Power,Speed,0, -1,HeroType);
        p1.getXform().incRotationByDegree(0);
        var p2 = new Projectile(pos[0], pos[1],Power,Speed,1, 0.577,HeroType);
        p2.getXform().incRotationByDegree(120);
        var p3 = new Projectile(pos[0], pos[1],Power,Speed,-1, 0.577,HeroType);
        p3.getXform().incRotationByDegree(-120);
        this.addToSet(p1);
        this.addToSet(p2);
        this.addToSet(p3);
        break;
    case 4:
        var p1 = new Projectile(pos[0], pos[1],Power,Speed,1, 1,HeroType);
        p1.getXform().incRotationByDegree(135);
        var p2 = new Projectile(pos[0], pos[1],Power,Speed,-1, 1, HeroType);
        p2.getXform().incRotationByDegree(225);
        var p3 = new Projectile(pos[0], pos[1],Power,Speed,1, -1, HeroType);
        p3.getXform().incRotationByDegree(45);
        var p4 = new Projectile(pos[0], pos[1],Power,Speed,-1, -1,HeroType);
        p4.getXform().incRotationByDegree(-45);
        this.addToSet(p1);
        this.addToSet(p2);
        this.addToSet(p3);
        this.addToSet(p4);
        break;
    case 5:
        var p1 = new Projectile(pos[0], pos[1],Power,Speed,0, -1,HeroType);
        p1.getXform().incRotationByDegree(0);
        this.addToSet(p1);
        var p2 = new Projectile(pos[0], pos[1],Power,Speed,-1, -0.325,HeroType);
        p2.getXform().incRotationByDegree(-72);
        this.addToSet(p2);
        var p3 = new Projectile(pos[0], pos[1],Power,Speed, 1, -0.325,HeroType);
        p3.getXform().incRotationByDegree(72);
        this.addToSet(p3);
        var p4 = new Projectile(pos[0], pos[1],Power,Speed, 1, 1.428,HeroType);
        p4.getXform().incRotationByDegree(144);
        this.addToSet(p4);
        var p5 = new Projectile(pos[0], pos[1],Power,Speed, -1, 1.428,HeroType);
        p5.getXform().incRotationByDegree(-144);
        this.addToSet(p5);
        break;

    default:
       
}
//    var p1 = new Projectile(pos[0], pos[1],Power,Speed,0, -1);
//    this.addToSet(p1);
//    var p2 = new Projectile(pos[0], pos[1],Power,Speed,-1, -0.325);
//    this.addToSet(p2);
//    var p3 = new Projectile(pos[0], pos[1],Power,Speed, 1, -0.325);
//    this.addToSet(p3);
//    var p4 = new Projectile(pos[0], pos[1],Power,Speed, 1, 1.428);
//    this.addToSet(p4);
//    var p5 = new Projectile(pos[0], pos[1],Power,Speed, -1, 1.428);
//    this.addToSet(p5);
};