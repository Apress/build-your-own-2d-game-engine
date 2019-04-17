/*
 * File:        JSONParser.js
 * Programmers: Kyla            March 14, 2019
 * 
 * Refereces:
 *      MP3
 *      https://www.w3schools.com/js/js_json_parse.asp
 *      https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON
 *      https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
*/

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function JSONParser(sceneFilePath) {
    this.mSceneJSON = gEngine.ResourceMap.retrieveAsset(sceneFilePath);
}

JSONParser.prototype.parsePosition = function (posSet) {
    var elem = this.mSceneJSON.SpawnPos;
    for(var i = 0; i < elem.length; i++)
    {
        var xPos = elem[i].Position[0];
        var yPos = elem[i].Position[1];
        var sp = new SpawnPoint([xPos, yPos]);
        posSet.push(sp);
    }
};
