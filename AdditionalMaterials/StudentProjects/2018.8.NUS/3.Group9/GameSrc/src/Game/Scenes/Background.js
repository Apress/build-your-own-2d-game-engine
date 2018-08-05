"use strict";

Background.eAssets = Object.freeze({
    eEasternCityTexture: "assets/backgrounds/backgroundEasternCity.png",
    eOutskirtsTexture: "assets/backgrounds/backgroundOutskirts.png",
    eTownTexture: "assets/backgrounds/backgroundTown.png",

    eSkyCloudyTexture: "assets/backgrounds/skyCloudy.png",
    eSkyNightCloudyTexture: "assets/backgrounds/skyNightCloudy.png",
    eSkyDuskTexture: "assets/backgrounds/skyDusk.png"
});

Background.eTerrainAssets = Object.freeze({
    ePlatformTexture: "assets/terrains/platform.png",
    eWallTexture: "assets/terrains/wall.png"
});

Background.eAudio = Object.freeze({
    eBgm_1: "assets/sounds/bgm_1.mp3",
    eBgm_2: "assets/sounds/bgm_2.mp3",
    eBgm_3: "assets/sounds/bgm_3.mp3",
    eBgm_4: "assets/sounds/bgm_4.mp3",
    eBgm_5: "assets/sounds/bgm_5.mp3",
    eBgm_6: "assets/sounds/bgm_6.mp3"
});

Background.ePlace = Object.freeze({
    eEasternCity: 0,
    eOutskirts: 1,
    eTown: 2
});

Background.eSky = Object.freeze({
    eCloudy: 0,
    eNightCloudy: 1,
    eDusk: 2
});

Background.eBgm = Object.freeze({
    eBgm_1: 0,
    eBgm_2: 1,
    eBgm_3: 2,
    eBgm_4: 3,
    eBgm_5: 4,
    eBgm_6: 5
});

function Background(place, sky) {
    this.mPlace = null;
    this.mSky = null;

    switch (sky) {
        case Background.eSky.eCloudy: {
            this.mSky = new TextureRenderable(Background.eAssets.eSkyCloudyTexture);
            break;
        }
        case Background.eSky.eNightCloudy: {
            this.mSky = new TextureRenderable(Background.eAssets.eSkyNightCloudyTexture);
            break;
        }
        case Background.eSky.eDusk: {
            this.mSky = new TextureRenderable(Background.eAssets.eSkyDuskTexture);
            break;
        }
        default: {
            this.mSky = new TextureRenderable(Background.eAssets.eSkyDuskTexture);
            break;
        }
    }
    this.mSky.setColor([1, 1, 1, 0.2]);
    this.mSky.getXform().setPosition(0, 0);
    this.mSky.getXform().setSize(500, 250);

    switch (place) {
        case Background.ePlace.eEasternCity: {
            this.mPlace = new TextureRenderable(Background.eAssets.eEasternCityTexture);
            break;
        }
        case Background.ePlace.eOutskirts: {
            this.mPlace = new TextureRenderable(Background.eAssets.eOutskirtsTexture);
            break;
        }
        case Background.ePlace.eTown: {
            this.mPlace = new TextureRenderable(Background.eAssets.eTownTexture);
            break;
        }
        default: {
            this.mPlace = new TextureRenderable(Background.eAssets.eOutskirtsTexture);
            break;
        }
    }
    this.mPlace.setColor([1, 1, 1, 0.2]);
    this.mPlace.getXform().setPosition(0, 0);
    this.mPlace.getXform().setSize(500, 250);
}

Background.prototype.draw = function (aCamera) {
    this.mSky.draw(aCamera);
    this.mPlace.draw(aCamera);
};

Background.loadAssets = function (place, sky, bgm) {
    gEngine.Textures.loadTexture(Background.eTerrainAssets.ePlatformTexture);
    gEngine.Textures.loadTexture(Background.eTerrainAssets.eWallTexture);
    switch (place) {
        case Background.ePlace.eTown: {
            gEngine.Textures.loadTexture(Background.eAssets.eTownTexture);
            break;
        }
        case Background.ePlace.eOutskirts: {
            gEngine.Textures.loadTexture(Background.eAssets.eOutskirtsTexture);
            break;
        }
        case Background.ePlace.eEasternCity: {
            gEngine.Textures.loadTexture(Background.eAssets.eEasternCityTexture);
            break;
        }
        default: {
            gEngine.Textures.loadTexture(Background.eAssets.eEasternCityTexture);
            break;
        }
    }
    switch (sky) {
        case Background.eSky.eCloudy: {
            gEngine.Textures.loadTexture(Background.eAssets.eSkyCloudyTexture);
            break;
        }
        case Background.eSky.eNightCloudy: {
            gEngine.Textures.loadTexture(Background.eAssets.eSkyNightCloudyTexture);
            break;
        }
        case Background.eSky.eDusk: {
            gEngine.Textures.loadTexture(Background.eAssets.eSkyDuskTexture);
            break;
        }
        default: {
            gEngine.Textures.loadTexture(Background.eAssets.eSkyCloudyTexture);
            break;
        }
    }
    /*
    switch (bgm) {
        case Background.eBgm.eBgm_1: {
            gEngine.AudioClips.loadAudio(Background.eAudio.eBgm_1);
            break;
        }
        case Background.eBgm.eBgm_2: {
            gEngine.AudioClips.loadAudio(Background.eAudio.eBgm_2);
            break;
        }
        case Background.eBgm.eBgm_3: {
            gEngine.AudioClips.loadAudio(Background.eAudio.eBgm_3);
            break;
        }
        case Background.eBgm.eBgm_4: {
            gEngine.AudioClips.loadAudio(Background.eAudio.eBgm_4);
            break;
        }
        case Background.eBgm.eBgm_5: {
            gEngine.AudioClips.loadAudio(Background.eAudio.eBgm_5);
            break;
        }
        case Background.eBgm.eBgm_6: {
            gEngine.AudioClips.loadAudio(Background.eAudio.eBgm_6);
            break;
        }
        default: {
            gEngine.AudioClips.loadAudio(Background.eAudio.eBgm_1);
            break;
        }
    }
    */
    gEngine.AudioClips.loadAudio(Background.eAudio.eBgm_1);
    gEngine.AudioClips.loadAudio(Background.eAudio.eBgm_2);
    gEngine.AudioClips.loadAudio(Background.eAudio.eBgm_3);
    gEngine.AudioClips.loadAudio(Background.eAudio.eBgm_4);
    gEngine.AudioClips.loadAudio(Background.eAudio.eBgm_5);
    gEngine.AudioClips.loadAudio(Background.eAudio.eBgm_6);
};

Background.unloadAssets = function (place, sky, bgm) {
    gEngine.Textures.unloadTexture(Background.eTerrainAssets.ePlatformTexture);
    gEngine.Textures.unloadTexture(Background.eTerrainAssets.eWallTexture);
    switch (place) {
        case Background.ePlace.eTown: {
            gEngine.Textures.unloadTexture(Background.eAssets.eTownTexture);
            break;
        }
        case Background.ePlace.eOutskirts: {
            gEngine.Textures.unloadTexture(Background.eAssets.eOutskirtsTexture);
            break;
        }
        case Background.ePlace.eEasternCity: {
            gEngine.Textures.unloadTexture(Background.eAssets.eEasternCityTexture);
            break;
        }
        default: {
            gEngine.Textures.unloadTexture(Background.eAssets.eEasternCityTexture);
            break;
        }
    }
    switch (sky) {
        case Background.eSky.eCloudy: {
            gEngine.Textures.unloadTexture(Background.eAssets.eSkyCloudyTexture);
            break;
        }
        case Background.eSky.eNightCloudy: {
            gEngine.Textures.unloadTexture(Background.eAssets.eSkyNightCloudyTexture);
            break;
        }
        case Background.eSky.eDusk: {
            gEngine.Textures.unloadTexture(Background.eAssets.eSkyDuskTexture);
            break;
        }
        default: {
            gEngine.Textures.unloadTexture(Background.eAssets.eSkyCloudyTexture);
            break;
        }
    }
    /*
    switch (bgm) {
        case Background.eBgm.eBgm_1: {
            gEngine.AudioClips.unloadAudio(Background.eAudio.eBgm_1);
            break;
        }
        case Background.eBgm.eBgm_2: {
            gEngine.AudioClips.unloadAudio(Background.eAudio.eBgm_2);
            break;
        }
        case Background.eBgm.eBgm_3: {
            gEngine.AudioClips.unloadAudio(Background.eAudio.eBgm_3);
            break;
        }
        case Background.eBgm.eBgm_4: {
            gEngine.AudioClips.unloadAudio(Background.eAudio.eBgm_4);
            break;
        }
        case Background.eBgm.eBgm_5: {
            gEngine.AudioClips.unloadAudio(Background.eAudio.eBgm_5);
            break;
        }
        case Background.eBgm.eBgm_6: {
            gEngine.AudioClips.unloadAudio(Background.eAudio.eBgm_6);
            break;
        }
        default: {
            gEngine.AudioClips.unloadAudio(Background.eAudio.eBgm_1);
            break;
        }
    }
    */
    gEngine.AudioClips.unloadAudio(Background.eAudio.eBgm_1);
    gEngine.AudioClips.unloadAudio(Background.eAudio.eBgm_2);
    gEngine.AudioClips.unloadAudio(Background.eAudio.eBgm_3);
    gEngine.AudioClips.unloadAudio(Background.eAudio.eBgm_4);
    gEngine.AudioClips.unloadAudio(Background.eAudio.eBgm_5);
    gEngine.AudioClips.unloadAudio(Background.eAudio.eBgm_6);
};