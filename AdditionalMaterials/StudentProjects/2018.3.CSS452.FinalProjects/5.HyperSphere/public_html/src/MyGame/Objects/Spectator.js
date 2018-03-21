"use strict";

function Spectator(spriteTexture, standsPos) {
    this.mShake = new ShakePosition(0,0,0,0);

    this.mSpectator = new TextureRenderable(spriteTexture);
    this.mSpectator.setColor([1, 1, 1, 0]);
    this.mSpectator.getXform().setPosition(standsPos[0] + Math.random() * 150 - 75, standsPos[1] + Math.random() * 20 - 10);
    this.mSpectator.getXform().setSize(5, 5);
    GameObject.call(this, this.mSpectator);

    this.kYOrigin = this.mSpectator.getXform().getYPos();
}
gEngine.Core.inheritPrototype(Spectator, GameObject);

Spectator.prototype.celebrate = function() {
  this.mShake = new ShakePosition(0, Math.random() * 2, Math.random() * 200, Math.random() * 200);
}

Spectator.prototype.update = function() {
  let spec = this.mSpectator.getXform();
  let shakeResults = this.mShake.getShakeResults();
  spec.setYPos(this.kYOrigin + shakeResults[1]);
}
