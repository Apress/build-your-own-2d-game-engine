/* 
 * File: Config_BossBattle.js 
 */

/*jslint node: true, vars: true */
/*global gEngine, Config, BossBattle, vec2 */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

var Config = Config || {};

Config.BossBattle = Object.freeze({
    Textures: {
        HeroSprite:             "assets/characters/hero.png",
        HeroSheet:              "assets/characters/hero_sprites.png",
        HeroNormal:             "assets/characters/normal/hero.png",
        HeroSheetNormal:        "assets/characters/normal/hero_sprites.png",
        DefaultArrowSprite:     "assets/projectiles/arrow.png",
        IceArrowSprite:         "assets/projectiles/icearrow.png",
        FireArrowSprite:        "assets/projectiles/firearrow.png",
        BossSprite:             "assets/characters/boss_sprites.png",
        BossNormal:             "assets/characters/normal/boss_sprites.png",
        BossProjectileSprite:   "assets/projectiles/bossprojectile.png",
        BossHomingProjectileSprite: "assets/projectiles/bossprojectile2.png",
        PlatformTexture:        "assets/props/platform.png",
        PlatformNormal:         "assets/props/normal/platform.png",
        GroundTexture:          "assets/groundtexture.png",
        WallTexture:            "assets/walltexture.png",
        GroundTorchTexture:     "assets/props/torch1.png",
        GroundTorchNormal:     "assets/props/normal/torch1.png",
        WallTorchTexture:       "assets/props/torch2.png",
        WallTorchNormal:       "assets/props/normal/torch2.png",
        TorchParticleTexture:   "assets/particles/particle.png",
        FlameParticleTexture:   "assets/particles/flameparticle.png",
        SnowParticleTexture:    "assets/particles/snowparticle.png",
        TileBackgroundTexture:  "assets/background/backgroundtile.png",
        FarBackgroundTexture:   "assets/background/backgroundfar.png",
        FarBackgroundNormal:    "assets/background/normal/backgroundfar.png",
        MidBackgroundTexture:   "assets/background/backgroundmid.png",
        MidBackgroundNormal:    "assets/background/normal/backgroundmid.png",
        ForegroundTexture:      "assets/background/foreground.png",
        ForegroundNormal:       "assets/background/normal/foreground.png"
    },
    Audio: {
        BossMusic:              "assets/audio/music/bossbattle.mp3",
        VictoryMusic:           "assets/audio/music/victory.mp3",
        DefeatMusic:            "assets/audio/music/gameover.mp3",
        BowShot:                "assets/audio/sfx/shoot.mp3"
    },
    Cameras: {
        MainCameraStartingPosition:     vec2.fromValues(25, 1),
        MainCameraWorldWidth:           200,
        MainCameraViewport:             [0, 0, 960, 720],
        MainCameraBackgroundColor:      [0.8, 0.8, 0.8, 1],
        MainCameraInterpStiffness:      0.2,
        MainCameraInterpDuration:       30
    },
    Boss: {
        SpawnDistance: 50,
        MaxTimeBeforeSpawn: 5000,
        MaxTimeIdle: 2000,
        SpawnPosition: {
            X:  150,
            Y:  50
        },
        Size: {
            Width:  78,
            Height: 51
        }
    },
    Hero: {
        SpawnPosition: {
            X:  25,
            Y:  1
        }
    },
    Torches: {
        Ground: [
            {
                X:      10,
                Y:      10,
                Width:  20,
                Height: 20
            },
            {
                X:      290,
                Y:      10,
                Width:  20,
                Height: 20
            }
        ],
        Wall: [
                        {
                X:      -18.5,
                Y:      115,
                Width:  15,
                Height: 30,
                Orientation: 1
            },
            {
                X:      317,
                Y:      115,
                Width:  15,
                Height: 30,
                Orientation: -1
            }
        ],
        Ceiling: []
    },
    Walls: [
        {
            X:      -76,
            Y:      45,
            Width:  100,
            Height: 100
        },
        {
            X:      -76,
            Y:      145,
            Width:  100,
            Height: 100
        },
        {
            X:      -76,
            Y:      245,
            Width:  100,
            Height: 100
        },
        {
            X:      -76,
            Y:      345,
            Width:  100,
            Height: 100
        },
        {
            X:      -76,
            Y:      445,
            Width:  100,
            Height: 100
        },
        {
            X:      374,
            Y:      45,
            Width:  100,
            Height: 100
        },
        {
            X:      374,
            Y:      145,
            Width:  100,
            Height: 100
        },
        {
            X:      374,
            Y:      245,
            Width:  100,
            Height: 100
        },
        {
            X:      374,
            Y:      345,
            Width:  100,
            Height: 100
        },
        {
            X:      374,
            Y:      445,
            Width:  100,
            Height: 100
        }
    ],
    Ground: [
        {
            X:      -120,
            Y:      -78.5,
            Width:  75,
            Height: 150
        }, 
        {
            X:      -45,
            Y:      -78.5,
            Width:  75,
            Height: 150
        }, 
        {
            X:      30,
            Y:      -78.5,
            Width:  75,
            Height: 150
        },        
        {
            X:      105,
            Y:      -78.5,
            Width:  75,
            Height: 150
        },
        {
            X:      180,
            Y:      -78.5,
            Width:  75,
            Height: 150
        },
        {
            X:      255,
            Y:      -78.5,
            Width:  75,
            Height: 150
        },
        {
            X:      330,
            Y:      -78.5,
            Width:  75,
            Height: 150
        },
        {
            X:      405,
            Y:      -78.5,
            Width:  75,
            Height: 150
        }
    ], 
    Platforms: [
        {
            X:      40,
            Y:      30,
            Width:  20,
            Height: 5
        },
        {
            X:      120,
            Y:      30,
            Width:  20,
            Height: 5
        },
        {
            X:      80,
            Y:      60,
            Width:  20,
            Height: 5
        },
        {
            X:      20,
            Y:      80,
            Width:  20,
            Height: 5
        },
        {
            X:      140,
            Y:      80,
            Width:  20,
            Height: 5
        },
        {
            X:      30,
            Y:      120,
            Width:  20,
            Height: 5
        },
        {
            X:      10,
            Y:      150,
            Width:  20,
            Height: 5
        },
        {
            X:      120,
            Y:      150,
            Width:  20,
            Height: 5
        },
        {
            X:      200,
            Y:      160,
            Width:  20,
            Height: 5
        },
        {
            X:      250,
            Y:      140,
            Width:  20,
            Height: 5
        },
        {
            X:      190,
            Y:      100,
            Width:  20,
            Height: 5
        },
        {
            X:      280,
            Y:      80,
            Width:  20,
            Height: 5
        },
        {
            X:      200,
            Y:      40,
            Width:  20,
            Height: 5
        },
        {
            X:      275,
            Y:      20,
            Width:  20,
            Height: 5
        }
    ],
    UI: {
        ArrowSelection: {
            Position: vec2.fromValues(120, 680),
            IconSize: 80,
            ActiveTint: [1, 1, 1, 0],
            InactiveTint: [.1, .1, .1, .5]
        },
        HeroHealthBar: {
            Position: vec2.fromValues(120, 600),
            Size: vec2.fromValues(240, 20),
            Buffer: 4
        },
        HeroHPText: {
            Text: "Player Health:",
            Position: vec2.fromValues(5, 615),
            TextHeight: 4,
            Color: [1, 0, 0, 1]
        },
        BossName: {
            Text: "Mysterious Golem",
            Position: vec2.fromValues(165, 105),
            Color: [1, 1, 1, 1],
            TextHeight: 4
        },
        BossHealthBar: {
            Position: vec2.fromValues(480, 80),
            Size: vec2.fromValues(640, 20),
            Buffer: 4
        }
    }
});
