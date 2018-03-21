/*jslint node: true, vars: true */
/*global gEngine, GameObjectSet */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function ShotGunPowerUp(spriteTexture, atX, atY) {
    var rend = new LightRenderable(spriteTexture);
    rend.setElementPixelPositions(0, 256, 0, 64);
    rend.getXform().setSize(12, 3);
    rend.getXform().setPosition(atX, atY);
    PowerUp.call(this);
    GameObject.call(this, rend);
    this.setPowerUp(HeroGroup.eHeroShotType.eShotGun);
}
gEngine.Core.inheritPrototype(ShotGunPowerUp, PowerUp);
