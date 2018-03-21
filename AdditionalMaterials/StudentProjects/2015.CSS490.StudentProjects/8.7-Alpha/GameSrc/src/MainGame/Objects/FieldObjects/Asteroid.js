/*
 * Team 7-Alpha
 * CSS 490C
 * 2D Game Engine Design
 * File: Asteroid.js 
 * 
 * This object represents our asteroid 
 * 
 */


function Asteroid(atX, atY) {
    this.kDelta = 0.2;
    this.kAsteroid = "assets/asteroidsSmall2.png";
    this.kAsteroidNormal = "assets/asteroidsSmall2Normal.png";
    this.kAsteroidDeath = "assets/sounds/asteroidDeath.wav";
    this.kAsteroidHit = "assets/sounds/asteroidHit.wav";
    this.HPMax = 4;
    this.hasCollided = false;

    this.mAsteroid = new IllumRenderable(this.kAsteroid, this.kAsteroidNormal);

    this.mAsteroid.setColor([1, 1, 1, 0]);
    this.mAsteroid.getXform().setPosition(atX, atY);
    this.mAsteroid.getXform().setSize(9, 7.2);
    this.mAsteroid.getXform().setZPos(2);
    this.mAsteroid.setSpriteSequence(64, 0,      // first element pixel position: top-left 512 is top of image, 0 is left of image
                                   60, 60,    // widthxheight in pixels
                                   59,           // number of elements in this sequence
                                   3);          // horizontal padding in between
    this.mAsteroid.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
    this.mAsteroid.setAnimationSpeed(3);
    
    GameObject.call(this, this.mAsteroid);
}
gEngine.Core.inheritPrototype(Asteroid, GameObject);

Asteroid.prototype.update = function () {
    if (this.HPMax < 1) {
        this.hasCollided = true;
        gEngine.AudioClips.playACue(this.kAsteroidDeath);
    }
    this.mAsteroid.updateAnimation();
};

// deprecated function
Asteroid.prototype.setCollided = function (boolean) {
    this.hasCollided = boolean;
};

Asteroid.prototype.doDamage = function (damage) {
    this.HPMax -= damage;
    gEngine.AudioClips.playACue(this.kAsteroidHit);
};

Asteroid.prototype.getCollisionStatus = function () {
    return this.hasCollided;
};
