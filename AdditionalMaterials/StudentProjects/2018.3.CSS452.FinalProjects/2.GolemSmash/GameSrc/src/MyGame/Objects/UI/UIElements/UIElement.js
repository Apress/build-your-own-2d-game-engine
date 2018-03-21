/* File: UIElement.js
 *      A GameObject that represents a single UI Element
 *      MUST be given a renderable from a child class to work
 */
"use strict";

function UIElement(renderable, position, size) {
    this.mVisible = true;
    //canvas transform
    this.mUIXform = new Transform();
    if(position !== null)
        this.mUIXform.setPosition(position[0], position[1]);
    if(size !== null)
        this.mUIXform.setSize(size[0], size[1]);
    
    this.mRenderable = renderable;
    this.mRenderable.getXform().setZPos(3);
    GameObject.call(this, this.mRenderable);
};
gEngine.Core.inheritPrototype(UIElement, GameObject);

UIElement.prototype.getUIXform = function() {
    return this.mUIXform;
};

UIElement.prototype.getUIBBox = function () {
    var xform = this.getUIXform();
    var b = new BoundingBox(xform.getPosition(), xform.getWidth(), xform.getHeight());
    return b;
};

UIElement.prototype.draw = function(aCamera) {
    if(this.mVisible) {
        this._applyUIXform(aCamera);
        GameObject.prototype.draw.call(this, aCamera);
    }
};

UIElement.prototype._applyUIXform = function(aCamera) {
    var camPos = aCamera.getWCCenter();
    var rendXform = this.getXform();
    var WCPos = aCamera.VPpixelPosToWC(this.mUIXform.getPosition());
    var WCSize = aCamera.VPpixelSizeVec2ToWC(this.mUIXform.getSize());
    rendXform.setPosition(WCPos[0], WCPos[1]);
    rendXform.setSize(WCSize[0], WCSize[1]);
};

UIElement.prototype.update = function() {
    GameObject.prototype.update.call(this);
};

UIElement.prototype.setVisible = function(visible) {
    this.mVisible = visible;
};