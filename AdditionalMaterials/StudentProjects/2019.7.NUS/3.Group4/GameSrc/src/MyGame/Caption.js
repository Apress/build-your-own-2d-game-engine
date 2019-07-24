/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

"use strict";  // Operate in Strict mode such that variables must be declared before used!


function Caption(spriteTexture, posX, posY) {
    gEngine.Textures.loadTexture("assets/menu.png");
    gEngine.Textures.loadTexture("assets/logo1.png");
    
    this.mCaption1 = new SpriteRenderable(spriteTexture);
    //this.mDye.setColor([1, 1, 1, 0]);
    this.mCaption1.getXform().setPosition(50, 50);
    this.mCaption1.getXform().setSize(0, 0);
//    this.mCaption1.setColorArray([1,1,1,1]);
    this.TriggerPosX = posX;
    this.TriggerPosY = posY;
    this.isRead = false;
    //this.mDye.setElementPixelPositions(0, 120, 0, 180);
    GameObject.call(this, this.mCaption1);
    
}

gEngine.Core.inheritPrototype(Caption, GameObject);

Caption.prototype.update = function () {

};
