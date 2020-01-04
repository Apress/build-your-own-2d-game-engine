HomePage.prototype.initAcknowledgementInfo = function () {
    this.mAcknowledgementInfo = new SpriteRenderable(this.kInformation);
    this.mAcknowledgementInfo.setColor([1, 1, 1, 0]);
    this.mAcknowledgementInfo.getXform().setPosition(135, 45);
    this.mAcknowledgementInfo.getXform().setSize(90, 90);
    this.mAcknowledgementInfo.setElementPixelPositions(0, 1024, 0, 1024);
};

HomePage.prototype.drawAcknowledgementInfo = function () {
    this.mAcknowledgementInfo.draw(this.mCamera);

};