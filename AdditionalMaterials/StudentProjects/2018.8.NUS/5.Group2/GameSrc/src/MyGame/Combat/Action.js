"use strict";

function _damageFoumula(attack, defense) {
    return attack * 100 / (defense + 100);
}

function calDamage (attacker, defender) {
    return _damageFoumula(attacker.mCurrentATK, defender.mCurrentDEF);
}

/**
 * There are four kinds of action: attack, Skill, change (change character), prop (use prop).
 */
class Action {
    /**
     * @param  {number} actionType: Use _C.[actionType] as the parameter.
     * For example: const action1 = new Action(_C.attack);
     * @param [actionParam]
     */
    constructor(actionType, actionParam) {
        this.type = actionType;
        this.param = actionParam;
    }

    update() {

    }
}

class AttackAction extends Action {
    constructor(actionParam) {
        super(_C.attack, actionParam);
    }

    update() {

    }
}

class SkillAction extends Action {
    constructor(actionParam) {
        super(_C.skill, actionParam);
    }
}

class ChangeAction extends Action {
    constructor(actionParam) {
        super(_C.change, actionParam);
    }
}

class ItemAction extends Action {
    constructor(actionParam) {
        super(_C.item, actionParam);
    }
}

class NoneAction extends Action {
    constructor(actionParam) {
        super(_C.none, actionParam);
    }
}

function makeAction(actionType, actionParam) {
    switch (actionType) {
        case _C.skill:
            return new SkillAction(actionParam);
        case  _C.attack:
            return new AttackAction(actionParam);
        case  _C.change:
            return new ChangeAction(actionParam);
        case  _C.item:
            return new ItemAction(actionParam);
        case _C.none:
            return new NoneAction(actionParam);
        default:
            console.error("Reach undefined branch");
            return undefined;
    }
}

