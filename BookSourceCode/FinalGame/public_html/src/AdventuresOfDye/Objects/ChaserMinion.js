"use strict";

function ChaserMinion(atX, atY, velocity, movementRange, type, texture, normal, lightSet, w, h) {
    this.kOffset = 4.7;
    this.kShootTimer = 90;

    Minion.call(this, atX, atY, velocity, movementRange, type, texture, normal, lightSet, w, h);   

    this.setSpeed(this.kSpeed);
    this.setCurrentFrontDir([0, 1]);

}
gEngine.Core.inheritPrototype(ChaserMinion, Minion);

ChaserMinion.prototype.update = function (target) {
    Minion.prototype.update.call(this);
    var p = target.getXform().getPosition();
    this.rotateObjPointTo(p, 0.08);
};



