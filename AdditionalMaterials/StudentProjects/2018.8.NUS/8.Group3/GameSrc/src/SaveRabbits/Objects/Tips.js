
"use strict";

function Tips(TipsTexture,pos) {
    var mTipsTexture = new TextureRenderable(TipsTexture);
    GameObject.call(this,mTipsTexture);
    this.getXform().setSize(50,25);
    this.getXform().setPosition(pos[0]+25,pos[1]+100);
}
gEngine.Core.inheritPrototype(Tips,GameObject);



