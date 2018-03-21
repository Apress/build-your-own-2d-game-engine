/* 
 * ResultsScreenGolem.js
 * 
 * A Golem GameObject for the results screen
 * All he does is idle for a period, then die
 */

/* global Config, GameObject, gEngine */

function ResultsScreenGolem() {
    this.mGolem = new IllumRenderable(Config.ResultsScreen.Textures.BossSprite,
                                      Config.ResultsScreen.Textures.BossNormal);
    GameObject.call(this, this.mGolem);
    
    //for tracking animations
    this.mCurAnim = "Idle";
    this._setAnimation(this.mCurAnim);
    
    this.kIdleLength = Config.ResultsScreen.Golem.DeathDelay;
    this.mIdleTime = 0;
};
gEngine.Core.inheritPrototype(ResultsScreenGolem, GameObject);

ResultsScreenGolem.prototype.update = function() {
    GameObject.prototype.update.call(this);
    this.mGolem.updateAnimation();
    
    if(this.mCurAnim === "Idle")
    {
        this.mIdleTime++;
        if(this.mIdleTime >= this.kIdleLength){
            this.mCurAnim = "Death";
            this._setAnimation(this.mCurAnim);
        }
    }
    else    //death animation
    {
        //only loop once
        if(this.mGolem.mCurrentElm === this.mGolem.mNumElems - 1)
            this.mExpired = true;
    }
};

/*
 * _setAnimation() - set the next animation
 * 
 */
ResultsScreenGolem.prototype._setAnimation = function(animName){
    var animation = Config.Golem.Animations[animName];

    this.mGolem.setSpriteSequence(
            animation.TopLeftX,
            animation.TopLeftY,
            animation.Width,
            animation.Height,
            animation.Count,
            animation.Padding
        );
    this.mGolem.setAnimationType(animation.Type.call());
    this.mGolem.setAnimationSpeed(animation.Speed);
};



