/* File: DyePack.js 
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Fire(spriteTexture,player,IceCreamManager,mapManager) {
    this.kspeed = 1;
    this.kXsize = 2;
    this.kYsize = 2;
    this.kRotateValueByFrame = 1;
    
    this.kMapManager = mapManager;
    this.mPlayer = player;
    this.kdir = this.mPlayer.direction;
    this.ktheta = Math.PI / 4;
    this.mIceCreamManager = IceCreamManager;
    
    this.isDead = false;
    
    this.mFire = new SpriteRenderable(spriteTexture);
    this.mFire.setColor([0, 0, 1, 0.1]);
    this.mFire.getXform().setPosition(player.mPlayer.getXform().getXPos(),player.mPlayer.getXform().getYPos());
    this.mFire.getXform().setSize(this.kXsize, this.kYsize);
    this.mFire.setElementPixelPositions(640, 768, 256, 348);
    
    GameObject.call(this, this.mFire);
}
gEngine.Core.inheritPrototype(Fire, GameObject);

Fire.prototype.update = function(){
    var xform = this.mFire.getXform();
    xform.incRotationByDegree(this.kRotateValueByFrame);
    
    this._move(xform);
    
    if(!this.isDead){
        this._destroyTrap();
    }
    
};

Fire.prototype._move = function(xform){
    switch(this.kdir){
        case this.mPlayer.DirectionEnum.TOP:
            xform.incYPosBy(this.kspeed);   break;
        case this.mPlayer.DirectionEnum.TOPRIGHT:
            xform.incYPosBy(this.kspeed * Math.cos(this.ktheta));
            xform.incXPosBy(this.kspeed * Math.sin(this.ktheta));
            break;
        case this.mPlayer.DirectionEnum.RIGHT:
            xform.incXPosBy(this.kspeed);   break;
        case this.mPlayer.DirectionEnum.BOTTOMRIGHT:
            xform.incXPosBy(this.kspeed * Math.cos(this.ktheta));
            xform.incYPosBy(-this.kspeed * Math.sin(this.ktheta));
            break;
        case this.mPlayer.DirectionEnum.BOTTOM:
            xform.incYPosBy(-this.kspeed);  break;
        case this.mPlayer.DirectionEnum.BOTTOMLEFT:
            xform.incXPosBy(-this.kspeed * Math.cos(this.ktheta));
            xform.incYPosBy(-this.kspeed * Math.sin(this.ktheta));
            break;
        case this.mPlayer.DirectionEnum.LEFT:
            xform.incXPosBy(-this.kspeed);  break;
        case this.mPlayer.DirectionEnum.TOPLEFT:
            xform.incXPosBy(-this.kspeed * Math.cos(this.ktheta));
            xform.incYPosBy(this.kspeed * Math.sin(this.ktheta));
            break;
    }
};

Fire.prototype._destroyTrap = function(){
    var i,l;
    var this_xform = this.mFire.getXform();
//    console.log(this.mIceCreamManager === null);
    var arr = this.mIceCreamManager.mIceCreamArray;
    for(i=0;i<arr.length;i++){
        l = arr[i];
        if(l !== null){
            var ice_xform = l.mIceCream.getXform();
            if(ice_xform.getXPos() - l.kWidth / 2 <= this_xform.getXPos() && 
                this_xform.getXPos() <= ice_xform.getXPos() + l.kWidth / 2 &&
                ice_xform.getYPos() - l.kHeight / 2 <= this_xform.getYPos() && 
                this_xform.getYPos() <= ice_xform.getYPos() + l.kHeight / 2 && 
                l.mState === l.kStateEnum.FULL_MELT){
                this.kMapManager.MapArray[l.kXindex][l.kYindex].mHasIceCream = false;
                this.isDead = true;
                l = null;
                arr[i] = null;
            }
        }
    }
    
};
