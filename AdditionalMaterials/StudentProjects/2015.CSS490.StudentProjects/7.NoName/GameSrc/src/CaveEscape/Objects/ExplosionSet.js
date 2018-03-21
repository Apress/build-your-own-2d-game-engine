/* File: ExplosionSet.js 
 *
 * Creates and initializes a ExplosionSet
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObjectSet */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function ExplosionSet(texture, particleSet, audioCueArray) {

    this.mAudioCueArray = audioCueArray;
    this.mParticleSet = particleSet;
    this.mTexture = texture;
    this.mSet = [];
}

ExplosionSet.eExplosionType = Object.freeze({
    eVerySmall: 0,
    eSmall: 1,
    eMedium: 2,
    eLarge: 3,
    eVeryLarge: 4
});

ExplosionSet.prototype.update = function() {
    
    // remove the expired ones from the set
    var i, obj;
    for (i = this.mSet.length - 1; i > 0; i--) {
        obj = this.getObjectAt(i);
        if (obj.hasExpired()) {
            this.removeFromSet(obj); 
        }
        else {
            obj.update();
        }
    }
};

ExplosionSet.prototype.newExplosion = function(x, y, type) {
    
    var e;
    switch(type) {
        
        case ExplosionSet.eExplosionType.eSmall:
            e = new Explosion(this.mTexture, x, y, 10, 1, this.mParticleSet);
            gEngine.AudioClips.playACue(this.mAudioCueArray[1]);
            break;
        
        case ExplosionSet.eExplosionType.eMedium:
            e = new Explosion(this.mTexture, x, y, 15, 1, this.mParticleSet);
            gEngine.AudioClips.playACue(this.mAudioCueArray[2]);
            break;
        
        case ExplosionSet.eExplosionType.eLarge:
            e = new Explosion(this.mTexture, x, y, 25, 2, this.mParticleSet);
            gEngine.AudioClips.playACue(this.mAudioCueArray[3]);
            break;
        
        case ExplosionSet.eExplosionType.eVeryLarge:
            e = new Explosion(this.mTexture, x, y, 45, 4, this.mParticleSet);
            gEngine.AudioClips.playACue(this.mAudioCueArray[4]);
            break;
        
        default:  // Very small
            e = new Explosion(this.mTexture, x, y, 2, 1, this.mParticleSet);
            gEngine.AudioClips.playACue(this.mAudioCueArray[0]);
            break;
    }
    this.addToSet(e);
};

ExplosionSet.prototype.addToSet = function (obj) {
    this.mSet.push(obj);
};

ExplosionSet.prototype.removeFromSet = function (obj) {
    var index = this.mSet.indexOf(obj);
    if (index > -1)
        this.mSet.splice(index, 1);
};

ExplosionSet.prototype.getObjectAt = function (index) {
    return this.mSet[index];
};
