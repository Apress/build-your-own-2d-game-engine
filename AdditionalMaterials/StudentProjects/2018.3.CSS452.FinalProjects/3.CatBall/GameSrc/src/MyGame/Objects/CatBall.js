/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function CatBall(spriteTexture, player){
    //this.kDelta = 0.3;
    this.player = player;
    
    this.mCat = new SpriteRenderable(spriteTexture);
    //this.mCat.setColor([1, 1, 1, 0]);

    //this.mCat.setColor([255, 255, 255, .5]);
    var pos = this.player.getXform().getPosition();
    //pos[1] += 10;
    this.mCat.getXform().setPosition(pos[0], pos[1] + 4.5);
    this.mCat.getXform().setSize(3.8, 3.8);
    
    this.mInterpolate = new InterpolateVec2([pos[0], pos[1] + 4.5], 60, 0.05);
    this.mThrownTimer = 0;
    
    if(this.player.playerNum == 1){
        this.mCat.setElementPixelPositions(128, 128 * 2, 0, 128);
    } else if(this.player.playerNum == 2){
        this.mCat.setElementPixelPositions(128 * 2, 128 * 3, 0, 128);
    }
    
    

    GameObject.call(this, this.mCat);
    
    var r = new RigidCircle(this.getXform(), 1.9);
    r.setMass(4);
    r.setRestitution(0.9);
    r.setInertia(0.9);
    //r.setFriction(0.5);a
    this.setRigidBody(r);
    //this.getRidBody().setMass(0.2);
    //this.getRidBody().setRestitution(0.5);
    //this.getRidBody().setInertia(0.1);
    
    // state can be: held, returning, or thrown
    // state: stays on top of the player
    // returning: interpolates or chases back to player
    // thrown: at the mercy of physics
    this.state = "held";
    
    this.throwAngle = 60;
    if(this.player.playerNum == 2){
        this.throwAngle = 120;
    }
    
    //this.toggleDrawRigidShape();
}
gEngine.Core.inheritPrototype(CatBall, GameObject);

CatBall.prototype.update = function () {
    //console.log(this.getRigidBody().getVelocity());
    var pos = this.player.getXform().getPosition();
    if(this.state == "held"){
        // is there any way to disable physics being calculated?
        this.getXform().setPosition(pos[0], pos[1] + 4.5);
    } else if(this.state == "returning"){
        this.mThrownTimer++;
        if(this.mThrownTimer >= 60) {
            this.state = "held";
            this.mThrownTimer = 0;
        }
        this.mInterpolate.setFinalValue([pos[0], pos[1] + 4.5]);
        this.mInterpolate.updateInterpolation();
        var one = this.mInterpolate.getValue()[0];
        var two = this.mInterpolate.getValue()[1];
        this.getXform().setPosition(one, two);
    } else {
       GameObject.prototype.update.call(this); 
    }
    
    /*
    if(this.player.playerNum == 1){
        console.log(this.player.facingRight);
    }
    */
    /*
    if(this.player.facingRight){
        this.throwAngle = clamp(this.throwAngle, 0, 90);
    } else {
        this.throwAngle = clamp(this.throwAngle, 90, 180);
    }
    */
    
    
    //console.log(this.getRigidBody().getRestitution());
    
};

CatBall.prototype.draw = function(aCamera){
    GameObject.prototype.draw.call(this, aCamera);
};

CatBall.prototype.throw = function(){
    
    
    if(this.state == "thrown"){
        this.state = "returning";
        this.getXform().incYPosBy(4.5);
        this.mInterpolate = new InterpolateVec2(this.getXform().getPosition(), 60, 0.05);
        //this.state = "held";
    }
    else if (this.state == "returning") {
        
    }
    else {
        this.state = "thrown";
        var x = Math.cos((this.throwAngle / 180) * Math.PI) * 5;
        var y = Math.sin((this.throwAngle / 180) * Math.PI) * 5;
        this.getRigidBody().setVelocity(x * 5, y * 5);
        //console.log(this.getRigidBody().getVelocity());
    }
    
    this.player.updateAnimationStatus();
};

CatBall.prototype.isHeld = function(){
    if(this.state == "held"){
        return true;
    }
    return false;
}
