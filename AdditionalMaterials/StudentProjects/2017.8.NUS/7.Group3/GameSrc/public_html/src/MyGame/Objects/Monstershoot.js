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

function Monstershoot(spriteTexture, atX, atY) {
    this.mDye = new SpriteRenderable(spriteTexture);
    this.mDye.setColor([1, 1, 1, 0]);
    this.mDye.getXform().setPosition(atX, atY);
    this.mDye.getXform().setSize(30,30);
    this.mDye.setElementPixelPositions(0, 128, 0, 128);
    
    this.mTime=60;
    this.mShoottime=0;
    
    this.kDeltaDegree = 1;
    this.kDeltaRad = Math.PI * this.kDeltaDegree / 180;
    this.kDeltaSpeed = 0.01;
    this.setSpeed(0.05);
    
    this.mProjectiles = new ProjectileSet();
    GameObject.call(this, this.mDye);
    
}
gEngine.Core.inheritPrototype(Monstershoot, GameObject);
var vy1=0;
var countdown2=360;
var jump=0;
var levellength3=1000;
var deltaX2 = 0.5;
var noship=0;
var x=50;
var x1=x;

Monstershoot.prototype.update = function (Hero,mAllParticles,func,mHero,mAllMinions, aCamera) {
    // must call super class update
    GameObject.prototype.update.call(this);
    
    var xform = this.getXform();
    this.mShoottime++;
    if (this.mShoottime>this.mTime) {
        if(start===1&&pass===0)
        {
             this.mProjectiles.newAt(this.getXform().getPosition()); 
        }
       // this.mDye.rotateObjPointTo(this.getXform().getPosition(), rate);
        this.mShoottime=0;
    }
    var num = this.mProjectiles.update(Hero,mAllParticles,func,mHero,mAllMinions, aCamera);
    this.mNumDestroy += num; 
    this.getXform().setPosition(x,60);
   
    //var xf = this.getXform()
};

Monstershoot.prototype.clear=function()
{
deltaX = 0.3;
deltaY=0.2;
x1=50;
y1=60;
vx=deltaX; //speed of the hero
vy=0;
a=0.05;  //acceleration of the hero
start=1;
LIFE=2;
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
};
