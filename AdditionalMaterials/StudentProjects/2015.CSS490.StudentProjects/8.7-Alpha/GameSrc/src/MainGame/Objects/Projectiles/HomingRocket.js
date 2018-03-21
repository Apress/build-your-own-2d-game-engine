/* 
 * Team 7-Alpha
 * CSS 490C
 * 2D Game Engine Design
 * File: Rocket.js 
 * 
 * This is the file encapsulates the homing rocket object
 */

function HomingRocket(atX, atY) {
    this.kHomingRocketImage = "assets/homingRocket.png";
    this.kParticleTexture = "assets/explosion.png";
    this.hasCollided = false;
    this.kDamage = 2;
    
    this.kRocketSound1 = "assets/sounds/politeRocket1.wav";
    this.kRocketSound2 = "assets/sounds/politeRocket2.wav";
    this.kRocketSound3 = "assets/sounds/politeRocket3.wav";
    
    this.randomValue = Math.random() * 100;
    if (this.randomValue < 25) {
        gEngine.AudioClips.playACue(this.kRocketSound1);
    }
    if (this.randomValue >= 25 && this.randomValue < 80) {
        gEngine.AudioClips.playACue(this.kRocketSound2);
    }
    if (this.randomValue >= 80) {
        gEngine.AudioClips.playACue(this.kRocketSound3);
    }
    
    // Define how far below center particles are emitted
    this.kParticleOffset = 3;
    
    // tracking constants
    this.kHomingDistance = 20;
    this.kDeltaDegree = 10;
    this.kDeltaRad = Math.PI * this.kDeltaDegree / 180;
    
    this.mHomingRocket = new LightRenderable(this.kHomingRocketImage);

    this.mHomingRocket.getXform().setPosition(atX, atY);
    this.mHomingRocket.getXform().setSize(3.5, 3);
    this.mHomingRocket.getXform().setZPos(2);
    this.mHomingRocket.getXform().setRotationInDegree(0.01);
    
    this.mUpSpeed = 0.6;
    
    GameObject.call(this, this.mHomingRocket);
}
gEngine.Core.inheritPrototype(HomingRocket, GameObject);

HomingRocket.prototype.getRocketType = function () {return 'H';};
HomingRocket.prototype.setUpSpeed = function (inSpeed) { this.mUpSpeed = inSpeed; };
HomingRocket.prototype.getUpSpeed = function () { return this.mUpSpeed; };
HomingRocket.prototype.update = function () {
    
    var pos = this.getXform().getPosition();
    var frontDirection = this.getCurrentFrontDir();
    vec2.scaleAndAdd(pos, pos, frontDirection, this.mUpSpeed);
    
    var xform = this.getXform();
    
    // Create a particle
    var tempx = frontDirection[0];
    var tempy = frontDirection[1];
    var costheta = tempy / Math.sqrt(tempx^2 + tempy^2);
    var sintheta = tempx / Math.sqrt(tempx^2 + tempy^2);
    var p = this._createParticle(xform.getXPos() - sintheta*this.kParticleOffset, 
            xform.getYPos() - costheta*this.kParticleOffset);
    gAllParticles.addToSet(p);
    
    // remember to update this.mMinion's animation
    this.mHomingRocket.updateAnimation();
};

HomingRocket.prototype.checkAsteroidCollision = function (fieldObject) {
    var touchPosition = []; // can use this later to spawn explosion renderable
    var nearestAsteroid = this.kHomingDistance;
    var objectPosition = vec2.fromValues(fieldObject.getXPosition(), 
            fieldObject.getYPosition());
    
    if (fieldObject.getObjectType() === 'A') {
            if (vec2.distance(objectPosition, this.mHomingRocket.getXform().getPosition()) < nearestAsteroid) {
                GameObject.prototype.rotateObjPointTo.call(this, objectPosition, this.kDeltaRad);
            }
        
    // current implementation sets hasCollided to true on this rocket and target asteroid
    if (this.hasCollided === false && !fieldObject.getToRemove()) {
        if (GameObject.prototype.pixelTouches.call(this, fieldObject, touchPosition)) {
            this.hasCollided = true;
            fieldObject.getSubObject().doDamage(this.kDamage);
            }
        }
    }
    
};

HomingRocket.prototype.getCollisionStatus = function () {
    return this.hasCollided;
};

HomingRocket.prototype._createParticle = function(atX, atY) {
    var life = 30 + Math.random() * 10;
    var p = new ParticleGameObject(this.kParticleTexture, atX, atY, life);
    //p.getRenderable().setColor([0, 0, 0, 0]);
    
    // size of the particle
    var r = 2.5 + Math.random() * 0.5;
    p.getXform().setSize(r, r);
    
    // final color
    var fr = 3.5 + Math.random();
    var fg = 0.4 + 0.1 * Math.random();
    var fb = 0.3 + 0.1 * Math.random();
    p.setFinalColor([fr, fg, fb, 0.9]);
    
    // velocity on the particle
    var fx = 10 - 20 * Math.random();
    var fy = 10 * Math.random();
    p.getPhysicsComponent().setVelocity([fx, fy]);
    p.getPhysicsComponent().setAcceleration([0,0]); // No gravity affect in space
    
    // size delta
    p.setSizeDelta(0.98);
    
    return p;
};