/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * An altered FontRenderable that allows for partially printed characters
 * @param {String} aString the string to print
 * @returns {UITextBoxFont}
 * @class UITextBoxFont
 */
function UITextBoxFont(aString){
    FontRenderable.call(this, aString);
}

gEngine.Core.inheritPrototype(UITextBoxFont, FontRenderable);

/**
 * Draws the string from a starting position within a string to it's ending point
 * @param {type} aCamera The camera that the string will be drawn on
 * @param {type} startPos How far into the string to start drawing
 * @memberOf UITextBoxFont
 */
UITextBoxFont.prototype.draw = function(aCamera, startPos){
    // we will draw the text string by calling to mOneChar for each of the
    // chars in the mText string.
    var widthOfOneChar = this.mXform.getWidth() / this.mText.length;
    var heightOfOneChar = this.mXform.getHeight();
    // this.mOneChar.getXform().setRotationInRad(this.mXform.getRotationInRad());
    var yPos = this.mXform.getYPos();
    var start;
    start=startPos/widthOfOneChar;
    var value = (startPos%widthOfOneChar)/widthOfOneChar;
    //widthOfOneChar = widthOfOneChar*start;
    // center position of the first char
    var xPos = this.mXform.getXPos() - (widthOfOneChar / 2) + (widthOfOneChar * 0.5);
    var charIndex, aChar, charInfo, xSize, ySize, xOffset, yOffset;
    for (charIndex = start; charIndex < this.mText.length; charIndex++) {
        aChar = this.mText.charCodeAt(charIndex);
        charInfo = gEngine.Fonts.getCharInfo(this.mFont, aChar);

        // set the texture coordinate
        this.mOneChar.setElementUVCoordinate(charInfo.mTexCoordLeft, charInfo.mTexCoordRight,
            charInfo.mTexCoordBottom, charInfo.mTexCoordTop);
        if(charIndex===start&&value!==0){
            var split = charInfo.mTexCoordRight-charInfo.mTexCoordLeft;
            this.mOneChar.setElementUVCoordinate(charInfo.mTexCoordLeft+(split*value), charInfo.mTexCoordRight,
            charInfo.mTexCoordBottom, charInfo.mTexCoordTop);
        }

        // now the size of the char
        xSize = widthOfOneChar * charInfo.mCharWidth;
        ySize = heightOfOneChar * charInfo.mCharHeight;
        if(charIndex===start&&value!==0){xSize = widthOfOneChar * charInfo.mCharWidth*(1-value);}
        this.mOneChar.getXform().setSize(xSize, ySize);

        // how much to offset from the center
        xOffset = widthOfOneChar * charInfo.mCharWidthOffset * 0.5;
        yOffset = heightOfOneChar * charInfo.mCharHeightOffset * 0.5;
        if(charIndex===start&&value!==0){xOffset = widthOfOneChar * charInfo.mCharWidthOffset * 0.5-(value);}
        if(charIndex===start&&value!==0){xPos=this.mXform.getXPos() - (widthOfOneChar / 2) + (widthOfOneChar * 0.5)-((widthOfOneChar/2)*value);}
        this.mOneChar.getXform().setPosition(xPos - xOffset, yPos - yOffset);
        // allows for zPos to affect FontRenderables
        this.mOneChar.getXform().setZPos(this.mXform.getZPos());
        this.mOneChar.draw(aCamera);
        xPos += widthOfOneChar;
        widthOfOneChar = this.mXform.getWidth() / this.mText.length;
    }
};