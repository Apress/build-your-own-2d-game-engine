

"use strict";

function CircleRenderable (R,Sides,PosX,PosY) {
    this.radius = 1;
    this.nsides = 10;
    this.posX = 0;
    this.posY = 0;

    Renderable.call(this);
    Renderable.prototype.setColor.call(this,[0,0,0,1]);
    Renderable.prototype._setShader(this,gEngine.DefaultResources.getConstColorShader());

    if (R != "undefined"){
        this.setRadius(R);
        this.setSides(Sides);
        this.setposX(PosX);
        this.setposY(PosY);
    }
}

gEngine.Core.inheritPrototype(CircleRenderable, Renderable);

CircleRenderable.prototype.draw = function (aCamera) {
    this.getXform().setSize(this.radius * 2 * Math.cos(Math.PI / this.nsides),this.radius * 2 * Math.sin(Math.PI / this.nsides));

    var delta=0;
    for (var i=0;i<this.nsides/2;i++)
    {
        this.getXform().setPosition(this.posX,this.posY);
        this.getXform().incRotationByDegree(360/this.nsides);
        Renderable.prototype.draw.call(this,aCamera);
        delta += (Math.PI * 2)/this.nsides;
    }
};

CircleRenderable.prototype.setRadius = function (R) {
    this.radius = R;
};

CircleRenderable.prototype.getRadius = function () {
    return this.radius;
};

CircleRenderable.prototype.setSides = function (Sides){
    this.nsides = Sides;
};

CircleRenderable.prototype.getSides = function () {
    return this.nsides;
};

CircleRenderable.prototype.setposX = function (PosX){
    this.posX = PosX;
};

CircleRenderable.prototype.getposX = function () {
    return this.posX;
};

CircleRenderable.prototype.setposY = function (PosY){
    this.posY = PosY;
};

CircleRenderable.prototype.getposY = function () {
    return this.posY;
};

CircleRenderable.prototype.setpos = function (Pos){
    this.posX = Pos[0];
    this.posY = Pos[1];
};

CircleRenderable.prototype.getpos = function () {
    return [this.posX,this.posY];
};



