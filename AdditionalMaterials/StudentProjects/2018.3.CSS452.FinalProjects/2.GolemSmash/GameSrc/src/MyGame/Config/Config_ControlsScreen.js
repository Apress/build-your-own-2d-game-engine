/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

"use strict";

var Config = Config || {};

Config.ControlsScreen = Object.freeze({
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
            Text: "Controls",
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
        KeysTextSet: {
            StartPos: vec2.fromValues(480, 500),
            TextHeight: 6,
            Color: [1, 0, 0, 1],
            Spacing: 30,
            Set: [
                "W/D                            Move Left/Right",
                "Space Bar                                 Jump",
                "1/2/3                        Choose Arrow Type",
                "M/N                         Swap Arrow Control",
                "",
                "Drag the left mouse button to charge up a shot",
                "Release the mouse to let it fly!              "
            ]
        },
        TorchText: {
            Text: "Light the four torches in the corners of the arena for a damage boost!",
            Position: vec2.fromValues(480, 200),
            TextHeight: 4,
            Color: [1, .84, 0, 1]
        }
        
        
    }
});
