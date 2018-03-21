/* File: DyePack.js
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObjectSet */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

PowerUpSet.kShotGunTexture = null;
PowerUpSet.kBigShotTexture = null;
PowerUpSet.kBubbleTexture = null;

function PowerUpSet() {
    GameObjectSet.call(this);
    this.mPowerUpLife = 0;
}
gEngine.Core.inheritPrototype(PowerUpSet, GameObjectSet);

PowerUpSet.prototype.update = function(aCamera, theHero) {

    // remove the expired ones
    var i, obj;
    for (i = 0; i < this.size(); i++) {
        obj = this.getObjectAt(i);
        if (obj.hasExpired()){
            this.removeFromSet(obj);
        } else {
            obj.update(aCamera, theHero);
        }
    }
    obj = null;
    for (i = 0; i < this.size(); i++) {
        obj = this.getObjectAt(i);
        if (obj.pixelTouches(theHero, [0, 0])) {
            this.removeFromSet(obj);
            theHero.setPowerUp(obj.getPowerUp());
        }
    }
};


// create a power up 50% of the time at location
PowerUpSet.prototype.generateChanceAt = function(pos) {

    var rand = Math.random();
    if (rand > 0.33)
        return;
    rand = Math.random();
    // about the same chance for 3 power ups
    if (rand < 0.33) {
        var p = new ShotGunPowerUp(PowerUpSet.kShotGunTexture, pos[0], pos[1]);
        this.addToSet(p);
    } else if (0.33 <= rand && rand <= 0.66) {
        var p = new BigShotPowerUp(PowerUpSet.kBigShotTexture, pos[0], pos[1]);
        this.addToSet(p);
    } else {
        var p = new BubbleBarrierPowerUp(PowerUpSet.kBubbleTexture, pos[0], pos[1]);
        this.addToSet(p);
    }
};

