/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global MyGam, Light */


MyGame.prototype.LoadLevel1= function(){
    
    //Set Level Time
    this.LevelTime=120;
    this.TimeLeft=this.LevelTime;
    
    
    
    //creating jumps and objects
    
    //two slopes for testing
    var slope = new Wall(this.kWallTexture, 50,10, -10, 2);
    slope.getXform().setRotationInDegree(-8);
    this.mObjects.addToSet(slope);


    
    //jump number one, flat piece
    var xy =this.createJump(0,0,300,0,0,0,1);
    
      var mEnemy=null;
      var mWall=null;
      
    //adding enemies spaced out
    var i =0;
      for(i=0; i<5; i++){
          // (scene, spriteTexture, atX, atY, w, h)
        mEnemy = new Enemy_Seal(this, this.kMinionSprite, 50+100*i, 0, 16, 16);
        this.mObjects.addToSet(mEnemy);
        this.mNonWalls.addToSet(mEnemy);
     }
    
    
    //adding breakable walls spaced out
     for(i=0; i<5; i++){
        mWall = new Wall(this.kWallTexture, 10,50-i*3, 250+100*i, 2, true);
        this.mObjects.addToSet(mWall);
     }

    
        mWall = new Wall(this.kWallTexture, 10, 400, xy[0]+250,xy[1]+100, true);
        this.mObjects.addToSet(mWall);
    
    //2nd jump, 
    var xy =this.createJump(xy[0]+200,xy[1]-45,200,300,-5,-45,5);
    
    mWall = new Wall(this.kWallTexture, 10, 400, xy[0]+250,xy[1]+100, true);
    this.mObjects.addToSet(mWall);
        
    this.coin1 = new SardineCoin(this, this.kSardine, xy[0]+250, xy[1]+100, 5, 5, this.mHero); 
    this.mObjects.addToSet(this.coin1);
    
    //3rd jump
    var xy =this.createJump(xy[0]+200,xy[1],200,300,-5,-35,5);
    
            mWall = new Wall(this.kWallTexture, 10, 400, xy[0]+250,xy[1]+100, true);
        this.mObjects.addToSet(mWall);
        
            this.coin2 = new SardineCoin(this, this.kSardine, xy[0]+250, xy[1]+120, 5, 5, this.mHero); 
    this.mObjects.addToSet(this.coin2);
    
    //4th jump
    var xy =this.createJump(xy[0]+200,xy[1],150,400,-5,-35,5);
    
            mWall = new Wall(this.kWallTexture, 10, 400, xy[0]+250,xy[1]+100, true);
        this.mObjects.addToSet(mWall);
    
    this.mEnemy5 = new Enemy_Pelican(this.kPelicanSprite, xy[0]+300, xy[1]+10, 15, 10, this.mHero);
    this.mObjects.addToSet(this.mEnemy5);
    this.mNonWalls.addToSet(this.mEnemy5);
    
    //5th jump flat ish final piece
    var xy =this.createJump(xy[0]+200,xy[1],300,500,-0,-10,1);
    
    this.mEnemy6 = new Enemy_Pelican(this.kPelicanSprite, xy[0], xy[1], 15, 10, this.mHero);
    this.mObjects.addToSet(this.mEnemy6);
    this.mNonWalls.addToSet(this.mEnemy6);
    
    //Create the princess Platform
    var plat = new pPlatform(this.kWallTexture, 30,10, xy[0], xy[1], false);

    this.mObjects.addToSet(plat);
    
    //extra coin
                this.coin3 = new SardineCoin(this, this.kSardine, xy[0]+100, xy[1], 5, 5, this.mHero); 
    this.mObjects.addToSet(this.coin3);
    
    
    
    //this.wallB = new Wall(this.kWallTexture, 10, 30, 0, 0, true);
    //this.mObjects.addToSet(this.wallB);
    
    
    //creating light sources
    var light = new Light();
    light.setLightType(Light.eLightType.eDirectionalLight);
    light.setFar(1000);
    light.setColor([.5,.5,1,1]);
    light.setXPos(0);
    light.setYPos(0);
    light.setZPos(20);
  
    for(var i=0; i<this.mObjects.size(); i++){
        if(this.mObjects.getObjectAt(i).getRenderable() instanceof LightRenderable){
            this.mObjects.getObjectAt(i).getRenderable().addLight(light);
        }
    }
    
    // (bg, bg_normal, x, y, w, h, bgH, bgW, camera, minicamera, lightSet)
    this.LoadBackground(this.kBgGround, this.kBgGroundNM, 0, 25, 256, 512, 2048, 4096, this.mCamera, this.mMini, [light]);

};