
/*jslint node: true, vars: true, white: true */
/*global gEngine, GameObject, SpriteRenderable, RigidCircle, RigidRectangle, Particle */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!
function Rabbit(SpaceShip,TEXTURE,atX,atY,TexPos) {
    this.SpaceShip = SpaceShip;
    this.Cheat = this.SpaceShip.Cheat;

    this.RelaPos = [atX,atY];
    this.TexPos = TexPos;

    this.mState = Rabbit.eHeroState.eMove;

    this.curdirect = null;
    this.predirect = null;

    this.squareSize = 1;
    this.step = 0.1;
    this.accel = 0;
    this.curLateral = 0;

    this.Control = null;


    var pos = this.Cheat.getXform().getPosition();
    var radius = this.Cheat.getRigidBody().getRadius();
    var Rabbit1 = new SpriteAnimateRenderable(TEXTURE);
    Rabbit1.getXform().setSize(radius * 1.5 / 16, radius  * 3 / 16);
    Rabbit1.getXform().setRotationInDegree(0);
    Rabbit1.setColor([1,1,1,0]);
    Rabbit1.getXform().setPosition(pos[0] * this.SpaceShip.mapSize,pos[1] * this.SpaceShip.mapSize);
    Rabbit1.setSpriteSequence(this.TexPos[1],376,64,128,1,0);
    Rabbit1.setAnimationSpeed(8);
    GameObject.call(this,Rabbit1);
}

gEngine.Core.inheritPrototype(Rabbit, GameObject);

Rabbit.eHeroState = Object.freeze({
    eMove: 1,
    eClimb: 2,
    eAttack: 3,
    eAdvance: 4,
    eDefend: 5,
    eFallDown: 6,
    eFaceLeft: 7,
    eFaceRight: 8,
    eWalkLeft: 9,
    eWalkRight:10,
    eClimbUp:11,
    eClimbDown:12
});

Rabbit.eDirect = Object.freeze({
    eLeft:1,
    eRight:2,
    eUp:3,
    eDown:4

});

Rabbit.prototype.ChangeAnimation = function(state){
    var radius = this.Cheat.getRigidBody().getRadius();
    this.getXform().setSize(radius * 1.5 / 16, radius  * 3 / 16);
    switch (state)
    {
        case Rabbit.eHeroState.eMove:
                this.getRenderable().setSpriteSequence(this.TexPos[1],376,64,128,1,0); break;
        case Rabbit.eHeroState.eWalkLeft:
                this.getRenderable().setSpriteSequence(this.TexPos[1],188,64,128,2,30); break;
        case Rabbit.eHeroState.eWalkRight:
                this.getRenderable().setSpriteSequence(this.TexPos[1],0,64,128,2,30); break;
        case Rabbit.eHeroState.eFallDown:
            if (this.predirect == this.Control.Left)
                this.getRenderable().setSpriteSequence(this.TexPos[1],282,64,128,1,0);
            else if (this.predirect == this.Control.Right)
                this.getRenderable().setSpriteSequence(this.TexPos[1],94,64,128,1,0); break;
        case Rabbit.eHeroState.eClimbUp:
                this.getRenderable().setSpriteSequence(this.TexPos[1],470,64,128,1,0); break;
        case Rabbit.eHeroState.eClimbDown:
                this.getXform().setSize(radius * 1.8 / 16, radius  * 3 / 16);
                this.getRenderable().setSpriteSequence(this.TexPos[1],564,100,128,1,0); break;
        case Rabbit.eHeroState.eAttack:
        case Rabbit.eHeroState.eDefend:
            if (this.RelaPos[1] > 9) {
                this.getRenderable().setSpriteSequence(this.TexPos[1], 726, 64, 128, 1, 0);
                break;
            }
            if (this.RelaPos[0]+1<0)
                this.getRenderable().setSpriteSequence(this.TexPos[1],726,64,128,1,0);
            else
                this.getRenderable().setSpriteSequence(this.TexPos[1],804,64,128,1,0);break;
        case Rabbit.eHeroState.eAdvance:
            if (this.RelaPos[0]+1<0)
                this.getRenderable().setSpriteSequence(this.TexPos[1],804,64,128,1,0);
            else
                this.getRenderable().setSpriteSequence(this.TexPos[1],726,64,128,1,0);break;

    }
};



Rabbit.prototype.getType = function (x,y) {
    var i,j;
    i=32-Math.ceil(y+16);
    j=Math.floor(x+16);
    return this.SpaceShip.SpaceShipMap[i][j];
};

Rabbit.prototype.draw = function (aCamera){

    var Pos = this.Cheat.getRigidBody().getCenter();
    var scale = this.SpaceShip.mapSize;
    this.mRenderComponent.getXform().setPosition(this.RelaPos[0] * scale +Pos[0]- 0.2,this.RelaPos[1] * scale+Pos[1] + 0.1 );
    GameObject.prototype.draw.call(this,aCamera);
};
Rabbit.prototype.update = function () {
    this.FSM();
};

Rabbit.prototype.transToMat = function(pos) {
    var radius = this.Cheat.getRigidBody().getRadius();
    var i = 32-Math.ceil((pos[1]+radius)/this.squareSize);
    var j = Math.floor((pos[0]+radius)/this.squareSize);
    return [i,j];
}


Rabbit.prototype.FSM = function(){
    var temp = null;
    var radius = this.Cheat.getRigidBody().getRadius();
    switch (this.mState) {
        case Rabbit.eHeroState.eMove:
            if (gEngine.Input.isKeyPressed(this.Control.Left)) {
                this.curdirect = Rabbit.eDirect.eLeft;
                if (this.predirect != this.Control.Left)
                    this.ChangeAnimation(Rabbit.eHeroState.eWalkLeft);
                this.predirect = this.Control.Left;
                this.Move(2);
            }
            if (gEngine.Input.isKeyPressed(this.Control.Right)) {
                this.curdirect = Rabbit.eDirect.eRight;
                if (this.predirect != this.Control.Right)
                    this.ChangeAnimation(Rabbit.eHeroState.eWalkRight);
                this.predirect = this.Control.Right;
                this.Move(2);
            }
            if (gEngine.Input.isKeyPressed(this.Control.Up)) {
                this.curdirect = Rabbit.eDirect.eUp;
                if (this.getType(this.RelaPos[0],this.RelaPos[1]) == 2)
                {
                    this.RelaPos[0] = -radius + this.squareSize/2 + Math.floor(radius+this.RelaPos[0]);
                    this.mState = Rabbit.eHeroState.eClimb;
                }
            }
            if (gEngine.Input.isKeyPressed(this.Control.Down )){
                this.curdirect = Rabbit.eDirect.eDown;
                if (this.getType(this.RelaPos[0],this.RelaPos[1]) == 2)
                {
                    this.RelaPos[0] = -radius + this.squareSize/2 + Math.floor(radius+this.RelaPos[0]);
                    this.mState = Rabbit.eHeroState.eClimb;
                }
            }
            if (gEngine.Input.isKeyClicked(this.Control.Leave)) {
                if ((temp = this.getType(this.RelaPos[0] + Math.sign(this.RelaPos[0]) ,this.RelaPos[1]))>2)
                {
                    this.mState = temp;
                    this.ChangeAnimation(temp);
                }
                if ((temp = this.getType(this.RelaPos[0] - Math.sign(this.RelaPos[0]) ,this.RelaPos[1]))>2)
                {
                    this.mState = temp;
                    this.ChangeAnimation(temp);
                }
                if ((temp=this.getType(this.RelaPos[0],this.RelaPos[1]))>2)
                {
                    this.mState = temp;
                    this.ChangeAnimation(temp);
                }
            }
            this.curdirect = Rabbit.eDirect.eDown;
            if (!this.Move(1))
            {
                this.RelaPos[1] +=this.step;
                if (this.getType(this.RelaPos[0],this.RelaPos[1]) != 2)
                    this.mState = Rabbit.eHeroState.eFallDown;
            }
            break;
        case Rabbit.eHeroState.eClimb:
            this.ChangeAnimation(Rabbit.eHeroState.eClimbUp);
            if (gEngine.Input.isKeyPressed(this.Control.Up)) {
                this.accel += 1;
                if (this.getType(this.RelaPos[0],this.RelaPos[1] + this.step/2) == 2) {
                    this.RelaPos[1] += this.step;
                    if (this.getType(this.RelaPos[0],this.RelaPos[1] + this.step/2) == 2) {
                        this.RelaPos[1] += this.step;
                    }
                }
            }
            if (gEngine.Input.isKeyPressed(this.Control.Down )) {
                this.ChangeAnimation(Rabbit.eHeroState.eClimbDown);
                this.curdirect = Rabbit.eDirect.eDown;
                this.accel += 1;
                this.Move(3);
            }
            if (gEngine.Input.isKeyClicked(this.Control.Left)) {
                this.curdirect = Rabbit.eDirect.eLeft;
                this.RelaPos[0] -= this.step;
                if (!this.collisionTest())
                {
                    this.mState = Rabbit.eHeroState.eFallDown;
                    this.predirect = this.Control.Left;
                    this.ChangeAnimation(Rabbit.eHeroState.eFallDown);
                }
            }
            if (gEngine.Input.isKeyClicked(this.Control.Right))  {
                this.curdirect = Rabbit.eDirect.eRight;
                this.RelaPos[0] += this.step;
                if (!this.collisionTest())
                {
                    this.mState = Rabbit.eHeroState.eFallDown;
                    this.predirect = this.Control.Right;
                    this.ChangeAnimation(Rabbit.eHeroState.eFallDown);
                }
            }
            console.log(this.accel);
            if (this.accel > 15)
            {
                if (gEngine.Input.isKeyPressed(this.Control.Left)) {
                    this.curdirect = Rabbit.eDirect.eLeft;
                    this.RelaPos[0] -= this.step;
                    if (!this.collisionTest())
                    {
                        this.accel = 0;
                        this.mState = Rabbit.eHeroState.eFallDown;
                        this.predirect = this.Control.Left;
                    }
                }
                if (gEngine.Input.isKeyPressed(this.Control.Right))  {
                    this.curdirect = Rabbit.eDirect.eRight;
                    this.RelaPos[0] += this.step;
                    if (!this.collisionTest())
                    {
                        this.accel = 0;
                        this.mState = Rabbit.eHeroState.eFallDown;
                        this.predirect = this.Control.Right;
                    }
                }
            }
            break;
        case Rabbit.eHeroState.eFallDown:
            var flag = false;
            this.curdirect = Rabbit.eDirect.eDown;
            flag = this.Move(2);
            if (this.predirect === this.Control.Left)
                this.RelaPos[0] -= this.step;
            else
                this.RelaPos[0] += this.step;
            this.curLateral ++;
            if (this.curLateral >= 5 && flag) {
                this.mState = Rabbit.eHeroState.eMove;
                if (this.predirect === this.Control.Left)
                    this.ChangeAnimation(Rabbit.eHeroState.eWalkLeft);
                else
                    this.ChangeAnimation(Rabbit.eHeroState.eWalkRight);
                this.curLateral = 0;
            }
            break;
        case Rabbit.eHeroState.eAttack:
            if (gEngine.Input.isKeyClicked(this.Control.Leave))
                this.mState = Rabbit.eHeroState.eMove;
            break;
        case Rabbit.eHeroState.eDefend:
            if (gEngine.Input.isKeyClicked(this.Control.Leave))
                this.mState = Rabbit.eHeroState.eMove;
            break;
        case Rabbit.eHeroState.eAdvance:
            if (gEngine.Input.isKeyClicked(this.Control.Leave))
                this.mState = Rabbit.eHeroState.eMove;
            break;
    }
    if (!(gEngine.Input.isKeyPressed(this.Control.Left)
        ||gEngine.Input.isKeyPressed(this.Control.Right))&&this.mState == Rabbit.eHeroState.eMove)
        this.ChangeAnimation(Rabbit.eHeroState.eMove);
    this.getRenderable().updateAnimation();
};


Rabbit.prototype.test = function(i,j){
    if (this.curdirect == Rabbit.eDirect.eLeft)
    {
        if (this.SpaceShip.SpaceShipMap[i][j-1] > 0 )
            return false;
    }
    else if (this.curdirect == Rabbit.eDirect.eRight)
    {
        if (this.SpaceShip.SpaceShipMap[i][j+1] > 0 )
            return false;
    }
    else if (this.curdirect == Rabbit.eDirect.eUp)
    {
        if (this.SpaceShip.SpaceShipMap[i-1][j] > 0 )
            return false;
    }
    else if (this.curdirect == Rabbit.eDirect.eDown)
    {
        if (this.SpaceShip.SpaceShipMap[i+1][j] > 0 )
            return false;
    }
    return true;
};

Rabbit.prototype.singleTest = function(pos){

    var i1, j1, i2, j2, i3 ,j3;
    var deltax = this.squareSize/2 + this.step/2;
    var deltay = this.squareSize/2 - this.step/2;

    if (this.curdirect == Rabbit.eDirect.eLeft)
    {
        [i1,j1] = this.transToMat([pos[0] + deltax,pos[1]]);
        [i2,j2] = this.transToMat([pos[0] + deltax,pos[1] + deltay]);
        [i3,j3] = this.transToMat([pos[0] + deltax,pos[1] - deltay]);
        if (this.test(i1,j1)||this.test(i2,j2)||this.test(i3,j3)) {
            this.RelaPos[0] += this.step;
            return true;
        }
    }
    else if (this.curdirect == Rabbit.eDirect.eRight)
    {
        [i1,j1] = this.transToMat([pos[0] - deltax,pos[1]]);
        [i2,j2] = this.transToMat([pos[0] - deltax,pos[1] + deltay]);
        [i3,j3] = this.transToMat([pos[0] - deltax,pos[1] - deltay]);
        if (this.test(i1,j1)||this.test(i2,j2)||this.test(i3,j3)){
            this.RelaPos[0] -= this.step;
            return true;
        }
    }
    else if (this.curdirect == Rabbit.eDirect.eUp)
    {
        [i1,j1] = this.transToMat([pos[0],pos[1] - deltax]);
        [i2,j2] = this.transToMat([pos[0] + deltay,pos[1] - deltax]);
        [i3,j3] = this.transToMat([pos[0] - deltay,pos[1] - deltax]);
        if (this.test(i1,j1)||this.test(i2,j2)||this.test(i3,j3)) {
            this.RelaPos[1] -= this.step;
            return true;
        }
    }
    else if (this.curdirect == Rabbit.eDirect.eDown)
    {
        [i1,j1] = this.transToMat([pos[0],pos[1] + deltax]);
        [i2,j2] = this.transToMat([pos[0] + deltay,pos[1] + deltax]);
        [i3,j3] = this.transToMat([pos[0] - deltay,pos[1] + deltax]);
        if (this.test(i1,j1)||this.test(i2,j2)||this.test(i3,j3)) {
            this.RelaPos[1] += this.step;
            return true;
        }
    }
    return false;
}

Rabbit.prototype.collisionTest = function(){
    if (this.singleTest([this.RelaPos[0],this.RelaPos[1]+this.squareSize/2]))
        return true;
    if (this.singleTest([this.RelaPos[0],this.RelaPos[1]-this.squareSize/2]))
        return true;
    return false;
};

Rabbit.prototype.Move =function (num) {
    var delta = [0,0];
    if (this.curdirect == Rabbit.eDirect.eLeft)
    {
        delta[0] = -this.step;
    }
    else if (this.curdirect == Rabbit.eDirect.eRight)
    {
        delta[0] = +this.step;
    }
    else if (this.curdirect == Rabbit.eDirect.eUp)
    {
        delta[1] = +this.step;
    }
    else if (this.curdirect == Rabbit.eDirect.eDown)
    {
        delta[1] = -this.step;
    }
    while (num--)
    {
        vec2.add(this.RelaPos,this.RelaPos,delta);
        if (this.collisionTest())
        {
            return true;
        }
    }
    return false;
};