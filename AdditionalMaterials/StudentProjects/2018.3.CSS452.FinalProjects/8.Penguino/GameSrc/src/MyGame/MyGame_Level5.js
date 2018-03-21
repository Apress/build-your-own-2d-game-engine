/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global MyGam, Light */


MyGame.prototype.LoadLevel5= function(){
    
    //Set Level Time
    this.LevelTime=120;
    this.TimeLeft=this.LevelTime;
    
    
    
    var xy =this.createJump(0,0,100,0,-5,-20,10);
    
    xy =this.createJump(xy[0]+150, xy[1]-10,100,0,-5,-20,10);
    
    xy =this.createJump(xy[0]+350, xy[1]-10,100,0,-5,-30,10);
    
    xy =this.createJump(xy[0]+525, xy[1]-30,100,0,-5,-40,10);
    this.createJump(xy[0], xy[1],100,0,0,0,10);
    this.createJump(xy[0]+100, xy[1]+100,100,0,-5,-10,10);
    
    xy = this.createJump(xy[0]+400, xy[1]-300,1000,0,-5,-10,2);
    
    xy = this.createJump(xy[0]+500, xy[1]-100,500,0,-5,-10,10);
    
        var  mWall = new Wall(this.kWallTexture, 10, 200, xy[0], xy[1], true);
        this.mObjects.addToSet(mWall);
    
    xy = this.createJump(xy[0], xy[1]-200,1000,0,-5,-55,20);
    
        //Create the princess Platform
    var plat = new pPlatform(this.kWallTexture, 250,250, xy[0]+1050, xy[1]+550, false);
        this.mObjects.addToSet(plat);
    
    
    
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
    this.LoadBackground(this.kBgGround, this.kBgGroundNM, 0, -62, 256, 512, 2048, 4096, this.mCamera, this.mMini, [light]);

};