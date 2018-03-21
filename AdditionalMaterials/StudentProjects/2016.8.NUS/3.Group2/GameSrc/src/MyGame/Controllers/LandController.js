/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* global gEngine, GameObjectSet, gManager */
/*
 * 
 * 
 * 
 * 
 * 
 * SmirkinDino
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */
function LandController(light){
    
    /*
     * 参数
     */
    this.mUpLands = [];
    this.mDownLands = [];
    this.kLandResdown = "assets/landdown.png";
    this.kLandResdownNormal = "assets/landdownnormal.png";
    this.kLandResup = "assets/landup.png";
    this.kLandResupNormal = "assets/landupnormal.png";
    
    this.kPerLandLength = 10;
    this.kPerLandHeight = 6;
    
    this.kUpPosY = 8;
    this.kDownPosY = -8;
    
    this.mMaxLandNum = 5;
    this.mLandSpeed = -0.2;
    
    
    
    
    
    
    
    
    
    /*
     * 初始化灯光
     */
    this.mLight = light;


    /*
     * 初始化地面
     */
    for(var i = 0 ; i < this.mMaxLandNum; i++){
        this.mUpLands[i] = new Way(new IllumRenderable(this.kLandResup,this.kLandResupNormal),this.mLight.getLight());
        this.mUpLands[i].getXform().setPosition(-gManager.DefaultOptions.FULL_SCREEN_WCWIDTH / 2 + this.kPerLandLength / 2 + this.kPerLandLength * i,this.kUpPosY);
        this.mUpLands[i].getXform().setSize(this.kPerLandLength,this.kPerLandHeight);
        gManager.ObjectPool.addObject(this.mUpLands[i],3);
        
        this.mDownLands[i] = new Way(new IllumRenderable(this.kLandResdown,this.kLandResdown),this.mLight.getLight());
        this.mDownLands[i].getXform().setPosition(-gManager.DefaultOptions.FULL_SCREEN_WCWIDTH / 2 + this.kPerLandLength / 2 + this.kPerLandLength * i,this.kDownPosY);
        this.mDownLands[i].getXform().setSize(this.kPerLandLength,this.kPerLandHeight);
        gManager.ObjectPool.addObject(this.mDownLands[i],3);
    }
};

LandController.prototype.update = function(){
    for(var i = 0 ; i < this.mMaxLandNum; i++){
        if(this.mUpLands[i].getXform().getXPos() <= -(gManager.DefaultOptions.FULL_SCREEN_WCWIDTH / 2 + this.kPerLandLength / 2))
            this.mUpLands[i].getXform().setPosition(gManager.DefaultOptions.FULL_SCREEN_WCWIDTH / 2 + this.kPerLandLength / 2 ,this.kUpPosY);
        if(this.mDownLands[i].getXform().getXPos() <= -(gManager.DefaultOptions.FULL_SCREEN_WCWIDTH / 2 + this.kPerLandLength / 2))
            this.mDownLands[i].getXform().setPosition(gManager.DefaultOptions.FULL_SCREEN_WCWIDTH / 2 + this.kPerLandLength / 2 ,this.kDownPosY);
        
        this.mUpLands[i].getXform().setXPos(this.mUpLands[i].getXform().getXPos() + this.mLandSpeed);
        this.mDownLands[i].getXform().setXPos(this.mDownLands[i].getXform().getXPos() + this.mLandSpeed);
    }
};

LandController.prototype.draw = function (aCamera) {
};

