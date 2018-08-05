Arm.eMsgString = Object.freeze([
    "Arrow :",
    "PaperPlane :",
    "Bounce :",
    "Destroyer :",
    "Puncturing :",
    "ShockWave :",
    "ScreamingChick :",
    "MineLauncher :",
    "PoisonArrow :",
    "Regeneration :"
]);

Arm.eArmNum = Object.freeze({
    eNormalArrow: 0,
    ePaperPlane: 1,
    eBouncingArrow: 2,
    eDestroyer: 3,
    ePuncturingArrow: 4,
    eShockWave: 5,
    eScreamingChickenArrow: 6,
    eMineLauncher: 7,
    ePoisonArrow: 8,
    eRegenerationArrow: 8
});

Arm.eIconAssets = Object.freeze({
    eNormalArrow: "assets/armIcons/normalArrowIcon.png",
    ePaperPlane: "assets/armIcons/paperPlane.png",
    eBouncingArrow: "assets/armIcons/bouncingArrowIcon.png",
    eDestroyer: "assets/armIcons/hammerIcon.png",
    ePuncturingArrow: "assets/armIcons/waterArrowIcon.png",
    eShockWave: "assets/armIcons/shockWaveIcon.png",
    eScreamingChickenArrow: "assets/armIcons/screamingChickenArrowIcon.png",
    eMineLauncher: "assets/armIcons/mineLauncherIcon.png",
    ePoisonArrow: "assets/armIcons/poisonArrowIcon.png",
    eRegenerationArrow: "assets/armIcons/regenerationArrowIcon.png"
});

function Arm(XPos, YPos, order, currentNum, texture) {
    this.XPos = XPos;
    this.YPos = YPos;
    this.mOrder = order;
    this.mCurrentNum = currentNum;

    this.mIcon = new TextureRenderable(texture);
    this.mIcon.setColor([1, 1, 1, 0]);
    this.mIcon.getXform().setPosition(
        this.XPos + Armory.eCellOffsets[this.mOrder][0],
        this.YPos + Armory.eCellOffsets[this.mOrder][1]
    );
    this.mIcon.getXform().setSize(10, 10);
    this.mMessageBox = null;
    this.isActive = 0;
}

Arm.prototype.draw = function (aCamera) {
    this.mIcon.draw(aCamera);
    if (this.isActive)
        this.mMessageBox.draw(aCamera);
};

Arm.prototype.getIcon = function () {
    return this.mIcon;
};

Arm.prototype.getCurrentNum = function () {
    return this.mCurrentNum;
};

Arm.prototype.getMoreArm = function (inc) {
    this.mCurrentNum += inc;
    if (this.mCurrentNum >= 100)
        this.mCurrentNum = 99;
};

Arm.prototype.useArm = function (dec) {
    this.mCurrentNum -= dec;
    if (this.mCurrentNum < 0)
        this.mCurrentNum = 0;
};

Arm.prototype.setActive = function () {
    this.isActive = 1;
    var tempStr = Arm.eMsgString[this.mOrder];
    this.mMessageBox = new FontRenderable(tempStr.concat(this.mCurrentNum.toString()));
    this.mMessageBox.setColor([1, 0, 0, 1]);
    this.mMessageBox.getXform().setPosition(this.XPos - 24, this.YPos - 44);
    this.mMessageBox.getXform().setSize(0, 0);
    this.mMessageBox.setTextHeight(5);
};

Arm.prototype.setInactive = function () {
    this.isActive = 0;
    this.mMessageBox = null;
};

Arm.loadAssets = function () {
    gEngine.Textures.loadTexture(Arm.eIconAssets.eNormalArrow);
    gEngine.Textures.loadTexture(Arm.eIconAssets.ePaperPlane);
    gEngine.Textures.loadTexture(Arm.eIconAssets.eBouncingArrow);
    gEngine.Textures.loadTexture(Arm.eIconAssets.eDestroyer);
    gEngine.Textures.loadTexture(Arm.eIconAssets.ePuncturingArrow);
    gEngine.Textures.loadTexture(Arm.eIconAssets.eShockWave);
    gEngine.Textures.loadTexture(Arm.eIconAssets.eScreamingChickenArrow);
    gEngine.Textures.loadTexture(Arm.eIconAssets.eMineLauncher);
    gEngine.Textures.loadTexture(Arm.eIconAssets.ePoisonArrow);
    gEngine.Textures.loadTexture(Arm.eIconAssets.eRegenerationArrow);
};

Arm.unloadAssets = function () {
    gEngine.Textures.unloadTexture(Arm.eIconAssets.eNormalArrow);
    gEngine.Textures.unloadTexture(Arm.eIconAssets.ePaperPlane);
    gEngine.Textures.unloadTexture(Arm.eIconAssets.eBouncingArrow);
    gEngine.Textures.unloadTexture(Arm.eIconAssets.eDestroyer);
    gEngine.Textures.unloadTexture(Arm.eIconAssets.ePuncturingArrow);
    gEngine.Textures.unloadTexture(Arm.eIconAssets.eShockWave);
    gEngine.Textures.unloadTexture(Arm.eIconAssets.eScreamingChickenArrow);
    gEngine.Textures.unloadTexture(Arm.eIconAssets.eMineLauncher);
    gEngine.Textures.unloadTexture(Arm.eIconAssets.ePoisonArrow);
    gEngine.Textures.unloadTexture(Arm.eIconAssets.eRegenerationArrow);
};