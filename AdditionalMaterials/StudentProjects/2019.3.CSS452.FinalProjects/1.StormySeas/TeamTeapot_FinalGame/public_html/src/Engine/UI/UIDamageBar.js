/*
 * File:        UIDamageBar.js
 * Programmers: Kyla            March 9, 2019
 *
 */

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

// Similar to a UIHealthBar but starts at 0
function UIDamageBar (sprite, position, size, buffer)
{
    UIHealthBar.call(this, sprite, position, size, buffer);
    this.mCurHP = 0;
    
    var s = this.getUIXform().getSize();
    var p = this.getUIXform().getPosition();
    this.mHPElem.getUIXform().setSize((s[0] - 2*this.mBuffer) * (this.mCurHP / this.mMaxHP), s[1] - 2*this.mBuffer);
    
    //left align
    this.mHPElem.getUIXform().setPosition(p[0] - s[0]/2 + this.mBuffer + (this.mHPElem.getUIXform().getSize()[0]/2), p[1]);
}
gEngine.Core.inheritPrototype(UIDamageBar, UIHealthBar);
