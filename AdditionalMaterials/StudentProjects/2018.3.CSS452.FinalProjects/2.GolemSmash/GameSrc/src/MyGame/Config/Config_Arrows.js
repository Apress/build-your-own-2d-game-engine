/* File: Config_Arrows.js 
 */

/*jslint node: true, vars: true */
/*global gEngine, Config, BossBattle, vec2, ArrowVector */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

var Config = Config || {};

Config.Arrows = Object.freeze({
    Default: {
    },
    Fire: {
        Light: {
            Color: [0.4, 0.1, 0.0, 1],
            ZPosition: 1,
            Direction: [0, 0, 1],
            Near: 0,
            Far: 20,
            Inner: 0.01,
            Outer: 1,
            Intensity: 5,
            DropOff: 100
        }
    },
    Ice: {
        EffectDuration: 120,
        Light: {
            Color: [.4, .5, 1, .3],
            ZPosition: 1,
            Direction: [0, 0, 1],
            Near: 0,
            Far: 20,
            Inner: 0.01,
            Outer: 1,
            Intensity: 5,
            DropOff: 100
        }
    }
});