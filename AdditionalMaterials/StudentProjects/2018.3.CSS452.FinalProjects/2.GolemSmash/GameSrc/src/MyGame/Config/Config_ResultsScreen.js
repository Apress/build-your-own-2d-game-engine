/* 
 * Config_ResultsScreen.js
 * 
 * Config settings for the results screen
 */

"use strict";

var Config = Config || {};

Config.ResultsScreen = Object.freeze({
    Textures: {
        DefaultArrowSprite:     "assets/projectiles/arrow.png",
        BossSprite:             "assets/characters/boss_sprites.png",
        BossNormal:             "assets/characters/normal/boss_sprites.png",
        HeroSheet:              "assets/characters/hero_sprites.png",
        HeroNormal:             "assets/characters/normal/hero.png",
        VictoryBackground:      "assets/background/victory.png",
        DefeatBackground:       "assets/background/defeat.png",
        PlatformTexture:        "assets/props/platform.png",
        PlatformNormal:         "assets/props/normal/platform.png"
    },
    Audio: {
      VictoryClip: "assets/audio/music/victory.mp3",
      GameOverClip: "assets/audio/music/gameover.mp3"
    },
    Camera: {
        StartingPosition:     vec2.fromValues(25, 0),
        WorldWidth:           200,
        Viewport:             [0, 0, 960, 720],
        BackgroundColor:      [0, 0, 0, 1],
        InterpStiffness:      0.2,
        InterpDuration:       30
    },
    Background: {
        Width: 300,
        Height: 300,
        XPos: 0,
        YPos: -50,
        PanSpeed: 0.2
    },
    Golem: {
      Position: vec2.fromValues(85, 7),
      Size: vec2.fromValues(78, 51),
      DeathDelay: 75  
    },
    Hero: {
      Position: vec2.fromValues(85, -3),
      Size: vec2.fromValues(36, 36),
      DeathDelay: 80  
    },
    Platform: {
        x: 75,
        y: -25,
        w: 100,
        h: 20
    },
    UI: {
        Title: {
            Text: "[Victory Status]",
            Position: vec2.fromValues(480, 640),
            TextHeight: 10,
            Color: [.5, .5, .5, 1]
        },
        ReplayButton: {
            Position: vec2.fromValues(240, 520),
            Size: vec2.fromValues(400, 120),
            Text: "Replay!",
            TextHeight: 5,
            TextColor: [1, 1, 1, 1]
        },
        HardModeReplayButton: {
            Position: vec2.fromValues(240, 360),
            Size: vec2.fromValues(400, 120),
            Text: "Replay (Hard Mode)!",
            TextHeight: 5,
            TextColor: [1, 1, 1, 1]
        },
        MenuButton: {
            Position: vec2.fromValues(240, 180),
            Size: vec2.fromValues(400, 120),
            Text: "Menu",
            TextHeight: 5,
            TextColor: [1, 1, 1, 1]
        }
    }
});
