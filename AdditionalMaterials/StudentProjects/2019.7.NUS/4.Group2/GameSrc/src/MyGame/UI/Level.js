/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */

"use strict";

function Level(){
    this.kTitle = "assets/LevelSelect.png";
     this.mBG = null;
     this.mCamera = null;
     this.Level1 = null;
     this.Level2 = null;
     this.Level3 = null;
     this.Level4 = null;
     this.BackButton = null;
     this.mButtonSelect = null;
     this.mTitle = null;
}

Level.prototype.loadScene = function(){
    gEngine.Textures.loadTexture(this.kTitle);
};

Level.prototype.unloadScene = function(){
    gEngine.Textures.unloadTexture(this.kTitle);
    if(this.mButtonSelect === 0)
        gEngine.Core.startScene(new Menu());
    else if(this.mButtonSelect !== null)
        gEngine.Core.startScene(new MyGame(this.mButtonSelect));
};

Level.prototype.initialize = function(){
    this.mCamera = new Camera(
        vec2.fromValues(100, 75), // position of the camera
        200,                     // width of camera
        [0, 0, 800, 600]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    this.mBG = new Renderable(gEngine.DefaultResources.getConstColorShader());
    this.mBG.setColor([0.92, 0.92, 0.952, 1]);//152, 234, 251
    this.mBG.getXform().setPosition(100, 75);
    this.mBG.getXform().setSize(200, 175);
    
    this.mTitle = new SpriteRenderable(this.kTitle);
    this.mTitle.setElementPixelPositions(212, 812, 28, 228);
    this.mTitle.getXform().setPosition(100, 130);
    this.mTitle.getXform().setSize(120, 40);
    this.mTitle.setColor([1,1,1,0]);
    
    this.Level1 = new UIButton(this.Level1Select, this, [250, 400], [80, 80], "1", 6);
    this.Level2 = new UIButton(this.Level2Select, this, [350, 400], [80, 80], "2", 6);
    this.Level3 = new UIButton(this.Level3Select, this, [450, 400], [80, 80], "3", 6);
    this.Level4 = new UIButton(this.Level4Select, this, [550, 400], [80, 80], "4", 6);
    this.BackButton = new UIButton(this.BackSelect, this, [200, 100], [200, 60], "Back", 6);
};

Level.prototype.draw = function(){
    gEngine.Core.clearCanvas([1,1,1,1]);
    this.mCamera.setupViewProjection();
    this.mBG.draw(this.mCamera);
    this.Level1.draw(this.mCamera);
    this.Level2.draw(this.mCamera);
    this.Level3.draw(this.mCamera);
    this.Level4.draw(this.mCamera);
    this.mTitle.draw(this.mCamera);
    this.BackButton.draw(this.mCamera);
    // var i;
    // for(i = 0; i < 4; i++){
    //     this.mLevelSet[i].draw(this.mCamera);
    // }
};

Level.prototype.update = function(){
    this.mCamera.update();
    this.Level1.update();
    this.Level2.update();
    this.Level3.update();
    this.Level4.update();
    this.BackButton.update();
//    for(var i = 0; i < 4; i++){
//        this.mLevelSet[i].update();
//    }
};

Level.prototype.Level1Select = function(){
    this.mButtonSelect = 1;
    gEngine.GameLoop.stop();
};

Level.prototype.Level2Select = function(){
    this.mButtonSelect = 2;
    gEngine.GameLoop.stop();
};

Level.prototype.Level3Select = function(){
    this.mButtonSelect = 3;
    gEngine.GameLoop.stop();
};

Level.prototype.Level4Select = function(){
    this.mButtonSelect = 4;
    gEngine.GameLoop.stop();
};

Level.prototype.BackSelect = function(){
    this.mButtonSelect = 0;
    gEngine.GameLoop.stop();
};
