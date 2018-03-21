"use strict";  // Operate in Strict mode such that variables must be declared before used!

function LevelOne() {
    MyGame.call(this);
    this.level = 1;
}
gEngine.Core.inheritPrototype(LevelOne, MyGame);

LevelOne.prototype.initialize = function () {
    
    //gEngine.ResourceMap.storeAsset(gScore, this.mScore);
    
    MyGame.prototype.initialize.call(this);
    
    gEngine.AudioClips.playBackgroundAudio(this.kBgClip);
    this.mStatus = 0;
    this.mScore = 0;
    
    var msg0 = "Level 1";
    this.mMsg0.setText(msg0);
    var msg1 = "Energy: 100/100";
    this.mMsg1.setText(msg1);
    var msg2 = "Score: 0";
    this.mMsg2.setText(msg2);
     // Start 
     this.mTurtle = new LightRenderable(this.kTurtle);
     this.mTurtle.setColor([0, 0, 0, 0]);
     this.mTurtle.getXform().setPosition(20, 5);
     this.mTurtle.getXform().setSize(20, 10);
     this.mTurtle.setElementPixelPositions(0, 256, 0, 128);
     this.mTurtle.addLight(this.mLightSet.getLightAt(1));
    
    //food
    var food3 = new Food(this.kGrapes, null, 1, 20, 45);
    this.mFoodSet.addToSet(food3);
    var food2 = new Food(this.kMango, null, 2, 30, 25);
    this.mFoodSet.addToSet(food2);
    var food1 = new Food(this.kBlueberry, null, 3, 35,35);
    this.mFoodSet.addToSet(food1);
    var food0 = new Food(this.kStrawberry, null, 0, 50, 10);
    this.mFoodSet.addToSet(food0);
    var food3 = new Food(this.kGrapes, null, 1, 52, 25);
    this.mFoodSet.addToSet(food3);
    var food1 = new Food(this.kBlueberry, null, 3, 60, 40);
    this.mFoodSet.addToSet(food1);
    var food2 = new Food(this.kMango, null, 2, 85, 10);
    this.mFoodSet.addToSet(food2);
    var food0 = new Food(this.kStrawberry, null, 0, 88, 55);
    this.mFoodSet.addToSet(food0);
    var food3 = new Food(this.kGrapes, null, 1, 90, 30);
    this.mFoodSet.addToSet(food3);
    var food1 = new Food(this.kBlueberry, null, 3, 92, 45);
    this.mFoodSet.addToSet(food1);
    var food0 = new Food(this.kStrawberry, null, 0, 95, 15);
    this.mFoodSet.addToSet(food0);
    var food3 = new Food(this.kGrapes, null, 1, 100, 35);
    this.mFoodSet.addToSet(food3);
    var food0 = new Food(this.kStrawberry, null, 0, 120, 50);
    this.mFoodSet.addToSet(food0);
    var food1 = new Food(this.kBlueberry, null, 3, 140, 55);
    this.mFoodSet.addToSet(food1);
    var food2 = new Food(this.kMango, null, 2, 145, 15);
    this.mFoodSet.addToSet(food2);
    var food0 = new Food(this.kStrawberry, null, 0, 150, 35);
    this.mFoodSet.addToSet(food0);
    var food3 = new Food(this.kGrapes, null, 1, 160, 45);
    this.mFoodSet.addToSet(food3);
    var food0 = new Food(this.kStrawberry, null, 0, 165, 15);
    this.mFoodSet.addToSet(food0);
    var food1 = new Food(this.kBlueberry, null, 3, 170, 10);
    this.mFoodSet.addToSet(food1);
    var food2 = new Food(this.kMango, null, 2, 180, 45);
    this.mFoodSet.addToSet(food2);
    var food3 = new Food(this.kGrapes, null, 1, 187, 55);
    this.mFoodSet.addToSet(food3);
    var food0 = new Food(this.kStrawberry, null, 0, 195, 35);
    this.mFoodSet.addToSet(food0);
    var food2 = new Food(this.kMango, null, 2, 200, 50);
    this.mFoodSet.addToSet(food2);
    var food1 = new Food(this.kBlueberry, null, 3, 210, 15);
    this.mFoodSet.addToSet(food1);
    var food3 = new Food(this.kGrapes, null, 1, 230, 30);
    this.mFoodSet.addToSet(food3);
    var food2 = new Food(this.kMango, null, 2, 245, 20);
    this.mFoodSet.addToSet(food2);
    var food0 = new Food(this.kStrawberry, null, 0, 250, 45);
    this.mFoodSet.addToSet(food0);
    for(var i=0; i<this.mFoodSet.size(); i++)
        this.mFoodSet.getObjectAt(i).getRenderable().addLight(this.mLightSet.getLightAt(1));
    
    //static obstacles
    this.mStaticObjSet = new GameObjectSet();
//    var obstacles = new StaticObj(this.kSpider, null, 50, 55);
//    obstacles.mDye.getXform().setSize(10, 20);
//    this.mStaticObjSet.addToSet(obstacles);
    var obstacles = new StaticObj(this.kTree1, this.kTree1NM, 70, 10);
    obstacles.getXform().setSize(15, 20);
    this.mStaticObjSet.addToSet(obstacles);
    obstacles = new StaticObj(this.kTree1, this.kTree1NM, 120, 10);
    obstacles.mDye.getXform().setSize(25, 30);
    this.mStaticObjSet.addToSet(obstacles);
//    obstacles = new StaticObj(this.kSpider, null, 150, 55);
//    obstacles.mDye.getXform().setSize(10, 20);
//    this.mStaticObjSet.addToSet(obstacles);
    obstacles = new StaticObj(this.kTree1, this.kTree1NM, 200, 12);
    obstacles.mDye.getXform().setSize(20, 25);
    this.mStaticObjSet.addToSet(obstacles);

    var bird1 = new Chase(this.kBird1, null, 150, 50);
    this.mChaseSet.addToSet(bird1);

    var bird3 = new Free(this.kBird1, null, 60, 35);
    this.mFreeSet.addToSet(bird3);
    //var bird4 = new Free(this.kBird1, null, 120, 35);
    //this.mFreeSet.addToSet(bird4);

    var bird5 = new Free(this.kBird1, null, 140, 30);
    this.mFreeSet.addToSet(bird5);

    var bird2 = new Free(this.kBird1, null, 200, 35);
    this.mFreeSet.addToSet(bird2);
 

    for(var i = 0; i < this.mStaticObjSet.size(); i++)
        this.mStaticObjSet.getObjectAt(i).getRenderable().addLight(this.mLightSet.getLightAt(1));     
    
    for(var i=0; i<this.mChaseSet.size(); i++)
        this.mChaseSet.getObjectAt(i).getRenderable().addLight(this.mLightSet.getLightAt(1));
        
    for(var i=0; i<this.mFreeSet.size(); i++)
        this.mFreeSet.getObjectAt(i).getRenderable().addLight(this.mLightSet.getLightAt(1));
    
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
LevelOne.prototype.draw = function(){
    MyGame.prototype.draw.call(this);
   // this.mCamera.setupViewProjection();
    this.mTurtle.draw(this.mCamera);
};

/*LevelOne.prototype._drawMain = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    this.mCamera.setupViewProjection();
    this.mBg.draw(this.mCamera);
    this.mFoodSet.draw(this.mCamera);
    this.mMsg0.draw(this.mCamera);
    this.mMsg1.draw(this.mCamera);
    this.mMsg2.draw(this.mCamera);
    this.mStaticObjSet.draw(this.mCamera);
    this.mChaseSet.draw(this.mCamera);
    this.mFreeSet.draw(this.mCamera);
    this.mEnd.draw(this.mCamera);
    this.mBalloon.draw(this.mCamera);
    this.mCircle.draw(this.mCamera);
    this.mSignSet.draw(this.mCamera);
    
    
};
LevelOne.prototype._drawMap = function(){
    if(this.ShowMapCam){
        this.mMapCam.setupViewProjection();
        this.mBg.draw(this.mMapCam);
        this.mInteractiveBound.draw(this.mMapCam);
        this.mStaticObjSet.draw(this.mMapCam);
        this.mBalloon.draw(this.mMapCam);
    }
};*/

LevelOne.prototype.LevelWin = function(){
    
   
    gEngine.ResourceMap.storeAsset(LastScore, this.mScore);
    
    this.nextLevel = new LevelThree();
    gEngine.GameLoop.stop();
};

