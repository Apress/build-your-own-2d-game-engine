





function SpikePlatform(pixelPosition, spriteTexture, pos, size) {
    Platform.call(this, pixelPosition, spriteTexture, pos, size);

}
SpikePlatform.state = Object.freeze({
    Animating: 1,
    Waiting: 2 
});

gEngine.Core.inheritPrototype(SpikePlatform, Platform);

