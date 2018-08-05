"use strict";

LifePotion.eAssets = Object.freeze({
    eLifePotionTexture: "./assets/props/lifePotion.png"
});

function LifePotion(
    posX, posY, restore,
    allObj, allObstacle, aDestroyable
) {
    this.mLifePotion = new TextureRenderable(LifePotion.eAssets.eLifePotionTexture);
    this.mLifePotion.setColor([1, 1, 1, 0]);
    this.mLifePotion.getXform().setPosition(posX, posY);
    this.mLifePotion.getXform().setSize(4, 4);

    GameObject.call(this, this.mLifePotion);
    var r = new RigidRectangle(this.mLifePotion.getXform(), 4, 4);
    this.setRigidBody(r);
    this.getRigidBody().setVelocity(0, 0);
    this.getRigidBody().setMass(0.1);
    this.getRigidBody().setInertia(0);
    this.getRigidBody().setRestitution(0);
    
    this.mAllObjs = allObj;
    this.mObstacle = allObstacle;
    this.mDestroyable = aDestroyable;
    
    this.mRestore = restore;

    this.mArcherSet = [];
    var i, obj;
    for (i = 0; i < this.mObstacle.size(); i++) {
        obj = this.mObstacle.getObjectAt(i);
        if (obj instanceof Archer) {
            this.mArcherSet.push(obj);
        }
    }
    //this.toggleDrawRenderable();
    //this.toggleDrawRigidShape();
}
gEngine.Core.inheritPrototype(LifePotion, GameObject);

LifePotion.prototype.update = function () {
    var i, archX, archY, distance;
    var mindistance = 8, minarch = -1;

    for (i = 0; i < this.mArcherSet.length; ++i) {
        archX = this.mArcherSet[i].getXform().getXPos();
        archY = this.mArcherSet[i].getXform().getYPos();
        distance = this.calculateDistance(
            this.getXform().getXPos(),
            this.getXform().getYPos(),
            archX, archY
        );
        if (distance <= 8) {
            if (distance <= mindistance) {
                minarch = i;
                mindistance = distance;
            }
        }
    }
    if (minarch !== -1) {
        this.mArcherSet[minarch].addHp(this.getRestore());
        this.mAllObjs.removeFromSet(this);
        this.mDestroyable.removeFromSet(this);
    }

    GameObject.prototype.update.call(this);
    //this.mLifePotion.getXform().setRotationInRad(0);
};

LifePotion.prototype.getRestore = function () {
    return this.mRestore;
};


LifePotion.prototype.calculateDistance = function (posX, posY, aX, aY) {
    return Math.sqrt(Math.pow(aX - posX, 2)
        + Math.pow(aY - posY, 2));
};

LifePotion.loadAssets = function () {
    gEngine.Textures.loadTexture(LifePotion.eAssets.eLifePotionTexture);
};

LifePotion.unloadAssets = function () {
    gEngine.Textures.unloadTexture(LifePotion.eAssets.eLifePotionTexture);
};

LifePotion.randomLifePotion = function (xpos, ypos, allObj, allObstacle, aDestroyable) {
    var newLifePotion = null;
    var restoreRand = Math.floor(0, 10);

    if (restoreRand < 4) {
        newLifePotion = new LifePotion(xpos, ypos, 1, allObj, allObstacle, aDestroyable);
    }
    else if (restoreRand >= 4 && restoreRand < 7) {
        newLifePotion = new LifePotion(xpos, ypos, 2, allObj, allObstacle, aDestroyable);
    }
    else if (restoreRand >= 7 && restoreRand < 9) {
        newLifePotion = new LifePotion(xpos, ypos, 3, allObj, allObstacle, aDestroyable);
    }
    else if (restoreRand >= 9 && restoreRand < 10) {
        newLifePotion = new LifePotion(xpos, ypos, 4, allObj, allObstacle, aDestroyable);
    }

    return newLifePotion;
};