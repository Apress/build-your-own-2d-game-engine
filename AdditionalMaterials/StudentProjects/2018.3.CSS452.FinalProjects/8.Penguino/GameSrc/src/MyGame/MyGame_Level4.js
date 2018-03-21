/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global MyGam, Light */


MyGame.prototype.LoadLevel4= function(){
    
    //Set Level Time
    this.LevelTime=120;
    this.TimeLeft=this.LevelTime;
    
    
    
    //creating jumps and objects
    var slope = new Wall(this.kWallTexture, 50,10, -10, 2);
    slope.getXform().setRotationInDegree(-8);
    this.mObjects.addToSet(slope);

    var slope2 = new Wall(this.kWallTexture, 90,10, 70, 2);
    slope2.getXform().setRotationInDegree(55);
    this.mObjects.addToSet(slope2);

    //first platform
    var xy =this.createJump(0,0,300,0,-8,-16,5);
    
      var mEnemy=0;
      var mWall=null;
      
    //adding enemies spaced out
    var i =0;
      for(i=0; i<9; i++){
        mEnemy = new Enemy_Seal(this, this.kMinionSprite, 50+20*i, 0, 10, 5);
        this.mObjects.addToSet(mEnemy);
        this.mNonWalls.addToSet(mEnemy);
     }
    
    
    //adding breakable walls spaced out
     for(i=0; i<5; i++){
        mWall = new Wall(this.kWallTexture, 10,50-i*3, 250+100*i, 2, true);
        this.mObjects.addToSet(mWall);
     }

    
        //mWall = new Wall(this.kWallTexture, 10, 400, xy[0]+250,xy[1]+100, true);
        //this.mObjects.addToSet(mWall);
    //2nd platform
    var xy =this.createJump(xy[0]-1000,xy[1]-45,200,300,-5,-45,15);
    
            //mWall = new Wall(this.kWallTexture, 10, 400, xy[0]+250,xy[1]+100, true);
       // this.mObjects.addToSet(mWall);
    
    var xy =this.createJump(xy[0]+200,xy[1],200,300,-5,-35,10,true);
    
            mWall = new Wall(this.kWallTexture, 10, 400, xy[0]+250,xy[1]+100, true);
        this.mObjects.addToSet(mWall);
    
    var xy =this.createJump(xy[0]+200,xy[1],150,400,-5,-35,10);
    
            mWall = new Wall(this.kWallTexture, 10, 400, xy[0]+250,xy[1]+100, true);
        this.mObjects.addToSet(mWall);
        
        mEnemy = new Enemy_Seal(this, this.kMinionSprite, xy[0]+275, xy[1]+150, 100, 50);
        this.mObjects.addToSet(mEnemy);
        this.mNonWalls.addToSet(mEnemy);
    
    
    var xy2 = this.createJump(xy[0]-20,xy[1]-100,300,500,-5,-50,5);
    
    //final flat plat
    xy = this.createJump(xy[0]+180,xy[1]-100,300,500,-0,-10,1);
    
    
    
    this.createJump(xy2[0]+200,xy2[1]+50,100,500,-15,-50,5);
    
    //Create the princess Platform
    var plat = new pPlatform(this.kWallTexture, 30,10, xy[0], xy[1], false);
        this.mObjects.addToSet(plat);
        
        
    //help to survive
        mWall = new Wall(this.kWallTexture, 300, 5, xy[0]+200,xy[1]-100, false);
        this.mObjects.addToSet(mWall);
        
                mWall = new Wall(this.kWallTexture, 300, 5, xy[0]+300,xy[1]-85, false);
        this.mObjects.addToSet(mWall);
        
                        mWall = new Wall(this.kWallTexture, 300, 5, xy[0]+350,xy[1]-70, false);
        this.mObjects.addToSet(mWall);
        
                        mWall = new Wall(this.kWallTexture, 300, 5, xy[0]+400,xy[1]-55, false);
        this.mObjects.addToSet(mWall);
                                mWall = new Wall(this.kWallTexture, 10, 50, xy[0]+525,xy[1]-55, false);
        this.mObjects.addToSet(mWall);
        
                        mWall = new Wall(this.kWallTexture, 300, 5, xy[0]+300,xy[1]-40, false);
        this.mObjects.addToSet(mWall);
        
                        mWall = new Wall(this.kWallTexture, 300, 5, xy[0]+200,xy[1]-25, false);
        this.mObjects.addToSet(mWall);
                                mWall = new Wall(this.kWallTexture, 300, 5, xy[0]+150,xy[1]-10, false);
        this.mObjects.addToSet(mWall);
    
    

    
    
    
    //this.wallB = new Wall(this.kWallTexture, 10, 30, 0, 0, true);
    //this.mObjects.addToSet(this.wallB);
    
    
    //creating light sources
    var light = new Light();
    light.setLightType(Light.eLightType.eDirectionalLight);
    light.setFar(1000);
    light.setColor([.8,1.1,.8,1]);
    light.setXPos(0);
    light.setYPos(0);
    light.setZPos(20);
  
    for(var i=0; i<this.mObjects.size(); i++){
        if(this.mObjects.getObjectAt(i).getRenderable() instanceof LightRenderable){
            this.mObjects.getObjectAt(i).getRenderable().addLight(light);
        }
    }
    
    // (bg, bg_normal, x, y, w, h, bgH, bgW, camera, minicamera, lightSet)
    this.LoadBackground(this.kBgGround, this.kBgGroundNM, 0, -62, 256, 512, 2048, 4096, this.mCamera, this.mMini, [light]);

};