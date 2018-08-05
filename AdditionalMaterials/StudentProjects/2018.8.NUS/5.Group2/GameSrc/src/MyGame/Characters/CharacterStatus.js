"use strict";

class CharacterStatus {
    constructor(statusType, turn) {
        this.type = statusType;
        this.turn = turn;
    }

    /**
     * 计算结果
     * @param character {Character}
     */
    computeStatus(character) {

    }
}

/**
 * buff或者debuff
 */
class BuffStatus extends CharacterStatus {
    /**
     * @param attributeName {string}
     * @param turn {number}
     * @param value {number}
     * @param [effectType = _C.percent] {number} : 是按照百分比计算还是按照数值计算
     */
    constructor(attributeName, turn, value, effectType = _C.percent) {
        super(_C.BuffStatus, turn);
        this.attributeName = attributeName;
        this.value = value;
        this.effectType = effectType;
    }

    computeStatus(character) {
        if (this.effectType === _C.percent) {
            character["m" + this.attributeName + "Percent"] *= this.value;
        } else if (this.effectType === _C.numeric) {
            character["mCurrent" + this.attributeName] += this.value;
        }
    }
}

/**
 * 增加或者减少血量
 */
class ChangeHPStatus extends CharacterStatus {
    /**
     * @param attributeName {string}
     * @param turn {number}
     * @param value {number}
     */
    constructor(turn, value) {
        super(_C.changeHP, turn);
        this.value = value;
    }

    computeStatus(character) {
        character.mCurrentHP += this.value;
    }
}
