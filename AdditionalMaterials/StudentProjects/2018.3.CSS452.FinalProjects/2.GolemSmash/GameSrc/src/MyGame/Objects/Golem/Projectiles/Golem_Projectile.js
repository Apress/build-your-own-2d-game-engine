/* File: Golem_Projectile.js 
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteAnimateRenderable, vec2, Arrow, Platform, Config, Golem */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

function GolemProjectile(renderable) {
    GameObject.call(this, renderable);  
    this.mExploded = false;
    this.mParticles = null;
}
gEngine.Core.inheritPrototype(GolemProjectile, GameObject);

GolemProjectile.prototype.draw = function (camera) {
    if (this.mParticles !== null) {
        this.mParticles.draw(camera);
    }
    
    if (this.mExploded === false) {
        GameObject.prototype.draw.call(this, camera);
    }
};