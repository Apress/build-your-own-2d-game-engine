/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


MyGame.prototype.LoadLevel2= function(){
    
    //Set Level Time
    this.LevelTime=120;
    this.TimeLeft=this.LevelTime;
    
    

    //creating jumps and objects
    
    //jump 1 flatish
    var xy =this.createJump(0,0,300,0,0,0,1);
    
      var mEnemy=0;
      var mWall=null;
      var i =0;
      for(i=0; i<10; i++){
        mEnemy = new Enemy_Seal(this, this.kMinionSprite, 50+20*i, 0, 10, 5);
        this.mObjects.addToSet(mEnemy);
        this.mNonWalls.addToSet(mEnemy);
     }
    
    
     for(i=0; i<6; i++){
        mWall = new Wall(this.kWallTexture, 50,10, 50+50*i, 15*i, false);
        this.mObjects.addToSet(mWall);
     }
     
        mWall = new Wall(this.kWallTexture, 50,10, 110+50*i, 20*i-30, false);
        this.mObjects.addToSet(mWall);
        
        this.coina = new SardineCoin(this, this.kSardine, 110+50*i, 20*i-30+5, 5, 5, this.mHero); 
        this.mObjects.addToSet(this.coina);
                this.coinb = new SardineCoin(this, this.kSardine, 110+50*i+5, 20*i-30+5, 5, 5, this.mHero); 
        this.mObjects.addToSet(this.coinb);
    
    
    //jump2
    var xy =this.createJump(xy[0]+200,xy[1]-45,200,300,-5,-45,5);
    
    
    //wall barrier
       mWall = new Wall(this.kWallTexture, 10,100, xy[0], xy[1], false);
        this.mObjects.addToSet(mWall);
        
        this.coin1 = new SardineCoin(this, this.kSardine, xy[0]+2, xy[1]+100, 5, 5, this.mHero); 
        this.mObjects.addToSet(this.coin1);
        
                this.coin1b = new SardineCoin(this, this.kSardine, xy[0]+2, xy[1]+150, 5, 5, this.mHero); 
        this.mObjects.addToSet(this.coin1b);
        
     //breakable platforms
        mWall = new Wall(this.kWallTexture, 20,80, xy[0]+25, xy[1], false);
        this.mObjects.addToSet(mWall);
       
        
               
        mWall = new Wall(this.kWallTexture, 20,80, xy[0]+50, xy[1], false);
        this.mObjects.addToSet(mWall);
        
        //brekable
        mWall = new Wall(this.kWallTexture, 20,80, xy[0] +75, xy[1], true);
        this.mObjects.addToSet(mWall);
        
                this.coin2 = new SardineCoin(this, this.kSardine, xy[0]+75, xy[1]+42, 5, 5, this.mHero); 
        this.mObjects.addToSet(this.coin2);
        
        
                mWall = new Wall(this.kWallTexture, 20,80, xy[0] +100, xy[1]-5, false);
        this.mObjects.addToSet(mWall);
                mWall = new Wall(this.kWallTexture, 20,80, xy[0] +125, xy[1]-10, true);
                
         this.coin3 = new SardineCoin(this, this.kSardine, xy[0]+125, xy[1]+40-8, 5, 5, this.mHero); 
        this.mObjects.addToSet(this.coin3);
                
                
        this.mObjects.addToSet(mWall);
        
                mWall = new Wall(this.kWallTexture, 20,80, xy[0] +150, xy[1]-15, false);
        this.mObjects.addToSet(mWall);
                        mWall = new Wall(this.kWallTexture, 20,80, xy[0] +175, xy[1]-20, true);
        this.mObjects.addToSet(mWall);
     
     
    //jump 3
    var xy =this.createJump(xy[0]+200,xy[1],200,300,-5,-35,5);
    
    //jump 4
    var xy =this.createJump(xy[0]+200,xy[1],150,400,-5,-35,5);
    
    //last part
    var xy =this.createJump(xy[0]+200,xy[1],300,500,-0,-10,1);
    
    //Create the princess Platform
    var plat = new pPlatform(this.kWallTexture, 30,10, xy[0], xy[1], false);

    this.mObjects.addToSet(plat);
    
    
    
    //this.wallB = new Wall(this.kWallTexture, 10, 30, 0, 0, true);
    //this.mObjects.addToSet(this.wallB);
    
    var lightSet = this.initLights();
    
    this.LoadBackground(this.kBgCave, this.kBgCaveNM, 0, 48, 512, 512, 1024, 1024, this.mCamera, this.mMini, lightSet);
    
};



MyGame.prototype.initLights= function(){
    //creating light sources
      var light = new Light();
    light.setLightType(Light.eLightType.eDirectionalLight);
    light.setFar(1000);
    light.setColor([-.5,-.5,-.5,1]);
    light.setXPos(0);
    light.setYPos(0);
    light.setZPos(20);
  
  for(var i=0; i<this.mObjects.size(); i++){
      if(this.mObjects.getObjectAt(i).getRenderable() instanceof LightRenderable){
              this.mObjects.getObjectAt(i).getRenderable().addLight(light);
        }
  }
  
  
  //this.spotlight
    this.spotlight = new Light();
    this.spotlight.setLightType(Light.eLightType.eSpotLight);
    this.spotlight.setNear(450);
    this.spotlight.setFar(900);
    this.spotlight.setColor([1,1,1,1]);
    this.spotlight.setXPos(0);
    this.spotlight.setYPos(0);
    this.spotlight.setZPos(200);
  
  for(var i=0; i<this.mObjects.size(); i++){
      if(this.mObjects.getObjectAt(i).getRenderable() instanceof LightRenderable){
              this.mObjects.getObjectAt(i).getRenderable().addLight(this.spotlight);
        }
  }
  
    //point light
    var light2 = new Light();
    light2.setLightType(Light.eLightType.ePointLight);
    light2.setFar(250);
    light2.setNear(40);
    light2.setColor([.5,0,0,1]);
    light2.setXPos(0);
    light2.setYPos(0);
    light2.setZPos(20);
  
  for(var i=0; i<this.mObjects.size(); i++){
      if(this.mObjects.getObjectAt(i).getRenderable() instanceof LightRenderable){
              this.mObjects.getObjectAt(i).getRenderable().addLight(light2);
        }
  }
  
  return [light, this.spotlight, light2];
  
};