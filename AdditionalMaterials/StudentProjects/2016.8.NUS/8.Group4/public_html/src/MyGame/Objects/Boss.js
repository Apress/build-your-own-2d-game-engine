/* File: Hero.js 
 *
 * Creates and initializes the Hero (Dye)
 * overrides the update function of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Boss(spriteTexture) {
    this.kDeltaX1 = 0.3;
    
    this.kDeltaX2 = -0.3;
    
    this.kDeltaY1 = 0.3;
    
    this.kDeltaY2 = -0.3;  
    
    this.mSpeedX = 0;
    
    this.mSpeedY = 0;

    this.mCount = 0;

    this.mBoss = new TextureRenderable(spriteTexture);
    this.mBoss.setColor([1, 1, 1, 0]);
    this.mBoss.getXform().setPosition(85, 30);
    this.mBoss.getXform().setSize(25, 25);
    GameObject.call(this, this.mBoss);
}
gEngine.Core.inheritPrototype(Boss, GameObject);

Boss.prototype.update = function () {
    // control by WASD
    var myNumber = Math.floor(Math.random()*4);
    var xform = this.getXform();
    if(this.mCount > 200 || ((this.mSpeedX === 0) && (this.mSpeedY === 0))){
        if(myNumber > 3){
            this.mSpeedX = this.kDeltaX2;
            this.mSpeedY = this.kDeltaY1;
            this.mCount = 0;
        }else if(myNumber > 2){
            this.mSpeedX = this.kDeltaX1;
            this.mSpeedY = this.kDeltaY1;
            this.mCount = 0;
        }else if(myNumber > 1){
            this.mSpeedX = this.kDeltaX2;
            this.mSpeedY = this.kDeltaY2;
            this.mCount = 0;
        }else if(myNumber > 0){
            this.mSpeedX = this.kDeltaX1;
            this.mSpeedY = this.kDeltaY2;
            this.mCount = 0;
        }
    }
    if(xform.getXPos() > 90){
        this.mSpeedX = this.kDeltaX2;
    }else if(xform.getXPos() < 10){
        this.mSpeedX = this.kDeltaX1;
    }else if(xform.getYPos() < 10){
        this.mSpeedY = this.kDeltaY1;
    }else if(xform.getYPos() > 65){
        this.mSpeedY = this.kDeltaY2;
    }
    this.mCount++;
    xform.incXPosBy(this.mSpeedX);
    xform.incYPosBy(this.mSpeedY);
};