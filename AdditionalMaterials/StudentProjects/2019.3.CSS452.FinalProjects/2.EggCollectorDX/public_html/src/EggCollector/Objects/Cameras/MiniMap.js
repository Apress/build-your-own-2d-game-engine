"use strict";

// May have to set the viewport to nothing to hide it.

function MiniMap (cameraPosition, cameraWidth, viewportSpecs, bound) {
    this.cHiddenViewportSpec = [0, 0, 0, 0];
    
    Camera.call(this, cameraPosition, cameraWidth, viewportSpecs, bound);
    
//    this.mShownPosition = cameraPosition;
//    this.mShownWidth = cameraWidth;
    this.mShownViewportSpecs = viewportSpecs;
}

gEngine.Core.inheritPrototype(MiniMap, Camera);

MiniMap.prototype.show = function () {
    Camera.prototype.setViewport.call(this, this.mShownViewportSpecs);
};

MiniMap.prototype.hide = function () {
    Camera.prototype.setViewport.call(this, this.cHiddenViewportSpec);
};
