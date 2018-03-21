/* 
 * Team 7-Alpha
 * CSS 490C
 * 2D Game Engine Design
 * File: AsteroidList.js 
 * 
 * This is the file contains a list of asteroid objects
 */

function FieldObjectList() {
    
    GameObjectSet.call(this);
    this.mTimer = 0;
    this.mDelayBetweenSpawns = 80;
    this.mDelayBase = 30;
}

gEngine.Core.inheritPrototype(FieldObjectList, GameObjectSet);

FieldObjectList.prototype._addRandomAsteroid = function () {
    var randomValue = Math.random() * 80 + 10;
    var newAsteroid = new FieldObject(randomValue, 110);
    randomValue = Math.random() * 4 * 0.1 + 0.1;
    newAsteroid.setDownSpeed(randomValue);
    this.mSet.push(newAsteroid);
};

FieldObjectList.prototype.setDifficulty = function(inDiff) {
    switch (inDiff) {
        case 1:
            this.mDelayBetweenSpawns = 70;
            this.mDelayBase = 20;
            break;
        case 2:
            this.mDelayBetweenSpawns = 50;
            this.mDelayBase = 15;
            break;
        case 3:
            this.mDelayBetweenSpawns = 40;
            this.mDelayBase = 10;
            break;
    }
};

FieldObjectList.prototype.setDrawPrize = function (inSet) { 
    for (var i = 0; i < this.mSet.length; i++)
        this.mSet[i].setDrawPrize(inSet);
};

FieldObjectList.prototype.update = function (scanModeBoolean) {

    if (scanModeBoolean === false) {
        this.mTimer--;
    }
    
    // Purge any asteroids that need to be removed
    var i;
    var toRemove = [];

    // change field object behavior based on scan mode
    for (i = 0; i < this.mSet.length; i++) {
        var asteroid = this.mSet[i].getSubObject();
        if (scanModeBoolean === true) {
            this.mSet[i].setDownSpeed(0.05);

            if (this.mSet[i].getObjectType() === 'A') {
                if (this.mSet[i].hasPrize() === true) {
                    asteroid.getRenderable().setColor([0.2, 1, 0.2, 0.3]);
                } else {
                    asteroid.getRenderable().setColor([0.2, 0.2, 1, 0.1]);
                }
            }
        } else if (scanModeBoolean === false) {

            this.mSet[i].setDownSpeed(0.2);

            if (this.mSet[i].getObjectType() === 'A') {
                asteroid.getRenderable().setColor([1, 1, 1, 0]);
            }
        }

        // First, get any asteroids that fell off of the bottom of the screen
        if (this.mSet[i].getToRemove() === true) {
            toRemove.push(this.mSet[i]);
        } else {
            var obj = this.mSet[i];
            if (obj.getYPosition() < -10.0)
                toRemove.push(this.mSet[i]);
        }
    }

    for (i = 0; i < toRemove.length; i++) {
        this.removeFromSet(toRemove[i]);
    }

    // Add asteroids
    if (this.mTimer < 0) {
        this._addRandomAsteroid();
        this.mTimer = Math.random() * this.mDelayBetweenSpawns + this.mDelayBase;
    }

    // Update all asteroids
    GameObjectSet.prototype.update.call(this);
};

FieldObjectList.prototype.getLength = function () {
    return this.mSet.length;
};

// run through the list of field objects to check collision against the mining ship
// if there is a collision, the hasCollided flag is set to true 
// on the field object
FieldObjectList.prototype.checkAsteroidCollision = function (fieldObjectList) {
    var i, j;
    for (i = 0; i < this.mSet.length; i++) {
        for (j = 0; j < fieldObjectList.getLength(); j++) {
            this.mSet[i].checkAsteroidCollision(fieldObjectList.getObjectAt(j));
        }
    }
};

FieldObjectList.prototype.checkShipCollision = function (shipObject) {
    var i;
    for (i = 0; i < this.mSet.length; i++) {
        this.mSet[i].checkShipCollision(shipObject);
    }
};