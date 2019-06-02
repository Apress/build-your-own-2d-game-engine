/* File: UIElement.js
 *      A GameObject that represents a single UI Element
 *      MUST be given a renderable from a child class to work
 */
"use strict";
/**
 * Parent class for all UI Objects
 * @class UIElement
 * @param {Texture} renderable The renderable for the UI Object
 * @param {Array[]} position The pixel position of the element
 * @param {Array[]} size It's size
 * @returns {UIElement}
 */
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

/**
 * Get the Transform of the Element
 * @memberOf UIElement
 * @returns {Transform} The Transform of the element
 */
UIElement.prototype.getUIXform = function() {
    return this.mUIXform;
};

/**
 * Get the BoundingBox of the element
 * @memberOf UIElement
 * @returns {BoundingBox} The BoundingBox of the element
 */
UIElement.prototype.getUIBBox = function () {
    var xform = this.getUIXform();
    var b = new BoundingBox(xform.getPosition(), xform.getWidth(), xform.getHeight());
    return b;
};

/**
 * Draws the UIElement to the camera
 * @param {Camera} aCamera the camera that the element will be drawed to.
 * @memberOf UIElement
 */
UIElement.prototype.draw = function(aCamera) {
    if(this.mVisible) {
        this._applyUIXform(aCamera);
        GameObject.prototype.draw.call(this, aCamera);
    }
};

/**
 * Converts the pixel position to a WC position that the camera to use
 * @param {Camera} aCamera The camera the the conversion will be based off of
 * @memberOf UIElement
 */
UIElement.prototype._applyUIXform = function(aCamera) {
    var camPos = aCamera.getWCCenter();
    var rendXform = this.getXform();
    var WCPos = aCamera.VPpixelPosToWC(this.mUIXform.getPosition());
    var WCSize = aCamera.VPpixelSizeVec2ToWC(this.mUIXform.getSize());
    rendXform.setPosition(WCPos[0], WCPos[1]);
    rendXform.setSize(WCSize[0], WCSize[1]);
};

/**
 * Updates the element
 * @memberOf UIElement
 */
UIElement.prototype.update = function() {
    GameObject.prototype.update.call(this);
};

/**
 * Set's whether the shape will be visible or not
 * @param {boolean} visible What the visibility will be set to
 * @memberOf UIElement
 */
UIElement.prototype.setVisible = function(visible) {
    this.mVisible = visible;
};