/*
 * File: Credits.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, GameObjectSet, TextureObject, Camera, vec2,
  FontRenderable, ParticleGameObjectSet, ParticleEmitter
  GameObject, Hero, Minion, Dye, Platform, Wall, DyePack, Particle, MyGame */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Credits() {
    this.sceneFile = "assets/Scenes/Credits.json";
}
gEngine.Core.inheritPrototype(Credits, MyGame);

Credits.prototype.initialize0 = function () {
    this.thisLevel = new Credits();
    this.nextLevel = new Credits(); 
    this.sceneParser = new SceneFileParser(this.sceneFile);
    
    this.setImages();
};
Credits.prototype.setImages = function() {
    var _Dzy = new TextureRenderable(this.k_Dzy);
    var _Wyh = new TextureRenderable(this.k_Wyh);
    var _Zyc = new TextureRenderable(this.k_Zyc);
    
    this.setImage(_Dzy, 75, -11, [1, 1, 1, 0], 2, 5);
    this.setImage(_Wyh, 75, -20, [1, 1, 1, 0], 2, 5);
    this.setImage(_Zyc, 75, -29, [1, 1, 1, 0], 2, 5);
    
    this.mAllImages.addToSet(_Dzy);
    this.mAllImages.addToSet(_Wyh);
    this.mAllImages.addToSet(_Zyc);
};
Credits.prototype.setImage = function(image, posX, posY, color, width, height) {
    image.setColor(color);
    image.getXform().setPosition(posX, posY);
    image.getXform().setSize(width, height);
};
Credits.prototype.draw = function() {
    MyGame.prototype.draw.call(this);
    this.mAllImages.draw(this.mCamera);
};
Credits.prototype.showFirstTxt = function () {
    
};
Credits.prototype.showAnimationWin = function() {
    if(this.mTexts.size() === 0) {
        return;
    }
    
    //  Display
    for (var i = 0; i < this.mTexts.size(); i++) {
        var delta = 0.005;
        var color1 = this.mTexts.getObjectAt(i).getColor();
        color1[3] -= delta;
        if(color1[3] > 0) {
            this.mTexts.getObjectAt(i).setColor(color1);
        }
    }
    
    //  Move Texts
    for (var i = 0; i < this.mTexts.size(); i++) {
        var delta = 0.2;
        var pos = this.mTexts.getObjectAt(i).getXform().getPosition();
        pos[1] += delta;
        if(pos[1] <= 150) {
            this.mTexts.getObjectAt(i).getXform().setPosition(pos[0], pos[1]);
        }
    }
    
    //  Move Images
    for (var i = 0; i < this.mAllImages.size(); i++) {
        var delta = 0.2;
        var pos = this.mAllImages.getObjectAt(i).getXform().getPosition();
        pos[1] += delta;
        if(pos[1] <= 150) {
            this.mAllImages.getObjectAt(i).getXform().setPosition(pos[0], pos[1]);
        }
    }
};