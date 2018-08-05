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

function Airman(spriteTexture) {
    this.kDelta = 0.3;
    this.mDye = new SpriteRenderable(spriteTexture);
    this.mDye.setColor([1, 1, 1, 0]);
    this.mDye.getXform().setPosition(4, 42.5);
    this.mDye.getXform().setSize(-8, 8);
    this.mDye.setElementPixelPositions(0, 1024, 0,1024);
    GameObject.call(this, this.mDye);
    
    var r = new RigidRectangle(this.getXform(), 3, 3);
    this.setRigidBody(r);
    this.toggleDrawRenderable();
    this.toggleDrawRigidShape();
}
gEngine.Core.inheritPrototype(Airman, WASDObj);

Airman.prototype.update = function () {
    GameObject.prototype.update.call(this);
    
    var xform = this.getXform().getXPos();
    var yform = this.getXform().getYPos();
//    console.log(xform+" "+yform);
    //Right-1
//    if(gamestart ===true){
//        this.getXform().setPosition(6.2,72,5);
//    }
    if(xform < 91.2 && xform > 2.5 && yform === 72.5) {
        this.getXform().incXPosBy(0.3);
    }
    if(xform === 91.40016174316406 && yform === 72.5) {
        this.getXform().setPosition(91.40016174316405,69.5);
        this.mDye.getXform().setSize(8, 8);
        bomb = 5;
    }
    //Left-1
    if(xform <= 91.40016174316406 && xform > 4.6 && yform === 69.5) {
        
        this.getXform().incXPosBy(-0.3);
    }
    if(xform === 4.399998664855957 && yform === 69.5) {
        this.getXform().setPosition(4.399998664855957,66.5);
        this.mDye.getXform().setSize(-8, 8);
        bomb = 5;
    }
    //Right-2
    if(xform < 91.40016174316406 && xform >= 4.399998664855957 && yform === 66.5) {
        this.getXform().incXPosBy(0.3);
    }
    if(xform === 91.40016174316406 && yform === 66.5) {
        this.getXform().setPosition(91.40016174316405,63.5);
        this.mDye.getXform().setSize(8, 8);
        bomb = 5;
    }
    //Left-2
    if(xform <= 91.40016174316406 && xform > 4.6 && yform === 63.5) {
        this.getXform().incXPosBy(-0.3);
    }
    if(xform === 4.399998664855957 && yform === 63.5) {
        this.getXform().setPosition(4.399998664855957,60.5);
        this.mDye.getXform().setSize(-8, 8);
        bomb = 5;
    }
    //Right-3
    if(xform < 91.40016174316406 && xform >= 4.399998664855957 && yform === 60.5) {
        this.getXform().incXPosBy(0.3);
    }
    if(xform === 91.40016174316406 && yform === 60.5) {
        this.getXform().setPosition(91.40016174316405,57.5);
        this.mDye.getXform().setSize(8, 8);
        bomb = 5;
    }
    //Left-3
    if(xform <= 91.40016174316406 && xform > 4.6 && yform === 57.5) {
        this.getXform().incXPosBy(-0.3);
    }
    if(xform === 4.399998664855957 && yform === 57.5) {
        this.getXform().setPosition(4.399998664855957,54.5);
        this.mDye.getXform().setSize(-8, 8);
        bomb = 5;
    }
    //Right-4
    if(xform < 91.40016174316406 && xform >= 4.399998664855957 && yform === 54.5) {
        this.getXform().incXPosBy(0.3);
    }
    if(xform === 4.399998664855957 && yform === 57.5) {
        this.getXform().setPosition(4.399998664855957,54.5);
        this.mDye.getXform().setSize(8, 8);
        bomb = 5;
    }
    //Left-4
    if(xform <= 91.40016174316406 && xform > 4.6 && yform === 54.5) {
        this.getXform().incXPosBy(-0.3);
    }
    if(xform === 4.399998664855957 && yform === 54.5) {
        this.getXform().setPosition(4.399998664855957,51.5);
        this.mDye.getXform().setSize(-8, 8);
        bomb = 5;
    }
    //Right-5
    if(xform < 91.40016174316406 && xform >= 4.399998664855957 && yform === 51.5) {
        this.getXform().incXPosBy(0.3);
    }
    if(xform === 91.40016174316406 && yform === 51.5) {
        this.getXform().setPosition(91.40016174316405,48.5);
        this.mDye.getXform().setSize(8, 8);
        bomb = 5;
    }
    //Left-5
    if(xform <= 91.40016174316406 && xform > 4.6 && yform === 48.5) {
        this.getXform().incXPosBy(-0.3);
    }
    if(xform === 4.399998664855957 && yform === 48.5) {
        this.getXform().setPosition(4.399998664855957,45.5);
        this.mDye.getXform().setSize(-8, 8);
        bomb = 5;
    }
    //Right-6
    if(xform < 91.40016174316406 && xform >= 4.399998664855957 && yform === 45.5) {
        this.getXform().incXPosBy(0.3);
        this.mDye.getXform().setSize(-8, 8);
    }
};