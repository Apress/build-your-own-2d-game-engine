/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Boulder.eBoulderState = Object.freeze({
    eWait: 0,
    eDropBoulder: 1
});

function Boulder(x,y, velocity, radius, hero) {
    this.isOn = false;
    this.mHero = hero;
    this.Pos = [x,y + 3];
    this.mWaitDuration = 500;
    this.mHeroHit = false;
    
    this.mCurrentState = Boulder.eBoulderState.eWait;
    this.mStateTimeClick = 0;
    
    this.mBoulder = new LightRenderable("assets/Stone.png");//, velocity, radius);
    this.mBoulder.getXform().setPosition(x,y + 3);
    this.mBoulder.getXform().setSize(2,2);
    this.mBoulder.setColor([1,1,1,0]);
    
}
gEngine.Core.inheritPrototype(Boulder, GameObject);

Boulder.prototype.update = function () {
    switch (this.mCurrentState) {
        case Boulder.eBoulderState.eDropBoulder:
            this._dropBoulder();
            break;
        case Boulder.eBoulderState.eWait:
            this._wait();
            break;
    }
};

Boulder.prototype.draw = function(aCamera) {
        this.mBoulder.draw(aCamera);
};

Boulder.prototype._wait = function(){
    if(this.isOn) {
        this.mCurrentState = Boulder.eBoulderState.eDropBoulder;
    }
};

Boulder.prototype._dropBoulder = function(){
    if(this.mStateTimeClick === this.mWaitDuration / 2) {
        this.mBoulder.getXform().setPosition(this.Pos[0], this.Pos[1]);
        this.isOn = false;
        this.mCurrentState = Boulder.eBoulderState.eWait;
        this.mStateTimeClick = 0;
        this.mHeroHit = false;
    }
    else {
        this.mBoulder.getXform().incYPosBy(-0.25);
        this.mStateTimeClick += 1;
        if(this.mHeroHit === false) {
            this.heroHit();
        }  
    }
};

Boulder.prototype.activate = function() {
    this.isOn = true;
};

Boulder.prototype.heroHit = function () {
    var heroX = this.mHero.getXform().getXPos();
    var heroY = this.mHero.getXform().getYPos();
    
    var boulderX = this.mBoulder.getXform().getXPos();
    var boulderY = this.mBoulder.getXform().getYPos();

    if( heroX > boulderX - 1 && heroX < boulderX + 1 && 
            heroY > boulderY - 1 && heroY < boulderY + 1) {
            this.mHero.hitTaken(0);
            this.mHeroHit = true;
    }
};

Boulder.prototype.setWaitDur = function(waitDur) {
    this.mWaitDuration = waitDur;
};