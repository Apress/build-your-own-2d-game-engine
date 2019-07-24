//The Game World

function World(ID,Cupid,PlatformSet,ButtonSet,Boy,Girl) {
    this.kWinSound = "assets/AudioTest/Win.mp3";
    this.kFail = "assets/AudioTest/Fail.mp3";

    GameObjectSet.call(this);
    //this.addToSet(Cupid);
    this.mCupid = Cupid;
    this.mBoy = Boy;
    this.mGirl = Girl;
    this.mPlatformSet = PlatformSet;
    this.mButtonSet = ButtonSet;
    this.mIsWin = false;
    this.mIsLose = false;
    this.mGrade = 0;
    for (var i=0;i<PlatformSet.size();i++)
    {
        this.addToSet(PlatformSet.getObjectAt(i));
    }
    this.addToSet(Boy);
    this.addToSet(Girl);
    // Set up the message
    this.mTimeMsg = new FontRenderable("Time  00:00");
    this.mTimeMsg.setColor([0, 0, 0, 1]);
    this.mTimeMsg.setTextHeight(5);
    this.mTimeMsg.getXform().setPosition(5,145);

    this.mArrowMsg = new FontRenderable("Current Arrow:");
    this.mArrowMsg.setColor([0, 0, 0, 1]);
    this.mArrowMsg.setTextHeight(5);
    this.mArrowMsg.getXform().setPosition(5,10);

    this.mLevelMsg = new FontRenderable("Current Level");
    this.mLevelMsg.setColor([0, 0, 0, 1]);
    this.mLevelMsg.getXform().setPosition(5, 138);
    this.mLevelMsg.setTextHeight(5);
    this.mLevelMsg.setText("Current Level: " + ID);

    this.mMsg = new FontRenderable("");
    this.mMsg.setColor([0, 0, 0, 1]);
    this.mMsg.setTextHeight(4);

    this.mMsg1 = new FontRenderable("");
    this.mMsg1.setColor([0, 0, 0, 1]);
    this.mMsg1.setTextHeight(4);
    if (ID === 1) {
        this.mMsg.setText("Use your Mouse to control the Bow and Arrows");
        this.mMsg.getXform().setPosition(50, 80);
        this.mMsg1.setText("Press A/D and SPACE to move around");
        this.mMsg1.getXform().setPosition(60, 75);
    }
    if (ID === 2) {
        this.mMsg.setText("Shoot the button to move the platform");
        this.mMsg.getXform().setPosition(100, 120);
        this.mMsg1.setText("Do not touch the BLACK TRAP");
        this.mMsg1.getXform().setPosition(100, 110);
    }
    if (ID === 3) {
        this.mMsg.setText("Press E to use Fire Arrow to make Boy/Girl move");
        this.mMsg.getXform().setPosition(40, 95);
        this.mMsg1.setText("Make the Girl move and drop. Two guys in one shot");
        this.mMsg1.getXform().setPosition(40, 85);
    }
    if (ID === 4) {
        this.mMsg.setText("Press SHIFT to use Bounce Arrow");
        this.mMsg.getXform().setPosition(100, 130);
        this.mMsg1.setText("To use Normal Arrow, press again");
        this.mMsg1.getXform().setPosition(100, 120);
    }

    this.mTimer = 0;
    this.mSeconds = 0;
    this.mMinutes = 0;

    this.mNormalArrowSum = 0;
    this.mBounceArrowSum = 0;
    this.mFireArrowSum = 0;
}
gEngine.Core.inheritPrototype(World,GameObjectSet);

World.prototype.draw = function(aCamera){
    GameObjectSet.prototype.draw.call(this,aCamera);
    this.mButtonSet.draw(aCamera);
    this.mMsg.draw(aCamera);
    this.mMsg1.draw(aCamera);
    this.mTimeMsg.draw(aCamera);
    this.mArrowMsg.draw(aCamera);
    this.mLevelMsg.draw(aCamera);
}

World.prototype.update = function () {

    if (!this.mIsWin) {
        this.mCupid.update(this);
        this.mPlatformSet.update();
        this.mButtonSet.update();
        this.mBoy.update(this.mCupid.mArrowSet,this.mPlatformSet);
        this.mGirl.update(this.mCupid.mArrowSet,this.mPlatformSet);
        gEngine.Physics.processCollision(this,[]);

        this.mTimer += 1;
        if (this.mTimer > 59)
        {
            this.mSeconds += 1;
            this.mTimer = 0;
            if (this.mSeconds > 59)
            {
                this.mSeconds = 0;
                this.mMinutes += 1;
            }
            this.mTimeMsg.setText("Time  " + (this.mMinutes>9?"":"0") + this.mMinutes + ":" + (this.mSeconds>9?"":"0") + this.mSeconds);
        }

        switch(this.mCupid.getCurrentArrow()) {
            case 0:
                this.mArrowMsg.setText("Current Arrow: Normal");
                break;
            case 1:
                this.mArrowMsg.setText("Current Arrow: Fire");
                break;
            case 2:
                this.mArrowMsg.setText("Current Arrow: Bounce");
                break;
            case 3:
                this.mArrowMsg.setText("Current Arrow: Fire & Bounce");
        }
    }

    if (this.mBoy.mIsHit && this.mGirl.mIsHit)
    {
        this.calcGrade();
        this.mIsWin = true;
        gEngine.AudioClips.stopBackgroundAudio();
        gEngine.AudioClips.playACue(this.kWinSound);
    }
    var xform = this.mCupid.getXform();
    if (xform.getYPos()<-20 || this.mBoy.getXform().getYPos()<-20 || this.mGirl.getXform().getYPos()<-20) //Out of the world bound
    {
        this.mIsLose = true;
        gEngine.AudioClips.stopBackgroundAudio();
        gEngine.AudioClips.playACue(this.kFail);
    }
}

World.prototype.incNormalSum = function () {
    this.mNormalArrowSum += 1;
}

World.prototype.incFireSum = function () {
    this.mFireArrowSum += 1;
}

World.prototype.incBounceSum = function () {
    this.mBounceArrowSum += 1;
}

World.prototype.calcGrade = function () {
    var grade = 0;
    if (this.mMinutes < 1) grade += 1;
    if (this.mFireArrowSum + this.mBounceArrowSum < 6) grade += 1;
    if (this.mNormalArrowSum < 10) grade += 1;
    this.mGrade = grade;
}