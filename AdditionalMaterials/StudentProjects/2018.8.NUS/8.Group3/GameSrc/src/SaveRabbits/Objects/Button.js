
function Button(cx, cy, texture, type) {
    this.kWidth = 18;
    this.kHeight = 10;
    this.mIsUnlocked = false;
    this.mButton = new SpriteAnimateRenderable(texture);

    this.buildSprite(cx, cy);
    GameObject.call(this, this.mButton);

    var rigidShape = new RigidRectangle(this.getXform(), this.kWidth, this.kHeight);
    rigidShape.setMass(0);  // ensures no movements!
    //rigidShape.toggleDrawBound();
    this.setRigidBody(rigidShape);
}
gEngine.Core.inheritPrototype(Button, GameObject);


Button.prototype.buildSprite = function (atX, atY) {
    this.mButton.getXform().setPosition(atX, atY);
    this.mButton.getXform().setSize(this.kWidth, this.kHeight);
    //this.mButton.getXform().setZPos(2);
    this.mButton.setElementPixelPositions(180, 360, 56, 156);
};

Button.prototype.pressButton = function () {
    this.mButton.setElementPixelPositions(0, 180, 56, 156);
    this.mIsUnlocked = true;
};

Button.prototype.resetButton = function () {
    this.mButton.setElementPixelPositions(180, 360, 56, 156);
    this.mIsUnlocked = false;
};

Button.prototype.getButtonState = function () {
    return this.mIsUnlocked;
};
Button.prototype.draw = function (aCamera) {
    if (this.isVisible()) {
        this.mRenderComponent.draw(aCamera);
    }
//    if (this.getRigidBody() !== null) {
//       // this.getRigidBody().draw(aCamera);
//    }
};