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

function Heroinsea(spriteTexture, atX, atY) {
    this.mDye = new SpriteRenderable(spriteTexture);
    this.mDye.setColor([1, 1, 1, 0]);
    this.mDye.getXform().setPosition(atX, atY);
    this.mDye.getXform().setSize(9,12);
    this.mDye.setElementPixelPositions(0, 128, 0, 128);
    GameObject.call(this, this.mDye);
    this.mProjectiles = new ProjectileSet2();
    if(shipnumber===3){life=4;}
    
    this.kshoot ="assets/sounds/flaunch.mp3";
    this.kcollision ="assets/sounds/collision2.mp3";
}
gEngine.Core.inheritPrototype(Heroinsea, GameObject);
var vy1=0;
var countdown2=360;
var jump=0;
var levellength3=1000;
var deltaX2 = 0.6;
var noship=0;


Heroinsea.prototype.loadScene = function (){
    gEngine.AudioClips.loadAudio(this.kshoot);
    gEngine.AudioClips.loadAudio(this.kcollision);
};

Heroinsea.prototype.unloadScene = function (){
    gEngine.AudioClips.stopBackgroundAudio();
    gEngine.AudioClips.unloadAudio(this.kshoot);
    gEngine.AudioClips.unloadAudio(this.kcollision);
};



Heroinsea.prototype.update = function (mAllMinions, aCamera) {
    // must call super class update
    GameObject.prototype.update.call(this);
    
    var xform = this.getXform();
    if(noship===1) start=0;
    if(countdown2>=100)
    {
        
        if (countdown2%60===0) 
        {
        if(vy1>0)
        {
            vy1=0;
        }
        vy1=vy1-1.5;
        xform.setRotationInDegree(20);
        }
        vy1=vy1+0.05;
        //gEngine.AudioClips.playACue(this.kCue);
        xform.incYPosBy(-vy1);
        xform.incXPosBy(deltaX);
        x=x+deltaX;
        y=y-vy1;
        xform.incRotationByDegree(-0.8);
        countdown2--;
    }
    else if(countdown2>1&&countdown2<100)
    {      
        countdown2--;
        vy1=vy1+a;
        xform.incYPosBy(-vy1);
        xform.incXPosBy(deltaX);
        if(xform.getYPos()<20)
        {
            //alert(xform.getXPos());
            countdown2=1;
            if(shipnumber===0){
                noship=1;
            }
        }
    }
    else if(pass===0&&start===1){
    if(countdown2===1)
    {
        this.mDye.getXform().setSize(15,15);
        countdown2--;
        xform.setPosition(x-80,20);
        y=-10;
    } 
    else
    {
    if(invincible>0)
    {
    invincible--;
    }

    if(start===1&&pass===0)
    {
    if(xform.getYPos()>20)
    {
    vy=vy+a;
    }
    //jump
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Up)&&jump<3) 
    {
        vy=-2;
        jump++;
        xform.setRotationInDegree(20);
        //gEngine.AudioClips.playACue(this.kCue);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)) {
        this.mProjectiles.newAt(this.getXform().getPosition());
        gEngine.AudioClips.playACue(this.kshoot);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Right)) 
    {
        if(deltaX2<=0.8){
        deltaX2=deltaX2+0.1;
        vx=deltaX2;}
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Left)) 
    {
        if(deltaX2>=0.5){
        deltaX2=deltaX2-0.1;
        vx=deltaX2;
    }
    }
    var num = this.mProjectiles.update(mAllMinions, aCamera);
    this.mNumDestroy += num; 
    
    y=y-vy;       
    if(y<=20)
    {
        y=20;
        jump=0;
        xform.setYPos(20);
        vy=0;
    }
    else if(y>maxheight-10){vy=0;}
    else{
    xform.incYPosBy(-vy);
    }
    }
    if(y>20){xform.incXPosBy(deltaX2+0.1);
    x=x+deltaX2+0.1; }   //speed up when jump;
    else
    {xform.incXPosBy(deltaX2);
    x=x+deltaX2; }
    
    if(xform.getRotationInDegree()>0)
    {
    xform.incRotationByDegree(-0.8);
    }
    score=score+deltaX2*10;}
    //game over

    if(x>levellength3)
    {  
        gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 0.5]); // clear to light gray
        pass=1;
        //gEngine.GameLoop.stop();
    }
    }}
;

Heroinsea.prototype.die=function()
{
    var xform = this.getXform();
    if(life<=1)
        {
            life=0;
        start=0;    
        }
        else
        { 
        gEngine.AudioClips.playACue(this.kcollision);   
        life--;
        invincible=180;
        xform.setPosition(x-80,20);
        y=-10;
        vy=0;
        }
        
};

Heroinsea.prototype.clear=function()
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
countdown=180;  //the countdown before the game starts
pass=0;
vyMonster=-2.5;
vy1=0;
countdown2=360;
jump=0;
deltaX2 = 0.5;
get=0;
};
