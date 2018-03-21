/* 
 * The template for a scene.
 */

/*jslint node: true, vars: true */
/*global gEngine: false, Transform: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!


function GameOverScreen() {
    //this.p1s = p1s;
    //this.p2s = p2s;
    
    //this.mCamera = null;
    this.logo = null;
    //this.startText = null;
    
    this.dText = null;
    //GameObjectSet.call(this);
    this.logo = new FontRenderable("FINAL SCORE");
    this.logo.setColor([1, 1, 1, 0]);
    this.logo.getXform().setPosition(36, 60);
    this.logo.setTextHeight(5);
   
    this.dText = new FontRenderable("Press Space to rematch or press Escape to return to main menu");
    this.dText.setColor([1, 1, 1, 0]);
    this.dText.getXform().setPosition(15, 30);
    this.dText.setTextHeight(2);
    
    this.p1s = null;
    this.p2s = null;
    
    //this.mObjSet = new GameObjectSet();
    
}

GameOverScreen.prototype.setPlayerScore = function (player1, player2) {
    this.p1s = player1;
    this.p2s = player2;
}
//gEngine.Core.inheritPrototype(GameOverScreen, GameObjectSet);
/*
GameOverScreen.prototype.initialize = function () {
    
    this.mCamera = new Camera(vec2.fromValues(50, 50),
                                100,
                                [0, 0, 800, 600]);
                                
    
    
    //this.p1s.getXform().setPosition(35, 45);
    //this.p2s.getXform().setPosition(65, 45);
    
    //this.addToSet(this.mCamera)
    
};
*/

GameOverScreen.prototype.draw = function (aCamera) {
    //gEngine.Core.clearCanvas([1, 1, 1, 1.0]);
    //this.mCamera.setupViewProjection();
    
    if(this.p1s != null && this.p2s != null){
        this.p1s.draw(aCamera);
        this.p2s.draw(aCamera); 
    }
    //this.p1s.draw(aCamera);
    //this.p2s.draw(aCamera);
    
    this.logo.draw(aCamera);
    this.dText.draw(aCamera);
    //this.mObjSet.draw(aCamera);
    //GameObjectSet.prototype.draw.call(this, aCamera);
};

/*
GameOverScene.prototype.updateInput = function () {
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)) {
        //var start = new MyGame();
        //gEngine.Core.startScene(start);
    }
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Escape)) {
        //var start = new IntroMenu();
        //gEngine.Core.startScene(start);
    }
};

*/




