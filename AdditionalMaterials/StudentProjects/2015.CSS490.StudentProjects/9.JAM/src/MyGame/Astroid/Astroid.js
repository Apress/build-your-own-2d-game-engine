function Astroid(spriteTexture, normalMap, atX, atY) {
    var norm = new IllumRenderable(spriteTexture, normalMap);
    //var norm = new TextureRenderable(spriteTexture);
    this.mXSpeed = 0.1;
    this.mYSpeed = 0.05;
    this.mYCurrentSpeed = this.mYSpeed;
    norm.setElementPixelPositions(0, 512, 0, 512);

    norm.getXform().setPosition(-10, 10);
    norm.getXform().setSize(25, 25);
    norm.getXform().setZPos(10);
    GameObject.call(this, norm);
}
gEngine.Core.inheritPrototype(Astroid, GameObject);

Astroid.prototype._distToCam = function (aCamera) {
    return this.getXform().getXPos() - aCamera.getWCCenter()[0];
};

// float right and rotate
Astroid.prototype.update = function (aCamera) {
    this.getXform().setRotationInDegree(this.getXform().getRotationInDegree() + 1);
    this.getXform().setXPos(this.getXform().getXPos() + aCamera.getSpeed() + this.mXSpeed);
    this.getXform().setYPos(this.getXform().getYPos() + this.mYCurrentSpeed);
    if (this._distToCam(aCamera) > aCamera.getWCWidth()/2 + 30) {
        var cc = aCamera.getWCCenter();
        var cw = aCamera.getWCWidth();
        var ch = aCamera.getWCHeight();
        // -20 off camera
        this.getXform().setXPos(cc[0] - cw/2 - 20);
        // within height of camera
        var yPos = cc[1] - ch/2 + ch * Math.random();
        this.getXform().setYPos(yPos);
        if (yPos - ch/2 > 0) this.mYCurrentSpeed =  - this.mYSpeed * Math.random();
        else this.mYCurrentSpeed = this.mYSpeed * Math.random();
    }
};