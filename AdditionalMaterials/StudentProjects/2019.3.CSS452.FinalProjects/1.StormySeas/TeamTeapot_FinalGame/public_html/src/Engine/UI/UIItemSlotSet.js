/*
 * File:        UIItemSlotSet.js
 * Programmers: Kyla            March 9, 2019
 *
 */

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function UIItemSlotSet (position)
{
    // Where the next item should be displayed
    this.mNextSlotPos = position;
    
    // Next slot that has not been filled
    this.mNextToFillIndex = 0;
    
    GameObjectSet.call(this);
}
gEngine.Core.inheritPrototype(UIItemSlotSet, GameObjectSet);

// Add an UIItemSlot to the set
UIItemSlotSet.prototype.addToSet = function(sprite, size, UVempty, UVfull)
{
    var newSlot = new UIItemSlot(sprite, this.mNextSlotPos, size, UVempty, UVfull);
    this.mSet.push(newSlot);
    this.mNextSlotPos[0] += size[0];
};

// Mark the next available slot as filled
UIItemSlotSet.prototype.fillSlot = function()
{
    this.mSet[this.mNextToFillIndex].setToFull();
    this.mNextToFillIndex++;
    
    // Don't go over size
    if(this.mNextToFillIndex > this.size())
    {
        this.mNextToFillIndex = this.size();
    }
};