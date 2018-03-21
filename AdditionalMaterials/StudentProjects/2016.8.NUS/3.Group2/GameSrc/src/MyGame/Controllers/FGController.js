/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global gMananger, gManager, vec2 */


/*
 * 
 * 
 * 
 * 
 * 
 * 
 * By 龚楚涵 (Dino) in Singapore
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */
function FGController(sceneLoader){    
    
    /*
     * 背景列表
     */
    this.mForegrounds = [];
    
    this.mSceneLoader = sceneLoader;
    
    this.mMaxParticleNumber = 30;
    
    this.mCurrentNum = 0;

    this.mParticlePath = sceneLoader.GetNode("FGP_1","Rp");
    
    this.mInterval = 8;
    
    this.mParticleLayer = 8;
    
    this.mReusePool = [];
    
}


FGController.prototype.update = function(){
    
    if(this.mInterval === 8 && this.mMaxParticleNumber > this.mReusePool.length){
        
        var par = new Snow(new TextureRenderable(this.mParticlePath));
        this._reset(par);
        
        this.mReusePool[this.mCurrentNum] = par;
        
        this.mInterval = 0;
        this.mCurrentNum++;
    }
    
    for(var i = 0 ; i < this.mReusePool.length;i++){
        var par = this.mReusePool[i];
        var trans  = par.getXform();
        trans.setPosition(trans.getXPos() - par.getspeed()[0],trans.getYPos() - par.getspeed()[1]);
        trans.incRotationByRad(par.getrotation());
        if(trans.getXPos() < -gManager.DefaultOptions.FULL_SCREEN_WCWIDTH / 2 || trans.getYPos() < -gManager.DefaultOptions.FULL_SCREEN_WCWIDTH / 2){
            this._reset(par);
        }
    }
    
    this.mInterval++;
};

FGController.prototype.draw = function (aCamera) {
    for(var i = 0 ; i < this.mReusePool.length;i++){
        var par = this.mReusePool[i];
        par.draw(aCamera);
    }
};

FGController.prototype._reset = function(par){
    par.getXform().setPosition(gManager.DefaultOptions.FULL_SCREEN_WCWIDTH / 2,
                                   10 + gManager.DefaultOptions.FULL_SCREEN_WCWIDTH / 4 * Math.random() - gManager.DefaultOptions.FULL_SCREEN_WCWIDTH / 2 * Math.random());
    var size = 0.2 + 0.8 * Math.random();
    par.getXform().setSize(size,size);          
    par.setspeed([0.15 + 0.15 * Math.random(),0.05 + 0.05 * Math.random()]);
    
    var rotation = 0.15 - 0.3 * Math.random();
    par.setrotation(rotation);
};