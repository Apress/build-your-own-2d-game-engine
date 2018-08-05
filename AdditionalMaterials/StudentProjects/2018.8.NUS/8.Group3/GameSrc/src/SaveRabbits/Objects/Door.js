"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Door(cx, cy, texture0, texture1, texture2) {
    this.kWidth = 20;
    this.kHeight = 64;
    this.kSpeed = 0.1;

    // control of movement
    this.mTopInitialYPosition = 0;
    this.mBotInitialYPosition = 0;
    this.mIsOpen = false;
    this.mDoorTop = new SpriteAnimateRenderable(texture0);
    this.mDoorBot = new SpriteAnimateRenderable(texture1);
    this.mDoorTopSleeve = new SpriteAnimateRenderable(texture2);
    this.mDoorBotSleeve = new SpriteAnimateRenderable(texture2);

    this.mDoorTop.setColor([0,0,0,0]) ;
    this.mDoorBot.setColor([0,0,0,0]) ;
    this.buildSprite(cx, cy);
    GameObject.call(this, this.mDoorTop);
    
    var rigidShape = new RigidRectangle(this.getXform(), this.kWidth*0.8, 104 );
    rigidShape.setMass(0);  // ensures no movements!
    rigidShape.toggleDrawBound();
    this.setRigidBody(rigidShape);
    
    
}
gEngine.Core.inheritPrototype(Door, GameObject);

Door.prototype.update = function () {
    GameObject.prototype.update.call(this);
    if (this.mIsOpen) {
        this._openDoor();
   }
};

Door.prototype.draw = function (aCamera) {
    GameObject.prototype.draw.call(this, aCamera);
    this.mDoorTop.draw(aCamera);
    this.mDoorBot.draw(aCamera);
    this.mDoorTopSleeve.draw(aCamera);
    this.mDoorBotSleeve.draw(aCamera);

};

Door.prototype.buildSprite = function (atX, atY) {
    this.mTopInitialYPosition = atY + 10;
    this.mDoorTop.getXform().setPosition(atX, this.mTopInitialYPosition);
    this.mDoorTop.getXform().setSize(this.kWidth*0.8, this.kHeight-38);
    this.mDoorTop.setElementPixelPositions(0, 64, 0, 128);

    this.mBotInitialYPosition = atY - 10;
    this.mDoorBot.getXform().setPosition(atX, this.mBotInitialYPosition);
    this.mDoorBot.getXform().setSize(this.kWidth*0.8, this.kHeight-38);

    this.mDoorBot.setElementPixelPositions(0, 64, 0, 128);

    this.mDoorTopSleeve.getXform().setPosition(atX, atY + 29);
    this.mDoorTopSleeve.getXform().setSize(this.kWidth *0.8, 20);
    this.mDoorTopSleeve.setElementPixelPositions(0, 128, 350, 512);

    this.mDoorBotSleeve.getXform().setPosition(atX, atY - 30);
    this.mDoorBotSleeve.getXform().setSize(this.kWidth *0.8, 20);
    this.mDoorBotSleeve.setElementPixelPositions(0, 128, 0, 150);
};

Door.prototype._openDoor = function () {
    var topY = this.mDoorTop.getXform().getYPos();
    var botY = this.mDoorBot.getXform().getYPos();

    if (Math.abs(this.mTopInitialYPosition - topY) <= (this.kHeight-30 )
            || Math.abs(this.mBotInitialYPosition - botY) <= (this.kHeight-30)) {
//        while(this.mDoorTop.getXform().getYPos() <= (topY+0.000003 )) {
//            this.mDoorTop.getXform().incYPosBy(0.05);kHeight
            //this.mDoorTop.getXform().setSize(1,1);
            this.mDoorTop.getXform().setYPos(topY + 0.2);
            this.mDoorTop.setElementPixelPositions(64, 128, 0, 128);
        //}
        
//        while(this.mDoorBot.getXform().getYPos() >= (botY-2 )) {
//         this.mDoorBot.getXform().incYPosBy(-0.05)
        this.mDoorBot.getXform().setYPos(botY - 0.2);
        this.mDoorBot.setElementPixelPositions(64, 128, 0, 128);
    //}

        this.mDoorTopSleeve.setElementPixelPositions(128, 256, 350, 512);
        this.mDoorBotSleeve.setElementPixelPositions(128, 256, 0, 150);
    }
    this.getRigidBody().mHeight = 1;

};


Door.prototype.unlockDoor = function () {
    this.mIsOpen = true;
};
