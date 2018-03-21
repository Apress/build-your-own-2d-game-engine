"use strict";  // Operate in Strict mode such that variables must be declared before used!

function LevelTwo() {
    MyGame.call(this);
    this.kBg = "assets/bg1.png";
    this.level = 3;

}
gEngine.Core.inheritPrototype(LevelTwo, MyGame);

LevelTwo.prototype.initialize = function () {
    MyGame.prototype.initialize.call(this);
    
    this.aSpeedCam = 0.25;
    this.kDecEnergy = 5;

    gEngine.AudioClips.playBackgroundAudio(this.kBgClip);
    
    if(gEngine.ResourceMap.isAssetLoaded(LastScore))
        this.mScore = gEngine.ResourceMap.retrieveAsset(LastScore);

    var msg0 = "Level 3";
    this.mMsg0.setText(msg0);
    
   for(var i=1; i<=5; i++)
    {
        for(var j=0; j<5; j++){
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
//food
       // this.food0 = new Food(this.kStrawberry, null, 0, 30, 10);
       // this.mFoodSet.addToSet(this.food0);
       // this.food1 = new Food(this.kBlueberry, null, 3, 60, 40);
       // this.mFoodSet.addToSet(this.food1);
       // this.food2 = new Food(this.kMango, null, 2, 80, 15);
       // this.mFoodSet.addToSet(this.food2);
       // this.food3 = new Food(this.kGrapes, null, 1, 40, 20);
       // this.mFoodSet.addToSet(this.food3);
       // this.food1 = new Food(this.kBlueberry, null, 3, 120, 35);
       // this.mFoodSet.addToSet(this.food1);
       // this.food0 = new Food(this.kStrawberry, null, 0, 135, 20);
       // this.mFoodSet.addToSet(this.food0);
       // this.food3 = new Food(this.kGrapes, null, 1, 130, 55);
       // this.mFoodSet.addToSet(this.food3);
       // this.food2 = new Food(this.kMango, null, 2, 150, 10);
       // this.mFoodSet.addToSet(this.food2);
       // this.food1 = new Food(this.kBlueberry, null, 3, 180, 25);
       // this.mFoodSet.addToSet(this.food1);
       // this.food3 = new Food(this.kGrapes, null, 1, 200, 50);
       // this.mFoodSet.addToSet(this.food3);
       // this.food0 = new Food(this.kStrawberry, null, 0, 230, 20);
       // this.mFoodSet.addToSet(this.food0);
       // this.food2 = new Food(this.kMango, null, 2, 240, 55);
       // this.mFoodSet.addToSet(this.food2);
      for(var i=0; i<this.mFoodSet.size(); i++)
        this.mFoodSet.getObjectAt(i).getRenderable().addLight(this.mLightSet.getLightAt(1));
    
//    var obstacles = new StaticObj(this.kTile, null, 40, 45);
//    obstacles.getXform().setSize(8, 8);
//    this.mStaticObjSet.addToSet(obstacles);

      obstacles = new StaticObj(this.kBuilding1, null, 160, 13);
      obstacles.getXform().setSize(13, 28);
      this.mStaticObjSet.addToSet(obstacles);
//    obstacles = new StaticObj(this.kSpider, null, 80, 55);
//    obstacles.getXform().setSize(8, 15);
//    this.mStaticObjSet.addToSet(obstacles);

      var obstacles = new StaticObj(this.kBuilding2, null, 100, 10);
      obstacles.getXform().setSize(15,30);
      this.mStaticObjSet.addToSet(obstacles);
//    obstacles = new StaticObj(this.kTile, null, 130, 40);
//    obstacles.getXform().setSize(8, 8);
//    this.mStaticObjSet.addToSet(obstacles);
//    obstacles = new StaticObj(this.kBuilding, null, 170, 10);
//    obstacles.getXform().setSize(15,30);
//    this.mStaticObjSet.addToSet(obstacles);
//        var obstacles = new StaticObj(this.kTile, null, 100, 15);
//        obstacles.getXform().setSize(8, 8);
//        this.mStaticObjSet.addToSet(obstacles);
//    var obstacles = new StaticObj(this.kBuilding3, null, 200, 15);
//    obstacles.getXform().setSize(20, 40);
//    this.mStaticObjSet.addToSet(obstacles);
    for(var i = 0; i < this.mStaticObjSet.size(); i++)
        this.mStaticObjSet.getObjectAt(i).getRenderable().addLight(this.mLightSet.getLightAt(1));   
    
    var bird1 = new Chase(this.kBird1, null, 130, 50);
    bird1.setSpeed(0.26);
    this.mChaseSet.addToSet(bird1);
    
    var bird2 = new Free(this.kBird1, null, 45, 30);
    bird2.setSpeed(0.05);
    this.mFreeSet.addToSet(bird2);
    
    var bird2 = new Free(this.kBird1, null, 60, 15);
    bird2.setSpeed(0.10);
    this.mFreeSet.addToSet(bird2);
    
    var bird2 = new Free(this.kBird1, null, 100, 30);
    bird2.setSpeed(0.15);
    this.mFreeSet.addToSet(bird2);

    var bird2 = new Free(this.kBird1, null, 140, 45);
    bird2.setSpeed(0.10);
    this.mFreeSet.addToSet(bird2);
    
    var bird2 = new Free(this.kBird1, null, 170, 45);
    bird2.setSpeed(0.15);
    this.mFreeSet.addToSet(bird2);
    
    var bird2 = new Free(this.kBird1, null, 200, 15);
    bird2.setSpeed(0.15);
    this.mFreeSet.addToSet(bird2);
    
    var bird2 = new Free(this.kBird1, null, 215, 40);
    bird2.setSpeed(0.05);
    this.mFreeSet.addToSet(bird2);
    
    var bird2 = new Free(this.kBird1, null, 220, 35);
    bird2.setSpeed(0.15);
    this.mFreeSet.addToSet(bird2);
    
    var bird2 = new Free(this.kBird1, null, 215, 40);
    bird2.setSpeed(0.05);
    this.mFreeSet.addToSet(bird2);
    
 
    for(var i=0; i<this.mChaseSet.size(); i++)
        this.mChaseSet.getObjectAt(i).getRenderable().addLight(this.mLightSet.getLightAt(1));
        
    for(var i=0; i<this.mFreeSet.size(); i++)
        this.mFreeSet.getObjectAt(i).getRenderable().addLight(this.mLightSet.getLightAt(1));
    
};


LevelTwo.prototype.LevelWin = function(){
    //gEngine.AudioClips.stopBackgroundAudio();
    //this.nextLevel = new GameWin();
    gEngine.ResourceMap.storeAsset(LastScore, this.mScore);
    
    this.nextLevel = new LevelFour();
    gEngine.GameLoop.stop();
};