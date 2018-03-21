/* 
 * The template for a scene.
 */

/*jslint node: true, vars: true */
/*global gEngine: false, Transform: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!


function GameOver(p1s, p2s) {
    this.p1s = p1s;
    this.p2s = p2s;
    
    this.mCamera = null;
    this.logo = null;
    //this.startText = null;
    
    this.dText = null;
}
gEngine.Core.inheritPrototype(GameOver, Scene);

GameOver.prototype.loadScene = function () {
    
};


GameOver.prototype.unloadScene = function () {
    //var start = new MyGame();
    //gEngine.Core.startScene(start);
};

GameOver.prototype.initialize = function () {
   this.mCamera = new Camera(vec2.fromValues(50, 50),
                                100,
                                [0, 0, 800, 600]);
                                
    this.logo = new FontRenderable("FINAL SCORE");
    this.logo.setColor([1, 1, 1, 0]);
    this.logo.getXform().setPosition(36, 60);
    this.logo.setTextHeight(5);
    /*
    this.startText = new FontRenderable("Player 1: " + this.p1s + " Player 2: " + this.p2s);
    this.startText.setColor([1, 1, 1, 0]);
    this.startText.getXform().setPosition(36, 40);
    this.startText.setTextHeight(3);
    */
   
    this.dText = new FontRenderable("Press Space to play again or press Escape to return to main menu");
    this.dText.setColor([1, 1, 1, 0]);
    this.dText.getXform().setPosition(15, 30);
    this.dText.setTextHeight(2);
    
    this.p1s.getXform().setPosition(36, 45);
    this.p2s.getXform().setPosition(75, 45);
};

GameOver.prototype.draw = function () {
    gEngine.Core.clearCanvas([1, 1, 1, 1.0]);
    this.mCamera.setupViewProjection();
    
    this.p1s.draw(this.mCamera);
    this.p2s.draw(this.mCamera);
    
    this.logo.draw(this.mCamera);
    //this.startText.draw(this.mCamera);
    this.dText.draw(this.mCamera);
};

GameOver.prototype.update = function () {
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)) {
        var start = new MyGame();
        gEngine.Core.startScene(start);
    }
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Escape)) {
        var start = new IntroMenu();
        gEngine.Core.startScene(start);
    }
};





