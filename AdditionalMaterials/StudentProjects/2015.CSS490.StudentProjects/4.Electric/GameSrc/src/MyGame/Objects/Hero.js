/* File: Hero.js 
 *
 * Creates and initializes the Hero (Dye)
 * overrides the update function of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, RigidCircle, RigidRectangle */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Hero(spriteSheet, itemLight) {
    
    this.kXDelta = 1;
    this.kYDelta = 5.0;
    this.kJumpHeight = 40;
    this.kMaxVelocity = 40;
    this.mItemLight = itemLight;
    
    this.mSpriteSheet = spriteSheet;
    this.mSpriteMap = {};
    
    this.mPowerUpSet = new GameObjectSet();
    
    //topPixel, leftPixel, widthPixel, HeightPixel, numelements, paddingPixel
    var key;
    key = 'standRight';
    this.mSpriteMap[key] = [512,0,67,92,1,0];
    key = 'standLeft';
    this.mSpriteMap[key] = [420,0,67,92,1,0];
    key = 'jumpRight';
    this.mSpriteMap[key] = [328,0,67,92,1,0];
    key = 'jumpLeft';
    this.mSpriteMap[key] = [328,67,67,92,1,0];      
    
    key = 'blueDiamond';
    this.mSpriteMap[key] = [0,128,896,1024];
    key = 'goldKeyEmpty';
    this.mSpriteMap[key] = [256,384,256,384];
    key = 'goldKey';
    this.mSpriteMap[key] = [256,384,128,256];
    key = 'bomb';
    this.mSpriteMap[key] = [256,384,128,256];
    
    this.mDye = new LightRenderable(this.mSpriteSheet);
    this.mDye.setColor([1, 1, 1, 0]);
    this.mDye.getXform().setPosition(20, 60);
    this.mDye.getXform().setSize(10, 13);
    
    this.mDye.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateLeft);
    this.mDye.setAnimationSpeed(2.5); 
   
    this.mDye.setSpriteSequence(512, 0, 67, 92, 1, 0);

    GameObject.call(this, this.mDye);
    var r = new RigidRectangle(this.getXform(), 8, 12.5);
    r.setMass(0.7); 
    r.setRestitution(0.05);
    r.setColor([0, 1, 0, 1]);
    //r.setDrawBounds(true);
    this.setPhysicsComponent(r);
    
    //Hero States
    this.mState = Hero.state.Walking;
    this.mDir = Hero.dir.Right;
    this.mPrevState = Hero.state.Walking;
    this.mNumJump = 0;
    
    
    this.mLifeCounter = null;
    this.mPowerCounter = null;
    this.mKeyCounter = false;
    
    this.powerTick = 0;
    
    this.mKey = null;
    
    this.Update = false;
}
gEngine.Core.inheritPrototype(Hero, GameObject);


Hero.state = Object.freeze({
    Walking: 1,
    Jumping: 2,
    Hurt: 3,
    Idle : 4 
});

Hero.dir = Object.freeze({
    Left: -1,
    Right: 1,
    Forward:3
});

Hero.prototype.changeAnimation = function () {
    
    //if(this.mPrevState !== this.mState){
        switch (this.mState) {
            case Hero.state.Walking:
                if(this.mDir === Hero.dir.Left && !this.Update){
                    //[512,0,67,92,1,0]
                    this.mDye.setSpriteSequence(512, 0, 67, 92, 3, 3);
                }
                else if (this.mDir === Hero.dir.Right && !this.Update){
                    //[420,0,67,92,1,0]
                    this.mDye.setSpriteSequence(420, 0, 67,92, 3, 3);
                }
                break;

            case Hero.state.Jumping:
                if(this.mDir === Hero.dir.Right){
                    //[512,0,67,92,1,0]
                    this.mDye.setSpriteSequence(328, 0, 67, 92, 1, 0);
                }
                else if (this.mDir === Hero.dir.Left){
                    //[420,0,67,92,1,0]
                    this.mDye.setSpriteSequence(328, 67, 67,92, 1, 0);
                }                
                break;

        }
    //}
  
};

Hero.prototype.updateControls = function () {
    
    var v = this.getPhysicsComponent().getVelocity();
    var xform = this.getXform();
    
    this.Update = false;
    
    
    var controlsPressed = false;
    

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)) {
        if(Math.abs(v[0]) <= this.kMaxVelocity){
           v[0] -= this.kXDelta;

        }
     
        if(this.mDir === Hero.dir.Left && this.mState === Hero.state.Walking){
            this.Update = true;
        }
        this.changeAnimation();
        this.mDir = Hero.dir.Left;        
        controlsPressed = true;

    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
        if(Math.abs(v[0]) <= this.kMaxVelocity){
            v[0] += this.kXDelta;
        }

        
        if(this.mDir === Hero.dir.Right && this.mState === Hero.state.Walking){
            this.Update = true;
        }        
        this.changeAnimation();
        this.mDir = Hero.dir.Right;
        controlsPressed = true;
    }
    
    //if the user has not pressed anything slow the hero down more quickly
    //if(this.mState === Hero.state.Walking){
        if(!controlsPressed && this.mDir === Hero.dir.Right){
            if(v[0] > 0){
                v[0] -= 1;
            }
            if(v[0] < 0){
                v[0] = 0;
            }

        }
        if(!controlsPressed && this.mDir === Hero.dir.Left){
            if(v[0] < 0){
                v[0] += 1;
            }
            if(v[0] > 0){
                v[0] = 0;
            }

        }
    //}

    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.E)) {
        
        if(this.mPowerCounter.getNumber() >= 1){
            this.decPowerCounter();
            var p = new Power(this.getXform().getPosition(),this.mDir);
            p.addLight(this.mItemLight);
            this.mPowerUpSet.addToSet(p);
        }
    } 

    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)) {
      
        if(v[1] < 20){
            if(this.mNumJump === 0){
                this.mPrevState = Hero.state.Walking;
                v[1] += this.kJumpHeight;
                this.mState = Hero.state.Jumping;
                this.mNumJump++;
            }
            if(this.mNumJump === 1){
                this.changeAnimation();
                
                if(v[1] > 15 && v[1] < 30){
                    
                    v[1] += this.kJumpHeight * 0.50;
                    this.mState = Hero.state.Jumping;
                    this.mNumJump++;                
                }
                else if(v[1] < 15 && v[1] > 0){
                    v[1] += this.kJumpHeight * 0.75;
                    this.mState = Hero.state.Jumping;
                    this.mNumJump++;                
                }
                else if(v[1] < 0){
                    v[1] += this.kJumpHeight * 1.0;
                    this.mState = Hero.state.Jumping;
                    this.mNumJump++;                
                }
            }
        }
    }
    
};

Hero.prototype.draw = function (aCamera) {
    GameObject.prototype.draw.call(this,aCamera);
    this.mPowerUpSet.draw(aCamera);
};

Hero.prototype.update = function (platforms,enemies,bats) {
    // must call super class update
    GameObject.prototype.update.call(this);

    
    this.updateControls();
    this.handlePlatformCollision(platforms);
    
    this.mPowerUpSet.update();
    
    if(this.powerTick > 150){
        this.incPowerCounter();
        this.powerTick = 0;
    }
    
    this.powerTick++;
    
    //handles the projectiles interaction with platform and enemies
    var i;
    for(i = 0; i < this.mPowerUpSet.size(); i++){
        
        var obj = this.mPowerUpSet.getObjectAt(i);
        var objBB = obj.getBBox();
        
       if(obj.hasExpired()){
            this.mPowerUpSet.removeFromSet(obj);
            
        }else{
            var k;
            for(k = 0; k< platforms.size();k++){
                var plat = platforms.getObjectAt(k);
                var platBB = plat.getBBox();

                if(objBB.intersectsBound(platBB)){
                   // this.mPowerUpSet.removeFromSet(obj);
                    obj.explode();
                }
            }
            var j;
            for(j = 0; j< enemies.size();j++){
                
                var enemy = enemies.getObjectAt(j);
                var enemiesBB = enemy.getBBox();

                if(objBB.intersectsBound(enemiesBB)){
                    enemies.removeFromSet(enemy);
                   // this.mPowerUpSet.removeFromSet(obj);
                    obj.explode();
                }
            }  
            var p;
            for(p = 0; p< bats.size() ;p++){
                
                var bat = bats.getObjectAt(p);
                var batBB = bat.getBBox();

                if(objBB.intersectsBound(batBB)){
                    bats.removeFromSet(bat);
                    obj.explode();
                }
            }            
        }

    }

    if(this.Update){
       this.mDye.updateAnimation(); 
    }
    
    
    

};
Hero.prototype.handlePlatformCollision = function (platforms) {
    
    var i;
    for(i = 0; i < platforms.size(); i++){
        
        var obj = platforms.getObjectAt(i);
        var platformName = getObjectClass(obj);
        
        if(this.collideBottom(obj) && this.mState === Hero.state.Jumping){
            this.mState = Hero.state.Walking;
            this.mPrevState = Hero.state.Jumping;
            //this.Update = false;
            //this.changeAnimation();
            this.Update = true;
            
            this.mNumJump = 0;
        }
        
        switch(platformName) {
            case 'SpikePlatform':
                if(this.collideBottom(obj)){
                    this.handleEnemyCollision();
                }
                break;
            //case n:
               // code block
                //break;
            default:
                //default code block
        }        
    }
};

Hero.prototype.registerhasKey = function (key) {
    this.mKey = key;
};

Hero.prototype.collideBottom = function (obj) {
  var heroBB = this.getBBox();
  var status = heroBB.boundCollideStatus(obj.getBBox());

  if(11 === status || 10 === status || 9 === status ){
      return true;
  }
  return false;
};



Hero.prototype.handleEnemyCollision = function(enemy) {
    if(!this.mKey){
     this.getXform().setPosition(30,70);
    }else if(this.mKey){
     this.getXform().setPosition(1800,70);
    }

  this.mLifeCounter.decByOne();
};

Hero.prototype.setLifeCounter = function(life) {
    this.mLifeCounter = life;
};

Hero.prototype.setPowerCounter = function(power) {
    this.mPowerCounter = power;
};

Hero.prototype.incPowerCounter = function() {
    this.mPowerCounter.incByOne();
};

Hero.prototype.decPowerCounter = function() {
    this.mPowerCounter.decByOne();
};


Hero.prototype.incLifeCounter = function() {
    this.mLifeCounter.incByOne();
};

