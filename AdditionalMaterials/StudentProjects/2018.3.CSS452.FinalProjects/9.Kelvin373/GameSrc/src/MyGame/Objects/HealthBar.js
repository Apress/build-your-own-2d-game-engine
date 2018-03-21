/*
 * Handles displaying a character's health in a meter. The character
 * object must provide a getHealth() method.
 */
/* global vec2: false */
"use strict";

function HealthBar(relPos, width, height, orientation, character) {
    // Position relative to camera center position
    this.mRelPos = relPos;
    // Orientation
    this.mOrientation;
    if (orientation === "vertical") {
        this.mOrientation = "vertical";
    }
    else {
        this.mOrientation = "horizontal";
    }
    // Character to follow
    this.mCharacter = character;
    // Black rectangle for background
    this.mBackground = new Renderable();
    var xform = this.mBackground.getXform();
    xform.setSize(width, height);
    this.mBackground.setColor([0, 0, 0, 1]);
    // Set up meter bars
    this.mBars = [];
    this.mBarWidth;
    this.mBarHeight;
    var maxHealth = this.mCharacter.getHealth();
    // This is the size of the gap between the meter and the bars
    this.mGap = .15;
    if (this.mOrientation === "vertical") {
        this.mBarWidth = width - (2 * this.mGap);
        this.mBarHeight = (height - ((maxHealth + 1) * this.mGap)) / maxHealth;
    }
    else { // horizontal
        this.mBarWidth = (width - ((maxHealth + 1) * this.mGap)) / maxHealth;
        this.mBarHeight = height - (2 * this.mGap);
    }
    for (var i = 0; i < this.mCharacter.getHealth(); ++i) {
        var bar = new Renderable();
        xform = bar.getXform();
        xform.setSize(this.mBarWidth, this.mBarHeight);
        bar.setColor([0, 1, 0, 1]);
        this.mBars.push(bar);
    }   
}

HealthBar.prototype.draw = function (camera) {
    // Background
    this.mBackground.draw(camera);
    // Bars
    for (var i = 0; i < this.mCharacter.getHealth(); ++i) {
        this.mBars[i].draw(camera);
    }
};

HealthBar.prototype.update = function(camera) {
    // Update position of background
    var xform = this.mBackground.getXform();
    var cameraPos = camera.getWCCenter();
    var xPos = cameraPos[0] + this.mRelPos[0];
    var yPos = cameraPos[1] + this.mRelPos[1];
    xform.setPosition(xPos, yPos);
    // Update positions of bars
    if (this.mOrientation === "vertical") {
        yPos -= xform.getHeight() / 2;
        yPos += this.mGap + (this.mBarHeight / 2);
        for (var i = 0; i < this.mBars.length; ++i) {
            xform = this.mBars[i].getXform();
            xform.setPosition(xPos, yPos);
            // Increment position
            yPos += this.mBarHeight + this.mGap;
        }
    }
    else { // horizontal
        xPos -= xform.getWidth() / 2;
        xPos += this.mGap + (this.mBarWidth / 2);
        for (var i = 0; i < this.mBars.length; ++i) {
            xform = this.mBars[i].getXform();
            xform.setPosition(xPos, yPos);
            // Increment position
            xPos += this.mBarWidth + this.mGap;
        }
    }
};