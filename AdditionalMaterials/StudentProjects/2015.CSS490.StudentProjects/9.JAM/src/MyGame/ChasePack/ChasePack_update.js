/* File: DyePack.js 
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, vec2, DyePack */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

ChasePack.prototype.update = function(hero, aCamera) {
    switch (this.mCurrentState) {
        case ChasePack.eChasePackState.eNormalRegion:        
            this._serviceNormalMove(hero, aCamera);
            break;        
        case ChasePack.eChasePackState.eChaseState: 
            this._serviceChase(hero);
            break;
        
    }
};

ChasePack.prototype._distToHero = function(hero) {
    var toHero = [];
    vec2.subtract(toHero, hero.getXform().getPosition(), this.getXform().getPosition());
    return vec2.length(toHero);
};


ChasePack.prototype._serviceNormalMove = function(hero, aCamera) {
    //GameObject.prototype.update.call(this);
    var cw = aCamera.getWCWidth();
    var cc = aCamera.getWCCenter();
    var deltaY = 0.15;
    var x = this.getXform().getXPos();
    var y = this.getXform().getYPos();
    
    if((cc[0]+cw/2) > x  && cc[0]-cw/2 < x){
        this.getXform().setPosition(x-deltaY, y);
    }
    
    var hp = hero.getXform().getPosition();
    // if within 40 wc chase hero, if past hero by 5 stop
    if (hp[0] + 40 > this.getXform().getXPos() && hp[0]-5 < this.getXform().getXPos()){
        this.mCurrentState = ChasePack.eChasePackState.eChaseState;
        //this._serviceChase(hero);
    }
    
       
};

ChasePack.prototype._serviceChase = function(hero) {    
        var p = vec2.fromValues(0, 0);
        // check if hero is hit
        if (this.pixelTouches(hero, p)) {
           hero.hitOnce();
           this.setExpired();
        // chase hero
        } else {
            // Give chase!
            this.mTargetPosition = hero.getXform().getPosition();
            this.rotateObjPointTo(this.mTargetPosition, 0.5); // rotate rather quickly
            GameObject.prototype.update.call(this);           // move forward
            // revert to normal move if past hero
            if(this.mTargetPosition[0]-10 > this.getXform().getXPos()){
                this.mCurrentState = ChasePack.eChasePackState.eNormalRegion;
            }
        }
};