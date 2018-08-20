/* File: SpriteRenderable_PixelCollision.js 
 *
 * implements the _setTexInfo() function to support per-pixel collision for 
 * sprite elements
 */

/*jslint node: true, vars: true */
/*global gEngine, SpriteRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

/**
 * implements the _setTexInfo() function to support per-pixel collision for sprite elements
 * @memberOf SpriteRenderable
 * @returns {void}
 */
SpriteRenderable.prototype._setTexInfo = function () {
    var imageW = this.mTextureInfo.mWidth;
    var imageH = this.mTextureInfo.mHeight;

    this.mTexLeftIndex = this.mTexLeft * imageW;
    this.mTexBottomIndex = this.mTexBottom * imageH;

    this.mTexWidth = ((this.mTexRight - this.mTexLeft) * imageW) + 1;
    this.mTexHeight = ((this.mTexTop - this.mTexBottom) * imageH) + 1;
};
//--- end of Public Methods
//
//</editor-fold>