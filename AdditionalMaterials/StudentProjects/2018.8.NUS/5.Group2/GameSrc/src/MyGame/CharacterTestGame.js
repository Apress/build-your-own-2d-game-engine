"use strict";

function CharacterTestGame() {
    this.kMonkeyIconSprite = "assets/monkey_icon2.png";
    this.kMonkeyDialogSprite = "assets/monkey_dialog.png";
    this.kMonkeyBattleSprite = "assets/monkey_battle.png";

    this.kMonkeyFile = "assets/Monkey.json";
    this.kPigFile = "assets/Pig.json";
    this.kMontShaFile = "assets/MontSha.json";

    this.mCamera = null;

    this.mCharacterSet = [];
}
gEngine.Core.inheritPrototype(CharacterTestGame, Scene);

CharacterTestGame.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kMonkeyIconSprite);
    gEngine.Textures.loadTexture(this.kMonkeyDialogSprite);
    gEngine.Textures.loadTexture(this.kMonkeyBattleSprite);
    gEngine.TextFileLoader.loadTextFile(this.kMonkeyFile, gEngine.TextFileLoader.eTextFileType.eTextFile);
    gEngine.TextFileLoader.loadTextFile(this.kPigFile, gEngine.TextFileLoader.eTextFileType.eTextFile);
    gEngine.TextFileLoader.loadTextFile(this.kMontShaFile, gEngine.TextFileLoader.eTextFileType.eTextFile);
};

CharacterTestGame.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kMonkeyIconSprite);
    gEngine.Textures.unloadTexture(this.kMonkeyDialogSprite);
    gEngine.Textures.unloadTexture(this.kMonkeyBattleSprite);
    gEngine.TextFileLoader.unloadTextFile(this.kMonkeyFile, gEngine.TextFileLoader.eTextFileType.eTextFile);
    gEngine.TextFileLoader.unloadTextFile(this.kPigFile, gEngine.TextFileLoader.eTextFileType.eTextFile);
    gEngine.TextFileLoader.unloadTextFile(this.kMontShaFile, gEngine.TextFileLoader.eTextFileType.eTextFile);
};

CharacterTestGame.prototype.initialize = function () {
    this.mCamera = new Camera(
        vec2.fromValues(50, 40), // position of the camera
        100,                     // width of camera
        [0, 0, 800, 600]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);

    gEngine.DefaultResources.setGlobalAmbientIntensity(3);

/*    var jsonString1 = gEngine.ResourceMap.retrieveAsset(this.kMonkeyFile);
    var jsonString2 = gEngine.ResourceMap.retrieveAsset(this.kPigFile);
    var jsonString3 = gEngine.ResourceMap.retrieveAsset(this.kMontShaFile);
    var monkeyInfo = JSON.parse(jsonString);
    var monkeyInfo = JSON.parse(jsonString);
    var monkeyInfo = JSON.parse(jsonString);*/

    var monkeyInfo = retrieveAndParse(this.kMonkeyFile);
    var pigInfo = retrieveAndParse(this.kPigFile);
    var montShaInfo = retrieveAndParse(this.kMontShaFile);

    this.mCharacterSet[0] = new Character(monkeyInfo, this.kMonkeyIconSprite, this.kMonkeyIconSprite, this.kMonkeyIconSprite);
    this.mCharacterSet[1] = new Character(pigInfo, this.kMonkeyDialogSprite, this.kMonkeyDialogSprite, this.kMonkeyDialogSprite);
    this.mCharacterSet[2] = new Character(montShaInfo, this.kMonkeyBattleSprite, this.kMonkeyBattleSprite, this.kMonkeyBattleSprite);
};

CharacterTestGame.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();

    this.mCharacterSet[0].drawAllShowing(this.mCamera);
};

CharacterTestGame.prototype.update = function () {
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S)) {
        this.mCharacterSet[0].setImageMovement(80, -30, 80, 20, 0.5, 30, 30, 0);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W)) {
        this.mCharacterSet[0].setImageShowing(false, 0);
    }
    this.mCharacterSet[0].update();
};

function retrieveAndParse(filePath) {
    var jsonString = gEngine.ResourceMap.retrieveAsset(filePath);
    return JSON.parse(jsonString);
}
