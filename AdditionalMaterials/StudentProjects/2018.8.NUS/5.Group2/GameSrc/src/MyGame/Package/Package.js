"use strict";

function Package () {
    this.kBgFile = "assets/package/package_bg.png";
    this.kBrickFile = "assets/package/package_brick.png";
    this.kUIBgFile = "assets/package/package_ui.png";
    this.kMoneyIconFile = "assets/package/package_money_icon.png";

    this.kQueenPeach = "assets/props/queen_peach_icon.png";
    this.kNineTurnDan = "assets/props/nine_turn_dan_icon.png";
    this.kBloodOfDragon = "assets/props/blood_of_dragon_icon.png";
    this.kSpiritOfDragon = "assets/props/spirit_of_dragon_icon.png";
    this.kGlutinousRiceCongee = "assets/props/glutinous_rice_congee_icon.png";
    this.kHamBone = "assets/props/ham_bone_icon.png";
    this.kDongpoPork = "assets/props/dongpo_pork_icon.png";
    this.kWhatsThis = "assets/props/whats_this_icon.png";
    this.kGoldenLotus = "assets/props/golden_lotus_icon.png";
    this.kCarrot = "assets/props/carrot.png";
    this.kFireStone = "assets/props/red_stone.png";
    this.kJinchuangyao = "assets/props/jinchuangyao.png";

    this.kFontType = "assets/fonts/system-default-font";

    this.mCamera = null;

    this.mBg = null;
    this.mBrick = null;
    this.mUIBg = null;
    this.choosingUI = null;

    this.leftX = -5;
    this.topY = 90;
    this.width = 65;

    this.mRow = 4;
    this.mColumn = 5;

    this.mCapacity = 20;
    this.mSize = 0;

    this.mBrickW = 0.097 * this.width;
    this.mBrickH = 0.097 * this.width;

    this.mGapX = 0.0075 * this.width;
    this.mGapY = 0.0012 * this.width;

    this.mMoneyIcon = null;
    this.mMoney = 1000;
    this.mMoneyH = 3;
    this.mMoneyColor = [0.2, 0.2, 0.2, 0.8];

    this.mPropsNameX = this.leftX + 0.245 * this.width;
    this.mPropsNameY = this.topY - 0.645 * this.width;
    this.mPropsDescX = this.mPropsNameX + 0.003 * this.width;
    this.mPropsDescY = this.mPropsNameY - 0.055 * this.width;

    this.mPropsCollections = [];
    this.mPropsCollectionsColor = [0.3, 0, 0, 0.7];     // default color of props description
    this.mCurrentSelected = -1;
    this.mCurrentShowing = -1;

    this.tickThreshold = 6;
    this.tickRight = this.tickLeft = 2 * this.tickThreshold;
    this.tickJ = this.tickThreshold;

    this.mMoneyText = null;
}
gEngine.Core.inheritPrototype(Package, Scene);

Package.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kBgFile);
    gEngine.Textures.loadTexture(this.kBrickFile);
    gEngine.Textures.loadTexture(this.kUIBgFile);
    gEngine.Textures.loadTexture(this.kMoneyIconFile);

    gEngine.Textures.loadTexture(this.kQueenPeach);
    gEngine.Textures.loadTexture(this.kNineTurnDan);
    gEngine.Textures.loadTexture(this.kBloodOfDragon);
    gEngine.Textures.loadTexture(this.kSpiritOfDragon);
    gEngine.Textures.loadTexture(this.kGlutinousRiceCongee);
    gEngine.Textures.loadTexture(this.kHamBone);
    gEngine.Textures.loadTexture(this.kDongpoPork);
    gEngine.Textures.loadTexture(this.kWhatsThis);
    gEngine.Textures.loadTexture(this.kGoldenLotus);
    gEngine.Textures.loadTexture(this.kCarrot);
    gEngine.Textures.loadTexture(this.kFireStone);
    gEngine.Textures.loadTexture(this.kJinchuangyao);

    gEngine.Fonts.loadFont(this.kFontType);
};

Package.prototype.unloadScene = function () {

};

var ItemSet = [];
Package.prototype.initialize = function () {
    this.mCamera = new Camera(
        vec2.fromValues(50, 50),
        100,
        [0, 0, 800, 600],
        true
    );
    this.mCamera.setBackgroundColor([1.0, 1.0, 1.0, 0]);
    this.mCamera.setupViewProjection();

    this.mBrick = new TextureRenderable(this.kBrickFile);
    this.mBrick.setColor([1, 1, 1, 0]);
    this.mBrick.getXform().setPosition(-200, -200);

    this.mBg = new TextureRenderable(this.kBgFile);
    this.mBg.setColor([1, 1, 1, 0]);
    this.mBg.getXform().setPosition(this.leftX + 0.5 * this.width, this.topY - 0.5 * this.width);
    this.mBg.getXform().setSize(this.width, this.width);

    this.mUIBg = new TextureRenderable(this.kUIBgFile);
    this.mUIBg.setColor([1, 1, 1, 0]);
    this.mUIBg.getXform().setPosition(-200, -200);

    this.mMoneyIcon = new TextureRenderable(this.kMoneyIconFile);
    this.mMoneyIcon.getXform().setPosition(this.leftX + 0.275 * this.width, this.topY - 0.185 * this.width);
    this.mMoneyIcon.getXform().setSize(0.08 * this.width, 0.08 * this.width);

    this.mMoneyText = new FontRenderable("  " + this.mMoney);
    this.mMoneyText.setFont(this.kFontType);
    this.mMoneyText.setColor(this.mMoneyColor);
    this.mMoneyText.getXform().setPosition(this.leftX + 0.27 * this.width, this.topY - 0.175 * this.width);
    this.mMoneyText.setTextHeight(0.043 * this.width);

    ItemSet["Queen Peach"] = new Props("Queen Peach", this.kQueenPeach, ["Retrieve All HP"]);
    ItemSet["Nine Turn Dan"] = new Props("Nine Turn Dan", this.kNineTurnDan, ["Retrieve All VP"]);
    ItemSet["Blood of Dragon"] = new Props("Blood of Dragon", this.kBloodOfDragon, ["Retrieve 400 HP"]);
    ItemSet["Spirit of Dragon"] = new Props("Spirit of Dragon", this.kSpiritOfDragon, ["Retrieve 400 VP"]);
    ItemSet["Ham Bone"] = new Props("Ham Bone", this.kHamBone, ["Retrieve 250 HP"]);
    ItemSet["Glutinous Congee"] = new Props("Glutinous Congee", this.kGlutinousRiceCongee, ["Retrieve 250 VP"]);
    ItemSet["Dongpo Pork"] = new Props("Dongpo Pork", this.kDongpoPork, ["Just delicious...", "May add a little attack"]);
    ItemSet["What's this?"] = new Props("What's this?", this.kWhatsThis, ["Taste awful...", "Increase defense"]);
    ItemSet["golden_lotus"] = new Props("Golden Lotus", this.kGoldenLotus, ["Chu Liuxiang needs it"]);
    ItemSet["huluobo"] = new Props("Hu Luo Bo", this.kCarrot, ["Rabbit's favourite", "Retrieve 100 HP"]);
    ItemSet["tongjingti"] = new Props("Tong Jing Ti", this.kFireStone, ["Evolve a pokemon?", "Stimulate attack desire"]);
    ItemSet["zufangchuangyao"] = new Props("Zu Fang Chuang Yao", this.kJinchuangyao, ["Handed down from the ancestor", "Retrieve 200 HP and 50 VP"]);

    this.addProps(ItemSet["Queen Peach"]);
    this.addProps(ItemSet["Nine Turn Dan"]);
    this.addProps(ItemSet["Blood of Dragon"]);
    this.addProps(ItemSet["Spirit of Dragon"]);
    // this.addProps(ItemSet["Ham Bone"]);
    this.addProps(ItemSet["Glutinous Congee"]);
    this.addProps(ItemSet["Dongpo Pork"]);
    this.addProps(ItemSet["What's this?"]);

    //this.addProps(ItemSet["golden_lotus"]);
    //this.addProps(ItemSet["ZuFangChuangYao"]);
    //this.addProps(ItemSet["zufangchuangyao"]);
    //this.addProps(ItemSet["tongjingti"]);
};


var isChoosingUI = false;
Package.prototype.draw = function () {

    this.mCamera.setupViewProjection();

    // background of the package
    this.mBg.draw(this.mCamera);

    // show money
    this.mMoneyIcon.draw(this.mCamera);
    this.mMoneyText.setText("   " + this.mMoney);
    this.mMoneyText.draw(this.mCamera);

    // draw bricks and props
    var i, j, count = 0;
    for (i = 0; i < this.mRow; i++) {
        for (j = 0; j < this.mColumn; j++) {
            var x = this.leftX + 0.239 * this.width + j * (this.mBrickW + this.mGapX) + 0.5 * this.mBrickW;
            var y = this.topY - 0.227 * this.width - i * (this.mBrickH + this.mGapY) - 0.5 * this.mBrickH;
            this.mBrick.getXform().setPosition(x, y);

            if (i * this.mColumn + j == this.mCurrentSelected) {
                this.mBrick.getXform().setSize(this.mBrickW + 0.015 * this.width, this.mBrickH + 0.015 * this.width);
            } else {
                this.mBrick.getXform().setSize(this.mBrickW, this.mBrickH);
            }

            this.mBrick.draw(this.mCamera);
            if (count < this.mSize) {
                if (count == this.mCurrentSelected) {
                    this.mPropsCollections[count].drawIconByPos(x, y, this.mBrickW + 0.012 * this.width, this.mBrickH + 0.012 * this.width, this.mCamera);
                } else {
                    this.mPropsCollections[count].drawIconByPos(x, y, this.mBrickW - 0.008 * this.width, this.mBrickH - 0.008 * this.width, this.mCamera);
                }
                count++;
            }

            if (this.mCurrentShowing >= 0) {
                this.mPropsCollections[this.mCurrentShowing].showNameByPos(this.kFontType, this.mPropsNameX, this.mPropsNameY, this.mPropsCollectionsColor, 0.04 * this.width, this.mCamera);
                this.mPropsCollections[this.mCurrentShowing].showInfoByPos(this.kFontType, this.mPropsDescX, this.mPropsDescY, /*this.mPropsCollectionsColor*/[0.7, 0.3, 0.3, 0.5], 0.032 * this.width, this.mCamera);
                this.mCurrentShowing = -1;
            }
        }
    }

    if (isChoosingUI) {
        this.choosingUI.draw(this.mCamera, this.leftX, this.topY, this.width);
    }

};

var isFirstClicked;
var latestPressedAloneKey;
Package.prototype.update = function () {
    if (!document.mShowPackage) {
        this.mCurrentSelected = -1;
        return ;
    }

    if (!isChoosingUI) {
        if (this.mCurrentSelected < this.mSize) {
            this.mCurrentShowing = this.mCurrentSelected;
        }

        // region press left or right to select a props
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {

            if (!gEngine.Input.isKeyPressed(gEngine.Input.keys.A))
                latestPressedAloneKey = "Right";

            if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A) && latestPressedAloneKey == "Right") {

            } else {
                if ((this.tickRight >= 1.2 * this.tickThreshold && !isFirstClicked)) {
                    this.mCurrentSelected = Math.min(this.mCurrentSelected + 1, this.mRow * this.mColumn - 1);
                    this.mCurrentShowing = -1;
                    this.tickRight = 0;
                    isFirstClicked = true;
                } else {
                    if (isFirstClicked) {
                        if (this.tickRight >= 8 * this.tickThreshold) {
                            this.mCurrentSelected = Math.min(this.mCurrentSelected + 1, this.mRow * this.mColumn - 1);
                            this.mCurrentShowing = -1;
                            this.tickRight = 0;
                            isFirstClicked = false;
                        } else {
                            this.tickRight++;
                        }
                    } else {
                        if (this.tickRight >= this.tickThreshold) {
                            this.mCurrentSelected = Math.min(this.mCurrentSelected + 1, this.mRow * this.mColumn - 1);
                            this.mCurrentShowing = -1;
                            this.tickRight = 0;
                            isFirstClicked = false;
                        } else {
                            this.tickRight++;
                        }
                    }
                }
            }
        }

        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)) {

            if (!gEngine.Input.isKeyPressed(gEngine.Input.keys.D))
                latestPressedAloneKey = "Left";

            if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D) && latestPressedAloneKey == "Left") {

            } else {
                if ((this.tickLeft >= 1.2 * this.tickThreshold && !isFirstClicked)) {
                    this.mCurrentSelected = Math.max(this.mCurrentSelected - 1, 0);
                    this.mCurrentShowing = -1;
                    this.tickLeft = 0;
                    isFirstClicked = true;
                } else {
                    if (isFirstClicked) {
                        if (this.tickLeft >= 8 * this.tickThreshold) {
                            this.mCurrentSelected = Math.max(this.mCurrentSelected - 1, 0);
                            this.mCurrentShowing = -1;
                            this.tickLeft = 0;
                            isFirstClicked = false;
                        } else {
                            this.tickLeft++;
                        }
                    } else {
                        if (this.tickLeft >= this.tickThreshold) {
                            this.mCurrentSelected = Math.max(this.mCurrentSelected - 1, 0);
                            this.mCurrentShowing = -1;
                            this.tickLeft = 0;
                            isFirstClicked = false;
                        } else {
                            this.tickLeft++;
                        }
                    }
                }
            }
        }

        if (gEngine.Input.isKeyClicked(gEngine.Input.keys.D) && this.tickRight >= 1.2 * this.tickThreshold) {
            this.mCurrentSelected = Math.min(this.mCurrentSelected + 1, this.mRow * this.mColumn - 1);
            this.mCurrentShowing = -1;
            this.tick = 0;
        }

        if (gEngine.Input.isKeyClicked(gEngine.Input.keys.A) && this.tickLeft >= 1.2 * this.tickThreshold) {
            this.mCurrentSelected = Math.max(this.mCurrentSelected - 1, 0);
            this.mCurrentShowing = -1;
            this.tick = 0;
        }
        // endregion

        if (gEngine.Input.isKeyClicked(gEngine.Input.keys.W)) {
            if (this.mCurrentSelected >= this.mColumn) {
                this.mCurrentSelected -= this.mColumn;
            }
        }

        if (gEngine.Input.isKeyClicked(gEngine.Input.keys.S)) {
            if (this.mCurrentSelected == -1) {
                this.mCurrentSelected = 0;
            } else if (this.mCurrentSelected <= (this.mRow - 1) * this.mColumn - 1) {
                this.mCurrentSelected += this.mColumn;
            }
        }

        if (gEngine.Input.isKeyReleased(gEngine.Input.keys.J)) {
            if (this.mCurrentSelected < this.mPropsCollections.length && this.tickJ >= this.tickThreshold && this.mCurrentSelected > -1) {
                var money = this.mPropsCollections[this.mCurrentSelected].getMoney();
                var type = this.mPropsCollections[this.mCurrentSelected].getType();
                this.choosingUI = new PropsUsingUI(this.kUIBgFile, this.kFontType, this.mCamera, money, type);
                isChoosingUI = true;
                this.tickJ = 0;
            }
        }

        this.tickRight++;
        this.tickLeft++;
        this.tickJ++;

        return 0;

    } else {

        var result = this.choosingUI.update();
        var selectedItem = this.mPropsCollections[this.mCurrentSelected];

		if (result == -1) {

        } else if (result == 0) {
            isChoosingUI = false;
        } else if (result == 4) {
            isChoosingUI = false;
            if (selectedItem.canUse()) {
                this.sellItem(this.mCurrentSelected);
            }
        } else {
            isChoosingUI = false;
            var type = selectedItem.getType();

            if (type == "Mission") {
                return ;
            } else if (type == "Food") {
                this.useProps(result - 1);       // use for which character
            } else {
                this.equipWeapon(result - 1);    // use for which character
            }
        }

        return 0;
    }
};

Package.prototype.getName = function () {
    return this.mName;
};

Package.prototype.showNameByPos = function (fontType, leftX, topY, color, textH, aCamera) {
    this.mNameText.setFont(fontType);
    this.mNameText.setColor(color);
    this.mNameText.getXform().setPosition(leftX, topY);
    this.mNameText.setTextHeight(textH);
    this.mNameText.draw(aCamera);
};

//region functions about capacity and size
Package.prototype.setCapacity = function (c) {
    this.mCapacity = c;
};

Package.prototype.getCapacity = function () {
    return this.mCapacity;
};

Package.prototype.incCapacity = function (deltaC) {
    this.mCapacity += deltaC;
};

Package.prototype.getSize = function () {
    return this.mSize;
};
//endregion

// region functions about money
Package.prototype.getMoney = function () {
    return this.mMoney;
};

Package.prototype.setMoney = function (money) {
    this.mMoney = money;
};

Package.prototype.incMoney = function (deltaM) {
    this.mMoney += deltaM;
};
// endregion

Package.prototype.checkProp = function (prop) {
    var i;
    for (i = 0; i < this.mPropsCollections.length; ++i) {
        if (this.mPropsCollections[i].mName === prop)
            return true;
    }
    return false;
}

Package.prototype.addProps = function (newProps) {
    if (this.mSize < this.mCapacity) {
        this.mPropsCollections.push(newProps);
        this.mSize += 1;
    }
};

Package.prototype.sellItem = function () {
    var dM = this.mPropsCollections[this.mCurrentSelected].getMoney();
    this.incMoney(dM);
    this.mPropsCollections.splice(this.mCurrentSelected, 1);
    this.mSize--;
};

Package.prototype.useProps = function (charNum) {
    var selectedItem = this.mPropsCollections[this.mCurrentSelected];
    var dHP = selectedItem.getHPadd();
    var dVP = selectedItem.getVPadd();
    var dATK = selectedItem.getATKadd();
    var dDEF = selectedItem.getDEFadd();

    CharacterSet[charNum].incCurrentHP(dHP);
    CharacterSet[charNum].incCurrentVP(dVP);
    CharacterSet[charNum].incATK(dATK);
    CharacterSet[charNum].incDEF(dDEF);
    this.mPropsCollections.splice(this.mCurrentSelected, 1);
    this.mSize--;
};
Package.prototype.equipWeapon = function (charNum) {
    window.weaponsPack.equipWeapon(this.mPropsCollections[this.mCurrentSelected], charNum);
    this.mPropsCollections.splice(this.mCurrentSelected, 1);
    this.mSize--;
};
