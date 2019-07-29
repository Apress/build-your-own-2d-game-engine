
"use strict";  // Operate in Strict mode such that variables must be declared before used!

function HealthUI(spriteTexture,Xpos,Ypos) {
    this.kWidth = 5;
    this.kHeight = 5;
    
    this.mHealthUI = new SpriteRenderable(spriteTexture);
    this.mHealthUI.getXform().setPosition(Xpos,Ypos);
    this.mHealthUI.getXform().setSize(this.kWidth, this.kHeight);
    this.mHealthUI.setColor([0, 0, 0, 0]);
    this.mHealthUI.setElementPixelPositions(1314, 1500, 868, 1048);
    GameObject.call(this,this.mHealthUI);
    
}
gEngine.Core.inheritPrototype(HealthUI, GameObject);