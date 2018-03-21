"use strict";  // Operate in Strict mode such that variables must be declared before used!

function LevelFour() {
    MyGame.call(this);
    this.kBg = "assets/sky1.png";
    this.level = 4;
}
gEngine.Core.inheritPrototype(LevelFour, MyGame);


LevelFour.prototype.initialize = function () {
    
    MyGame.prototype.initialize.call(this);
    
    gEngine.AudioClips.playBackgroundAudio(this.kBgClip);
    
    this.mStar.getRenderable().addLight(this.mLightSet.getLightAt(2));
    
    this.kDecEnergy = 5;
    this.aSpeedCam = 0.25;
    this.mBalloon.maxFrontSpeed = 0.5;
    if(gEngine.ResourceMap.isAssetLoaded(LastScore))
        this.mScore = gEngine.ResourceMap.retrieveAsset(LastScore);
    
    var msg0 = "Level 4";
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
    
    var bird1 = new Chase(this.kBird1, null, 100, 50);
    bird1.setSpeed(0.2);
    this.mChaseSet.addToSet(bird1);
    
    var bird1 = new Chase(this.kBird1, null, 250, 50);
    bird1.setSpeed(0.2);
    this.mChaseSet.addToSet(bird1);

    var bird3 = new Free(this.kBird1, null, 230, 35);
    bird3.setSpeed(0.15);
    this.mFreeSet.addToSet(bird3);
    
    var bird4 = new Free(this.kBird1, null, 120, 35);
    bird4.setSpeed(0.15);
    this.mFreeSet.addToSet(bird4);

    var bird5 = new Free(this.kBird1, null, 240, 20);
    bird5.setSpeed(0.15);
    this.mFreeSet.addToSet(bird5);
    
    for(var i=0; i<this.mChaseSet.size(); i++){
        this.mChaseSet.getObjectAt(i).getRenderable().addLight(this.mLightSet.getLightAt(1));
        this.mChaseSet.getObjectAt(i).getRenderable().addLight(this.mLightSet.getLightAt(2));
        
    }
        
    for(var i=0; i<this.mFreeSet.size(); i++){
        this.mFreeSet.getObjectAt(i).getRenderable().addLight(this.mLightSet.getLightAt(1));
        this.mFreeSet.getObjectAt(i).getRenderable().addLight(this.mLightSet.getLightAt(2));
    }
        
    
    
 for(var i=1; i<=5; i++)
    {
        for(var j=0; j<6; j++){
            var type = Math.ceil(4*Math.random());
            var food;
            var px = 40*i + Math.random()*40;
            var py = 5 + Math.random()* 50;
            switch(type){
                case 0: 
                    food = new Food(this.kStrawberry, null, type, px, py);
                    break;
                case 1:
                    food = new Food(this.kGrapes, null, type, px, py);
                    break;
                case 2:
                    food = new Food(this.kMango, null, type, px, py);
                    break;
                case 3:
                    food = new Food(this.kBlueberry, null, type, px, py);
                    break;
                default:
                    food = new Food(this.kStrawberry, null, 0, px, py);
                    break;
            }
            this.mFoodSet.addToSet(food);
        }
      
    }
    for(var i=0; i<this.mFoodSet.size(); i++){
        this.mFoodSet.getObjectAt(i).getRenderable().addLight(this.mLightSet.getLightAt(1));
        this.mFoodSet.getObjectAt(i).getRenderable().addLight(this.mLightSet.getLightAt(2));
    }
    //static obstacles
    
    var obstacles = new StaticObj(this.kBuilding2, null, 120, 10);
    obstacles.getXform().setSize(10, 20);
    this.mStaticObjSet.addToSet(obstacles);
    obstacles = new StaticObj(this.kBuilding3, null, 150, 10);
    obstacles.getXform().setSize(15, 30);
    this.mStaticObjSet.addToSet(obstacles);
        
    obstacles = new StaticObj(this.kBuilding, null, 200, 10);
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
LevelFour.prototype.update = function () {
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

LevelFour.prototype.LevelWin = function(){
    
    gEngine.AudioClips.stopBackgroundAudio();
    this.nextLevel = new GameWin();
    
    gEngine.GameLoop.stop();
};