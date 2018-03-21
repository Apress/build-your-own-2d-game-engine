/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function BackGround(spriteTexture) {
    this.mBG = new SpriteRenderable(spriteTexture);
    this.mBG.setColor(vec4.fromValues(0, 0, 0, 0));
    this.mBG.getXform().setPosition(64, 32);
    this.mBG.getXform().setSize(128, 72);
    this.mBG.setElementPixelPositions(0, 1024, 0, 512);
    
    GameObject.call(this, this.mBG);
}
gEngine.Core.inheritPrototype(BackGround, GameObject);
