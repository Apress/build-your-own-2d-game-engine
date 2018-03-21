
function Button(cx, cy, texture, type, lightSet) {
    this.kWidth = 2.25;
    this.kHeight = 2;
    this.mIsUnlocked = false;
    this.mButton = new LightRenderable(texture);

    var i;
    for (i = 2; i < lightSet.numLights(); i++) {
        this.mButton.addLight(lightSet.getLightAt(i));
    }

    this.buildSprite(cx, cy);
    GameObject.call(this, this.mButton);

    var rigidShape = new RigidRectangle(this.getXform(), this.kWidth, this.kHeight);
    rigidShape.setMass(0);  // ensures no movements!
    rigidShape.setDrawBounds(true);
    rigidShape.setColor([1, 1, 1, 1]);
    this.setPhysicsComponent(rigidShape);
}
gEngine.Core.inheritPrototype(Button, GameObject);


Button.prototype.buildSprite = function (atX, atY) {
    this.mButton.getXform().setPosition(atX, atY);
    this.mButton.getXform().setSize(this.kWidth, this.kHeight);
    this.mButton.getXform().setZPos(2);
    this.mButton.setElementPixelPositions(0, 180, 0, 155);
};

Button.prototype.pressButton = function () {
    this.mButton.setElementPixelPositions(180, 360, 0, 155);
    this.mIsUnlocked = true;
};

Button.prototype.getButtonState = function () {
    return this.mIsUnlocked;
};