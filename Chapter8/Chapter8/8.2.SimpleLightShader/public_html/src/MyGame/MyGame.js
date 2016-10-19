/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  Renderable, FontRenderable, SpriteRenderable, LightRenderable,
  GameObject, Hero, Minion, Dye, Light */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyGame() {
    this.kMinionSprite = "assets/minion_sprite.png";
    this.kBg = "assets/bg.png";

    // The camera to view the scene
    this.mCamera = null;
    this.mBg = null;

    this.mMsg = null;

    // the hero and the support objects
    this.mHero = null;
    this.mLMinion = null;
    this.mRMinion = null;

    this.mTheLight = null;

    this.mBlock1 = null;   // to verify swiitching between shaders is fine
    this.mBlock2 = null;
}
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kMinionSprite);
    gEngine.Textures.loadTexture(this.kBg);
};

MyGame.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kMinionSprite);
    gEngine.Textures.unloadTexture(this.kBg);
};

MyGame.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 37.5), // position of the camera
        100,                       // width of camera
        [0, 0, 640, 480]           // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
            // sets the background to gray

    // the light
    this.mTheLight = new Light();
    this.mTheLight.setRadius(8);
    this.mTheLight.setZPos(2);
    this.mTheLight.setXPos(30);
    this.mTheLight.setYPos(30);  // Position above LMinion
    this.mTheLight.setColor([0.9, 0.9, 0.2, 1]);

    // the Background
    var bgR = new LightRenderable(this.kBg);
    bgR.setElementPixelPositions(0, 1024, 0, 1024);
    bgR.getXform().setSize(100, 100);
    bgR.getXform().setPosition(50, 35);
    bgR.addLight(this.mTheLight);
    this.mBg = new GameObject(bgR);

    // 
    // the objects
    this.mHero = new Hero(this.kMinionSprite);
    this.mHero.getRenderable().addLight(this.mTheLight);

    this.mLMinion = new Minion(this.kMinionSprite, 30, 30);
    this.mLMinion.getRenderable().addLight(this.mTheLight);

    this.mRMinion = new Minion(this.kMinionSprite, 70, 30);
    // RMinion did not addAdd and thus does not get illuminated by the light!

    this.mMsg = new FontRenderable("Status Message");
    this.mMsg.setColor([1, 1, 1, 1]);
    this.mMsg.getXform().setPosition(1, 2);
    this.mMsg.setTextHeight(3);

    this.mBlock1 = new Renderable();
    this.mBlock1.setColor([1, 0, 0, 1]);
    this.mBlock1.getXform().setSize(5, 5);
    this.mBlock1.getXform().setPosition(30, 50);

    this.mBlock2 = new Renderable();
    this.mBlock2.setColor([0, 1, 0, 1]);
    this.mBlock2.getXform().setSize(5, 5);
    this.mBlock2.getXform().setPosition(70, 50);
};


MyGame.prototype.drawCamera = function (camera) {
    // Step A: set up the View Projection matrix
    camera.setupViewProjection();

    // Step B: Now draws each Renderable
    this.mBg.draw(camera);
    this.mBlock1.draw(camera);
    this.mLMinion.draw(camera);
    this.mRMinion.draw(camera);
    this.mBlock2.draw(camera);
    this.mHero.draw(camera);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    // Step  B: Draw with all three cameras
    this.drawCamera(this.mCamera);
    this.mMsg.draw(this.mCamera);   // only draw status in the main camera
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame.prototype.update = function () {
    var msg, i, c;
    var deltaC = 0.01;
    var deltaZ = 0.05;

    this.mCamera.update();  // to ensure proper interpolated movement effects
    this.mLMinion.update(); // ensure sprite animation
    this.mRMinion.update();
    this.mHero.update();  // allow keyboard control to move

    if (gEngine.Input.isButtonPressed(gEngine.Input.mouseButton.Left)) {
        this.mTheLight.set2DPosition(this.mHero.getXform().getPosition());
    }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
        c = this.mTheLight.getColor();
        for (i = 0; i < 4; i++) {
            c[i] += deltaC;
        }
    }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)) {
        c = this.mTheLight.getColor();
        for (i = 0; i < 4; i++) {
            c[i] -= deltaC;
        }
    }
    
    var p = this.mTheLight.getPosition(), r;
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Z)) {
        p[2] += deltaZ;
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.X)) {
        p[2] -= deltaZ;
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.C)) {
        r = this.mTheLight.getRadius();
        r += deltaC;
        this.mTheLight.setRadius(r);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.V)) {
        r = this.mTheLight.getRadius();
        r -= deltaC;
        this.mTheLight.setRadius(r);
    }
    
    c = this.mTheLight.getColor();
    msg = "LightColor:" + c[0].toPrecision(4) + " " + c[1].toPrecision(4) +
                    " " + c[2].toPrecision(4) + " " + c[3].toPrecision(4) +
          " Z=" + p[2].toPrecision(3) +
          " r=" + this.mTheLight.getRadius().toPrecision(3);
    this.mMsg.setText(msg);
};