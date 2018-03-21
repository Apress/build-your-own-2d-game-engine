/*jslint node: true, vars: true */
/*global gEngine: false, GameObjectSet: false, SpriteRenderable: false, 
 * HelperFunctions: false, Manager: false, Fire: false, HelperFunctions */
/* find out more about jslint: http://www.jslint.com/help.html */

function FireManager (fireTexture, angryFireTexture, meteorTexture, bombTexture, heroPos, low, high, bg, igloo, blockManager) {
    
    Manager.call(this, fireTexture, Fire, low, high, true);
    
    this.low;
    this.high;
    this.fireTexture = fireTexture;
    this.angryFireTexture = angryFireTexture;
    this.meteorTexture = meteorTexture;
    this.bombTexture = bombTexture;
    this.heroPos = heroPos;
    this.maxFires = 20;
    this.mbg= bg;
    this.migloo= igloo;
    this.blockManager = blockManager;
    
    //preallocate objects
    
    //2 angry fire
    for(var i = 0; i < 2; i++) {
          var mObject = new AngryFire(this.angryFireTexture, 
            this.heroPos,this.mbg,this.migloo, 
            this.blockManager
          );
            
          this.addToSet(mObject);
    }
    
    switch(HelperFunctions.Core.getDifficulty()){
        case "easy":
            //2 meteors
            for(var i = 0; i < 2; i++) {
                 var mObject = new Meteor(this.meteorTexture,
                    this.mbg,
                    this.migloo
                 );

                this.addToSet(mObject);

            }

            //15 normal fires
            for(var i = 0; i < 15; i++) {
                var mObject = new Fire(this.fireTexture,this.mbg,this.migloo);
                this.addToSet(mObject);
            }
            break;
        case "medium":
            //7 meteors
            for(var i = 0; i < 7; i++) {
                 var mObject = new Meteor(this.meteorTexture,
                    this.mbg,
                    this.migloo
                 );

                this.addToSet(mObject);

            }

            //10 normal fires
            for(var i = 0; i < 10; i++) {
                var mObject = new Fire(this.fireTexture,this.mbg,this.migloo);
                this.addToSet(mObject);
            }
            break;
        case "hard":
            //13 meteors
            for(var i = 0; i < 13; i++) {
                 var mObject = new Meteor(this.meteorTexture,
                    this.mbg,
                    this.migloo
                 );

                this.addToSet(mObject);

            }

            //4 normal fires
            for(var i = 0; i < 4; i++) {
                var mObject = new Fire(this.fireTexture,this.mbg,this.migloo);
                this.addToSet(mObject);
            }
            break;
    }
    
    
    //1 giant bomb  
    var mObject = new Bomb(this.bombTexture,
    this.mbg,
    this.migloo,
    this.blockManager);
    this.addToSet(mObject);
    
}
gEngine.Core.inheritPrototype(FireManager, Manager);

FireManager.prototype.relocate = function (x, y) {
    
    for(var i = 0; i < this.size(); i++) {
        this.getObjectAt(i).relocate(x, y);
    }
    
};

FireManager.prototype.incrementScoreBy = function (increment){
  
    this.score += increment;
    
};

FireManager.prototype.update = function (){
  
//  console.log(this.size());
  
    Manager.prototype.update.call(this);

    this.low *= 0.9999;
    this.high *= 0.9999;
    this.setLowAndHigh(this.low, this.high);
};

FireManager.prototype.autoSpawn = function(){
    this._toggleAutospawn();
};

FireManager.prototype._createObject = function () {
 
    var randomNumber = HelperFunctions.Core.generateRandomInt(0, 20);
    

this.score += this.getObjectAt(randomNumber).getScore();

    var toSpawn = this.getObjectAt(randomNumber);
    
    if(toSpawn.getType() === "Meteor"){
        toSpawn.getPhysicsComponent().setMass(0.85);
    }else{
        toSpawn.getPhysicsComponent().setMass(1);
    }

    toSpawn.shouldMoveFunction(true);
    toSpawn.setVisibility(true);
    toSpawn.mLight.setLightTo(true);
};

FireManager.prototype.deleteFires = function(){
    this.deleteAll();
};