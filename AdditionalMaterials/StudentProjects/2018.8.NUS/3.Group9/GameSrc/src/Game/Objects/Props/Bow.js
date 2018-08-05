"use strict";

Bow.eAssets = Object.freeze({
    eBowSetSpriteTexture: "assets/armIcons/bowSet.png"
});

Bow.eBowTexturePos = Object.freeze({
    ePaperPlane: [0, 0]
});

function Bow(xpos, ypos, armNum, armAmount, existTurns) {
    this.mRenderComponent = new SpriteRenderable(Bow.eAssets.eBowSetSpriteTexture);
    var pxPos = [
        Bow.eBowTexturePos.ePaperPlane[0] * 32,
        Bow.eBowTexturePos.ePaperPlane[0] * 32 + 32,
        256 - (Bow.eBowTexturePos.ePaperPlane[1] * 32 + 32),
        256 - (Bow.eBowTexturePos.ePaperPlane[1] * 32)
    ];
    this.mRenderComponent.setElementPixelPositions(pxPos[0], pxPos[1], pxPos[2], pxPos[3]);
    this.mRenderComponent.setColor([1, 1, 1, 0]);
    this.mRenderComponent.getXform().setSize(8, 8);
    this.mRenderComponent.getXform().setPosition(xpos, ypos);

    GameObject.call(this, this.mRenderComponent);

    var r = new RigidRectangle(this.mRenderComponent.getXform(), 8, 8);
    this.setRigidBody(r);
    this.getRigidBody().setVelocity(0, 0);
    this.getRigidBody().setMass(0.1);
    this.getRigidBody().setInertia(0);
    this.getRigidBody().setRestitution(0);
       
    switch (armNum) {
        case Arm.eArmNum.eNormalArrow:{
            this.mArmIcon = new TextureRenderable(Arm.eIconAssets.eNormalArrow);
            break;
        }
        case Arm.eArmNum.ePaperPlane:{
            this.mArmIcon = new TextureRenderable(Arm.eIconAssets.ePaperPlane);
            break;
        }
        case Arm.eArmNum.eBouncingArrow:{
            this.mArmIcon = new TextureRenderable(Arm.eIconAssets.eBouncingArrow);
            break;
        }
        case Arm.eArmNum.eDestroyer:{
            this.mArmIcon = new TextureRenderable(Arm.eIconAssets.eDestroyer);
            break;
        }
        case Arm.eArmNum.ePuncturingArrow:{
            this.mArmIcon = new TextureRenderable(Arm.eIconAssets.ePuncturingArrow);
            break;
        }
        case Arm.eArmNum.eShockWave:{
            this.mArmIcon = new TextureRenderable(Arm.eIconAssets.eShockWave);
            break;
        }
        case Arm.eArmNum.eScreamingChickenArrow:{
            this.mArmIcon = new TextureRenderable(Arm.eIconAssets.eScreamingChickenArrow);
            break;
        }
        case Arm.eArmNum.eMineLauncher:{
            this.mArmIcon = new TextureRenderable(Arm.eIconAssets.eMineLauncher);
            break;
        }
        case Arm.eArmNum.ePoisonArrow:{
            this.mArmIcon = new TextureRenderable(Arm.eIconAssets.ePoisonArrow);
            break;
        }
        case Arm.eArmNum.eRegenerationArrow:{
            this.mArmIcon = new TextureRenderable(Arm.eIconAssets.eRegenerationArrow);
            break;
        }
        default: {
            this.mArmIcon = new TextureRenderable(Arm.eIconAssets.eNormalArrow);
            break;
        }

    }
    
    this.mArmIcon.setColor([1, 1, 1, 0]);
    this.mArmIcon.getXform().setPosition(xpos, ypos);
    this.mArmIcon.getXform().setSize(6, 6);

    this.mArmNum = armNum;
    this.mArmAmount = armAmount;
    this.mRemainTurns = existTurns;
}

gEngine.Core.inheritPrototype(Bow, GameObject);

Bow.prototype.draw = function (aCamera) {
    GameObject.prototype.draw.call(this, aCamera);
    this.mArmIcon.draw(aCamera);
};

Bow.prototype.update = function () {
    GameObject.prototype.update.call(this);
    var pos = this.getXform().getPosition();
    this.mArmIcon.getXform().setPosition(pos[0], pos[1]);
};

Bow.prototype.getArmNum = function () {
    return this.mArmNum;
};

Bow.prototype.getArmAmount = function () {
    return this.mArmAmount;
};

Bow.loadAssets = function () {
    gEngine.Textures.loadTexture(Bow.eAssets.eBowSetSpriteTexture);
};

Bow.unloadAssets = function () {
    gEngine.Textures.unloadTexture(Bow.eAssets.eBowSetSpriteTexture);
};

Bow.randomBow = function (xpos, ypos) {
    var typeRand = Math.floor(Game.random(0, 85));
    var newBow = null;
    var amountRand;

    // paperPlane: level 2
    if (typeRand < 15) {
        amountRand = Math.floor(Game.random(3, 5));
        newBow = new Bow(xpos, ypos, Arm.eArmNum.ePaperPlane, amountRand, 50);
    }
    // screamingChicken: level 2
    else if (typeRand >= 15 && typeRand < 30) {
        amountRand = Math.floor(Game.random(3, 5));
        newBow = new Bow(xpos, ypos, Arm.eArmNum.eScreamingChickenArrow, amountRand, 50);
    }
    // ShockWave: level 2
    else if (typeRand >= 30 && typeRand < 45) {
        amountRand = Math.floor(Game.random(3, 5));
        newBow = new Bow(xpos, ypos, Arm.eArmNum.eShockWave, amountRand, 50);
    }
    // bouncingArrow: level 2
    else if (typeRand >= 30 && typeRand < 45) {
        amountRand = Math.floor(Game.random(3, 5));
        newBow = new Bow(xpos, ypos, Arm.eArmNum.eBouncingArrow, amountRand, 50);
    }
    // mineLauncher: level 3
    else if (typeRand >= 45 && typeRand < 57) {
        amountRand = Math.floor(Game.random(2, 3));
        newBow = new Bow(xpos, ypos, Arm.eArmNum.eMineLauncher, amountRand, 50);
    }
    // poisonArrow: level 3
    else if (typeRand >= 57 && typeRand < 69) {
        amountRand = Math.floor(Game.random(2, 3));
        newBow = new Bow(xpos, ypos, Arm.eArmNum.ePoisonArrow, amountRand, 50);
    }
    // destroyer: level 4
    else if (typeRand >= 69 && typeRand < 75) {
        amountRand = Math.floor(Game.random(1, 2));
        newBow = new Bow(xpos, ypos, Arm.eArmNum.eDestroyer, amountRand, 50);
    }
    // regenerationArrow: level 4
    else if (typeRand >= 75 && typeRand < 81) {
        amountRand = Math.floor(Game.random(1, 2));
        newBow = new Bow(xpos, ypos, Arm.eArmNum.eRegenerationArrow, amountRand, 50);
    }
    // puncturingArrow: level 5
    else if (typeRand >= 81 && typeRand <= 85) {
        newBow = new Bow(xpos, ypos, Arm.eArmNum.ePuncturingArrow, 1, 50);
    }

    return newBow;
};