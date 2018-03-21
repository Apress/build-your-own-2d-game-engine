/* 
 * File: Grenade.js
 * Created by phreeze Tang 29/7/2017
 * Defined the UIText in battle scene.
 * 
 * change log:
 * 29/7/2017 create the file
 */


/* global GameObject, gEngine */

"use strict";

function UIText (textTexture, posX, posY, width, height) {
    this.mUIText = new SpriteRenderable(textTexture);
    this.mUIText.setColor([1.0, 1.0, 1.0, 0.0]);
    this.mUIText.getXform().setPosition(posX, posY);
    this.mUIText.getXform().setSize(width, height);
    GameObject.call(this, this.mUIText);
}
gEngine.Core.inheritPrototype(UIText, GameObject);