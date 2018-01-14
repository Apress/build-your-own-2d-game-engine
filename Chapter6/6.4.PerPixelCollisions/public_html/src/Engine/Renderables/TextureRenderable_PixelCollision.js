/* File: TextureRenderable_PixelCollision.js 
 *
 * Implements the pixelTouches() and related supporting functions of TextureRenderable
 */

/*jslint node: true, vars: true */
/*global gEngine, TextureRenderable, vec2 */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

TextureRenderable.prototype.pixelTouches = function(other, wcTouchPos) {
    var pixelTouch = false;
    var xIndex = 0, yIndex;
    var otherIndex = [0, 0];

    while ((!pixelTouch) && (xIndex < this.mTexWidth)) {
        yIndex = 0;
        while ((!pixelTouch) && (yIndex < this.mTexHeight)) {
            if (this._pixelAlphaValue(xIndex, yIndex) > 0) {
                this._indexToWCPosition(wcTouchPos, xIndex, yIndex);
                other._wcPositionToIndex(otherIndex, wcTouchPos);
                if ((otherIndex[0] > 0) && (otherIndex[0] < other.mTexWidth) &&
                    (otherIndex[1] > 0) && (otherIndex[1] < other.mTexHeight)) {
                    pixelTouch = other._pixelAlphaValue(otherIndex[0], otherIndex[1]) > 0;
                }
            }
            yIndex++;
        }
        xIndex++;
    }
    return pixelTouch;
};

TextureRenderable.prototype.setColorArray = function () {
    if (this.mColorArray === null) {
        this.mColorArray = gEngine.Textures.getColorArray(this.mTexture);
    }
};

TextureRenderable.prototype._pixelAlphaValue = function (x, y) {
    x = x * 4;
    y = y * 4;
    return this.mColorArray[(y * this.mTextureInfo.mWidth) + x  + 3];
};

TextureRenderable.prototype._wcPositionToIndex = function (returnIndex, wcPos) {
    // use wcPos to compute the corresponding returnIndex[0 and 1]
    var delta = [];
    vec2.sub(delta, wcPos, this.mXform.getPosition());
    returnIndex[0] = this.mTexWidth  * (delta[0] / this.mXform.getWidth());
    returnIndex[1] = this.mTexHeight * (delta[1] / this.mXform.getHeight());

    // recall that xForm.getPosition() returns center, yet
    // Texture origin is at lower-left corner!
    returnIndex[0] += this.mTexWidth / 2;
    returnIndex[1] += this.mTexHeight / 2;

    returnIndex[0] = Math.floor(returnIndex[0]);
    returnIndex[1] = Math.floor(returnIndex[1]);
};

TextureRenderable.prototype._indexToWCPosition = function (returnWCPos, i, j) {
    var x = i * this.mXform.getWidth() / this.mTexWidth;
    var y = j * this.mXform.getHeight() / this.mTexHeight;
    returnWCPos[0] = this.mXform.getXPos() + (x - (this.mXform.getWidth() * 0.5));
    returnWCPos[1] = this.mXform.getYPos() + (y - (this.mXform.getHeight() * 0.5));
};

//--- end of Public Methods
//</editor-fold>