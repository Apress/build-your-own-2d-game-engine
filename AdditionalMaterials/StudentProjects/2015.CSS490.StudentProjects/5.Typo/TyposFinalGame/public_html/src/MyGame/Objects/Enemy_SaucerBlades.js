/* File: 		Enemy_SaucerBlades.js
 * Author:      	Ryu Muthui, Michael Voght
 * Last Date Modified: 	12/15/2015
 * Description:		Creates and initializes an enemy saucer object. */
"use strict"; 

function Enemy_SaucerBlades(spriteTexture, pos) {
    this.kWidth = 40;
    this.kHeight = 40;
    this.kDetectThreshold = 1000;
    
    this.mSaucerBlades = new SpriteAnimateRenderable(spriteTexture);
    this.mSaucerBlades.getXform().setPosition(pos[0], pos[1]);
    this.mSaucerBlades.getXform().setSize(this.kWidth, this.kHeight);
    this.mSaucerBlades.setColor([1, 1, 1, 0]);

    // first element (in pixel) position: top-left -- 100 is top of image,  bottom-left -- 28 is bottom of image
    this.mSaucerBlades.setSpriteSequence(100, 28,   
                                         72, 72,    // WidthxHeight in pixels
                                         16,        // number of frames to animate in this sequence
                                         56);       // horizontal padding in between
    // adjust type to set dir of animation
    this.mSaucerBlades.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateLeft);
    // adjust this for animation speed
    this.mSaucerBlades.setAnimationSpeed(2); 
    GameObject.call(this, this.mSaucerBlades);
    // adjust this for enemy movement speed.
    // Note: It's called after constructor call cause default is 0.
    this.setSpeed(3); 
    
    // Enemy health Bar
    //this.mHealthBar = new Renderable();
    //this.mHealthBar.setColor([1.0, 0.0, 0.0, 1.0]);
    //this.mHealthBar.getXform().setSize(100, 3);
    this.mExpired = false;
    this.kEnemy_CollisionSFX = "assets/Audio/SFX/SmallExplosion_SFX.mp3";
}
gEngine.Core.inheritPrototype(Enemy_SaucerBlades, GameObject);

Enemy_SaucerBlades.prototype.setExpired = function() { this.mExpired = true; };
Enemy_SaucerBlades.prototype.hasExpired = function() { return this.mExpired; };

Enemy_SaucerBlades.prototype.update = function(starFighter, particles, camera){
    this.mSaucerBlades.updateAnimation();
    
    //this.mHealthBar.getXform().setPosition(this.getXform().getXPos(), 
        //this.getXform().getYPos() + (this.getXform().getHeight() / 2));
        
    var p = vec2.fromValues(0, 0);
        if (this.pixelTouches(starFighter, p)) {
           gEngine.AudioClips.playACue(this.kEnemy_CollisionSFX);
           starFighter.hitOnce();
           this.setExpired();
           particles.addEmitterAt(this.getXform().getPosition(), 200, createParticleWithVelocity, this);
	   camera.shake(20, 20, 20, 30);
        }else{
            // Give chase!
            this.mTargetPosition = starFighter.getXform().getPosition();
            this.rotateObjPointTo(this.mTargetPosition, 0.05); // rotate rather quickly
            GameObject.prototype.update.call(this);
        }
};

Enemy_SaucerBlades.prototype.draw = function (aCamera) {
    if(!this.hasExpired()){ 
        GameObject.prototype.draw.call(this, aCamera);
    }
};

Enemy_SaucerBlades.prototype.hitOnce = function (aCamera, particles) {
    particles.addEmitterAt(this.getXform().getPosition(), 200, createParticleWithVelocity, this);
    aCamera.shake(10, 10, 20, 30);
    score += 100;
    this.setExpired();
};
