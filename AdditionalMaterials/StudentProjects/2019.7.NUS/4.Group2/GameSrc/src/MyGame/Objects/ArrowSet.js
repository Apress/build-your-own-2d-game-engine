/* File: ArrowSet.js 
 *
 * Creates and initializes a simple Arrow
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict"; 

function ArrowSet() {
    GameObjectSet.call(this);
}
gEngine.Core.inheritPrototype(ArrowSet, GameObjectSet);

ArrowSet.prototype.update = function (World) {
    var i;
    for (i = 0; i < this.mSet.length; i++) {
        this.mSet[i].update(World);
        if (this.mSet[i].mIsDead)
        {
            this.removeFromSet(this.mSet[i]);
        }
    }
}; 