"use strict";  // Operate in Strict mode such that variables must be declared before used!

function AboutUI(spriteTexture,camera) {
    this.spriteTexture=spriteTexture;
    this.mCamera=camera;
    this.display = false;
    this.mAbout = new SpriteRenderable(this.spriteTexture);
    this.mAbout.setColor([1,1,1, 0]);
    this.mAbout.getXform().setPosition(-15.5, -10);
    this.mAbout.getXform().setSize(140,84);
    this.mAbout.setElementPixelPositions(0, 4095, 0, 2047);
}

AboutUI.prototype.draw=function(){
    this.mAbout.draw(this.mCamera);
};

AboutUI.prototype.update=function(){
    
    
};
