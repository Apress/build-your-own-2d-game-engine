/*jslint node: true, vars: true */
/*global gEngine: false, GameObjectSet: false,Hero, SpriteRenderable: false, HelperFunctions: false */
/* find out more about jslint: http://www.jslint.com/help.html */

function Manager(spriteTexture, object, low, high, autospawn) {

    this.sprite = spriteTexture;
    this.object = object;
    this.timer = high;
    this.low = low;
    this.high = high;
    this.autoSpawn = autospawn;
    this.score = 0;

    GameObjectSet.call(this);
}
gEngine.Core.inheritPrototype(Manager, GameObjectSet);

Manager.prototype.update = function () {

    GameObjectSet.prototype.update.call(this);

    //if the auto spawn counter has
    if (this.autoSpawn) {

        //decrease the timer
        this.timer--;

        //if the timer has hit 0
        if (this.timer <= 0) {

            //create an object
       //     console.log("creating");
            this._createObject();

            //calculate a new timer between this.low and this.high seconds long
            this.timer = HelperFunctions.Core.generateRandomFloat(this.low, this.high);
        }
    }

    //check the lifetimes of the objects
    for (var i = 0; i < this.size(); i++) {
        if (this.getObjectAt(i).shouldDie()) {
            this.score += this.getObjectAt(i).getScore();
                      this.removeObjectAt(i);


            
        }
    }

};

Manager.prototype.getScore = function () {
    return this.score;
};

Manager.prototype.deleteAll = function () {
    this.emptySet();
};

Manager.prototype.setLowAndHigh = function (low, high) {

    this.low = low;
    this.high = high;

};

Manager.prototype.checkCollisions = function (otherManager, collisionInfo) {

    //check collisions with all objects in this object set
    //with all the objects in the other set
    for (var i = 0; i < otherManager.size(); i++) {
        for (var j = 0; j < this.size(); j++) {

            //console.log(this.getObjectAt(j));
            // console.log(otherManager.getObjectAt(i));
            if (this.getObjectAt(j).isVisible() && otherManager.getObjectAt(i).isVisible()) {

                var collided = this.getObjectAt(j).getPhysicsComponent().collided(otherManager.getObjectAt(i).getPhysicsComponent(), collisionInfo);
                if (collided) {

                    //this manager's object, handle the collision
                    this.getObjectAt(j).handleCollision(otherManager.getObjectType());

                    //other manager's object, handle the collision
                    otherManager.getObjectAt(i).handleCollision(this.getObjectType());
                }
            }
        }
    }
};

Manager.prototype.checkCollisionsByPixel = function (otherManager, collisionInfo) {

    //check collisions with all objects in this object set
    //with all the objects in the other set
    for (var i = 0; i < otherManager.size(); i++) {
        for (var j = 0; j < this.size(); j++) {

            //console.log(this.getObjectAt(j));
            // console.log(otherManager.getObjectAt(i));
            if (this.getObjectAt(j).isVisible() && otherManager.getObjectAt(i).isVisible()) {

                var collided = this.getObjectAt(j).pixelTouches(otherManager.getObjectAt(i), collisionInfo);
                if (collided) {

                    //this manager's object, handle the collision
                    this.getObjectAt(j).handleCollision(otherManager.getObjectType());

                    //other manager's object, handle the collision
                    otherManager.getObjectAt(i).handleCollision(this.getObjectType());
                }
            }
        }
    }
};

Manager.prototype.checkCollisionsWith = function (obj) {

    for (var i = 0; i < this.size(); i++) {
        var h = [];
        var fire = this.getObjectAt(i);
        var collided = fire.pixelTouches(obj, h);
        if (collided) {
            if (this.getObjectAt(i).isVisible() && obj.isVisible()) {
                //this manager's object, handle the collision
                this.getObjectAt(i).handleCollision(obj.constructor.name);

                //passed object, handle the collision
                obj.handleCollision(this.getObjectType());
            }
        }
    }
};

Manager.prototype._toggleAutospawn = function () {

    this.autoSpawn = !this.autoSpawn;

};

Manager.prototype.getObjectType = function () {

    return this.object.name;

};

Manager.prototype._createObject = function () {

    //add a new patrol to the set
    console.log(this.object.name);
    var mObject = new this.object(this.sprite);
    this.addToSet(mObject);

};

Manager.prototype._placeObject = function (size, x, y, camera) {

    //add a new patrol to the set
    var mObject = new this.object(this.sprite, size, x, y, camera);
    this.addToSet(mObject);
};


