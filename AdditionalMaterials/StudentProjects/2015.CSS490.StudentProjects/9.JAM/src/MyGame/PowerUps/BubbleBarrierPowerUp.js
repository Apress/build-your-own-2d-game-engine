/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


"use strict";  // Operate in Strict mode such that variables must be declared before used!

function BubbleBarrierPowerUp(spriteTexture, atX, atY) {
    var rend = new LightRenderable(spriteTexture);
    rend.getXform().setSize(5, 5);
    rend.getXform().setPosition(atX, atY);
    PowerUp.call(this);
    GameObject.call(this, rend);
    this.setPowerUp(HeroGroup.eHeroGroupState.eBarrier);
}
gEngine.Core.inheritPrototype(BubbleBarrierPowerUp, PowerUp);