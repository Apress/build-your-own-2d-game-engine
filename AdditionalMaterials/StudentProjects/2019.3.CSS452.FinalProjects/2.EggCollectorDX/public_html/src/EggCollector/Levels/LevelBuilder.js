"use strict";

function LevelBuilder(x, y, levelFile) {
    this.kLevelFile = levelFile;
    this.kSizeBlockTexture = "assets/LevelBuilder/size-block.png";
    this.kBirdTexture = "assets/Birds/bird-sketch-3.png";
    this.kBackgroundFile = "assets/BirdCreek/mountain.png";
    this.kForegroundFile = "assets/BirdCreek/fg.png";
    this.mUITransform = null;
    this.mRefresh = false;
    
    this.mCamera = null;
    this.mMiniMap = null;
    this.mSizeBlock = null;
    this.mX = x;
    this.mY = y;

    this.mBirdPhysicsObjects = new GameObjectSet();
    this.mEggPhysicsObjects = new GameObjectSet();

    this.mNestSet = null;
    this.mPlatformSet = null;
    this.mEggSet = null;
}
gEngine.Core.inheritPrototype(LevelBuilder, Scene);


LevelBuilder.prototype.loadScene = function () {
    gEngine.TextFileLoader.loadTextFile(this.kLevelFile, gEngine.TextFileLoader.eTextFileType.eXMLFile);
    gEngine.Textures.loadTexture(this.kBirdTexture);
    gEngine.Textures.loadTexture(this.kBackgroundFile);
    gEngine.Textures.loadTexture(this.kForegroundFile);
    gEngine.Textures.loadTexture(this.kSizeBlockTexture);
};

LevelBuilder.prototype.unloadScene = function () {
    gEngine.LayerManager.cleanUp();
    gEngine.TextFileLoader.unloadTextFile(this.kLevelFile);
    gEngine.Textures.unloadTexture(this.kBirdTexture);
    gEngine.Textures.unloadTexture(this.kBackgroundFile);
    gEngine.Textures.unloadTexture(this.kForegroundFile);
    gEngine.Textures.unloadTexture(this.kSizeBlockTexture);
    
    if (this.mRefresh) {
        var p = this.mSizeBlock.getXform().getPosition();
        gEngine.Core.startScene(new LevelBuilder(p[0], p[1], this.kLevelFile));
    }
    else {
        gEngine.Core.startScene(new EndLevel(this.mScore, this.mEggSet.size()));
    }
};

LevelBuilder.prototype.initialize = function () {
    gEngine.DefaultResources.setGlobalAmbientColor([1, 1, 1, 1]);
    gEngine.DefaultResources.setGlobalAmbientIntensity(1.0);
    
    var uiBg = new Renderable();
    uiBg.setColor([0,0,0,1]);
    uiBg = new UIElement(uiBg, [400, 0], [802, 50]);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, uiBg);
    this.mUITransform = new UIText("", [10, 4], 5, UIText.eHAlignment.eLeft, UIText.eVAlignment.eBottom, [1, 1, 1, 1]);
    this.mUITransform.setTextHeight(3);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mUITransform);
    
    var parser = new SceneFileParser(this.kLevelFile);
    this.mCamera = parser.parseCamera();
    this.mCamera.setWCCenter(this.mX, this.mY);
    
    this.mNestSet = parser.parseNests(this.kBirdTexture);
    for (var i = 0; i < this.mNestSet.size(); i++) {
        if(this.mNestSet.getObjectAt(i).getHomeNest()){
            this.mHomeNest = this.mNestSet.getObjectAt(i);
        }
        this.mBirdPhysicsObjects.addToSet(this.mNestSet.getObjectAt(i).getRigidBodies()[0]);
        this.mNestSet.getObjectAt(i).addRigidBodiesToSet(this.mEggPhysicsObjects);
    }
    
    this.mMiniMap = parser.parseMiniMap(this.kLevelFile);
    
    // Step C: the far Background
    var bgR = new TextureRenderable(this.kBackgroundFile);
    bgR.getXform().setSize(200, 200);
    bgR.getXform().setPosition(0, 40);
    bgR.getXform().setZPos(-10);
    this.mBg = new ParallaxGameObject(bgR, 5, this.mCamera);
    this.mBg.setCurrentFrontDir([0, -1, 0]);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eBackground, this.mBg);
    
    // Main Level Art
    this.mFg = new TextureRenderable(this.kForegroundFile);
    this.mFg.getXform().setSize(800, 200);
    this.mFg.getXform().setPosition(0, 0);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eShadowReceiver, this.mFg);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eMiniMap, this.mFg);
    
    this.mPlatformSet = parser.parseRenderablePlatform();
    for (var i = 0; i < this.mPlatformSet.size(); i++) {
        if(this.mPlatformSet.getObjectAt(i).getGround()){
            this.mGround = this.mPlatformSet.getObjectAt(i);
        }
        this.mBirdPhysicsObjects.addToSet(this.mPlatformSet.getObjectAt(i));
        this.mEggPhysicsObjects.addToSet(this.mPlatformSet.getObjectAt(i));
    }
    
    this.mEggSet = parser.parseEggs(this.kBirdTexture);
    for (var i = 0; i < this.mEggSet.size(); i++) {
        this.mEggPhysicsObjects.addToSet(this.mEggSet.getObjectAt(i));
    }
    
    var bird = new PlayerBird(this.kBirdTexture, this.mNestSet.concat(this.mPlatformSet), this.mEggSet);

    this.mSizeBlock = new SizeBlock(this.kSizeBlockTexture, bird);
    this.mSizeBlock.getXform().setPosition(this.mX, this.mY);
    this.mSizeBlock.getXform().setSize(10, 10);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mSizeBlock);
    this.mBirdPhysicsObjects.addToSet(this.mSizeBlock);
    
    var icon = new MiniIcon(this.kBirdTexture, this.mSizeBlock.getXform());
    SpriteRenderable.prototype.setElementPixelPositions.call(icon, 768, 896, 896, 1024);
    SpriteRenderable.prototype.getXform.call(icon).setSize(20, 20);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eMiniMap, icon);
    
    // Move the egg in front of the bird
    for (var i = 0; i < this.mEggSet.size(); i++) {
        gEngine.LayerManager.moveToLayerFront(gEngine.eLayer.eActors, this.mEggSet.getObjectAt(i));
    }
};

LevelBuilder.prototype.draw = function () {
    gEngine.Core.clearCanvas([1.0, 1.0, 1.0, 1.0]);

    this.mCamera.setupViewProjection();
    gEngine.LayerManager.drawAllLayers(this.mCamera);
    
    this.mMiniMap.setupViewProjection();
    gEngine.LayerManager.drawLayer(gEngine.eLayer.eBackground, this.mMiniMap);
    gEngine.LayerManager.drawLayer(gEngine.eLayer.eMiniMap, this.mMiniMap);
    //gEngine.LayerManager.drawLayer(gEngine.eLayer.eActors, this.mMiniMap);
};

LevelBuilder.prototype.update = function () {    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.R)) {
        this.mRefresh = true;
        gEngine.GameLoop.stop();
    }
    
    gEngine.LayerManager.updateAllLayers();
    gEngine.Physics.processCollision(this.mBirdPhysicsObjects, []);
    gEngine.Physics.processCollision(this.mEggPhysicsObjects, []);    
    
    this.mUITransform.setText(`(${this.mSizeBlock.getXform().getXPos().toFixed(2)}, ${this.mSizeBlock.getXform().getYPos().toFixed(2)}) ` + 
                              `${this.mSizeBlock.getXform().getWidth().toFixed(2)} x ${this.mSizeBlock.getXform().getHeight().toFixed(2)}`);
    
    gEngine.LayerManager.updateLayer(gEngine.eLayer.eMiniMap);
   
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.M)) {
        this.mMiniMap.show();
    }
    else {
        this.mMiniMap.hide();
    }
    
    this.mCamera.panTo(this.mSizeBlock.getXform().getXPos(), this.mSizeBlock.getXform().getYPos());
    this.mCamera.update();
};