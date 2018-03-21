/* File: DyePack.js 
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, vec2, DyePack */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

Grenade.prototype.update = function(hero, aCamera, num) {
    switch (num) {
        case 0: 
            var dir = vec2.fromValues(-1, 0);  // next level to be loaded           
            break;        
        case 1: 
            var dir = vec2.fromValues(1, 0);
            break;
        case 2: 
            var dir = vec2.fromValues(0, 1);
            break;
        case 3: 
            var dir = vec2.fromValues(0, -1);
            break;
        case 4: 
            var dir = vec2.fromValues(-1, -1);  // next level to be loaded           
            break;        
        case 5: 
            var dir = vec2.fromValues(1, -1);
            break;
        case 6: 
            var dir = vec2.fromValues(1, 1);
            break;
        case 7: 
            var dir = vec2.fromValues(-1, 1);
            break;
    }
    this.setCurrentFrontDir(dir);
    GameObject.prototype.update.call(this);
    
    var p = vec2.fromValues(0, 0);
    if (this.pixelTouches(hero, p)) {
       hero.hitOnce();
       this.setHit();
    }
};

