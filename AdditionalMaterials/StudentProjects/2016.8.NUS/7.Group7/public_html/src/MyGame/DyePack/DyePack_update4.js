"use strict";  // Operate in Strict mode such that variables must be declared before used!

DyePack4.prototype.update = function(hero) {
    switch (this.mCurrentState) {
        case DyePack4.eDyePackState.eTopLeftRegion: 
        case DyePack4.eDyePackState.eTopRightRegion: 
        case DyePack4.eDyePackState.eBottomLeftRegion: 
        case DyePack4.eDyePackState.eBottomRightRegion: 
            this._servicePatrolStates(hero);
            break;   
        case DyePack4.eDyePackState.eChaseState: 
            this._serviceChase(hero);
            break
    }
    var p = vec2.fromValues(0, 0);
    
   if(this.pixelTouches(hero, p)){
        hero.hitOnce();
        this.setExpired();
        
        
    }
    
    if(this.getXform().getYPos()<-18){
        this.setExpired();
    }
    
};

DyePack4.prototype._distToHero = function(hero) {
    var toHero = [];
    vec2.subtract(toHero, hero.getXform().getPosition(), this.getXform().getPosition());
    return vec2.length(toHero);
};

DyePack4.prototype._servicePatrolStates = function(hero) {
    if (this._distToHero(hero) < this.kDetectThreshold) {
        // transition to chase!
        this.mStateTimeClick = 0;
        this.mTargetPosition = hero.getXform().getPosition();
    } else {
       // Continue patrolling!
       GameObject.prototype.update.call(this);
       var toTarget = [];
       vec2.subtract(toTarget, this.mTargetPosition, this.getXform().getPosition());
       var d = vec2.length(toTarget);
   }
};