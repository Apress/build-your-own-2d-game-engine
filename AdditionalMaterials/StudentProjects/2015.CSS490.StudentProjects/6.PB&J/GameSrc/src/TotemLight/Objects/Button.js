
function Button(cx, cy, texture, type, lightSet) {
    this.kWidth = 2;
    this.kHeight = 4;
    this.mIsUnlocked = false;
    this.mButton = new LightRenderable(texture);

//    var i;
//    for (i = 2; i < lightSet.numLights(); i++) {
//        this.mButton.addLight(lightSet.getLightAt(i));
//    }

    this.buildSprite(cx, cy);
    GameObject.call(this, this.mButton);
    
    this.mSpotlight = this._createSpotLight(cx, cy);
    //this.mSpotlight = lightSet.getLightAt(3);
    lightSet.addToSet(this.mSpotlight);
    
    var spotspot = this._createSpotLight(cx, cy);
    spotspot.setColor([1,1,1,1]);
    spotspot.setIntensity(0.25);
    this.mButton.addLight(spotspot);
    
    
//    this.mSpotlight.setXPos(cx);
//    this.mSpotlight.setYPos(cy + 3);
//    this.mSpotlight.setZPos(0.7);
    
//    this.mButton.addLight(this.mSpotlight);
//    this.mSpotlight.setLightTo(true);


    var rigidShape = new RigidRectangle(this.getXform(), this.kWidth, this.kHeight);
    rigidShape.setMass(0);  // ensures no movements!
    rigidShape.setDrawBounds(true);
    rigidShape.setColor([1, 1, 1, 1]);
    this.setPhysicsComponent(rigidShape);
    
    this.mMaxPulse = 8;
    this.mMinPulse = 5;
    this.mSwitchPulse = false;
    this.mStopPulse = false;
}
gEngine.Core.inheritPrototype(Button, GameObject);


Button.prototype.buildSprite = function (atX, atY) {
    this.mButton.getXform().setPosition(atX, atY);
    this.mButton.getXform().setSize(this.kWidth, this.kHeight);
    this.mButton.getXform().setZPos(2);
    //this.mButton.setElementPixelPositions(0, 180, 0, 155);
};

Button.prototype.pressButton = function () {
    //this.mButton.setElementPixelPositions(180, 360, 0, 155);
    this.mIsUnlocked = true;
};

Button.prototype.getButtonState = function () {
    return this.mIsUnlocked;
};

Button.prototype.setButtonState = function(s) {
    this.mIsUnlocked = s;
};

Button.prototype.update = function()
{
    if(this.mIsUnlocked && this.mStopPulse === false)
    {
        this.mSpotlight.setColor([0,1,0,1]);
        var lgtFar = this.mSpotlight.getFar();
        
        if(lgtFar < this.mMaxPulse && this.mSwitchPulse === false)
        {
            this.mSpotlight.setFar(lgtFar + 0.025);
            
            if(this.mSpotlight.getFar() > this.mMaxPulse)
            {
                this.mSwitchPulse = true;
            }
        }
        
        if(lgtFar > this.mMinPulse && this.mSwitchPulse === true)
        {
            this.mSpotlight.setFar(lgtFar - 0.025);
            
            if(this.mSpotlight.getFar() < this.mMinPulse)
            {
                this.mSwitchPulse = false;
                this.mStopPulse = true;
            }
 
        }    
    }
};

Button.prototype._createSpotLight = function (atX, atY) {
    var lgt = new Light();
    lgt.setLightType(0);
    lgt.setColor([0, 0, 1, 1]);
    lgt.setXPos(atX);
    lgt.setYPos(atY);
    lgt.setZPos(3);
    lgt.setDirection([0,0,3]);
    lgt.setNear(2);
    lgt.setFar(5);
    lgt.setInner(2);
    lgt.setOuter(5);
    lgt.setIntensity(0.75);
    lgt.setDropOff(2);
    lgt.setLightCastShadowTo(true);
    return lgt;
};