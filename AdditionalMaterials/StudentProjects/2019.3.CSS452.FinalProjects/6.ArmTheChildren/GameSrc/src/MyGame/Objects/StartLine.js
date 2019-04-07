/* File: TextureObject.js 
 *
 * Defines the behavior of an GameObject that references to a TextureRenderable
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, TextureRenderable*/
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function StartLine() {
    this.mRenderable = new Renderable();
    this.mRenderable.setColor([0, 1, 0, 0.1]);
    GameObject.call(this, this.mRenderable);
}
gEngine.Core.inheritPrototype(StartLine, GameObject);

StartLine.prototype.update = function () {

    
};