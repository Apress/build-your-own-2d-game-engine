"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Boom(texture) {
    this.weight = 50;
    this.mBoom = new TextureRenderable(texture);
    this.mBoom.setColor([1, 1, 1, 0]);
    this.mBoom.getXform().setPosition(Math.random() * 512 - 256, Math.random() * 512 - 256);
    this.radius = 2*Math.sqrt(this.weight);
    this.mBoom.getXform().setSize(this.radius, this.radius);
    GameObject.call(this, this.mBoom);

    var r = new RigidCircle(this.getXform(), this.radius/2);
    this.setRigidBody(r);
    
}
gEngine.Core.inheritPrototype(Boom, GameObject);


Boom.prototype.update = function () {
    this.getRigidBody().setVelocity(0,0);
    GameObject.prototype.update.call(this);
};


Boom.prototype.setPos = function(){
    this.mBoom.getXform().setPosition(Math.random() * 512 - 256, Math.random() * 512 - 256);
};

Boom.prototype.getWeight = function(){
    return this.weight;
};

Boom.prototype.setWeight = function(weight) {
    this.weight = weight;
};

