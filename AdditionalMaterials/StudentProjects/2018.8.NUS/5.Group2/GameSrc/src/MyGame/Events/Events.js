"use strict";

var GameEvents = GameEvents || { };

GameEvents.shop = function(game) {
    CharacterSet_Recover();

    game.showMsg("Your HP and VP have recovered!");

    var hero = game.getHero();
    hero.getXform().incYPosBy(-0.1);
};

GameEvents.battle = function(game) {
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Down)) {
        enterCombat(game, CharacterSet[0], CharacterSet[1], "zhuzishan");
    }
};

GameEvents.treasure = function(game) {
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter) && game.mMyHero.getDir() === "Up") {
        ItemSet_addItem("Key", 1);
        game.showMsg("You've found a key!");
    }
};

GameEvents.next = function(game) {
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
        if (ItemSet_have("Key") > 0) {
            ShowDiv('Finished','fade');
        } else {
            game.showMsg("You have to find a key to pass");
        }
        var hero = game.getHero();
        hero.getXform().incXPosBy(-0.1);
    }
};
