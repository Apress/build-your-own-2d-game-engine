/* File: Arena.js 
 *
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";
function Arena(x,y,w,h,res,frct,s1,s2, art, p, speed){
    //Lights
    this.mBg = null;
    this.mGlobalLightSet = null;
    this._initializeLights();
        
    this.mShapes = new GameObjectSet();
    this.mPset = new ParticleGameObjectSet();
    this.mSpikeSet = new GameObjectSet();
    this.createBounds(x,y,w,h,res,frct,art);
    this.firstObject = this.mShapes.size();
    this.currentObject = this.firstObject;
    //this.createObj(x+10,y+15,s1,s2);
    this.rep = p;
    this.pos = [x,y];
    this.heroposition = 4;
    this.mTimeofLaunch = Date.now()-1500;
    this.startPosition = vec2.fromValues(x+10, y+15);
    this.speed = speed;
    this.mArenaStatus = new FontRenderable("");
    this.mArenaStatus.setColor([0, 0, 0, 1]);
    this.mArenaStatus.getXform().setPosition(5, 42);
    this.mArenaStatus.setTextHeight(2.5);
    this.goalAchieved = false;
    this.shakeCamera = false;
    
    this.starttime = Date.now();
    this.deaths = 0;
    
    var t = new TextureRenderable("assets/RigidShape/launcher.png");
    t.setColor([1, 1, 1, 0]);
    t.getXform().setPosition(10, 10);
    t.getXform().setSize(15, 15);
    this.mLauncherobject = new GameObject(t);
    this.mRocketSet = new GameObjectSet();
    this.mExplosionSet = new GameObjectSet();
}

Arena.prototype.draw = function(aCamera){
    this.mBg.draw(aCamera);
    this.mShapes.draw(aCamera);
    if(this.rep===true){
       this.mPset.draw(aCamera); 
    }
    this.mLauncherobject.draw(aCamera);
    this.mRocketSet.draw(aCamera);
    this.mExplosionSet.draw(aCamera);
    this.mSpikeSet.draw(aCamera);
    this.mFlag.draw(aCamera);
    //this.mArenaStatus.draw(aCamera);
};

Arena.prototype.update = function(){
    this.mArenaStatus.setText(this.getCurrentState());
    this.mShapes.update();
    if(this.rep===true){
        this.reportVelocity();
        this.mPset.update();
        this.particleCollision();
    }
    
    
    this.mLauncherobject.getXform().setPosition(this.mShapes.getObjectAt(this.heroposition).getXform().getXPos(), 
    this.mShapes.getObjectAt(this.heroposition).getXform().getYPos());
    
    var mouselocation = vec2.fromValues(gEngine.Input.getMousePosX()/4, gEngine.Input.getMousePosY()/4 );
    this.mLauncherobject.rotateObjPointTo(mouselocation, 1);
    gEngine.Physics.processCollision(this.mShapes,[]);
    var wcTouchPos = [];
    var i,j;
    var toTarget = [];
    for(i=0; i < this.mRocketSet.size(); i++){
        for(j=0; j < this.mShapes.size(); j++){
            if(this.mShapes.getObjectAt(j).getBBox().intersectsBound(this.mRocketSet.getObjectAt(i).getBBox()) ||
               this.mShapes.getObjectAt(j).getinverseBBox().intersectsBound(this.mRocketSet.getObjectAt(i).getBBox())){
                if(j!==this.heroposition){
                    if(this.mRocketSet.getObjectAt(i).pixelTouches(this.mShapes.getObjectAt(j),wcTouchPos)){
                        vec2.subtract(toTarget, this.mLauncherobject.getXform().getPosition(), wcTouchPos);
                        var dist = vec2.length(toTarget);
                        if(dist <= 13){
                            var obj = this.mShapes.getObjectAt(this.heroposition);
                            var rigidShape = obj.getRigidBody();
                            var x = toTarget[0]*5;
                            var y = toTarget[1]*5;
                            rigidShape.setVelocity(x, y);
                            this.shakeCamera = true;
                        }
                        this.mRocketSet.removeFromSet(this.mRocketSet.getObjectAt(i));
                        var aExplosion = new Explosion(wcTouchPos[0], wcTouchPos[1]);
                        var i;
                        for (i = 0; i < 2; i++) {
                            aExplosion.getRenderable().addLight(this.mGlobalLightSet.getLightAt(i));
                        }
                        this.mExplosionSet.addToSet(aExplosion);
                    }
                }
            }
        }
    }
    for(i=0; i < this.mExplosionSet.size(); i++){
        if(this.mExplosionSet.getObjectAt(i).isDestroyed()){
            this.mExplosionSet.removeFromSet(this.mExplosionSet.getObjectAt(i));
        }
    }
    
    for(i=0; i < this.mSpikeSet.size(); i++){
        if(this.mShapes.getObjectAt(this.heroposition).getBBox().intersectsBound(this.mSpikeSet.getObjectAt(i).getBBox())){
            this.spikeCollision();
        }
    }
    
    if(this.mShapes.getObjectAt(this.heroposition).getBBox().intersectsBound(this.mFlag.getBBox())){
            this.flagCollision();
        }
    
    
    if(gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Left)){
        if(Date.now() >= this.mTimeofLaunch + 500 &&  this.mRocketSet.size()<2){
            var aRocket = new Rocket(this.mLauncherobject.getXform().getXPos(), this.mLauncherobject.getXform().getYPos(), this.speed);
            var i;
            for (i = 0; i < 2; i++) {
                aRocket.getRenderable().addLight(this.mGlobalLightSet.getLightAt(i));
            }
            this.mRocketSet.addToSet(aRocket);
            this.mTimeofLaunch = Date.now();
        }
    }
    
    this.mRocketSet.update();
    this.mExplosionSet.update();
    
    //this.mArenaStatus.setText("" + this.mShapes.getObjectAt(5).getXform().getXPos() + ","+ this.mShapes.getObjectAt(5).getXform().getYPos() + ","+ gEngine.Input.getMousePosX() + ","+gEngine.Input.getMousePosY());
};

Arena.prototype.fireRocket = function() {
    if(Date.now() >= this.mTimeofLaunch + 500 &&  this.mRocketSet.size()<2){
            var aRocket = new Rocket(this.mLauncherobject.getXform().getXPos(), this.mLauncherobject.getXform().getYPos(), this.speed);
            var i;
            for (i = 0; i < 2; i++) {
                aRocket.getRenderable().addLight(this.mGlobalLightSet.getLightAt(i));
            }
            this.mRocketSet.addToSet(aRocket);
            this.mTimeofLaunch = Date.now();
        }
};

Arena.prototype.timeCompletion = function() {
    return Date.now() -  this.starttime;
};

Arena.prototype.totalDeaths = function() {
    return this.deaths;
};

Arena.prototype.getCurrentState = function() {
    var dividedx = gEngine.Input.getMousePosX()/4;
    var dividedy = gEngine.Input.getMousePosY()/4;
    return "divided by values: X=" + dividedx.toPrecision(3) +
           " Y=" + dividedy.toPrecision(3) + " , " + "X=" + this.mLauncherobject.getXform().getXPos().toPrecision(2)+
           " Y=" + this.mLauncherobject.getXform().getYPos().toPrecision(2);
};

Arena.prototype.spikeCollision = function() {
    this.mShapes.getObjectAt(this.heroposition).getRigidBody().setVelocity(0,0);
    this.mShapes.getObjectAt(this.heroposition).getXform().setPosition(this.startPosition[0], this.startPosition[1]);
    var i;
    for(i=0; i <= this.mRocketSet.size(); i++){
        this.mRocketSet.removeFromSet(this.mRocketSet.getObjectAt(0));
    }
    this.starttime = Date.now();
    this.deaths = this.deaths+ 1;
};

Arena.prototype.moveHero = function(x,y) {
    this.mShapes.getObjectAt(this.heroposition).getXform().setPosition(x, y);
    
};

Arena.prototype.setRespawn = function(x,y) {
    this.startPosition = vec2.fromValues(x, y);
    
};

Arena.prototype.flagCollision = function() {
    this.goalAchieved = true;
};

Arena.prototype.isGoalReached = function() {
    return this.goalAchieved;
};

Arena.prototype.isCamShake = function() {
    return this.shakeCamera;
};

Arena.prototype.shakeComplete = function() {
    this.shakeCamera = false;
};

Arena.prototype.createObj = function(x,y,s1,s2){
    var tmp=s1;
    for(var i=0; i<2; i++){
        if(tmp===0){
            
        }
        else if(tmp===1){
            this.createBall(x,y,4);
        }
        else if(tmp===2){
            this.createPerson(x,y,5);
        }
        else if(tmp===3){
            this.createWood(x,y,4);
        }
        else if(tmp===4){
            this.createIce(x,y,5);
        }
        else{
            this.createBowlingBall(x,y,3);
        }
        tmp=s2;
        x+=10;
    }
};

Arena.prototype.createBounds = function(x,y,w,h,res,frct,art) {
    
    this.platformAt((x+3)+(w/2),y+3,w+3,0,res,frct,art);
    this.platformAt((x+3)+(w/2),y+3+h,w+3,0,res,frct,art);
    this.platformAt(x+3,(y+3)+(h/2),h+3,90,res,frct,art);
    this.platformAt(x+3+w,(y+3)+(h/2),h+3,90,res,frct,art);
    
    //custom platforms
//    this.platformAt(x+3+.5*w+32,(.5*y+3)+(h/2.5),h/2.5,0,res,frct,art);
//    this.platformAt(x+19,(.5*y+3)+(h/1.5),h/2.5,0,res,frct,art);
    
    //spikes
    
//    this.flagAt(140,68);
//    this.spikeAt(40, 20);
};

Arena.prototype.incRestitution = function(inc){
    var res = this.mShapes.getObjectAt(0).getRigidBody().getRestitution();
    for(var i=0; i<4; i++){
        if(res+inc>1){
            this.mShapes.getObjectAt(i).getRigidBody().setRestitution(1);
        }
        else if(res+inc<0){
            this.mShapes.getObjectAt(i).getRigidBody().setRestitution(0);
        }
        else{
            this.mShapes.getObjectAt(i).getRigidBody().setRestitution(res+inc);
        }
    }
};

Arena.prototype.incFriction = function(inc){
    var frct = this.mShapes.getObjectAt(0).getRigidBody().getFriction();
    for(var i=0; i<4; i++){
        if(frct+inc<0){
            this.mShapes.getObjectAt(i).getRigidBody().setFriction(0);
        }
        else{
            this.mShapes.getObjectAt(i).getRigidBody().setFriction(frct+inc);
        }
    }
};

Arena.prototype.radomizeVelocity = function()
{
    var kSpeed = 40;
    var i = 0;
    for (i = this.firstObject; i<this.mShapes.size(); i++) {
        var obj = this.mShapes.getObjectAt(i);
        var rigidShape = obj.getRigidBody();
        var x = (Math.random() - 0.5) * kSpeed;
        var y = .6 * kSpeed * 0.5 + 2;
        rigidShape.setVelocity(x, y);
    }
};
Arena.prototype.lightOn = function(){
    for(var i=0; i<4; i++){
        this.mShapes.getObjectAt(i).getRenderable().setColor([1,1,1,.6]);
    }
};

Arena.prototype.lightOff = function(){
    for(var i=0; i<4; i++){
        this.mShapes.getObjectAt(i).getRenderable().setColor([1,1,1,0]);
    }
};

Arena.prototype.cycleBackward = function() {
    this.currentObject -= 1;
    if (this.currentObject < this.firstObject)
        this.currentObject = this.mShapes.size() - 1;
};            
Arena.prototype.cycleFoward = function() {
    this.currentObject += 1;
    if (this.currentObject >= this.mShapes.size())
        this.currentObject = this.firstObject;
};
Arena.prototype.getObject = function() {
    return this.mShapes.getObjectAt(this.currentObject);
};

Arena.prototype.wallAt = function (x, y, h, res, frct, art) {
    var w = 3;
    var p = new TextureRenderable(art);
    var xf = p.getXform();
    xf.setSize(w, h);
    xf.setPosition(x, y);
    var g = new GameObject(p);
    var r = new RigidRectangle(xf, w, h);
    g.setRigidBody(r);
    g.toggleDrawRigidShape();
    
    r.setMass(0);
    r.setRestitution(res);
    r.setFriction(frct);
    xf.setSize(w, h);
    xf.setPosition(x, y);
    this.mShapes.addToSet(g);
};

Arena.prototype.platformAt = function (x, y, w, rot, res, frct, art) {
    var h = 3;
    var p = new TextureRenderable(art);
    var xf = p.getXform();
    xf.setSize(w, h);
    xf.setPosition(x, y);
    xf.setRotationInDegree(rot);
    var g = new GameObject(p);
    var r = new RigidRectangle(xf, w, h);
    g.setRigidBody(r);
    g.toggleDrawRigidShape();
    
    r.setMass(0);
    r.setRestitution(res);
    r.setFriction(frct);
    xf.setSize(w, h);
    xf.setPosition(x, y);
    xf.setRotationInDegree(rot);
    this.mShapes.addToSet(g);
};

Arena.prototype.spikeAt = function (x, y,rot) {
    var aSpike = new Spike(x, y,rot);
    this.mSpikeSet.addToSet(aSpike);
};

Arena.prototype.flagAt = function (x, y) {
     this.mFlag = new Flag(x,y);
     this._createALight(Light.eLightType.eSpotLight,
            [x, y, 10],            // Right minion position
            [0, 0, -1],     // direction
            [1, 0.5, 0.5, 1],     // color
            100, 100,                  // near and far distances
            1.5, 2,               // inner outter angles (in radius)
            5,                     // intensity
            1                     // drop off
            );
};
   
 Arena.prototype.createBgLight = function () {
    var bgR = new IllumRenderable("assets/RigidShape/woodbg.jpg", "assets/RigidShape/woodbg_normal.png");
    bgR.setElementPixelPositions(0, 512, 0, 512);
    bgR.getXform().setSize(198, 148);
    bgR.getXform().setPosition(100, 75);
    bgR.getMaterial().setSpecular([1, 0, 0, 1]);
    var i;
    for (i = 0; i < 2; i++) {
        bgR.addLight(this.mGlobalLightSet.getLightAt(i));   // all the lights
    }
    this.mBg = new GameObject(bgR);
};

Arena.prototype.createBouncy = function(x,y,size){
    var m = new Minion("assets/RigidShape/Ball.png", x, y, 1, size);
    this.mShapes.addToSet(m);
    m.getRigidBody().setRestitution(.9);
    m.toggleDrawRenderable();
    m.toggleDrawRigidShape();
};

Arena.prototype.createBall = function(x,y,size){
    var m = new Minion("assets/RigidShape/SoccerBall.png", x, y, 1, size);
    this.mShapes.addToSet(m);
    m.getRigidBody().setRestitution(.7);
    m.getRigidBody().setFriction(.6);
    m.toggleDrawRenderable();
    m.toggleDrawRigidShape();
};

Arena.prototype.createIce = function(x,y,size){
    var m = new Minion("assets/RigidShape/Ice.png", x, y, 0, size);
    this.mShapes.addToSet(m);
    m.getRigidBody().setRestitution(.4);
    m.getRigidBody().setFriction(.01);
    m.toggleDrawRenderable();
    m.toggleDrawRigidShape();
};

Arena.prototype.createPerson = function(x,y,size){
    var mIllumHero = new Minion("assets/RigidShape/person6.png", x + 50, y, 0, size, "assets/RigidShape/person6_normal.png");
    this.mShapes.addToSet(mIllumHero);
    mIllumHero.getRigidBody().setMass(20);
    mIllumHero.getRigidBody().setRestitution(0);
    mIllumHero.getRigidBody().setFriction(1);
    mIllumHero.toggleDrawRenderable();
    mIllumHero.toggleDrawRigidShape();
    var i;
    for (i = 0; i < 2; i++) {
        mIllumHero.getRenderable().addLight(this.mGlobalLightSet.getLightAt(i));
    }
};

Arena.prototype.createWood = function(x,y,size){
    var m = new Minion("assets/RigidShape/WoodBall.png", x, y, 1, size);
    this.mShapes.addToSet(m);
    m.getRigidBody().setMass(5);
    m.getRigidBody().setRestitution(.5);
    m.getRigidBody().setFriction(.5);
    m.toggleDrawRenderable();
    m.toggleDrawRigidShape();
};

Arena.prototype.createBowlingBall= function(x,y,size){
    var m = new Minion("assets/RigidShape/BowlingBall.png", x, y, 1, size);
    this.mShapes.addToSet(m);
    m.getRigidBody().setRestitution(.3);
    m.getRigidBody().setFriction(.2);
    m.getRigidBody().setMass(10);
    m.toggleDrawRenderable();
    m.toggleDrawRigidShape();
};

Arena.prototype.physicsReport = function(){
    var num1 = this.mShapes.getObjectAt(this.currentObject).getRigidBody().getInvMass();
    if(num1!==0){
        num1=1/num1;
    }
    var num2 = this.mShapes.getObjectAt(this.currentObject).getRigidBody().getRestitution();
    var num3 = this.mShapes.getObjectAt(this.currentObject).getRigidBody().getFriction();
   document.getElementById("value11").innerHTML = +num1.toFixed(2);
   document.getElementById("value12").innerHTML = +num2.toFixed(2);
   document.getElementById("value13").innerHTML = +num3.toFixed(2);
};



Arena.prototype.reportVelocity = function(){
    var info = new CollisionInfo();
    //var func = function(x, y) { this.createParticle.call(this, x, y); };
    for(var i=this.firstObject; i<this.mShapes.size(); i++){
        if(this.mShapes.getObjectAt(0).getRigidBody().collisionTest(this.mShapes.getObjectAt(i).getRigidBody(),info)===true){
            if(this.mShapes.getObjectAt(i).getRigidBody().getVelocity()[1]<=-15){
                this.mPset.addEmitterAt([this.mShapes.getObjectAt(i).getRenderable().getXform().getPosition()[0],this.pos[1]+6], 20, this.createParticle);
            }
        }
    }
};

Arena.prototype.getPos = function(){
    return this.pos;
};

Arena.prototype.particleCollision = function(){
    for(var i=0; i<4; i++){
        gEngine.ParticleSystem.processObjSet(this.mShapes.getObjectAt(i),this.mPset);
    }
};

Arena.prototype.createParticle = function(atX, atY) {
    var life = 30 + Math.random() * 200;
    var p = new ParticleGameObject("assets/RigidShape/DirtParticle.png", atX, atY, life);
    p.getRenderable().setColor([.61, .30, .08, 1]);
    
    // size of the particle
    var r = Math.random() * 2.5;
    p.getXform().setSize(r, r);
    
    // final color
    p.setFinalColor([.61, .30, .08, 1]);
    
    // velocity on the particle
    var fx = 30 * Math.random() - 60 * Math.random();
    var fy = 20 * Math.random()+10;
    p.getParticle().setVelocity([fx, fy]);
    
    // size delta
    p.setSizeDelta(0.985);
    
    return p;
};