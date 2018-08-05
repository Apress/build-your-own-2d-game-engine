/*
 * File: MyGame.js
 * This is the logic of our game.
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

var GFstate_speedUp = 0;

function MyGame(mapName) {
    this.mMapName = mapName;

    this.kHeroPic = "assets/hero/tangseng_walk.png";
    this.kHeroJson = "assets/hero/tangseng_walk.json";

    this.kHeroInfo = "assets/hero/character_info.json";

    this.kHintIcon = "assets/hint.png";

    this.kMapFile = [];
    this.kMapEvents = [];
    this.kMapEventIndex = [];
    this.kMapBkg = [];
    this.kMapFrg = [];
    this.kBGM = [];

    this.kMapFile["wanggong"] = "assets/map/wanggong/wanggong-dat.json";
    this.kMapEvents["wanggong"] = "assets/map/wanggong/wanggong-event.json";
    this.kMapEventIndex["wanggong"] = "assets/map/wanggong/wanggong-event-index.json";
    this.kMapBkg["wanggong"] = "assets/map/wanggong/wanggong-bkg.png";
    this.kMapFrg["wanggong"] = "assets/map/wanggong/wanggong-frg.png";
    this.kBGM["wanggong"] = "assets/bgm/wanggong-walk.m4a";

    this.kMapFile["zhuzishan"] = "assets/map/zhuzishan/zhuzishan-dat.json";
    this.kMapEvents["zhuzishan"] = "assets/map/zhuzishan/zhuzishan-event.json"
    this.kMapEventIndex["zhuzishan"] = "assets/map/zhuzishan/zhuzishan-event-index.json";;
    this.kMapBkg["zhuzishan"] = "assets/map/zhuzishan/zhuzishan-bkg.png";
    this.kMapFrg["zhuzishan"] = "assets/map/zhuzishan/zhuzishan-frg.png";
    this.kBGM["zhuzishan"] = "assets/bgm/zhuzishan-walk.m4a";

    this.kMapFile["zhuzishanjiao"] = "assets/map/zhuzishanjiao/zhuzishanjiao-dat.json";
    this.kMapEvents["zhuzishanjiao"] = "assets/map/zhuzishanjiao/zhuzishanjiao-event.json";
    this.kMapEventIndex["zhuzishanjiao"] = "assets/map/zhuzishanjiao/zhuzishanjiao-event-index.json";
    this.kMapBkg["zhuzishanjiao"] = "assets/map/zhuzishanjiao/zhuzishanjiao-bkg.png";
    this.kMapFrg["zhuzishanjiao"] = "assets/map/zhuzishanjiao/zhuzishanjiao-frg.png";
    this.kBGM["zhuzishanjiao"] = "assets/bgm/zhuzishanjiao-walk.m4a";

    this.kMapFile["huoyanshankou"] = "assets/map/huoyanshankou/huoyanshankou-dat.json";
    this.kMapEvents["huoyanshankou"] = "assets/map/huoyanshankou/huoyanshankou-event.json";
    this.kMapEventIndex["huoyanshankou"] = "assets/map/huoyanshankou/huoyanshankou-event-index.json";
    this.kMapBkg["huoyanshankou"] = "assets/map/huoyanshankou/huoyanshankou-bkg.png";
    this.kMapFrg["huoyanshankou"] = "assets/map/huoyanshankou/huoyanshankou-frg.png";
    this.kBGM["huoyanshankou"] = "assets/bgm/huoyanshankou-walk.m4a";

    this.kMapFile["huoyanshandi"] = "assets/map/huoyanshandi/huoyanshandi-dat.json";
    this.kMapEvents["huoyanshandi"] = "assets/map/huoyanshandi/huoyanshandi-event.json";
    this.kMapEventIndex["huoyanshandi"] = "assets/map/huoyanshandi/huoyanshandi-event-index.json";
    this.kMapBkg["huoyanshandi"] = "assets/map/huoyanshandi/huoyanshandi-bkg.png";
    this.kMapFrg["huoyanshandi"] = "assets/map/huoyanshandi/huoyanshandi-frg.png";
    this.kBGM["huoyanshandi"] = "assets/bgm/huoyanshandi-walk.m4a";

    this.kMapFile["shishi1"] = "assets/map/shishi1/shishi1-dat.json";
    this.kMapEvents["shishi1"] = "assets/map/shishi1/shishi1-event.json";
    this.kMapEventIndex["shishi1"] = "assets/map/shishi1/shishi1-event-index.json";
    this.kMapBkg["shishi1"] = "assets/map/shishi1/shishi1-bkg.png";
    this.kMapFrg["shishi1"] = "assets/map/shishi1/shishi1-frg.png";
    this.kBGM["shishi1"] = "assets/bgm/shishi1-walk.m4a";

    this.kMapFile["shishi2"] = "assets/map/shishi2/shishi2-dat.json";
    this.kMapEvents["shishi2"] = "assets/map/shishi2/shishi2-event.json";
    this.kMapEventIndex["shishi2"] = "assets/map/shishi2/shishi2-event-index.json";
    this.kMapBkg["shishi2"] = "assets/map/shishi2/shishi2-bkg.png";
    this.kMapFrg["shishi2"] = "assets/map/shishi2/shishi2-frg.png";
    this.kBGM["shishi2"] = "assets/bgm/shishi2-walk.m4a";

    this.kPackageBg = "assets/package/package_bg.png";
    this.kPackageBrick = "assets/package/package_brick.png";
    this.kPackageUIBg = "assets/package/package_ui.png";
    this.kPackageMoneyIcon = "assets/package/package_money_icon.png";
    this.kPackageFontType = "assets/fonts/package_font";

    // region food icon
    this.kQueenPeach = "assets/props/queen_peach_icon.png";
    this.kNineTurnDan = "assets/props/nine_turn_dan_icon.png";
    this.kBloodOfDragon = "assets/props/blood_of_dragon_icon.png";
    this.kSpiritOfDragon = "assets/props/spirit_of_dragon_icon.png";
    this.kGlutinousRiceCongee = "assets/props/glutinous_rice_congee_icon.png";
    this.kHamBone = "assets/props/ham_bone_icon.png";
    this.kDongpoPork = "assets/props/dongpo_pork_icon.png";
    this.kWhatsThis = "assets/props/whats_this_icon.png";
    // endregion

    this.mCamera = null;
    this.mSmallCamera = null;
    this.mShowHintIcon = false;

    this.mMainView = null;

    this.nextScene = null;
    this.startMsg = null;

    this.startMsgContent = null;

    this.lastPos = null;
    this.currentPos = null;
    this.mMyNPC = [];
}
gEngine.Core.inheritPrototype(MyGame, Scene);


MyGame.prototype.loadScene = function () {
    document.currentScene = this;
    UIButton.displayButtonGroup('default-button-group');

    gEngine.Textures.loadTexture(this.kMapBkg[this.mMapName]);
    gEngine.Textures.loadTexture(this.kMapFrg[this.mMapName]);
    gEngine.Textures.loadTexture(this.kHeroPic);
    gEngine.TextFileLoader.loadTextFile(this.kMapFile[this.mMapName], gEngine.TextFileLoader.eTextFileType.eJsonFile);
    gEngine.TextFileLoader.loadTextFile(this.kMapEvents[this.mMapName], gEngine.TextFileLoader.eTextFileType.eJsonFile);
    gEngine.TextFileLoader.loadTextFile(this.kMapEventIndex[this.mMapName], gEngine.TextFileLoader.eTextFileType.eJsonFile);

    gEngine.TextFileLoader.loadTextFile(this.kHeroJson, gEngine.TextFileLoader.eTextFileType.eJsonFile);
    gEngine.TextFileLoader.loadTextFile(this.kHeroInfo, gEngine.TextFileLoader.eTextFileType.eJsonFile);

    gEngine.Textures.loadTexture("assets/NPC/zhuzishan-npc1.png");
    gEngine.Textures.loadTexture("assets/NPC/zhuzishan-npc2.png");
    gEngine.Textures.loadTexture("assets/NPC/zhuzishan-npc3.png");
    gEngine.Textures.loadTexture("assets/NPC/zhuzishan-npc4.png");
    gEngine.Textures.loadTexture("assets/NPC/zhuzishanjiao-npc1.png");
    gEngine.Textures.loadTexture("assets/NPC/zhuzishanjiao-npc2.png");
    gEngine.Textures.loadTexture("assets/NPC/zhuzishan-npc5.png");
    gEngine.Textures.loadTexture("assets/NPC/huoyanshankou-npc1.png");
    gEngine.Textures.loadTexture("assets/NPC/huoyanshankou-npc2.png");
    gEngine.Textures.loadTexture("assets/NPC/huoyanshankou-npc3.png");
    gEngine.Textures.loadTexture("assets/NPC/huoyanshandi-npc1.png");
    gEngine.Textures.loadTexture("assets/NPC/huoyanshandi-npc2.png");
    gEngine.Textures.loadTexture("assets/NPC/huoyanshandi-npc3.png");
    gEngine.Textures.loadTexture("assets/NPC/huoyanshandi-npc4.png");
    gEngine.Textures.loadTexture("assets/NPC/huoyanshandi-npc5.png");
    gEngine.Textures.loadTexture("assets/NPC/shishi1-npc1.png");
    gEngine.Textures.loadTexture("assets/NPC/shishi2-npc1.png");

    gEngine.TextFileLoader.loadTextFile("assets/NPC/zhuzishan-npc1.json", gEngine.TextFileLoader.eTextFileType.eJsonFile);
    gEngine.TextFileLoader.loadTextFile("assets/NPC/zhuzishan-npc2.json", gEngine.TextFileLoader.eTextFileType.eJsonFile);
    gEngine.TextFileLoader.loadTextFile("assets/NPC/zhuzishan-npc3.json", gEngine.TextFileLoader.eTextFileType.eJsonFile);
    gEngine.TextFileLoader.loadTextFile("assets/NPC/zhuzishan-npc4.json", gEngine.TextFileLoader.eTextFileType.eJsonFile);
    gEngine.TextFileLoader.loadTextFile("assets/NPC/zhuzishanjiao-npc1.json", gEngine.TextFileLoader.eTextFileType.eJsonFile);
    gEngine.TextFileLoader.loadTextFile("assets/NPC/zhuzishanjiao-npc2.json", gEngine.TextFileLoader.eTextFileType.eJsonFile);
    gEngine.TextFileLoader.loadTextFile("assets/NPC/zhuzishan-npc5.json", gEngine.TextFileLoader.eTextFileType.eJsonFile);
    gEngine.TextFileLoader.loadTextFile("assets/NPC/huoyanshankou-npc1.json", gEngine.TextFileLoader.eTextFileType.eJsonFile);
    gEngine.TextFileLoader.loadTextFile("assets/NPC/huoyanshankou-npc2.json", gEngine.TextFileLoader.eTextFileType.eJsonFile);
    gEngine.TextFileLoader.loadTextFile("assets/NPC/huoyanshankou-npc3.json", gEngine.TextFileLoader.eTextFileType.eJsonFile);
    gEngine.TextFileLoader.loadTextFile("assets/NPC/huoyanshandi-npc1.json", gEngine.TextFileLoader.eTextFileType.eJsonFile);
    gEngine.TextFileLoader.loadTextFile("assets/NPC/huoyanshandi-npc2.json", gEngine.TextFileLoader.eTextFileType.eJsonFile);
    gEngine.TextFileLoader.loadTextFile("assets/NPC/huoyanshandi-npc3.json", gEngine.TextFileLoader.eTextFileType.eJsonFile);
    gEngine.TextFileLoader.loadTextFile("assets/NPC/huoyanshandi-npc4.json", gEngine.TextFileLoader.eTextFileType.eJsonFile);
    gEngine.TextFileLoader.loadTextFile("assets/NPC/huoyanshandi-npc5.json", gEngine.TextFileLoader.eTextFileType.eJsonFile);
    gEngine.TextFileLoader.loadTextFile("assets/NPC/shishi1-npc1.json", gEngine.TextFileLoader.eTextFileType.eJsonFile);
    gEngine.TextFileLoader.loadTextFile("assets/NPC/shishi2-npc1.json", gEngine.TextFileLoader.eTextFileType.eJsonFile);

    gEngine.Textures.loadTexture(this.kHintIcon);
    gEngine.Textures.loadTexture(this.kPackageBg);
    gEngine.Textures.loadTexture(this.kPackageBrick);
    gEngine.Textures.loadTexture(this.kPackageUIBg);
    gEngine.Textures.loadTexture(this.kPackageMoneyIcon);

    gEngine.Textures.loadTexture(this.kQueenPeach);
    gEngine.Textures.loadTexture(this.kNineTurnDan);
    gEngine.Textures.loadTexture(this.kBloodOfDragon);
    gEngine.Textures.loadTexture(this.kSpiritOfDragon);
    gEngine.Textures.loadTexture(this.kGlutinousRiceCongee);
    gEngine.Textures.loadTexture(this.kHamBone);
    gEngine.Textures.loadTexture(this.kDongpoPork);
    gEngine.Textures.loadTexture(this.kWhatsThis);

    gEngine.Fonts.loadFont(this.kPackageFontType);
    gEngine.AudioClips.loadAudio(this.kBGM[this.mMapName]);

};

MyGame.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kMapBkg[this.mMapName]);
    gEngine.Textures.unloadTexture(this.kMapFrg[this.mMapName]);
    gEngine.Textures.unloadTexture(this.kHeroPic);

    gEngine.AudioClips.stopBackgroundAudio();
    gEngine.AudioClips.unloadAudio(this.kBGM[this.mMapName]);

    if (this.nextScene) {
        document.currentScene = this.nextScene;
    }

    gEngine.Core.startScene(document.currentScene);
};

MyGame.prototype.initialize = function () {
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);

    gEngine.AudioClips.playBackgroundAudio(this.kBGM[this.mMapName]);

    window.statusBar.initialize();
    document.mShowStatusBar = false;

    if (window.package === null) {
        window.package = new Package();
        window.package.loadScene();
        window.package.initialize();
    }
	if (window.weaponsPack === null) {
        window.weaponsPack = new WeaponsPack();
        window.weaponsPack.loadScene();
        window.weaponsPack.initialize();
    }
    this.mMyHero = new MyHero(this.kHeroPic, this.kHeroJson);
    this.mHintIcon = new TextureRenderable(this.kHintIcon);
    this.mHintIcon.getXform().setSize(0.55, 0.55);

    this.mMyMap = new Map(this.mMapName, this.kMapFile[this.mMapName], this.kMapEvents[this.mMapName], this.kMapEventIndex[this.mMapName]);

    this.mMyNPC = this.mMyMap.initNPC();

    if (this.lastPos === null) {
       this.mMyHero.getHero().getXform().setPosition(this.mMyMap.mBorn[0], this.mMyMap.mBorn[1]);
    } else {
        this.mMyHero.getHero().getXform().setPosition(this.lastPos[0], this.lastPos[1]);
        this.mMyHero.stand(this.lastPos[2]);
    }

    var i;
    for (i = 0; i < this.mMyNPC.length; ++i) {
        var pos = this.mMyMap.pixelCenter(this.mMyMap.mNPC[i]);
        this.mMyNPC[i].setPosition(pos[0], pos[1]);
    }

    this.currentPos = [this.mMyHero.getHero().getXform().getXPos(), this.mMyHero.getHero().getXform().getYPos(), this.mMyHero.getDir()];

    this.mMapBkg = new Background(this.kMapBkg[this.mMapName], [0, 0, 0, 0], [this.mMyMap.mWidth/2, this.mMyMap.mHeight/2], [this.mMyMap.mWidth, this.mMyMap.mHeight]);
    this.mMapFrg = new Background(this.kMapFrg[this.mMapName], [0, 0, 0, 0], [this.mMyMap.mWidth/2, this.mMyMap.mHeight/2], [this.mMyMap.mWidth, this.mMyMap.mHeight]);

    gEngine.LayerManager.cleanUp();
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eBackground, this.mMapBkg);

    var i;
    for (i = 0; i < this.mMyNPC.length; ++i)
        gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mMyNPC[i].getNPC());

    gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mMyHero.getHero());

    gEngine.LayerManager.addToLayer(gEngine.eLayer.eFront, this.mMapFrg);

    this.mMyMap.addItems();

    var ratio = (function(w) {
        if (w > 40) return 0.5;
        else if (w < 20) return 1;
        else return  -w / 40 + 1.5;
    })(this.mMyMap.mWidth);

    this.mCamera = this.mMyMap.getCamera([this.currentPos[0], this.currentPos[1]],
                                            ratio,
                                            [0, 0, this.mMyMap.mViewWidth, this.mMyMap.mViewHeight]);
    this.mMainView = new MainView(this.mCamera);

    this.mBigCamera = this.mMyMap.getCamera([this.currentPos[0], this.currentPos[1]],
                                            1,
                                            [185, 0, 600, 600]);
    this.mBigCamera.setBackgroundColor([0.105, 0.169, 0.204, 1]);

    this.mSmallCamera = this.mMyMap.getCamera([this.currentPos[0], this.currentPos[1]],
                                                 0.75,
                                                 [820, 450, 150, 150]);
    this.mSmallCamera.setBackgroundColor([0.105, 0.169, 0.204, 1]);

    if (CharacterSet.length <= 0)
        CharacterSet_Init(this.kHeroInfo);

    // 战斗失败，重新开始
    if (document.mLastCombatWin === false) {
        // 重置当前地图所有事件
        var eventList = this.mMyMap.mEvents;
        var ee = null;
        for (ee in eventList) {
            eventList[ee][eventList[ee].length - 1] = 0;
        }

        // 人物状态回复
        for (i = 0; i < 3; ++i) {
            var ch = CharacterSet[i];
            ch.mCurrentHP = ch.mMaxHP;
            ch.mCurrentVP = 0;
        }

        // 回到地图出生点
        this.mMyHero.getHero().getXform().setPosition(this.mMyMap.mBorn[0], this.mMyMap.mBorn[1]);
    }
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]);

    this.mMainView.setup();

    gEngine.LayerManager.drawAllLayers(this.mMainView.getCam());

    if (this.mShowHintIcon) {
        this.mHintIcon.draw(this.mMainView.getCam());
    }

    if (document.mShowSmallMap && this.mMapName !== "shishi1" && this.mMapName !== "shishi2") {
        this.mSmallCamera.setupViewProjection();
        var i;
        for (i = 0; i < this.mMyMap.mItems.length; ++i)
            this.mMyMap.mItems[i].draw(this.mSmallCamera);
        this.mMyHero.getHero().draw(this.mSmallCamera);
    }

    if (document.mShowBigMap && this.mMapName !== "shishi1" && this.mMapName !== "shishi2") {
        this.mBigCamera.setupViewProjection();
        var i;
        for (i = 0; i < this.mMyMap.mItems.length; ++i)
            this.mMyMap.mItems[i].draw(this.mBigCamera);
        this.mMyHero.getHero().draw(this.mBigCamera);
    }

	if (document.mShowWeaponsPack) {
        window.weaponsPack.draw();
    }

    if (document.mShowPackage) {
        window.package.draw();
    }

    if (document.mShowStatusBar) {
        window.statusBar.draw();
    }
};

MyGame.prototype.increasShapeSize = function(obj, delta) {
    var s = obj.getRigidBody();
    var r = s.incShapeSizeBy(delta);
};

MyGame.prototype.resetPos = function() {
    this.mMyHero.getHero().getXform().setPosition(14, 10);
    this.resume();
};

function realDirection() {
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D) && gEngine.Input.isKeyPressed(gEngine.Input.keys.A)) return null;
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W) && gEngine.Input.isKeyPressed(gEngine.Input.keys.S)) return null;
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W)) return "Up";
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S)) return "Down";
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)) return "Left";
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) return "Right";
}

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame.kBoundDelta = 0.1;
MyGame.prototype.update = function () {
    this.message();

    window.statusBar.update();

    if (!document.mShowPackage) {
        window.weaponsPack.update();
    }

    // if (document.mShowPackage) {
        window.package.update();
    // }

    var deltaX = (GFstate_speedUp == 1) ? 0.1 : 0.05; //0,05
    var xform = this.mMyHero.getHero().getXform();

    this.currentPos = [xform.getXPos(), xform.getYPos(), this.mMyHero.getDir()];

    this.mHintIcon.getXform().setPosition(xform.getXPos(), xform.getYPos() + 0.5);

    this.moveCamera(xform);

    if  (gEngine.Input.isKeyClicked(gEngine.Input.keys.M)) {
        switchBigMap();
    }

    if  (gEngine.Input.isKeyClicked(gEngine.Input.keys.X)) {
        switchPackage();
    }

    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Z)) {
        switchWeaponsPack();
    }

    if (isMapFreezed()) return ;

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D) && realDirection() === "Right") {
        this.mMyHero.walk("Right");

        var canMove = true;
        canMove = this.mMyMap.canWalk(xform.getXPos(), xform.getYPos(), "Right");
        canMove = canMove && xform.getXPos() <= this.mMyMap.mWidth - 0.5;

        if (canMove)
            xform.incXPosBy(deltaX);
    }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W) && realDirection() === "Up") {
        this.mMyHero.walk("Up");

        var canMove = true;
        canMove = this.mMyMap.canWalk(xform.getXPos(), xform.getYPos(), "Up");
        canMove = canMove && xform.getYPos() <= this.mMyMap.mHeight - 0.5;

        if (canMove)
            xform.incYPosBy(deltaX);
    }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S) && realDirection() === "Down") {
        this.mMyHero.walk("Down");

        var canMove = true;
        canMove = this.mMyMap.canWalk(xform.getXPos(), xform.getYPos(), "Down");
        canMove = canMove && xform.getYPos() >= 0.5;

        if (canMove)
            xform.incYPosBy(-deltaX);
    }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A) && realDirection() === "Left") {
        this.mMyHero.walk("Left");

        var canMove = true;
        canMove = this.mMyMap.canWalk(xform.getXPos(), xform.getYPos(), "Left");
        canMove = canMove && xform.getXPos() >= 0.5;

        if (canMove)
            xform.incXPosBy(-deltaX);
    }

    if  (gEngine.Input.isKeyReleased(gEngine.Input.keys.D)) {
        this.mMyHero.stand("Right");
    }

    if  (gEngine.Input.isKeyReleased(gEngine.Input.keys.W)) {
        this.mMyHero.stand("Up");
    }

    if  (gEngine.Input.isKeyReleased(gEngine.Input.keys.A)) {
        this.mMyHero.stand("Left");
    }

    if  (gEngine.Input.isKeyReleased(gEngine.Input.keys.S)) {
        this.mMyHero.stand("Down");
    }

    if  (gEngine.Input.isKeyClicked(gEngine.Input.keys.C)) {
        switchStatusBar();
    }

    if  (gEngine.Input.isKeyClicked(gEngine.Input.keys.N)) {
        switchSmallMap();
    }
    var e = this.mMyMap.detectEvent(this, xform.getXPos(), xform.getYPos(), this.mMyHero.getDir());
    if (e)
        e(this);

    this.lastPos = this.currentPos;

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Space)) {
        GFstate_speedUp = 1;
    } else {
        GFstate_speedUp = 0;
    }
};

MyGame.prototype.pause = function() {
    window.mMapFreezed = true;
    document.getElementById('pauseUI').style.display = "block";
};

MyGame.prototype.resume = function() {
    document.getElementById('pauseUI').style.display = "none";
    window.mMapFreezed = false;
};

MyGame.prototype.getHero = function() {
    return this.mMyHero.getHero();
};

MyGame.prototype.moveCamera = function(xform) {
    var newCenter = [xform.getXPos(), xform.getYPos()];

    var ratio = this.mMyMap.mViewHeight / this.mMyMap.mViewWidth;

    if (newCenter[0] + this.mCamera.getWCWidth() / 2 >= this.mMyMap.mWidth)
        newCenter[0] = this.mMyMap.mWidth - this.mCamera.getWCWidth() / 2;
    if (newCenter[0] - this.mCamera.getWCWidth() / 2 <= 0)
        newCenter[0] = this.mCamera.getWCWidth() / 2;
    if (newCenter[1] + this.mCamera.getWCWidth() / 2 * ratio >= this.mMyMap.mWidth)
        newCenter[1] = this.mMyMap.mWidth - this.mCamera.getWCWidth() / 2 * ratio;
    if (newCenter[1] - this.mCamera.getWCWidth() / 2 * ratio <= 0)
        newCenter[1] = this.mCamera.getWCWidth() / 2 * ratio;

    this.mCamera.setWCCenter(newCenter[0], newCenter[1]);
    this.mCamera.update();
    this.mSmallCamera.setWCCenter(newCenter[0], newCenter[1]);
    this.mSmallCamera.update();
    this.mBigCamera.setWCCenter(newCenter[0], newCenter[1]);
    this.mBigCamera.update();
};
