"use strict";

function PlatformPickup(x,y){
    this.mPickup = new Renderable();
    this.mPickup.setColor([.933,.921,.184,1]);
    this.mPickup.getXform().setPosition(x,y);
    this.mPickup.getXform().setSize(2,2);
}

PlatformPickup.prototype.checkColl = function(pl){
    var plx = pl.getXform();
    var pickX = this.mPickup.getXform();
    var pickBox = new BoundingBox(pickX.getPosition(),pickX.getWidth(),pickX.getHeight());
    var plBox = new BoundingBox(plx.getPosition(),plx.getWidth(),plx.getHeight());
    var status = plBox.boundCollideStatus(pickBox);
    if(status!==0){
        return true;
    }else{
        return false;
    }
};

PlatformPickup.prototype.draw = function(cam){
    this.mPickup.draw(cam);
};