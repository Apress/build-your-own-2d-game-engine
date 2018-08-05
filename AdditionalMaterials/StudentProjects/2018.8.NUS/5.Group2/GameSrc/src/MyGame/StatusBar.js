/*
 * File: MyGame.js
 * This is the logic of our game.
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function StatusBar() {
    // The camera to view the scene
    this.kBar = "assets/hero/status.png";

    this.mBarCamera = null;
    this.mHPCamera = null;

    this.mBar = null;
    this.mHP = [];
    this.mVP = [];
}

StatusBar.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kBar);
};

StatusBar.prototype.initialize = function () {
    gEngine.Textures.loadTexture(this.kBar);

    this.mBarCamera = new Camera(
        vec2.fromValues(0, 2015),   // position of the camera
        1024,                     // width of camera
        [0, 0, 970, 120]        // viewport (orgX, orgY, width, height)
    );
    this.mBarCamera.setBackgroundColor([1, 0, 0, 0]);

    this.mBar = new TextureRenderable(this.kBar);
    this.mBar.setColor([0, 0, 1, 0]);  // tints red
    this.mBar.getXform().setPosition(0, 2000);
    this.mBar.getXform().setSize(1024, 256);

    var i;
    for (i = 0; i < 3; ++i) {
        this.mHP.push(new Renderable());
        // this.mHP[i].setColor([.9921975, .25283019, .39453125, 0.5]);
        this.mHP[i].setColor(_C.HPColor);
        this.mHP[i].getXform().setPosition(-210 + i * 290, 2030);
        this.mHP[i].getXform().setSize(130, 20);
    }

    for (i = 0; i < 3; ++i) {
        this.mVP.push(new Renderable());
        this.mVP[i].setColor([.625, .9296875, .87890625, 0.5]);
        this.mVP[i].getXform().setPosition(-210 + i * 290, 1990);
        this.mVP[i].getXform().setSize(130, 20);
    }
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
StatusBar.prototype.draw = function () {
    // gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mBarCamera.setupViewProjection();
    this.mBar.draw(this.mBarCamera);

    var i;
    for (i = 0; i < this.mHP.length; ++i) {
        this.mHP[i].draw(this.mBarCamera);
        this.mVP[i].draw(this.mBarCamera);
    }
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!

StatusBar.prototype.update = function() {
    var i;
    for (i = 0; i < CharacterSet.length; ++i) {
        this.updateHP(i);
        this.updateVP(i);
    }
};

StatusBar.prototype.updateHP = function (i) {
    var maxHP = CharacterSet[i].getMaxHP();
    var currentHP = CharacterSet[i].getCurrentHP();

    if (currentHP > maxHP) currentHP = maxHP;
    if (currentHP < 0) currentHP = 0;

    var newLength = 130 * currentHP / maxHP;
    var oriLength = this.mHP[i].getXform().getWidth();

    this.mHP[i].getXform().setWidth(newLength);
    this.mHP[i].getXform().incXPosBy((newLength - oriLength) / 2);
};

StatusBar.prototype.updateVP = function (i) {
    var maxVP = CharacterSet[i].getMaxVP();
    var currentVP = CharacterSet[i].getCurrentVP();

    if (currentVP > maxVP) currentVP = maxVP;
    if (currentVP < 0) currentVP = 0;

    var newLength = 130 * currentVP / maxVP;
    var oriLength = this.mVP[i].getXform().getWidth();

    this.mVP[i].getXform().setWidth(newLength);
    this.mVP[i].getXform().incXPosBy((newLength - oriLength) / 2);
};
