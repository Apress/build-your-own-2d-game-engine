/* File: Wall.js 
 *
 * Creates and initializes a Wall object
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, TextureRenderable, RigidRectangle */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Heart(texture, atX, atY, width, height) {
    this.mHeart = new TextureRenderable(texture);

    this.mHeart.setColor([0.9, 0.9, 0.9, 1]);
    this.mHeart.getXform().setPosition(atX, atY);
    this.mHeart.getXform().setSize(width, height);
    
    this.ifTouchCatherine = false;
    GameObject.call(this, this.mHeart);
}
gEngine.Core.inheritPrototype(Heart, GameObject);

Heart.prototype.update = function (xform) 
{
    var cPosX = xform.getXPos();
    var cPosY = xform.getYPos();
    var cHeight = xform.getHeight();
    
    this.mHeart.getXform().setPosition(cPosX, cPosY + cHeight / 2 + this.mHeart.getXform().getHeight());
    
    var delta = 0.005;
    var mColor = this.mHeart.getColor();
    
    if (mColor[3] < -0.5) return ;
    
    mColor[3] -= delta;
    this.mHeart.setColor(mColor);
};

Heart.prototype.getUpdateResult = function (){
    //alert(this.mHeart.getColor()[3]);
    return this.mHeart.getColor()[3] < 0;
};
