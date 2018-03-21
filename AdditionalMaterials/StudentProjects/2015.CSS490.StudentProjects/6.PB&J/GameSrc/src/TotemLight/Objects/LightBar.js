/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function LightBar(texture, color, size, startPosition, barSize, padding, lgtSet) {
    
    Bar.call(this, texture, color, size, startPosition, barSize, padding, lgtSet);
    
    this.mInterpolate = new InterpolateVec2([3,3],240,0.01);
    
    this.deltaSize = 0.5;
    
};

gEngine.Core.inheritPrototype(LightBar, Bar);

LightBar.prototype.decreaseBar = function()
{
    if(this.mDrawSize > 1)
    {
        var xformFirst = this.mBarRenderable[this.mDrawSize - 1].getXform();
        var xformSecond = this.mBarRenderable[this.mDrawSize - 2].getXform();

        if(xformFirst.getWidth() !== this.mBarSize[0])
        {
            var size = xformFirst.getSize();
            xformSecond.setSize(size[0], size[1]);
            xformFirst.setSize(this.mBarSize[0], this.mBarSize[1]);
        }

        this.mDrawSize--;
    }
    else if(this.mDrawSize === 1)
    {
        var xform = this.mBarRenderable[this.mDrawSize - 1].getXform();
        if(xform.getWidth() === this.mBarSize[0])
        {
            this.mDrawSize--;
        }
    }
    else
    {
    }

};

LightBar.prototype.increaseBar = function()
{
    if(this.mDrawSize === this.mTotalSize)
    {
        var xform = this.mBarRenderable[this.mDrawSize - 1].getXform();
        xform.setSize(this.mBarSize[0], this.mBarSize[1]);
        

    }
    else if(this.mDrawSize > 1)
    {
        var xformFirst = this.mBarRenderable[this.mDrawSize - 1].getXform();
        var xformSecond = this.mBarRenderable[this.mDrawSize].getXform();

        if(xformFirst.getWidth() !== this.mBarSize[0])
        {
            var size = xformFirst.getSize();
            xformSecond.setSize(size[0], size[1]);
            xformFirst.setSize(this.mBarSize[0], this.mBarSize[1]);
        }
        
        this.mDrawSize++;
    }
    
      
};

//LightBar.prototype.isFull = function()
//{
//    
//}

LightBar.prototype.canActivatePuzzle = function()
{
    if(this.mDrawSize === 1)
    {
        var xform = this.mBarRenderable[this.mDrawSize - 1].getXform();
        if(xform.getWidth() !== this.mBarSize[0])
        {
            return false;
        }
    }
    else if(this.mDrawSize === 0)
    {
        return false;
    }
    else
    {
        return true;
    }
    
    return true;
};

LightBar.prototype.decreaseSize = function()
{
    if(this.mDrawSize !== 0)
    {
        var xform = this.mBarRenderable[this.mDrawSize - 1].getXform();
    
        var sizeX = xform.getWidth();
        var sizeY = xform.getHeight();
    
        this.mInterpolate.setFinalValue([sizeX - this.deltaSize,sizeY - this.deltaSize]);
        
        this.mInterpolate.updateInterpolation();
    
        if(sizeX > 0.5 && sizeY > 0.5)
        {
            var val = this.mInterpolate.getValue();

            xform.setSize(val[0], val[1]);
        }
        else
        {
            this.mDrawSize--;
            xform.setSize(this.mBarSize[0], this.mBarSize[1]);
            this.mInterpolate.setCurrentValue([3,3]);
        }       
    }
    

    
    
};