/* File: Hero.js 
 *
 * Creates and initializes the Hero (Dye)
 * overrides the update function of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, GameObject, SpriteRenderable, RigidCircle, RigidRectangle, Particle */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Hero(spriteTexture, atX, atY) {
    this.mDye = new SpriteRenderable(spriteTexture);
    this.mDye.setColor([1, 1, 1, 0]);
    this.mDye.getXform().setPosition(atX, atY);
    this.mDye.getXform().setSize(9,12);
    this.mDye.setElementPixelPositions(0, 120, 0, 180);
    GameObject.call(this, this.mDye);
}
gEngine.Core.inheritPrototype(Hero, GameObject);
var money=0;
var get=0;
var deltaX = 0.3;
var deltaY=0.2;
var x=50;
var y=60;
var vx=deltaX; //speed of the hero
var vy=0;
var a=0.05;  //acceleration of the hero
var start=1;
var coins=300;
var LIFE=3;
var life=LIFE;
var score=0;
var maxheight=112.5;
var die=0;
var invincible=0;
var levellength=540;
var countdown=180;  //the countdown before the game starts
var vy0=-3.5;
var pass=0; //pass the level
var vyMonster=-2.5;
var quit=0;
var buy=0;
var loading=60;
var startloading=0;
Hero.prototype.update = function () {
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
    {
        if(vy<0)
        {
            vy=0;
        }
        vy=vy-1.5;
        xform.setRotationInDegree(20);
        //gEngine.AudioClips.playACue(this.kCue);
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
    if(x>levellength)
    {  
        gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 0.5]); // clear to light gray
        pass=1;
        //gEngine.GameLoop.stop();
    }
    }}

/*    var i, obj, collisionPt = [0, 0];
    
    var p = this.getXform().getPosition();
    for (i=0; i<dyePacks.size(); i++) {
        obj = dyePacks.getObjectAt(i);
        // chase after hero
        obj.rotateObjPointTo(p, 0.05);
      //  if (obj.pixelTouches(this, collisionPt)) {
       //     dyePacks.removeFromSet(obj);
        //    allParticles.addEmitterAt(collisionPt, 200, func);
       // }
    }*/
};

Hero.prototype.die=function()
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

Hero.prototype.clear=function()
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