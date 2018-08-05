"use strict";

function WeaponsPack () {
    this.kBgFile = [];
    this.kBgFile[2] = "assets/weapons_pack/bg_tangseng.png";
    this.kBgFile[0] = "assets/weapons_pack/bg_sunwukong.png";
    this.kBgFile[1] = "assets/weapons_pack/bg_zhubajie.png";
    this.kBgFile[3] = "assets/weapons_pack/bg_shaseng.png";
    this.kBrickFile = "assets/weapons_pack/brick_2.png";
    this.kUIBgFile = "assets/weapons_pack/ui_bg.png";

    // this.kTangsengFileLeft = "assets/weapons_pack/tangseng_left.png";
    // this.kTangsengFileRight = "assets/weapons_pack/tangseng_right.png";
    // this.kMonkeyFileLeft = "assets/weapons_pack/monkey_left.png";
    // this.kMonkeyFileRight = "assets/weapons_pack/monkey_right.png";
    // this.kZhubajieFileLeft = "assets/weapons_pack/zhubajie_left.png";
    // this.kZhubajieFileRight = "assets/weapons_pack/zhubajie_right.png";

    this.tangsengAnimate = [];
    this.monkeyAnimate = [];
    this.zhubajieAnimate = [];

    this.kSword_A1 = "assets/weapons_pack/Sword_A1.png";
    this.kHelmet_A1 = "assets/weapons_pack/Helmet_A1.png";
    this.kArm_A1 = "assets/weapons_pack/Arm_A1.png";
    this.kArmor_up_A1 = "assets/weapons_pack/Armor_up_A1.png";
    this.kArmor_down_A1 = "assets/weapons_pack/Armor_down_A1.png";
    this.kBracelet_A1 = "assets/weapons_pack/Bracelet_A1.png";
    this.kNecklace_A1 = "assets/weapons_pack/Necklace_A1.png";
    this.kShoes_A1 = "assets/weapons_pack/Shoes_A1.png";

    this.kFontType = "assets/fonts/system-default-font";

    this.kTypesNum = [];
    this.kTypes = [];

    this.mCamera = null;

    this.mCharacterText = [];

    this.mBg = [];
    this.mBrick = null;
    this.mUIBg = null;
    this.choosingUI = null;

    this.mSize = 0;
    this.mCapacity = 15;

    this.leftX = 0;
    this.topY = 75;
    this.width = 160;
    this.singleW1 = 0.0322 * this.width;
    this.gapY1 = 0.0078 * this.width;
    //this.firstBrickX = this.leftX + 0.5483 * this.width;
    //this.firstBrickY = this.topY - 0.1372 * this.width;
    this.firstBrickX = this.leftX + 0.5500 * this.width;
    this.firstBrickY = this.topY - 0.1340 * this.width;

    this.weaponsCollections = [];
    this.equipedWeapons = [];
    for (var k = 0; k < 4; k++) {
        this.equipedWeapons[k] = [];
    }

    this.currentSelectPage = 0;        // left page = 0, right page = 1;
    this.currentSelectCharacter = 0;   // tangseng = 0, sunwukong = 1 ...
    this.currentSelectWeapon = -1;      // first weapon = 0, ...

    this.mAnimationPos = [];

}
gEngine.Core.inheritPrototype(WeaponsPack, Scene);

WeaponsPack.prototype.loadScene = function () {
    for (var i = 0; i < 4; i++) {
        gEngine.Textures.loadTexture(this.kBgFile[i]);
    }
    gEngine.Textures.loadTexture(this.kBrickFile);
    gEngine.Textures.loadTexture(this.kUIBgFile);
    // gEngine.Textures.loadTexture(this.kTangsengFileLeft);
    // gEngine.Textures.loadTexture(this.kTangsengFileRight);
    // gEngine.Textures.loadTexture(this.kMonkeyFileLeft);
    // gEngine.Textures.loadTexture(this.kMonkeyFileRight);
    // gEngine.Textures.loadTexture(this.kZhubajieFileLeft);
    // gEngine.Textures.loadTexture(this.kZhubajieFileRight);

    gEngine.Textures.loadTexture(this.kSword_A1);
    gEngine.Textures.loadTexture(this.kHelmet_A1);
    gEngine.Textures.loadTexture(this.kArm_A1);
    gEngine.Textures.loadTexture(this.kArmor_up_A1);
    gEngine.Textures.loadTexture(this.kArmor_down_A1);
    gEngine.Textures.loadTexture(this.kBracelet_A1);
    gEngine.Textures.loadTexture(this.kNecklace_A1);
    gEngine.Textures.loadTexture(this.kShoes_A1);

    gEngine.Fonts.loadFont(this.kFontType);
};

WeaponsPack.prototype.unloadScene = function () {

};

var WeaponsSet = [];
WeaponsPack.prototype.initialize = function () {
    // region need not change
    this.mCamera = new Camera(
        vec2.fromValues(this.leftX + 0.5 * this.width, this.topY - 0.25 * this.width),
        0.75 * this.width,
        [0, 0, 960, 600],
        true
    );
    this.mCamera.setBackgroundColor([1.0, 1.0, 1.0, 0]);
    this.mCamera.setupViewProjection();

    var i;
    for (i = 0; i < 4; i++) {
        this.mBg[i] = new TextureRenderable(this.kBgFile[i]);
        this.mBg[i].setColor([1, 1, 1, 0]);
        this.mBg[i].getXform().setPosition(this.leftX + 0.5 * this.width, this.topY - 0.25 * this.width);
        this.mBg[i].getXform().setSize(this.width, 0.5 * this.width);
    }

    this.mBrick = new TextureRenderable(this.kBrickFile);
    this.mBrick.setColor([1, 1, 1, 0]);
    this.mBrick.getXform().setPosition(-200, -200);
    this.mBrick.getXform().setSize(this.singleW1 + 0.025 * this.width, this.singleW1 + 0.025 * this.width);

    this.mUIBg = new TextureRenderable(this.kUIBgFile);
    this.mUIBg.setColor([1, 1, 1, 0]);
    this.mUIBg.getXform().setPosition(this.leftX, this.topY);
    this.mUIBg.getXform().setSize(this.width, this.width);

    for (var i = 0; i < 3; i++) {
        this.mCharacterText[i] = [];
        for (var j = 0; j < 3; j++) {
            this.mCharacterText[i][j] = new FontRenderable("- / -");
            this.mCharacterText[i][j].setFont(this.kFontType);
            this.mCharacterText[i][j].setTextHeight(2.7);
        }
        this.mCharacterText[i][0].setColor([0.4, 0.2, 0.2, 0.9]);
        this.mCharacterText[i][1].setColor([0.2, 0.2, 0.4, 0.9]);
        this.mCharacterText[i][2].setColor([0.2, 0.4, 0.2, 0.9]);

        this.mCharacterText[i][0].getXform().setPosition(this.leftX + 0.335 * this.width, 0.335 * this.width - 0.0811 * this.width * i);
        this.mCharacterText[i][1].getXform().setPosition(this.leftX + 0.335 * this.width, 0.310 * this.width - 0.0811 * this.width * i);
        this.mCharacterText[i][2].getXform().setPosition(this.leftX + 0.408 * this.width, 0.310 * this.width - 0.0811 * this.width * i);

    }

    // endregion

    // // region animation
    // this.mAnimationPos[0] = [this.leftX + 0.64 * this.width, this.topY - 0.19 * this.width];
    // this.mAnimationPos[1] = [this.leftX + 0.6 * this.width, this.topY - 0.27 * this.width];
    // this.mAnimationPos[2] = [this.leftX + 0.635 * this.width, this.topY - 0.35 * this.width];
    // this.mAnimationPos[3] = [this.leftX + 0.685 * this.width, this.topY - 0.23 * this.width];
    // this.mAnimationPos[4] = [this.leftX + 0.69 * this.width, this.topY - 0.32 * this.width];
    //
    // this.tangsengAnimate[0] = new SpriteAnimateRenderable(this.kTangsengFileLeft);
    // this.tangsengAnimate[1] = new SpriteAnimateRenderable(this.kTangsengFileLeft);
    // this.tangsengAnimate[2] = new SpriteAnimateRenderable(this.kTangsengFileLeft);
    // this.tangsengAnimate[3] = new SpriteAnimateRenderable(this.kTangsengFileRight);
    // this.tangsengAnimate[4] = new SpriteAnimateRenderable(this.kTangsengFileRight);
    // this.tangsengAnimate[0].setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateLeft);
    // this.tangsengAnimate[1].setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateLeft);
    // this.tangsengAnimate[2].setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateLeft);
    // this.tangsengAnimate[3].setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
    // this.tangsengAnimate[4].setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
    //
    // this.monkeyAnimate[0] = new SpriteAnimateRenderable(this.kMonkeyFileLeft);
    // this.monkeyAnimate[1] = new SpriteAnimateRenderable(this.kMonkeyFileLeft);
    // this.monkeyAnimate[2] = new SpriteAnimateRenderable(this.kMonkeyFileLeft);
    // this.monkeyAnimate[3] = new SpriteAnimateRenderable(this.kMonkeyFileRight);
    // this.monkeyAnimate[4] = new SpriteAnimateRenderable(this.kMonkeyFileRight);
    // this.monkeyAnimate[0].setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateLeft);
    // this.monkeyAnimate[1].setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateLeft);
    // this.monkeyAnimate[2].setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateLeft);
    // this.monkeyAnimate[3].setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
    // this.monkeyAnimate[4].setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
    //
    // this.zhubajieAnimate[0] = new SpriteAnimateRenderable(this.kZhubajieFileLeft);
    // this.zhubajieAnimate[1] = new SpriteAnimateRenderable(this.kZhubajieFileLeft);
    // this.zhubajieAnimate[2] = new SpriteAnimateRenderable(this.kZhubajieFileLeft);
    // this.zhubajieAnimate[3] = new SpriteAnimateRenderable(this.kZhubajieFileRight);
    // this.zhubajieAnimate[4] = new SpriteAnimateRenderable(this.kZhubajieFileRight);
    // this.zhubajieAnimate[0].setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateLeft);
    // this.zhubajieAnimate[1].setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateLeft);
    // this.zhubajieAnimate[2].setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateLeft);
    // this.zhubajieAnimate[3].setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
    // this.zhubajieAnimate[4].setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);

    // for (var i = 0; i < 5; i++) {
    //     this.tangsengAnimate[i].setColor([1, 1, 1, 0]);
    //     this.tangsengAnimate[i].getXform().setPosition(this.mAnimationPos[i][0], this.mAnimationPos[i][1]);
    //     this.tangsengAnimate[i].getXform().setSize(10, 10);
    //     this.tangsengAnimate[i].setAnimationSpeed(6);
    //     this.tangsengAnimate[i].setSpriteSequence(512 - 65 * i, 0, 63.5, 65, 9, 0);
    //
    //     this.monkeyAnimate[i].setColor([1, 1, 1, 0]);
    //     this.monkeyAnimate[i].getXform().setPosition(this.mAnimationPos[i][0], this.mAnimationPos[i][1]);
    //     this.monkeyAnimate[i].getXform().setSize(10, 10);
    //     this.monkeyAnimate[i].setAnimationSpeed(6);
    //     this.monkeyAnimate[i].setSpriteSequence(512 - 65 * i, 0, 63.5, 65, 9, 0);
    //
    //     this.zhubajieAnimate[i].setColor([1, 1, 1, 0]);
    //     this.zhubajieAnimate[i].getXform().setPosition(this.mAnimationPos[i][0], this.mAnimationPos[i][1]);
    //     this.zhubajieAnimate[i].getXform().setSize(10, 10);
    //     this.zhubajieAnimate[i].setAnimationSpeed(6);
    //     this.zhubajieAnimate[i].setSpriteSequence(512 - 65 * i, 0, 63.5, 65, 9, 0);
    // }

    this.kTypesNum["Helmet"] = 0;
    this.kTypesNum["Necklace"] = 1;
    this.kTypesNum["Arm"] = 2;
    this.kTypesNum["Bracelet"] = 3;
    this.kTypesNum["Bracelet2"] = 4;
    this.kTypesNum["Shoes"] = 5;
    this.kTypesNum["Sword"] = 6;
    this.kTypesNum["Shield"] = 7;
    this.kTypesNum["Mask"] = 8;
    this.kTypesNum["ArmorUp"] = 9;
    this.kTypesNum["ArmorDown"] = 10;

    this.kTypes = ["Helmet", "Necklace", "Arm", "Bracelet", "Bracelet2", "Shoes", "Sword", "Shield", "Mask", "ArmorUp", "ArmorDown"];

    // WeaponsSet["YiTian Sword"] = new Weapons("YiTian Sword", this.kSword_A1, "Super Rare!! " + "Attack+200", "Sword");
    // WeaponsSet["Blue Barcer"] = new Weapons("Blue Barcer", this.kArm_A1, "Attack + 50,Defense + 20", "Arm");
    // WeaponsSet["QingYun Helmet"] = new Weapons("QingYun Helmet", this.kHelmet_A1, "Very Rare! " + "Defense+100,Avoid+0.10", "Helmet");
    // WeaponsSet["Legend Armor"] = new Weapons("Legend Armor", this.kArmor_up_A1, "Defense + 200", "ArmorUp");
    // WeaponsSet["Legend Trousers"] = new Weapons("Legend Trousers", this.kArmor_down_A1, "Defense + 100", "ArmorDown");
    // WeaponsSet["Necklace"] = new Weapons("Necklace", this.kNecklace_A1, "Attack + 50", "Necklace");
    // WeaponsSet["QingYun Shoes"] = new Weapons("QingYun Shoes", this.kShoes_A1, "Attack + 50, Speed + 20", "Shoes");

    ItemSet["YiTian Sword"] = new Weapons("YiTian Sword", this.kSword_A1, ["Extremely Rare!!", "Attack + 12"], "Sword");
    ItemSet["Blue Barcer"] = new Weapons("Blue Barcer", this.kArm_A1, ["Attack + 5 ,Defense + 5"], "Arm");
    ItemSet["QingYun Helmet"] = new Weapons("QingYun Helmet", this.kHelmet_A1, ["Very Rare! ", "Defense + 10"], "Helmet");
    ItemSet["Legend Armor"] = new Weapons("Legend Armor", this.kArmor_up_A1, ["Super Rare!", "Defense + 8"], "ArmorUp");
    ItemSet["Legend Trousers"] = new Weapons("Legend Trousers", this.kArmor_down_A1, ["Defense + 6"], "ArmorDown");
    ItemSet["Necklace"] = new Weapons("Necklace", this.kNecklace_A1, ["Pretty Rare", "Attack + 8"], "Necklace");
    ItemSet["QingYun Shoes"] = new Weapons("QingYun Shoes", this.kShoes_A1, ["Attack + 5"], "Shoes");

    window.package.addProps(ItemSet["YiTian Sword"]);
    window.package.addProps(ItemSet["Legend Armor"]);

    // var i;
    // for (i in WeaponsSet) {
    //     window.package.addProps(WeaponsSet[i]);                    // 全给玩家
    // }
};

WeaponsPack.prototype.update = function () {
    // if (gEngine.Input.isKeyReleased(gEngine.Input.keys.Z)) {
    //     switchWeaponsPack();
    // }

    if (!document.mShowWeaponsPack) {
        this.currentSelectPage = 0;
        return;
    }

    // switch (this.currentSelectCharacter) {
    //     case 0:
    //         for (var i = 0; i < 5; i++) {
    //             this.tangsengAnimate[i].updateAnimation();
    //         }
    //         break;
    //     case 1:
    //         for (var i = 0; i < 5; i++) {
    //             this.monkeyAnimate[i].updateAnimation();
    //         }
    //         break;
    //     case 2:
    //         for (var i = 0; i < 5; i++) {
    //             this.zhubajieAnimate[i].updateAnimation();
    //         }
    //         break;
    // }

    switch (this.currentSelectPage) {
        // left page
        case 0: {
            if (gEngine.Input.isKeyClicked(gEngine.Input.keys.S)) {
                this.currentSelectCharacter = Math.min(3, this.currentSelectCharacter + 1);
            }

            if (gEngine.Input.isKeyClicked(gEngine.Input.keys.W)) {
                this.currentSelectCharacter = Math.max(0, this.currentSelectCharacter - 1);
            }

            if (gEngine.Input.isKeyReleased(gEngine.Input.keys.Escape)) {
                this.currentSelectPage = 0;
                this.currentSelectWeapon = -1;
                switchWeaponsPack();
            }

            if (gEngine.Input.isKeyClicked(gEngine.Input.keys.D)) {
                this.currentSelectPage = 1;
                this.currentSelectWeapon = 0;
            }

            if (gEngine.Input.isKeyClicked(gEngine.Input.keys.J)) {
                this.currentSelectPage = 1;
                this.currentSelectWeapon = 0;
            }
            break;
        }
        // right page
        case 1: {
            if (gEngine.Input.isKeyClicked(gEngine.Input.keys.S)) {
                this.currentSelectWeapon = Math.min(14, this.currentSelectWeapon + 1);
            }

            if (gEngine.Input.isKeyClicked(gEngine.Input.keys.W)) {
                this.currentSelectWeapon = Math.max(0, this.currentSelectWeapon - 1);
            }

            if (gEngine.Input.isKeyReleased(gEngine.Input.keys.Escape)) {
                this.currentSelectPage = 0;
                switchWeaponsPack();
            }

            if (gEngine.Input.isKeyClicked(gEngine.Input.keys.D)) {
                if (this.currentSelectWeapon <= 5) {
                    this.currentSelectWeapon += 8;
                } else if (this.currentSelectWeapon == 6) {
                    this.currentSelectWeapon = 7;
                } else if (this.currentSelectWeapon == 7) {
                    this.currentSelectWeapon = 14;
                }
            }

            if (gEngine.Input.isKeyClicked(gEngine.Input.keys.A)) {
                if (this.currentSelectWeapon == 14) {
                    this.currentSelectWeapon = 7;
                } else if (this.currentSelectWeapon >= 8) {
                    this.currentSelectWeapon -= 8;
                } else if (this.currentSelectWeapon == 7) {
                    this.currentSelectWeapon = 6;
                } else if (this.currentSelectWeapon <= 6) {
                    this.currentSelectPage = 0;
                    this.currentSelectWeapon = 0;
                }
            }

            if (gEngine.Input.isKeyClicked(gEngine.Input.keys.J)) {
                var weapon = this.equipedWeapons[this.currentSelectCharacter][this.currentSelectWeapon];
                var type = weapon.getType();
                if (weapon != null) {
                    this.unequipWeapons(type, this.currentSelectCharacter);
                } else {

                }
            }
        }
        // UI
        case 2: {

        }

    }
};

WeaponsPack.prototype.draw = function () {
    this.mCamera.setupViewProjection();

    if (this.currentSelectPage == 0 || this.currentSelectPage == 1) {
        this.mBg[this.currentSelectCharacter].draw(this.mCamera);

        // region draw weapons
        var cx = this.firstBrickX;
        for (var i = 0; i < 7; i++) {
            //var cy = this.topY - (0.1372 + i * 0.0322) * this.width - i * this.gapY1;
            var cy = this.firstBrickY - i * (0.0322 * this.width + this.gapY1);

            if (this.currentSelectPage == 1 && this.currentSelectWeapon == i) {
                this.mBrick.getXform().setPosition(cx - 0.2, cy);
                this.mBrick.draw(this.mCamera);
            }

            var weapon = this.equipedWeapons[this.currentSelectCharacter][i];
            if (weapon != null) {
                weapon.drawIconByPos(cx, cy, this.singleW1, this.singleW1, this.mCamera);
                if (this.currentSelectWeapon == i && this.currentSelectPage == 1) {
                    weapon.showInfoByPos(this.kFontType, cx + 5, cy, [0.9, 0.9, 0.9, 0.9], 0.4 * this.singleW1, this.mCamera);
                    //weapon.showInfoByPos(this.kFontType, this.firstBrickX + 1.5 * this.singleW1, this.firstBrickY - 8 * this.singleW1, [0.8, 0.8, 0.8, 0.9], 0.4 * this.singleW1, this.mCamera);
                }
            }
        }
        for (i = 7; i < 8; i++) {
            cx += this.singleW1 + this.gapY1;
            if (this.currentSelectPage == 1 && this.currentSelectWeapon == i) {
                this.mBrick.getXform().setPosition(cx - 0.2, cy);
                this.mBrick.draw(this.mCamera);
            }

            var weapon = this.equipedWeapons[this.currentSelectCharacter][i];
            if (weapon != null) {
                weapon.drawIconByPos(cx, cy, this.singleW1, this.singleW1, this.mCamera);
                if (this.currentSelectWeapon == i && this.currentSelectPage == 1) {
                    weapon.showInfoByPos(this.kFontType, cx + 5, cy, [0.9, 0.9, 0.9, 0.9], 0.4 * this.singleW1, this.mCamera);
                }
            }
        }
        cx = this.firstBrickX + 0.2 * this.width;
        for (i = 8; i < 15; i++) {
            cy = this.firstBrickY - (i - 8) * (0.0322 * this.width + this.gapY1);
            if (this.currentSelectPage == 1 && this.currentSelectWeapon == i) {
                this.mBrick.getXform().setPosition(cx - 0.2, cy);
                this.mBrick.draw(this.mCamera);
            }

            var weapon = this.equipedWeapons[this.currentSelectCharacter][i];
            if (weapon != null) {
                weapon.drawIconByPos(cx, cy, this.singleW1, this.singleW1, this.mCamera);
                if (this.currentSelectWeapon == i && this.currentSelectPage == 1) {
                    weapon.showInfoByPos(this.kFontType, cx - 20, cy, [0.9, 0.9, 0.9, 0.9], 0.4 * this.singleW1, this.mCamera);
                }
            }
        }
        // endregion

        for (var i = 0; i < 3; i++) {
            this.mCharacterText[i][0].setText(CharacterSet[i].getCurrentHP() + "/" + CharacterSet[i].getMaxHP());
            this.mCharacterText[i][0].draw(this.mCamera);
            var atk = CharacterSet[i].getATK();
            this.mCharacterText[i][1].setText("" + atk);
            this.mCharacterText[i][1].draw(this.mCamera);
            var def = CharacterSet[i].getDEF();
            this.mCharacterText[i][2].setText("" + def);
            this.mCharacterText[i][2].draw(this.mCamera);
        }
    } else if (this.currentSelectPage == 2) {

    }

    // switch (this.currentSelectCharacter) {
    //     case 0:
    //         for (var i = 0; i < 5; i++) {
    //             this.tangsengAnimate[i].draw(this.mCamera);
    //         }
    //         break;
    //     case 1:
    //         for (var i = 0; i < 5; i++) {
    //             this.monkeyAnimate[i].draw(this.mCamera);
    //         }
    //         break;
    //     case 2:
    //         for (var i = 0; i < 5; i++) {
    //             this.zhubajieAnimate[i].draw(this.mCamera);
    //         }
    //         break;
    // }
};

WeaponsPack.prototype.equipWeapon = function (weapon, charNum) {
    var type = weapon.getType();
    var n = this.kTypesNum[type];
    weapon.setEquipedInfo(charNum);
    if (this.equipedWeapons[charNum][n] != null) {
        this.unequipWeapons(this.equipedWeapons[charNum][n].getType(), charNum);
        // window.package.addProps(this.equipedWeapons[charNum][n]);
    }
    this.equipedWeapons[charNum][n] = weapon;

    var dHP = weapon.getHPadd();
    var dVP = weapon.getVPadd();
    var dATK = weapon.getATKadd();
    var dDEF = weapon.getDEFadd();

    CharacterSet[charNum].incCurrentHP(dHP);
    CharacterSet[charNum].incCurrentVP(dVP);
    CharacterSet[charNum].incATK(dATK);
    CharacterSet[charNum].incDEF(dDEF);
};

WeaponsPack.prototype.unequipWeapons = function (type, charNum) {

    var typeNum = this.kTypesNum[type];
    var weapon = this.equipedWeapons[charNum][typeNum];
    if (weapon != null) {
        var dHP = weapon.getHPadd();
        var dVP = weapon.getVPadd();
        var dATK = weapon.getATKadd();
        var dDEF = weapon.getDEFadd();

        CharacterSet[charNum].incCurrentHP(-dHP);
        CharacterSet[charNum].incCurrentVP(-dVP);
        CharacterSet[charNum].incATK(-dATK);
        CharacterSet[charNum].incDEF(-dDEF);

        weapon.setEquipedInfo(-1);
        window.package.addProps(weapon);
        this.equipedWeapons[charNum][typeNum] = null;
    }
};
