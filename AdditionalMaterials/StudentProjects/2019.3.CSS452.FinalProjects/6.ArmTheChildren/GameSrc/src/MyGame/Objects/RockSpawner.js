/* File: TextureObject.js 
 *
 * Defines the behavior of an GameObject that references to a TextureRenderable
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, TextureRenderable*/
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function RockSpawner(tex_spawn, tex_rock, objectarray) {
    this.rock_tex = tex_rock;
    this.objarr = objectarray;
    this.Counter = 0;
    //this.g = null;
    this.mRenderable = new LightRenderable(tex_spawn);
    this.mRenderable.setColor([1, 1, 1, 0]);
    GameObject.call(this, this.mRenderable);
    

}
gEngine.Core.inheritPrototype(RockSpawner, GameObject);

RockSpawner.prototype.update = function () {
    var ranNum = Math.floor(Math.random() * 100);
    this.Counter += ranNum;
    
    if(this.Counter > 7500){
         this.SpawnRock();
         this.Counter = 0;
    }
};

RockSpawner.prototype.SpawnRock = function (){ 
    var p = new Rock(this.rock_tex, this.mRenderable.getXform().getPosition());
    this.objarr.addToSet(p);
};