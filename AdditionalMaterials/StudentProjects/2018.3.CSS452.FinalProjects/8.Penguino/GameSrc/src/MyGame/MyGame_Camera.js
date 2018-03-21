/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

MyGame.prototype.setCameraFollowTarget = function (obj)
{
  this.mCameraTarget = obj;
  this.mCameraFollow= true;
};

MyGame.prototype.setCameraFollow = function (enabled)
{
  this.mCameraFollow = enabled;
}

MyGame.prototype.updateCamera = function () {
    
    var ZOOM = 0.1;
    var PAN = 5;
    var FOLLOW_SPEED = 3;
    var SPEED_OFFSET = 0.3;
    
    this.mCamera.update();
    
    //zooms
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.One)) {
        if (this.mCamera.getWCWidth() > 100)
            this.mCamera.zoomBy(1-ZOOM);
    }
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Two)) {
        if (this.mCamera.getWCWidth() < 700)
            this.mCamera.zoomBy(1+ZOOM);
    }
    
    
    //pans 
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)) {
        this.mCamera.panBy(PAN, 0);
        this.setCameraFollow(false);
    }
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
        this.mCamera.panBy(-1*PAN, 0);
        this.setCameraFollow(false);
    }
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Up)) {
        this.mCamera.panBy(0, -1*PAN);
        this.setCameraFollow(false);
    }
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Down)) {
        this.mCamera.panBy(0, PAN);
        this.setCameraFollow(false);
    }

    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Zero)) {
        this.mCameraFollow ^= 1; // toggles camera following the target
    }
    
    // follow the target if there is one
    if(this.mCameraFollow && this.mCameraTarget != null)
    {
      var targetPos = [];
      var temp = this.mCameraTarget.getXform().getPosition();
      targetPos[0] = temp[0];
      targetPos[1] = temp[1];
      var targetVel = this.mCameraTarget.getRigidBody().getVelocity();
      
      if(Math.abs(targetVel[0] * SPEED_OFFSET) < 40)
        targetPos[0] += targetVel[0] * SPEED_OFFSET;
      else
        targetPos[0] += 40 * Math.sign(targetVel[0]);
    
      if(Math.abs(targetVel[1] * SPEED_OFFSET) < 30)
        targetPos[1] += targetVel[1] * SPEED_OFFSET;
      else
        targetPos[1] += 30 * Math.sign(targetVel[1]);
      
      var cameraPos = this.mCamera.getWCCenter();
      var dist = Math.sqrt( Math.pow(targetPos[0] - cameraPos[0], 2) +
                            Math.pow(targetPos[1] - cameraPos[1], 2) );

      if(dist <= FOLLOW_SPEED || true)
      {
        this.mCamera.panTo(targetPos[0], targetPos[1]);
      }
      else
      {
        this.mCamera.panBy((targetPos[0] - cameraPos[0]) * FOLLOW_SPEED / dist, 
                           (targetPos[1] - cameraPos[1]) * FOLLOW_SPEED / dist);
      }
    }
     
    this.mCamera.update();
};
