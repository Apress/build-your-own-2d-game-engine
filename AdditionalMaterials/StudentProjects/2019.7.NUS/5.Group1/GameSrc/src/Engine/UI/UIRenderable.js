/* File: UIRenderable
 *      Renderable class for UI          
 */
/**
 * Renderable for UI
 * @param {float[]} color The Color of the UIRenderable
 * @param {Array[]} position Base position for the UIRenderable
 * @param {Array[]} size The size for the UIRenderable
 * @class UITexture
 * @returns {UIRenderable}
 */
function UIRenderable(color, position, size) {
    this.mRenderable = new Renderable();
    this.mRenderable._setShader(gEngine.DefaultResources.getUnlitShader());
    this.mRenderable.setColor(color);
    this.mRenderable.getXform().setZPos(3);
    
    UIElement.call(this, position, size);
}
gEngine.Core.inheritPrototype(UIRenderable, UIElement);

/**
 * Draws the UIRenderable to a Camera
 * @param {Camera} aCamera The Camera to draw to
 * @memberOf UIRenderable
 */
UIRenderable.prototype.draw = function (aCamera) {
    this._applyUIXform(this.mRenderable, aCamera);
    this.mRenderable.draw(aCamera);
};


/**
 * Converts the pixel position to a WC position that the camera to use
 * @param {Renderable} renderable The renderable to apply the UIXform to
 * @param {Camera} aCamera The camera the the conversion will be based off of
 * @memberOf UIRenderable
 */
UIRenderable.prototype._applyUIXform = function(renderable, aCamera) {
    var camPos = aCamera.getWCCenter();
    var rendXform = renderable.getXform();
    var WCPos = aCamera.VPpixelPosToWC(this.mUIXform.getPosition());
    var WCSize = aCamera.VPpixelSizeVec2ToWC(this.mUIXform.getSize());
    rendXform.setPosition(WCPos[0], WCPos[1]);
    rendXform.setSize(WCSize[0], WCSize[1]);
};

/**
 * Sets the Color of the UIRenderable
 * @param {float[]} c The desired Color for the Renderable
 * @memberOf UIRenderable
 */
UIRenderable.prototype.setColor = function(c) {
    this.mRenderable.setColor(c);
};
