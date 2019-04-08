/* global gEngine */

"use strict";

function MousePlatforms(set,camera){
    this.mPlatSet = set;
    this.mCamera = camera;
    this.kPlatformTexture = "assets/RigidShape/Wood.png";
    this.mWidth = 10;
    this.mHeight = 6;
    this.mPlatformsLeft = 0;
    this.mPickups = [];
    this.kPickupSound = "assets/sounds/PickupSound.wav";
    this.mMsg = new UIText("Platforms Left: "+this.mPlatformsLeft,[180,750],3.5,1,0,[1,1,1,1]);
}

MousePlatforms.prototype.update = function(player){
    var i=0;
    for(i=0;i<this.mPickups.length;i++){
        if(this.mPickups[i].checkColl(player)){
            this.mPickups.splice(i,1);
            this.incPlats();
            gEngine.AudioClips.playACue(this.kPickupSound);
            break;
        }
    }
    if(this.mPlatformsLeft>0){
        if(this.mCamera.isMouseInViewport()){
            if(gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Left)){
                var x = this.mCamera.mouseWCX();
                var y = this.mCamera.mouseWCY();
                var r = new LevelRenderable(this.kPlatformTexture);
                r.setColor([0.9,0.8,0.8,0]);
                var xF = r.getXform();
                xF.setSize(this.mWidth,this.mHeight);
                xF.setPosition(x,y);
                var g = new GameObject(r);
                var rig = new RigidRectangle(xF,this.mWidth,this.mHeight);
                rig.setMass(0);
                g.setRigidBody(rig);
                this.mPlatSet.addToSet(g);
                this.mPlatformsLeft--;
            }
        }
    }
    this.mMsg.setText("Platforms Left: "+ this.mPlatformsLeft);
};

MousePlatforms.prototype.incPlats = function(){this.mPlatformsLeft++;};
MousePlatforms.prototype.draw = function(){
    this.mMsg.draw(this.mCamera);
    var i=0;
    for(i=0;i<this.mPickups.length;i++){
        this.mPickups[i].draw(this.mCamera);
    }
};
MousePlatforms.prototype.addPickup = function(pickup){
    this.mPickups.push(pickup);
};
