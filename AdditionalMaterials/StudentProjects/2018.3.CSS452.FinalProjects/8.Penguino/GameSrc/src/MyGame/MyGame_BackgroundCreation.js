/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global MyGame */

MyGame.prototype.LoadBackground = function(bg, bg_normal, x, y, w, h, bgH, bgW, camera, minicamera, lightSet) {
    // Step C: the far Background
    bgR = new IllumRenderable(bg, bg_normal);
    bgR.setElementPixelPositions(0, bgH, 0, bgW);
    bgR.getXform().setSize(w, h);
    bgR.getXform().setPosition(x, y);
    bgR.getMaterial().setSpecular([0.2, 0.1, 0.1, 1]);
    bgR.getMaterial().setShininess(50);
    bgR.getXform().setZPos(-10);
    
    // all of the lights
    for (var i = 0; i < lightSet.length; i++) {
        bgR.addLight(lightSet[i]);
    }
    this.mBg = new ParallaxGameObject(bgR, 5, camera);
    this.mBg.setCurrentFrontDir([0, -1, 0]);
    //this.mBg.setSpeed(0.1);
    
    this.mMiniBg = new ParallaxGameObject(bgR, 5, minicamera);
    this.mMiniBg.setCurrentFrontDir([0, -1, 0]);
    //this.mMiniBg.setSpeed(0.1);
};

