/* File: UITexture
 *      a plain textured UI Element
 */
/**
 * Texture for UI
 * @param {texture} myTexture Texture for the UITexture
 * @param {Array[]} position Base position for the UITexture
 * @param {Array[]} size The size for the UITexture
 * @class UITexture
 * @returns {UITexture}
 */
function UITexture(myTexture, position, size) {
    this.mTex = new TextureRenderable(myTexture);
    this.mTex._setShader(gEngine.DefaultResources.getUnlitTextureShader());
    this.mTex.getXform().setZPos(3);
    UIRenderable.call(this, [1, 1, 1, 0], position, size);
}
gEngine.Core.inheritPrototype(UITexture, UIRenderable);

/**
 * Draws the Texture to the given Camera
 * @param {Camera} aCamera The Camera to which the Texture is to be drawn
 * @memberOf UITexture
 */
UITexture.prototype.draw = function (aCamera) {
    this._applyUIXform(this.mTex, aCamera);
    this.mTex.draw(aCamera);
};

/**
 * Sets the Texture of the UITexture
 * @param {String} tex The location of the desired Texture to be used
 * @memberOf UITexture
 */
UITexture.prototype.setTexture = function (tex) {
    this.mTex.setTexture(tex);
};

/**
 * Sets the Color of the UITexture
 * @param {float[]} c The desired color to tint the Texture
 * @memberOf UITexture
 */
UITexture.prototype.setColor = function (c) {
    this.mTex.setColor(c);
};
