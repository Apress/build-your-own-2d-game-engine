/* File: 		Enemy_SaucerSolid.js
 * Author:      	Ryu Muthui, Michael Voght
 * Last Date Modified: 	12/15/2015
 * Description:		Creates and initializes an enemy saucer object. */
"use strict"; 

Enemy_SaucerSolid.eEnemy_State = Object.freeze( {
    eHome:      0,
    eTopLeft:   1,
    eTopRight:  2,
    eBotRight:  3,
    eBotLeft:   4,
    eChase:     5}
);

function Enemy_SaucerSolid(spriteTexture, pos, dstPos) {
    this.kWidth = 40;
    this.kHeight = 40;
    this.kDetectThreshold = 200;
    this.kChaseThreshold = 2 * this.kDetectThreshold;
    
    this.mDstX = dstPos[0];
    this.mDstY = dstPos[1];
    this.mLeft = this.mDstX;
    this.mRight = this.mLeft + 100;
    this.mTop = this.mDstY;
    this.mBottom = this.mTop - 50;
    
    this.mSaucerSolid = new SpriteAnimateRenderable(spriteTexture);
    this.mSaucerSolid.getXform().setPosition(pos[0], pos[1]);
    this.mSaucerSolid.getXform().setSize(this.kWidth, this.kHeight);
    this.mSaucerSolid.setColor([1, 1, 1, 0]);
    
    // first element (in pixel) position: top-left -- 100 is top of image,  bottom-left -- 28 is bottom of image
    this.mSaucerSolid.setSpriteSequence(100, 28,   
                                        72, 72,    // WidthxHeight in pixels
                                        16,        // number of frames to animate in this sequence
                                        56);       // horizontal padding in between
    // adjust type to set dir of animation
    this.mSaucerSolid.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateLeft);
    // adjust this for animation speed
    this.mSaucerSolid.setAnimationSpeed(2); 
    GameObject.call(this, this.mSaucerSolid);
    // adjust this for enemy movement speed.
    // Note: It's called after constructor call cause default is 0.
    this.setSpeed(3); 
    
    this.mSaucerSolidMiniMap = new Renderable();
    this.mSaucerSolidMiniMap.setColor([1, 0, 0, 1]); // Red
    this.mSaucerSolidMiniMap.getXform().setSize(this.kWidth, this.kHeight);
    
    // Enemy health Bar
    //this.mHealthBar = new Renderable();
    //this.mHealthBar.setColor([0.0, 0.0, 1.0, 1.0]);
    //this.mHealthBar.getXform().setSize(100, 3);

    this.mPreviousState = Enemy_SaucerSolid.eEnemy_State.eTopLeft;
    this.mCurrentState = Enemy_SaucerSolid.eEnemy_State.eHome;
    this.mExpired = false;
    
    this.kEnemy_CollisionSFX = "assets/Audio/SFX/SmallExplosion_SFX.mp3";
}
gEngine.Core.inheritPrototype(Enemy_SaucerSolid, GameObject);

Enemy_SaucerSolid.prototype.setExpired = function() { this.mExpired = true; };
Enemy_SaucerSolid.prototype.hasExpired = function() { return this.mExpired; };

// Logic for saucer enemy behavior
Enemy_SaucerSolid.prototype.update = function(starFighter, particles, camera){
    this.mSaucerSolid.updateAnimation();
    
    this.mSaucerSolidMiniMap.getXform().setPosition(this.mSaucerSolid.getXform().getXPos(), this.mSaucerSolid.getXform().getYPos());
    
    //this.mHealthBar.getXform().setPosition(this.getXform().getXPos(), 
    //this.getXform().getYPos() - (this.getXform().getHeight() / 2));
    
    switch(this.mCurrentState) {
        case Enemy_SaucerSolid.eEnemy_State.eTopLeft:
            this.mTargetPosition = vec2.fromValues(this.mRight, this.mTop);
        case Enemy_SaucerSolid.eEnemy_State.eTopRight:
            this.mTargetPosition = vec2.fromValues(this.mRight, this.mBottom);
        case Enemy_SaucerSolid.eEnemy_State.eBotRight:
            this.mTargetPosition = vec2.fromValues(this.mLeft, this.mBottom);
        case Enemy_SaucerSolid.eEnemy_State.eBotLeft:
            this.mTargetPosition = vec2.fromValues(this.mLeft, this.mTop);    
            this._servicePatrolState(starFighter);
            break;
        case Enemy_SaucerSolid.eEnemy_State.eHome:
            this._serviceFindHome(starFighter);
            break;
        case Enemy_SaucerSolid.eEnemy_State.eChase:
            this._serviceChaseState(starFighter, particles, camera);
            break;
    }
};

Enemy_SaucerSolid.prototype._distToHero = function(hero) {
    var toHero = [];
    vec2.subtract(toHero, hero.getXform().getPosition(), this.getXform().getPosition());
    return vec2.length(toHero);
};

Enemy_SaucerSolid.prototype._getNextState = function() {
    if(this.mCurrentState === Enemy_SaucerSolid.eEnemy_State.eTopLeft){
        this.mCurrentState = Enemy_SaucerSolid.eEnemy_State.eTopRight;
    }else if(this.mCurrentState === Enemy_SaucerSolid.eEnemy_State.eTopRight){
        this.mCurrentState = Enemy_SaucerSolid.eEnemy_State.eBotRight;
    }else if(this.mCurrentState === Enemy_SaucerSolid.eEnemy_State.eBotRight){
        this.mCurrentState = Enemy_SaucerSolid.eEnemy_State.eBotLeft;
    }else{
        this.mCurrentState = Enemy_SaucerSolid.eEnemy_State.eTopLeft;
    }
};

Enemy_SaucerSolid.prototype._servicePatrolState = function(hero) {
    if (this._distToHero(hero) < this.kDetectThreshold) {
        // transition to chase!
        this.mDstX = this.getXform().getXPos();
        this.mDstY = this.getXform().getYPos();
        this.mPreviousState = this.mCurrentState;
        this.mCurrentState = Enemy_SaucerSolid.eEnemy_State.eChase;
        this.mTargetPosition = hero.getXform().getPosition();
    }else{
       // Continue patrolling!
       GameObject.prototype.update.call(this);
       var toTarget = [];
       vec2.subtract(toTarget, this.mTargetPosition, this.getXform().getPosition());
       var d = vec2.length(toTarget);
       if(d <= 0){
           this._getNextState;
       }else{
           this.rotateObjPointTo(this.mTargetPosition, 0.01); // rotate rather quickly
       }
    }
};

Enemy_SaucerSolid.prototype._serviceFindHome = function(hero) {
    var xForm = this.getXform();
    var currX = xForm.getXPos();
    var currY = xForm.getYPos();
    
    if(currX !== this.mDstX) {
        if(currX < this.mDstX - 3){         // check if left of target destination
            xForm.incXPosBy(this.getSpeed());
        }else if(currX > this.mDstX + 3){   // check if right of target destination
            xForm.incXPosBy(-(this.getSpeed()));
        }else {                             // if close enough set to x destination
            xForm.setXPos(this.mDstX);
        }
    }
    
    if(currY !== this.mDstY) {
        if(currY < this.mDstY - 3) {
            xForm.incYPosBy(this.getSpeed());
        }else if( currY > this.mDstY + 3){
            xForm.incYPosBy(-(this.getSpeed()));
        }else{
            xForm.setYPos(this.mDstY);
        }
    }else if (currX === this.mDstX){
        this.mCurrentState = this.mPreviousState;
    }
    
    if (this._distToHero(hero) < this.kDetectThreshold) {
        // transition to chase!
        if(this.mCurrentState !== Enemy_SaucerSolid.eEnemy_State.eHome) {
            this.mDstX = this.getXform().getXPos();
            this.mDstY = this.getXform().getYPos();
        }
        this.mCurrentState = Enemy_SaucerSolid.eEnemy_State.eChase;
        this.mTargetPosition = hero.getXform().getPosition();
    }
};

Enemy_SaucerSolid.prototype._serviceChaseState = function(hero, particles, camera) {
    if (this._distToHero(hero) > this.kChaseThreshold) {
        // Transition to cool down
        this.mCurrentState = Enemy_SaucerSolid.eEnemy_State.eHome;
    }else{
        var p = vec2.fromValues(0, 0);
        if (this.pixelTouches(hero, p)) {
           hero.hitOnce();
           this.setExpired();
	   particles.addEmitterAt(this.getXform().getPosition(), 200, createParticleWithVelocity, this);
	   camera.shake(20, 20, 20, 30);
	   gEngine.AudioClips.playACue(this.kEnemy_CollisionSFX);
        }else{
            // Give chase!
            this.mTargetPosition = hero.getXform().getPosition();
            this.rotateObjPointTo(this.mTargetPosition, 0.05); // rotate rather quickly
            GameObject.prototype.update.call(this);
        }
   }
};

Enemy_SaucerSolid.prototype.draw = function (aCamera) {
    if(!this.hasExpired()){ 
        GameObject.prototype.draw.call(this, aCamera);
    }
};

Enemy_SaucerSolid.prototype.drawRenderable = function(aCamera) {
    if(!this.hasExpired()){
        this.mSaucerSolidMiniMap.draw(aCamera);
    }
};

Enemy_SaucerSolid.prototype.hitOnce = function (aCamera, particles) {
    particles.addEmitterAt(this.getXform().getPosition(), 200, createParticleWithVelocity, this);
    aCamera.shake(10, 10, 20, 30);
    score += 100;
    this.setExpired();
};
