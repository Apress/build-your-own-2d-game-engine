/**
 * A Drop Down Button
 * @param {Array[]} position The position for the button
 * @param {String} text The text for the button
 * @param {float} textSize The size for the text
 * @param {Array[]} color The color for the text
 * @param {Array[]} boxColor The color for the box
 * @param {function} callback The function to call when it is clicked
 * @param {object} context who is function belongs to
 * @class UIDDButton
 * @returns {UIDDButton}
 */
function UIDDButton(position, text, textSize, color, boxColor, callback, context){
    UIText.call(this,text,position,textSize,0,0,color);
    this.box = new Renderable();
    this.offset=textSize/5;
    this.lineOffset=textSize/10;
    this.width=this.mFontRenderable.getXform().getWidth()+this.lineOffset;
    this.mCallBack = callback;
    this.mContext = context;
    this.box.getXform().setPosition(40,30);
    this.box.getXform().setSize(this.width+this.offset,this.mFontRenderable.getXform().getHeight());
    this.box.setColor(boxColor);
    this.box.getXform().setZPos(3);
    this.mActive=false;
}

gEngine.Core.inheritPrototype(UIDDButton,UIText);

/**
 * Update the button
 * @param {type} aCamera The camera that's used to draw this button
 * @memberOf UIDDButton
 */
UIDDButton.prototype.update = function(aCamera){
    var xform = this.box.getXform();
    var b = new BoundingBox(xform.getPosition(), xform.getWidth(), xform.getHeight());
    
    var mousePos = vec2.fromValues(gEngine.Input.getMousePosX(),
                                gEngine.Input.getMousePosY());
    mousePos = aCamera.VPpixelPosToWC(mousePos);
    var mouseOver = b.containsPoint(mousePos[0], mousePos[1]);
    

    //start simple, just do callback when clicked
    if(gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Left)){
        if(mouseOver){
            this.mActive = true;
            if(this.mCallBack !== null)
                this.mCallBack.call(this.mContext);
        }
        else{
            this.mActive = false;
        }
    }
};

/**
 * Draws the button
 * @param {type} aCamera The camera to draw it on
 * @memberOf UIDDButton
 */
UIDDButton.prototype.draw = function(aCamera){
    if(this.mVisible) {
        this._applyUIXform(aCamera);
        this.box.draw(aCamera);
        this.mFontRenderable.draw(aCamera,0);
    }
};

/**
 * Changes the size and position to be compatible witht the camera
 * @param {Camera} aCamera The camera to adjust for
 * @memberOf UIDDButton
 */
UIDDButton.prototype._applyUIXform = function(aCamera) {
    var rendXform = this.getXform();
    var alignOff = this._getAlignmentOffset();  // takes allignment into consideration
    
    var WCPos = aCamera.VPpixelPosToWC(this.mUIXform.getPosition());
    rendXform.setPosition(WCPos[0] + alignOff[0], WCPos[1] + alignOff[1]+this.lineOffset);
    this.box.getXform().setPosition(WCPos[0] + (this.width)/2, WCPos[1] + alignOff[1]);
    
};

/**
 * Sets the width of the button
 * @param {type} w The new width
 * @memberOf UIDDButton
 */
UIDDButton.prototype.setWidth = function(w){
    this.width=w;
    this.box.getXform().setWidth(this.width+this.offset);
};

/**
 * Returns the width
 * @returns {float}
 * @memberOf UIDDButton
 */
UIDDButton.prototype.getWidth = function(){
    return this.width;
};

/**
 * Returns the position of the box renderable
 * @returns {Array[]}
 * @memberOf UIDDButton
 */
UIDDButton.prototype.getBoxPos = function(){
    return this.box.getXform().getPosition();
};

/**
 * Returns whether the button was clicked this update
 * @returns {Boolean}
 * @memberOf UIDDButton
 */
UIDDButton.prototype.getClick = function(){
    return this.mActive;
};

/**
 * Set the box renderable to a new color
 * @param {Array[]} color The new color
 * @memberOf UIDDButton
 */
UIDDButton.prototype.setBoxColor = function(color){
    this.box.setColor(color);
};

/**
 * Return the color of the box renderable
 * @returns {Array[]}
 * @memberOf UIDDButton
 */
UIDDButton.prototype.getBoxColor = function(){
    return this.box.getColor();
};