"use strict";

function Weapons(name, iconFile, description, type) {
    this.mName = name;
    this.mType = type;
    this.mIcon = new TextureRenderable(iconFile);
    this.mIcon.setColor([1, 1, 1, 0]);
    this.mIcon.getXform().setPosition(-200, -200);
    this.mDescription = description;

    this.mEquipedInfo = -1;

    this.mNameText = new FontRenderable(name);
    //this.mDescriptionText = new FontRenderable(description);

    this.HPadd = this.VPadd = this.ATKadd = this.DEFadd = this.SPDadd = this.EXPadd = 0;
    this.HPratio = this.VPratio = this.ATKratio = this.DEFratio = this.SPDratio = this.EXPratio = 1;
    this.Money = 50;

    switch(name) {
        case "YiTian Sword" :
            this.ATKadd = 12;
            this.Money = 3000;
            break;
        case "QingYun Helmet" :
            this.DEFadd = 10;
            this.Money = 2000;
            break;
        case "Blue Barcer" :
            this.ATKadd = 5;
            this.DEFadd = 5;
            this.Money = 2000;
            break;
        case "Legend Armor" :
            this.DEFadd = 8;
            this.Money = 1800;
            break;
        case "Legend Trousers" :
            this.DEFadd = 6;
            this.Money = 1500;
            break;
        case "Necklace" :
            this.ATKadd = 8;
            this.Money = 1800;
            break;
        case "QingYun Shoes" :
            this.ATKadd = 5;
            this.SPDadd = 100;
            this.Money = 1000;
            break;
    }
}

Weapons.prototype.getName = function () {
    return this.mName;
};

Weapons.prototype.drawIconByPos = function (centerX, centerY, width, height, aCamera) {
    this.mIcon.getXform().setPosition(centerX, centerY);
    this.mIcon.getXform().setSize(width, height);
    this.mIcon.draw(aCamera);
};

// left-top position: [leftX, topY]
Weapons.prototype.showNameByPos = function (fontType, leftX, topY, color, textH, aCamera) {
    this.mNameText.setFont(fontType);
    this.mNameText.setColor(color);
    this.mNameText.getXform().setPosition(leftX, topY);
    this.mNameText.setTextHeight(textH);
    this.mNameText.draw(aCamera);
};

// font: the font type; left-top position: [leftX, topY]
Weapons.prototype.showInfoByPos = function (fontType, leftX, topY, color, textH, aCamera) {
    for (var i = 0; i < this.mDescription.length; i++) {
        var text = new FontRenderable(this.mDescription[i]);
        text.setFont(fontType);
        text.setColor(color);
        text.getXform().setPosition(leftX, topY - i * textH);
        text.setTextHeight(textH);
        text.draw(aCamera);
    }
    // this.mDescriptionText.setFont(fontType);
    // this.mDescriptionText.setColor(color);
    // this.mDescriptionText.getXform().setPosition(leftX, topY);
    // this.mDescriptionText.setTextHeight(textH);
    // this.mDescriptionText.draw(aCamera);
};


Weapons.prototype.getType = function () {
    return (this.mType);
};

Weapons.prototype.getEquipedInfo = function () {
    return (this.mEquipedInfo);
};

Weapons.prototype.setEquipedInfo = function (a) {
    this.mEquipedInfo = a;
};

// region 属性值

Weapons.prototype.getHPadd = function () {
    return (this.HPadd);
};
Weapons.prototype.getVPadd = function () {
    return (this.VPadd);
};
Weapons.prototype.getATKadd = function () {
    return (this.ATKadd);
};
Weapons.prototype.getDEFadd = function () {
    return (this.DEFadd);
};
Weapons.prototype.getMoney = function () {
    return (this.Money);
};

Weapons.prototype.getHPratio = function () {
    return (this.HPratio);
};
Weapons.prototype.getVPratio = function () {
    return (this.VPratio);
};
Weapons.prototype.getATKratio = function () {
    return (this.ATKratio);
};
Weapons.prototype.getDEFratio = function () {
    return (this.DEFratio);
};
// endregion
Weapons.prototype.canUse = function () {
    return true;
};
