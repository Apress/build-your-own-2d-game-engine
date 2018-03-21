/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* global gEngine, GameObjectSet */


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
function BGController(sceneLoader){    
    
    /*
     * 背景列表
     */
    this.mBackgrounds = [];
    
    this.mSceneLoader = sceneLoader;
    for(var i = 1; i <= this.mSceneLoader.GetNumber("BG_Num");i++){
        for(var k = 0; k < 2; k++){
            var bg = sceneLoader.LoadBG("BG_" + i);
            if(k === 0) bg.getXform().setPosition(0,0);
            else bg.getXform().setPosition(bg.getXform().getWidth(),0);
            
            this.mBackgrounds.push(bg);
        }
    }
}


BGController.prototype.update = function(){
   
    for(var i = 0; i < this.mSceneLoader.GetNumber("BG_Num") * 2;i += 2){
        for(var k = 0; k < 2; k++){
            if(this.mBackgrounds[i + k].getXform().getXPos() < -this.mBackgrounds[i + k].getXform().getWidth()) this.mBackgrounds[i+k].getXform().setXPos(this.mBackgrounds[i + k].getXform().getWidth() - 0.5);
            
            this.mBackgrounds[i + k].getXform().setXPos(this.mBackgrounds[i+k].getXform().getXPos() - 0.02 * (i + 1));
        }
    }

    for(var i = 0 ; i < this.mBackgrounds.length ; i++){
        if(this.mBackgrounds[i])
            this.mBackgrounds[i].update();
    }
};

BGController.prototype.draw = function (aCamera) {
    for(var i = 0 ; i < this.mBackgrounds.length ; i++){
        if(this.mBackgrounds[i])
            this.mBackgrounds[i].draw(aCamera);
    }
};