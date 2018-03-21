"use strict";

function Beam (x, y, dir, damage, lgtSet, speed, target, homingRate) {

    // Setup the beam renderable
    var r = new LightRenderable(Projectile.kProjectileTextures);
    r.getXform().setSize(0.5, 1);
    r.setSpriteSequence(90, 152, 14, 14, 1, 0);

    // Call the projectile constructor
    Projectile.call(this, r, x, y, dir, damage, lgtSet, speed);
}
gEngine.Core.inheritPrototype(Beam, Projectile);
