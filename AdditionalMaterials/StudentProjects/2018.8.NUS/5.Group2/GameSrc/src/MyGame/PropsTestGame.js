"use strict";

function PropsTestGame() {
    this.kSmallRedIcon = "assets/smallred_icon.png";
    this.kSmallBlueIcon = "assets/smallblue_icon.png";
    this.kPackageIcon = "assets/packagebrick_0.png";
    this.kPackageBg = "assets/package_bg.png";
    this.kUIBg = "assets/UI_bg0.png";

    this.kQueenPeach = "assets/props/queen_peach_icon.png";
    this.kNineTurnDan = "assets/props/nine_turn_dan_icon.png";
    this.kBloodOfDragon = "assets/props/blood_of_dragon_icon.png";
    this.kSpiritOfDragon = "assets/props/spirit_of_dragon_icon.png";
    this.kGlutinousRiceCongee = "assets/props/glutinous_rice_congee_icon.png";
    this.kHamBone = "assets/props/ham_bone_icon.png";

    this.kSystemDefaultFont = "assets/fonts/system-default-font";

    this.mCamera = null;

    this.mPropsSet = [];

    this.testShape = null;

}
gEngine.Core.inheritPrototype(PropsTestGame, Scene);

PropsTestGame.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kSmallRedIcon);
    gEngine.Textures.loadTexture(this.kSmallBlueIcon);
    gEngine.Textures.loadTexture(this.kPackageIcon);
    gEngine.Textures.loadTexture(this.kPackageBg);
    gEngine.Textures.loadTexture(this.kQueenPeach);
    gEngine.Textures.loadTexture(this.kNineTurnDan);
    gEngine.Textures.loadTexture(this.kBloodOfDragon);
    gEngine.Textures.loadTexture(this.kSpiritOfDragon);
    gEngine.Textures.loadTexture(this.kGlutinousRiceCongee);
    gEngine.Textures.loadTexture(this.kHamBone);
    gEngine.Textures.loadTexture(this.kUIBg);

    gEngine.Fonts.loadFont(this.kSystemDefaultFont);

};

PropsTestGame.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kSmallRedIcon);
    gEngine.Textures.unloadTexture(this.kSmallBlueIcon);
    gEngine.Textures.unloadTexture(this.kPackageIcon);
    gEngine.Textures.unloadTexture(this.kPackageBg);
    gEngine.Textures.unloadTexture(this.kQueenPeach);
    gEngine.Textures.unloadTexture(this.kNineTurnDan);
    gEngine.Textures.unloadTexture(this.kBloodOfDragon);
    gEngine.Textures.unloadTexture(this.kSpiritOfDragon);
    gEngine.Textures.unloadTexture(this.kGlutinousRiceCongee);
    gEngine.Textures.unloadTexture(this.kHamBone);
    gEngine.Textures.unloadTexture(this.kUIBg);

    gEngine.Fonts.unloadFont(this.kSystemDefaultFont);
};

PropsTestGame.prototype.initialize = function () {
    this.mCamera = new Camera(
        vec2.fromValues(50, 50), // position of the camera
        100,                     // width of camera
        [0, 0, 800, 600],         // viewport (orgX, orgY, width, height)
        true
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);

    gEngine.DefaultResources.setGlobalAmbientIntensity(3);

    this.mPropsSet[0] = new Props("Small Red Bottle", this.kSmallRedIcon, "Retrieve 50 HP");
    this.mPropsSet[1] = new Props("Small Blue Bottle", this.kSmallBlueIcon, "Retrieve 50 VP");
    this.mPropsSet[2] = new Props("Blood Of Dragon", this.kBloodOfDragon, "Retrieve 100 HP");
    this.mPropsSet[3] = new Props("Spirit Of Dragon", this.kSpiritOfDragon, "Retrieve 200 HP");
    this.mPropsSet[4] = new Props("Queen Peach", this.kQueenPeach, "Retrieve All HP");
    this.mPropsSet[5] = new Props("Glutinous Rice Congeee", this.kGlutinousRiceCongee, "Retrieve 50 VP");
    this.mPropsSet[6] = new Props("Nine Turn Dan", this.kNineTurnDan, "Retrieve ALL HP and ALL VP");
    this.mPropsSet[7] = new Props("Ham Bone", this.kHamBone, "Just delecious");


    // create package and add some props into it
    this.mPackage = new Package("myPackage", this.kPackageIcon, this.kPackageBg, this.kUIBg, this.kSystemDefaultFont, 10, this.mCamera);
    this.mPackage.setCapacity(20);
    this.mPackage.addProps(this.mPropsSet[2]);
    this.mPackage.addProps(this.mPropsSet[3]);
    this.mPackage.addProps(this.mPropsSet[4]);
    this.mPackage.addProps(this.mPropsSet[5]);
    this.mPackage.addProps(this.mPropsSet[6]);
    this.mPackage.addProps(this.mPropsSet[7]);
    this.mPackage.addProps(this.mPropsSet[7]);
    this.mPackage.addProps(this.mPropsSet[6]);
    this.mPackage.addProps(this.mPropsSet[5]);
    this.mPackage.addProps(this.mPropsSet[4]);
    this.mPackage.addProps(this.mPropsSet[3]);
    this.mPackage.addProps(this.mPropsSet[2]);
    this.mPackage.addProps(this.mPropsSet[1]);
    this.mPackage.addProps(this.mPropsSet[0]);

    this.mPackage.setRowColumn(4, 5);
    this.mPackage.setBrickSize(7, 7);
    this.mPackage.setGapSize(0.6, 0.3);
    this.mPackage.setLeftTop(30, 70);
    this.mPackage.setPropsDescColor([0.3, 0.1, 0.5, 0.7]);

    this.mPackage.setMoneyTextHeight(4);
    this.mPackage.setMoneyColor([0, 0, 0.2, 0.8]);
    this.mPackage.setMoney(10000000);

};


PropsTestGame.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]);

    this.mCamera.setupViewProjection();

    this.mPackage.draw(this.mCamera);

};

PropsTestGame.prototype.update = function () {
    this.mPackage.update();
};
