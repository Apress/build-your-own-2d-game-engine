/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global gEngine, Scene, vec2, gBGClip */
var heroCharacter1 = null;
var heroCharacter2 = null;
var gPlayer_1_type = null;
var gPlayer_2_type = null;
function SelectScene(){
    
    this.hero_1_isSelected = false;
    this.returnmenu = false;
    this.gIsMoving = false;
    
    
    this.kBackgroundTexture = "assets/background.jpg";
    this.kHeroTexture1 = "assets/hero_5.png";
    this.kHeroTexture2 = "assets/hero_1.png";
    this.kHeroTexture3 = "assets/hero_3.png";
    this.kHeroTexture4 = "assets/hero_4.png";
    this.kFontCon72 = "assets/fonts/Consolas-72";
    
    this.mSelectHero1 = null;
    this.mSelectHero2 = null;
    this.mSelectHero3 = null;
    this.mSelectHero4 = null;
    this.mBackground = null;
    this.mSelect = null;
    this.mTextCon72 = null;
    
//    this.kBgClip1 = "assets/sounds/bgmSelectforhero1.mp3";
//    this.kBgClip2 = "assets/sounds/bgmSelectforhero2.mp3";
}
gEngine.Core.inheritPrototype(SelectScene, Scene);
SelectScene.prototype.loadScene = function() {
    gEngine.Textures.loadTexture(this.kBackgroundTexture);
    gEngine.Textures.loadTexture(this.kHeroTexture1);
    gEngine.Textures.loadTexture(this.kHeroTexture2);
    gEngine.Textures.loadTexture(this.kHeroTexture3);
    gEngine.Textures.loadTexture(this.kHeroTexture4);
    gEngine.Fonts.loadFont(this.kFontCon72);
//    
//    gEngine.AudioClips.loadAudio(this.kBgClip1);
//    gEngine.AudioClips.loadAudio(this.kBgClip2);

};
SelectScene.prototype.unloadScene = function () {   
    gEngine.Textures.unloadTexture(this.kBackgroundTexture);
    gEngine.Textures.unloadTexture(this.kHeroTexture1);
    gEngine.Textures.unloadTexture(this.kHeroTexture2);
    gEngine.Textures.unloadTexture(this.kHeroTexture3);
    gEngine.Textures.unloadTexture(this.kHeroTexture4);
    gEngine.Fonts.unloadFont(this.kFontCon72);
//    
    //gEngine.AudioClips.unloadAudio(gBGClip);
//    gEngine.AudioClips.unloadAudio(this.kBgClip2);
    if(this.returnmenu === true){
        gEngine.Core.startScene(new Startscene());
    }else{
        gEngine.Core.startScene(new MyGame());
    }
};
SelectScene.prototype._initText = function (font, posX, posY, color, textH) {
    font.setColor(color);
    font.getXform().setPosition(posX, posY);
    font.setTextHeight(textH);
};
SelectScene.prototype.initialize = function () {
    this.mCamera = new Camera(
        vec2.fromValues(50, 60),  // position of the camera
        100,                      // width of camera
        [400, 0, 600, 720],        // viewport (orgX, orgY, width, height)
        2
    );
    this.mCamera.setBackgroundColor([0, 0, 0, 1]);
    gEngine.DefaultResources.setGlobalAmbientIntensity(3.6);
    
    this.mTextCon72 = new FontRenderable("Select Character for Player 1");
    this.mTextCon72.setFont(this.kFontCon72);
    this._initText(this.mTextCon72, 6, 110, [0.9, 0.9, 0.9, 0.8], 5);
    
    this.mTextCon72_2 = new FontRenderable("Press Q to return menu");
    this.mTextCon72_2.setFont(this.kFontCon72);
    this._initText(this.mTextCon72_2, 30, 10, [0.0, 0.0, 0.0, 1], 5);
    
    //()
    this.mTextCon72_3 = new FontRenderable("Two Yellow Ships have more HP and powerful but slower");
    this.mTextCon72_3.setFont(this.kFontCon72);
    this._initText(this.mTextCon72_3, 5, 22, [0.8, 0.8, 0.8, 1], 3);
    
    this.mTextCon72_4 = new FontRenderable("speed is important to avoid the attacking");
    this.mTextCon72_4.setFont(this.kFontCon72);
    this._initText(this.mTextCon72_4, 5, 26, [0.8, 0.8, 0.8, 1], 3);
    
    this.mBackground = new TextureRenderable(this.kBackgroundTexture);
    this.mBackground.getXform().setPosition(50,60);
    this.mBackground.getXform().setSize(100,120);
    
    this.mSelectHero1 = new TextureRenderable(this.kHeroTexture1);
    this.mSelectHero1.getXform().setPosition(30,90);
    this.mSelectHero1.getXform().setSize(20,20);
    
    this.mSelectHero2 = new TextureRenderable(this.kHeroTexture2);
    this.mSelectHero2.getXform().setPosition(70,90);
    this.mSelectHero2.getXform().setSize(20,20);
    
    this.mSelectHero3 = new TextureRenderable(this.kHeroTexture3);
    this.mSelectHero3.getXform().setPosition(30,45);
    this.mSelectHero3.getXform().setSize(20,20);
    
    this.mSelectHero4 = new TextureRenderable(this.kHeroTexture4);
    this.mSelectHero4.getXform().setPosition(70,45);
    this.mSelectHero4.getXform().setSize(20,20);
    
    this.mSelect = new Renderable();
    this.mSelect.setColor([0.8, 0.8, 0.8, 0.1]);
    this.mSelect.getXform().setPosition(30, 90);
    this.mSelect.getXform().setSize(30,30);
    
};
SelectScene.prototype.draw = function () {
    gEngine.Core.clearCanvas([0, 0, 0, 1]); // clear to light gray
    this.mCamera.setupViewProjection();
    this.mBackground.draw(this.mCamera);
    this.mSelectHero1.draw(this.mCamera);
    this.mSelectHero2.draw(this.mCamera);
    
    this.mSelectHero3.draw(this.mCamera);
    this.mSelectHero4.draw(this.mCamera);
    
    this.mSelect.draw(this.mCamera);
    this.mTextCon72.draw(this.mCamera);
    this.mTextCon72_2.draw(this.mCamera);
    this.mTextCon72_3.draw(this.mCamera);
    this.mTextCon72_4.draw(this.mCamera);
};
SelectScene.prototype.update = function () {
    this.mCamera.update();
    var xf = this.mSelect.getXform();
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.A)||gEngine.Input.isKeyClicked(gEngine.Input.keys.Left)){
        this.mSelect.getXform().setPosition(30,xf.getPosition()[1]);
    }
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.D)||gEngine.Input.isKeyClicked(gEngine.Input.keys.Right)){
        this.mSelect.getXform().setPosition(70,xf.getPosition()[1]);
    }
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.W)||gEngine.Input.isKeyClicked(gEngine.Input.keys.Up)){
        this.mSelect.getXform().setPosition(xf.getPosition()[0],90);
    }
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.S)||gEngine.Input.isKeyClicked(gEngine.Input.keys.Down)){
        this.mSelect.getXform().setPosition(xf.getPosition()[0],45);
    }
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Q)){
        this.returnmenu = true;
        gEngine.GameLoop.stop();
    }
    
    var Xpos = this.mSelect.getXform().getXPos();
    var Ypos = this.mSelect.getXform().getYPos();
    if(Xpos===30 && Ypos===90){
        this.mSelectHero1.getXform().setSize(25,25);
        this.mSelectHero2.getXform().setSize(20,20);
        this.mSelectHero3.getXform().setSize(20,20);
        this.mSelectHero4.getXform().setSize(20,20);
        if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter)||gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)||gEngine.Input.isKeyClicked(gEngine.Input.keys.Shift)){
            if(this.hero_1_isSelected===false){
                heroCharacter1 = this.kHeroTexture1;
                this.hero_1_isSelected = true;
                gPlayer_1_type = 0;
                this.mTextCon72.setText("Select Character for Player 2");
            }else{
                heroCharacter2 = this.kHeroTexture1;
                gPlayer_2_type = 0;
                this.gIsMoving = true;
            }
        }
    }else if(Xpos===70 && Ypos===90){
        this.mSelectHero1.getXform().setSize(20,20);
        this.mSelectHero2.getXform().setSize(25,25);
        this.mSelectHero3.getXform().setSize(20,20);
        this.mSelectHero4.getXform().setSize(20,20);
        if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter)||gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)||gEngine.Input.isKeyClicked(gEngine.Input.keys.Shift)){
            if(this.hero_1_isSelected===false){
                heroCharacter1 = this.kHeroTexture2;
                this.hero_1_isSelected = true;
                gPlayer_1_type = 1;
                this.mTextCon72.setText("Select Character for Player 2");
            }else{
                heroCharacter2 = this.kHeroTexture2;
                gPlayer_2_type = 1;
                this.gIsMoving = true;
            }
        }
    }else if(Xpos===30 && Ypos===45){
        this.mSelectHero1.getXform().setSize(20,20);
        this.mSelectHero2.getXform().setSize(20,20);
        this.mSelectHero3.getXform().setSize(25,25);
        this.mSelectHero4.getXform().setSize(20,20);
        if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter)||gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)||gEngine.Input.isKeyClicked(gEngine.Input.keys.Shift)
                ){
            if(this.hero_1_isSelected===false){
                heroCharacter1 = this.kHeroTexture3;
                this.hero_1_isSelected = true;
                gPlayer_1_type = 2;
                this.mTextCon72.setText("Select Character for Player 2");
            }else{
                heroCharacter2 = this.kHeroTexture3;
                gPlayer_2_type = 2;
                this.gIsMoving = true;
            }
        }
    }else if(Xpos===70 && Ypos===45){
        this.mSelectHero1.getXform().setSize(20,20);
        this.mSelectHero2.getXform().setSize(20,20);
        this.mSelectHero3.getXform().setSize(20,20);
        this.mSelectHero4.getXform().setSize(25,25);
        if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter
                )||gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)||gEngine.Input.isKeyClicked(gEngine.Input.keys.Shift)){
            if(this.hero_1_isSelected===false){
                heroCharacter1 = this.kHeroTexture4;
                this.hero_1_isSelected = true;
                gPlayer_1_type = 3;
                this.mTextCon72.setText("Select Character for Player 2");
            }else{
                heroCharacter2 = this.kHeroTexture4;
                gPlayer_2_type = 3;
                this.gIsMoving = true;
            }
        }
    }
    if(this.gIsMoving===true){
        this.mCamera.setWCCenter(this.mCamera.getWCCenter()[0]+8, this.mCamera.getWCCenter()[1]);
    }
    if(this.mCamera.getWCCenter()[0]>150)
        gEngine.GameLoop.stop();
};
