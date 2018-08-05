Mine.eAssets = Object.freeze({
    eMineTexture: "assets/props/mine.png"
});

Mine.eAudio = Object.freeze({
    eExplode : "assets/sounds/Explosion.mp3"
});

function Mine(posX, posY, texture, damage, allObj, allObstacle, aDestroyable, allProp) {
    this.mMine = new TextureRenderable(texture);
    this.mMine.setColor([1, 1, 1, 0]);
    this.mMine.getXform().setPosition(posX, posY);
    this.mMine.getXform().setSize(8, 8);

    GameObject.call(this, this.mMine);

    var r = new RigidCircle(this.mMine.getXform(), 3);
    this.setRigidBody(r);
    this.getRigidBody().setVelocity(0, 0);
    this.getRigidBody().setMass(0.1);
    this.getRigidBody().setInertia(0);
    this.getRigidBody().setRestitution(0);

    this.mAllObjs = allObj;
    this.mObstacle = allObstacle;
    this.mDestroyable = aDestroyable;
    this.mProps = allProp;
    this.mdamage = damage;

    this.mArcherSet = [];
    var i;
    for (i = 0; i < this.mObstacle.size(); i++) {
        obj = this.mObstacle.getObjectAt(i);
        if (obj instanceof Archer) {
            this.mArcherSet.push(obj);
        }
    }

    //this.toggleDrawRenderable();
    // this.toggleDrawRigidShape();
}

gEngine.Core.inheritPrototype(Mine, GameObject);

Mine.prototype.update = function () {
    GameObject.prototype.update.call(this);

    var i, archX, archY, distance;
    var mindistance = 10, minarch = -1;
    for (i = 0; i < this.mArcherSet.length; ++i) {
        archX = this.mArcherSet[i].getXform().getXPos();
        archY = this.mArcherSet[i].getXform().getYPos();
        distance = this.calculateDistance(
            this.getXform().getXPos(),
            this.getXform().getYPos(),
            archX, archY
        );
        if (distance <= 10) {
            if (distance <= mindistance) {
                minarch = i;
                mindistance = distance;
            }
        }
    }
    if (minarch !== -1) {
        this.explode();
    }
};

Mine.prototype.draw = function (aCamera) {
    GameObject.prototype.draw.call(this, aCamera);
};

Mine.prototype.getDamage = function () {
    return this.mdamage;
};


Mine.prototype.calculateDistance = function (posX, posY, aX, aY) {
    return Math.sqrt(Math.pow(aX - posX, 2)
        + Math.pow(aY - posY, 2));
};

Mine.loadAssets = function () {
    gEngine.Textures.loadTexture(Mine.eAssets.eMineTexture);

    gEngine.AudioClips.loadAudio(Mine.eAudio.eExplode);
};

Mine.unloadAssets = function () {
    gEngine.Textures.unloadTexture(Mine.eAssets.eMineTexture);

    gEngine.AudioClips.unloadAudio(Mine.eAudio.eExplode);
};

Mine.prototype.explode = function () {
    gEngine.AudioClips.playACue(Mine.eAudio.eExplode);

    this.mAllObjs.removeFromSet(this);
    this.mDestroyable.removeFromSet(this);

    var pos = this.getXform().getPosition();
    var i;
    for (i = 0; i < this.mAllObjs.size(); i++) {
        var obj = this.mAllObjs.getObjectAt(i);
        var objPos = obj.getXform().getPosition();
        var vector = [objPos[0] - pos[0], objPos[1] - pos[1]];
        var distance = Math.sqrt(vector[0] * vector[0] + vector[1] * vector[1]);

        if (distance < 10) {
            if (obj instanceof Archer) {
                obj.loseHp(this.getDamage() * 2);
                if (obj.getXform().getPosition()[0] > this.getXform().getPosition()[0])
                    obj.getRigidBody().setVelocity(50, 50);
                else if (obj.getXform().getPosition()[0] < this.getXform().getPosition()[0])
                    obj.getRigidBody().setVelocity(-50, 50);
                else
                    obj.getRigidBody().setVelocity(0, 70);
            }
            else if (obj instanceof Bow || obj instanceof LifePotion) {
                this.mAllObjs.removeFromSet(obj);
                this.mDestroyable.removeFromSet(obj);
                this.mProps.removeFromSet(obj);
            }
            else if (obj instanceof Mine) {
                obj.explode();
            }
        }
        else if (distance <= 25 && distance > 10) {
            if (obj instanceof Archer) {
                obj.loseHp(this.getDamage() * 1.5);
                if (obj.getXform().getPosition()[0] > this.getXform().getPosition()[0])
                    obj.getRigidBody().setVelocity(30, 30);
                else if (obj.getXform().getPosition()[0] < this.getXform().getPosition()[0])
                    obj.getRigidBody().setVelocity(-30, 30);
                else
                    obj.getRigidBody().setVelocity(0, 50);
            }
            else if (obj instanceof Bow || obj instanceof LifePotion) {
                this.mAllObjs.removeFromSet(obj);
                this.mDestroyable.removeFromSet(obj);
                this.mProps.removeFromSet(obj);
            }
            else if (obj instanceof Mine) {
                obj.explode();
            }
        }
        else if (distance <= 50 && distance > 25) {
            if (obj instanceof Archer) {
                obj.loseHp(this.getDamage() * 1);
                if (obj.getXform().getPosition()[0] > this.getXform().getPosition()[0])
                    obj.getRigidBody().setVelocity(20, 20);
                else if (obj.getXform().getPosition()[0] < this.getXform().getPosition()[0])
                    obj.getRigidBody().setVelocity(-20, 20);
                else
                    obj.getRigidBody().setVelocity(0, 30);
            }
        }
        else if (distance <= 80 && distance > 50) {
            if (obj instanceof Archer) {
                if (obj.getXform().getPosition()[0] > this.getXform().getPosition()[0])
                    obj.getRigidBody().setVelocity(10, 10);
                else if (obj.getXform().getPosition()[0] < this.getXform().getPosition()[0])
                    obj.getRigidBody().setVelocity(-10, 10);
                else
                    obj.getRigidBody().setVelocity(0, 10);
            }
        }
    }
};