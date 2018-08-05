
"use strict";

function Defender(Cheat,direct,DefenderTexture)
{
    this.Cheat = Cheat;
    this.mDirect = direct;
    this.RelaPos = null;
    this.OnWork = null;

    var pos = this.Cheat.getRigidBody().getCenter();
    var radius = this.Cheat.getRigidBody().getRadius();
    this.RelaPos = [radius*Math.cos(Math.PI * direct / 180)
        ,radius*Math.sin(Math.PI * direct / 180)];

    this.DefenderRender = new TextureRenderable(DefenderTexture);
    this.DefenderRender.getXform().setSize(28,7);
    this.DefenderRender.getXform().setPosition(pos[0]+radius * Math.cos(this.mDirect*Math.PI/180)
        ,pos[1]+radius * Math.sin(this.mDirect*Math.PI/180));
    this.DefenderRender.getXform().setRotationInDegree(90 + this.mDirect);

    GameObject.call(this,this.DefenderRender);
    
    var rigidShape = new RigidRectangle(this.getXform(),20,5);
    rigidShape.setMass(1);
    rigidShape.toggleDrawBound();
    this.setRigidBody(rigidShape);

//   this.toggleDrawRigidShape();

}

gEngine.Core.inheritPrototype(Defender,GameObject);


Defender.prototype.update = function ()
{
    if (this.OnWork != null)
    {
        var theta = 2;
        this.DefenderRender.setColor([0,1,0,0.3]);
        if (gEngine.Input.isKeyPressed(this.OnWork.Control.Left))
        {
            this.mDirect+=theta;
        }
        if (gEngine.Input.isKeyPressed(this.OnWork.Control.Right))
        {
            this.mDirect-=theta;
        }
        if (gEngine.Input.isKeyClicked(this.OnWork.Control.Leave))
        {
            this.OnWork = null;
            this.DefenderRender.setColor([0,1,0,0]);
        }
        this.mDirect =(this.mDirect+360)%360;
    }

    var pos = this.Cheat.getRigidBody().getCenter();
    var radius = this.Cheat.getRigidBody().getRadius();
    this.RelaPos = [radius*Math.cos(Math.PI * this.mDirect / 180)
        ,radius*Math.sin(Math.PI * this.mDirect / 180)];

    this.setCurrentFrontDir(Math.cos(this.mDirect),Math.sin(this.mDirect));
    //this.getXform().setRotationInDegree(this.mDirect);

    this.DefenderRender.getXform().setPosition(pos[0]+radius * Math.cos(this.mDirect*Math.PI/180)
        ,pos[1]+radius * Math.sin(this.mDirect*Math.PI/180));
    this.DefenderRender.getXform().setRotationInDegree(90 + this.mDirect);

    GameObject.prototype.update.call(this);
};

Defender.prototype.draw = function (aCamera) {
    GameObject.prototype.draw.call(this, aCamera);
};
