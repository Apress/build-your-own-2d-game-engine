/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function PlatformFactory(mapOfSprites, globalPlatformSet,globalTextureSet, light) {
    this.mSpriteSheetMap = mapOfSprites;
    this.mSpriteMap = {};
    this.mAllPlatforms = globalPlatformSet;
    this.mTextureSet = globalTextureSet;
    this.mLight = light;

    
    var key;
    
    //green platforms
    key = 'middleGreen';
    this.mSpriteMap[key] = [280,349,233,301];
    key = 'leftGreen';
    this.mSpriteMap[key] = [280,349,164,232];
    key = 'rightGreen';
    this.mSpriteMap[key] = [280,349,303,372];
    key = 'dirt';
    this.mSpriteMap[key] = [0,69,90,150];
    
    
    //objects
    key = 'plainBox';
    this.mSpriteMap[key] = [0,127,1280,1408];
    key = 'boxWithX';
    this.mSpriteMap[key] = [0,127,1408,1536];
    key = 'boxWithSlash';
    this.mSpriteMap[key] = [0,127,1536,1664];
    key = 'rock';
    this.mSpriteMap[key] = [256,384,1280,1407];
    key = '!withBorder';
    this.mSpriteMap[key] = [512,639,1280,1408];
    key = 'spikes';
    this.mSpriteMap[key] = [129.5,257,0,65];
    key = 'stone';
    this.mSpriteMap[key] = [512,639,1792,1920];
    key = 'lock';
    this.mSpriteMap[key] = [256,384,768,896];
    key = 'yellowBox';
    this.mSpriteMap[key] = [0,127,768,896];
    key = 'bomb';
    this.mSpriteMap[key] = [0,127,511,639];
}

PlatformFactory.prototype.newSimplePlatform = function (object, sheet, pos) {
    var platform = new Platform(this.mSpriteMap[object], this.mSpriteSheetMap[sheet], pos, [10,10]);
    this.mAllPlatforms.addToSet(platform);
    return platform.getWidth();
};

PlatformFactory.prototype.newSimpleTexture = function (object, sheet, pos) {
    this.newSimplePlatform(object, sheet, pos);
    /*
    var texture = new LightRenderable(this.mSpriteSheetMap[sheet]);
    texture.getXform().setPosition(pos[0], pos[1]);
    texture.getXform().setSize(10,10);
    texture.setElementPixelPosArray(this.mSpriteMap[object]);
    this.mTextureSet.addToSet(texture);*/
};

PlatformFactory.prototype.newBoxPlatform = function (object, sheet, pos) {
    var platform = new Platform(this.mSpriteMap[object], this.mSpriteSheetMap[sheet], pos, [10,10]);
    this.mAllPlatforms.addToSet(platform);
    return platform.getWidth();

};

PlatformFactory.prototype.newSpikePlatform = function (pos) {
    var objectKey = 'spikes';
    var sheetKey = 'objects';
    var platform = new SpikePlatform(this.mSpriteMap[objectKey], this.mSpriteSheetMap[sheetKey], pos, [10,10]);
    this.mAllPlatforms.addToSet(platform);
    return platform.getWidth();

};

PlatformFactory.prototype.newAwardPlatform = function (pos) {
    var objectKey = '!withBorder';
    var sheetKey = 'objects';
    var platform = new AwardBox(this.mSpriteMap[objectKey], this.mSpriteSheetMap[sheetKey], pos, [10,10], this.mLight);
    this.mAllPlatforms.addToSet(platform);
};