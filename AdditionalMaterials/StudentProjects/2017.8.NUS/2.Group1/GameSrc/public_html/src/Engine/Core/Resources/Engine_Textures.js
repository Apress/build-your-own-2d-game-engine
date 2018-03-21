/*
 * File: EngineCore_Texture.js 
 * Provides support for loading and unloading of textures (images)
 */

/*jslint node: true, vars: true */
/*global Image */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

var gEngine = gEngine || { };

function TextureInfo(name, w, h, id) {
    this.mName = name;
    this.mWidth = w;
    this.mHeight = h;
    this.mGLTexID = id;
}

gEngine.Textures = (function () {
    /*
     * This converts an image to the webGL texture format. 
     * This should only be called once the texture is loaded.
     */
    var _processLoadedImage = function (textureName, image) {
        var gl = gEngine.Core.getGL();

        // Generate a texture reference to the webGL context
        var textureID = gl.createTexture();

        // bind the texture reference with the current texture functionality in the webGL
        gl.bindTexture(gl.TEXTURE_2D, textureID);

        // Load the texture into the texture data structure with descriptive info.
        // Parameters:
        //  1: Which "binding point" or target the texture is being loaded to.
        //  2: Level of detail. Used for mipmapping. 0 is base texture level.
        //  3: Internal format. The composition of each element. i.e. pixels.
        //  4: Format of texel data. Must match internal format.
        //  5: The data type of the texel data.
        //  6: Texture Data.
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

        // Creates a mipmap for this texture.
        gl.generateMipmap(gl.TEXTURE_2D);

        // Tells WebGL that we are done manipulating data at the mGL.TEXTURE_2D target.
        gl.bindTexture(gl.TEXTURE_2D, null);

        var texInfo = new TextureInfo(textureName, image.naturalWidth, image.naturalHeight, textureID);
        gEngine.ResourceMap.asyncLoadCompleted(textureName, texInfo);
    };

    // Loads an texture so that it can be drawn.
    // If already in the map, will do nothing.
    var loadTexture = function (textureName) {
        if (!(gEngine.ResourceMap.isAssetLoaded(textureName))) {
            // Create new Texture object.
            var img = new Image();

            // Update resources in loading counter.
            gEngine.ResourceMap.asyncLoadRequested(textureName);

            // When the texture loads, convert it to the WebGL format then put
            // it back into the mTextureMap.
            img.onload = function () {
                _processLoadedImage(textureName, img);
            };
            img.src = textureName;
        } else {
            gEngine.ResourceMap.incAssetRefCount(textureName);
        }
    };

    // Remove the reference to allow associated memory 
    // be available for subsequent garbage collection
    var unloadTexture = function (textureName) {
        var gl = gEngine.Core.getGL();
        var texInfo = gEngine.ResourceMap.retrieveAsset(textureName);
        gl.deleteTexture(texInfo.mGLTexID);
        gEngine.ResourceMap.unloadAsset(textureName);
    };

    var activateTexture = function (textureName) {
        var gl = gEngine.Core.getGL();
        var texInfo = gEngine.ResourceMap.retrieveAsset(textureName);

        // Binds our texture reference to the current webGL texture functionality
        gl.bindTexture(gl.TEXTURE_2D, texInfo.mGLTexID);
        
        // To prevent texture wrappings
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

        // Handles how magnification and minimization filters will work.
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);

        // For pixel-graphics where you want the texture to look "sharp" do the following:
        // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    };

    var deactivateTexture = function () {
        var gl = gEngine.Core.getGL();
        gl.bindTexture(gl.TEXTURE_2D, null);
    };

    var getTextureInfo = function (textureName) {
        return gEngine.ResourceMap.retrieveAsset(textureName);
    };
    // Public interface for this object. Anything not in here will
    // not be accessable.
    var mPublic = {
        loadTexture: loadTexture,
        unloadTexture: unloadTexture,
        activateTexture: activateTexture,
        deactivateTexture: deactivateTexture,
        getTextureInfo: getTextureInfo
    };
    return mPublic;
}());