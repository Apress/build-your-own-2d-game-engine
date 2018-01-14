/*
 * File: EngineCore_Fonts.js 
 * Provides support for loading and unloading of font image and font description
 */

/*jslint node: true, vars: true, evil: true */
/*global gEngine: false, XMLHttpRequest: false, DOMParser: false, alert: false, XPathResult: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

var gEngine = gEngine || { };

// for convenenit communication of per-character information
// all size returned are in normalize unit (range between 0 to 1)
function CharacterInfo() {
  // in texture coordinate (0 to 1) maps to the entire image
    this.mTexCoordLeft = 0;
    this.mTexCoordRight = 1;
    this.mTexCoordBottom = 0;
    this.mTexCoordTop = 0;

    // reference to nominal character size, 1 is "standard width/height" of a char
    this.mCharWidth = 1;
    this.mCharHeight = 1;
    this.mCharWidthOffset = 0;
    this.mCharHeightOffset = 0;

    // reference of char width/height ratio
    this.mCharAspectRatio = 1;
}

// Note: font name is the path to the fnt file. (without the fnt extension!)
//    You must also provide the image file in the exact same folder
//    with the exact same name, with ".png" extension.
gEngine.Fonts = (function () {
    var _storeLoadedFont = function (fontInfoSourceString) {
        var fontName = fontInfoSourceString.slice(0, -4);  // trims the .fnt extension
        var fontInfo = gEngine.ResourceMap.retrieveAsset(fontInfoSourceString);
        fontInfo.FontImage = fontName + ".png";
        gEngine.ResourceMap.asyncLoadCompleted(fontName, fontInfo); // to store the actual font info
    };

    var loadFont = function (fontName) {
        if (!(gEngine.ResourceMap.isAssetLoaded(fontName))) {
            var fontInfoSourceString = fontName + ".fnt";
            var textureSourceString = fontName + ".png";

            gEngine.ResourceMap.asyncLoadRequested(fontName); // to register an entry in the map

            gEngine.Textures.loadTexture(textureSourceString);
            gEngine.TextFileLoader.loadTextFile(fontInfoSourceString,
                            gEngine.TextFileLoader.eTextFileType.eXMLFile, _storeLoadedFont);
        } else {
            gEngine.ResourceMap.incAssetRefCount(fontName);
        }
    };

    // Remove the reference to allow associated memory 
    // be available for subsequent garbage collection
    var unloadFont = function (fontName) {
        gEngine.ResourceMap.unloadAsset(fontName);
        if (!(gEngine.ResourceMap.isAssetLoaded(fontName))) {
            var fontInfoSourceString = fontName + ".fnt";
            var textureSourceString = fontName + ".png";

            gEngine.Textures.unloadTexture(textureSourceString);
            gEngine.TextFileLoader.unloadTextFile(fontInfoSourceString);
        }
    };

    var getCharInfo = function (fontName, aChar) {
        var returnInfo = null;
        var fontInfo = gEngine.ResourceMap.retrieveAsset(fontName);
        var commonPath = "font/common";
        var commonInfo = fontInfo.evaluate(commonPath, fontInfo, null, XPathResult.ANY_TYPE, null);
        commonInfo = commonInfo.iterateNext();
        if (commonInfo === null) {
            return returnInfo;
        }
        var charHeight = commonInfo.getAttribute("base");

        var charPath = "font/chars/char[@id=" + aChar + "]";
        var charInfo = fontInfo.evaluate(charPath, fontInfo, null, XPathResult.ANY_TYPE, null);
        charInfo = charInfo.iterateNext();

        if (charInfo === null) {
            return returnInfo;
        }

        returnInfo = new CharacterInfo();
        var texInfo = gEngine.Textures.getTextureInfo(fontInfo.FontImage);
        var leftPixel = Number(charInfo.getAttribute("x"));
        var rightPixel = leftPixel + Number(charInfo.getAttribute("width")) - 1;
        var topPixel = (texInfo.mHeight - 1) - Number(charInfo.getAttribute("y"));
        var bottomPixel = topPixel - Number(charInfo.getAttribute("height")) + 1;

        // texture coordinate information
        returnInfo.mTexCoordLeft = leftPixel / (texInfo.mWidth - 1);
        returnInfo.mTexCoordTop = topPixel / (texInfo.mHeight - 1);
        returnInfo.mTexCoordRight = rightPixel / (texInfo.mWidth - 1);
        returnInfo.mTexCoordBottom = bottomPixel / (texInfo.mHeight - 1);

        // relative character size
        var charWidth = charInfo.getAttribute("xadvance");
        returnInfo.mCharWidth = charInfo.getAttribute("width") / charWidth;
        returnInfo.mCharHeight = charInfo.getAttribute("height") / charHeight;
        returnInfo.mCharWidthOffset = charInfo.getAttribute("xoffset") / charWidth;
        returnInfo.mCharHeightOffset = charInfo.getAttribute("yoffset") / charHeight;
        returnInfo.mCharAspectRatio = charWidth / charHeight;

        return returnInfo;
    };

    // Public interface for this object. Anything not in here will
    // not be accessable.
    var mPublic = {
        loadFont: loadFont,
        unloadFont: unloadFont,
        getCharInfo: getCharInfo
    };
    return mPublic;
}());