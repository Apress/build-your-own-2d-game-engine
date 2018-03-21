/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function LightningBolt(hero) {
    this.KBoltSound = "assets/Sounds/LightningBolt.wav";
    //GameObject.call(this, renderable);
    this.kLightningBolt = "assets/lightning.png";
    this.mLightningBolt = new LightRenderable(this.kLightningBolt);
    this.mLightningBolt.getXform().setPosition(230, 7.9);
    //this.mLightningBolt.setSpriteSequence(512, 0, 140, 180, 3, 0);
    this.mLightningBolt.setSpriteSequence(512, 0, 128, 512, 8, 0);
    this.mLightningBolt.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
    this.mLightningBolt.setAnimationSpeed(1);
    this.mLightningBolt.setColor([1, 1, 1, 0]);
    this.mLightningBolt.getXform().setSize(4,15);
    
    this.isOn = false;
    this.mCurrentState = LightningBolt.eLightningBolt.eWait;
    this.mStateTimeClick = 0;
    this.mHero = hero;
}

gEngine.Core.inheritPrototype(LightningBolt, GameObject);

LightningBolt.eLightningBolt = Object.freeze({
    eShoot: 0,
    eWait: 1
});

LightningBolt.prototype.draw = function(aCamera) {
    if(this.isOn && this.mHero.getLight()) {
        this.mLightningBolt.getXform().setXPos(this.mHero.getXform().getXPos());
        this.mLightningBolt.getXform().setYPos(this.mHero.getXform().getYPos() + 6);
        this.mLightningBolt.draw(aCamera);
    }
};

LightningBolt.prototype.update = function() {
    switch(this.mCurrentState) {
        case LightningBolt.eLightningBolt.eWait:
            this._wait();
            break;
        case LightningBolt.eLightningBolt.eShoot:
            this._shoot();
            break;
    }
    if(this.isOn) {
        this.mLightningBolt.updateAnimation();
    }
};

LightningBolt.prototype._wait = function() {
    if(this.isOn && this.mHero.getLight()) {
        this.mCurrentState = LightningBolt.eLightningBolt.eShoot;
    }
};

LightningBolt.prototype._shoot = function() {
    if(this.isOn && this.mHero.getLight()) {
        gEngine.AudioClips.playACue(this.KBoltSound);
    }
    if(this.isOn && this.mStateTimeClick === 10) {
        if(this.mHero.getLight()) {
            this.heroHit();
        }
        this.mCurrentState = LightningBolt.eLightningBolt.eWait;
        this.isOn = false;
        this.mStateTimeClick = 0;
    }
    this.mStateTimeClick += 1;
};

LightningBolt.prototype.heroHit = function () {
    this.mHero.hitTaken(0);
};

LightningBolt.prototype.activate = function () {
    this.isOn = true;
};