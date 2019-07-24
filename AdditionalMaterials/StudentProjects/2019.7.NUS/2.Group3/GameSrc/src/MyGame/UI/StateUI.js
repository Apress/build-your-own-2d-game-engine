
"use strict";  // Operate in Strict mode such that variables must be declared before used!

function StateUI(player) {
    this.mPlayer = player;
    this.kVal = 7;
    this.kDirectionDifferenceEnum = {
        RIGHT: [-this.kVal,0],//zuo
        TOPRIGHT: [-this.kVal,-this.kVal],//zuo xia
        TOP: [0,-this.kVal],//xia
        TOPLEFT: [this.kVal,-this.kVal],//you xia
        LEFT: [this.kVal,0],//you
        BOTTOMLEFT: [this.kVal,this.kVal],//you shang
        BOTTOM: [0,this.kVal],//shang
        BOTTOMRIGHT: [-this.kVal,this.kVal]//zuo shang
    };
    this.canAppear = false;
    this.directionDifference = [0,0];
    this.mStateUI = new UIText("Haha & Coco (alpha)",[475,450],8,1,0,[0,0,0,1]);
}

StateUI.prototype.update = function(){
    switch(this.mPlayer.direction){
        case this.mPlayer.DirectionEnum.RIGHT:
            this.directionDifference = this.kDirectionDifferenceEnum.RIGHT; break;
        case this.mPlayer.DirectionEnum.TOPRIGHT:
            this.directionDifference = this.kDirectionDifferenceEnum.TOPRIGHT; break;
        case this.mPlayer.DirectionEnum.TOP:
            this.directionDifference = this.kDirectionDifferenceEnum.TOP; break;
        case this.mPlayer.DirectionEnum.TOPLEFT:
            this.directionDifference = this.kDirectionDifferenceEnum.TOPLEFT; break;
        case this.mPlayer.DirectionEnum.LEFT:
            this.directionDifference = this.kDirectionDifferenceEnum.LEFT; break;
        case this.mPlayer.DirectionEnum.BOTTOMLEFT:
            this.directionDifference = this.kDirectionDifferenceEnum.BOTTOMLEFT; break;
        case this.mPlayer.DirectionEnum.BOTTOM:
            this.directionDifference = this.kDirectionDifferenceEnum.BOTTOM; break;
        case this.mPlayer.DirectionEnum.BOTTOMRIGHT:
            this.directionDifference = this.kDirectionDifferenceEnum.BOTTOMRIGHT; break;
    }
    var player_xform = this.mPlayer.getXform();
    this.mStateUI.getXform().setPosition(player_xform.getXPos() + this.directionDifference[0],player_xform.getYPos() + this.directionDifference[1]);
    switch(this.mPlayer.deathReason){
        case this.mPlayer.DeathEnum.NOTDEAD:
            this.canAppear = false; break;
        case this.mPlayer.DeathEnum.FALL:
            this.mStateUI.setText("Fall");
            this.canAppear = true;  break;
        case this.mPlayer.DeathEnum.TRAP:
            this.mStateUI.setText("Trap");
            this.canAppear = true;  break;
        case this.mPlayer.DeathEnum.FLYING_ICE_CREAM:
            this.mStateUI.setText("Being Knocked");
            this.canAppear = true;  break;
    }
    
};

StateUI.prototype.draw = function (camera) {
    if(this.canAppear){
        this.mStateUI.draw(camera);
        console.log(this.mPlayer.getXform().getPosition() +  "  " + this.mStateUI.getXform().getPosition());
    }
};
