
/* File: Hero2.js 
 *
 * Creates and initializes the Hero2 (Dye)
 * overrides the update function of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, RigidCircle, RigidRectangle, BoundingBox */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!


SuperCube.eCubeStatus = Object.freeze({
    eGround:1,
    eAirSpacePressed:2,
    eAirSpacePressedDone:3,
    eWall:4
});
SuperCube.eCubeWallStatus = Object.freeze({
    eLeft:1, 
    eRight:2
});

function SuperCube(atX, atY, normalMap) {
    this.kXDelta = 1;
    this.kYDelta = 2.0;
    this.kSuperCube = "assets/cube.png" ;
    
    this.wallside = SuperCube.eCubeWallStatus.eLeft;
    this.mPreState = SuperCube.eCubeStatus.eGround;
    this.mState = SuperCube.eCubeStatus.eAirSpacePressedDone;
    
    this.counter = 0;
    
    this.maxYSpeed = 0;
    this.maxXSpeed = 15;
    this.maxYSpeedIntheGround = 30;
    this.maxYSpeedIntheWall = 35;
    this.accelerate = 1;
    
    this.mSuperCube = null;
    
    if (normalMap != null) {
        this.mSuperCube = new IllumRenderable(this.kSuperCube, normalMap);
    } else {
        this.mSuperCube = new SpriteRenderable(this.kSuperCube);
    }
    
    
    
    this.mSuperCube.setColor([0, 0, 0, 0]);
    this.mSuperCube.getXform().setPosition(atX, atY);
    this.mSuperCube.getXform().setSize(2.3, 2);
    
    
    this.mSuperCube.setElementPixelPositions(0, 64, 0, 64);

//    this.mSuperCube.setElementPixelPositions(0, 120, 0, 180);
    this.mPreCol = BoundingBox.eboundCollideStatus.eOutside;
    
    GameObject.call(this, this.mSuperCube);
    var r = new RigidRectangle(this.getXform(),  2.299, 1.99);
    r.setMass(0.7);  // less dense than Minions
    r.setRestitution(0.3);
    r.setColor([0, 1, 0, 1]);
    r.setDrawBounds(false);
    r.setAcceleration([0, -50]);
    this.setPhysicsComponent(r);
    
}

gEngine.Core.inheritPrototype(SuperCube, GameObject);

SuperCube.prototype.getCube = function(){
    return this.mSuperCube;
}

SuperCube.prototype.update = function (platform) {
    
    // must call super class update
    GameObject.prototype.update.call(this);
    
    // control by WASD
    var bottom = BoundingBox.eboundCollideStatus.eCollideBottom | BoundingBox.eboundCollideStatus.eCollideLeft | BoundingBox.eboundCollideStatus.eCollideRight;
    var left = BoundingBox.eboundCollideStatus.eCollideBottom | BoundingBox.eboundCollideStatus.eCollideLeft | BoundingBox.eboundCollideStatus.eCollideTop;
    var right = BoundingBox.eboundCollideStatus.eCollideBottom | BoundingBox.eboundCollideStatus.eCollideRight | BoundingBox.eboundCollideStatus.eCollideTop;
    var corner = BoundingBox.eboundCollideStatus.eCollideLeft | BoundingBox.eboundCollideStatus.eCollideBottom | BoundingBox.eboundCollideStatus.eCollideRight | BoundingBox.eboundCollideStatus.eCollideTop;
        
    var rightbottom = BoundingBox.eboundCollideStatus.eCollideBottom | BoundingBox.eboundCollideStatus.eCollideRight;
    var leftbottom = BoundingBox.eboundCollideStatus.eCollideBottom | BoundingBox.eboundCollideStatus.eCollideLeft;
    var righttop = BoundingBox.eboundCollideStatus.eCollideTop | BoundingBox.eboundCollideStatus.eCollideRight;
    var lefttop = BoundingBox.eboundCollideStatus.eCollideTop | BoundingBox.eboundCollideStatus.eCollideLeft;
    
    var w = Math.abs(this.mSuperCube.getXform().getWidth());
    
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)){
        this.mSuperCube.setElementUVCoordinate(1, 0, 0, 1);
        
    }else if(gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)){
        this.mSuperCube.setElementUVCoordinate(0, 1, 0, 1);
    }
    
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.Shift)){
          this.maxXSpeed = 40;
          this.kXDelta = 4.0;
    }
    else{
        this.maxXSpeed = 20;
          this.kXDelta = 2.0;
    }
    
    var cubeBox = this.getBBox();
    var status = BoundingBox.eboundCollideStatus.eOutside;
    for(var i = 0; i < platform.size(); i++){
        status |= cubeBox.boundCollideStatus(platform.getObjectAt(i).getBBox());
    }
        
    
    
    if(this.mState === SuperCube.eCubeStatus.eAirSpacePressed){
       
       
       
        if(this.mPreState === SuperCube.eCubeStatus.eGround) this.maxYSpeed = this.maxYSpeedIntheGround;
        else this.maxYSpeed = this.maxYSpeedIntheWall;
        
        
        
        
        
        var v = this.getPhysicsComponent().getVelocity();
        
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)) {
            if(v[0] > 0)
                v[0] -= this.accelerate;
            
            if(Math.abs(v[0]) < this.maxXSpeed)
                v[0] -= this.kXDelta;

        }
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
            if(v[0] < 0)
                v[0] += this.accelerate;
            
            if(Math.abs(v[0]) < this.maxXSpeed)
                v[0] += this.kXDelta;
        }
        
        if(gEngine.Input.isKeyPressed(gEngine.Input.keys.Space)){
            v[1] += 3;
        }
        
        
        
//        var cubeBox = this.getBBox();
//        var status = BoundingBox.eboundCollideStatus.eOutside;
//        for(var i = 0; i < platform.size(); i++){
//            status |= cubeBox.boundCollideStatus(platform.getObjectAt(i).getBBox());
//        }

        if( ((status === left) || (status === right)) ){
//            console.log("e wall start");
            v[0] = 0;
            if(status === left) this.wallside = SuperCube.eCubeWallStatus.eLeft;
            else this.wallside = SuperCube.eCubeWallStatus.eRight;
            
            
            this.mState = SuperCube.eCubeStatus.eWall;
        }
        
        if(gEngine.Input.isKeyReleased(gEngine.Input.keys.Space) || v[1] > this.maxYSpeed){
            this.mState = SuperCube.eCubeStatus.eAirSpacePressedDone;
//            console.log("Air Space Pressed Done");
        }
        
    }
    
    
    
    else if(this.mState ===  SuperCube.eCubeStatus.eGround){
        
        var v = this.getPhysicsComponent().getVelocity();
        
        if(status === BoundingBox.eboundCollideStatus.eOutside){
            this.mState = SuperCube.eCubeStatus.eAirSpacePressedDone;
        }
        else{
            if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)) {
                if(v[0] > 0)
                    v[0] -= this.accelerate;



                if(Math.abs(v[0]) < this.maxXSpeed)
                    v[0] -= this.kXDelta;

            }
            if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
                if(v[0] < 0)
                    v[0] += this.accelerate;

                if(Math.abs(v[0]) < this.maxXSpeed)
                    v[0] += this.kXDelta;
            }

            if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)){
                this.mState = SuperCube.eCubeStatus.eAirSpacePressed;
                this.mPreState = SuperCube.eCubeStatus.eGround;
                //console.log("Air Space Pressed start");
                v[1] += 20;
            }
        }
    }
    
    else if(this.mState ===  SuperCube.eCubeStatus.eAirSpacePressedDone){
        
        var v = this.getPhysicsComponent().getVelocity();
        
        
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)) {
            if(v[0] > 0)
                v[0] -= this.accelerate;
            
            if(Math.abs(v[0]) < this.maxXSpeed)
            v[0] -= this.kXDelta;

        }
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
            if(v[0] < 0)
                v[0] += this.accelerate;
            
            if(Math.abs(v[0]) < this.maxXSpeed)
            v[0] += this.kXDelta;
        }
        
        

        if(status === bottom || ((status === leftbottom  || status === rightbottom || status === righttop || status === righttop) && v[1] < 0)){
            //console.log("ground start");
            
             v[1] = 0;
            this.mState = SuperCube.eCubeStatus.eGround;
        }
        else if(((status === leftbottom  || status === rightbottom || status === righttop || status === righttop) && v[1] >= 0) || ((status === left) || (status === right)) ){
            //console.log("e wall start");
            if(status === left) v[0] = 0;
            else v[0] = 0;
            
            if(status === left) this.wallside = SuperCube.eCubeWallStatus.eLeft;
            else this.wallside = SuperCube.eCubeWallStatus.eRight;
            
            this.mState = SuperCube.eCubeStatus.eWall;
        }
    }
    
    else if(this.mState ===  SuperCube.eCubeStatus.eWall){
        this.counter++;
        
        var v = this.getPhysicsComponent().getVelocity();  
        
//        var cubeBox = this.getBBox();
//        var status = BoundingBox.eboundCollideStatus.eOutside;
//        for(var i = 0; i < platform.size(); i++){
//            status |= cubeBox.boundCollideStatus(platform.getObjectAt(i).getBBox());
//        }
        
        

        if(status === bottom || status === corner){
            //console.log("ground start");
            
            v[1] = 0;
            this.mState = SuperCube.eCubeStatus.eGround;
        }
        
        else if( status===BoundingBox.eboundCollideStatus.eOutside ||(this.counter > 30) && this.wallside === SuperCube.eCubeWallStatus.eLeft && gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)){
                //console.log("pressed Done start??????????????" + v[1]);
                v[0] = 0.1;
                this.counter = 0;
                this.mState = SuperCube.eCubeStatus.eAirSpacePressedDone;
        }
        else if( status===BoundingBox.eboundCollideStatus.eOutside ||(this.counter > 30) && this.wallside === SuperCube.eCubeWallStatus.eRight && gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)){
           //console.log("pressed Done start");
           v[0] = -0.1;
           this.counter = 0;
            this.mState = SuperCube.eCubeStatus.eAirSpacePressedDone;
        }
        
        
        else if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)){
            //console.log("air space pressed");
            this.counter = 0;
            this.mState = SuperCube.eCubeStatus.eAirSpacePressed;
            this.mPreState = SuperCube.eCubeStatus.eWall;
            if(this.wallside === SuperCube.eCubeWallStatus.eLeft){v[0] += 20;}
            else{v[0] -= 20;}
            v[1] = 25;
        }        
    }
};

