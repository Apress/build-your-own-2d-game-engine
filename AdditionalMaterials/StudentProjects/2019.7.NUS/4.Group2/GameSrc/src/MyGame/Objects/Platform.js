//The platform that characters stand on

function Platform(spriteTexture,x,y,w,h,move=false,min=0,max=0,moveSpeed=0,direction=0) {

    this.minH = min;
    this.maxH = max;
    this.mIsMove = move;
    this.mMoveDirection = direction; // 0:vertical 1:horizontal
    this.mMoveSpeed = moveSpeed;
    this.mDirection = 1;
    this.mPlatform = new SpriteRenderable(spriteTexture);
    this.mPlatform.setColor([1,1,1,0]);
    this.mPlatform.getXform().setPosition(x,y);
    this.mPlatform.getXform().setSize(w,h);
    this.mPlatform.setElementPixelPositions(0,w * 10,0, h * 10);
    //this.mPlatform.setElementPixelPositions();
    GameObject.call(this,this.mPlatform);

    var r = new RigidRectangle(this.getXform(), w, h);
    this.setRigidBody(r);
    this.getRigidBody().setMass(0);
    this.getRigidBody().setRestitution(0.0);
    this.getRigidBody().setFriction(10);
   // this.toggleDrawRenderable();
   //this.toggleDrawRigidShape();
}
gEngine.Core.inheritPrototype(Platform,GameObject);

Platform.prototype.update = function(){
    var xform = this.mPlatform.getXform();
    if (this.mIsMove) {
        if (this.mMoveDirection === 0) {
            xform.setYPos(xform.getYPos() + this.mDirection * this.mMoveSpeed);
            if (xform.getYPos() > this.maxH || xform.getYPos() < this.minH)
                this.mDirection *= -1;
        }
        else {
            xform.setXPos(xform.getXPos() + this.mDirection * this.mMoveSpeed);
            if (xform.getXPos() > this.maxH || xform.getXPos() < this.minH)
                this.mDirection *= -1;
        }
    }
    GameObject.prototype.update.call(this);
}

Platform.prototype.getSpeed = function () {
    return this.mMoveSpeed;
}

Platform.prototype.toggleIsMove = function () {
    this.mIsMove = !this.mIsMove;
}