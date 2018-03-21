/*
 * Team 7-Alpha
 * CSS 490C
 * 2D Game Engine Design
 * File: PowerUpStatus.js 
 * 
 * This file creates the power up status object which shows the current powerup
 * 
 */

"use strict";

function PowerUpStatus(miningShip) {
    GameObjectSet.call(this);
    this.kInterfaceGraphics = "assets/interfaceGraphics1.png";
    this.mShipReference = miningShip;
    // power ups: 'N' === None
    //            'H' === Homing rocket
    //            'X' === Explosive rocket
    this.mCurrentPowerStatus = null;
    
    // mSet[0]
    this.mPowerBackground = new Renderable();
    this.mPowerBackground.setColor([0, 0, 0, 1]);
    this.mPowerBackground.getXform().setPosition(50, 5);
    this.mPowerBackground.getXform().setSize(100, 40);
    var powerBackground = new GameObject(this.mPowerBackground);
    this.mSet.push(powerBackground);
    
    // mSet[1]
    this.mPowerNullStatus = new LightRenderable(this.kInterfaceGraphics);
    this.mPowerNullStatus.setElementPixelPositions(692, 827, (1024 - 177), (1024 - 43));
    this.mPowerNullStatus.getXform().setPosition(55, 62);
    this.mPowerNullStatus.getXform().setSize(40, 40);
    var nullStatus = new GameObject(this.mPowerNullStatus);
    this.mSet.push(nullStatus);
    
    // mSet[2]
    this.mPowerHomingStatus = new LightRenderable(this.kInterfaceGraphics);
    this.mPowerHomingStatus.setElementPixelPositions(692, 827, (1024 - 381), (1024 - 244));
    this.mPowerHomingStatus.getXform().setPosition(55, 62);
    this.mPowerHomingStatus.getXform().setSize(40, 40);
    var homingStatus = new GameObject(this.mPowerHomingStatus);
    this.mSet.push(homingStatus);
    
    // mSet[3]
    this.mPowerExplosiveStatus = new LightRenderable(this.kInterfaceGraphics);
    this.mPowerExplosiveStatus.setElementPixelPositions(692, 827, (1024 - 581), (1024 - 444));
    this.mPowerExplosiveStatus.getXform().setPosition(55, 62);
    this.mPowerExplosiveStatus.getXform().setSize(40, 40);
    var explosiveStatus = new GameObject(this.mPowerExplosiveStatus);
    this.mSet.push(explosiveStatus);
    
    this.mSet[1].setVisibility(true);
    this.mSet[2].setVisibility(false);
    this.mSet[3].setVisibility(false);
    
    this.mPowerNullStatus.addLight(gGameLights.lightAtIndex(2));
    this.mPowerHomingStatus.addLight(gGameLights.lightAtIndex(2));
    this.mPowerExplosiveStatus.addLight(gGameLights.lightAtIndex(2));
    
}
gEngine.Core.inheritPrototype(PowerUpStatus, GameObjectSet);

PowerUpStatus.prototype.update = function () { 
    
  if (this.mCurrentPowerStatus != this.mShipReference.getCurrentPowerStatus()) {
      switch (this.mShipReference.getCurrentPowerStatus()) {
          case 'N':
              this.mCurrentPowerStatus = 'N';
              this.mSet[1].setVisibility(true);
              this.mSet[2].setVisibility(false);
              this.mSet[3].setVisibility(false);
              break;
          case 'H':
              this.mCurrentPowerStatus = 'H';
              this.mSet[1].setVisibility(false);
              this.mSet[2].setVisibility(true);
              this.mSet[3].setVisibility(false);
              break;
          case 'X':
              this.mCurrentPowerStatus = 'X';
              this.mSet[1].setVisibility(false);
              this.mSet[2].setVisibility(false);
              this.mSet[3].setVisibility(true);
              break;
      }
  }  
  
  GameObjectSet.prototype.update.call(this);
};