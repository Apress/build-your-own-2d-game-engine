/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

"use strict";

function UIButton(buttonSprite, callback, context, position, size, text, textSize, textColor) {
    this.mBack = new LightRenderable(buttonSprite);
    
    var uv = Config.UI.UIButton.NormalUV;
    this.mBack.setElementUVCoordinate(uv[0], uv[1], uv[2], uv[3]);
    UIElement.call(this, this.mBack, position, size);
    
    this.mText = new UIText(text, 
                            position, 
                            textSize, 
                            UIText.eHAlignment.eCenter, 
                            UIText.eVAlignment.eCenter);
    if(textColor !== null)
        this.mText.setColor(textColor);
    
    //callback management
    this.mCallBack = callback;
    this.mContext = context;
    
    //Button state management
    this.mHover = false;
    this.mClick = false;
}
gEngine.Core.inheritPrototype(UIButton, UIElement);

UIButton.prototype.getText = function() {
    return this.mText;
};

UIButton.prototype.draw = function (aCamera) {
    UIElement.prototype.draw.call(this, aCamera);
    
    if(this.mText !== null)
        this.mText.draw(aCamera);
};


UIButton.prototype.update = function () {
    UIElement.prototype.update.call(this);
    var uiXform = this.getUIXform();
   
    //make sure the button text stays on the button
    this.mText.getUIXform().setPosition(uiXform.getXPos(), uiXform.getYPos());
    
    //get the mouse position, and if its over the button
    var mousePos = vec2.fromValues(gEngine.Input.getMousePosX(),
                                   gEngine.Input.getMousePosY());
    var mouseOver = this.getUIBBox().containsPoint(mousePos[0], mousePos[1]);
    

    //if button is clicked, change the sprite to reflect that
    if(gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Left)){
        if(mouseOver){
            this.mClick = true;
            var uv = Config.UI.UIButton.ClickedUV;
            this.mBack.setElementUVCoordinate(uv[0], uv[1], uv[2], uv[3]);
        }
    }
    
    //when the player releases, change the sprite.
    //if the mouse is still in the button, do the callback
    if(gEngine.Input.isButtonReleased(gEngine.Input.mouseButton.Left)){
        if(this.mClick) {
            var uv = Config.UI.UIButton.NormalUV;
            this.mBack.setElementUVCoordinate(uv[0], uv[1], uv[2], uv[3]);
            this.mClick = false;
            
            if(mouseOver){
                if(this.mCallBack !== null)
                    this.mCallBack.call(this.mContext);
            }
        }
    }
};

//Text Manipulation
UIButton.prototype.setTextString = function(text) {
    this.mText.setText(text);
};

UIButton.prototype.setTextColor = function(color) {
    this.mText.setColor(color);
};

UIButton.prototype.setTextHeight = function(height) {
    this.mText.setTextHeight(height);
};
