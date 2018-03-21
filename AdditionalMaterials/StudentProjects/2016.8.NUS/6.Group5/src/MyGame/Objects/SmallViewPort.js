"use strict";

function SmallViewPort(){
    
    this.mCamera = null;
}

SmallViewPort.prototype.initialize = function(){
  
    this.mCamera = new Camera(
        vec2.fromValues(0.5*gWorldWidth, 0.5*gWorldHeight),
        gWorldWidth,
        [0.5*gViewWidth-128, 0, 256, 160]
        );
    
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);   
};

SmallViewPort.prototype.getCamera = function(){
    return this.mCamera;
};