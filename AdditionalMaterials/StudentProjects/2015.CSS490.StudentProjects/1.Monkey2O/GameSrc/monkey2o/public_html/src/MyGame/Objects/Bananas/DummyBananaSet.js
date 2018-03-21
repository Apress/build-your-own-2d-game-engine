'use strict';

function DummyBananaSet(options) {
  GameObjectSet.call(this);
  
  this.mTexture = options.texture;
  this.mNormalMap = options.normalMap;
  this.mPosition = options.position;
  this.mHUD = options.hud;
};

//------------------------------------------------------------------------------
gEngine.Core.inheritPrototype(DummyBananaSet, GameObjectSet);

//------------------------------------------------------------------------------
DummyBananaSet.prototype.update = function() {
  GameObjectSet.prototype.update.call(this);
  
  var scoreBanana = this.mHUD.getScoreBanana();
  var scoreBananaXForm = scoreBanana.getXform();
  var scoreBananaPos = scoreBananaXForm.getPosition();
  
  var scoreBananaVector = vec2.fromValues(scoreBananaPos[0], scoreBananaPos[1]);

  for(var i = 0; i < this.mSet.length; i++) {
    var bananaWCXForm = Utilities.calcChildWCTransform(this.mTransform, this.mSet[i].getXform());
    var bananaWCPos = bananaWCXForm.getPosition();
    var bananaVector = vec2.fromValues(bananaWCPos[0], bananaWCPos[1]);
    
    var dirVec = vec2.create();
    vec2.subtract(dirVec, scoreBananaVector, bananaVector);
    vec2.normalize(dirVec, dirVec);

    var bananaXForm = this.mSet[i].getXform();
    
    bananaXForm.incXPosBy(dirVec[0] * 0.4 * 2);
    bananaXForm.incYPosBy(dirVec[1] * 0.8 * 2);
    
    if(Math.abs(scoreBananaPos[0] - bananaWCPos[0]) < 1 && Math.abs(scoreBananaPos[1] - bananaWCPos[1]) < 1) {
      this.removeFromSet(this.mSet[i]);
    }
  }
};

