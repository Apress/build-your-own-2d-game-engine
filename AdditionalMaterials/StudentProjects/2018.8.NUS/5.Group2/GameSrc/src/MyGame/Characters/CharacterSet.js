"use strict";
/**
 * 所有角色。前三个是人，其他的是怪。
 * @type {Character[]}
 */
var CharacterSet = [];

function CharacterSet_Status() {
    var ret = "";
    var i;
    for (i = 0; i < CharacterSet.length; ++i) {
        ret += CharacterSet[i].statusString() + "\n";
    }
    return ret;
}

function CharacterSet_Recover() {
    var i;
    for (i = 0; i < CharacterSet.length; ++i) {
        var ch = CharacterSet[i];
        ch.mCurrentHP = ch.mMaxHP;
        ch.mCurrentVP = 0;
    }
}

function CharacterSet_Init(infoFile) {
    var infoObj = gEngine.ResourceMap.retrieveAsset(infoFile);
    var i;
    for (i = 0; i < infoObj.length; ++i) {
        CharacterSet.push(new Character(infoObj[i]));
    }
}

function getCharacterByName(name) {
    let i;
    for (i=0; i<CharacterSet.length; i++)
        if (CharacterSet[i].mName === name)
            return CharacterSet[i];
    console.warn("doesn't find that character: ", name);
    return null;
}
