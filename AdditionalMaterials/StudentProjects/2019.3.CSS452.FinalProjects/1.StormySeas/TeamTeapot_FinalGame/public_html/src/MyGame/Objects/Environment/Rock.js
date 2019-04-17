/*
 * File:        PirateShip.js
 * Programmers: Jonathan            March 4, 2019
 *              Emily               March 5, 2019
 *              
 *
 */

/* jslint node: true, vars: true */
/* global gEngine: false, GameObject: false, GameObjectSet: false,
 * SpriteAnimateRenderable: false, Storm: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Rock(spriteTexture, miniMapTexture, atX, atY)
{
    this.mRock = new SpriteRenderable(spriteTexture);
    this.mRock.getXform().setPosition(atX, atY);
    this.mRock.getXform().setSize(7, 8);
    this.mRock.setElementPixelPositions(15, 500, 60, 560);
    
    this.mMapRenderable = new UISpriteRenderable(miniMapTexture);
    this.mMapRenderable.setColor([0.8, 0.8, 0.8, 1.0]);
    this.mMapRenderable.getXform().setSize(10, 10);
    this.mMapRenderable.getXform().setPosition(atX, atY);
    
    GameObject.call(this, this.mRock);
}
gEngine.Core.inheritPrototype(Rock, GameObject);

Rock.prototype.draw = function (aCamera)
{
    this.mRock.draw(aCamera);
};

Rock.prototype.drawForMap = function (aCamera)
{
    this.mMapRenderable.draw(aCamera);
};
