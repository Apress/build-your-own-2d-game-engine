/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* global GameObject, gEngine */

function Catherine(spriteTexture, xPos, yPos, width, height, chaseSpeed, triggerDis) {
    this.mActress = new SpriteRenderable(spriteTexture);
    this.mActress.setColor([1, 1, 1, 0]);
    this.mActress.getXform().setPosition(xPos, yPos);
    this.mActress.getXform().setSize(width, height);
    this.mActress.setElementPixelPositions(0, this.mActress.getTextureWidth(), 0, this.mActress.getTextureHeight());
    
    this.ifCatchHero = false;
    this.chaseSpeed = chaseSpeed;
    this.triggerDis = triggerDis;
    
    GameObject.call(this, this.mActress);
    var r = new RigidRectangle(this.getXform(), this.mActress.getXform().getWidth(), this.mActress.getXform().getHeight());
    r.setMass(0.5);  // less dense than Minions
    r.setRestitution(0.3);
    r.setColor([0, 1, 0, 1]);
    r.setDrawBounds(false);
    this.setPhysicsComponent(r);
}

gEngine.Core.inheritPrototype(Catherine, GameObject);

Catherine.prototype.chaseHero = function (hero) {
    var heroPos = hero.getXform().getPosition();
    var thisPos = this.getXform().getPosition();
    var distance = Math.sqrt((Math.pow((heroPos[0] - thisPos[0]), 2) + Math.pow((heroPos[1] - thisPos[1]), 2)));

    if(distance <= this.triggerDis && distance > this.getXform().getWidth()) {
        this.moveTowards_H(hero, this.chaseSpeed);
    } else if (distance <= this.getXform().getWidth()) {
        this.ifCatchHero = true;
    }
};

Catherine.prototype.chaseHeroWithFlower = function (hero) {
    var heroPos = hero.getXform().getPosition();
    var thisPos = this.getXform().getPosition();
    var distance = Math.sqrt((Math.pow((heroPos[0] - thisPos[0]), 2) + Math.pow((heroPos[1] - thisPos[1]), 2)));

    if(distance <= this.triggerDis && distance > (this.getXform().getWidth() + 8)) {
        this.moveTowards_H(hero, this.chaseSpeed);
    } else if (distance <= (this.getXform().getWidth() + 8)) {
        this.ifCatchHero = true;
    }
};

Catherine.prototype.update = function() {
  GameObject.prototype.update.call(this);
};

Catherine.prototype.getCatchHeroResult = function() {
    return this.ifCatchHero;
};

Catherine.prototype.getFallingResult = function() {
    return this.getXform().getYPos() < -5;
};

Catherine.prototype.setChaseSpeed = function(chaseSpeed) {
    this.chaseSpeed = chaseSpeed;
};

Catherine.prototype.setTriggerDis = function(distance) {
    this.triggerDis = distance;
};