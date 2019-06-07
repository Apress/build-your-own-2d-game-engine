/* UIBar.js
 * 
 */

"use strict";

/**
 * A Bar to be used for UIs (eg. as a health or stamina Bar)
 * @param {Array[]} position Base position for the UIBar
 * @param {Array[]} size The size for the UIBar
 * @class UIBar
 * @returns {UIBar}
 */
function UIBar(position, size) {
    // for supporting vertical bars
    this.mVertical = size[0]<size[1];
    
    // default BG color = black;
    this.mBg = new UIRenderable([0, 0, 0, 1], position, size);
    this.mBgVisible = true;
    
    // stencil to use when drawing
    // assumes stencil will not be resized or move position after created
    this.mStencil = new UISprite("assets/UI/BarStencil.png", position, size, [0,1,0,1]);
    if(this.mVertical) {
        // for some reason, cannot just rotate existing stencil
        this.setStencil("assets/UI/VBarStencil.png");
    }
    
    // default max value is 100
    this.mMaxValue = 100;
    this.mCurValue = this.mMaxValue;
    
    // Middle Value Element
    // default Mid Elem color = orange
    this.mMidValElem = new UIRenderable([1, 0.75, 0, 1], position, size);
    // whether the MidValElem is shown
    this.mMidVisible = true;
    
    // Top Value Element
    // default Top Elem color = red
    this.mTopValElem = new UIRenderable([1, 0, 0, 1], position, size);
    
    this.mInterValue = this.mCurValue;
    // set default interpolation
    this.mInterpolation = new Interpolate(this.mCurValue, 120, 0.05);
    
    // state of increasing or decreasing
    // used for determining the behavior of the Middle and Top elements
    this.mIncreasing = false;
    
    // whether or not the Top element should snap upon increasing
    this.mSnapInc = false;
    
    
    UIElement.call(this, position, size);
};
gEngine.Core.inheritPrototype(UIBar, UIElement);

/**
 * Draws the UIBar using the Stencil
 * @param {Camera} aCamera The camera to draw it on
 * @memberOf UIBar
 */
UIBar.prototype.draw = function(aCamera) {
    if(this.mVisible) {
        gEngine.Stencil.beginDrawToStencilBuffer();
        gEngine.Stencil.clearStencilBuffer();
        this.mStencil.draw(aCamera);
        gEngine.Stencil.endDrawToStencilBuffer();
        
        gEngine.Stencil.beginStencilCulling();
        if(this.mBgVisible){
            this.mBg.draw(aCamera);
        }
        if(this.mMidVisible) {
            this.mMidValElem.draw(aCamera);
        }
        this.mTopValElem.draw(aCamera);
        gEngine.Stencil.endStencilCulling();
    }
};

/**
 * Update the UIBar
 * @memberOf UIBar
 */
UIBar.prototype.update = function() {
    UIElement.prototype.update.call(this);
    this.mInterpolation.updateInterpolation();
    this.mInterValue = this.mInterpolation.getValue();
    
    var s = this.getUIXform().getSize();
    var p = this.getUIXform().getPosition();
    var topValue = this.mInterValue;
    
    // due to using stencil when drawing, can just move elements
    // (no need to resize)
    if(this.mMidVisible) {
        // switch which interpolation to use for which element so as to show
        // trace of value change
        var midValue = this.mIncreasing ? this.mCurValue : this.mInterValue;
        topValue = this.mIncreasing ? this.mInterValue : this.mCurValue;
        
        if(this.mVertical)
        {
            this.mMidValElem.getUIXform().setPosition(p[0], this._processPosition(p[1], s[1], midValue));
        }
        else {
            this.mMidValElem.getUIXform().setPosition(this._processPosition(p[0], s[0], midValue), p[1]);
        }
        this.mMidValElem.update();
    }
    
    // if snap increasing, set topValue appropriately
    if(this.mSnapInc && this.mIncreasing) {
        topValue = this.mCurValue;
    }

    if(this.mVertical) {
        this.mTopValElem.getUIXform().setPosition(p[0], this._processPosition(p[1], s[1], topValue));
    }
    else {
        this.mTopValElem.getUIXform().setPosition(this._processPosition(p[0], s[0], topValue), p[1]);
    }
    this.mTopValElem.update();
};

/**
 * Set the Max Value of the Bar
 * @param {int} value What to set the Max Value to
 * @memberOf UIBar
 */
UIBar.prototype.setMaxValue = function(value) {
    if(value > 0) {
        this.mMaxValue = value;
    }
    
    if(this.mCurValue > this.mMaxValue) {
        this.mCurValue = this.mMaxValue;
        var config1 = this.mInterpolation.getConfig();
        this.mInterpolation = new Interpolate(this.mCurValue, config1[0], config1[1]);
    }
};

/**
 * Set the Current Value
 * @param {type} value Shat to set the Current Value
 * @memberOf UIBar
 */
UIBar.prototype.setCurrentValue = function(value) {
    if(value < 0) {
        this.mCurValue = 0;
    }
    else {
        this.mCurValue = value;
    }
    
    if(this.mCurValue > this.mMaxValue) {
        this.mCurValue = this.mMaxValue;
    }
    
    if(value < this.mCurValue) {
        this.mIncreasing = false;
    }
    else {
        this.mIncreasing = true;
    }
    
    this.mInterpolation.setFinalValue(this.mCurValue);
};

/**
 * Get the Max Value
 * @returns {int} The Max Value
 * @memberOf UIBar
 */
UIBar.prototype.getMaxValue = function() { return this.mMaxValue; };

/**
 * Get the Current Value
 * @returns {float} The Current Value
 * @memberOf UIBar
 */
UIBar.prototype.getCurrentValue = function() { return this.mCurValue; };

/**
 * Increment the Value by the passed amount
 * @param {type} value The amount to increment by
 * @memberOf UIBar
 */
UIBar.prototype.incCurrentValue = function(value) {
    if(this.mCurValue + value > this.mMaxValue)
        this.mCurValue = this.mMaxValue; 
    else if(this.mCurValue + value < 0)
        this.mCurValue = 0;
    else
        this.mCurValue = this.mCurValue + value;
    
    if(value < 0) {
        this.mIncreasing = false;
    }
    else if(value > 0) {
        this.mIncreasing = true;
    }
    
    this.mInterpolation.setFinalValue(this.mCurValue);
};

/**
 * Sets whether or not to show the Background
 * @param {bool} visible Bool value of whether or not to show the background
 * @memberOf UIBar
 */
UIBar.prototype.setBGVisible = function(visible) { this.mBgVisible = visible; };

/**
 * Sets whether or not to show the Middle Element
 * @param {bool} visible Bool value of whether or not to show the background
 * @memberOf UIBar
 */
UIBar.prototype.setMidVisible = function(visible) { this.mMidVisible = visible; };

/**
 * Configures the Interpolation
 * @param {int} cycles Over how many frames should the Interpolation happen, 1 turns off Interpolation
 * @param {float} rate How much the Interpolation should change over a frame
 * @memberOf UIBar
 */
UIBar.prototype.configInterpolation = function(cycles, rate) { 
    this.mInterpolation.configInterpolation(rate, cycles);
};

/**
 * Sets the Color of the Background
 * @param {float[]} c The desired Color for the Background
 * @memberOf UIBar
 */
UIBar.prototype.setBGColor = function(c) {
    this.mBg.setColor(c);
};

/**
 * Sets the Color of the Middle Element
 * @param {float[]} c The desired Color for the Middle Element
 * @memberOf UIBar
 */
UIBar.prototype.setMidElemColor = function(c) {
    this.mMidValElem.setColor(c);
};

/**
 * Sets the Color of the Top Element
 * @param {float[]} c The desired Color for the Top Element
 * @memberOf UIBar
 */
UIBar.prototype.setTopElemColor = function(c) {
    this.mTopValElem.setColor(c);
};

/**
 * Sets whether the Top Element should snap when Value is increasing
 * @param {bool} b Should the Top Element snap upon increasing Value
 * @memberOf UIBar
 */
UIBar.prototype.setSnapIncrease = function(b) { this.mSnapInc = b; };

/**
 * Sets the sprite to be used for the Stencil
 * @param {String} stencilSprite Location of the Sprite to be used for Stenciling
 * @memberOf UIBar
 */
UIBar.prototype.setStencil = function(stencilSprite) {
    this.mStencil.setTexture(stencilSprite);
};

/**
 * Sets the UVs of the Stencil
 * @param {type} left
 * @param {type} right
 * @param {type} bottom
 * @param {type} top
 * @memberOf UIBar
 */
UIBar.prototype.setStencilUV = function(left, right, bottom, top) {
    this.mStencil.setElementUVCoordinate(left, right, bottom, top);
};

/**
 * Private function for an equation used multiple times for positioning the Mid and Top Elems
 * @param {float} posVal An X or Y position
 * @param {float} sizeVal An X or Y size
 * @param {float} val A value for the Mid or Top Elem
 * @returns {float} New positional value based on given values
 */
UIBar.prototype._processPosition = function(posVal, sizeVal, val) {
    return posVal - sizeVal + (sizeVal * (val / this.mMaxValue));
};