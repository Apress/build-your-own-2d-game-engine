/* File: SardineCoin.js 
 *  -This is the SardineCoin object, gives extra points when collected . 
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteAnimateRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function SardineCoin(scene, spriteTexture, atX, atY, w, h, hero) {  
    this.kScene = scene;
    this.kPoints = 25; 
    this.kHero = hero;
    
    this.mSardineCoin = new SpriteAnimateRenderable(spriteTexture);
    this.mSardineCoin.setColor([1, 1, 1, 0]);
    this.mSardineCoin.getXform().setPosition(atX, atY);
    this.mSardineCoin.getXform().setSize(w, h);
    this.mSardineCoin.setSpriteSequence(128, 0,      // first element pixel position: top-left 512 is top of image, 0 is left of image
                                    115, 70,   // widthxheight in pixels
                                    1,          // number of elements in this sequence
                                    0);         // horizontal padding in between

    GameObject.call(this, this.mSardineCoin);
    this.iscoin=true;
}
gEngine.Core.inheritPrototype(SardineCoin, NonPhysicsGameObject);

SardineCoin.prototype.update = function () {
       if (!this.terminate) {
        //NonPhysicsGameObject.prototype.update.call(this);    
        this.behavior();
    } 
};  

SardineCoin.prototype.behavior = function () {
    var p = vec2.fromValues(0, 0);
    if (this.getBBox().intersectsBound(this.kHero.getBBox())) {
        this.hitEvent();
    }
};

SardineCoin.prototype.hitEvent = function () {
    if(!this.terminate)
    {
        this.setVisibility(false);
        this.terminate = true;
        this.kScene.addScore(this.kPoints);
    }
    
};


