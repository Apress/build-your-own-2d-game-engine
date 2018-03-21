/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// Create a water balloon object at coordinate posX, posY
// Water balloon is given a rigidBody and is given a starting angle and
// velocity. It then follows that angle until it collides with another object
// and explodes and produces damage within a set radius
var kBalloonWidth = 4;
var kBalloonHeight = 4;

function WaterBalloon(sprite, posX, posY, left) {
    
    //Create a spriteRenderable to contain sprite
    this.mRen = new SpriteRenderable(sprite);
    this.mRen.setColor([1, 1, 1, 0]);
    this.mRen.getXform().setPosition(posX, posY);
    var width = kBalloonWidth;
    var height = kBalloonHeight;
    this.mRen.getXform().setSize(width, height);
    this.mRen.setElementPixelPositions(0, 64, 0, 64);
    
    GameObject.call(this, this.mRen);
    
    //Throw at a 45 degree angle in the direction you are currently facing
    if (left) {
        this.rotateObjPointTo([posX + 1, posY + 3], 100);
    }
    else {
        this.rotateObjPointTo([posX - 1, posY + 3], 100);
    }
    
    //Create rigidBody for WaterBalloon
    var r;
    r = new RigidCircle(this.getXform(), 0.35*Math.sqrt(
            kBalloonWidth*kBalloonWidth + 
            kBalloonHeight*kBalloonHeight)); 
    
    //Set up velocity of balloon
    if(left) {
        r.setVelocity(-30,40);
    }
    else {
        r.setVelocity(30,40);
    }
    
    r.setAngularVelocityDelta(2);
    this.addRigidBody(r);
    
    this.mBoundBox = new BoundingBox(
        vec2.fromValues(posX, posY),
        kBalloonWidth/2,
        kBalloonHeight/2
    );  
    
    //Used to handle arc of balloon
    this.physicsTimer = Date.now();
    
    this.toggleDrawRigidShape();
};

gEngine.Core.inheritPrototype(WaterBalloon, GameObject);

//Used to determine direction to through. For now just throw at 45 degree angle
//from hobbes object
WaterBalloon.prototype.rotateObjPointTo = function (p, rate) {
    // Step A: determine if reach the destination position p
    var dir = [];
    vec2.sub(dir, p, this.getXform().getPosition());
    var len = vec2.length(dir);
    if (len < Number.MIN_VALUE) {
        return; // we are there.
    }
    vec2.scale(dir, dir, 1 / len);

    // Step B: compute the angle to rotate
    var fdir = this.getCurrentFrontDir();
    var cosTheta = vec2.dot(dir, fdir);

    if (cosTheta > 0.999999) { // almost exactly the same direction
        return;
    }

    // Step C: clamp the cosTheda to -1 to 1 
    // in a perfect world, this would never happen! BUT ...
    if (cosTheta > 1) {
        cosTheta = 1;
    } else {
        if (cosTheta < -1) {
            cosTheta = -1;
        }
    }

    // Step D: compute whether to rotate clockwise, or counterclockwise
    var dir3d = vec3.fromValues(dir[0], dir[1], 0);
    var f3d = vec3.fromValues(fdir[0], fdir[1], 0);
    var r3d = [];
    vec3.cross(r3d, f3d, dir3d);

    var rad = Math.acos(cosTheta);  // radian to roate
    if (r3d[2] < 0) {
        rad = -rad;
    }

    // Step E: rotate the facing direction with the angle and rate
    rad *= rate;  // actual angle need to rotate from Obj's front
    vec2.rotate(this.getCurrentFrontDir(), this.getCurrentFrontDir(), rad);
    this.getXform().incRotationByRad(rad);
};

WaterBalloon.prototype.update = function () {    
  GameObject.prototype.update.call(this);  
  var xform = this.getXform();
  var checkTimer = Date.now();
  
  //Cause Water Balloon to decelerate in the y direction over time
  //Smoothes the arc of the throw.
  xform.incYPosBy(((checkTimer - this.physicsTimer)/3000) * -1)
  
};

WaterBalloon.prototype.draw = function (aCamera) {
    this.mRen.draw(aCamera);
};

WaterBalloon.prototype.processHit = function (particleSet, minionSet) {
    var i;
    for(i = 0; i < 500; i++) {
        var newParticle = new ParticleCreator(this, 1, [1,1,1,1]);
        particleSet.addToSet(newParticle);
    }
    var posx = this.getXform().getXPos();
    var posy = this.getXform().getYPos();
    this.mBoundBox.setBounds(
            vec2.fromValues(posx, posy),
            kBalloonWidth * 20, 
            kBalloonHeight * 20);
    console.log(this.mBoundBox.mHeight);
    for (var j = 0; j < minionSet.size(); ++j) {
            var minion = minionSet.getObjectAt(j);
            if (this.mBoundBox.intersectsBound(minion.getBBox())) {
                if(minion instanceof FloaterBoss)
                {
                    // remove some HP
                    minion.registerDamage(30);
                    // if dead, then remove it from the set
                    if(minion.isDead()) {
                        minionSet.removeFromSet(minion);
                    }
                }
                else
                {
                    minionSet.removeFromSet(minion);
                }
            }
        }
    
};

