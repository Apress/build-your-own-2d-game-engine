"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Blackhole(texture) {
    this.mBlack = new TextureRenderable(texture);
    this.mBlack.setColor([1, 1, 1, 0]);
    this.mBlack.getXform().setPosition(Math.random() * 512 - 256, Math.random() * 512 - 256);
    var weight = 2*Math.sqrt(10);
    this.mBlack.getXform().setSize(weight, weight);
    GameObject.call(this, this.mBlack);

    var r = new RigidCircle(this.getXform(), weight/2);
    this.setRigidBody(r);
    
}
gEngine.Core.inheritPrototype(Blackhole, GameObject);


Blackhole.prototype.update = function () {
    this.getXform().incRotationByDegree(1);
    this.getRigidBody().setVelocity(0,0);
    GameObject.prototype.update.call(this);
};


Blackhole.prototype.setPos = function(){
    this.mBlack.getXform().setPosition(Math.random() * 512 - 256, Math.random() * 512 - 256);
};

Blackhole.prototype.setWeight = function(){
    const weight = Math.ceil(Math.random()*3) + 2;
    this.mBlack.getXform().setSize(weight, weight);
};

Blackhole.prototype.getWeight = function(){
    return this.mBlack.getXform().getSize()[0];
};

Blackhole.prototype.getBlackRadius = function() {
    return this.mBlack.getXform().getHeight()/2;
};

