/* File: Hero.js 
 *
 * Creates and initializes the Hero (Dye)
 * overrides the update function of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Enemy(enemyTexture) {
    this.kDelta = 0.5;

    this.mEnemy = new TextureRenderable(enemyTexture);
    this.mEnemy.setColor([0, 0, 0, 0]);
    
    var x = 100;
    var y = Math.floor(Math.random()*35 + 10);
    
    this.mEnemy.getXform().setPosition(x+108, y);
    this.mEnemy.getXform().setSize(10, 20);
    
    GameObject.call(this, this.mEnemy);
}
gEngine.Core.inheritPrototype(Enemy, GameObject);

Enemy.prototype.update = function () {
    var xform = this.getXform();
    xform.incXPosBy(-this.kDelta);
};