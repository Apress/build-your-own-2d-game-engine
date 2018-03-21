/* File: HeroBound.js 
 *
 * Creates and initializes the Hero (Dye)
 * overrides the update function of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, StoneSet, vec2 */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

function HeroBound(spriteTexture, atX, atY){
    this.mBoundBox = new SpriteRenderable(spriteTexture);
    this.mBoundBox.setColor([1, 1, 1, 0]);
    this.mBoundBox.getXform().setPosition(atX, atY);
    this.mBoundBox.getXform().setZPos(0);
    this.mBoundBox.getXform().setSize(2, 2);
    this.mBoundBox.setElementPixelPositions(0, 32, 0, 32);
    GameObject.call(this, this.mBoundBox);
}
gEngine.Core.inheritPrototype(HeroBound, GameObject);
HeroBound.draw = function(aCamera){
    GameObject.prototype.draw.call(this, aCamera);
};
HeroBound.prototype.update = function(BoundedHero,StoneSet,allParticles, func){
    var XPos = BoundedHero.getXform().getXPos();
    var YPos = BoundedHero.getXform().getYPos();
    this.mBoundBox.getXform().setPosition(XPos,YPos);
    
    var p = vec2.fromValues(0, 0);
    for (var i=0; i<StoneSet.size(); i++) {
        var obj = StoneSet.getObjectAt(i);
        if (this.pixelTouches(obj, p)) {
            BoundedHero.decreaseHP(obj.mPower);
            obj.setExpired();
            allParticles.addEmitterAt(p, 200, func);
        }
    }
};