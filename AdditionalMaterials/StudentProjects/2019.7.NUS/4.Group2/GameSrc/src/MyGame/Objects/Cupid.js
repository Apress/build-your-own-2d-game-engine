//The Character : Cupid

function Cupid(spriteTexture, aCamera, x, y, PlatformSet) {
    var w=10;
    var h=16;
    this.mBowOffset = 10;
    this.kEnergyBar = "assets/EnergyBar.png";
    this.kArrowfast = "assets/AudioTest/Arrowfast.mp3";
    this.kArrowslow = "assets/AudioTest/Arrowslow.mp3";

    this.mCW = w/2;
    this.mCH = h/2;
    this.mCupid = new SpriteAnimateRenderable(spriteTexture);
    this.mCupid.setColor([1,1,1,0]);
    this.mCupid.getXform().setPosition(x,y);
    this.mCupid.getXform().setSize(w,h);
//    this.mCupid.setElementPixelPositions(0,277,0,445);
    this.mCupid.setSpriteSequence(205, 0, 128, 205, 4, 0);
    this.mCupid.setAnimationSpeed(10);
    
    this.mArrowSet = new ArrowSet();
    this.kTexture = spriteTexture;
    this.mCamera = aCamera;
    this.mDirection = 1;
    this.mOnPlatform = false;
    this.mOnPlatformID = 0;

    this.mCrosshair = new Crosshair(spriteTexture,aCamera);
    this.mBow = new Bow(spriteTexture,aCamera,this.mCupid, this.mBowOffset);
    this.mBar = new EnergyBar(this.kEnergyBar,this.mCrosshair.getXform());
    this.mBarVisible = false;

    this.mG = -0.1;
    this.mf = -0.5;
    this.mSpeedX = 0;
    this.mSpeedY = 0;

    this.kDelta = 0.1;
    this.mSpeedCount = 0;
    this.mIsInAir = true;
    this.mBounceNum = 0;
    this.mIsFire = false;

    GameObject.call(this,this.mCupid);
}
gEngine.Core.inheritPrototype(Cupid,GameObject);

Cupid.prototype.draw = function(aCamera){
    this.mCupid.draw(aCamera);
    this.mBow.draw(aCamera);
    this.mCrosshair.draw(aCamera);
    this.mArrowSet.draw(aCamera);
    this.mBar.draw(aCamera);
}

Cupid.prototype.update = function(World){

    //Get the references
    var xform = this.getXform();
    var PlatformSet = World.mPlatformSet;
    var temp = this.mDirection;

    //Reset the Cupid's position
    // if (gEngine.Input.isKeyClicked(gEngine.Input.keys.R))
    // {
    //     xform.setPosition(60,50);
    //     this.mSpeedX = 0;
    //     this.mSpeedY = 0;
    // }

    //Move Left and Right
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A))
    {
        this.mSpeedX = -1;
        this.mCupid.updateAnimation();
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D))
    {
        this.mSpeedX = 1;
        this.mCupid.updateAnimation();
    }
    //Update the speed of Y-axis
    if (!this.mOnPlatform)
        this.mSpeedY += this.mG;

    //Update the Cupid's position
    xform.incXPosBy(this.mSpeedX);
    xform.incYPosBy(this.mSpeedY);

    //Jump
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space) && !this.mIsInAir)
    {
        this.mSpeedY = 3;
        var speedJump = PlatformSet.getObjectAt(this.mOnPlatformID).getSpeed();
        xform.setYPos(xform.getYPos()+ speedJump + this.kDelta);
        this.mIsInAir = true;
        this.mOnPlatform = false;
    }

    var b = this.getBBox();
    if (this.mOnPlatform) {
        //Fix the Cupid on the platform
        xform.setYPos(PlatformSet.getObjectAt(this.mOnPlatformID).getBBox().maxY() + this.mCH);
        if (PlatformSet.getObjectAt(this.mOnPlatformID).mIsMove && PlatformSet.getObjectAt(this.mOnPlatformID).mMoveDirection === 1)
            xform.setXPos(xform.getXPos() + PlatformSet.getObjectAt(this.mOnPlatformID).mMoveSpeed * PlatformSet.getObjectAt(this.mOnPlatformID).mDirection);
        if (b.maxX() < PlatformSet.getObjectAt(this.mOnPlatformID).getBBox().minX()
            || b.minX() > PlatformSet.getObjectAt(this.mOnPlatformID).getBBox().maxX()) {
            this.mOnPlatform = false;
        }
    }

    //Deal with the collision
    for (var i = 0; i < PlatformSet.size(); i++) {
        var status = this.getBBox().enterCollideStatus(PlatformSet.getObjectAt(i).getBBox());
        var speed = PlatformSet.getObjectAt(i).mMoveSpeed;
        //On the top of platforms
        if (status === 1) {
                this.mOnPlatformID = i;
                this.mOnPlatform = true;
                xform.setYPos(PlatformSet.getObjectAt(i).getBBox().maxY() + this.mCH);
                this.mSpeedY = 0;
                this.mIsInAir = false;
        }
        //At the bottom of platforms
        if (status === 2) {
            xform.setYPos(PlatformSet.getObjectAt(i).getBBox().minY() - this.mCH);
            this.mSpeedY = 0;
            this.mOnPlatform = false;
        }
        //At the right of platforms
        if (status === 4) {
            xform.setXPos(PlatformSet.getObjectAt(i).getBBox().maxX() + this.mCW);
            this.mSpeedX = 0;
        }
        //At the left of platforms
        if (status === 8) {
            xform.setXPos(PlatformSet.getObjectAt(i).getBBox().minX() - this.mCW);
            this.mSpeedX = 0;
        }
    }

    if (this.mOnPlatform)
    {
        //Slow down when on the top of platforms
        if (this.mSpeedX > 0) {
            this.mSpeedX += this.mf;
            if (this.mSpeedX < 0) this.mSpeedX = 0;
        } else {
            this.mSpeedX -= this.mf;
            if (this.mSpeedX > 0) this.mSpeedX = 0;
        }
    }

    //Update the Crosshair position
    this.mCrosshair.update();

    //Update the Bow's position and rotation
    var vx = this.mCamera.mouseWCX() - xform.getXPos();
    var vy = this.mCamera.mouseWCY() - xform.getYPos();
    if (vx>0) //get the Bow's direction
        this.mDirection = 1;
    else this.mDirection = -1;
    var radian = Math.atan2(vy,vx);
    var cosT = Math.cos(radian);
    var sinT = Math.sin(radian);
    this.mBow.update(radian,cosT,sinT);

    //Use mouse to control the arrow's direction
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Shift))
        if (this.mBounceNum === 0) this.mBounceNum = 3;
        else this.mBounceNum = 0;
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.E))
        this.mIsFire = !this.mIsFire;
    if (gEngine.Input.isButtonPressed(gEngine.Input.mouseButton.Left))
    {
        if (this.mSpeedCount < 60) {
            this.mSpeedCount += 1;
            this.mCrosshair.setColor([this.mSpeedCount/60, 0, 0, 1]);
        }
        this.mBarVisible = true;
    }

    if (gEngine.Input.isButtonReleased(gEngine.Input.mouseButton.Left))
    {

        if (this.mSpeedCount > 5) {
            // if (this.mSpeedCount > 100)
            //     this.mSpeedCount = 100;
            //this.mSpeedCount = 100 - Math.abs(this.mSpeedCount - 100);
            if (this.mSpeedCount < 45)
                gEngine.AudioClips.playACue(this.kArrowslow);
            else gEngine.AudioClips.playACue(this.kArrowfast);
            if (gEngine.Input.isButtonReleased(gEngine.Input.mouseButton.Right)) bounceNum = 3;
            var arrow = new Arrow(PlatformSet,this.kTexture, this, cosT, sinT, this.mSpeedCount * 5, this.mBounceNum, this.mIsFire);
            this.mArrowSet.addToSet(arrow);
            if (this.mBounceNum>0) World.incBounceSum();
            if (this.mIsFire) World.incFireSum();
            if (!this.mIsFire && this.mBounceNum === 0) World.incNormalSum();
        }
        this.mSpeedCount = 0;
        this.mCrosshair.setColor([0,0,0,1]);
        this.mBarVisible = false;
    }

    //Update the EnergyBar
    this.mBar.update(this.mSpeedCount, this.mBarVisible);
    if(this.mDirection !== temp)
        if (this.mDirection>0) {
            this.mCupid.setSpriteSequence(205, 0, 128, 205, 4, 0);
        } else {
            this.mCupid.setSpriteSequence(412, 0, 128, 205, 4, 0);
        }

    GameObject.prototype.update.call(this);
    this.mArrowSet.update(World);
}

Cupid.prototype.getCurrentArrow = function () {
    var type = 0;
    if (this.mIsFire)
        type += 1;
    if (this.mBounceNum>0)
        type += 2;
    return type;
}