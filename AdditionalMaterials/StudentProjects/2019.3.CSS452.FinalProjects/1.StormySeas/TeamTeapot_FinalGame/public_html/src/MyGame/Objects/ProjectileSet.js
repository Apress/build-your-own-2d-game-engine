/*
 * File:        ProjectileSet.js
 * Programmers: Kyla            March 15, 2019
 *
 */

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function ProjectileSet()
{
    GameObjectSet.call(this);
}
gEngine.Core.inheritPrototype(ProjectileSet, GameObjectSet);

ProjectileSet.prototype.update = function()
{
    for(var i = 0; i < this.size(); i++)
    {
        this.mSet[i].update();
        if(this.mSet[i].isDead())
        {
            this.mSet.splice(i, 1);
        }
    }
};

