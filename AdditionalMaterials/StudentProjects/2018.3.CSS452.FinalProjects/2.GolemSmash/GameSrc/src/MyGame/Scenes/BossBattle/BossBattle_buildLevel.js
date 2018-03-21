/*
 * File: BossBattle_buildLevel.js 
 * This is the logic for building the static level of
 * the BossBattle scene.
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectSet, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable, ResultsScreen
  GameObject, Hero, Arrow, TextureRenderable, RigidRectangle, Platform, Terrain,
  ArrowVector, Torch, Config, BossBattle */

"use strict";

// Initializes some platforms for the boss fight
BossBattle.prototype.buildLevel = function () {
    this.createGround();
    this.createWalls();
    this.createPlatforms();
    this.createTorches();
};

BossBattle.prototype.createGround = function () {
    for (var ground in Config.BossBattle.Ground) {
        gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, new Terrain(
            Config.BossBattle.Textures.GroundTexture,
            Config.BossBattle.Ground[ground].X,
            Config.BossBattle.Ground[ground].Y,
            Config.BossBattle.Ground[ground].Width,
            Config.BossBattle.Ground[ground].Height
        ));
    }
};

BossBattle.prototype.createWalls = function () {
    for (var wall in Config.BossBattle.Walls) {
        gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors,new Terrain(
            Config.BossBattle.Textures.WallTexture,
            Config.BossBattle.Walls[wall].X,
            Config.BossBattle.Walls[wall].Y,
            Config.BossBattle.Walls[wall].Width,
            Config.BossBattle.Walls[wall].Height
        ));
    }
};

BossBattle.prototype.createPlatforms = function () {
    for (var platform in Config.BossBattle.Platforms) {
        gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors,new Platform(
            Config.BossBattle.Textures.PlatformTexture,
            Config.BossBattle.Textures.PlatformNormal,
            Config.BossBattle.Platforms[platform].X,
            Config.BossBattle.Platforms[platform].Y,
            Config.BossBattle.Platforms[platform].Width,
            Config.BossBattle.Platforms[platform].Height
        ));
    }
};

BossBattle.prototype.createTorches = function () {
    var light = null;
    for (var torch in Config.BossBattle.Torches.Ground) {
        light = new Light();
        this.mGlobalLightSet.addToSet(light);
        gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors,new Torch (
            Config.BossBattle.Textures.GroundTorchTexture,
            Config.BossBattle.Textures.GroundTorchNormal,
            Config.BossBattle.Torches.Ground[torch].X,
            Config.BossBattle.Torches.Ground[torch].Y,
            Config.BossBattle.Torches.Ground[torch].Width,
            Config.BossBattle.Torches.Ground[torch].Height,
            Config.Torch.Types.Ground,
            this.mBoss,
            light
        ));
    }
    
    var temp;
    for (var torch in Config.BossBattle.Torches.Wall) {
        light = new Light();
        this.mGlobalLightSet.addToSet(light);
        temp = new Torch (
            Config.BossBattle.Textures.WallTorchTexture,
            Config.BossBattle.Textures.WallTorchNormal,
            Config.BossBattle.Torches.Wall[torch].X,
            Config.BossBattle.Torches.Wall[torch].Y,
            Config.BossBattle.Torches.Wall[torch].Width,
            Config.BossBattle.Torches.Wall[torch].Height,
            (Config.BossBattle.Torches.Wall[torch].Orientation > 0 ? Config.Torch.Types.WallLeft : Config.Torch.Types.WallRight),
            this.mBoss,
            light
        );
        temp.getXform().setOrientation(Config.BossBattle.Torches.Wall[torch].Orientation);
        gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors,temp);
    }
};