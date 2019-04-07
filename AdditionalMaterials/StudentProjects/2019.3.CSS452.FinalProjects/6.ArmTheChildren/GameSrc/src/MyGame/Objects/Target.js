/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable, vec2: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

const TARGET_WIDTH = 4;
const TARGET_HEIGHT = 4;

function Target(spriteTexture, pos) {

    this.mTarget = new TextureRenderable(spriteTexture);
    this.mTarget.setColor([1, 1, 1, 0]);
    this.mTarget.getXform().setPosition(pos[0], pos[1]);
    this.mTarget.getXform().setSize(TARGET_WIDTH, TARGET_HEIGHT);
    //this.mTarget.setElementPixelPositions(120, 300, 0, 180);
    GameObject.call(this, this.mTarget);
    
    this.hit = false;
//    this.mMoveSpeed = 1;
    this.mX = TARGET_WIDTH;           //Width
    this.mY = TARGET_HEIGHT;          //Height
//    this.mShakePosition = new ShakePosition(0, 0, 0, 0);
}
gEngine.Core.inheritPrototype(Target, GameObject);

Target.prototype.update = function () {

};
