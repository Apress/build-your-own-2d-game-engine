/*
 * File: FontRenderable.js 
 */

/*jslint node: true, vars: true */
/*global gEngine: false, Transform: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

// Constructor and object definition
"use strict";  // Operate in Strict mode such that variables must be declared before used!

/**
 * Default Constructor.<p>
 * Default Constructor creates an instance of FontRenderable.
 * @class FontRenderable
 * @param {String} aString - text to display
 * @returns {FontRenderable} a new instance of FontRenderable.
 */
function FontRenderable(aString) {
    this.mFont = gEngine.DefaultResources.getDefaultFont();
    this.mOneChar = new SpriteRenderable(this.mFont + ".png");
    this.mXform = new Transform(); // transform that moves this object around
    this.mText = aString;
}

//<editor-fold desc="Public Methods">
//**-----------------------------------------
// Public methods
//**-----------------------------------------
/**
 * Draws the FontRenderable to the screen in the aCamera viewport.
 * @memberOf FontRenderable
 * @param {Camera} aCamera - Camera object to draw to.
 * @returns {void}
 */
FontRenderable.prototype.draw = function (aCamera) {
    // we will draw the text string by calling to mOneChar for each of the
    // chars in the mText string.
    var charSize = this.mXform.getHeight();
    // this.mOneChar.getXform().setRotationInRad(this.mXform.getRotationInRad());
    var yPos = this.mXform.getYPos();

    // center position of the first char
    var xPos = this.mXform.getXPos(); 
    var charIndex, aChar, charInfo, xSize, ySize, xOffset, yOffset;
    for (charIndex = 0; charIndex < this.mText.length; charIndex++) {
        aChar = this.mText.charCodeAt(charIndex);
        charInfo = gEngine.Fonts.getCharInfo(this.mFont, aChar);
        
        // set the texture coordinate
        this.mOneChar.setElementUVCoordinate(charInfo.mTexCoordLeft, charInfo.mTexCoordRight,
            charInfo.mTexCoordBottom, charInfo.mTexCoordTop);

        // now the size of the char
        var charWidth = charSize * charInfo.mCharWidth;
        xSize = charWidth;
        ySize = charSize * charInfo.mCharHeight;
        this.mOneChar.getXform().setSize(xSize, ySize);

        // how much to offset from the center
        xOffset = 0.5 * charWidth * charInfo.mCharWidthOffset;
        yOffset = 0.5 * charSize * charInfo.mCharHeightOffset;

        if (charIndex !== 0) {
            xPos += 0.5 * charWidth * charInfo.mXAdvance;
        }
        
        this.mOneChar.getXform().setPosition(xPos + xOffset, yPos - yOffset);
        // allows for zPos to affect FontRenderables
        this.mOneChar.getXform().setZPos(this.mXform.getZPos());
        this.mOneChar.draw(aCamera);

        // Advance to the middle of this char
        xPos += 0.5 * charWidth * charInfo.mXAdvance;
    }
};

/**
 * Returns the Renderable's Transform.
 * @memberOf FontRenderable
 * @returns {Transform} the return of the Renderable.
 */
FontRenderable.prototype.getXform = function () { return this.mXform; };

/**
 * Returns the text of the FontRenderable.
 * @memberOf FontRenderable
 * @returns {String} text of the FontRenderable.
 */
FontRenderable.prototype.getText = function () { return this.mText; };

/**
 * Set the text of the FontRenderable.
 * @memberOf FontRenderable
 * @param {String} t - text to set to the FontRenderable.
 * @returns {void}
 */
FontRenderable.prototype.setText = function (t) {
    this.mText = t;
    this.setTextHeight(this.getXform().getHeight());
};

/**
 * Set the Text Height of the FontRenderable.
 * @memberOf FontRenderable
 * @param {float} h - height of the Renderable.
 * @returns {void}
 */
FontRenderable.prototype.setTextHeight = function (h) {
    this.getXform().setSize(this.getStringWidth(h), h);
};

/**
 * Get the size of a symbol in the FontRenderable
 * @memberof FontRenderable
 * @returns {vec2} The size of one symbol
 */
FontRenderable.prototype.getSymbolSize = function() {
  var size = this.getXform().getSize();
  return vec2.fromValues(size[0] / this.mText.length, size[1]);
};

FontRenderable.prototype.getWidth = function() {
  var size = this.getXform().getSize();
  return size[0];
};

/**
 * Returns the FontRenderable's Font
 * @memberOf FontRenderable
 * @returns {String} the Font of the FontRenderable.
 */
FontRenderable.prototype.getFont = function () { return this.mFont; };

/**
 * Sets the Font of the FontRenderable.
 * @memberOf FontRenderable
 * @param {Font} f - font of the FontRenderable.
 * @returns {void}
 */
FontRenderable.prototype.setFont = function (f) {
    this.mFont = f;
    this.mOneChar.setTexture(this.mFont + ".png");
};

/**
 * Sets the Color of the FontRenderable.
 * @memberOf FontRenderable
 * @param {float[]} color The desired Color of the FontRenderable.
 * @returns {void}
 */
FontRenderable.prototype.setColor = function (c) { this.mOneChar.setColor(c); };

/**
 * Gets the Color of the FontRenderable.
 * @memberOf FontRenderable
 * @returns {float[]} The color of the FontRenderable.
 */
FontRenderable.prototype.getColor = function () { return this.mOneChar.getColor(); };

/**
 * Update function called on Gameloop
 * @memberOf FontRenderable
 * @returns {void}
 */
FontRenderable.prototype.update = function () {};

FontRenderable.prototype.getStringWidth = function (h) {
    var stringWidth = 0;
    var charSize = h;
    var charIndex, aChar, charInfo;
    for (charIndex = 0; charIndex < this.mText.length; charIndex++) {
        aChar = this.mText.charCodeAt(charIndex);
        charInfo = gEngine.Fonts.getCharInfo(this.mFont, aChar);
        stringWidth += charSize * charInfo.mCharWidth * charInfo.mXAdvance;
    }
    return stringWidth;
};

//--- end of Public Methods
//</editor-fold>