
"use strict";  // Operate in Strict mode such that variables must be declared before used!

function ShadowManager(spriteTexture,camera) {
    this.kCamera = camera;
    this.kspriteTexture = spriteTexture;
    this.shadowDisplay = true;
    this.hahaShadow = new Shadow(this.kspriteTexture,[-47,-47,6,2]);
    
}

ShadowManager.prototype.HahaUpdate = function(hahaPos){
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Zero)){
        this.shadowDisplay = !this.shadowDisplay;
    }
    this.hahaShadow.update(hahaPos[0],hahaPos[1]-3);
};
ShadowManager.prototype.icecreamUpdate = function(){
   
};



ShadowManager.prototype.draw = function () {
    if(!this.shadowDisplay){
        return;
    }
    this.hahaShadow.draw(this.kCamera);
};