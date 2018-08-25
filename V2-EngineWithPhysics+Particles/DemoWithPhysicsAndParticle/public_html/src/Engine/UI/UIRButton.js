/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

"use strict";

/**
 * A radio button for UI purposes
 * @param {function} callback The function to be called when the button is released
 * @param {object} context The owner of the callback function
 * @param {Array[]} position The base position for the UIRButton
 * @param {string} text The text for the UIRButton
 * @param {int} textSize The size for the text and the button
 * @param {Array[]} textColor The color for the text
 * @param {Camera} aCamera The camera that the UIRButton will be drawn on
 * @class UIRButton
 * @returns {UIRButton}
 */
function UIRButton(callback, context, position, text, textSize, textColor, aCamera) {
    this.mBack = new SpriteRenderable("assets/UI/radarbutton.png");
    this.mBack.setElementUVCoordinate(0.0, 1.0, 0.5, 1.0);
    
    var pixSize=textSize*(aCamera.getViewport()[2]/aCamera.getWCWidth());
    var tPos = [position[0]+pixSize/2+5,position[1]];
    
    this.mText = new UIText(text, 
                            tPos, 
                            textSize, 
                            UIText.eHAlignment.eLeft, 
                            UIText.eVAlignment.eCenter,
                            textColor);
 
    
    UIElement.call(this, this.mBack, position, [20,20]);
    
    //callback management
    this.mCallBack = callback;
    this.mContext = context;
    
    
    this.mHover = false;
    this.mClick = false;
}
gEngine.Core.inheritPrototype(UIRButton, UIElement);

/**
 * Returns the UIText on the UIRButton
 * @memberOf UIRButton
 * @returns {UIText}
 */
UIRButton.prototype.getText = function() {
    return this.mText;
};

/**
 * Draws the UIRButton on the passed camera
 * @param {Camera} aCamera The camera to draw the button on
 * @memberOf UIRButton
 */
UIRButton.prototype.draw = function (aCamera) {
    UIElement.prototype.draw.call(this, aCamera);
    
    if(this.mText !== null)
        this.mText.draw(aCamera);
};

/**
 * Updates the UIRButton
 * @memberOf UIRButton
 */
UIRButton.prototype.update = function () {
    UIElement.prototype.update.call(this);
    
    this.mClick = false;
   
    //make sure the button text stays on the button
    //this.mText.getUIXform().setPosition(uiXform.getXPos(), uiXform.getYPos());
    
    //get the mouse position, and if its over the button
    var mousePos = vec2.fromValues(gEngine.Input.getMousePosX(),
                                gEngine.Input.getMousePosY());
    var mouseOver = this.getUIBBox().containsPoint(mousePos[0], mousePos[1]);
    

    //start simple, just do callback when clicked
    if(gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Left)){
        if(mouseOver){
            var x = this.mBack.getElementUVCoordinateArray();
            if(x[2]!==0||x[0]!==1||x[5]!==0||x[1]!==0.5){
                this.mClick = true;
                this.mBack.setElementUVCoordinate(0.0, 1.0, 0.0, 0.5);
                if(this.mCallBack !== null)
                    this.mCallBack.call(this.mContext);
            }
        }
    }
};

/**
 * Sets the text for the UIRButton
 * @param {String} text The new text for the UIRButton
 * @memberOf UIRButton
 */
UIRButton.prototype.setTextString = function(text) {
    this.mText.setText(text);
};

/**
 * Sets the text's color
 * @param {Array[]} color The new text color
 * @memberOf UIRButton
 */
UIRButton.prototype.setTextColor = function(color) {
    this.mText.setColor(color);
};

/**
 * Set the height of the text
 * @param {int} height The new height
 * @memberOf UIRButton
 */
UIRButton.prototype.setTextHeight = function(height) {
    this.mText.setTextHeight(height);
};

/**
 * Resets the radio button back to a non-clicked state
 * @memberOf UIRButton
 */
UIRButton.prototype.deselect = function(){
    this.mBack.setElementUVCoordinate(0.0, 1.0, 0.5, 1.0);
    this.mClick = false;
};

/**
 * Checks whether if the button was clicked this update
 * @memberOf UIRButton
 * @returns {Boolean} If the button was clicked
 */
UIRButton.prototype.getClick = function(){
    return this.mClick;
};
/**
 * This adjusts the button so it can be drawn by the camera
 * @param {Camera} aCamera the camera to adjust for
 * @memberOf UIRButton
 */
UIRButton.prototype._applyUIXform = function(aCamera) {
    var rendXform = this.getXform();
    var WCPos = aCamera.VPpixelPosToWC(this.mUIXform.getPosition());
    rendXform.setPosition(WCPos[0], WCPos[1]);
    var height= this.mText.getXform().getHeight();
    rendXform.setSize(height, height);
    this.mText.getXform().setXPos(this.mText.getXform().getXPos());
    
};