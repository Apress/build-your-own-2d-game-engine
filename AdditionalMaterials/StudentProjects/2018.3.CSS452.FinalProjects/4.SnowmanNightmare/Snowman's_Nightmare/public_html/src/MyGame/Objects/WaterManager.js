/*jslint node: true, vars: true */
/*global gEngine, GameObject, LightRenderable, IllumRenderable, HelperFunctions, SpriteAnimateRenderable, Manager, Water */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function WaterManager(spriteTexture) {
    
    this.spriteSize = 64;
    this.numberOfSegments = 0;
    this.maxNumOfSegments = 9;
    this.timer = 0;
    this.timingAmount = 1;
    this.reset = false;
    
    Manager.call(this, spriteTexture, Water, 0, 0, 0, false);
    
    //the tongue tip is not counted in the number of segment
    this._placeObject(this.spriteSize, 120, 120);
    this.getObjectAt(0).setPiece(0);

}
gEngine.Core.inheritPrototype(WaterManager, Manager);

WaterManager.prototype.extend = function () {
        
    if(this.numberOfSegments < this.maxNumOfSegments){
        
        if(this.timer >= this.timingAmount){
            this.numberOfSegments++;
            this._placeObject(this.spriteSize, 50, 50);
            this.timer = 0;
        }else{
            this.timer++;
        }
    }
    
};

WaterManager.prototype.retract = function () {
    
    if(this.numberOfSegments > 0){
        
        this.removeObjectAt(1);
        this.numberOfSegments--;
        
    }
    
};

WaterManager.prototype.update = function () {
    
    Manager.prototype.update.call(this);
    if(this.numberOfSegments < this.maxNumOfSegments && gEngine.Input.isKeyPressed(gEngine.Input.keys.Space) && !this.reset){
        if(this.numberOfSegments === 0) {
                    gEngine.AudioClips.playACue("assets/sounds/water.wav");

        }
        this.extend();
    }else if(this.numberOfSegments === this.maxNumOfSegments){
        this.reset = true;
    }
    
    if(this.reset){
        this.retract();
        if(this.numberOfSegments === 0)
            this.reset = false;
    }else if(!gEngine.Input.isKeyPressed(gEngine.Input.keys.Space)){
        this.retract();
    }
    
};

WaterManager.prototype.updatePosition = function (pos, direction) {
    
    var obj = null;
    
    for(var i = 0; i < this.size(); i++){
        obj = this.getObjectAt(this.size() - 1 - i);
        
        var divisor = 2.2;
        var offset = this.spriteSize / 2;

        if(direction === 0)
            obj.getXform().setPosition(pos[0] - (i * this.spriteSize / divisor) - offset + 16, pos[1] + (i * this.spriteSize / divisor) + offset);
        
        if(direction === 1)
            obj.getXform().setPosition(pos[0] + (i * this.spriteSize / divisor) + offset, pos[1] + (i * this.spriteSize / divisor) + offset);
        
        if(direction === 2)
            obj.getXform().setPosition(pos[0] + i+ offset, pos[1] + i+ offset);
        
        obj.setDirection(direction);
    }
};

WaterManager.prototype.draw = function (camera) {
    
    if(this.size() > 1){
        this.getObjectAt(0).setVisibility(true);
        Manager.prototype.draw.call(this, camera);
    }else{
        this.getObjectAt(0).setVisibility(false);
    }
};



