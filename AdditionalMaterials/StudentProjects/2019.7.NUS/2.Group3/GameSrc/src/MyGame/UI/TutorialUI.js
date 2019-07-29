"use strict";  // Operate in Strict mode such that variables must be declared before used!

function TutorialUI(spriteTexture,camera) {
    this.spriteTexture=spriteTexture;
    this.mCamera=camera;
    this.display = false;
    this.mTutorial = new SpriteRenderable(this.spriteTexture);
    this.mTutorial.setColor([1,1,1, 0]);
    this.mTutorial.getXform().setPosition(-15.5, -10);
    this.mTutorial.getXform().setSize(140,84);
    this.mTutorial.setElementPixelPositions(0, 2047, 0, 1180);
}

TutorialUI.prototype.draw=function(){
    this.mTutorial.draw(this.mCamera);
};

TutorialUI.prototype.update=function(){
    if(gEngine.Input.isAnyKeyClicked()){
        this.display = false;
    }
    
};
