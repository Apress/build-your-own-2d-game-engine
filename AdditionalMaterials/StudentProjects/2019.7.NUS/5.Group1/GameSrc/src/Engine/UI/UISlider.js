/* UISlider.js
 * 
 */

"use strict";

/**
 * A Slider to be used for UIs
 * @param {Array[]} position Base position for the UISlider
 * @param {Array[]} size The size for the UISlider
 * @class UISlider
 * @returns {UISlider}
 */
function UISlider(position, size) {
    UIBar.call(this, position, size);
    // hide the middle element of the UIBar
    this.setMidVisible(false);
    // turn off interpolation of the UIBar
    this.configInterpolation(1, 1);
    
    this.mClick = false;
    
    this.mMaxPos = position[0] + (size[0]/2);
    this.mMinPos = position[0] - (size[0]/2);
    
    // default Top Elem color = darker blue
    this.setTopElemColor([0,0,0.8,1]);
    
    // default handle for slider
    this.mHandle = new UITexture("assets/UI/SliderHandle.png", [this.mMaxPos, position[1]], [30,60]);
    // default Handle color = lighter blue
    this.mHandle.setColor([0,0.5,1,1]);
    
    // for allowing value of slider to be seen
    // default is show
    this.mTextVisible = true;
    this.mToFixedValue = 2;
    this.mText = new UIText(this.mMaxValue.toFixed(this.mToFixedValue).toString(), 
                            position, 
                            3, 
                            UIText.eHAlignment.eCenter, 
                            UIText.eVAlignment.eCenter,
                            [0, 0, 0, 1]);
    var pos = this.getUIXform().getXPos() + (this.getUIXform().getSize()[0]/2) + 75;
    this.mText.getUIXform().setXPos(pos);
    
    // for allowing slider to snap to values
    // default is off
    this.mSnap = false;
    this.mSnapBy = 1;
    
    // overrides/changes for if the bar is vertical
    if(this.mVertical) {
        this.mMaxPos = position[1] + (size[1]/2);
        this.mMinPos = position[1] - (size[1]/2);
        
        // for some reason, cannot just rotate existing handle
        this.setHandleTexture("assets/UI/VSliderHandle.png");
        this.mHandle.getUIXform().setPosition(position[0], this.mMaxPos);
        this.mHandle.getUIXform().setSize(60, 30);
        
        var pos = this.getUIXform().getYPos() + (this.getUIXform().getSize()[1]/2) + 50;
        this.mText.getUIXform().setPosition(position[0], pos);
    }
    
    // so can pretend value is greater than it is
    // (eg. can do volume slider that looks like it goes to 100 but only acutally goes to 1)
    // NOTE: this is only used for the text when displaying the value!!!
    this.mMultiplier = 1;
};
gEngine.Core.inheritPrototype(UISlider, UIBar);

/**
 * Draws the UISlider
 * @param {Camera} aCamera The camera to draw it on
 * @memberOf UISlider
 */
UISlider.prototype.draw = function(aCamera) {
    if(this.mVisible) {
        UIBar.prototype.draw.call(this, aCamera);
        this.mHandle.draw(aCamera);
        if(this.mTextVisible)
        {
            this.mText.draw(aCamera);
        }
    }
};

/**
 * Update the UISlider
 * @memberOf UISlider
 */
UISlider.prototype.update = function() {
    // get position of the mouse
    var mousePos = vec2.fromValues(gEngine.Input.getMousePosX(),
                                gEngine.Input.getMousePosY());
                                
    // check if the mouse is over the handle
    var mouseOver = this.mHandle.getUIBBox().containsPoint(mousePos[0], mousePos[1]);      
    
    // check for mouse click
    if(gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Left)){
        if(mouseOver){
            this.mClick = true;
        }
    }
    
    if(gEngine.Input.isButtonReleased(gEngine.Input.mouseButton.Left)){
        this.mClick = false;
    }
    
    // to do only if the handle is being moved
    if(this.mClick) {
        var barSize = this.mMaxPos - this.mMinPos;
        
        var pos = this.mVertical ? this._checkPosOnBar(mousePos[1]) : this._checkPosOnBar(mousePos[0]);
        
        // compute value based on handle's position
        var handlePosValue = (pos - this.mMinPos)/barSize * this.mMaxValue;
        
        // if snapping, compute the xpos to the nearest value to snap to
        // https://stackoverflow.com/questions/3254047/round-number-up-to-the-nearest-multiple-of-3
        if(this.mSnap) {
            var remainder = handlePosValue%this.mSnapBy;
            if(remainder < (this.mSnapBy/2)) {
                handlePosValue -= remainder;
            }
            else if(remainder > (this.mSnapBy/2)) {
                handlePosValue = handlePosValue + this.mSnapBy - remainder;
            }
            pos = ((handlePosValue/this.mMaxValue) * barSize) + this.mMinPos;
            pos = this._checkPosOnBar(pos);
        }
        
        
        // set handle's position
        if(this.mVertical) {
            this.mHandle.getUIXform().setYPos(pos);
        }
        else {
            this.mHandle.getUIXform().setXPos(pos);
        }
        
        // set the value
        this.setCurrentValue(handlePosValue);
    }
    
    // done here so from beginning will be shown properly
    this.mText.setText((this.mCurValue*this.mMultiplier).toFixed(this.mToFixedValue).toString());
    
    UIBar.prototype.update.call(this);
};

/**
 * Sets the Texture of the Handle
 * @param {String} tex Location of the Texture to be used for the Handle
 * @memberOf UISlider
 */
UISlider.prototype.setHandleTexture = function (tex) {
    this.mHandle.setTexture(tex);
};

/**
 * Sets the size of the Handle
 * @param {float} w Desired width for the Handle
 * @param {float} h Desired height for the Handle
 * @memberOf UISlider
 */
UISlider.prototype.setHandleSize = function(w, h) {
    this.mHandle.getUIXform().setSize(w, h);
};

/**
 * Sets the Color of the Handle
 * @param {float[]} c The Color to be used for the Handle
 * @memberOf UISlider
 */
UISlider.prototype.setHandleColor = function (c) {
    this.mHandle.setColor(c);
};

/**
 * Sets the Color of the Slider's Bar
 * @param {float[]} c The Color to be used for the Bar
 * @memberOf UISlider
 */
UISlider.prototype.setColor = function(c) {
    UIBar.prototype.setTopElemColor.call(this, c);
};

/**
 * Sets the X offset of the Text from position of Slider
 * @param {float} v The value to offset the Text by
 * @memberOf UISlider
 */
UISlider.prototype.setTextXOffset = function(v) {
    this.mText.getUIXform().setXPos(v);
};

/**
 * Sets the Color of the Text
 * @param {float[]} c The desired Color of the Text
 * @memberOf UISlider
 */
UISlider.prototype.setTextColor = function(c) {
    this.mText.setColor(c);
};

/**
 * Sets the size of the Text
 * @param {float} val The desired  of the Text
 * @memberOf UISlider
 */
UISlider.prototype.setTextSize = function(val) {
    this.mText.setTextHeight(val);
};

/**
 * Sets whether the Text should be visible
 * @param {bool} b Should the Text be shown
 * @memberOf UISlider
 */
UISlider.prototype.setTextVisible = function(b) {
    this.mTextVisible = b;
};

/**
 * Sets the amount of decimal places should be shown by the Text element
 * @param {float} v The amount of decimal places to be shown
 * @memberOf UISlider
 */
UISlider.prototype.setToFixedValue = function(v) {
    this.mToFixedValue = v;
};

/**
 * Sets whtether the Slider should snap
 * @param {bool} b Should the Slider snap to certain values
 * @memberOf UISlider
 */
UISlider.prototype.setSnap = function(b) {
    this.mSnap = b;
};

/**
 * Sets increments for Slider to snap by
 * @param {float} v The increments by which the Slider should snap by
 *                  (eg. if set to 0.5, Slider will snap to nearest 0.5
 *                      so 1.2 would snap to 1 and 1.7 would snap to 1.5) 
 * @memberOf UISlider
 */
UISlider.prototype.setSnapBy = function(v) {
    this.mSnapBy = v;
};

/**
 * Sets the current value of the Slider
 * @param {float} v The value the Slider should be at
 * @memberOf UISlider
 */
UISlider.prototype.setCurrentValue = function(v) {
    // call parent class's function
    UIBar.prototype.setCurrentValue.call(this, v);
    
    // set handle's position accordingly
    if(this.mVertical) {
        this.mHandle.getUIXform().setYPos(((v/this.mMaxValue)*(this.mMaxPos-this.mMinPos))+this.mMinPos);
    }
    else {
        this.mHandle.getUIXform().setXPos(((v/this.mMaxValue)*(this.mMaxPos-this.mMinPos))+this.mMinPos);
    }
};

/**
 * Sets the value of the multiplier
 * @param {float} v The number the current value should be multiplied by when shown
 * @memberOf UISlider
 */
UISlider.prototype.setMultiplier = function(v) {
    this.mMultiplier = v;
};

/**
 * Private function to return valid position on Slider if given position is not on Slider's Bar
 * @param {float} pos Position to check
 * @returns {float} Valid position on Slider
 */
UISlider.prototype._checkPosOnBar = function(pos) {
    if(pos < this.mMinPos) {
        return this.mMinPos;
    }
    if(pos > this.mMaxPos) {
        return this.mMaxPos;
    }
    return pos;
};
