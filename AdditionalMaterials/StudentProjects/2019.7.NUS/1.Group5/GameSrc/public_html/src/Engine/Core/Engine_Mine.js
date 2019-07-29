/*
 * File: EngineCore.js 
 * The first iteration of what the core of our game engine would look like.
 */
/*jslint node: true, vars: true, evil: true, bitwise: true */
/*global document */
/* find out more about jslint: http://www.jslint.com/help.html */

//  Global variable EngineCore
//  the following syntax enforces there can only be one instance of EngineCore object
"use strict";  // Operate in Strict mode such that variables must be declared before used!

/**
 * Static refrence to gEngine
 * @type gEngine
 */
var gEngine = gEngine || {};
// initialize the variable while ensuring it is not redefined

gEngine.Mine = (function () {
    var letsCheat = function () {
        gEngine.Mine.saveStatus.tribleJump = true;
        document.getElementById("LeftSpan").style.display = "block";
        document.getElementById("RightSpan").style.display = "block";
    };

    var incDeath = function () {
        gEngine.Mine.death += 1;
        var a = document.getElementById("DeathNum");
        a.innerHTML = "Death: " + gEngine.Mine.death;
    };

    var timeStart = function () {
        if (!gEngine.Mine.gameStatus.start) {
            gEngine.Mine.startTime = (new Date()).getTime();
            gEngine.Mine.gameStatus.start = true;
        }
    };

    var timeSpend = function () {
        if (!gEngine.Mine.gameStatus.finish) {
            var now = (new Date()).getTime();
            //console.log(now);
            gEngine.Mine.spendTime = ((now - gEngine.Mine.startTime) / 1000).toFixed(2);
            var a = document.getElementById("Time");
            a.innerHTML = "Time: " + gEngine.Mine.spendTime;
        }
    };

    var tipDisappear = function () {
        document.getElementById("Tip").innerHTML = "";
    };

    var tipAppear = function () {
        document.getElementById("Tip").innerHTML = "Press CTRL to skip";
    };

    var mPublic = {
        letsCheat: letsCheat,
        incDeath: incDeath,
        timeStart: timeStart,
        timeSpend: timeSpend,
        tipDisappear: tipDisappear,
        tipAppear: tipAppear,
        saveStatus: {
            tribleJump: false,
            finishFirst: false,
            finishSecond: false
        },
        gameStatus: {
            start: false,
            finish: false
        },
        startTime: null,
        spendTime: 0,
        death: 0,
        restartLevel: () => new FirstLevel(),
    };

    return mPublic;
}());
