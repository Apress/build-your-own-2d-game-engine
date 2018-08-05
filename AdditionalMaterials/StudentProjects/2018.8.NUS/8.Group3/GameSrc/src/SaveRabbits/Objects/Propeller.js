
"use strict";

function Propeller(Cheat,direct,PropellerTexture,PropellerFireTexture)
{
    this.Cheat = Cheat;
    this.mDirect = direct;
    this.OnWork = null;
    this.fire = false;
    var pos = this.Cheat.getRigidBody().getCenter();
    var radius = this.Cheat.getRigidBody().getRadius();

    this.PropellerRender = new TextureRenderable(PropellerTexture);
    this.PropellerRender.getXform().setSize(radius,radius/4);
    this.PropellerRender.getXform().setPosition(pos[0]+(radius*19/16)* Math.cos(this.mDirect*Math.PI/180)
                                                ,pos[1]+(radius*19/16)* Math.sin(this.mDirect*Math.PI/180));
    this.PropellerRender.getXform().setRotationInDegree(90 + this.mDirect);
    this.soundcounrt = 20;

    //喷了火
    this.PropellerFireRender = new TextureRenderable(PropellerFireTexture);
    this.PropellerFireRender.getXform().setSize(radius, radius / 2);
    this.PropellerFireRender.getXform().setPosition(pos[0] + (radius * 19 / 16) * Math.cos(this.mDirect * Math.PI / 180)
        , pos[1] + (radius * 19 / 16) * Math.sin(this.mDirect * Math.PI / 180));
    this.PropellerFireRender.getXform().setRotationInDegree(90 + this.mDirect);

    GameObject.call(this,this.PropellerBaseRender);
}

gEngine.Core.inheritPrototype(Propeller,GameObject);


Propeller.prototype.update = function ()
{
        var audio = "assets/sounds/propeller_fire.mp3";
    this.fire = false;
    var pos = this.Cheat.getRigidBody().getCenter();
    var radius = this.Cheat.getRigidBody().getRadius();
    if (this.OnWork != null)
    {
        var theta = 2;
        this.PropellerRender.setColor([1,0,0,0.3]);
        this.PropellerFireRender.setColor([1,0,0,0.3]);
        if (gEngine.Input.isKeyPressed(this.OnWork.Control.Left))
        {
            this.mDirect+=theta;
        }
        if (gEngine.Input.isKeyPressed(this.OnWork.Control.Right))
        {
            this.mDirect-=theta;
        }
        if (gEngine.Input.isKeyPressed(this.OnWork.Control.Fire))
        {
            if(this.soundcounrt<0)
            {
               gEngine.AudioClips.playACue(audio); 
               this.soundcounrt = 20;
            }else
            {
                this.soundcounrt--;
            }
             
            if (this.Cheat.getVelocity()+1<=20)
                this.Cheat.incVelocity(1);
            else
                this.Cheat.setVelocity(20);
            this.fire = true;
        }
        if (gEngine.Input.isKeyClicked(this.OnWork.Control.Leave))
        {
            this.OnWork = null;
            this.PropellerRender.setColor([1,0,0,0]);
            this.PropellerFireRender.setColor([1,0,0,0]);
        }
        this.Cheat.setCurrentFrontDir([Math.cos((this.mDirect+180)*Math.PI/180),Math.sin((this.mDirect+180)*Math.PI/180)]);
    }


    this.Cheat.incVelocity(-0.25);

    if (this.fire)
    {
        this.PropellerFireRender.getXform().setSize(radius, radius / 2);
        this.PropellerFireRender.getXform().setPosition(pos[0] + (radius * 19 / 16) * Math.cos(this.mDirect * Math.PI / 180)
            , pos[1] + (radius * 19 / 16) * Math.sin(this.mDirect * Math.PI / 180));
        this.PropellerFireRender.getXform().setRotationInDegree(90 + this.mDirect);
    }
    else
    {
        this.PropellerRender.getXform().setSize(radius, radius / 4);
        this.PropellerRender.getXform().setPosition(pos[0] + (radius * 17 / 16) * Math.cos(this.mDirect * Math.PI / 180)
            , pos[1] + (radius * 17 / 16) * Math.sin(this.mDirect * Math.PI / 180));
        this.PropellerRender.getXform().setRotationInDegree(90 + this.mDirect);
    }
};

Propeller.prototype.draw = function (aCamera) {
    if (this.fire)
        this.PropellerFireRender.draw(aCamera);
    else
        this.PropellerRender.draw(aCamera);
}
