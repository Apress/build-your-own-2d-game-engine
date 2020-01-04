//The crosshair on the mouse

function Crosshair(spriteTexture,aCamera) {
    SpriteRenderable.call(this,spriteTexture);
    this.setColor([0,0,0,1]);
    this.getXform().setSize(6,6);
    this.getXform().setPosition(aCamera.mouseWCX(),aCamera.mouseWCY());
    this.setElementPixelPositions(0,64,448,512);
    this.mCamera = aCamera;

}
gEngine.Core.inheritPrototype(Crosshair,SpriteRenderable);

Crosshair.prototype.update = function () {
    this.getXform().setPosition(this.mCamera.mouseWCX(), this.mCamera.mouseWCY());
}

