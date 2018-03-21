/* File: Basket.js 
 *
 * Creates and initializes the Hero (Dye)
 * overrides the update function of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, WASDObj */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Basket(spriteTexture, normalMap, x, y) {
    
    this.aBasket = new IllumRenderable(spriteTexture, normalMap);
    this.aBasket.getMaterial().setSpecular([1, 0, 0, 1]);
    //this.aBasket.setColor([1, 1, 1, 0]);
    this.aBasket.getXform().setPosition(x, y);
    this.aBasket.getXform().setSize(8, 4);
    this.mOriginX = x;
    this.mFaction = "gray";
    this.enableShake = false;
    
    
    // need to adjust this when the drawing is made
    this.aBasket.setElementPixelPositions(0, 256, 0, 128);
    //this.mGameObject = new GameObject(this.mDye);
    GameObject.call(this, this.aBasket);
    
    // 0 = neutral, 1 = red, 2 = blue
    this.color = 0;
    
    this.mHarmonicFunction = new ShakePosition(1, 0, 4, 30);
    /*
    //this.initializePhysicsObjects();
    this.physicsObjects = [
        this.leftBar = new Bar(this, true),
        this.rightBar = new Bar(this, false)
    ]
    */
}
gEngine.Core.inheritPrototype(Basket, GameObject);

Basket.prototype.update = function (ball1, ball2) {
    
    //var bound = this.getBBox();
    //var x = this.getXform().getXPos();
    //var y = this.getXform().getYPos()
    var bound = new BoundingBox(this.getXform().getPosition(), 6, 3) //centerPos, w, h
    
    if (bound.intersectsBound(ball1.getBBox()) != 0) {
        this.color = 1;
        this.processHit();
    }
    
    if (bound.intersectsBound(ball2.getBBox()) != 0) {
        this.color = 2;
        this.processHit();
    }
    var xf = this.getXform();
    if(this.enableShake === true) {
        if(this.mHarmonicFunction.shakeDone() === true ) {
            this.enableShake = false;
            xf.setPosition(this.mOriginX, this.getXform().getYPos());
        }
        else if(this.mHarmonicFunction.shakeDone() === false && this.mFaction !== "gray") {
            if(this.mFaction === "red") {
                var delta = this.mHarmonicFunction.getShakeResults();
                xf.setPosition(xf.getXPos() + delta[0], xf.getYPos());
                this.aBasket.setElementPixelPositions(256, 256 * 2, 0, 128);
            }
            if(this.mFaction === "blue") {
                var delta = this.mHarmonicFunction.getShakeResults();
                xf.setPosition(xf.getXPos() + delta[0], xf.getYPos());
                this.aBasket.setElementPixelPositions(256 * 2, 256 * 3, 0, 128);
            }
        }
    }
};

Basket.prototype.reset = function(){
    this.color = 0;
    this.processHit();
}

Basket.prototype.processHit = function(){
    /*
    // assuming that all three basket colors will be on the same image and spaced apart
    if (this.color == 0) {
        this.aBasket.setElementPixelPositions(0, 256, 0, 64);
        //this.aBasket.setColor([1, 1, 1, 0]);
    } else 
    */
    
    if (this.color == 1 && this.mFaction != "red") {
        this.mFaction = "red";
        this.enableShake = true;
        this.mHarmonicFunction = new ShakePosition(1, 0, 4, 30);
        var delta = this.mHarmonicFunction.getShakeResults();
        xf.setPosition(xf.getXPos() + delta[0], xf.getYPos());
        this.aBasket.setElementPixelPositions(256, 256 * 2, 0, 128);
        //this.aBasket.setColor([1, 0, 0, 0]);
    } else if (this.color == 2 && this.mFaction != "blue") {
        this.mFaction = "blue";
        this.enableShake = true;
        this.mHarmonicFunction = new ShakePosition(1, 0, 4, 30);
        var delta = this.mHarmonicFunction.getShakeResults();
        xf.setPosition(xf.getXPos() + delta[0], xf.getYPos());
        this.aBasket.setElementPixelPositions(256 * 2, 256 * 3, 0, 128);
        //this.aBasket.setColor([0, 0, 1, 0]);
    } else if(this.color == 0 && this.mFaction != "gray"){
        this.mFaction = "gray";
        this.enableShake = false;
        this.aBasket.setElementPixelPositions(0, 256, 0, 128);
    }
}

Basket.prototype.draw = function(aCamera){
    GameObject.prototype.draw.call(this, aCamera);
}
