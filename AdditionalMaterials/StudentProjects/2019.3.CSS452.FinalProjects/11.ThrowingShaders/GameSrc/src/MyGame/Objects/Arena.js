/* File: Arena.js 
 *
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";
function Arena(x,y,w,h,res,frct,s1,s2, art, p){
    this.mShapes = new GameObjectSet();
    this.mPset = new ParticleGameObjectSet();
    this.createBounds(x,y,w,h,res,frct,art);
    this.firstObject = this.mShapes.size();
    this.currentObject = this.firstObject;
    this.createObj(x+15,y+20,s1,s2);
    this.rep = p;
    this.pos = [x,y];
}

Arena.prototype.draw = function(aCamera){
    this.mShapes.draw(aCamera);
    if(this.rep===true){
       this.mPset.draw(aCamera); 
    }
};

Arena.prototype.update = function(){
    this.mShapes.update();
    if(this.rep===true){
        this.reportVelocity();
        this.mPset.update();
        this.particleCollision();
    }
    gEngine.Physics.processCollision(this.mShapes,[]);
};

Arena.prototype.createObj = function(x,y,s1,s2){
    var tmp=s1;
    for(var i=0; i<2; i++){
        if(tmp===0){
            this.createBouncy(x,y,2);
        }
        else if(tmp===1){
            this.createBall(x,y,4);
        }
        else if(tmp===2){
            this.createRock(x,y,5);
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

Arena.prototype.createRock = function(x,y,size){
    var m = new Minion("assets/RigidShape/Rock.png", x, y, 0, size);
    this.mShapes.addToSet(m);
    m.getRigidBody().setMass(20);
    m.getRigidBody().setRestitution(.4);
    m.toggleDrawRenderable();
    m.toggleDrawRigidShape();
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

Arena.prototype.getCurrentState = function() {
    var num2 = this.mShapes.getObjectAt(0).getRigidBody().getRestitution();
    var num3 = this.mShapes.getObjectAt(0).getRigidBody().getFriction();
    return "Arena Physics Values: Friction=" + num3.toFixed(2) +
           " Restitution=" + num2.toFixed(2);
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