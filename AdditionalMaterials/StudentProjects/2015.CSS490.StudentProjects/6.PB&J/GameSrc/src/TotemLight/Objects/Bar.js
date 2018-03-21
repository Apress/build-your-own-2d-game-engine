/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Bar(texture, color, size, startPosition, barSize, padding, lgtSet) {
    
    GameObject.call(this, this.mTexture);
    this.mColor = color;
    //Maximum bars
    this.mTotalSize = size;
    this.mBarRenderable = [];
    
    this.mTexture = texture;
    
    //how many bars to draw, default to full bars
    this.mDrawSize = size;
    
    //Starting position of the first bar, vec2
    this.mStartPosition = startPosition;
    //width and height of the bars, vec2
    this.mBarSize = barSize;
    
    //padding between the bars
    this.mPadding = padding;    

    this.mLight = lgtSet;
};

gEngine.Core.inheritPrototype(Bar, GameObject);

Bar.prototype.initialize = function()
{
    var i = 0;
    
    var pos = this.mStartPosition;
    
    for( i = 0; i < this.mTotalSize; i++)
    {
        var temp = new LightRenderable(this.mTexture);
        temp.setColor(this.mColor);
        
        var xform = temp.getXform();
        xform.setPosition(pos[0], pos[1]);
        xform.setSize(this.mBarSize[0], this.mBarSize[1]);
        xform.setZPos(1);
        
        this.mBarRenderable.push(temp);
        
        pos[0] = pos[0] + this.mBarSize[0] + this.mPadding;
    }
};

Bar.prototype.draw = function(aCamera)
{

    var i;
    for(i = 0; i < this.mDrawSize; i++)
    {
        this.mBarRenderable[i].draw(aCamera);
    }
};

Bar.prototype.decreaseBar = function()
{
    if(this.mDrawSize !== 0)
    {
        this.mDrawSize--;
    }
};

Bar.prototype.increaseBar = function()
{
    if(this.mDrawSize < this.mTotalSize)
    {
        this.mDrawSize++;
    }
};

Bar.prototype.getBarSize = function()
{
    return this.mDrawSize;
};

Bar.prototype.setBarSize = function(size)
{
    this.mDrawSize = size;
};

Bar.prototype.setTotalBarSize = function(size)
{
    this.mTotalSize = size;
};