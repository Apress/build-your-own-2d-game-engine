function LineBox(xPos, yPos, height, width) {
    this.width = width;
    this.height = height;
    this.mTopLine = new LineRenderable(xPos - this.width/2, yPos + this.height/2, xPos + this.width/2, yPos + this.height/2);
    this.mTopLine.setColor([1, 1, 1, 1]);
    this.mLeftLine = new LineRenderable(xPos - this.width/2, yPos - this.height/2, xPos - this.width/2, yPos + this.height/2);
    this.mLeftLine.setColor([1,1,1,1]);
    this.mRightLine = new LineRenderable(xPos + this.width/2, yPos - this.height/2, xPos + this.width/2, yPos + this.height/2);
    this.mRightLine.setColor([1,1,1,1]);
    this.mBotLine = new LineRenderable(xPos - this.width/2, yPos - this.height/2, xPos + this.width/2, yPos - this.height/2);
    this.mBotLine.setColor([1, 1, 1, 1]);
}

LineBox.prototype.draw = function(aCamera) {
    this.mTopLine.draw(aCamera);
    this.mLeftLine.draw(aCamera);
    this.mRightLine.draw(aCamera);
    this.mBotLine.draw(aCamera);
};

