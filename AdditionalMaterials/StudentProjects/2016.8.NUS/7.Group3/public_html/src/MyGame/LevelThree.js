"use strict";  // Operate in Strict mode such that variables must be declared before used!

function LevelThree() {
    MyGame.call(this);
    this.kBg = "assets/sky1.png";
    this.level = 2;
}
gEngine.Core.inheritPrototype(LevelThree, MyGame);


LevelThree.prototype.initialize = function () {
    
    MyGame.prototype.initialize.call(this);
    
    gEngine.AudioClips.playBackgroundAudio(this.kBgClip);
    this.kDecEnergy = 5;

    
    this.mStar.getRenderable().addLight(this.mLightSet.getLightAt(2));
    
    if(gEngine.ResourceMap.isAssetLoaded(LastScore))
        this.mScore = gEngine.ResourceMap.retrieveAsset(LastScore);
    
    var msg0 = "Level 2";
    this.mMsg0.setText(msg0);
    this.mMsg0.setColor([1, 1, 1, 1]);
    this.mMsg2.setColor([1, 1, 0.6, 1]);
    
    this.mLightSet.getLightAt(1).setIntensity(-0.5);
    
    this.mBg.addLight(this.mLightSet.getLightAt(2));
    this.mBg.addLight(this.mLightSet.getLightAt(0));
    this.mBalloon.getRenderable().addLight(this.mLightSet.getLightAt(0));
    this.mCircle.addLight(this.mLightSet.getLightAt(0));
    for(var i=0; i<this.mSignSet.size(); i++){
        this.mSignSet.getObjectAt(i).getRenderable().addLight(this.mLightSet.getLightAt(0));
    }
    
    var bird1 = new Chase(this.kBird1, null, 200, 50);
    this.mChaseSet.addToSet(bird1);

    var bird3 = new Free(this.kBird1, null, 230, 35);
    this.mFreeSet.addToSet(bird3);
    
    var bird4 = new Free(this.kBird1, null, 120, 35);
    this.mFreeSet.addToSet(bird4);

    var bird5 = new Free(this.kBird1, null, 240, 20);
    this.mFreeSet.addToSet(bird5);
    
    
    
    for(var i=0; i<this.mChaseSet.size(); i++){
        this.mChaseSet.getObjectAt(i).getRenderable().addLight(this.mLightSet.getLightAt(1));
        this.mChaseSet.getObjectAt(i).getRenderable().addLight(this.mLightSet.getLightAt(2));
        
    }
        
    for(var i=0; i<this.mFreeSet.size(); i++){
        this.mFreeSet.getObjectAt(i).getRenderable().addLight(this.mLightSet.getLightAt(1));
        this.mFreeSet.getObjectAt(i).getRenderable().addLight(this.mLightSet.getLightAt(2));
    }
        
    
    
//food
    this.food0 = new Food(this.kStrawberry, null, 0, 50, 55);
    this.mFoodSet.addToSet(this.food0);
    this.food3 = new Food(this.kGrapes, null, 1, 35, 25);
    this.mFoodSet.addToSet(this.food3);
    this.food1 = new Food(this.kBlueberry, null, 3, 60, 35);
    this.mFoodSet.addToSet(this.food1);
    this.food2 = new Food(this.kMango, null, 2, 80, 25);
    this.mFoodSet.addToSet(this.food2);
    this.food3 = new Food(this.kGrapes, null, 1, 90, 45);
    this.mFoodSet.addToSet(this.food3);
    this.food0 = new Food(this.kStrawberry, null, 0, 120, 55);
    this.mFoodSet.addToSet(this.food0);
    this.food3 = new Food(this.kGrapes, null, 1, 130, 15);
    this.mFoodSet.addToSet(this.food3);
    this.food1 = new Food(this.kBlueberry, null, 3, 140, 20);
    this.mFoodSet.addToSet(this.food1);
    this.food2 = new Food(this.kMango, null, 2, 150, 40);
    this.mFoodSet.addToSet(this.food2);
    this.food0 = new Food(this.kStrawberry, null, 0, 160, 15);
    this.mFoodSet.addToSet(this.food0);
    
    this.food3 = new Food(this.kGrapes, null, 1, 200, 55);
    this.mFoodSet.addToSet(this.food3);
    this.food1 = new Food(this.kBlueberry, null, 3, 200, 45);
    this.mFoodSet.addToSet(this.food1);
    this.food0 = new Food(this.kStrawberry, null, 0, 200, 35);
    this.mFoodSet.addToSet(this.food0);
    this.food2 = new Food(this.kMango, null, 2, 200, 25);
    this.mFoodSet.addToSet(this.food2);
    this.food1 = new Food(this.kBlueberry, null, 3, 200, 15);
    this.mFoodSet.addToSet(this.food1);
    
    this.food0 = new Food(this.kStrawberry, null, 0, 215, 55);
    this.mFoodSet.addToSet(this.food0);
    this.food2 = new Food(this.kMango, null, 2, 215, 45);
    this.mFoodSet.addToSet(this.food2);
    this.food3 = new Food(this.kGrapes, null, 1, 215, 35);
    this.mFoodSet.addToSet(this.food3);
    this.food1 = new Food(this.kBlueberry, null, 3, 215, 25);
    this.mFoodSet.addToSet(this.food1);
    this.food2 = new Food(this.kMango, null, 2, 215, 15);
    this.mFoodSet.addToSet(this.food2);
    
    this.food3 = new Food(this.kGrapes, null, 1, 230, 55);
    this.mFoodSet.addToSet(this.food3);
    this.food1 = new Food(this.kBlueberry, null, 3, 230, 45);
    this.mFoodSet.addToSet(this.food1);
    this.food0 = new Food(this.kStrawberry, null, 0, 230, 35);
    this.mFoodSet.addToSet(this.food0);
    this.food2 = new Food(this.kMango, null, 2, 230, 25);
    this.mFoodSet.addToSet(this.food2);
    this.food3 = new Food(this.kGrapes, null, 1, 230, 15);
    this.mFoodSet.addToSet(this.food3);
    
    this.food0 = new Food(this.kStrawberry, null, 0, 245, 55);
    this.mFoodSet.addToSet(this.food0);
    this.food2 = new Food(this.kMango, null, 2, 245, 45);
    this.mFoodSet.addToSet(this.food2);
    this.food3 = new Food(this.kGrapes, null, 1, 245, 35);
    this.mFoodSet.addToSet(this.food3);
    this.food1 = new Food(this.kBlueberry, null, 3, 245, 25);
    this.mFoodSet.addToSet(this.food1);
    this.food0 = new Food(this.kStrawberry, null, 0, 245, 15);
    this.mFoodSet.addToSet(this.food0);
    for(var i=0; i<this.mFoodSet.size(); i++){
        this.mFoodSet.getObjectAt(i).getRenderable().addLight(this.mLightSet.getLightAt(1));
        this.mFoodSet.getObjectAt(i).getRenderable().addLight(this.mLightSet.getLightAt(2));
    }
    //static obstacles
    var obstacles = new StaticObj(this.kTile, null, 30, 50);
    obstacles.getXform().setSize(8, 8);
    this.mStaticObjSet.addToSet(obstacles);
    obstacles = new StaticObj(this.kBuilding1, null, 50, 15);
    obstacles.getXform().setSize(15, 30);
    this.mStaticObjSet.addToSet(obstacles);
    obstacles = new StaticObj(this.kBuilding2, null, 80, 10);
    obstacles.getXform().setSize(10, 20);
    this.mStaticObjSet.addToSet(obstacles);
    obstacles = new StaticObj(this.kBuilding3, null, 100, 10);
    obstacles.getXform().setSize(15, 30);
    this.mStaticObjSet.addToSet(obstacles);
    obstacles = new StaticObj(this.kTile, null, 120, 40);
    obstacles.getXform().setSize(6, 6);
    this.mStaticObjSet.addToSet(obstacles);
    obstacles = new StaticObj(this.kTile, null, 140, 20);
    obstacles.getXform().setSize(8, 8);
    this.mStaticObjSet.addToSet(obstacles);
    obstacles = new StaticObj(this.kBuilding, null, 180, 10);
    obstacles.getXform().setSize(15, 30);
    this.mStaticObjSet.addToSet(obstacles);
    obstacles = new StaticObj(this.kSpider, null, 180, 55);
    obstacles.getXform().setSize(8, 15);
    this.mStaticObjSet.addToSet(obstacles);
    for(var i=0; i<this.mStaticObjSet.size(); i++){
        this.mStaticObjSet.getObjectAt(i).getRenderable().addLight(this.mLightSet.getLightAt(1));
        this.mStaticObjSet.getObjectAt(i).getRenderable().addLight(this.mLightSet.getLightAt(2));
    }
};
// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
LevelThree.prototype.update = function () {
    MyGame.prototype.update.call(this);
    
    //Light position
    var bx = this.mBalloon.getXform().getXPos();
    var by = this.mBalloon.getXform().getYPos();
    this.mLightSet.getLightAt(2).setXPos(bx);
    this.mLightSet.getLightAt(2).setYPos(by-3);
    this.mLightSet.getLightAt(0).setXPos(bx);
    this.mLightSet.getLightAt(0).setYPos(by);
    
    //Light Directioin
    this.mLightSet.getLightAt(2).setDirection([this.mCamera.mouseWCX()-bx, this.mCamera.mouseWCY()-by, 0]);
};

LevelThree.prototype.LevelWin = function(){
    
    gEngine.ResourceMap.storeAsset(LastScore, this.mScore);
    
    this.nextLevel = new LevelTwo();
    gEngine.GameLoop.stop();
};