/* UIToggle.js
 * 
 */

"use strict";

/**
 * A Toggle to be used for UIs
 * @param {Array[]} position Base position for the UIToggle
 * @param {Array[]} size The size for the UIToggle
 * @param {String[]} optionTexts The text for the different options
 * @param {float} textSize The size of the Text
 * @class UIToggle
 * @returns {UIToggle}
 */
function UIToggle(position, size, optionTexts, textSize) {
    // for supporting vertical toggles
    this.mVertical = size[0]<size[1];
    
    // default BG color = black
    this.mBg = new UIRenderable([0,0,0,1], position, size);
    
    var amtOptions = optionTexts.length;
    var fgSize = [size[0]/amtOptions,size[1]];
    var nextPos = [(position[0]-(size[0]/2)+(fgSize[0]/2)),position[1]];
    
    if(this.mVertical)
    {
        fgSize = [size[0],size[1]/amtOptions];
        nextPos = [position[0], (position[1]+(size[1]/2)-(fgSize[1]/2))];
    }
    
    
    // to show which option is selected
    // default FG color = purple
    this.mFg = new UIRenderable([0.5,0,1,1], nextPos, fgSize);

    // 2d array for holding the options and the bbox relating to each optionn
    this.mText = [];
    
    // to allow for having text color change upon selection
    //default Text color = white
    this.mNormalTextColor = [1,1,1,1];
    this.mSelectedTextColor = this.mNormalTextColor;
    
    for(var i = 0; i < optionTexts.length; i++) {
        var newText = new UIText(optionTexts[i], 
                            nextPos, 
                            textSize, 
                            UIText.eHAlignment.eCenter, 
                            UIText.eVAlignment.eCenter,
                            this.mNormalTextColor);
        var newBBox = new BoundingBox(nextPos, fgSize[0], fgSize[1]);
        this.mText.push([newText, newBBox]);
        if(this.mVertical) {
            nextPos = [nextPos[0],nextPos[1]-fgSize[1]];
        }
        else {
            nextPos = [nextPos[0]+fgSize[0],nextPos[1]];
        }
    }                       
    
    // starts by having the first option selected
    this.mCurValue = 0;
    this.mClick = false;
    
    var startPos = this.mText[0][0].getUIXform().getXPos();
    if(this.mVertical) {
        startPos = this.mText[0][0].getUIXform().getYPos();
    }
    // set defualt interpolation
    this.mInterpolation = new Interpolate(startPos, 60, 0.25);
    
    UIElement.call(this, position, size);
};
gEngine.Core.inheritPrototype(UIToggle, UIElement);

/**
 * Draws the UIToggle to the given Camera
 * @param {Camera} aCamera The Camera to draw the Toggle to
 * @memberOf UIToggle
 */
UIToggle.prototype.draw = function(aCamera) {
    if(this.mVisible) {
        this.mBg.draw(aCamera);
        this.mFg.draw(aCamera);
        for(var i = 0; i < this.mText.length; i++) {
            this.mText[i][0].draw(aCamera);
        }   
    }
};

/**
 * Updates the UIToggle
 * @memberOf UIToggle
 */
UIToggle.prototype.update = function() {
    UIElement.prototype.update.call(this);
    
    // update the interpolation
    this.mInterpolation.updateInterpolation();
    
    // get the mouse position
    var mousePos = vec2.fromValues(gEngine.Input.getMousePosX(),
                                gEngine.Input.getMousePosY());
    
    // local variables for determining which option is chosen
    var mouseOption = 0;
    var mouseOver = false;
    
    // check if the mouse is over an option
    for(var i = 0; i < this.mText.length; i++)
    {
        if(this.mText[i][1].containsPoint(mousePos[0], mousePos[1])) {
            mouseOption = i;
            mouseOver = true;
        }
    }
    
    // check for if the mouse is clicked
    if(gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Left)){
        if(mouseOver){
            this.mClick = true;
        }
    }
    
    var fgXform = this.mFg.getUIXform();
    // upon release of mouse button, make selection
    if(gEngine.Input.isButtonReleased(gEngine.Input.mouseButton.Left)){
        if(this.mClick) {
            // reset click's status for next update
            this.mClick = false;
            
            if(mouseOver){
                // set the previous selection's text color to the normal text color
                this.mText[this.mCurValue][0].setColor(this.mNormalTextColor);
                
                this.mCurValue = mouseOption;

                // set interpolation
                var pos = this.mText[mouseOption][0].getUIXform().getXPos();
                if(this.mVertical) {
                    pos = this.mText[mouseOption][0].getUIXform().getYPos();
                }
                this.mInterpolation.setFinalValue(pos);
                
                this.mText[this.mCurValue][0].setColor(this.mSelectedTextColor);
            }
        }
    }
    
    // update the foreground element's position
    if(this.mVertical) {
        fgXform.setYPos(this.mInterpolation.getValue());
    }
    else {
        fgXform.setXPos(this.mInterpolation.getValue());
    }
};

/**
 * Function to return which option is currently selected
 * @returns {int} The index of the currently selected option
 * @memberOf UIToggle
 */
UIToggle.prototype.getCurValue = function() {
    return this.mCurValue;
};

/**
 * Sets the background's Color
 * @param {float[]} c The desired Color for the background
 * @memberOf UIToggle
 */
UIToggle.prototype.setBGColor = function(c) {
    this.mBg.setColor(c);
};

/**
 * Sets the foreground's Color
 * @param {float[]} c The desired Color for the foreground indicating the selected option
 * @memberOf UIToggle
 */
UIToggle.prototype.setSelectionColor = function(c) {
    this.mFg.setColor(c);
};

/**
 * Sets the Color of the selected option
 * @param {float[]} c The desired Color of the Text of the option currently selected
 * @memberOf UIToggle
 */
UIToggle.prototype.setSelectedTextColor = function(c) {
    this.mSelectedTextColor = c;
    
    // so is immediately used
    this.mText[this.mCurValue][0].setColor(this.mSelectedTextColor);
};

/**
 * Sets the normal Color of the options
 * @param {float[]} c The desired normal Color of the Text
 * @memberOf UIToggle
 */
UIToggle.prototype.setNormalTextColor = function(c) {
    this.mNormalTextColor = c;
    
    // so is immediately used
    for(var i = 0; i < this.mText.length; i++) {
            if(i !== this.mCurValue) {
                this.mText[i][0].setColor(this.mNormalTextColor);
            }
        }   
};

/**
 * Configures the Interpolation
 * @param {int} cycles Over how many frames should the Interpolation happen, 1 turns off Interpolation
 * @param {float} rate How much the Interpolation should change over a frame
 * @memberOf UIToggle
 */
UIToggle.prototype.configInterpolation = function(cycles, rate) { 
    this.mInterpolation.configInterpolation(rate, cycles);
};
