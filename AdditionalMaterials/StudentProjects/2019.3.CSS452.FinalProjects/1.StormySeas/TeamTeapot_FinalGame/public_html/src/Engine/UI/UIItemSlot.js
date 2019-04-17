/*
 * File:        UIItemSlot.js
 * Programmers: Kyla            March 9, 2019
 *
 */

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function UIItemSlot (sprite, position, size, UVempty, UVfull)
{
    // UVs for when the slot is empty
    this.mUVempty = UVempty;
    
    // UVs for when the slot is full
    this.mUVfull = UVfull;
    
    // is the slot full
    this.mFull = false;
    
    UISprite.call(this, sprite, position, size, UVempty);
}
gEngine.Core.inheritPrototype(UIItemSlot, UISprite);

// Return whether the slot is full
UIItemSlot.prototype.isFull = function()
{
    return this.mFull;
};

// Set the slot as full and update the UVs to mUVfull values
UIItemSlot.prototype.setToFull = function()
{
    this.mFull = true;
    this.mSprite.setElementUVCoordinate(this.mUVfull[0], this.mUVfull[1],
                                        this.mUVfull[2], this.mUVfull[3]);
};