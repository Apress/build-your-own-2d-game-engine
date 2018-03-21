/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function Sign(spriteTexture, normalMap, atX, atY) {
    if(normalMap !== null) {
        this.mDye = new IllumRenderable(spriteTexture, normalMap);
    } else {
        this.mDye = new LightRenderable(spriteTexture);
    }
    this.mDye.setColor([1, 1, 1, 0]);
    this.mDye.getXform().setPosition(atX, atY);
    this.mDye.getXform().setSize(2, 2);
    this.mDye.setElementPixelPositions(0, 64, 0, 64);
    GameObject.call(this, this.mDye);
    this.setVisibility(true);
}
gEngine.Core.inheritPrototype(Sign, GameObject);