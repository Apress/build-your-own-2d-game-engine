/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

"use strict";

function StartButton(atX,atY, resource) {
    
    GameObjectSet.call(this);
    this.mBg = new SpriteRenderable(resource);
    this.mBg.setElementPixelPositions(1405, 1632, (1024-942), (1024-674));
    this.mBg.setColor([1, 1, 1, 0]);
    this.mBg.getXform().setPosition(atX, atY);
    this.mBg.getXform().setSize(15,15);
    var g1 = new GameObject(this.mBg);
    
    this.mClickedBg = new SpriteRenderable(resource);
    this.mClickedBg.setElementPixelPositions(624, 848, (1024-940), (1024-670));
    this.mClickedBg.setColor([1, 1, 1, 0]);
    this.mClickedBg.getXform().setPosition(atX, atY);
    this.mClickedBg.getXform().setSize(15,15);
    var g2 = new GameObject(this.mClickedBg);
    g2.setVisibility(false);
   
    this.mSet.push(g1);
    this.mSet.push(g2);
    
}

gEngine.Core.inheritPrototype(StartButton, GameObjectSet);

StartButton.prototype.getButtonObj = function() { return this.mSet[0]; };

StartButton.prototype.hasBeenClicked = function () {
    this.mSet[0].setVisibility(false);
    this.mSet[1].setVisibility(true);
}


