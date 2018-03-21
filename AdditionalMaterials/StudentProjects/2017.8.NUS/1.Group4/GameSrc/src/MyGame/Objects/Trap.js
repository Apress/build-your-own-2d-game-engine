/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



/* global GameObject, gEngine */

function Trap(texture, atX, atY, width, height) {
    this.mTrap = new TextureRenderable(texture);

    this.mTrap.setColor([1, 1, 1, 0]);
    this.mTrap.getXform().setPosition(atX, atY);
    this.mTrap.getXform().setSize(width, height);
    
    this.ifTouchHero = false;
    
    GameObject.call(this, this.mTrap);
}
gEngine.Core.inheritPrototype(Trap, GameObject);

Trap.prototype.touchHeroDetection = function(hero) {
    var heroPos = hero.getXform().getPosition();
    
    var thisPos = this.mTrap.getXform().getPosition();
    var thisSize = this.mTrap.getXform().getSize();
    
    var min_X = thisPos[0] - thisSize[0] / 2;
    var max_X = thisPos[0] + thisSize[0] / 2;
    var min_Y = thisPos[1] - thisSize[1] / 2;
    var max_Y = thisPos[1] + thisSize[1] / 2;
    
    if((heroPos[0] >= min_X && heroPos[0] <= max_X) && (heroPos[1] >= min_Y && heroPos[1] <= max_Y)) {
        this.ifTouchHero = true;
    }
};

Trap.prototype.getTouchHeroResult = function() {
    return this.ifTouchHero;
};