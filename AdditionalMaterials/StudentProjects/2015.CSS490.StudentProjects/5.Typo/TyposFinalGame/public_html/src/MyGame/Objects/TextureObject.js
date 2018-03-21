/* File: 		TextureObject.js
 * Author:      	Ryu Muthui, Michael Voght, Chad Dugie
 * Last Date Modified: 	12/15/2015
 * Description:		Defines the behavior of a GameObject that references 
 *                      to a TextureRenderable. */
"use strict";

function TextureObject(texture, x, y, w, h, groupTransform) {
    this.kDelta = 0.2;
    this.kRDelta = 0.1; // radian
    this.mRenderable = new TextureRenderable(texture);
    this.mRenderable.setColor([1, 1, 1, 0.1]);
    this.mRenderable.getXform().setPosition(x, y);
    this.mRenderable.getXform().setSize(w, h);
    GameObject.call(this, this.mRenderable, groupTransform);
}
gEngine.Core.inheritPrototype(TextureObject, GameObject);

TextureObject.prototype.update = function () {};