function Boss(atX, atY, velocity, movementRange, type, texture0, texture1, texture2,
        texture3, texture4, texture5, texture6, normal, lightSet, hero) {
    this.kMinionTex = "assets/minion_sprite.png";
    this.kDelta = 0.1;
    this.kWidth = 8;
    this.kHeight = 8;
    this.kSpeed = 0.02;
    this.kSpawnerTotal = 800;
    
    this.mSpawnerTicks = 0;
    this.mTicks = 0;
    this.mClockwise = 1;
    this.mLightSet = lightSet;
    this.mHeroRef = hero;
    this.mAllMinions = [];
    
    // control of movement
    this.mInitialPosition = vec2.fromValues(atX, atY);
    this.mMovementRange = movementRange;

    if (normal === null) {
        this.mDyeBoss_Bottom = new LightRenderable(texture0);
        this.mDyeBoss_Top = new LightRenderable(texture1);
        this.mDyeBoss_CenterSpawn = new LightRenderable(texture2);
        this.mDyeBoss_Eyeballs = new LightRenderable(texture3);
        this.mDyeBoss_Eyeballs02 = new LightRenderable(texture3);
        this.mDyeBoss_WeakPoint_Blue = new LightRenderable(texture4);
        this.mDyeBoss_WeakPoint_Green = new LightRenderable(texture5);
        this.mDyeBoss_WeakPoint_Red = new LightRenderable(texture6);
    } else {
        this.mDyeBoss_Bottom = new IllumRenderable(texture0, normal);
        this.mDyeBoss_Top = new IllumRenderable(texture1, normal);
        this.mDyeBoss_CenterSpawn = new IllumRenderable(texture2, normal);
        this.mDyeBoss_Eyeballs = new IllumRenderable(texture3, normal);
        this.mDyeBoss_Eyeballs02 = new IllumRenderable(texture3, normal);
        this.mDyeBoss_WeakPoint_Blue = new IllumRenderable(texture4, normal);
        this.mDyeBoss_WeakPoint_Green = new IllumRenderable(texture5, normal);
        this.mDyeBoss_WeakPoint_Red = new IllumRenderable(texture6, normal);
    }

    this.light = this._createPointLight(atX, atY);
    lightSet.addToSet(this.light);

    var i;
    for (i = 2; i < lightSet.numLights(); i++) {
        this.mDyeBoss_Bottom.addLight(lightSet.getLightAt(i));
        this.mDyeBoss_Top.addLight(lightSet.getLightAt(i));
        this.mDyeBoss_CenterSpawn.addLight(lightSet.getLightAt(i));
        this.mDyeBoss_Eyeballs.addLight(lightSet.getLightAt(i));
        this.mDyeBoss_Eyeballs02.addLight(lightSet.getLightAt(i));
        this.mDyeBoss_WeakPoint_Blue.addLight(lightSet.getLightAt(i));
        this.mDyeBoss_WeakPoint_Green.addLight(lightSet.getLightAt(i));
        this.mDyeBoss_WeakPoint_Red.addLight(lightSet.getLightAt(i));
    }
    
    this.buildSprite(atX, atY);
    GameObject.call(this, this.mDyeBoss_Bottom);

    // velocity and movementRange will come later
    var size = vec2.length(velocity);
    if (size > 0.001) {
        this.setCurrentFrontDir(velocity);
        this.setSpeed(this.kSpeed);
    }

    var rigidShape = new RigidRectangle(this.getXform(), this.kWidth, this.kHeight);
    rigidShape.setMass(0);
    rigidShape.setDrawBounds(true);
    rigidShape.setColor([0, 0, 1, 1]);
    //rigidShape.setAcceleration([0, 0]);
    this.setPhysicsComponent(rigidShape);
}
gEngine.Core.inheritPrototype(Boss, GameObject);

Boss.prototype.update = function () {
    GameObject.prototype.update.call(this);
    var i;
    for (i = 0; i < this.mAllMinions.length; i++) {
        this.mAllMinions[i].update(this.mHeroRef);
    }
    
    this.mTicks++
    if(this.mTicks > 20){
        this.mClockwise *= -1;
        this.mTicks = 0;
    }
    
    this.mSpawnerTicks++;
    if(this.mSpawnerTicks > this.kSpawnerTotal && this.mAllMinions.length < 6){
        this._spawnChaser();
        this.mSpawnerTicks = 0;
    }
    
    var s = vec2.fromValues(0, 0);
    vec2.subtract(s, this.getXform().getPosition(), this.mInitialPosition);
    var len = vec2.length(s);
    
    if (len > this.mMovementRange) {
        var f = this.getCurrentFrontDir();
        f[0] = -f[0];
        f[1] = -f[1];
        
    }
    this.light.set2DPosition(this.getXform().getPosition());
    this.buildSprite(this.getXform().getPosition()[0], this.getXform().getPosition()[1] - this.mClockwise * 0.01);
    
    this.mDyeBoss_WeakPoint_Blue.getXform().incRotationByDegree(1);
    this.mDyeBoss_WeakPoint_Red.getXform().incRotationByDegree(1);
    this.mDyeBoss_WeakPoint_Green.getXform().incRotationByDegree(1);
    
    this.mDyeBoss_CenterSpawn.getXform().incRotationByDegree(5);
    
//    this.mDyeBoss_Eyeballs.getXform().incRotationByDegree(10 * Math.random()* this.mClockwise);
//    this.mDyeBoss_Eyeballs02.getXform().incRotationByDegree(10 * Math.random() * this.mClockwise);
};

Boss.prototype.buildSprite = function (atX, atY) {
    this.mDyeBoss_Bottom.getXform().setPosition(atX, atY);
    this.mDyeBoss_Bottom.getXform().setSize(this.kWidth, this.kHeight);
    this.mDyeBoss_Bottom.getXform().setZPos(2);
    
    this.mDyeBoss_Top.getXform().setPosition(atX, atY);
    this.mDyeBoss_Top.getXform().setSize(this.kWidth, this.kHeight);
    this.mDyeBoss_Top.getXform().setZPos(2);
    
    var centerScaler = 1.75;
    this.mDyeBoss_CenterSpawn.getXform().setPosition(atX+0.525, atY);
    this.mDyeBoss_CenterSpawn.getXform().setSize(this.kWidth/centerScaler, this.kHeight/centerScaler);
    this.mDyeBoss_CenterSpawn.getXform().setZPos(2);
    
    var eyeScaler = 4;
    this.mDyeBoss_Eyeballs.getXform().setPosition(atX - 2.75, atY + 1.25);
    this.mDyeBoss_Eyeballs.getXform().setSize(this.kWidth/eyeScaler, this.kHeight/eyeScaler);
    this.mDyeBoss_Eyeballs.getXform().setZPos(2);
    
    this.mDyeBoss_Eyeballs02.getXform().setPosition(atX - 2.75, atY - 1.25);
    this.mDyeBoss_Eyeballs02.getXform().setSize(this.kWidth/eyeScaler, this.kHeight/eyeScaler);
    this.mDyeBoss_Eyeballs02.getXform().setZPos(2);
    
    var weakspotScaler = 3;
    this.mDyeBoss_WeakPoint_Blue.getXform().setPosition(atX + 0.25, atY + 3);
    this.mDyeBoss_WeakPoint_Blue.getXform().setSize(this.kWidth/weakspotScaler, this.kHeight/weakspotScaler);
    this.mDyeBoss_WeakPoint_Blue.getXform().setZPos(2);
    
    this.mDyeBoss_WeakPoint_Green.getXform().setPosition(atX + 3.5, atY);
    this.mDyeBoss_WeakPoint_Green.getXform().setSize(this.kWidth/weakspotScaler, this.kHeight/weakspotScaler);
    this.mDyeBoss_WeakPoint_Green.getXform().setZPos(2);
    
    this.mDyeBoss_WeakPoint_Red.getXform().setPosition(atX + 0.25, atY - 3);
    this.mDyeBoss_WeakPoint_Red.getXform().setSize(this.kWidth/weakspotScaler, this.kHeight/weakspotScaler);
    this.mDyeBoss_WeakPoint_Red.getXform().setZPos(2);
    

};

Boss.prototype._createPointLight = function (atX, atY) {
    var lgt = new Light();
    lgt.setLightType(0);
    lgt.setColor([1, 1, 1, 1]);
    lgt.setXPos(atX);
    lgt.setYPos(atY);
    lgt.setZPos(1);
    lgt.setNear(4);
    lgt.setFar(6);
    lgt.setIntensity(0.5);
    lgt.setDropOff(20);
    lgt.setLightCastShadowTo(true);
    return lgt;
};

Boss.prototype.draw = function (aCamera) {
    GameObject.prototype.draw.call(this, aCamera);
    //this.mDyeBoss_Bottom.draw(aCamera);     
    this.mDyeBoss_WeakPoint_Blue.draw(aCamera);
    this.mDyeBoss_WeakPoint_Green.draw(aCamera);
    this.mDyeBoss_WeakPoint_Red.draw(aCamera);

    this.mDyeBoss_Eyeballs.draw(aCamera);
    this.mDyeBoss_Eyeballs02.draw(aCamera);    
        
    this.mDyeBoss_CenterSpawn.draw(aCamera);
    this.mDyeBoss_Top.draw(aCamera);
    
    var i;
    for (i = 0; i < this.mAllMinions.length; i++) {
        this.mAllMinions[i].draw(aCamera);
    }
};

Boss.prototype._spawnChaser = function () {
    var x = this.getXform().getXPos();
    var y = this.getXform().getYPos();
    var m = new ChaserMinion(x, y, [0, 0], 0, 2, this.kMinionTex, null, this.mLightSet, 1, 1.6);
    this.mAllMinions.push(m);
};



