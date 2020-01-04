HomePage.prototype.initTrophyInfo = function () {
    this.mTrophyInfo = new SpriteRenderable(this.kControlGuide);
    this.mTrophyInfo.setColor([1, 1, 1, 0]);
    this.mTrophyInfo.getXform().setPosition(150, 30);
    this.mTrophyInfo.getXform().setSize(5, 5);
    this.mTrophyInfo.setElementPixelPositions(0, 64, 0, 64);
};

HomePage.prototype.drawTrophyInfo = function () {
    this.mTrophyInfo.draw(this.mCamera);

};