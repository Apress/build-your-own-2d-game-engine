/* File: Projectile.js
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, Renderable, vec2 */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!
// across the entire screen in 0.5 seconds
function BigShot(x, y, light) {
    Projectile.call(this, x + 20, y, light);
    this.getXform().setSize(40, 40);
    this.setSpeed(0.7);
    light.setFar(25);
    light.setNear(15);
}
gEngine.Core.inheritPrototype(BigShot, Projectile);

BigShot.prototype.update = function(dyes, dyes2, dyes3Set, particle, func, aCamera, powerUpSet) {
    GameObject.prototype.update.call(this);
    this.mLight.setXPos(this.getXform().getXPos());
    this.mLight.setYPos(this.getXform().getYPos());
    var hit = false;

    if (aCamera.collideWCBound(this.getXform(), 1.1) === BoundingBox.eboundCollideStatus.eOutside)
        this.setExpired();

    var i, obj;
    var p = vec2.fromValues(0, 0);
    for (i=0; i<dyes.size(); i++) {
        obj = dyes.getObjectAt(i);
        if (this.pixelTouches(obj, p)) {
            //particle.addEmitterAt(p, 200, func);
            obj.hitOnce();
            hit = true;
        }
    }

    var j;
    for (j=0; j<dyes2.size(); j++) {
        obj = dyes2.getObjectAt(j);
        if (this.pixelTouches(obj, p)) {
            //particle.addEmitterAt(p, 200, func);
            obj.setExpired();
            hit = true;
            powerUpSet.generateChanceAt(p);
        }
    }

    var q;
    for(q=0;q<10;q++){
        var dyes3 = dyes3Set[q];
        var o;
        for (o=0; o<dyes3.size(); o++) {
            obj = dyes3.getObjectAt(o);
            if (this.pixelTouches(obj, p)) {
                //particle.addEmitterAt(p, 200, func);
                obj.setExpired();
                hit = true;
            }
        }
    }
    return hit;
};

