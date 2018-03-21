/* 
 * File: MyGame_Update.js
 * By Steven Roberts and Tyler Green
 * 
 * Updates the main game scene, where the bulk of the Cave Escape! Game takes place
 *  The Main camera holds the actual game.
 *  The Sensor camera is established far outside of game bounds to be used
 *      to display the next object being generated.
 */

//React to Inputs and other progression
MainGameScene.prototype.update = function () {
    //SCENE TRANSITION TEMPORARY TEST CODE
//    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.P)) {
//        gEngine.GameLoop.stop();
//    }
    
    //Update the objects
    this.enemyUpdate();
    
    //Generate more objects
    this.generateObstacles();
    
    //Update the camera
    this.camUpdate();
    
    //Update the rest
    this.miscUpdate();
};

MainGameScene.prototype.camUpdate = function() {
    //Get variables affected by input
    var center = this.mMainCamera.getWCCenter();
    //var width = this.mMainCamera.getWCWidth();
    
    //Update Camera Pan Speed based on Input
    //PART OF HERO CONTROLS
    if (!this.mHero.isSpinning()) {
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
            this.mCamPanSpeed += this.kCamPanDelta;
        }
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)) {
            this.mCamPanSpeed -= this.kCamPanDelta;
        }
    }
    //verify that Camera Pan Speed within accepted bounds
    if (this.mCamPanSpeed > this.kCamMaxSpeed){
        this.mCamPanSpeed = this.kCamMaxSpeed;
    }
    else if(this.mCamPanSpeed < 0){
        this.mCamPanSpeed = 0;
    }
    
    //Update Camera position with new CamPanSpeed
    center[0] += this.mCamPanSpeed;
    this.mGameScore += this.mCamPanSpeed;
    this.mMainCamera.setWCCenter(center[0], center[1]);
    
    //Update Camera interpolation/shake, changes in Background and Hero
    //Hero Clamp comes after LayerManager update to ensure that
    //Hero does not traverse past bounds on Y axis
    this.mMainCamera.update();
    this.mSensorCamera.update();
    
    //Contain the hero and the health bar.
    this.mMainCamera.clampAtBoundary(this.mHero.getXform(), 0.7);
    
    //this.mMainCamera.clampAtBoundary(this.mHealthBar.getXform(), 1);
    
    //update score position
    //Does not move vertically, update with respect to camera
    //this.mScoreMsg.getXform().setXPos(center[0] - 15);
    this.mScoreCountMsg.getXform().setXPos(center[0]);
};

MainGameScene.prototype.miscUpdate = function () {
    
    //Generic object update
    gEngine.LayerManager.updateAllLayers();
    
    //Clamp the HealthBar to the boundary such that when its size changes,
    //  it adjusts its center position appropriately
    //Done here instad of in CamUpdate because damage occurences are calculated
    //  in updateAllLayers, which change the size of the HeatlhBar width
    this.mHealthBar.getXform().setXPos(this.mMainCamera.getWCCenter()[0] - 
            (this.mMainCamera.getWCWidth()/2) + 
            (this.mHealthBar.getXform().getWidth()/2) );
    this.updateLights();
    
    //update Score on the HUD
    this.mScoreCountMsg.setText("Score: " + Math.trunc(this.mGameScore));
    
    //Game state update - if hero loses all life, game over.
    if (this.mHero.getHeroLife() <= 0)
    {
        gEngine.GameLoop.stop();
    }
};

//objects in the enemy set are expected to be Light or Illum renderables
//If they're not, this will crash.
MainGameScene.prototype.enemyUpdate = function() {
    //Standard update behavior
    //this.mEnemySet.update();
    
    var camBound = this.mMainCamera.getWCX() - this.mMainCamera.getWCWidth()/2;
    var i, obj;
    //If the object is off the screen, delete it.
    for(i = 0; i < this.mEnemySet.size(); i++){
        obj = this.mEnemySet.getObjectAt(i);
        
        //Should flag the unused lights and object for garbage collector
        if(obj.getXform().getXPos() < camBound){
            obj.removeAllLights();
            this.mEnemySet.removeObjFromSet(obj);
            obj = null;
        }
    }
};