"use strict";

function PlayerBird(texture, platforms, eggs, normal) {
   Bird.call(this, texture, platforms, eggs, normal);
   
   this.cCantGrabTime = 1000;
   this.mWasAttacked = false;
   this.mGrabbingTime = Date.now();
}
gEngine.Core.inheritPrototype(PlayerBird, Bird);

PlayerBird.prototype.attacked = function() {
    this.release();
    
    this.mWasAttacked = true;
    this.mGrabbingTime = Date.now() + this.cCantGrabTime;
};

PlayerBird.prototype.update = function() {
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W))
        this.up();
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S))
        this.down();
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A))
        this.left();
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D))
        this.right();
        
    if (this.mWasAttacked) {
        if (this.mGrabbingTime < Date.now()) {
            this.mWasAttacked = false;
        }
    }
        
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space) && !this.mWasAttacked) {
        this.grab();
    }
    if (gEngine.Input.isKeyReleased(gEngine.Input.keys.Space)) {
        this.release();
    }    
    Bird.prototype.update.call(this);
};