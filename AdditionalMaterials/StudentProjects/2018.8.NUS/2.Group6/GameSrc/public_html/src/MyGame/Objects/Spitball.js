"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Spitball(texture, posX, posY, vX, vY) {
    this.weight = 2;
    this.radius = 2*Math.sqrt(this.weight);
    this.unitVecX = vX;
    this.unitVecY = vY;
    this.vX = vX * 60;
    this.vY = vY * 60;
    this.mSpitball = new SpriteRenderable(texture);
    this.mSpitball.setColor([1, 1, 1, 0]);
    this.mSpitball.getXform().incRotationByDegree(Math.random() * 360);
    this.mSpitball.getXform().setPosition(posX, posY);
    this.mSpitball.getXform().setSize(this.radius, this.radius);
    var num = Math.floor(Math.random()*3.1);
    this.mSpitball.setElementPixelPositions(num*256, (num+1)*256, 0, 256);
    GameObject.call(this, this.mSpitball);

    var r = new RigidCircle(this.getXform(), 0.25*Math.sqrt(this.radius*this.radius + this.radius*this.radius));
    this.setRigidBody(r);
}
gEngine.Core.inheritPrototype(Spitball, GameObject);


Spitball.prototype.update = function () {
    var decreaseVX = 1 * Math.abs(this.unitVecX);
    var decreaseVY = 1 * Math.abs(this.unitVecY);
    if(this.vX > 0){
        this.vX -= decreaseVX;
        if(this.vX < 0)
            this.vX = 0;
    }
    else if(this.vX < 0){
        this.vX += decreaseVX;
        if(this.vX > 0)
            this.vX = 0;
    }
    if(this.vY > 0){
        this.vY -= decreaseVY;
        if(this.vY < 0)
            this.vY = 0;
    }
    else if(this.vY < 0){
        this.vY += decreaseVY;
        if(this.vY > 0)
            this.vY = 0;
    }
    const r = new RigidCircle(this.getXform(), 0.25*Math.sqrt(this.radius*this.radius + this.radius*this.radius));
    this.setRigidBody(r);
    this.getRigidBody().setVelocity(this.vX,this.vY);
    GameObject.prototype.update.call(this);
};


Spitball.prototype.getWeight = function(){
    return this.mSpitball.getXform().getSize()[0];
};

Spitball.prototype.getSpitballRadius = function() {
    return this.mSpitball.getXform().getHeight()/2;
};

