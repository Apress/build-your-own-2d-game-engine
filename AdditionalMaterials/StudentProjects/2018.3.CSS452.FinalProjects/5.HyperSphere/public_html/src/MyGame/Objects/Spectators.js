"use strict";

function Spectators(standsTexture, spectatorTexture, pos) {

  this.kSpectatorTexture = spectatorTexture;
  this.mShake = new ShakePosition(0,0,0,0);

  this.mStands = new TextureRenderable(standsTexture);
  this.mStands.setColor([1, 1, 1, 0]);
  this.mStands.getXform().setPosition(pos[0], pos[1]);
  this.mStands.getXform().setSize(150, 20);
  GameObject.call(this, this.mStands);

	GameObjectSet.call(this);
  this.addToSet(this.mStands);
}
gEngine.Core.inheritPrototype(Spectators, GameObjectSet);

Spectators.prototype.fillStands = function(members) {
  let i = 0;
  for (; i <= members; i++){
    this.addToSet(new Spectator(this.kSpectatorTexture, this.mStands.getXform().getPosition()));
  }
}

Spectators.prototype.celebrate = function() {
  let i = 1;
  for (; i < this.mSet.length; i++) {
    this.mSet[i].celebrate();
  }
}
