
"use strict";

function SpaceShip(atX,atY,Cheat,PropellerTexture,PropellerFireTexture,DefenderTexture,StairsTexture,AdvanceTexture,
                    DefendTexture,LeftAttackTexture,RightAttackTexture,GunBarrel,GunBase) {
    this.SpaceShipMap = null;
    this.Cheat = Cheat;
    this.mapSize = 32/27;
    this.OnWork = null;
    this.mDefender = null;
    this.mPropeller = null;
    this.ShipWeapons = [];
    
    this.mMapRender = new Renderable();
    this.mMapRender.getXform().setSize(this.mapSize,this.mapSize);
    this.mMapRender.setColor([200/256,10/256,192/256,1]);
    this.mMapRender.getXform().setRotationInDegree(0);
    
      //stairs render
    this.mStairsRender = new TextureRenderable(StairsTexture);
    this.mStairsRender.getXform().setSize(this.mapSize,this.mapSize);
    this.mStairsRender.setColor([68/256,0,135/256,1]);
    this.mStairsRender.getXform().setRotationInDegree(0);
    
    //advance controller render
    this.mAdvanceTexture = AdvanceTexture;
    this.mDefendTexture = DefendTexture;
    this.mLeftAttackTexture = LeftAttackTexture;
    this.mRightAttackTexture = RightAttackTexture;
    
    this.mTextureRender = new TextureRenderable(this.mAdvanceTexture);
    this.mPropeller = new Propeller(this.Cheat,45,PropellerTexture,PropellerFireTexture);
    this.mDefender = new Defender(this.Cheat,135,DefenderTexture);

    for (var i = 0,Weapon;i < 4 ; i++)
    {
        Weapon = new ShipWeapon(this.Cheat,i*90,GunBarrel,GunBase);
        this.ShipWeapons.push(Weapon);
    }
}

gEngine.Core.inheritPrototype(SpaceShip,GameObject);

SpaceShip.prototype.draw = function (aCamera) {

    this.mPropeller.draw(aCamera);
    this.mDefender.draw(aCamera);
    for (var i = 0;i < 4 ; i++)
    {
        this.ShipWeapons[i].draw(aCamera);
    }

    this.Cheat.draw(aCamera);

    var radius = this.Cheat.getRigidBody().getRadius();
    var Pos = this.Cheat.getRigidBody().getCenter();

    for (var i=0;i<32;i++)
        for (var j=0;j<32;j++)
        {
            if (!this.SpaceShipMap[i][j])
                continue;
            var pos = [this.mapSize * (j- 16 + 1/2) - 0.2,this.mapSize * ( - i + 15 + 1/2) - 0.2];

            this.mMapRender.getXform().setPosition(Pos[0]+pos[0],Pos[1]+pos[1]);
            this.mMapRender.draw(aCamera);

            if (this.SpaceShipMap[i][j] == 2){
                this.mStairsRender.getXform().setPosition(Pos[0]+pos[0],Pos[1]+pos[1]);
                this.mStairsRender.draw(aCamera);
            }
        }
        //如果放大缩小球位置不对
       //draw advance controller
      this.mTextureRender.setTexture(this.mAdvanceTexture);
      this.mTextureRender.getXform().setSize(3*this.mapSize,6*this.mapSize);
      this.mTextureRender.getXform().setPosition(-1*this.mapSize+Pos[0],1.9*this.mapSize+Pos[1]);
      this.mTextureRender.draw(aCamera);
        //draw defend controller
      this.mTextureRender.setTexture(this.mDefendTexture);
      this.mTextureRender.getXform().setSize(2*this.mapSize,4*this.mapSize);
      this.mTextureRender.getXform().setPosition(8*this.mapSize+Pos[0],6.8*this.mapSize+Pos[1]);
      this.mTextureRender.draw(aCamera);
        //draw left attack controller
      this.mTextureRender.setTexture(this.mLeftAttackTexture);
      this.mTextureRender.getXform().setSize(2.6*this.mapSize,5.2*this.mapSize);
      this.mTextureRender.getXform().setPosition(-10.9*this.mapSize+Pos[0],1.4*this.mapSize+Pos[1]);
      this.mTextureRender.draw(aCamera);
       
      this.mTextureRender.getXform().setPosition(-1.9*this.mapSize+Pos[0],11.4*this.mapSize+Pos[1]);
      this.mTextureRender.draw(aCamera);
        //draw right attack controller
      this.mTextureRender.setTexture(this.mRightAttackTexture);
      this.mTextureRender.getXform().setPosition(0.5*this.mapSize+Pos[0],-9.6*this.mapSize+Pos[1]);
      this.mTextureRender.draw(aCamera);
      
      this.mTextureRender.getXform().setPosition(10.5*this.mapSize+Pos[0],1.4*this.mapSize+Pos[1]);
      this.mTextureRender.draw(aCamera);
};

SpaceShip.prototype.update = function (Rabbit_1,Rabbit_2,Cheat) {

    var i = null,j = null;

    switch (Rabbit_1.mState)
    {
        case Rabbit.eHeroState.eAttack: i = this.judge(Rabbit_1);
                                        if (this.ShipWeapons[i].OnWork == null)
                                            this.ShipWeapons[i].OnWork = Rabbit_1;
                                        break;
        case Rabbit.eHeroState.eAdvance:if (this.mPropeller.OnWork == null)
                                        this.mPropeller.OnWork = Rabbit_1;
                                        break;
        case Rabbit.eHeroState.eDefend: if(this.mDefender.OnWork == null)
                                        this.mDefender.OnWork =Rabbit_1;
                                        break;
        default:break;
    }

    switch (Rabbit_2.mState)
    {
        case Rabbit.eHeroState.eAttack: j = this.judge(Rabbit_2);
                                        if (this.ShipWeapons[j].OnWork == null)
                                            this.ShipWeapons[j].OnWork = Rabbit_2;
                                        break;
        case Rabbit.eHeroState.eAdvance:if (this.mPropeller.OnWork == null)
                                        this.mPropeller.OnWork = Rabbit_2;
                                        break;
        case Rabbit.eHeroState.eDefend: if(this.mDefender.OnWork == null)
                                        this.mDefender.OnWork = Rabbit_2;
                                        break;
        default:break;
    }

    Cheat.update();

    this.mPropeller.update();
    this.mDefender.update();

    for (var k = 0;k<4;k++)
        this.ShipWeapons[k].update();

};

SpaceShip.prototype.judge= function(aRabbit){
    if (aRabbit.mState == Rabbit.eHeroState.eAttack)
    {
        if (aRabbit.RelaPos[0]>aRabbit.RelaPos[1])
        {
            if (-aRabbit.RelaPos[0]<aRabbit.RelaPos[1])
                return 0;
            else return 3;
        }
        else
        {
            if (-aRabbit.RelaPos[0]<aRabbit.RelaPos[1])
                return  1;
            else return  2;
        }
    }
};

SpaceShip.prototype.getShipWeapon= function(){      //NEW
    return this.ShipWeapons;
};
