/* 
 * ResultsScreenHero.js
 * 
 * A Hero GameObject for the results screen
 * All he does is idle for a period, then die
 */

function ResultsScreenHero() {
    this.mHero = new IllumRenderable(Config.ResultsScreen.Textures.HeroSheet,
                                      Config.ResultsScreen.Textures.HeroNormal);
    GameObject.call(this, this.mHero);
    
    //for tracking animations
    this.mCurAnim = "Idle";
    this._setAnimation(this.mCurAnim);
    
    this.kIdleLength = Config.ResultsScreen.Hero.DeathDelay;
    this.mIdleTime = 0;
    this.mAnimate = true;
};
gEngine.Core.inheritPrototype(ResultsScreenHero, GameObject);

ResultsScreenHero.prototype.update = function() {
    GameObject.prototype.update.call(this);
    if(this.mAnimate)
        this.mHero.updateAnimation();
    
    if(this.mCurAnim === "Idle")
    {
        this.mIdleTime++;
        if(this.mIdleTime >= this.kIdleLength){
            this.mCurAnim = "Death";
            var s = this.getXform().getWidth()
            this.getXform().setSize(s +10, s +10);
            this.getXform().incYPosBy(-6);
            this._setAnimation(this.mCurAnim);
        }
    }
    else    //death animation
    {
        //only loop once
        if(this.mHero.mCurrentElm === this.mHero.mNumElems - 1)
            this.mAnimate = false;
    }
};

/*
 * _setAnimation() - set the next animation
 * 
 */
ResultsScreenHero.prototype._setAnimation = function(animName){
    
    if(animName === "Idle")
    {
        this.setSprite(.938,
                    .0468,
                    .0936,
                    .125,
                    10);
        this.mHero.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
        this.mHero.setAnimationSpeed(6);
    }
    else if(animName === "Death")
    {
        this.setSprite(.333,
                    .0547,
                    .109,
                    .113,
                    9);
        this.mHero.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
        this.mHero.setAnimationSpeed(3);
    }

};

ResultsScreenHero.prototype.setSprite = function (top,left,width,height,frame) {
    this.mHero.setSpriteSequence(
                    2048*(top+(height/2)),
                    2048*(left-(width/2)),
                    2048*width,
                    2048*height,
                    frame,
                    0);
};



