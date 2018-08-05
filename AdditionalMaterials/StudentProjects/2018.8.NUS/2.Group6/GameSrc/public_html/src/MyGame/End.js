/*
 * File: GameEndThis is the logic of our game.
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  Renderable, TextureRenderable, FontRenderable, SpriteRenderable, LightRenderable, IllumRenderable,
  GameObject, TiledGameObject, ParallaxGameObject, Hero, Minion, Dye, Light */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function End(spriteTexture, num) {
    // The camera to view the scene
    this.mCamera = null;
    this.mRestart = false;
    this.kBackground = spriteTexture;
    this.num = num;
}
gEngine.Core.inheritPrototype(End, Scene);

End.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kBackground);
};

End.prototype.unloadScene = function () {
    gEngine.LayerManager.cleanUp();

    gEngine.Textures.unloadTexture(this.kBackground);

    if (this.mRestart === true)
    {
        if(this.num === 0){
            gEngine.Core.startScene(new Begin());
        }else if(this.num === 1){
            gEngine.Core.startScene(new Level1());
        }else if(this.num === 2){
            gEngine.Core.startScene(new Level2());
        }else if(this.num === 3){
            gEngine.Core.startScene(new Level3());
        }
        else if(this.num === 4){
            gEngine.Core.startScene(new Level4());
        }
        else if(this.num === 5){
            gEngine.Core.startScene(new Begin());
        }
        else{
            gEngine.Core.startScene(new Begin());
        }

    }
};

End.prototype.initialize = function () {
    document.getElementById('info').innerText = "";
    this.width = 800;
    this.height = 600;

    this.mCamera = new Camera(
        vec2.fromValues(0, 0), // position of the camera
        1024,                     // width of camera
        [0, 0, this.width, this.height]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([1, 1, 1, 1]);
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    this.mBackground = new Fail(this.kBackground);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
End.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    this.mCamera.setupViewProjection();
    this.mBackground.draw(this.mCamera);
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
End.prototype.update = function () {

    // select which character to work with
    //if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space))
    //gEngine.GameLoop.stop();
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.R)) {
        this.mRestart = true;
        gEngine.GameLoop.stop();
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Q)) {
        this.mRestart = true;
        this.num = 5;
        gEngine.GameLoop.stop();
    }
};