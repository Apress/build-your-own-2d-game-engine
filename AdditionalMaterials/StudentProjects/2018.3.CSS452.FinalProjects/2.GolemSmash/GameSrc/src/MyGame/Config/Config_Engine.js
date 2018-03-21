/* File: Config_BossBattle.js 
 */

/*jslint node: true, vars: true */
/*global gEngine, Config, BossBattle, vec2*/
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";
 
var Config = Config || {};

Config.Engine = Object.freeze({
    Misc: {
        CanvasClearColor:               [0.8, 0.8, 0.8, 1],
        GlobalAmbientIntensity:         1.5,
        GlobalAmbientColor:             [0.3, 0.325, 0.3, 1]
    },
    RigidShapeTypes: {
        Rectangle:  0,
        Circle:     1
    }
});