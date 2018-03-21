/* 
 * Config_CreditsScreen.js
 */

"use strict";

var Config = Config || {};

Config.CreditsScreen = Object.freeze({
    Textures: {
        /*BackgroundImage: "assets/background/somefile.png",
        BackgroundNormal: "assets/background/somefileNormal.png"*/
    },
    Camera: {
        StartingPosition:     vec2.fromValues(25, 0),
        WorldWidth:           200,
        Viewport:             [0, 0, 960, 720],
        BackgroundColor:      [0.1, 0.1, 0.1, 1]
    },
    UI: {
        Title: {
            Text: "Credits",
            Position: vec2.fromValues(480, 640),
            TextHeight: 15,
            Color: [1, .84, 0, 1]
        },
        ReturnButton: {
            Position: vec2.fromValues(480, 100),
            Size: vec2.fromValues(240, 120),
            Text: "Return",
            TextHeight: 5,
            TextColor: [1, 1, 1, 1]
        },
        CreditsTextSet: {
            StartPos: vec2.fromValues(480, 500),
            TextHeight: 4,
            Color: [1, 1, 1, 1],
            Spacing: 30,
            Set: [
                "Developers:    Joey Altman, Justin Baker, Nick Carpenetti, Akilas Mebrahtom",
                "Course:                                   CSS452 2D Game Engine Development",
                "Professor:                                                      Kelvin Sung",
                "School:                                    University of Washington Bothell",
                "",
                "",
                "All art and audio assets were acquired from https://opengameart.org or     ",
                "created and modified by our developers.                                    ",
                "See Credits.html for detailed sources                                      "
            ]
        }
    }
});
