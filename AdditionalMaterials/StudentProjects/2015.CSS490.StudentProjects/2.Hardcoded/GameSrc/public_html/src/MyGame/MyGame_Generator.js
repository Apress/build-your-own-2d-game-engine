/* 
 * Author: Tyler Green, Steven Roberts
 * File: MyGame_Generator.js
 * Purpose: This file contains the RNG logic for randomly generating the
 *      spawnable objects.  Each spawnable object has a certain, differing 
 *      chance to be spawned next.  When the object is selected to be spawned 
 *      next, the Sensor camera will display the object for a few seconds, 
 *      then spawn.
 */

/* generateObstacles
 *  Call in the game update() function.
 *  CountDown is initialized to kDelay, when the delay is finished, spawning
 *      begins.
 *      
 *  Needs better bound management (x and y spawning locations aren't restricted)
 */
MainGameScene.prototype.generateObstacles = function() {
    var randNum = Math.floor((Math.random() * 100) + 1); //1 - 100
    
    //put on different update call from spawning to try load on single update from
    //getting too high
    if(this.mCountdown === this.mInterval){ //It's time to pick something!        
        if(randNum < 40){           //30% chance to spawn a Bat
            this.mSensorCamera.setWCCenter(-120, 300);  //show bat
            this.mNext = "Bat";
        } else if(randNum < 70){    //30% chance to spawn a Rock
            this.mSensorCamera.setWCCenter(-140, 300);
            this.mNext = "Rock";
        } else if(randNum < 90){    //30% chance to spawn Fire
            this.mSensorCamera.setWCCenter(-160, 300);
            this.mNext = "Fire";            
        } else {    //remaining 10% chance to spawn Healing Drone
            this.mSensorCamera.setWCCenter(-180, 300);
            this.mNext = "Drone";
        }
    }
    
    //Give an alert
    //Bat, Rock, Fire, Drone - Locations (-1 <20,40,60,80>, 300)
    if(this.mCountdown === 0){
        var center = this.mMainCamera.getWCCenter();
        var width = this.mMainCamera.getWCWidth();
        var height = this.mMainCamera.getWCHeight();
        var sightBuffer = 20;   //ensures objects spawn offscreen
        
        var object, x, y, rand;
        
        //Spawn selected spawnable object
        switch(this.mNext){
            case "Bat":
                rand = Math.random() * height/1.5;
                x = center[0] + width/2 + sightBuffer;
                y = center[1] + height/3 - rand;
                object = new Bat(this.kBatSprite, x, y, this.mHero, null);
                break;
            case "Rock":
                rand = Math.random() * width;
                x = center[0] + width/2 - rand/3;
                y = center[1] + height/2 + sightBuffer;
                object = new Rock(this.kRock, x, y, this.mHero, this.kRockNormalMap);
                break;
            case "Fire":
                rand = Math.random() * width;
                x = center[0] + width*1.25 - rand/2;
                y = center[1] - height/2 - sightBuffer/2;
                object = new Fire(this.kColumn, x, y, this.mHero, null, this.mGlobalLightSet.getLightAt(this.mFireLights));
                this.mFireLights++;
                if (this.mFireLights > 15) {
                    this.mFireLights = 9;
                }
                break;
            case "Drone":
                rand = Math.random() * height/1.5;  //restrict spawning area
                x = center[0] + width/2 + sightBuffer;
                y = center[1] + height/3 - rand;
                object = new HealDrone(this.kDroneSprite, x, y, this.mHero, null, this.mGlobalLightSet.getLightAt(this.mDroneLights));                
                this.mDroneLights++; //increment to next drone light.
                if (this.mDroneLights > 8) { //past edge of drone light segment
                    this.mDroneLights = 4;
                }
                break;
        }
        
        //add lights to object, skip over sensor light (LIGHT 0)
        for(var i = 1; i < this.mGlobalLightSet.numLights(); i++){
            object.addLight(this.mGlobalLightSet.getLightAt(i));
        }
        
        this.mEnemySet.addToSet(object);
        //Reset generation
        this.mCountdown = this.mInterval + 1;   //have to mitigate the --
        
        this.mNext = null;
    }
    
    this.mCountdown--;    //tick timer down for next spawn
    this.mTimer++;  //tick timer forward for scaling difficulty
    //Interval has minimum value
    if (this.mInterval > this.kFinalInterval){
            if (this.mTimer % this.kDifficultyIncreaseTime === 0){
                this.mInterval -= 1;
        }
    }
          
};