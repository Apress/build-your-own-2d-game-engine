"use strict";

/**
 * This class stores all the Skill and there parameters.
 */
class SkillList {
    static parseSkill(skillInfo) {

        return window.allSkills[skillInfo["name"]].parse(skillInfo);
    }
}

/**
 *
 * @type {{Skill}}
 */
window.allSkills = {
    "火眼金睛": FieryEyes,
    "当头一棒": HeavyHit,
    "三昧真火": SamadhiFire,
    "睡懒觉": SlackSleep,
    "念经": Chant,
    "锤击": BatStrike,
    "神圣治愈": HolyRedemption,
    "撕咬": Bite,
    "狂怒": Fury,
    "生命抽取": StealHealth,
    "剧毒尾针": PoisonStitch,
};

/**
 * Replace the '%0', '%1', '%2 and so on with replacer. (the placeholder index must be continuous integer start from 0)
 * @param string1: the string to format.
 * @param replacer: string or any thing that can be convert to string.
 * @returns {string}
 */
function formatString(string1, ...replacer) {
    let rst = string1;
    replacer.forEach((value, index) => {
        rst = rst.replace("%" + index.toString(), value.toString());
    });
    return rst;
}

function assertHasProperties(obj, ...properties) {
    properties.forEach(value => {
        if (!value in obj) {
            console.error("value not in obj", value, obj);
        }
    });
}
