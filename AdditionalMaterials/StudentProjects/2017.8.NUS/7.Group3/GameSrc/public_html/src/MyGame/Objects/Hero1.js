/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, GameObject, SpriteRenderable, RigidCircle, RigidRectangle, Particle */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Hero1(spriteTexture, atX, atY) {
    this.mDye = new LightRenderable(spriteTexture);
    this.mDye.setColor([1, 1, 1, 0]);
    this.mDye.getXform().setPosition(atX, atY);
    this.mDye.getXform().setSize(9,12);
    this.mDye.setElementPixelPositions(0, 120, 0, 180);
    GameObject.call(this, this.mDye);
}
gEngine.Core.inheritPrototype(Hero1, GameObject);


Hero1.prototype.update = function () {
    // must call super class update
    GameObject.prototype.update.call(this);

    var xform = this.getXform();
    if(countdown>=60)
    {
        countdown--;
        if(xform.getRotationInDegree()>0)
        {
        xform.incRotationByDegree(-1);    
        }
        else xform.setRotationInDegree(20);
        xform.incXPosBy(1);
        
        //console.log(xform.getXPos());
    }
    else if(countdown>1&&countdown<60)
    {      
        countdown--;
        vy0=vy0+a;
        xform.incYPosBy(-vy0);
    }
    else if(countdown===1)
    {
        countdown--;
        xform.setPosition(x-80,80);
    } 
    else
    {
    if(invincible>0)
    {
    invincible--;
    }

    if(start===1&&pass===0)
    {
    vy=vy+a;

    //jump
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Up)) 
  //  gEngine.AudioClips.playACue(this.kup);
    {
        if(vy<0)
        {
            vy=0;
        }
        vy=vy-1.5;
        xform.setRotationInDegree(20);
        //gEngine.AudioClips.playACue(this.kup);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Right)) 
    {
        if(deltaX<=0.8){
        deltaX=deltaX+0.1;
        vx=deltaX;}
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Left)) 
    {
        if(deltaX>=0.3)
        {
        deltaX=deltaX-0.1;
        vx=deltaX;
        }
    }
    if(y-vy<maxheight-20)
    {   
    xform.incYPosBy(-vy);
    xform.incXPosBy(deltaX);
    x=x+deltaX;
    y=y-vy;
    }
    else
    {
    xform.incXPosBy(deltaX);
    x=x+deltaX;    
    }
    if(xform.getRotationInDegree()>-30)
    {
    xform.incRotationByDegree(-0.8);
    }
    score=score+deltaX*10;
    //game over
    if(y<-30)
    {       
       this.die();
//        gEngine.GameLoop.stop();
    }
        if(y>90)
    {
        this.die();
    }
    if(x>levellength)
    {  
        gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 0.5]); // clear to light gray
        pass=1;
        //gEngine.GameLoop.stop();
    }
    }}
};

Hero1.prototype.die=function()
{
    var xform = this.getXform();
    if(life<=1)
        {
        start=0;
        life=0;
        
        }
        else
        { 
        life--;
        invincible=100;
        xform.setPosition(x-80,80);
        y=60;
        vy=0;
        }
};

Hero1.prototype.clear=function()
{
deltaX = 0.3;
deltaY=0.2;
x=50;
y=60;
vx=deltaX; //speed of the hero
vy=0;
a=0.05;  //acceleration of the hero
start=1;
LIFE=3;
life=LIFE;
score=0;
maxheight=112.5;
die=0;
invincible=0;
levellength=540;
countdown=180;  //the countdown before the game starts
vy0=-3.5;
pass=0;
vyMonster=-2.5;
get=0;
};


