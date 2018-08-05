"use strict";

var GameEvents = GameEvents || { };

GameEvents.handle = function (e, game) {
    // 是否按触发键
    if (e[0] && !gEngine.Input.isKeyClicked(gEngine.Input.keys[e[0]]))
        return null;

    document.mEventMutex = true;

    switch (e[1]) {

        case "Go":
        return function(game) {
            game.nextScene = getScene(e[2]);
            gEngine.GameLoop.stop();
            document.mEventMutex = false;
        }
        break;

        case "Show":
        return function(game) {
            var i;
            for (i = 0; i < e[2].length; ++i)
                document.mMsgQueue.push(e[2][i]);
        }
        break;

        // TO DO 改battle
        case "Battle":
        return function(game) {
            enterCombat(game, CharacterSet[0], e[2][1], e[2][0]);
        }

        case "Get":
        return function(game) {
            var i;
            for (i = 0; i < e[2].length; ++i)
                window.package.addProps(ItemSet[e[2][i]]);
            document.mEventMutex = false;
        }

        case "Win":
        if (document.mLastCombatWin) {
            return GameEvents.handle(e[2], game);
        } else {
            return null;
        }
        break;

        case "Check":
        if (window.package.checkProp(e[2])) {
            return GameEvents.handle(e[3], game);
        } else {
            return GameEvents.handle(e[4], game);
        }
        break;

        case "Back":
        return function(game) {
            var xform = game.getHero().getXform();
            xform.setPosition(xform.getXPos(), xform.getYPos() + 0.1);
        }
        break;

        case "Change":
        return function(game) {
            gEngine.LayerManager.removeFromLayer(gEngine.eLayer.eActors, game.mMyNPC[2].getNPC());
            game.mMyNPC[2].change("assets/NPC/zhuzishan-npc5.png", "assets/NPC/zhuzishan-npc5.json");
            gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, game.mMyNPC[2].getNPC());
            gEngine.LayerManager.drawAllLayers(game.mMainView.getCam());
            document.mEventMutex = false;
        }
        break;

        case "Learn":
        return function(game) {
            CharacterSet[e[2]].skills.push(SkillList.parseSkill(e[3]));
            document.mEventMutex = false;
        }
        break;

        case "Skip":
        return function(game) {
            document.mEventMutex = false;
        }
        break;

        case "EndGame":
        return function(game) {
            console.log("end");
            document.currentScene = new Splash("ending", null);
            game.nextScene = document.currentScene;
            gEngine.GameLoop.stop();
            document.mEventMutex = false;
        }
        break;
        default:
        return null;
    }
    return null;
};
