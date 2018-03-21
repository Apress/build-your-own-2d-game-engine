/*
 * Team 7-Alpha
 * CSS 490C
 * 2D Game Engine Design
 * File: FieldObject.js 
 * 
 * This set represents an asteroid with or without a powerup inside
 * 
 */


function FieldObject(inX, inY) {
    this.kChanceOfOre = 60;
    this.kChanceOfHomingBuff = 20;
    this.kChanceOfExplosiveBuff = 10;
    this.mObjectType = ' ';
    this.mAsteroid = null;
    this.mPrize = null;
    
    this.mDrawPrize = false;
    
    this.mDownSpeed = 0.2;
    
    this.mXPosition = inX;
    this.mYPosition = inY;
    
    this.mAsteroid = new Asteroid(inX, inY);

    this.randomValue = Math.random() * 100;

    if (this.randomValue <= this.kChanceOfExplosiveBuff) {
        this.mObjectType = 'H';
        this.mPrize = new HomingPower(inX, inY);
    } else if (this.randomValue <= this.kChanceOfHomingBuff && this.randomValue > this.kChanceOfExplosiveBuff) {
        this.mObjectType = 'X';
        this.mPrize = new ExplosivePower(inX, inY);

    } else if (this.randomValue < this.kChanceOfOre && this.randomValue > this.kChanceOfHomingBuff) {
        this.mObjectType = 'P';
        this.mPrize = new Ore(inX, inY);
    }
    
    // Make sure the asteroids respond to light
    // We want this code managed in the controller objects
    this.mAsteroid.getRenderable().addLight(gGameLights.getHeadLight());
    for (var i = 3; i < 6; i++) {
        this.mAsteroid.getRenderable().addLight(gGameLights.lightAtIndex(i));
    }

    // If there is a prize inside, make sure it responds to our lights
    
    if (this.mPrize) {
        this.mPrize.getRenderable().addLight(gGameLights.getHeadLight());
        for (var i = 3; i < 6; i++) {
            this.mPrize.getRenderable().addLight(gGameLights.lightAtIndex(i));
        }
    }
    
}

FieldObject.prototype.setDownSpeed = function (inSpeed) { this.mDownSpeed = inSpeed; };
FieldObject.prototype.setDrawPrize = function (inSet) { this.mDrawPrize = inSet; };
FieldObject.prototype.getXPosition = function () { return this.mXPosition; };
FieldObject.prototype.getYPosition = function () { return this.mYPosition; };
FieldObject.prototype.getToRemove = function () {
    if (this.mAsteroid === null && this.mPrize === null)
        return true;
    else
        return false;
};

FieldObject.prototype.draw = function (aCamera) {
    if(this.mAsteroid)
        this.mAsteroid.draw(aCamera);
    
    if(this.mPrize && this.mDrawPrize)
        this.mPrize.draw(aCamera);
};

FieldObject.prototype.update = function () {
    this.mYPosition -= this.mDownSpeed;
    
    // remember to update the sub-objects animation
    if(this.mAsteroid) {
        this.mAsteroid.getXform().setPosition(this.mXPosition,this.mYPosition);
        if(this.mAsteroid.getCollisionStatus()) {
            this.mAsteroid = null;
            this.mDrawPrize = true;
        }
        else
            this.mAsteroid.update();
    }
    
    if(this.mPrize) {
        this.mPrize.getXform().setPosition(this.mXPosition,this.mYPosition);
        if(this.mPrize.getCollisionStatus())
            this.mPrize = null;
        else
            this.mPrize.update();
    }
};

FieldObject.prototype.hasPrize = function () {
    if(this.randomValue < this.kChanceOfOre) {
         return true;
     } else { 
         return false;
    }
};
FieldObject.prototype.getRenderable = function () {
    if(this.mAsteroid)
        return this.mAsteroid.getRenderable();
    if(this.mPrize)
        return this.mPrize.getRenderable();
    
    return null;
};

FieldObject.prototype.getSubObject = function () {
    if(this.mAsteroid)
        return this.mAsteroid;
    if(this.mPrize)
        return this.mPrize;
    return null;
};

FieldObject.prototype.checkShipCollision = function (shipObject) {
    var touchPosition = [];
    
    if(this.mAsteroid) {
        if (GameObject.prototype.pixelTouches.call(shipObject, this.mAsteroid, touchPosition)) {
            //shipObject.setHasCollidedWithAsteroid(true);
            this.mAsteroid.setCollided(true);
        }
    } else
        if (this.mPrize)
        if (GameObject.prototype.pixelTouches.call(shipObject, this.mPrize, touchPosition)) {
            //shipObject.setHasCollidedWithAsteroid(true);
            this.mPrize.setCollided(true);
        }
};

FieldObject.prototype.getObjectType = function () {
    if (this.mAsteroid) {
        return 'A';
    } else {
      return this.mObjectType; 
    }
    
};
