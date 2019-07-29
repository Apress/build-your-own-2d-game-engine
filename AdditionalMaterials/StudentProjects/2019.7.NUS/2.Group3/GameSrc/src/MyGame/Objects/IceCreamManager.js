/* File: DyePack.js 
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function IceCreamManager(spriteTexture,camera,endlessPlayingScene,isEndless) {
    this.kIsEndless = isEndless;
    this.kEndlessPlayingScene = endlessPlayingScene;
    this.kDifficultCreatIceCreamCountEnum = {
        NO_DIFFICULT:1,
        HALF_DIFFICULT:3,
        FULL_DIFFICULT:5
    };
    this.kDifficultCreatIceCreamCountMaxEnum = {
        NO_DIFFICULT: 300,
        HALF_DIFFICULT: 240,
        FULL_DIFFICULT: 180
    };
    this.kspriteTexture = spriteTexture;
    this.kCamera = camera;
    this.mIceCreamArray = [];
    this.mCocoArray = [];
    this.kp_no_buff = 0.4;//the probability of no buff;
    this.kp_speed_up_buff = 0.7;
    this.kp_fire_buff = 1;
    
    this.createIceCreamCountMax = this.kDifficultCreatIceCreamCountMaxEnum.NO_DIFFICULT;//每5秒出现一个冰淇凌
    this.createIceCreamQuantity = this.kDifficultCreatIceCreamCountEnum.NO_DIFFICULT;//一次出现多少个冰淇凌
    
    this.createIceCreamCount = 0;
    this.isAutoCreate = true;
}

IceCreamManager.prototype.update = function (mapManager) {
//    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Z)){
//        this.createIceCream(mapManager);
////        console.log("update");
//    }
    
//    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.C)){
//        this.isAutoCreate = !this.isAutoCreate;
//        console.log("isAutoCreateIceCream: " + this.isAutoCreate);
//    }
    
    if(this.isAutoCreate){
        if(this.kIsEndless){
            this._changeDifficulty();
        }
        this.autoCreateIceCream(mapManager);
//        console.log(this.createIceCreamCount);
    }
    this.destroyIceCream(mapManager);
    this._updateIceCream();
    this._updateCoco();
    this._optimization(this.mIceCreamArray);
    this._optimization(this.mCocoArray);
    
};

IceCreamManager.prototype._changeDifficulty = function(){
    switch(this.kEndlessPlayingScene.difficultState){
        case this.kEndlessPlayingScene.kDifficultyEnum.NO_DIFFICULT:
            this.createIceCreamCountMax = this.kDifficultCreatIceCreamCountMaxEnum.NO_DIFFICULT;
            this.createIceCreamQuantity = this.kDifficultCreatIceCreamCountEnum.NO_DIFFICULT;
            break;
        case this.kEndlessPlayingScene.kDifficultyEnum.HALF_DIFFICULT:
            this.createIceCreamCountMax = this.kDifficultCreatIceCreamCountMaxEnum.HALF_DIFFICULT;
            this.createIceCreamQuantity = this.kDifficultCreatIceCreamCountEnum.HALF_DIFFICULT;
            break;
        case this.kEndlessPlayingScene.kDifficultyEnum.FULL_DIFFICULT:
            this.createIceCreamCountMax = this.kDifficultCreatIceCreamCountMaxEnum.FULL_DIFFICULT;
            this.createIceCreamQuantity = this.kDifficultCreatIceCreamCountEnum.FULL_DIFFICULT;
            break;
    }
};

IceCreamManager.prototype._updateIceCream = function(){
    var i,l;
    for(i=0;i<this.mIceCreamArray.length;i++){
        l = this.mIceCreamArray[i];
        if(l !== null){
            l.update();
            l.shadow.update(l.mIceCream.getXform().getXPos(),l.mTargetPositionY-2);
            if(l.arrow!==null){
//                console.log("update arrow");
                l.arrow.update(l.mIceCream.getXform().getXPos());
                if(l.mIceCream.getXform().getYPos()<30){
                    l.arrow=null;
                }
            }
        }
    }//update IceCream
};

IceCreamManager.prototype._updateCoco = function(){
    var i,l;
    for(i=0;i<this.mCocoArray.length;i++){
        if(this.mCocoArray[i] !== null && this.mCocoArray[i].mCoco.getXform().getYPos() > 200){
            this.mCocoArray[i].shadow = null;
            this.mCocoArray[i] = null;
        }
        l = this.mCocoArray[i];
        if(l !== null){
            l.update();
            l.shadow.update(l.mCoco.getXform().getXPos(),l.mCoco.getXform().getYPos()-25);
        }
    }//update Coco
};

IceCreamManager.prototype._optimization = function(array){
    var i = array.length - 1;
    while(array[i] === null){
        var temp = array.pop();
        temp = null;
        i--;
    }
    while(array[0] === null){
        var temp = array.shift();
        temp = null;
    }
};

IceCreamManager.prototype.autoCreateIceCream = function(mapManager){
    if(this.createIceCreamCount >= this.createIceCreamCountMax){
        if(this.kIsEndless){
            var i;
            for(i=0;i<this.createIceCreamQuantity;i++){
                this.createIceCream(mapManager);
            }
        }else{
            this.createIceCream(mapManager);
        }
        
        this.createIceCreamCount = 0;
    }else{
        this.createIceCreamCount++;
    }
};

IceCreamManager.prototype.destroyIceCream = function(mapManager){
    var i,l;
    for(i=0;i<this.mIceCreamArray.length;i++){
        l = this.mIceCreamArray[i];
        if(l !== null && l.isDead){
            mapManager.MapArray[l.kXindex][l.kYindex].mHasIceCream = false;
            this.mIceCreamArray[i] = null;
            l = null;
        }
    }
};

IceCreamManager.prototype.createIceCream = function(mapManager){
    var tmp_arr = [];
    var i,j,l;
    for(i=0;i<mapManager.kWidth;i++){
        for(j=0;j<mapManager.kHeight;j++){
            l = mapManager.MapArray[i][j];
            if(l.kTag === "Grass" && l.mHasIceCream === false){
                tmp_arr.push(l);
            }
        }
    }
    //在这里实现coco

    var buff = this.getBuff();
    var index = Math.floor(Math.random() * tmp_arr.length);
    
    if(tmp_arr.length !== 0){
        l = tmp_arr[index];
        
        l.mHasIceCream = true;
        var iceCream = new IceCream(this.kspriteTexture,l.kXindex,l.kYindex,buff,this.kIsEndless);
        if(iceCream.mIceCream.getXform().getYPos()>32){
//            console.log("create arrow");
            var iceCreamArrow=new IceCreamArrow(this.kspriteTexture,[iceCream.mIceCream.getXform().getXPos(),30,4,4]);
            iceCream.arrow=iceCreamArrow;
        }
        var mIcecreamShadow = new Shadow(this.kspriteTexture,[iceCream.mIceCream.getXform()[0],iceCream.mIceCream.getXform().getYPos()-21,6,2]);
        var mCoco = new Coco(this.kspriteTexture,iceCream);
        var mCocoShadow = new Shadow(this.kspriteTexture,[mCoco.getXform()[0],mCoco.getXform()[1]-20,10,2]);
        mCoco.shadow=mCocoShadow;
        mCocoShadow.mCoco=mCoco;
        iceCream.shadow=mIcecreamShadow;
        this.mCocoArray.push(mCoco);
        this.mIceCreamArray.push(iceCream);
        
    }
    
};

IceCreamManager.prototype.getBuff = function(){
    var ran = Math.random();
    if(0 <= ran && ran <= this.kp_no_buff){
        return 0;
    }else if(this.kp_no_buff <= ran && ran <= this.kp_speed_up_buff){
        return 1;
    }else if(this.kp_speed_up_buff <= ran && ran <= this.kp_fire_buff){
        return 2;
    }else{
        return this.getBuff();
    }
};

IceCreamManager.prototype.beforePlayerDraw = function(player){
    var i,l;
    for(i=0;i<this.mIceCreamArray.length;i++){
        l = this.mIceCreamArray[i];
        if(l !== null && l.mIceCream.getXform().getYPos() >= player.mPlayer.getXform().getYPos() - player.kCenterOffset && 
                l.kStateEnum.DROPING !== l.mState && l.kStateEnum.FLYING !== l.mState){
            l.shadow.draw(this.kCamera);
            l.draw(this.kCamera);
        }
    }
};

IceCreamManager.prototype.afterPlayerDraw = function(player){
    var i,l;
    for(i=0;i<this.mIceCreamArray.length;i++){
        l = this.mIceCreamArray[i];
        if(l !== null && (l.mIceCream.getXform().getYPos() < player.mPlayer.getXform().getYPos() - player.kCenterOffset 
                || l.kStateEnum.DROPING === l.mState || l.kStateEnum.FLYING === l.mState)){
            l.shadow.draw(this.kCamera);
            l.draw(this.kCamera);
        }
    }
    for(i=0;i<this.mCocoArray.length;i++){
        l = this.mCocoArray[i];
        if(l !== null){
            l.shadow.draw(this.kCamera);
            l.draw(this.kCamera);
        }
    }
    for(i=0;i<this.mIceCreamArray.length;i++){
        l = this.mIceCreamArray[i];
        if(l !== null){
            if(l.arrow!==null){
                l.arrow.draw(this.kCamera);
            }
        }
    }
};




