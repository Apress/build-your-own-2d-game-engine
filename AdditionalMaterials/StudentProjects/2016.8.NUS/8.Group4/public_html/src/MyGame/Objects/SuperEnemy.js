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

function SuperEnemy(enemyTexture) {
    this.kDelta = 0.6;

    this.mSuperEnemy = new TextureRenderable(enemyTexture);
    this.mSuperEnemy.setColor([0, 0, 0, 0]);
    
    var x = 100;
    var y = Math.floor(Math.random()*35 + 12);
    
    this.mSuperEnemy.getXform().setPosition(x+108, y);
    this.mSuperEnemy.getXform().setSize(24, 24);
    
    GameObject.call(this, this.mSuperEnemy);
}
gEngine.Core.inheritPrototype(SuperEnemy, GameObject);

SuperEnemy.prototype.update = function () {
    var xform = this.getXform();
    xform.incXPosBy(-this.kDelta);
};