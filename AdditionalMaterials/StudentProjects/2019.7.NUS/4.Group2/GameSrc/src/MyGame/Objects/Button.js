//The Button which can control the platforms

function Button(spriteTexture,x,y,angle, id=0) {
    this.mW = 10;
    this.mH = 6;
    
    this.mButton = new SpriteRenderable(spriteTexture);
    this.mButton.setColor([1,1,1,0]);
    this.mButton.getXform().setPosition(x,y);
    this.mButton.getXform().setSize(this.mW,this.mH);
    this.mButton.setElementPixelPositions(0,63,0,31);
    this.mButton.getXform().setRotationInDegree(angle);
    GameObject.call(this,this.mButton);
    this.mSwitch = false;
    this.mPID = id;

    var r = new RigidRectangle(this.mButton.getXform(),this.mW,this.mH);
    r.setMass(0);
    this.setRigidBody(r);
    this.getRigidBody().mXform.setRotationInDegree(angle);
    //this.toggleDrawRigidShape();
}
gEngine.Core.inheritPrototype(Button,GameObject);

Button.prototype.update = function () {
    if (this.mSwitch)
    {
        this.mButton.setElementPixelPositions(0,63,32,63);
    }
    else
    {
        this.mButton.setElementPixelPositions(0,63,0,31);
    }
    GameObject.prototype.update.call(this);
}

Button.prototype.toggleSwitch = function () {
    this.mSwitch = !this.mSwitch;
}

Button.prototype.controlPlatform= function (PlatformSet) {
    PlatformSet.getObjectAt(this.mPID).toggleIsMove();
}
