/* File: Missle.js 
 *
 * Creates and initializes a simple Brain object
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false, vec2: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!
Missle.kTexture = null;
function Missle(X, Y){
    var mMissle = new TextureRenderable(Missle.kTexture);
    mMissle.getXform().setPosition(X, Y);
    mMissle.getXform().setSize(5, 25);
    GameObject.call(this,mMissle);    
    
    this.mExpired = false;

    this.setCurrentFrontDir([0, 1]);
    this.setSpeed(0.5);

}
gEngine.Core.inheritPrototype(Missle, GameObject);

Missle.prototype.setExpired = function() {
    this.mExpired = true;
};
Missle.prototype.hasExpired = function() {
    return this.mExpired;
};
Missle.prototype.update = function(Hero, StoneSet,allParticles, func){
    GameObject.prototype.update.call(this);
    var p = vec2.fromValues(0, 0);
    var StonecollisionPt = [0, 0],HerocollisionPt = [0,0];
    if (this.pixelTouches(Hero, HerocollisionPt)) {
            this.setExpired();
            Hero.decreaseHP(2);
            allParticles.addEmitterAt(HerocollisionPt, 200, func);
    }
    else{
         var p = vec2.fromValues(0, 0);
         for (var i=0; i<StoneSet.size(); i++) {
             var obj = StoneSet.getObjectAt(i);
             if (this.pixelTouches(obj, StonecollisionPt)) {
                 obj.decreaseHP(5);
                 this.setExpired();
                 allParticles.addEmitterAt(StonecollisionPt, 200, func);
                 
             }
             else{
             this.rotateObjPointTo(Hero.getXform().getPosition(), 1);
             }
        }
    }
    
    
};