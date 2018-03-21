/* File: UIText
 * A UI Element that renders a FontRenderable
 */

"use strict";

UIText.eHAlignment = Object.freeze({
    eLeft: 0,
    eCenter: 1,
    eRight: 2
});

UIText.eVAlignment = Object.freeze({
   eTop: 0,
   eCenter: 1,
   eBottom: 2
});

function UIText(text, position, size, hAlign, vAlign) {
    this.mFontRenderable = new FontRenderable(text);
    this.mFontRenderable.setColor([0, 0, 0, 1]);
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

UIText.prototype.setColor = function (c) {
    this.mFontRenderable.setColor(c);
};

UIText.prototype.getColor = function() {
    return this.mFontRenderable.getColor();
};

UIText.prototype.setText = function (t) {
    this.mFontRenderable.setText(t);
};

UIText.prototype.setTextHeight = function (h) {
    this.mFontRenderable.setTextHeight(h);
};

UIText.prototype._applyUIXform = function(aCamera) {
    var rendXform = this.getXform();
    var alignOff = this._getAlignmentOffset();
    
    var WCPos = aCamera.VPpixelPosToWC(this.mUIXform.getPosition());
    rendXform.setPosition(WCPos[0] + alignOff[0], WCPos[1] + alignOff[1]);
};

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