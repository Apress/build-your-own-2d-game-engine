
"use strict";  // Operate in Strict mode such that variables must be declared before used!

function HealthUIManager(spriteTexture,camera,player) {
    this.kOriginX = -50;
    this.kOriginY = 28;
    this.kIntervalX = 5;
    this.mPlayer = player;
    this.kspriteTexture=spriteTexture;
    this.mCamera=camera;
    this.health = this.mPlayer.kHealth;
    
    this.healthUIArray = [];
    
}

HealthUIManager.prototype.update = function(){
    if(this.health - 1 === this.mPlayer.health){
        var l = this.healthUIArray.pop();
        this.health--;
        l = null;
    }
};

HealthUIManager.prototype.initialize = function(){
    var i;
    for(i=0;i<this.mPlayer.kHealth;i++){
        var healthUI = new HealthUI(this.kspriteTexture,this.kOriginX + i * this.kIntervalX,this.kOriginY);
        this.healthUIArray.push(healthUI);
    }
};

HealthUIManager.prototype.draw = function () {
    var i;
    for(i=0;i<this.healthUIArray.length;i++){
        this.healthUIArray[i].draw(this.mCamera);
    }
};