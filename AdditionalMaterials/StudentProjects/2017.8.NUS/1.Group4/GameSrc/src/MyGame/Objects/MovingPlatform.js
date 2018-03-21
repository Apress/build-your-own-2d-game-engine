/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* global Platform, gEngine */

function MovingPlatform(texture, atX, atY, width, height, moveType, moveSpeed, moveDistance) {
    this.moveSpeed = moveSpeed;
    this.moveDistance = moveDistance;
    this.moveType = moveType;
    this.originPos = [atX, atY];
    this.isMovingRight = true;
    this.isMovingUp = true;
    Platform.call(this, texture, atX, atY, width, height);
}
gEngine.Core.inheritPrototype(MovingPlatform, Platform);

MovingPlatform.prototype.update = function () {
    Platform.prototype.update.call(this);
    this.platformMove();
};
MovingPlatform.prototype.platformMove = function() {
    if (this.moveType === 0) {  //  Move horizontally
        this.movePingpong_X(this.moveDistance, this.moveSpeed);
    } else if (this.moveType === 1) {
        this.movePingpong_Y(this.moveDistance, this.moveSpeed);
    }
};
MovingPlatform.prototype.movePingpong_X = function (onewayDis, moveSpeed) {
    if(this.getXform().getXPos() - this.originPos[0] >= onewayDis) {
        this.isMovingRight = false;
    } else if (this.getXform().getXPos() - this.originPos[0] <= 0) {
        this.isMovingRight = true;
    }
    if(this.isMovingRight) {
        this.moveAlong_X(moveSpeed);
    } else{
        this.moveAlong_X(-1 * moveSpeed);
    }
};
MovingPlatform.prototype.movePingpong_Y = function (onewayDis, moveSpeed) {
    if(this.getXform().getYPos() - this.originPos[1] > onewayDis) {
        this.isMovingUp = false;
    } else if (this.getXform().getYPos() - this.originPos[1] <= 0){
        this.isMovingUp = true;
    }
    
    if(this.isMovingUp) {
        this.moveAlong_Y(moveSpeed);
    } else {
        this.moveAlong_Y(-1 * moveSpeed);
    }
};