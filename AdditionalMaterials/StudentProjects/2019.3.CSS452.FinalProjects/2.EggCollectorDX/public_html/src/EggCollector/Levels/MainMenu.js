"use strict";

function MainMenu() {
    this.mMenuState = MainMenu.state.HOME;
    this.mLevelChoice = 1;
    this.mRestart = false;
    
    this.mTitle = null;
    this.mTitle2 = null;
    this.mStartGameButton = null;
    //this.mLevelSelectButton = null;
    this.mControlsButton = null;
    this.mInstructionsButton = null;
    this.mCreditsButton = null;
    this.mBackButton = null;
    
    //this.mLevelOneButton = null;
    
    this.mLineOne = null;
    this.mLineTwo = null;
    this.mLineThree = null;
    this.mLineFour = null;
    this.mLineFive = null;
    this.mLineSix = null;

    this.kBackgroundMusic = "assets/Audio/MainTheme.mp3";
    this.kBackgroundSprite = "assets/Backdrops/menu-bg.png";
    this.kButtonSprite = "assets/UI/button.png";
    this.kBirdCreekButtonTexture = "assets/UI/birdcreek-button.png";
    
    //this.mBackgroundBird = null;
}
gEngine.Core.inheritPrototype(MainMenu, Scene);

MainMenu.state = Object.freeze({
    HOME: 0,
    //LEVELSELECT: 1,
    CONTROLS: 1,
    INSTRUCTIONS: 2,
    CREDITS: 3
});

MainMenu.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kBackgroundSprite);
    gEngine.Textures.loadTexture(this.kButtonSprite);
    gEngine.Textures.loadTexture(this.kBirdCreekButtonTexture);
    gEngine.AudioClips.loadAudio(this.kBackgroundMusic);
};

MainMenu.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kBackgroundSprite);
    gEngine.Textures.unloadTexture(this.kButtonSprite);
    gEngine.Textures.unloadTexture(this.kBirdCreekButtonTexture);
    gEngine.AudioClips.stopBackgroundAudio();
    
    gEngine.LayerManager.cleanUp();
    
    if (this.mRestart === true) {
        gEngine.Core.startScene(new MainMenu());
    }
    else {
        gEngine.Core.startScene(new BirdCreek());
    }
//    else if (this.mLevelChoice === 1) {
//        gEngine.Core.startScene(new BirdCreek());
//    }
};

MainMenu.prototype.initialize = function () {
    gEngine.DefaultResources.setGlobalAmbientColor([1, 1, 1, 1]);
    gEngine.DefaultResources.setGlobalAmbientIntensity(1.0);
    
    this.mCamera = new Camera(
        vec2.fromValues(0, 0), // position of the camera
        200,                     // width of camera
        [0, 0, 800, 600]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0, 0, 0, 1]);
    
    
    this.mTitle = new UIText("Egg Collector DX", [380, 484], 10, 1, 2, [1, 1, 1, 1]);
    this.mTitle2 = new UIText("Egg Collector DX", [380, 480], 10, 1, 2, [0, 0, 0, 1]);
    
    this.mStartGameButton = new UIButton(this.kButtonSprite,this.startGame,this,[390,380],[200,60],"Start Game",5,[0.2,0.5,0,1],[1,1,1,1]);
    
    //this.mLevelSelectButton = new UIButton(this.kButtonSprite,this.levelSelect,this,[390,310],[200,60],"Select Level",5,[1,0,1,1],[0,0,0,1]);
    
    this.mInstructionsButton = new UIButton(this.kButtonSprite,this.viewInstructions,this,[390,300],[200,60],"How to Play",5,[0.8,0,0.2,1],[1,1,1,1]);
    
    this.mControlsButton = new UIButton(this.kButtonSprite,this.viewControls,this,[390,220],[200,60],"View Controls",5,[0,0,1,1],[1,1,1,1]);
    
    this.mCreditsButton = new UIButton(this.kButtonSprite,this.viewCredits,this,[390,140],[200,60],"Credits",5,[0,0,0,1],[1,1,1,1]);
    
    this.mBackButton = new UIButton(this.kButtonSprite,this.goHome,this,[100,80],[160,40],"Back",5,[0,0,0,1],[1,1,1,1]);
    
    //level buttons
    this.mLevelOneButton = new UIButton(this.kBirdCreekButtonTexture,this.startLevelOne,this,[390,350],[200,80],"Bird Creek",5,[1,1,1,1],[0,0,0,1]);

    
    //text
    this.mLineOne = new UIText("WASD: Move Bird", [390, 390], 5, 1, 2, [0, 0, 0, 1]);
    this.mLineTwo = new UIText("Hold Space: Grab Egg", [390, 340], 5, 1, 2, [0, 0, 0, 1]);
    this.mLineThree = new UIText("Hold M: Show Minimap", [390, 290], 5, 1, 2, [0, 0, 0, 1]);
    this.mLineFour = new UIText("P: Pause", [390, 240], 5, 1, 2, [0, 0, 0, 1]);
    this.mLineFive = new UIText("R: Restart Current Level", [390, 190], 5, 1, 2, [0, 0, 0, 1]);
    this.mLineSix = new UIText("Q: Quit to Main Menu", [390, 140], 5, 1, 2, [0, 0, 0, 1]);
    
    this.mBackground = new TextureRenderable(this.kBackgroundSprite);
    this.mBackground.getXform().setPosition(0, 0);
    this.mBackground.getXform().setSize(256, 256);
    
    gEngine.AudioClips.playBackgroundAudio(this.kBackgroundMusic);
};

MainMenu.prototype.draw = function () {
    gEngine.Core.clearCanvas([1.0, 1.0, 1.0, 1.0]);

    this.mCamera.setupViewProjection();
    this.mBackground.draw(this.mCamera);
    this.mTitle2.draw(this.mCamera);
    this.mTitle.draw(this.mCamera);
    
    if(this.mMenuState === MainMenu.state.HOME){
        this.mTitle.setText("Egg Collector DX");
        this.mTitle2.setText("Egg Collector DX");
        this.mStartGameButton.draw(this.mCamera);
        //this.mLevelSelectButton.draw(this.mCamera);
        this.mInstructionsButton.draw(this.mCamera);
        this.mControlsButton.draw(this.mCamera);
        this.mCreditsButton.draw(this.mCamera);
    }
//    else if(this.mMenuState === MainMenu.state.LEVELSELECT){
//        this.mTitle.setText("Level Select");
//        this.mBackButton.draw(this.mCamera);
//        this.mLevelOneButton.draw(this.mCamera);
//    }
    else if(this.mMenuState === MainMenu.state.CONTROLS){
        this.mTitle.setText("Controls");
        this.mTitle2.setText("Controls");
        this.mBackButton.draw(this.mCamera);
        
        this.mLineOne.setText("WASD: Move Bird");
        this.mLineTwo.setText("Hold Space: Grab Egg");
        this.mLineThree.setText("Hold M: Show Minimap");
        this.mLineFour.setText("P: Pause");
        this.mLineFive.setText("R: Restart Current Level");
        
        this.mLineOne.draw(this.mCamera);
        this.mLineTwo.draw(this.mCamera);
        this.mLineThree.draw(this.mCamera);
        this.mLineFour.draw(this.mCamera);
        this.mLineFive.draw(this.mCamera);
        this.mLineSix.draw(this.mCamera);
    }
    else if(this.mMenuState === MainMenu.state.INSTRUCTIONS){
        this.mTitle.setText("How to Play");
        this.mTitle2.setText("How to Play");
        this.mBackButton.draw(this.mCamera);
        
        this.mLineOne.setText("Carry eggs to the Home Nest on the Starting Stump to Score.");
        this.mLineTwo.setText("If an egg hits the ground, it cannot be used to Score.");
        this.mLineThree.setText("Hitting an enemy bird will temporarily stun you both.");
        this.mLineFour.setText("Stunned birds cannot carry eggs.");
        this.mLineFive.setText("When there are no eggs left in play, the game ends.");
        
        this.mLineOne.draw(this.mCamera);
        this.mLineTwo.draw(this.mCamera);
        this.mLineThree.draw(this.mCamera);
        this.mLineFour.draw(this.mCamera);
        this.mLineFive.draw(this.mCamera);
    }
    else if(this.mMenuState === MainMenu.state.CREDITS){
        this.mTitle.setText("Credits");
        this.mTitle2.setText("Credits");
        this.mBackButton.draw(this.mCamera);
        
        this.mLineOne.setText("Created By: The Nameless Three");
        this.mLineTwo.setText("Anish Prasad, Daniel Doran, Michael Courter");
        this.mLineThree.setText("Game Engine V2 Provided by: Kelvin Sung et. al.");
        this.mLineFour.setText("Bird Sound Effects used under CC Attribution 3.0 License:");
        this.mLineFive.setText("Falcon by Mark Mattingly, Bluejay Call 2 by Mark Koenig");
        
        this.mLineOne.draw(this.mCamera);
        this.mLineTwo.draw(this.mCamera);
        this.mLineThree.draw(this.mCamera);
        this.mLineFour.draw(this.mCamera);
        this.mLineFive.draw(this.mCamera);
    }
};

MainMenu.prototype.update = function () {    
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.R)){
        this.mRestart = true;
        gEngine.GameLoop.stop();
    }
    
    if(this.mMenuState === MainMenu.state.HOME){
        this.mStartGameButton.update();
        //this.mLevelSelectButton.update();
        this.mInstructionsButton.update();
        this.mControlsButton.update();
        this.mCreditsButton.update();
    }
    
//    if(this.mMenuState === MainMenu.state.LEVELSELECT){
//        this.mBackButton.update();
//        this.mLevelOneButton.update();
//    }
    
    if(this.mMenuState === MainMenu.state.CONTROLS){
        this.mBackButton.update();
    }
    
    if(this.mMenuState === MainMenu.state.INSTRUCTIONS){
        this.mBackButton.update();
    }
    
    if(this.mMenuState === MainMenu.state.CREDITS){
        this.mBackButton.update();
    }
    
    gEngine.LayerManager.updateAllLayers();
};

MainMenu.prototype.startGame = function() {
    gEngine.GameLoop.stop();
};

//MainMenu.prototype.levelSelect = function() {
//    this.mMenuState = MainMenu.state.LEVELSELECT;
//};

MainMenu.prototype.viewControls = function() {
    this.mMenuState = MainMenu.state.CONTROLS;
};

MainMenu.prototype.viewInstructions = function() {
    this.mMenuState = MainMenu.state.INSTRUCTIONS;
};

MainMenu.prototype.viewCredits = function() {
    this.mMenuState = MainMenu.state.CREDITS;
};

MainMenu.prototype.goHome = function() {
    this.mMenuState = MainMenu.state.HOME;
};

//MainMenu.prototype.startLevelOne = function(){
//    this.mLevelChoice = 1;
//    gEngine.GameLoop.stop();
//};