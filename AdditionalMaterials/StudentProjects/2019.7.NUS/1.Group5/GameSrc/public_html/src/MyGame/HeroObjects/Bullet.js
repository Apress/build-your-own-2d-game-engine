"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Bullet(spriteTexture, atX, atY, direction) {
    this.kWidth = 10;
    this.kHeight = 10;
    
    this.mIsDead = false;
    
    this.mBullet = new SpriteRenderable(spriteTexture);
    this.mBullet.setColor([1, 1, 1, 0]);
    this.mBullet.getXform().setPosition(atX, atY);
    this.mBullet.getXform().setSize(this.kWidth, this.kHeight);
    this.mBullet.setElementPixelPositions(0, 16, 0, 16);

    GameObject.call(this, this.mBullet);
    
    this.mVP = new VProcessor(this.getXform(), 0);
    this.mVP.setXV(600 * direction);
}
gEngine.Core.inheritPrototype(Bullet, GameObject);

Bullet.prototype.draw = function (aCamera) {
    GameObject.prototype.draw.call(this, aCamera);
};

Bullet.prototype.update = function () {
    this.mVP.update();
};