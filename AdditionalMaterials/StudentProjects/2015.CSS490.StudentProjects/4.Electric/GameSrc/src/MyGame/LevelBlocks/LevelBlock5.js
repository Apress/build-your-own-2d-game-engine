





MyGame.prototype.LevelBlock5 = function (offset) {
    var YLayerPos =[];
    YLayerPos[1] = 5;
    YLayerPos[2] = 15;
    YLayerPos[3] = 25;
    YLayerPos[4] = 35; //base ground layer
    YLayerPos[5] = 45;
    YLayerPos[6] = 55;
    YLayerPos[7] = 65;
    YLayerPos[8] = 75;
    YLayerPos[9] = 85;
    YLayerPos[10] = 95;
    YLayerPos[11] = 105;
    YLayerPos[12] = 115;
    
    var i;
    for(i = 1; i<=12; i++){
        YLayerPos[i] += offset;
    }

    var XLayerPos =[];
    XLayerPos[1] = 5;
    XLayerPos[2] = 15;
    XLayerPos[3] = 25;
    XLayerPos[4] = 35;
    XLayerPos[5] = 45;
    XLayerPos[6] = 55;
    XLayerPos[7] = 65;
    XLayerPos[8] = 75;
    XLayerPos[9] = 85;
    XLayerPos[10] = 95;
    XLayerPos[11] = 105;
    XLayerPos[12] = 115;
    XLayerPos[13] = 125;
    XLayerPos[14] = 135;
    XLayerPos[15] = 145;
    XLayerPos[16] = 155;
    
    for(i = 1; i<=16; i++){
        YLayerPos[i] += offset;
    }
    
    for(i = 0; i < 15; i++){
        this.mPlatformFactory.newSimplePlatform('middle','greenPlatforms',
                                                [XLayerPos[i],YLayerPos[4]]);
    }
    
//    this.mPlatformFactory.newBoxPlatform('!withBorder','objects',[10,this.kLayerPos[8]]);
//    this.mPlatformFactory.newBoxPlatform('plainBox','objects',[20,this.kLayerPos[8]]);
//    this.mPlatformFactory.newBoxPlatform('plainBox','objects',[30,this.kLayerPos[8]]);
//    this.mPlatformFactory.newSpikePlatform([xPos + 10,this.kLayerPos[3]]);
//    this.mPlatformFactory.newSpikePlatform([xPos + 20,this.kLayerPos[3]]);
//    this.mPlatformFactory.newAwardPlatform([60,this.kLayerPos[8]]);
//    
//    var e = new Enemy();
//    e.setHeroObject(this.mHero);
//    e.setPaceState([70, this.kLayerPos[5]]);
//    this.mEnemies.addToSet(e);
//    
//    var e = new Enemy();
//    e.setHeroObject(this.mHero);
//    e.setChaseState([this.kLayerPos[12], this.kLayerPos[8]]);
//    this.mEnemies.addToSet(e);

};


