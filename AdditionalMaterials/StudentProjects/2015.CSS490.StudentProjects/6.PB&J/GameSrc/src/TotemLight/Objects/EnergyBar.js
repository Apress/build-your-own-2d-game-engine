/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


"use strict";  // Operate in Strict mode such that variables must be declared before used!

function EnergyBar(texture, color, size, startPosition, barSize, lgtSet) {
    
    GameObject.call(this, this.mTexture);
    this.mColor = color;
    //Maximum bars
    this.mTotalSize = size;
    this.mBarRenderable = null;
    
    this.mTexture = texture;
    
    //how many bars to draw, default to full bars
    this.mDrawSize = size;
    
    //Starting position of the first bar, vec2
    this.mStartPosition = startPosition;
    //width and height of the bars, vec2
    this.mBarSize = barSize;

    this.mLight = lgtSet;
    
    //this.mInterpolate = new InterpolateVec2([3,3], 240, 0.01);
    this.delta = 0.5;
};

gEngine.Core.inheritPrototype(EnergyBar, GameObject);

EnergyBar.prototype.initialize = function()
{
    var i = 0;
    
    var pos = this.mStartPosition;
    
        var temp = new LightRenderable(this.mTexture);
        temp.setColor(this.mColor);
        
        var xform = temp.getXform();
        xform.setPosition(pos[0], pos[1]);
        xform.setSize(this.mBarSize[0], this.mBarSize[1]);
        xform.setZPos(1);
        
        this.mBarRenderable = temp;
};

EnergyBar.prototype.update = function() {
    this.mBarRenderable.getXform().setXPos(this.mStartPosition[0] + (this.mDrawSize / 2));
    this.mBarRenderable.getXform().setWidth(this.mDrawSize);
};

EnergyBar.prototype.draw = function(aCamera)
{
    this.mBarRenderable.draw(aCamera);
};

EnergyBar.prototype.decreaseBar = function()
{
    if(this.mDrawSize !== 0)
    {
        this.mDrawSize--;
    }
};

EnergyBar.prototype.increaseBar = function()
{
    if(this.mDrawSize < this.mTotalSize)
    {
        this.mDrawSize++;
    }
};

EnergyBar.prototype.getBarSize = function()
{
    return this.mDrawSize;
};

EnergyBar.prototype.setBarSize = function(size)
{
    this.mDrawSize = size;
};