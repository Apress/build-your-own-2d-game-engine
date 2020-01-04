/* File: UIElement.js
 * 
 */
"use strict";
/**
 * Parent class for all UI Objects
 * @class UIElement
 * @param {Array[]} position The pixel position of the element
 * @param {Array[]} size Its size
 * @returns {UIElement}
 */
function UIElement(position, size) {
    this.mVisible = true;
    //canvas transform
    this.mUIXform = new Transform();
    if(position !== null)
        this.mUIXform.setPosition(position[0], position[1]);
    if(size !== null)
        this.mUIXform.setSize(size[0], size[1]);
};

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
    // override in children classes
};

/**
 * Updates the element
 * @memberOf UIElement
 */
UIElement.prototype.update = function() {
    // override in children classes
};

/**
 * Set's whether the shape will be visible or not
 * @param {boolean} visible What the visibility will be set to
 * @memberOf UIElement
 */
UIElement.prototype.setVisible = function(visible) {
    this.mVisible = visible;
};