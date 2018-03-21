/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


MyGame.prototype.LoadDemoLevel= function(){
    
    this.wall1 = new Wall(this.kWallTexture, 80, 10, 50, 10, false);
    this.wall2 = new Wall(this.kWallTexture, 80, 10, 90, 10, false);
    this.wall3 = new Wall(this.kWallTexture, 80, 10, 170, 10, false);
    this.wall4 = new Wall(this.kWallTexture, 80, 10, 250, 10, false);
    
    this.mObjects.addToSet(this.wall1);
    this.mObjects.addToSet(this.wall2);
    this.mObjects.addToSet(this.wall3);
    this.mObjects.addToSet(this.wall4);
    
    
    
    this.wallr1 = new Wall(this.kWallTexture, 80, 10, 300, 10, false);
    this.wallr2 = new Wall(this.kWallTexture, 680, 10, 480, -15, false);
    this.bbt = new Wall(this.kWallTexture, 10, 30, 450, -15, true);
    this.wallr3 = new Wall(this.kWallTexture, 80, 10, 460, -40, false);
    this.wallr4 = new Wall(this.kWallTexture, 80, 10, 540, -70, false);
    
    
    this.wallr1.getXform().setRotationInDegree(-15);
    this.wallr2.getXform().setRotationInDegree(0);
    this.wallr3.getXform().setRotationInDegree(-25);
    this.wallr4.getXform().setRotationInDegree(-30);
    
    /*
    
    this.wallr1.rotateVertices();
    this.wallr2.rotateVertices();
    this.wallr3.rotateVertices();
    this.wallr4.rotateVertices();
    */
    
    this.mObjects.addToSet(this.wallr1);
    this.mObjects.addToSet(this.wallr2);
    this.mObjects.addToSet(this.wallr3);
    this.mObjects.addToSet(this.wallr4);
    this.mObjects.addToSet(this.bbt);
    
      //this.mEnemy1 = new Enemy_Seal(this, this.kMinionSprite, 60, 37.5, 10, 5);
      this.mEnemy2 = new Enemy_Seal(this, this.kMinionSprite,570, 37.5, 10, 5);
      //this.mEnemy3 = new Enemy_Seal(this, this.kMinionSprite, 160, 37.5, 10, 5);
      //this.mEnemy4 = new Enemy_Seal(this, this.kMinionSprite, 260, 37.5, 10, 5);
      //this.mEnemy5 = new Enemy_Seal(this, this.kMinionSprite, 360, 37.5, 10, 5);
      
    
    this.mEnemy6 = new Enemy_Pelican(this.kPelicanSprite, 670, 30, 15, 10, this.mHero);
      
      //this.mObjects.addToSet(this.mEnemy1);
      this.mObjects.addToSet(this.mEnemy2);
      //this.mObjects.addToSet(this.mEnemy3);
      //this.mObjects.addToSet(this.mEnemy4);
      //this.mObjects.addToSet(this.mEnemy5);
      this.mObjects.addToSet(this.mEnemy6);
      
      //this.mNonWalls.addToSet(this.mEnemy1);
      this.mNonWalls.addToSet(this.mEnemy2);
      //this.mNonWalls.addToSet(this.mEnemy3);
      //this.mNonWalls.addToSet(this.mEnemy4);
      //this.mNonWalls.addToSet(this.mEnemy5);
      this.mNonWalls.addToSet(this.mEnemy6);
      
      
    this.wallr1a = new Wall(this.kWallTexture, 80, 10, 620, -110, false);
    this.wallr2a = new Wall(this.kWallTexture, 80, 10, 700, -170, false);
    this.wallr3a = new Wall(this.kWallTexture, 80, 10, 780, -210, false);
    this.wallr4a = new Wall(this.kWallTexture, 80, 10, 860, -260, false);
    
    
    this.wallr1a.getXform().setRotationInDegree(-45);
    this.wallr2a.getXform().setRotationInDegree(-55);
    this.wallr3a.getXform().setRotationInDegree(-25);
    this.wallr4a.getXform().setRotationInDegree(0);
    
    this.mObjects.addToSet(this.wallr1a);
    this.mObjects.addToSet(this.wallr2a);
    this.mObjects.addToSet(this.wallr3a);
    this.mObjects.addToSet(this.wallr4a);
    
    this.coin1 = new SardineCoin(this, this.kSardine, 770, 20, 5, 5, this.mHero);
    
    this.mObjects.addToSet(this.coin1);
      
    //this.createJump(-50,-50,300,300,-15,-75,25);
    
    //this.createJump(775,-375,100,300,-15,-75,15);
    
    //this.createJump(1100,-475,100,300,-5,-45,10);
    
    this.wallB = new Wall(this.kWallTexture, 10, 30, 5, 20, true);
    this.mObjects.addToSet(this.wallB);
    
    this.pp = new pPlatform(this.kWallTexture, 40,5, 870,20);
    this.mObjects.addToSet(this.pp);
    
    //Tutorial Messages
    
     this.mMessages = new GameObjectSet();
    
    var M3 = new FontRenderable("A: LEFT,  D: RIGHT,  SPACE: JUMP");
    M3.setColor([0,.4,.4,1]);
    M3.setTextHeight(3);
    M3.getXform().setPosition(0,42);
    
    this.mMessages.addToSet(M3);
    
    var M3 = new FontRenderable("J: SLIDE,  M: MUSIC ON/OFF");
    M3.setColor([0,.4,.4,1]);
    M3.setTextHeight(3);
    M3.getXform().setPosition(0,37);
    
    this.mMessages.addToSet(M3);
    
    var M3 = new FontRenderable("You can go faster when you slide, ");
    M3.setColor([0,.2,.5,1]);
    M3.setTextHeight(3);
    M3.getXform().setPosition(115,42);
    
    this.mMessages.addToSet(M3);
    
    var M3 = new FontRenderable("but you lose some control...");
    M3.setColor([0,.2,.5,1]);
    M3.setTextHeight(3);
    M3.getXform().setPosition(115,37);
    
    this.mMessages.addToSet(M3);
    
    var M3 = new FontRenderable("Moving quickly or on a slope, you will slide automatically");
    M3.setColor([1,0,0,1]);
    M3.setTextHeight(3);
    M3.getXform().setPosition(200,30);
    
    this.mMessages.addToSet(M3);
    
    var M3 = new FontRenderable("These walls will break");
    M3.setColor([0,1,0,1]);
    M3.setTextHeight(3);
    M3.getXform().setPosition(430,15);
    
    this.mMessages.addToSet(M3);
    
    var M3 = new FontRenderable("if you fall on them");
    M3.setColor([0,1,0,1]);
    M3.setTextHeight(3);
    M3.getXform().setPosition(430,10);
    
    this.mMessages.addToSet(M3);
    
    var M3 = new FontRenderable("or if you're going fast.");
    M3.setColor([0,1,0,1]);
    M3.setTextHeight(3);
    M3.getXform().setPosition(430,5);
    
    this.mMessages.addToSet(M3);
    
        var M3 = new FontRenderable("Seal agents of SKAR, will try to block your way");
    M3.setColor([1,0,0,1]);
    M3.setTextHeight(3);
    M3.getXform().setPosition(500,25);
    
    this.mMessages.addToSet(M3);


    var M3 = new FontRenderable("If you come too close, you will die...");
    M3.setColor([1,0,0,1]);
    M3.setTextHeight(3);
    M3.getXform().setPosition(500,20);
    
    this.mMessages.addToSet(M3);
    
    var M3 = new FontRenderable("... unless you jump on them, or move fast enough!");
    M3.setColor([1,0,0,1]);
    M3.setTextHeight(3);
    M3.getXform().setPosition(500,15);
    
    this.mMessages.addToSet(M3);

    var M3 = new FontRenderable("Pelicans will chase you if you come too close");
    M3.setColor([1,0,0,1]);
    M3.setTextHeight(3);
    M3.getXform().setPosition(630,-15);
    
    this.mMessages.addToSet(M3);
    
    
        var M3 = new FontRenderable("Collect Sardines for extra points");
    M3.setColor([0,1,0,1]);
    M3.setTextHeight(3);
    M3.getXform().setPosition(730,15);
    
    this.mMessages.addToSet(M3);
    
    var M3 = new FontRenderable("Finish the Level");
    M3.setColor([0,0,0,1]);
    M3.setTextHeight(3);
    M3.getXform().setPosition(855,20);
    
    this.mMessages.addToSet(M3);
    
    var M3 = new FontRenderable("Do not go here");
    M3.setColor([1,0,0,1]);
    M3.setTextHeight(3);
    M3.getXform().setPosition(-15,0);
    
    this.mMessages.addToSet(M3);
    
    
    
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
    this.LoadBackground(this.kBgGround, this.kBgGroundNM, 0, 14, 256, 512, 2048, 4096, this.mCamera, this.mMini, [light]);
};