/* 
 * Team 7-Alpha
 * CSS 490C
 * 2D Game Engine Design
 * File: RocketList.js 
 * 
 * This is the file contains a list of rocket objects
 */


function ProjectileList(miningShip) {
    this.mMiningShip = miningShip;
    GameObjectSet.call(this);
}

gEngine.Core.inheritPrototype(ProjectileList, GameObjectSet);

ProjectileList.prototype.launchRocket = function (xPos) {
    
    var newRocket = null;
    
    if (this.mMiningShip.getCurrentPowerStatus() === 'X') {
        newRocket = new ExplosiveRocket(xPos, 10);
        this.mMiningShip.useAmmo();
    } else if (this.mMiningShip.getCurrentPowerStatus() === 'H') {
        newRocket = new HomingRocket(xPos, 10);
        this.mMiningShip.useAmmo();
    } else {
        newRocket = new Rocket(xPos, 10);
    }

    for (var i = 0; i < 5; i++) {
        newRocket.getRenderable().addLight(gGameLights.lightAtIndex(i));
    }
    this.mSet.push(newRocket);
};

ProjectileList.prototype.update = function (scanModeBoolean) {
    // Purge any rockets that need to be removed
    var i;
    var toRemove = []; 
    // First, get any rockets that fell off the top of the screen
    for (i = 0; i < this.mSet.length; i++) {
        
        if (scanModeBoolean === true) {
            this.mSet[i].setUpSpeed(0.15);
        } else if (scanModeBoolean === false) {
            this.mSet[i].setUpSpeed(0.6);
        }
        
        
        // check to see if rocket has collided with an asteroid
        if (this.mSet[i].getCollisionStatus() === true) {
          if (this.mSet[i].getRocketType() === 'X') {
              var newExplosion = new Explosion(this.mSet[i].getXform().getXPos(), this.mSet[i].getXform().getYPos());
                this.mSet.push(newExplosion);
            }
            toRemove.push(this.mSet[i]);
        } else {
            var xform = this.mSet[i].getXform();
            if (xform.getYPos() > 110.0)
                toRemove.push(this.mSet[i]);
        }     
    }

    for (i = 0; i < toRemove.length; i++) {
        this.removeFromSet(toRemove[i]);
    }
    
    // Update all projectiles
    GameObjectSet.prototype.update.call(this);
};

// run through the list of rockets to check collision against each asteroid
// if the rocket and asteroid collide, the hasCollided flag is set to true 
// on both the Rocket object and the Asteroid object
ProjectileList.prototype.checkAsteroidCollision = function (fieldObjectList) {
    var i, j;
    for (i = 0; i < this.mSet.length; i++) {
        for (j = 0; j < fieldObjectList.getLength(); j++) {
            this.mSet[i].checkAsteroidCollision(fieldObjectList.getObjectAt(j));
        }
    }
};