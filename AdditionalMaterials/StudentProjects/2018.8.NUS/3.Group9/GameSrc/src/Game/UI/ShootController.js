"use strict";

ShootController.eDirection = Object.freeze({
    eRight: new vec2.fromValues(1, 0),
    eLeft: new vec2.fromValues(-1, 0)
});

ShootController.eAssets = Object.freeze({
    eBlueShootDirArrowTexture: "./assets/UI/UI_arrow_blue.png",
    eRedShootDirArrowTexture: "./assets/UI/UI_arrow_red.png"
});

function ShootController(posX, posY, frontDir, texture) {
    SpriteRenderable.call(this, texture);

    this.mVisible = true;
    this.mCurrentFrontDir = frontDir;

    this.setColor([1, 1, 1, 0]);
    this.getXform().setPosition(posX, posY);
    this.getXform().setSize(24, 4);
    this.setElementPixelPositions(512, 2048, 0, 256);
    if (this.mCurrentFrontDir[0] === ShootController.eDirection.eLeft[0])
        this.getXform().setRotationInRad(Math.PI);
    else if (this.mCurrentFrontDir[0] === ShootController.eDirection.eRight[0])
        this.getXform().setRotationInRad(0);
}
gEngine.Core.inheritPrototype(ShootController, SpriteRenderable);

ShootController.prototype.setRotationInRad = function(rad) {
    this.getXform().setRotationInRad(rad);
};

ShootController.prototype.isVisible = function () {
    return this.mVisible;
};

ShootController.prototype.update = function (XPos, YPos, frontDir) {
    this.getXform().setPosition(XPos, YPos);
    var symmetryRad;
    if (this.mCurrentFrontDir[0] === 1 && frontDir[0] === -1) {
        this.mCurrentFrontDir = frontDir;
        symmetryRad =  Math.PI - this.getXform().getRotationInRad();
        this.getXform().setRotationInRad(symmetryRad);
    }
    else if (this.mCurrentFrontDir[0] === -1 && frontDir[0] === 1) {
        this.mCurrentFrontDir = frontDir;
        symmetryRad = Math.PI - this.getXform().getRotationInRad();
        this.getXform().setRotationInRad(symmetryRad);
    }
};


ShootController.prototype.keyControl = function () {
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W)) {
        this.shootDirUp();
    }
    else if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S)) {
        this.shootDirDown();
    }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Z)) {
        this.shootPowDec();
    }
    else if (gEngine.Input.isKeyPressed(gEngine.Input.keys.X)) {
        this.shootPowInc();
    }
};

ShootController.prototype.draw = function(aCamera) {
    if (this.isVisible()) {
        SpriteRenderable.prototype.draw.call(this, aCamera);
    }
};

ShootController.prototype.shootDirUp = function () {
    var rotationInRad = this.getXform().getRotationInRad();
    if (this.mCurrentFrontDir[0] === 1) {
        rotationInRad += Math.PI / 90;
        if (rotationInRad > Math.PI / 2)
            rotationInRad = Math.PI / 2;
    }
    else if (this.mCurrentFrontDir[0] === -1) {
        rotationInRad -= Math.PI / 90;
        if (rotationInRad < Math.PI / 2)
            rotationInRad = Math.PI / 2;
    }
    this.getXform().setRotationInRad(rotationInRad);
};

ShootController.prototype.shootDirDown = function () {
    var rotationInRad = this.getXform().getRotationInRad();
    if (this.mCurrentFrontDir[0] === -1) {
        rotationInRad += Math.PI / 90;
        if (rotationInRad > Math.PI * 3 / 2)
            rotationInRad = Math.PI * 3 / 2;
    }
    else if (this.mCurrentFrontDir[0] === 1) {
        rotationInRad -= Math.PI / 90;
        if (rotationInRad < -Math.PI / 2)
            rotationInRad = -Math.PI / 2;
    }
    this.getXform().setRotationInRad(rotationInRad);
};

ShootController.prototype.shootPowDec = function () {
    var size = [this.getXform().getSize()[0] - 0.6, this.getXform().getSize()[1] - 0.1];
    if (size[0] < 18) {
        size[0] = 18;
        size[1] = 3;
    }
    this.getXform().setSize(size[0], size[1]);
};

ShootController.prototype.shootPowInc = function () {
    var size = [this.getXform().getSize()[0] + 0.6, this.getXform().getSize()[1] + 0.1];
    if (size[0] > 36) {
        size[0] = 36;
        size[1] = 6;
    }
    this.getXform().setSize(size[0], size[1]);
};

ShootController.prototype.getVelocity = function () {
    var norm = (this.getXform().getSize()[0] - 18) / 18;
    var speed = norm * 60 + 60;
    var rad = this.getXform().getRotationInRad();
    return new vec2.fromValues(speed * Math.cos(rad), speed * Math.sin(rad));
};

ShootController.loadAssets = function () {
    gEngine.Textures.loadTexture(ShootController.eAssets.eRedShootDirArrowTexture);
    gEngine.Textures.loadTexture(ShootController.eAssets.eBlueShootDirArrowTexture);
};

ShootController.unloadAssets = function () {
    gEngine.Textures.unloadTexture(ShootController.eAssets.eRedShootDirArrowTexture);
    gEngine.Textures.unloadTexture(ShootController.eAssets.eBlueShootDirArrowTexture);
};