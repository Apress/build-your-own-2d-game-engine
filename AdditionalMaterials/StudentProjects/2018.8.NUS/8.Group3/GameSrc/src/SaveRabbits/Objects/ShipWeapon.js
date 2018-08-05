
"use strict";

function ShipWeapon(Cheat,direct,GunBarrel,GunBase)
{
    this.Cheat = Cheat;

    this.mDirect = direct;
    this.Angle = 0;
    this.RelaPos = null;
    this.OnWork = null;
    this.kShootTimer = 15;
    this.mNumCycles = 15;
    this.kbulletTexture = "assets/jetpack.png";
    this.mProjectiles = new ParticleGameObjectSet();

    var pos = this.Cheat.getRigidBody().getCenter();
    var radius = this.Cheat.getRigidBody().getRadius();
    this.RelaPos = [radius*Math.cos(Math.PI * direct / 180)
        ,radius*Math.sin(Math.PI * direct / 180)];

    this.mGunBaseRender = new TextureRenderable(GunBase);
    this.mGunBaseRender.getXform().setSize(radius/4,radius/4);
    this.mGunBaseRender.getXform().setPosition( pos[0]+this.RelaPos[0],pos[1]+this.RelaPos[1]);

    var temp = this.mGunBaseRender.getXform().getPosition();
    this.mGunBarrelRender = new TextureRenderable(GunBarrel);
    this.mGunBarrelRender.getXform().setSize(radius/4,radius/4);
    this.mGunBarrelRender.getXform().setPosition(temp[0]+ radius/8* Math.cos((this.Angle + this.mDirect)*Math.PI/180)
                                                ,temp[1] + radius/8 * Math.sin((this.Angle + this.mDirect)*Math.PI/180));
    this.mGunBarrelRender.getXform().setRotationInDegree(this.Angle+this.mDirect+90);
    GameObject.call(this,this.mGunBaseRender);
    
}

gEngine.Core.inheritPrototype(ShipWeapon,GameObject);


ShipWeapon.prototype.update = function ()
{
    var audio = "assets/sounds/shoot.mp3";
    var pos = this.Cheat.getRigidBody().getCenter();
    var radius = this.Cheat.getRigidBody().getRadius();
    if (this.OnWork != null)
    {
        var theta = 2.5;
        this.mGunBaseRender.setColor([1,0,0,0.3]);
        this.mGunBarrelRender.setColor([1,0,0,0.3]);
        if (gEngine.Input.isKeyPressed(this.OnWork.Control.Left))
        {
            if (theta + this.Angle <= 90)
                this.Angle+=theta;
        }
        if (gEngine.Input.isKeyPressed(this.OnWork.Control.Right))
        {
            if (-theta + this.Angle >= -90)
                this.Angle-=theta;
        }
        if (gEngine.Input.isKeyPressed(this.OnWork.Control.Fire))
        {
            this.mNumCycles++;
            if(this.mNumCycles>this.kShootTimer)
            {
                var vx = Math.cos(Math.PI*(this.Angle+this.mDirect)/180);
                var vy = Math.sin(Math.PI*(this.Angle+this.mDirect)/180);
                var x = this.getXform().getXPos() + radius*vx/4;
                var y = this.getXform().getYPos() + radius*vy/4;
                var b = new Bullets(x , y, [ vx, vy], this.Angle+this.mDirect,this.kbulletTexture);
                gEngine.AudioClips.playACue(audio);
                b.getRenderable().getXform().setSize(4,4);
                this.mProjectiles.addToSet(b);
                this.mNumCycles = 0;
            }
        }
        if (gEngine.Input.isKeyClicked(this.OnWork.Control.Leave))
        {
            this.OnWork = null;
            this.mGunBaseRender.setColor([1,0,0,0]);
            this.mGunBarrelRender.setColor([1,0,0,0]);
        }
    }

    this.RelaPos = [radius*Math.cos(Math.PI * this.mDirect / 180)
                    ,radius*Math.sin(Math.PI * this.mDirect / 180)];
    this.mGunBaseRender.getXform().setPosition( pos[0]+this.RelaPos[0],pos[1]+this.RelaPos[1]);

    var temp = this.mGunBaseRender.getXform().getPosition();
    this.mGunBarrelRender.getXform().setPosition(temp[0]+ radius/8* Math.cos((this.Angle + this.mDirect)*Math.PI/180)
                                ,temp[1] + radius/8 * Math.sin((this.Angle + this.mDirect)*Math.PI/180));
    this.mGunBarrelRender.getXform().setRotationInDegree(this.Angle+this.mDirect+90);

    this.mProjectiles.update();
};

ShipWeapon.prototype.draw = function (aCamera) {
    this.mProjectiles.draw(aCamera);
    this.mGunBarrelRender.draw(aCamera);
    this.mGunBaseRender.draw(aCamera);
}

ShipWeapon.prototype.getProjectiles = function () { //new
    return this.mProjectiles;
};
