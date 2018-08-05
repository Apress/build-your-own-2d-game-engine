"use strict";

function Props(name, iconFile, description) {
    this.mName = name;
    this.mIcon = new TextureRenderable(iconFile);
    this.mIcon.setColor([1, 1, 1, 0]);
    this.mIcon.getXform().setPosition(-200, -200);
    this.mDescription = description;
    this.mType = "Food";

    this.mNameText = new FontRenderable(name);
    //this.mDescriptionText = new FontRenderable(description);

    this.HP = this.VP = this.ATK = this.DEF = this.SPD = this.EXP = 0;
    this.Money = 20;

    this.mCanUse = true;

    switch(name) {
        case "Queen Peach" :
            this.HP = 99999;
            this.Money = 800;
            break;
        case "Nine Turn Dan" :
            this.VP = -99999;
            this.Money = 800;
            break;
        case "Blood of Dragon" :
            this.HP = 400;
            this.Money = 200;
            break;
        case "Spirit of Dragon" :
            this.VP = -400;
            this.Money = 200;
            break;
        case "Ham Bone" :
            this.HP = 250;
            this.Money = 100;
            break;
        case "Glutinous Congee" :
            this.VP = -250;
            this.Money = 100;
            break;
        case "Dongpo Pork" :
            this.ATK = 6;
            this.Money = 200;
            break;
        case "What's this?" :
            this.DEF = 6;
            this.Money = 200;
            break;
        case "Hu Luo Bo" :
            this.HP = 200;
            this.VP = -100;
            break;
        case "Golden Lotus" :
            this.mCanUse = false;
            this.mType = "Mission";
            this.Money = 10000;
            break;
        case "Zu Fang Chuang Yao" :
            this.HP = 200;
            this.VP = -50;
            this.Money = 90;
            break;
        case "Hu Luo Bo" :
            this.HP = 100;
            this.Money = 50;
            break;
        case "Tong Jing Ti" :
            this.ATK = 8;
            this.Money = 100;
    }
}

Props.prototype.getName = function () {
    return this.mName;
};

Props.prototype.drawIconByPos = function (centerX, centerY, width, height, aCamera) {
    this.mIcon.getXform().setPosition(centerX, centerY);
    this.mIcon.getXform().setSize(width, height);
    this.mIcon.draw(aCamera);
};

// left-top position: [leftX, topY]
Props.prototype.showNameByPos = function (fontType, leftX, topY, color, textH, aCamera) {
    this.mNameText.setFont(fontType);
    this.mNameText.setColor(color);
    this.mNameText.getXform().setPosition(leftX, topY);
    this.mNameText.setTextHeight(textH);
    this.mNameText.draw(aCamera);
};

// font: the font type; left-top position: [leftX, topY]
Props.prototype.showInfoByPos = function (fontType, leftX, topY, color, textH, aCamera) {
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

Props.prototype.getHPadd = function () {
    return (this.HP);
};
Props.prototype.getVPadd = function () {
    return (this.VP);
};
Props.prototype.getATKadd = function () {
    return (this.ATK);
};
Props.prototype.getDEFadd = function () {
    return (this.DEF);
};
Props.prototype.getMoney = function () {
    return (this.Money);
};
Props.prototype.canUse = function () {
    return (this.mCanUse);
};

Props.prototype.getType = function () {
    return (this.mType);
};
