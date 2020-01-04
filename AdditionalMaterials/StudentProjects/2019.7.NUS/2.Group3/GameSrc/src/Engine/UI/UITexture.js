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
    UIRenderable.call(this, [1, 1, 1, 0], position, size);
    this.mRenderable = new TextureRenderable(myTexture);
    this.mRenderable._setShader(gEngine.DefaultResources.getUnlitTextureShader());
    this.mRenderable.getXform().setZPos(3);
}
gEngine.Core.inheritPrototype(UITexture, UIRenderable);

/**
 * Sets the Texture of the UITexture
 * @param {String} tex The location of the desired Texture to be used
 * @memberOf UITexture
 */
UITexture.prototype.setTexture = function (tex) {
    this.mRenderable.setTexture(tex);
};
