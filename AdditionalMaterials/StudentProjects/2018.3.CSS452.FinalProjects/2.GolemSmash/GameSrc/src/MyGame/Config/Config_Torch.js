/* File: Config_Torch.js 
 */

/*jslint node: true, vars: true */
/*global gEngine, Config, BossBattle, vec2, Torch */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

var Config = Config || {};

Config.Torch = Object.freeze({
    Types: {
        Ground:  0,
        WallLeft: 1,
        WallRight:  2,
        Ceiling: 3
    },
    0: {
        Color: [1, 1, 1, 0],
        MaxTimeLit: 3000,
        Particle: {
            MinLifespan:                30,
            LifespanMultiplier:         200, 
            ColorRed:                   1,
            ColorGreen:                 .5,
            ColorBlue:                  .4,
            ColorAlpha:                 .3,
            BaseXOffset:                -4,
            XOffsetMultiplier:          8,
            BaseYOffset:                6,
            YOffsetMultiplier:          0,
            MinSize:                    4,
            SizeMultiplier:             10,
            MinFinalColor:              [3.5, 0.8, 0.8, 0.5],
            MinFinalColorMultipliers:   [0, 0.2, 0.2, 0],
            BaseXVelocity:              5,
            XVelocityMultiplier:        10,
            BaseYVelocity:              0,
            YVelocityMultiplier:        40,
            SizeDelta:                  0.98,
            BaseXAcceleration:          0,
            XAccelerationMultiplier:    0,
            BaseYAcceleration:          5,
            YAccelerationMultiplier:    5
        },
        Light: {
            Color: [0.4, 0.1, 0.0, 1],
            XOffset: 0,
            YOffset: 15,
            ZPosition: 1,
            Direction: [0, 0, 1],
            Near: 0,
            Far: 60,
            Inner: 0.01,
            Outer: 1,
            Intensity: 5,
            DropOff: 100
        }
    },
    1: {
        Color: [1, 1, 1, 0],
        MaxTimeLit: 3000,
        Particle: {
            MinLifespan:                30,
            LifespanMultiplier:         200, 
            ColorRed:                   1,
            ColorGreen:                 0.5,
            ColorBlue:                  0.4,
            ColorAlpha:                 0.3,
            BaseXOffset:                -3,
            XOffsetMultiplier:          9,
            BaseYOffset:                8,
            YOffsetMultiplier:          0,
            MinSize:                    4,
            SizeMultiplier:             10,
            MinFinalColor:              [3.5, 0.8, 0.8, 0.5],
            MinFinalColorMultipliers:   [0, 0.2, 0.2, 0],
            BaseXVelocity:              5,
            XVelocityMultiplier:        10,
            BaseYVelocity:              0,
            YVelocityMultiplier:        20,
            SizeDelta:                  0.98,
            BaseXAcceleration:          10,
            XAccelerationMultiplier:    30,
            BaseYAcceleration:          10,
            YAccelerationMultiplier:    20
        },
        Light: {
            Color: [0.4, 0.1, 0.0, 1],
            XOffset: 0,
            YOffset: 15,
            ZPosition: 1,
            Direction: [0, 0, 1],
            Near: 0,
            Far: 60,
            Inner: 0.01,
            Outer: 1,
            Intensity: 5,
            DropOff: 100
        }
    },
    2: {
        Color: [1, 1, 1, 0],
        MaxTimeLit: 3000,
        Particle: {
            MinLifespan:                30,
            LifespanMultiplier:         200, 
            ColorRed:                   1,
            ColorGreen:                 0.5,
            ColorBlue:                  0.4,
            ColorAlpha:                 0.3,
            BaseXOffset:                -6,
            XOffsetMultiplier:          10,
            BaseYOffset:                8,
            YOffsetMultiplier:          0,
            MinSize:                    6,
            SizeMultiplier:             10,
            MinFinalColor:              [3.5, 0.8, 0.8, 0.5],
            MinFinalColorMultipliers:   [0, 0.2, 0.2, 0],
            BaseXVelocity:              -5,
            XVelocityMultiplier:        10,
            BaseYVelocity:              0,
            YVelocityMultiplier:        20,
            SizeDelta:                  0.98,
            BaseXAcceleration:          -10,
            XAccelerationMultiplier:    -30,
            BaseYAcceleration:          10,
            YAccelerationMultiplier:    20
        },
        Light: {
            Color: [0.4, 0.1, 0.0, 1],
            XOffset: 0,
            YOffset: 15,
            ZPosition: 1,
            Direction: [0, 0, 1],
            Near: 0,
            Far: 60,
            Inner: 0.01,
            Outer: 1,
            Intensity: 5,
            DropOff: 100
        }
    },
    3: {
        Color: [1, 1, 1, 0],
        MaxTimeLit: 1200,
        Particle: {
            MinLifespan:                30,
            LifespanMultiplier:         200, 
            ColorRed:                   1,
            ColorGreen:                 0,
            ColorBlue:                  0,
            ColorAlpha:                 1,
            BaseXOffset:                -1,
            XOffsetMultiplier:          2,
            BaseYOffset:                3,
            YOffsetMultiplier:          0,
            MinSize:                    1,
            SizeMultiplier:             6,
            MinFinalColor:              [3.5, 0.2, 0.1, 0.5],
            MinFinalColorMultipliers:   [0, 0.1, 0.1, 0],
            BaseXVelocity:              5,
            XVelocityMultiplier:        10,
            BaseYVelocity:              0,
            YVelocityMultiplier:        20,
            SizeDelta:                  0.98,
            BaseXAcceleration:          0,
            XAccelerationMultiplier:    0,
            BaseYAcceleration:          5,
            YAccelerationMultiplier:    5
        },
        Light: {
            Color: [0.4, 0.1, 0.0, 1],
            XOffset: 0,
            YOffset: 15,
            ZPosition: 1,
            Direction: [0, 0, 1],
            Near: 0,
            Far: 60,
            Inner: 0.01,
            Outer: 1,
            Intensity: 5,
            DropOff: 100
        }
    }
});