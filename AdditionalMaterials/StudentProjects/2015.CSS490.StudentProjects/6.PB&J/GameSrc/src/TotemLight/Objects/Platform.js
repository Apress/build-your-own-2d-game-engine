/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


"use strict";

Platform.ePlatformType = Object.freeze({
    eFloor: 0,
    eStaticPlatform: 1,
    eSmallPlatform: 2, 
    eHorizontalPlatform: 3,
    eVerticalPlatform: 4
});

function Platform(cx, cy, velocity, movementRange, texture, normal, lightSet, type)
{
    this.mType = type;
    this.kSpeed = 0.05;
    
    this.kPlatformWidth = 1;
    this.kPlatformHeight = 1;
    
    this.mStartPosition = vec2.fromValues(cx, cy);
    this.mRange = movementRange;
    
    var renderableObj = new IllumRenderable(texture, normal);
    var i;
    for(i = 0; i < lightSet.numLights(); i++)
    {
        renderableObj.addLight(lightSet.getLightAt(i));
    }
    
    GameObject.call(this, renderableObj);
    
    this.initializeType();
    
    this.setCurrentFrontDir(velocity);
    this.setSpeed(this.kSpeed);
    
    var rigidShape = new RigidRectangle(this.getXform(), this.kPlatformWidth, this.kPlatformHeight);
    rigidShape.setMass(0);  // ensures no movements!
    rigidShape.setDrawBounds(false);
    rigidShape.setColor([0, 0, 1, 1]);
    this.setPhysicsComponent(rigidShape);
    
    var pos = this.getXform().getPosition();
    this.mMaxX = pos[0] + this.mRange;
    this.mMaxY = pos[1] + this.mRange;
};

gEngine.Core.inheritPrototype(Platform, GameObject);

Platform.prototype.initializeType = function()
{
    var xform = this.getXform();
    xform.setPosition(this.mStartPosition[0], this.mStartPosition[1]);
    switch(this.mType)
    {
        case Platform.ePlatformType.eFloor:
            this.kPlatformWidth = 10;
            this.kPlatformHeight = 4;
            break;
        case Platform.ePlatformType.eStaticPlatform:
            this.kPlatformWidth = 10;
            this.kPlatformHeight = 1.2;
            break;
        case Platform.ePlatformType.eSmallPlatform:
            this.kPlatformWidth = 5;
            this.kPlatformHeight = 1.2;
            break;
        case Platform.ePlatformType.eHorizontalPlatform:
            this.kPlatformWidth = 10;
            this.kPlatformHeight = 1.2;
            this.setCurrentFrontDir([1,0])
            break;
        case Platform.ePlatformType.eVerticalPlatform:
            this.kPlatformWidth = 10;
            this.kPlatformHeight = 1.2;
            break;
            
            
    }
    
    xform.setSize(this.kPlatformWidth, this.kPlatformHeight);
};

Platform.prototype.update = function()
{
    if(this.mType === Platform.ePlatformType.eHorizontalPlatform ||
            this.mType === Platform.ePlatformType.eVerticalPlatform)
    {
        var pos = this.getXform().getPosition();
        vec2.scaleAndAdd(pos, pos, this.getCurrentFrontDir(), this.getSpeed()); 
        
            if(this.mRange > 0) {
                if(pos[0] > this.mMaxX || pos[1] > this.mMaxY 
                    || pos[0] < this.mStartPosition[0] 
                    || pos[1] < this.mStartPosition[1])
            {
                var speed = this.getSpeed();
                speed = -speed;
                this.setSpeed(speed);
            }
            } else 
            {
                if(pos[0] < this.mMaxX || pos[1] < this.mMaxY 
                 || pos[0] > this.mStartPosition[0] 
                 || pos[1] > this.mStartPosition[1])
            {
                var speed = this.getSpeed();
                speed = -speed;
                this.setSpeed(speed);
            }

            }
        
    }
        if (this.mPhysicsComponent !== null) {
            this.mPhysicsComponent.update();
        }  
};


Platform.prototype.turnBack = function(cXform)
{
    var speed = this.getSpeed();
    speed = -speed;
    this.setSpeed(speed);

};