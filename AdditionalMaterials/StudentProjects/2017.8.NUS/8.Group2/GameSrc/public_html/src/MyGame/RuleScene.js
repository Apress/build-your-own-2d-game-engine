/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global gEngine, Scene, vec2 */
var returnmenu = false;
function RuleScene(){
    this.kBackgroundTexture = "assets/Rule.jpg";
    this.kFontCon72 = "assets/fonts/Consolas-72";
    this.kEnergy = "assets/Point.png";
    this.mBackground = null;
    this.mTextCon72 = null;
    this.mPoint1 = null;
    this.mPoint2 = null;
}
gEngine.Core.inheritPrototype(RuleScene, Scene);
RuleScene.prototype.loadScene = function() {
    gEngine.Textures.loadTexture(this.kBackgroundTexture);
    gEngine.Textures.loadTexture(this.kEnergy);
    gEngine.Fonts.loadFont(this.kFontCon72);
};
RuleScene.prototype.unloadScene = function () {   
    gEngine.Textures.unloadTexture(this.kBackgroundTexture);
    gEngine.Textures.unloadTexture(this.kEnergy);
    gEngine.Fonts.unloadFont(this.kFontCon72);
    if(returnmenu === true)
        gEngine.Core.startScene(new Startscene());
};
RuleScene.prototype._initText = function (font, posX, posY, color, textH) {
    font.setColor(color);
    font.getXform().setPosition(posX, posY);
    font.setTextHeight(textH);
};
RuleScene.prototype.initialize = function () {
    this.mCamera = new Camera(
        vec2.fromValues(50, 60),  // position of the camera
        100,                      // width of camera
        [400, 0, 600, 720],        // viewport (orgX, orgY, width, height)
        2
    );
    this.mCamera.setBackgroundColor([1, 1, 1, 0]);
    gEngine.DefaultResources.setGlobalAmbientIntensity(3.6);
    
    this.mBackground = new TextureRenderable(this.kBackgroundTexture);
    this.mBackground.getXform().setPosition(50, 60);
    this.mBackground.getXform().setSize(100, 120);
    
    this.mPoint1 = new TextureRenderable(this.kEnergy);
    this.mPoint1.getXform().setPosition(85, 10);
    this.mPoint1.getXform().setSize(10, 12);
    
    this.mPoint2 = new TextureRenderable(this.kEnergy);
    this.mPoint2.getXform().setPosition(85, 60);
    this.mPoint2.getXform().setSize(10, 12);
    
    this.mTextCon72 = new FontRenderable("Press Q to return menu");
    this.mTextCon72.setFont(this.kFontCon72);
    this._initText(this.mTextCon72, 30, 5, [0.0, 0.0, 0.0, 1], 5);
    
    
};
RuleScene.prototype.draw = function () {
    gEngine.Core.clearCanvas([1, 1, 1, 1]); // clear to light gray
    this.mCamera.setupViewProjection();
    this.mBackground.draw(this.mCamera);
    this.mTextCon72.draw(this.mCamera);
    this.mPoint1.draw(this.mCamera);
    this.mPoint2.draw(this.mCamera);
};
RuleScene.prototype.update = function () {
    this.mCamera.update();
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Q)){
        returnmenu = true;
        gEngine.GameLoop.stop();
    }
};
