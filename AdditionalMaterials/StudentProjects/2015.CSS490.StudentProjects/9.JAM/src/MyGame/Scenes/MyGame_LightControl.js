/*
 * File: MyGame_lightControl: support UI manipulation of light parameters
 */

/*jslint node: true, vars: true */
/*global gEngine, MyGame */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!
// ambient lighting control
MyGame.prototype._updateLight = function () {

    // danger light flashes red when low health
    var deltaColor = 0.05;
    var deltaAmbient = 0.01;
    var directLight = this.mGlobalLightSet.getLightAt(4);
    var color = directLight.getColor();
    var i = directLight.getIntensity();
    var GlobalAmbientColor = gEngine.DefaultResources.getGlobalAmbientColor();
    if (this.mHeroGroup.getHealth() <= 2) {
        if (this.mRed) {
            this.mAmbientTick++;
            color[0] += deltaColor;
            i -= deltaColor;
            directLight.setIntensity(i);
            GlobalAmbientColor[0] += deltaAmbient;
            if(this.mAmbientTick > 60) {
                this.mRed = false;
                this.mAmbientTick = 0;
            }
        } else {
            this.mAmbientTick++;
            color[0] -= deltaColor;
            i += deltaColor;
            directLight.setIntensity(i);
           
            GlobalAmbientColor[0] -= deltaAmbient;
            if (this.mAmbientTick > 60) {
                this.mRed = true;
                this.mAmbientTick = 0;
            }
        }
    }

    // update shield position
    var x = this.mHeroGroup.getX();
    var y = this.mHeroGroup.getY();
    var lightThree = this.mGlobalLightSet.getLightAt(3);
    lightThree.setXPos(x+8);
    lightThree.setYPos(y);

    // correct lighting on death
    if (this.mHeroGroup.getHealth() <= 0) {
        directLight.setIntensity(5);
        directLight.setColor([0.5, 0.5, 0.5, 1]);
        gEngine.DefaultResources.setGlobalAmbientIntensity(3.6);
        gEngine.DefaultResources.setGlobalAmbientColor([0.3, 0.3, 0.3, 1]);
        this.mNextScene = LOSE_SCENE;
        gEngine.GameLoop.stop();
    }
    // return color to normal upon death
    if (this.mStar.pixelTouches(this.mHeroGroup, [0, 0])) {
        directLight.setIntensity(5);
        directLight.setColor([0.5, 0.5, 0.5, 1]);
        gEngine.DefaultResources.setGlobalAmbientIntensity(3.6);
        gEngine.DefaultResources.setGlobalAmbientColor([0.3, 0.3, 0.3, 1]);
        this.mNextScene = WIN_SCENE;
        gEngine.GameLoop.stop();
    }
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.N)) {
        directLight.setIntensity(5);
        directLight.setColor([0.5, 0.5, 0.5, 1]);
        gEngine.DefaultResources.setGlobalAmbientIntensity(3.6);
        gEngine.DefaultResources.setGlobalAmbientColor([0.3, 0.3, 0.3, 1]);
        this.mNextScene = WIN_SCENE;
        gEngine.GameLoop.stop();
    }
    

    var lgt = this.mGlobalLightSet.getLightAt(2);
    var p = lgt.getPosition();
    var delta = 0.1;
    lgt.setXPos(this.mAstroid.getXform().getXPos());
    lgt.setYPos(this.mAstroid.getXform().getYPos() + 50);

//    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.P)) {
//        alert("yPos: " + lgt.getPosition()[1]);
//    }
};