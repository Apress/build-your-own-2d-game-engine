/*
 * File:        WaterfallSet.js
 * Programmers: Emily           March 17, 2019
 *
 */

/* jslint node: true, vars: true */
/* global gEngine: false, GameObject: false, GameObjectSet: false,
 * SpriteAnimateRenderable: false, Storm: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function WaterfallSet(spriteTexture)
{
    this.mSpriteTex = spriteTexture;
    
    GameObjectSet.call(this);
}
gEngine.Core.inheritPrototype(WaterfallSet, GameObjectSet);

WaterfallSet.prototype.createWaterfalls = function()
{
    for (var side = 0; side < 4; side++)
    {
        this._createSingularWaterfall(-300, 255, 90);
        this._createSingularWaterfall(-300, 165, 90);
        this._createSingularWaterfall(-300, 85, 90);
        this._createSingularWaterfall(-300, 0, 90);
        this._createSingularWaterfall(-300, -85, 90);
        this._createSingularWaterfall(-300, -165, 90);
        this._createSingularWaterfall(-300, -255, 90);
        
        this._createSingularWaterfall(255, 300, 0);
        this._createSingularWaterfall(165, 300, 0);
        this._createSingularWaterfall(85, 300, 0);
        this._createSingularWaterfall(0, 300, 0);
        this._createSingularWaterfall(-85, 300, 0);
        this._createSingularWaterfall(-165, 300, 0);
        this._createSingularWaterfall(-255, 300, 0);
        
        this._createSingularWaterfall(300, 255, 270);
        this._createSingularWaterfall(300, 165, 270);
        this._createSingularWaterfall(300, 85, 270);
        this._createSingularWaterfall(300, 0, 270);
        this._createSingularWaterfall(300, -85, 270);
        this._createSingularWaterfall(300, -165, 270);
        this._createSingularWaterfall(300, -255, 270);
        
        this._createSingularWaterfall(255, -300, 180);
        this._createSingularWaterfall(165, -300, 180);
        this._createSingularWaterfall(85, -300, 180);
        this._createSingularWaterfall(0, -300, 180);
        this._createSingularWaterfall(-85, -300, 180);
        this._createSingularWaterfall(-165, -300, 180);
        this._createSingularWaterfall(-255, -300, 180);
    }
};

WaterfallSet.prototype._createSingularWaterfall = function(x, y, rot)
{
    var waterfall = new Waterfall(this.mSpriteTex, x, y, rot);
    this.addToSet(waterfall);
};
