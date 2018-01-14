/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine: false, Scene: false, SpriteRenderable: false, Camera: false, vec2: false,
  TextureRenderable: false, Renderable: false, SpriteAnimateRenderable: false, GameOver: false,
  FontRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyGame() {
    // textures: 
    this.kFontImage = "assets/Consolas-72.png";
    this.kMinionSprite = "assets/minion_sprite.png";

    // the fonts
    this.kFontCon16 = "assets/fonts/Consolas-16";  // notice font names do not need extensions!
    this.kFontCon24 = "assets/fonts/Consolas-24";
    this.kFontCon32 = "assets/fonts/Consolas-32";  // this is also the default system font
    this.kFontCon72 = "assets/fonts/Consolas-72";
    this.kFontSeg96 = "assets/fonts/Segment7-96";

    // The camera to view the scene
    this.mCamera = null;

    // the hero and the support objects
    this.mHero = null;
    this.mFontImage = null;
    this.mMinion = null;

    this.mTextSysFont = null;
    this.mTextCon16 = null;
    this.mTextCon24 = null;
    this.mTextCon32 = null;
    this.mTextCon72 = null;
    this.mTextSeg96 = null;

    this.mTextToWork = null;
}
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () {
    // Step A: loads the textures    
    gEngine.Textures.loadTexture(this.kFontImage);
    gEngine.Textures.loadTexture(this.kMinionSprite);

    // Step B: loads all the fonts
    gEngine.Fonts.loadFont(this.kFontCon16);
    gEngine.Fonts.loadFont(this.kFontCon24);
    gEngine.Fonts.loadFont(this.kFontCon32);
    gEngine.Fonts.loadFont(this.kFontCon72);
    gEngine.Fonts.loadFont(this.kFontSeg96);
};

MyGame.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kFontImage);
    gEngine.Textures.unloadTexture(this.kMinionSprite);

    // unload the fonts
    gEngine.Fonts.unloadFont(this.kFontCon16);
    gEngine.Fonts.unloadFont(this.kFontCon24);
    gEngine.Fonts.unloadFont(this.kFontCon32);
    gEngine.Fonts.unloadFont(this.kFontCon72);
    gEngine.Fonts.unloadFont(this.kFontSeg96);

    // Step B: starts the next level
    var nextLevel = new GameOver();  // next level to be loaded
    gEngine.Core.startScene(nextLevel);
};

MyGame.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 33),   // position of the camera
        100,                       // width of camera
        [0, 0, 600, 400]           // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
            // sets the background to gray

    // Step B: Create the font and minion images using sprite
    this.mFontImage = new SpriteRenderable(this.kFontImage);
    this.mFontImage.setColor([1, 1, 1, 0]);
    this.mFontImage.getXform().setPosition(15, 50);
    this.mFontImage.getXform().setSize(20, 20);

    // The right minion
    this.mMinion = new SpriteAnimateRenderable(this.kMinionSprite);
    this.mMinion.setColor([1, 1, 1, 0]);
    this.mMinion.getXform().setPosition(15, 25);
    this.mMinion.getXform().setSize(24, 19.2);
    this.mMinion.setSpriteSequence(512, 0,     // first element pixel position: top-left 512 is top of image, 0 is left of image
                                    204, 164,    // widthxheight in pixels
                                    5,          // number of elements in this sequence
                                    0);         // horizontal padding in between
    this.mMinion.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
    this.mMinion.setAnimationSpeed(15);
                                // show each element for mAnimSpeed updates

    // Step D: Create the hero object with texture from the lower-left corner 
    this.mHero = new SpriteRenderable(this.kMinionSprite);
    this.mHero.setColor([1, 1, 1, 0]);
    this.mHero.getXform().setPosition(35, 50);
    this.mHero.getXform().setSize(12, 18);
    this.mHero.setElementPixelPositions(0, 120, 0, 180);

    //<editor-fold desc="Create the fonts!">
    this.mTextSysFont = new FontRenderable("System Font: in Red");
    this._initText(this.mTextSysFont, 50, 60, [1, 0, 0, 1], 3);

    this.mTextCon16 = new FontRenderable("Consolas 16: in black");
    this.mTextCon16.setFont(this.kFontCon16);
    this._initText(this.mTextCon16, 50, 55, [0, 0, 0, 1], 2);

    this.mTextCon24 = new FontRenderable("Consolas 24: in black");
    this.mTextCon24.setFont(this.kFontCon24);
    this._initText(this.mTextCon24, 50, 50, [0, 0, 0, 1], 3);

    this.mTextCon32 = new FontRenderable("Consolas 32: in white");
    this.mTextCon32.setFont(this.kFontCon32);
    this._initText(this.mTextCon32, 40, 40, [1, 1, 1, 1], 4);

    this.mTextCon72 = new FontRenderable("Consolas 72: in blue");
    this.mTextCon72.setFont(this.kFontCon72);
    this._initText(this.mTextCon72, 30, 30, [0, 0, 1, 1], 6);

    this.mTextSeg96  = new FontRenderable("Segment7-92");
    this.mTextSeg96.setFont(this.kFontSeg96);
    this._initText(this.mTextSeg96, 30, 15, [1, 1, 0, 1], 7);
    //</editor-fold>

    this.mTextToWork = this.mTextCon16;
};

MyGame.prototype._initText = function (font, posX, posY, color, textH) {
    font.setColor(color);
    font.getXform().setPosition(posX, posY);
    font.setTextHeight(textH);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    // Step  B: Activate the drawing Camera
    this.mCamera.setupViewProjection();

    // Step  C: Draw everything
    this.mHero.draw(this.mCamera.getVPMatrix());
    this.mFontImage.draw(this.mCamera.getVPMatrix());
    this.mMinion.draw(this.mCamera.getVPMatrix());

    // drawing the text output
    this.mTextSysFont.draw(this.mCamera.getVPMatrix());
    this.mTextCon16.draw(this.mCamera.getVPMatrix());
    this.mTextCon24.draw(this.mCamera.getVPMatrix());
    this.mTextCon32.draw(this.mCamera.getVPMatrix());
    this.mTextCon72.draw(this.mCamera.getVPMatrix());
    this.mTextSeg96.draw(this.mCamera.getVPMatrix());
};

// The 
//  function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame.prototype.update = function () {
    // let's only allow the movement of hero, 
    // and if hero moves too far off, this level ends, we will
    // load the next level
    var deltaX = 0.5;
    var xform = this.mHero.getXform();

    // Support hero movements
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
        xform.incXPosBy(deltaX);
        if (xform.getXPos() > 100) { // this is the right-bound of the window
            xform.setPosition(0, 50);
        }
    }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)) {
        xform.incXPosBy(-deltaX);
        if (xform.getXPos() < 0) {  // this is the left-bound of the window
            gEngine.GameLoop.stop();
        }
    }

    // New update code for changing the sub-texture regions being shown"
    var deltaT = 0.001;

    // <editor-fold desc="The font image:">
    // zoom into the texture by updating texture coordinate
    // For font: zoom to the upper left corner by changing bottom right
    var texCoord = this.mFontImage.getElementUVCoordinateArray();
            // The 8 elements:
            //      mTexRight,  mTexTop,          // x,y of top-right
            //      mTexLeft,   mTexTop,
            //      mTexRight,  mTexBottom,
            //      mTexLeft,   mTexBottom
    var b = texCoord[SpriteRenderable.eTexCoordArray.eBottom] + deltaT;
    var r = texCoord[SpriteRenderable.eTexCoordArray.eRight] - deltaT;
    if (b > 1.0) {
        b = 0;
    }
    if (r < 0) {
        r = 1.0;
    }
    this.mFontImage.setElementUVCoordinate(
        texCoord[SpriteRenderable.eTexCoordArray.eLeft],
        r,
        b,
        texCoord[SpriteRenderable.eTexCoordArray.eTop]
    );
    // </editor-fold>

    // remember to update this.mMinion's animation
    this.mMinion.updateAnimation();

    // interactive control of the display size

    // choose which text to work on
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Zero)) {
        this.mTextToWork = this.mTextCon16;
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.One)) {
        this.mTextToWork = this.mTextCon24;
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Three)) {
        this.mTextToWork = this.mTextCon32;
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Four)) {
        this.mTextToWork = this.mTextCon72;
    }

    var deltaF = 0.005;
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Up)) {
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.X)) {
            this.mTextToWork.getXform().incWidthBy(deltaF);
        }
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Y)) {
            this.mTextToWork.getXform().incHeightBy(deltaF);
        }
        this.mTextSysFont.setText(this.mTextToWork.getXform().getWidth().toFixed(2) + "x" + this.mTextToWork.getXform().getHeight().toFixed(2));
    }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Down)) {
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.X)) {
            this.mTextToWork.getXform().incWidthBy(-deltaF);
        }
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Y)) {
            this.mTextToWork.getXform().incHeightBy(-deltaF);
        }
        this.mTextSysFont.setText(this.mTextToWork.getXform().getWidth().toFixed(2) + "x" + this.mTextToWork.getXform().getHeight().toFixed(2));
    }
};