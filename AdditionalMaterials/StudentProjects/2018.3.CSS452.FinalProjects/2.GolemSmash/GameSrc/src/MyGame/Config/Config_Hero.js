/* File: Config_Hero.js 
 */

/*jslint node: true, vars: true */
/*global gEngine, Config, BossBattle, vec2, Hero */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

var Config = Config || {};

Config.Hero = Object.freeze({
    Facing: {
        Left:   -1,
        Right:  1
    },
    Size: {
        X:  12,
        Y:  12
    },
    Color: [1, 1, 1, 0],
    PixelPositions: {
        Left:   93,
        Right:  403,
        Bottom: 97,
        Top:    440
    },
    Hitbox: {
        WidthDivisor:   2,
        HeightDivisor:  1.07
    },
    Physics: {
        Mass:           10,
        Restitution:    1,
        Friction:       1
    },
    StartingHP: 1000,
    MaxJumps:   2,
    JumpVelocity: {
        X:  0,
        Y:  100
    },
    MaxNoClipDuration:  60,
    Audio: {
        FiringArrow:    "assets/audio/sfx/shoot.mp3",
        Volume:         0.7
    },
    Movement: {
        LeftDisplacementVector: vec2.fromValues(-10, 0),
        LeftDisplacementScale: 0.1,
        RightDisplacementVector: vec2.fromValues(10, 0),
        RightDisplacementScale: 0.1
    },
    CameraShake: {
        X:  -10,
        Y:  -10,
        Frequency: 20,
        Duration: 10
    }
});