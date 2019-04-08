"use strict";

function Nest(x, y, width, height, texture, normal) {
    if (normal !== undefined)
        this.mSprite = new IllumRenderable(texture, normal);
    else 
        this.mSprite = new LightRenderable(texture);
    this.mSprite.setElementPixelPositions(3072, 4096, 0, 256);
    GameObject.call(this, this.mSprite);
    
    // State
    this.mXPosition = x;
    this.mYPosition = y;
    this.mWidth = width;
    this.mHeight = height;
    this.isHomeNest = false;
    
    // Rigidbodies
    this.mRigidBottom = new RigidRectangle(new Transform(), this.mWidth, 1);
    this.mRigidBottom.setMass(0);
    
    this.mRigidLeft = new RigidRectangle(new Transform(), 1, this.mHeight);
    this.mRigidLeft.setMass(0);
    
    this.mRigidRight = new RigidRectangle(new Transform(), 1, this.mHeight);
    this.mRigidRight.setMass(0.0);

    // Set transforms
    this.setPosition(x, y);
    this.setSize(width, height);
}
gEngine.Core.inheritPrototype(Nest, GameObject);

Nest.prototype.setSize = function (w, h) {
    this.mWidth = w;
    this.mHeight = h;
    this.mSprite.getXform().setSize(w, h);
    this.mRigidBottom.setSize(w - 4, 1);
    this.mRigidLeft.setSize(1, h / 2);
    this.mRigidRight.setSize(1, h / 2);
};

Nest.prototype.setPosition = function (x, y) {
    this.mXPosition = x;
    this.mYPosition = y;
    this.mSprite.getXform().setPosition(x, y);
    this.mRigidBottom.getTransform().setPosition(x, y - this.mHeight / 4);
    this.mRigidLeft.getTransform().setPosition(x - this.mWidth / 2 + 2, y);
    this.mRigidRight.getTransform().setPosition(x + this.mWidth / 2 - 2, y);
};

Nest.prototype.setColor = function (colArray) {
    this.mSprite.setColor([colArray[0], colArray[1], colArray[2], colArray[3]]);
};

Nest.prototype.setHomeNest = function (homeNest) {
    this.isHomeNest = homeNest;
};

Nest.prototype.getHomeNest = function () {
    return this.isHomeNest;
};

Nest.prototype.getRigidBodies = function() {
    return [this.mRigidBottom, this.mRigidLeft, this.mRigidRight];
};

Nest.prototype.addRigidBodiesToSet = function (set) {
    set.addToSet(this.mRigidBottom);
    set.addToSet(this.mRigidLeft);
    set.addToSet(this.mRigidRight);
};

Nest.prototype.update = function() {
    this.mRigidBottom.update();
    this.mRigidRight.update();
    this.mRigidLeft.update();
};

Nest.prototype.draw = function(camera) {
    this.mSprite.draw(camera);
    if (this.mDrawRigidShape) {
        //this.getRigidBody().draw(camera);
        //this.mLeftWall.draw(camera);
        //this.mRightWall.draw(camera);

        this.mRigidBottom.draw(camera);
        this.mRigidLeft.draw(camera);
        this.mRigidRight.draw(camera);
    }
};

Nest.prototype.getBBox = function() {
    return new BoundingBox([this.mXPosition, this.mYPosition], this.mWidth - 6, this.mHeight / 2);
};