/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function LightningPrep(boss) {
    //GameObject.call(this, renderable);
    this.kLightningBolt = "assets/lightning.png";
    this.KShockSound = "assets/Sounds/electricshock.wav";
    
    this.mLBolts = [];
    var i;
    for(i = 0; i < 6; i++) {
        this.mLBolts.push(new LightRenderable(this.kLightningBolt));
        this.mLBolts[i].getXform().setPosition(230, 7.9);
    this.mLBolts[i].setSpriteSequence(512, 0, 128, 512, 8, 0);
    this.mLBolts[i].setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
    this.mLBolts[i].setAnimationSpeed(1);
    this.mLBolts[i].setColor([1, 1, 1, 0]);
    this.mLBolts[i].getXform().setSize(1,2);
    this.mLBolts[i].getXform().incRotationByDegree(i * 30);
    }
//
//    this.mLightningBolt.getXform().setPosition(230, 7.9);
//    this.mLightningBolt.setSpriteSequence(512, 0, 128, 512, 8, 0);
//    this.mLightningBolt.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
//    this.mLightningBolt.setAnimationSpeed(1);
//    this.mLightningBolt.setColor([1, 1, 1, 0]);
//    this.mLightningBolt.getXform().setSize(1,2);
    
    this.isOn = false;
    this.mCurrentState = LightningBolt.eLightningBolt.eWait;
    this.mStateTimeClick = 0;
    this.mBoss = boss;
}

gEngine.Core.inheritPrototype(LightningPrep, GameObject);

LightningPrep.eLightningBolt = Object.freeze({
    eShoot: 0,
    eWait: 1
});

LightningPrep.prototype.draw = function(aCamera) {
    if(this.isOn) {
        for(i = 0; i < 6; i++) {
            this.mLBolts[i].getXform().setPosition(this.mBoss.getXform().getXPos(),
                                                this.mBoss.getXform().getYPos());
            this.mLBolts[i].draw(aCamera);
        }
    }
};

LightningPrep.prototype.update = function() {
    switch(this.mCurrentState) {
        case LightningPrep.eLightningBolt.eWait:
            this._wait();
            break;
        case LightningPrep.eLightningBolt.eShoot:
            gEngine.AudioClips.playACue(this.KShockSound);
            this._shoot();
            break;
    }
    if(this.isOn) {
        for(i = 0; i < 6; i++) {
            this.mLBolts[i].updateAnimation();
        }
    }
};

LightningPrep.prototype._wait = function() {
    if(this.isOn) {
        this.mCurrentState = LightningPrep.eLightningBolt.eShoot;
    }
};

LightningPrep.prototype._shoot = function() {
    if(this.mStateTimeClick === 10) {
        this.mCurrentState = LightningPrep.eLightningBolt.eWait;
        this.isOn = false;
        this.mStateTimeClick = 0;
    }
    this.mStateTimeClick += 1;
};

LightningPrep.prototype.activate = function () {
    this.isOn = true;
};