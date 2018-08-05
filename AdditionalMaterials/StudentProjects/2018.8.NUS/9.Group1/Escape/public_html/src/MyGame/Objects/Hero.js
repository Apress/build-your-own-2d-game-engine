/* File: Hero.js 
 *
 * Creates and initializes the Hero (Dye)
 * overrides the update function of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, WASDObj */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!
function Hero(spriteTexture , light, x, y, width, height) {
    this.floor = -1;
    this.kDelta = 0.3;
    this.xdminnow=0;
    this.xdmaxnow=21.5;
    this.ydminnow=32;
    this.ydmaxnow=128-64;
    this.xaminnow=0;
    this.xamaxnow=21.5;
    this.yaminnow=64;
    this.yamaxnow=128-32;
    this.dflag=0;
    this.aflag=0;
    this.r = null;
    this.mlive = 3;
    this.mDye = null;
    this.mDye = new LightRenderable(spriteTexture);
    this.mDye.setColor([1, 1, 1, 0]);
    this.mDye.getXform().setPosition(x, y);
    this.mDye.getXform().setSize(5, 8);
    this.mDye.setElementPixelPositions(21.5,43,128-32,128);
    this.mDye.addLight(light);
    this.isatland = 0;
    GameObject.call(this, this.mDye);
    
    if(width === null && height === null){
        this.r = new RigidRectangle(this.getXform(), 4, 8);
    }else{
        this.r = new RigidRectangle(this.getXform(), width, height);
    }
   
    this.setRigidBody(this.r);
    this.toggleDrawRenderable();
    this.toggleDrawRigidShape();
}
gEngine.Core.inheritPrototype(Hero, WASDObj);

Hero.prototype.update = function () {
    var xform=this.getXform().getXPos();
    var yform=this.getXform().getYPos();
    GameObject.prototype.update.call(this);
    
    
    if(yform>=3&&yform<=20){
        this.floor=0;
    }
    else if(yform>=22&&yform<=37){
        this.floor=1;
    }
    else if(yform>=40&&yform<=56){
        this.floor=2;
    }
    else if(yform>=60&&yform<=75){
        this.floor=3;
    }
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
        if(this.dflag===0)
        {
            this.mDye.setElementPixelPositions(this.xdminnow,this.xdmaxnow,this.ydminnow,this.ydmaxnow);
            this.xdminnow+=21.3;
            this.xdmaxnow+=21.3;
            if(this.xdminnow>60)
            {
                this.xdminnow=0;
            }
            if(this.xdmaxnow>70)
            {
                this.xdmaxnow=21.5;
            }
        }
        this.dflag++;
        if(this.dflag===8){
            this.dflag=0;
        }
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)) {
        if(this.aflag===0){
        this.mDye.setElementPixelPositions(this.xaminnow,this.xamaxnow,this.yaminnow,this.yamaxnow);
        this.xaminnow+=21.3;
        this.xamaxnow+=21.3;
        if(this.xaminnow>60){
            this.xaminnow=0;
        }
        if(this.xamaxnow>70){
            this.xamaxnow=21.5;
        }
        }
        this.aflag++;
        if(this.aflag===8){
            this.aflag=0;
        }
    }
};
