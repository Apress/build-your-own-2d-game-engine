/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

"use strict";

function StaticObj(spriteTexture, normalMap, atX, atY) {
    if(normalMap !== null) {
        this.mDye = new IllumRenderable(spriteTexture, normalMap);
    } else {
        this.mDye = new LightRenderable(spriteTexture);
    }
    
    this.mDye.setColor([1, 1, 1, 0]);
    this.mDye.getXform().setPosition(atX, atY);
    this.mDye.getXform().setSize(30, 30);
    GameObject.call(this, this.mDye);
    
    //this.size = this.getXform().getSize()[0];
}
gEngine.Core.inheritPrototype(StaticObj, GameObject);