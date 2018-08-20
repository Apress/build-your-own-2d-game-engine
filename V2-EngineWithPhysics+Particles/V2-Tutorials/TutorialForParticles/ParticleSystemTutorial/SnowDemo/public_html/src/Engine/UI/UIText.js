/* File: UIText
 * A UI Element that renders a FontRenderable
 */

"use strict";
/**
 * The horiziontal alignment of the UIText
 * @memberOf UIText
 * @type enum | eHAlignment
 */
UIText.eHAlignment = Object.freeze({
    eLeft: 0,
    eCenter: 1,
    eRight: 2
});

/**
 * The vertical alignment of the UIText
 * @memberOf UIText
 * @type enum | eVAlignment
 */
UIText.eVAlignment = Object.freeze({
   eTop: 0,
   eCenter: 1,
   eBottom: 2
});

/**
 * Creates text used for UI
 * @class UIText
 * @param {String} text The text that the font will be based on
 * @param {Array[]} position The base position of the UIText
 * @param {int} size The size of the UIText
 * @param {int} hAlign The horizontal align of the UIText
 * @param {int} vAlign The vertical align of the UIText
 * @param {Array[]} color The color of the text
 * @returns {UIText}
 */
function UIText(text, position, size, hAlign, vAlign, color) {
    this.mFontRenderable = new UITextBoxFont(text);
    this.mFontRenderable.setColor(color);
    this.mFontRenderable.setTextHeight(size);
    UIElement.call(this, this.mFontRenderable, position, null);
    
    if(hAlign === null)
        this.mHorizAlignment = UIText.eHAlignment.eLeft;
    else
        this.mHorizAlignment = hAlign;
    
    if(vAlign === null)
        this.mVertAlignment = UIText.eVAlignment.eBottom;
    else
        this.mVertAlignment = vAlign;
};
gEngine.Core.inheritPrototype(UIText, UIElement);

/**
 * Sets the color of the text
 * @param {Array[]} c The color to set the text to
 * @memberOf UIText
 */
UIText.prototype.setColor = function (c) {
    this.mFontRenderable.setColor(c);
};

/**
 * Gets the color of the text
 * @memberOf UIText
 */
UIText.prototype.getColor = function() {
    return this.mFontRenderable.getColor();
};

/**
 * Sets the text of the UIText
 * @param {String} t The text to change it to
 * @memberOf UIText
 */
UIText.prototype.setText = function (t) {
    this.mFontRenderable.setText(t);
};

/**
 * Get the text of the UIText
 * @memberOf UIText
 */
UIText.prototype.getText = function () {
    return this.mFontRenderable.getText();
};

/**
 * Set the height of the text
 * @param {int} h The new height to change it to
 * @memberOf UIText
 */
UIText.prototype.setTextHeight = function (h) {
    this.mFontRenderable.setTextHeight(h);
};

/**
 * Converts the pixel position to a WC position that the camera to use
 * @param {Camera} aCamera The camera the the conversion will be based off of
 * @memberOf UIText
 */
UIText.prototype._applyUIXform = function(aCamera) {
    var rendXform = this.getXform();
    var alignOff = this._getAlignmentOffset();  // takes allignment into consideration
    
    var WCPos = aCamera.VPpixelPosToWC(this.mUIXform.getPosition());
    rendXform.setPosition(WCPos[0] + alignOff[0], WCPos[1] + alignOff[1]);
};

UIText.prototype.draw = function(aCamera){
    if(this.mVisible) {
        this._applyUIXform(aCamera);
        this.mFontRenderable.draw(aCamera,0);
    }
};

/**
 * Calculates the position changes needed to match the allignment
 * @memberOf UIText
 */
UIText.prototype._getAlignmentOffset = function() {
    var alignOff = vec2.fromValues(0, 0);
    var symbolSize = this.mFontRenderable.getSymbolSize();
    var halfWidth = this.mFontRenderable.getXform().getWidth() / 2;
    switch(this.mHorizAlignment)
    {
        case UIText.eHAlignment.eLeft:
            alignOff[0] += symbolSize[0] / 2;
            break;
        case UIText.eHAlignment.eCenter:
            alignOff[0] -= (halfWidth - symbolSize[0] / 2);
            break;
        case UIText.eHAlignment.eRight:
            alignOff[0] -= (halfWidth * 2 - symbolSize[0] / 2);
            break;
    }
    
    switch(this.mVertAlignment)
    {
        case UIText.eVAlignment.eTop:
            alignOff[1] -= symbolSize[1] / 2;
            break;
        case UIText.eVAlignment.eCenter:
            break;
        case UIText.eVAlignment.eBottom:
            alignOff[1] += symbolSize[1] / 2;
            break;
    }
    
    return alignOff;
};