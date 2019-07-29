/* UISwitchToggle.js
 * 
 */

"use strict";

/**
 * A Switch Toggle to be used for UIs
 * @param {Array[]} position Base position for the UISwitchToggle
 * @param {Array[]} size The size for the UISwitchToggle
 * @class UISwitchTogglee
 * @returns {UISwitchToggle}
 */
function UISwitchToggle(position, size) {
    UISlider.call(this, position, size);
    this.setTextVisible(false);
    // to simplify ensuring the Bar element shows the right state
    this.setMaxValue(1);
    
    this.setStencil("assets/UI/SwitchToggleStencil.png");
    // default BG color = white
    this.setBGColor([1,1,1,1]);
    
    // default Top Elem color = green
    this.setTopElemColor([0,1,0,1]);
    
    this.setHandleTexture("assets/UI/SwitchToggleHandle.png");
    // handle size slightly larger than the height of the bar
    this.setHandleSize(size[1]+5, size[1]+5);
    // default Handle color = darker green
    this.setHandleColor([0,0.75,0,1]);
    
    this.mState = true;
};
gEngine.Core.inheritPrototype(UISwitchToggle, UISlider);

/**
 * Updates the UISwitchToggle
 * @memberOf UISwitchToggle
 */
UISwitchToggle.prototype.update = function() {
    // get the mouse position
    var mousePos = vec2.fromValues(gEngine.Input.getMousePosX(),
                                gEngine.Input.getMousePosY());
    
    var mouseOver = this.getUIBBox().containsPoint(mousePos[0], mousePos[1]);
    
    // check for if the mouse is clicked
    if(gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Left)){
        if(mouseOver){
            this.mClick = true;
        }
    }
    
    // upon release of mouse button, make selection
    if(gEngine.Input.isButtonReleased(gEngine.Input.mouseButton.Left)){
        if(this.mClick) {
            // reset click's status for next update
            this.mClick = false;
            
            if(mouseOver){
                this.setState(!this.mState);
            }
        }
    }
    
    UIBar.prototype.update.call(this);
};

/**
 * Sets the State of the Switch Toggle
 * @param {bool} b The desired State of the Switch Toggle
 * @memberOf UISwitchToggle
 */
UISwitchToggle.prototype.setState = function(b) {
    this.mState = b;
    if(this.mState) {
        this.mHandle.getUIXform().setXPos(this.mMaxPos);
    }
    else {
        this.mHandle.getUIXform().setXPos(this.mMinPos);
    }
    
    // convert bool to int
    this.setCurrentValue(+this.mState);
};

/**
 * Function for retrieving the State of the Switch Toggle
 * @returns {bool} The current State of the Switch Toggle
 */
UISwitchToggle.prototype.getState = function() {
    return this.mState;
};
