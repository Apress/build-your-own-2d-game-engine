/*
 * Team 7-Alpha
 * CSS 490C
 * 2D Game Engine Design
 * File: EnergyBar.js 
 * 
 * Energy bar display linearly interpolates energy values as they're lost
 * 
 * Scan mode on will cost 1 energy per second
 * Magnet active will cost 2 energy per second
 * 
 */

"use strict";

function EnergyBar(miningShip) {
    GameObjectSet.call(this);
    
    // get starting energy amount as dictated by miningShip
    this.kMaxEnergy = miningShip.getStartingEnergyValue();
    this.kInterfaceGraphics = "assets/interfaceGraphics1.png";
    
    // holds a reference to the mining ship
    this.mShipReference = miningShip;
    this.mShipCurrentEnergy = this.kMaxEnergy;
    
    // default BG width size
    this.kEnergyBackgroundWidth = 90;
    this.kEnergyBarMoveWidth = this.kEnergyBackgroundWidth - 24;
    // default position
    this.kEnergyBarXPosition = 50;
    this.kEnergyBarMovePosition = this.kEnergyBarXPosition + 13;
    // constants to handle interpolation
    this.kCycles = 60;
    this.kRate = 0.1;
    // constants to handle update by seconds
    this.kTicksPerSecond = 60;
    this.mEnergyTick = 0;
    
   
    // background
    this.mEnergyBackground = new SpriteRenderable(this.kInterfaceGraphics);
    this.mEnergyBackground.setElementPixelPositions(0, 597, (1024 - 406), (1024 - 245));
    this.mEnergyBackground.getXform().setPosition(this.kEnergyBarXPosition, 180);
    this.mEnergyBackground.getXform().setSize(this.kEnergyBackgroundWidth, 30);
    var energyBackgroundObject = new GameObject(this.mEnergyBackground);
    this.mSet.push(energyBackgroundObject);
    
    // energy bar
    this.kEnergyBarRatio = this.kEnergyBarMoveWidth * 0.9;
    this.kEnergyBar = new SpriteRenderable(this.kInterfaceGraphics);
    this.kEnergyBar.setElementPixelPositions(30, 415, (1024 - 570), (1024 - 459));
    this.kEnergyBar.getXform().setSize(this.kEnergyBarRatio, 10);
    this.kEnergyBar.getXform().setPosition(this.kEnergyBarMovePosition, 180);
    var energyBar = new GameObject(this.kEnergyBar);
    this.mSet.push(energyBar);
    
    this.mCurrentDisplayedEnergy = new Interpolate(this.mShipCurrentEnergy, 
        this.kCycles, this.kRate);

    
}
gEngine.Core.inheritPrototype(EnergyBar, GameObjectSet);

EnergyBar.prototype.update = function () {

    var width = (this.mCurrentDisplayedEnergy.getValue() / 100) // get value as percentage
            * this.kEnergyBarRatio;
    this.mShipCurrentEnergy = this.mShipReference.getCurrentEnergy();
    this.mSet[1].getXform().setWidth(width); 
    this.mSet[1].getXform().setXPos(this.kEnergyBarMovePosition - (this.kEnergyBarRatio - width)/2);
    
    this.mCurrentDisplayedEnergy.updateInterpolation();

    
    this.mEnergyTick++;
    if (this.mEnergyTick > this.kTicksPerSecond) {
        this.mEnergyTick = 0;
        this.mCurrentDisplayedEnergy.setFinalValue(this.mShipCurrentEnergy);

    }
    
    GameObjectSet.prototype.update.call(this);
};
