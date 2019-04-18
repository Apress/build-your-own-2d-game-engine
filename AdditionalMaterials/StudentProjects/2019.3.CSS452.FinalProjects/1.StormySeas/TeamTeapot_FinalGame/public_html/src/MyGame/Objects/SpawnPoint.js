/*
 * File:        SpawnPoint.js
 * Programmers: Kyla            March 14, 2019
 *
 */

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function SpawnPoint(position)
{
    this.mPosition = position;
    this.mInUse = false;
}

SpawnPoint.prototype.getPosition = function() { return this.mPosition; };

SpawnPoint.prototype.inUse = function() { return this.mInUse; };
SpawnPoint.prototype.markInUse = function() { this.mInUse = true; };
SpawnPoint.prototype.unmarkInUse = function() { this.mInUse = false; };
