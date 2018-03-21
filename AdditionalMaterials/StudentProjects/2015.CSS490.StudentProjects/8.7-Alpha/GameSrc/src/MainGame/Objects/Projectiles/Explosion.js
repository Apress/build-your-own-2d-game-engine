/* 
 * Team 7-Alpha
 * CSS 490C
 * 2D Game Engine Design
 * File: Rocket.js 
 * 
 * This is the file encapsulates the rocket object
 */

function Explosion(atX, atY) {
    this.kExplosionImage = "assets/explosion.png";
    
    this.kExplosionSound = "assets/sounds/explosion.wav";
    this.hasCollided = false;
    this.kDamage = 5;
    this.mExplosion = new LightRenderable(this.kExplosionImage);

    this.mExplosion.getXform().setPosition(atX, atY);
    this.mExplosion.getXform().setSize(1, 1);
    this.mExplosion.getXform().setZPos(2);
    this.mExplosion.getXform().setRotationInDegree(90);
    
    this.mTick = 0;
    
    this.mLight = gGameLights.getNextPointLight();
    this.mLight.setXPos(this.mExplosion.getXform().getXPos());
    this.mLight.setYPos(this.mExplosion.getXform().getYPos());
    this.mLight.setZPos(20);
    this.mExplosionInterpolator = new Interpolate(20, 8, 0.3);
    this.mExplosionInterpolator.setFinalValue(-25);
    gEngine.AudioClips.playACue(this.kExplosionSound);
    
    GameObject.call(this, this.mExplosion);
}
gEngine.Core.inheritPrototype(Explosion, GameObject);

Explosion.prototype.getRocketType = function () {return 'O';};
Explosion.prototype.setUpSpeed = function (inSpeed) { this.mUpSpeed = inSpeed; };
Explosion.prototype.update = function () {
    if (this.mTick > 10) {
        this.hasCollided = true;
    }
    this.mTick++;
    if (this.mTick < 8) {
       this.mExplosion.getXform().incWidthBy(2.5);
       this.mExplosion.getXform().incHeightBy(5); 
    } else {
        this.mExplosion.getXform().incWidthBy(-1);
       this.mExplosion.getXform().incHeightBy(-2); 
    }
    
    if(this.mExplosionInterpolator) {
        this.mExplosionInterpolator.updateInterpolation();
        this.mLight.setZPos(this.mExplosionInterpolator.getValue());
    }
    
    // remember to update this.mMinion's animation
    this.mExplosion.updateAnimation();
};

Explosion.prototype.checkAsteroidCollision = function (fieldObject) {
    var touchPosition = []; // can use this later to spawn explosion renderable
    
    if (fieldObject.getObjectType() === 'A') {
    // current implementation sets hasCollided to true on this rocket and target asteroid
    if (this.hasCollided === false && !fieldObject.getToRemove()) {
        if (GameObject.prototype.pixelTouches.call(this, fieldObject, touchPosition)) {
            //this.hasCollided = true;
            fieldObject.getSubObject().doDamage(this.kDamage);
            }
        }
    }
    
};

Explosion.prototype.getCollisionStatus = function () {
    return this.hasCollided;
};