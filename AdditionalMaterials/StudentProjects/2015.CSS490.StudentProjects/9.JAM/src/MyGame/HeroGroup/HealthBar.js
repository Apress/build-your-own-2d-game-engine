/**
 * Created by MetaBlue on 11/29/15.
 */
/* File: Hero.js
 *
 * Creates and initializes the Hero (Dye)
 * overrides the update function of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, vec2 */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function HealthBar(texture) {
    this.mBar = new TextureRenderable(texture);
    this.mBar.setColor([1, 1, 1, 0.1]);
    this.mBar.getXform().setZPos(5);
    this.mBar.getXform().setHeight(1);
    GameObject.call(this, this.mBar);
}
gEngine.Core.inheritPrototype(HealthBar, GameObject);

// follow hero with health bar
HealthBar.prototype.update = function (hero) {
    var healthRatio = hero.getHealthRatio();
    if (healthRatio < 0) {
        return;     // no negative health bar
    }
    var pos = hero.getXform().getPosition();
    var h = hero.getXform().getHeight();
    var w = hero.getXform().getWidth();
    this.mBar.getXform().setWidth(w * healthRatio, 1);
    this.getXform().setXPos(pos[0] - w * (1 - healthRatio)/2);
    this.getXform().setYPos(pos[1] + h/2 + 1); // <-- this should be based on the hight of the
};
