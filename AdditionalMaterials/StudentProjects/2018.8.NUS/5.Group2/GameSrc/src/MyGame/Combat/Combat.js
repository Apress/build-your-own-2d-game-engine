"use strict";

/** A new level.
 * Call this function to turn into combat scene.
 * @class
 * @param firstCharacter: 第一个出场的人物，请在每次调用该场景前修改该变量。
 * @param monster {string}: 出场的怪物的名字，请在每次调用该场景前修改该变量。
 * @property displaying {boolean} : 是否正在显示战斗动画。设置为true会自动使得按钮不能使用，设置为false时按钮又可以使用了。
 */
function Combat(firstCharacter, monster) {
    this._turn = null;

    /**  @type Character  */
    this._character = null;
    Object.defineProperty(this, "character", {
        get: () => {
            return this._character;
        },
        set: v => {
            if (this._character)
                this._character.turnEndStatus = [];

            this._character = v;

            if (this._character)
                this._character.turnEndStatus = [];

            // 改变显示的人物图标
            /**  @type SpriteAnimateRenderable  */
            this.characterAnimate = new SpriteAnimateRenderable(this._character.spriteURL);
            this.characterAnimate.setColor([0, 0, 0, 0.0]);
            this.characterAnimate.getXform().setPosition(-22, 5);
            this.characterAnimate.getXform().setSize(10, 9);
            this.characterAnimate.setSpriteSequence(256, 5,     // first element pixel position: top-left 512 is top of image, 0 is left of image
                512 / 9, 256 / 6,       // width * height in pixels
                9,              // number of elements in this sequence
                0);             // horizontal padding in between
            this.characterAnimate.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateLeft);
            this.characterAnimate.setAnimationSpeed(_C.combatSpeed);
        }
    });

    /** @type Character */
    this.firstCharacter = firstCharacter;
    /** @type Character */
    this.monster = window.Monsters[monster];
    this.monsterHPBar = null;

    // todo: change this with respect to battle place
    this.kBackground = "assets/map/zhuzishan/battle.png";
    this.kBGM = "assets/bgm/zhuzishan-battle.m4a";
    this.monster.spriteURL = "assets/monster/fight/" + this.monster.mName + ".png";
    this.monster.HPBar = null;

    /**  @type Camera  */
    this.camera = null;
    /**  @type Action  */
    this._action = new Action(_C.none);
    this.combatResult = null;

    this._status = _C.waiting;
    Object.defineProperty(this, "status", {
        get: () => {
            return this._status;
        },
        set: v => {
            this._status = v;
            // 如果战斗没有结束，且不在等待用户操作状态，就禁止按钮
            if (document.mLastCombatWin === null)
                UIButton.disableButtons(v !== _C.waiting);
        }
    });

    /**
     * 这个函数将会在用户点击攻击或技能或换人按钮的时候被调用
     * @param actionType {number}
     * @param actionParam {Object}
     */
    this.takeAction = function (actionType, actionParam) {
        this.status = _C.commandGiven;
        this._turn = TURN.hero;

        this._action = makeAction(actionType, actionParam);

        this.displayAction(enemyTurn, this);

        function enemyTurn(combat) {
            combat.character.computeTurnEndStatus(true);
            combat.monster.computeTurnEndStatus(false);

            if (!combat.checkAlive())
                return;

            // monster take action
            combat._turn = TURN.monster;
            combat._action = combat.getMonsterAction();

            combat.displayAction(endTurn, combat);
        }

        function endTurn(combat) {
            combat.character.computeTurnEndStatus(false);
            combat.monster.computeTurnEndStatus(true);

            if (!combat.checkAlive())
                return;

            let i;
            for (i = 0; i < 3; i++) {
                if (CharacterSet[i].mName !== combat.character.mName)
                    CharacterSet[i].mCurrentVP -= _C.turnRecoverVP;
            }
        }
    };

    /**
     * 测试双方是否死亡，如果有一方死亡，就返回false，否则返回true
     * @returns {boolean}
     */
    this.checkAlive = function () {
        if (this.character.mCurrentVP > this.character.mMaxVP)
            this.appendMsg("\n你的角色疲劳值满了，攻击力将减少" + _C.atkPunishTired + "。");
        if (this.monster.mCurrentHP <= 0 || this.character.mCurrentHP <= 0) {
            this.beforeBattleEnd();
            if (this.monster.mCurrentHP <= 0) {
                this.combatResult = "win";
                document.mLastCombatWin = true;
                gEngine.GameLoop.stop();
            } else {
                // todo: add die
                document.mLastCombatWin = false;
                this.combatResult = "lose";
                gEngine.GameLoop.stop();
            }
        }
        return document.mLastCombatWin === null;
    };

    this.displayAction = function (callback, param) {
        this._callback = callback;
        this._callbackParam = param;

        switch (this._action.type) {
            case _C.skill:
                this.takeSkillAction();
                break;
            case _C.attack:
                this.takeAttackAction();
                break;
            case _C.change:
                this.takeChangeAction();
                break;
            case _C.item:
                // todo: item action
                break;
            default:
                console.warn("unknown action type");
                break;
        }
    };

    this.beforeBattleEnd = function () {
        this.closeMsg();
        UIButton.displayButtonGroup("default-button-group");
        UIButton.disableButtons(false);
        this.status = _C.waiting;
    };

    this.takeSkillAction = function () {
        this.status = _C.displaying;
        this._action.param.skill.useSkill(this._action.param.user, this._action.param.aim);
    };

    this.takeAttackAction = function () {
        // add VP to attacker
        this.status = _C.displaying;
        if (this._action.param.attacker.characterType === _C.Hero) {
            this._action.param.attacker.mCurrentVP += _C.attackVP;

        }
        // calculate damage
        const damage = this._action.param.defender.randChangeHP(-calDamage(this._action.param.attacker, this._action.param.defender));
        this.showMsg(this._action.param.attacker.characterType + " 使用普通攻击. 伤害: " + damage);
    };

    this.takeChangeAction = function () {
        this.character = this._action.param['aim'];
        this.showMsg("将角色变为 " + this._action.param['aim'].mName);
        setTimeout(function (combat) {
            combat.onHeroAnimationEnd();
        }, 100 * _C.combatSpeed, this);
    };

    this.getMonsterAction = function () {
        const action = this.monster.actionPolicy.getNextAction();
        if (action === -1)
            return makeAction(_C.attack, {
                attacker: this.monster,
                defender: this.character,
            });
        else if (0 <= action && action <= 3) {
            return new SkillAction({
                user: this.monster,
                aim: this.character,
                skill: this.monster.skills[action]
            });
        }
        console.error("wrong action policy");
        return null;
    };

    this.onHeroAnimationEnd = function () {
        this.monsterHPBar.HPPercent = this.monster.mCurrentHP / this.monster.mMaxHP;
        this.closeMsg();
        this.status = _C.commandGiven;
        if (this._callback) {
            const callback = this._callback, param = this._callbackParam;
            this._callback = this._callbackParam = null;
            callback(param);
        }
    };

    this.onMonsterAnimationEnd = function () {
        if (this._callback) {
            const callback = this._callback, param = this._callbackParam;
            this._callback = this._callbackParam = null;
            callback(param);
        }
        this.closeMsg();
        this.status = _C.waiting;
        UIButton.displayButtonGroup("combat-button-group");
    };

    this.updateMonsterHP = function () {

    };

    this.setMonsterByName = function (name) {
        this.monster = Monsters[name];
    }
}

gEngine.Core.inheritPrototype(Combat, Scene);

Combat.prototype.loadScene = function () {
    document.currentScene = this;
    ALL_SPRITE_TEXTURE.forEach(value => {
        gEngine.Textures.loadTexture(value);
    });
    gEngine.Textures.loadTexture(this.kBackground);
    gEngine.Textures.loadTexture(this.monster.spriteURL);
    gEngine.AudioClips.loadAudio(this.kBGM);

    UIButton.displayButtonGroup("combat-button-group");
};

Combat.prototype.unloadScene = function () {
    ALL_SPRITE_TEXTURE.forEach(value => {
        gEngine.Textures.unloadTexture(value);
    });
    gEngine.AudioClips.stopBackgroundAudio();
    gEngine.AudioClips.unloadAudio(this.kBGM[this.mMapName]);
    gEngine.Textures.loadTexture(this.monster.spriteURL);
    gEngine.Textures.unloadTexture(this.kBackground);
    // 回到大地图
    this.closeMsg(true);
    document.currentScene = this.nextScene;
    document.mEventMutex = false;
    gEngine.Core.startScene(this.nextScene);
};

Combat.prototype.initialize = function () {
    gEngine.AudioClips.playBackgroundAudio(this.kBGM)

    this.monster.spriteURL = "assets/monster/fight/" + this.monster.mName + ".png";

    this.camera = new Camera(
        vec2.fromValues(0, 0),
        100,
        _C.gameViewport
    );
    this.camera.setBackgroundColor([1.0, 1.0, 1.0, 1.0]);

    // set background
    this.mBackground = new TextureRenderable(this.kBackground);
    this.mBackground.setColor([0.0, 0.0, 0.0, 0.0]);
    this.mBackground.getXform().setPosition(0, 0);
    this.mBackground.getXform().setSize(this.camera.getWCWidth(), this.camera.getWCHeight());

    if (!this.character) {
        this.character = this.firstCharacter;
        delete this.firstCharacter;
    }

    this.monster.mCurrentHP = this.monster.mMaxHP;
    this.monster.turnEndStatus = [];
    this.character.turnEndStatus = [];
    this.monster.mCurrentHP = this.monster.mMaxHP;
    this.monster.mCurrentVP = 0;

    // 改变显示的怪物图标
    /**  @type SpriteAnimateRenderable  */
    this.monsterAnimate = new SpriteAnimateRenderable(this.monster.spriteURL);
    this.monsterAnimate.setColor([0, 0, 0, 0.0]);
    this.monsterAnimate.getXform().setPosition(22, 5);
    this.monsterAnimate.getXform().setSize(10, 9);
    this.monsterAnimate.setSpriteSequence(256, 0,     // first element pixel position: top-left 512 is top of image, 0 is left of image
        512 / 9, 256 / 6,       // width * height in pixels
        9,              // number of elements in this sequence
        0);             // horizontal padding in between
    this.monsterAnimate.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
    this.monsterAnimate.setAnimationSpeed(_C.combatSpeed);

    // 怪物血量
    this.monsterHPBar = new HPBar(2, 14, 0.2, 22, -1.5);
    this.monsterHPBar.HPPercent = 1;

    document.mShowStatusBar = true;

    // initialize character params
    CharacterSet.forEach(value => {
        value.turnEndStatus = [];
    });
};

Combat.prototype.draw = function () {
    gEngine.Core.clearCanvas([1.0, 1.0, 1.0, 1.0]);

    this.camera.setupViewProjection();

    this.mBackground.draw(this.camera);

    this.characterAnimate.draw(this.camera);
    this.monsterAnimate.draw(this.camera);

    this.monsterHPBar.draw(this.camera);

    if (document.mShowPackage) {
        window.package.draw();
    }

    if (document.mShowStatusBar) {
        window.statusBar.draw();
    }

};

Combat.prototype.update = function () {
    window.statusBar.update();
    window.package.update();
    this.monsterHPBar.update();

    if (this.status !== _C.displaying)
        return;

    if (this._turn === TURN.hero) {
        if (this.characterAnimate.updateAnimation()) {
            this.onHeroAnimationEnd();
        }
    } else {
        console.assert(this._turn === TURN.monster);
        if (this.monsterAnimate.updateAnimation()) {
            this.onMonsterAnimationEnd();
        }
    }
};

/**
 * 进入战斗场景
 * @param game
 * @param firstCharacter {Character} 第一个登场的人物
 * @param monster {Character} 怪物
 * @param sceneName {string} 场景名，例如："zhuzishan", "wanggong"
 */
function enterCombat(game, firstCharacter, monster, sceneName) {
    console.assert(game);
    console.assert(firstCharacter);
    console.assert(monster);
    console.assert(sceneName);

    if (!window.combatScene.firstCharacter)
        window.combatScene.firstCharacter = firstCharacter;
    window.combatScene.setMonsterByName(monster);
    window.combatScene.kBackground = "assets/map/" + sceneName + "/battle.png";

    window.combatScene.monster.spriteURL = "assets/monster/fight/" + monster + ".png";
    game.nextScene = window.combatScene;
    game.nextScene.nextScene = game;
    gEngine.GameLoop.stop();
    document.mLastCombatWin = null;
}
