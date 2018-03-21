/* File: Missle.js 
 *
 * Creates and initializes a simple Brain object
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false, vec2: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!
Shield.kTexture = null;
var gCamera = gCamera;
function Shield(X, Y){
    this.mShield = new TextureRenderable(Shield.kTexture);
    this.mShield.getXform().setPosition(X, Y);
    this.mShield.getXform().setSize(8, 8);
    this.mShield.setColor([0, 0.0, 0.0, 0]);
    GameObject.call(this,this.mShield);    
    
    this.mExpired = false;
    this.HP = 15;
    this.setCurrentFrontDir([0, 1]);
    this.setSpeed(0.5);

}
gEngine.Core.inheritPrototype(Shield, GameObject);

Shield.prototype.setExpired = function() {
    this.mExpired = true;
};
Shield.prototype.hasExpired = function() {
    return this.mExpired;
};
Shield.prototype.update = function(Hero, StoneSet){
    GameObject.prototype.update.call(this);
    this.getXform().setPosition(
            Hero.getXform().getXPos(),
            Hero.getXform().getYPos()
        );
    
    var p = vec2.fromValues(0, 0);
    for (var i=0; i<StoneSet.size(); i++) {
        var obj = StoneSet.getObjectAt(i);
        if (this.pixelTouches(obj, p)) {
            obj.decreaseHP(5);
            Hero.needUseShield = true;
           // this.setExpired();
            this.HP -= 5;
        }
        else{
            this.draw(gCamera);
        }
   }
   if(this.HP === 0)
       this.setExpired();
};