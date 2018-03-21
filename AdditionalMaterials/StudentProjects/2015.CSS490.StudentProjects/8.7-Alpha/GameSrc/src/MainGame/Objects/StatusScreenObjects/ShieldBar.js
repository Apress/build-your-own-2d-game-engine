/*
 * Team 7-Alpha
 * CSS 490C
 * 2D Game Engine Design
 * File: ShieldBar.js 
 * 
 * Shield bubble display size automatically changes with HP amount
 * 
 * This file contains the functionality for the ship's shields and display
 * The background for the ShieldBar is always object 0 in the set
 * The remaining 1 through N objects are the health bubbles
 */

"use strict";

function ShieldBar(miningShip) {
    GameObjectSet.call(this);
    
    // get starting shield amount as dictated by miningShip
    this.kMaxShields = miningShip.getStartingShieldValue();
    
    // holds a reference to the mining ship
    this.mShipReference = miningShip;
    this.mShipCurrentShields = this.kMaxShields;
    
    
    // default BG width size
    this.kShieldBackgroundWidth = 90;
    
    this.kInterfaceGraphics = "assets/interfaceGraphics1.png";
    
    this.mShieldBackground = new SpriteRenderable(this.kInterfaceGraphics);
    this.mShieldBackground.setElementPixelPositions(0, 597, (1024 - 192), (1024 - 32));
    this.mShieldBackground.getXform().setPosition(50, 220);
    this.mShieldBackground.getXform().setSize(this.kShieldBackgroundWidth, 30);
    
    // background is object 0
    var shieldBackgroundObject = new GameObject(this.mShieldBackground);
    this.mSet.push(shieldBackgroundObject);
    
    // variables for instantiating the health bubbles
    var i;
    var shieldBubble;
    var positionDeltaXFromBackground = this.mShieldBackground.getXform().getWidth() / 
            this.kMaxShields;
    var backgroundPosition = this.mShieldBackground.getXform().getPosition();
    
    
    // create and place each health bubble on top row
    for (i = 0; i < this.kMaxShields / 2; i++) {
        shieldBubble = new SpriteRenderable(this.kInterfaceGraphics);
        shieldBubble.setElementPixelPositions(469, 537, (1024 - 545), (1024 - 481));
        shieldBubble.getXform().setSize(this.mShieldBackground.getXform().getHeight() * 0.2, 
            this.mShieldBackground.getXform().getHeight() * 0.2);
        shieldBubble.getXform().setPosition(backgroundPosition[0]   // initial BG position
                - (16.7)                                            // subtract half width
                + ((positionDeltaXFromBackground + 3)
                * (i))                                              // increment each by max/totalHP
                + (positionDeltaXFromBackground / 2),               // to avoid overlapping lines
                backgroundPosition[1]
                - this.mShieldBackground.getXform().getHeight() * 0.25);
        
        var shieldBubbleGameObject = new GameObject(shieldBubble);
        this.mSet.push(shieldBubbleGameObject);
    }
    // create and place each health bubbole on bottom row
    for (i = (this.kMaxShields / 2); i < this.kMaxShields; i++) {
        shieldBubble = new SpriteRenderable(this.kInterfaceGraphics);
        shieldBubble.setElementPixelPositions(469, 537, (1024 - 545), (1024 - 481));
        shieldBubble.getXform().setSize(this.mShieldBackground.getXform().getHeight() * 0.2, 
            this.mShieldBackground.getXform().getHeight() * 0.2);
        shieldBubble.getXform().setPosition(backgroundPosition[0]   // initial BG position
                - (16.7)                                            // subtract half width
                + ((positionDeltaXFromBackground + 3) 
                * (i - (this.kMaxShields / 2)))                     // increment each by max/totalHP
                + (positionDeltaXFromBackground / 2),               // to avoid overlapping lines
                backgroundPosition[1] 
                + this.mShieldBackground.getXform().getHeight() * 0.25);
        
        var shieldBubbleGameObject = new GameObject(shieldBubble);
        this.mSet.push(shieldBubbleGameObject);
    }

}
gEngine.Core.inheritPrototype(ShieldBar, GameObjectSet);

ShieldBar.prototype.update = function () {
    if (this.mShipCurrentShields > this.mShipReference.getCurrentShields()
            && this.mShipCurrentShields >= 1) {
        this.mShipCurrentShields = this.mShipReference.getCurrentShields();
        var i;
        for (i = this.kMaxShields; i > this.mShipCurrentShields; i--) {
            this.mSet[i].setVisibility(false);
        }
    }
    
    GameObjectSet.prototype.update.call(this);  
};