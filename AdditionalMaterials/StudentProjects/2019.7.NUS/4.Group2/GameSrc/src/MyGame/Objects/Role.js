/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function Role(spriteTexture, x, y, n){
    var w= 8;
    var h = 24;
    this.kFallinlove = "assets/AudioTest/Fallinlove.mp3";

    this.mCW = w/2;
    this.mCH = h/2;
    this.mRole = new SpriteRenderable(spriteTexture);
    this.mRole.getXform().setPosition(x, y);
    this.mRole.getXform().setSize(w, h);
    this.mRole.setColor([1,1,1,0]);
    this.xpos = x;
    this.mHeart = new SpriteRenderable(spriteTexture);
//    this.mHeart.getXform().setPosition(x, y + 10);
    this.mHeart.getXform().setSize(15, 15);
    this.mN = n;
    this.mOnPlatform = false;
    this.mOnPlatformID = 0;
    this.mKeepTime = 300;
    
    if(n === 1){
        this.mRole.setElementPixelPositions(100, 340, 10, 744);
        this.mHeart.setElementPixelPositions(370, 650,657,937 );
    }
    else{
        this.mRole.setElementPixelPositions(700, 940, 10, 783);
        this.mHeart.setElementPixelPositions(650, 370,657,937 );
    }
    GameObject.call(this, this.mRole);

    this.mIsHit = false;
    this.mIsMoving = false;
    this.mIsInAir = false;
    this.mDirection = 1;
    this.mSpeed = 0.2;
    this.mTimer = 0;
    var r = new RigidRectangle(this.getXform(), w, h);
    this.setRigidBody(r);
    this.getRigidBody().setMass(10);
    this.getRigidBody().setRestitution(0.0);
    this.getRigidBody().setFriction(10);
    //this.toggleDrawRigidShape();
}
gEngine.Core.inheritPrototype(Role, GameObject);

Role.prototype.draw = function(camera){
    if(this.mIsHit)
        this.mHeart.draw(camera);
    this.mRole.draw(camera);
};

Role.prototype.update = function(ArrowSet,PlatformSet){
    var xform = this.getXform();
    this.getRigidBody().setVelocity(0,this.getRigidBody().getVelocity()[1]);
    this.mHeart.getXform().setPosition(this.mRole.getXform().getXPos(), this.mRole.getXform().getYPos());

    var info = new CollisionInfo();
    xform.setYPos(xform.getYPos()-0.2);

    //Deal with the collision
    for (var i = 0; i < PlatformSet.size(); i++) {
        var status = this.getBBox().enterCollideStatus(PlatformSet.getObjectAt(i).getBBox());
        if (status === 1)
        {
            this.mOnPlatform = true;
            this.mIsInAir = false;
            if (this.mOnPlatformID !== i)
                this.mIsMoving = false;
            this.mOnPlatformID = i;
        }
    }
    if (this.mIsMoving)
    {
        this.getXform().setXPos(this.getXform().getXPos() + this.mSpeed * this.mDirection);
    }

    var b = this.getBBox();
    if (this.mOnPlatform) {
        xform.setYPos(PlatformSet.getObjectAt(this.mOnPlatformID).getBBox().maxY() + this.mCH);
        if (PlatformSet.getObjectAt(this.mOnPlatformID).mIsMove)
            xform.setXPos(xform.getXPos() + PlatformSet.getObjectAt(this.mOnPlatformID).mMoveSpeed * PlatformSet.getObjectAt(this.mOnPlatformID).mDirection);
        if (b.maxX() <= PlatformSet.getObjectAt(this.mOnPlatformID).getBBox().minX()+1
            || b.minX() >= PlatformSet.getObjectAt(this.mOnPlatformID).getBBox().maxX()-1)
        {
            this.mOnPlatform = false;
            this.mIsInAir = true;
        }
    }

    if (this.mIsInAir)
    {
        this.getRigidBody().setVelocity(0,0);
        this.mOnPlatform = false;
        this.mIsInAir = false;
    }

    for (var i=0;i<ArrowSet.size();i++){
        if (this.getRigidBody().collisionTest(ArrowSet.getObjectAt(i).getRigidBody(),info))
        {
            gEngine.AudioClips.playACue(this.kFallinlove);
            if (!ArrowSet.getObjectAt(i).getIsFireHit() && ArrowSet.getObjectAt(i).getIsFire()) {
                this.mIsMoving = true;
                var xform = ArrowSet.getObjectAt(i).getXform();
                if (xform.getXPos() < this.getXform().getXPos()) {
                    this.mDirection = 1;
                } else this.mDirection = -1;
                if (this.mDirection === 1) {
                    if (this.mN === 1)
                        this.mRole.setElementPixelPositions(340, 100, 10, 744);
                    else
                        this.mRole.setElementPixelPositions(700, 940, 10, 783);
                }
                else{
                    if (this.mN === 1)
                        this.mRole.setElementPixelPositions(100, 340, 10, 744);
                    else
                        this.mRole.setElementPixelPositions(940, 700, 10, 783);
                }
                ArrowSet.getObjectAt(i).setIsFireHit(true);
            }
            this.mIsHit = true;
//          this.mRole.setColor([1,0.6,0.8,0.8]);
            this.mTimer = 0;
        }
    }
    if (this.mIsHit)
    {
        this.mTimer += 1;
    }
    if (this.mTimer > 300)
    {
        this.mIsHit = false;
        this.mIsMoving = false;
        this.mTimer = 0;
//        this.mRole.setColor([1,1,1,0]);
    }
    GameObject.prototype.update.call(this);
    this.getXform().setRotationInRad(0);
};