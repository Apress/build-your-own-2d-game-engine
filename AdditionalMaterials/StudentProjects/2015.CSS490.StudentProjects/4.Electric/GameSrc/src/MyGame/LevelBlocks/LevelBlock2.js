





MyGame.prototype.LevelBlock2 = function (offset) {
    var bg = new LightRenderable(this.kBgGreenLandBG);
    var BgXform = bg.getXform();
    BgXform.setPosition(80 + offset,60);
    BgXform.setSize(160,120);
    this.mBackGrouds.addToSet(bg);
    
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
    
    var i;
    for(i = 1; i<=16; i++){
        XLayerPos[i] += offset;
    }
    
    for(i = 1; i <= 16; i++){
        this.mPlatformFactory.newSimpleTexture('dirt','greenPlatforms',
                                                [XLayerPos[i],YLayerPos[2]]);
        this.mPlatformFactory.newSimpleTexture('dirt','greenPlatforms',
                                                [XLayerPos[i],YLayerPos[1]]);
//                                                
    }
    
    this.mPlatformFactory.newSimplePlatform('middleGreen','greenPlatforms',
                                                [XLayerPos[1],YLayerPos[3]]);
    this.mPlatformFactory.newSimplePlatform('middleGreen','greenPlatforms',
                                                [XLayerPos[2],YLayerPos[3]]);
                                                
    for(i = 3; i<=14; i++){
        this.mPlatformFactory.newSpikePlatform([XLayerPos[i],YLayerPos[3]]);
                                                
    } 
    
    this.mPlatformFactory.newSimplePlatform('middleGreen','greenPlatforms',
                                                [XLayerPos[15],YLayerPos[4]]);
    this.mPlatformFactory.newSimplePlatform('dirt','greenPlatforms',
                                                [XLayerPos[15],YLayerPos[3]]);                                                
    this.mPlatformFactory.newSimplePlatform('dirt','greenPlatforms',
                                                [XLayerPos[16],YLayerPos[3]]);
                                                
    this.mPlatformFactory.newSimplePlatform('plainBox','objects',
                                                [XLayerPos[4],YLayerPos[5]]);                                               
    this.mPlatformFactory.newSimplePlatform('plainBox','objects',
                                                [XLayerPos[6],YLayerPos[6]]);
    this.mPlatformFactory.newSimplePlatform('plainBox','objects',
                                                [XLayerPos[10],YLayerPos[7]]);
    this.mPlatformFactory.newSimplePlatform('plainBox','objects',
                                                [XLayerPos[13],YLayerPos[7]]);
                                                
    this.mPlatformFactory.newSimplePlatform('dirt','greenPlatforms',
                                                [XLayerPos[15],YLayerPos[4]]);
    this.mPlatformFactory.newSimplePlatform('middleGreen','greenPlatforms',
                                                [XLayerPos[15],YLayerPos[5]]);
    this.mPlatformFactory.newSimplePlatform('middleGreen','greenPlatforms',
                                                [XLayerPos[16],YLayerPos[4]]);                                                 
                                                
    this.mPlatformFactory.newAwardPlatform([XLayerPos[10],YLayerPos[10]]);                                                

    //this.mTorchSet.addToSet(this._initLights([XLayerPos[4],YLayerPos[5]+2]));
};


