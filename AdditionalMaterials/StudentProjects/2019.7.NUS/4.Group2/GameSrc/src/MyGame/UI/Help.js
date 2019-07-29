/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function Help(){
    this.kHelp = "assets/Help.png";
    this.mBackground = null;
    this.mCamera = null;
    this.mBackButton = null;
}

Help.prototype.loadScene = function(){
    gEngine.Textures.loadTexture(this.kHelp);
};

Help.prototype.unloadScene = function(){
    gEngine.Textures.unloadTexture(this.kHelp);
    gEngine.Core.startScene(new Menu());
};

Help.prototype.initialize = function(){
    this.mCamera = new Camera(
        vec2.fromValues(50, 40), // position of the camera
        100,                     // width of camera
        [0, 0, 800, 600]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([1,1,1,1]);
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    
    this.mBackground = new TextureRenderable(this.kHelp);
    this.mBackground.getXform().setPosition(50, 40);
    this.mBackground.getXform().setSize(128, 128);
    this.mBackground.setColor([1,1,1,0]);
    
    this.mBackButton = new UIButton(this.BackSelect, this, [700, 50], [100, 40], "Back", 4);
};

Help.prototype.draw = function(){
    this.mCamera.setupViewProjection();
    this.mBackground.draw(this.mCamera);
    this.mBackButton.draw(this.mCamera);
};

Help.prototype.update = function(){
    this.mBackButton.update();
};

Help.prototype.BackSelect = function(){
    gEngine.GameLoop.stop();
};