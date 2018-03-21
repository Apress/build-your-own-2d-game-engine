/* File: Monster.js 
 *
 * Creates and initializes the Monster (Dye)
 * overrides the update function of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, GameObject, SpriteRenderable, RigidCircle, RigidRectangle, Particle */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Monster(spriteTexture, atX, atY) {
    this.mDye = new SpriteRenderable(spriteTexture);
    this.mDye.setColor([1, 1, 1, 0]);
    this.mDye.getXform().setPosition(atX, atY);
    this.mDye.getXform().setSize(30,30);
    this.mDye.setElementPixelPositions(0,256, 0, 256);
    GameObject.call(this, this.mDye);
}
gEngine.Core.inheritPrototype(Monster, GameObject);

Monster.prototype.update = function () {
    // must call super class update
   
    GameObject.prototype.update.call(this);
    var xform = this.getXform();
    if(countdown>=50)
    {
        if(xform.getRotationInDegree()>0)
        {
        xform.incRotationByDegree(-1);    
        }
        else xform.setRotationInDegree(10);
        xform.incXPosBy(1.1);
    }
    else
    {
    if(xform.getRotationInDegree()>90)
        {    xform.setRotationInDegree(87);  }
    else { xform.setRotationInDegree(93); }
    vyMonster=vyMonster+a;    
    xform.incYPosBy(-vyMonster);
    }
};
       
