/*
 * File: Renderable.js
 *  
 * Encapsulate the Shader and VertexBuffer into the same object (and will include
 * other attributes later) to represent a Renderable object on the game screen.
 */
/*jslint node: true, vars: true */
/*global gEngine: false, Transform: false */
/* find out more about jslint: http://www.jslint.com/help.html */

// Constructor and object definition
"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Snake(kSnakeHead, kSnakeBody, xPos, yPos) {
    this.mSnake = [];
    this.kSnakeHead = kSnakeHead;
    this.kSnakeBody = kSnakeBody;
    this.mLength = null;
    this.mTime = 0;
    this.SNAKE_SIZE = 5;
    this.mDir = null;
    this.DEFAULT_POS = [xPos, yPos];
    this.mEatNum = null;
    this.mBorder = {
        S: -60,
        N: 60,
        E: 100,
        W: -100
    };
}
var DIRECTION = {
    N: 4,
    S: 3,
    E: 2,
    W: 1
};
Snake.prototype.getSnake = function () {
    return this.mSnake;
};
Snake.prototype.initialize = function () {
    this.mLength = 5;
    this.mSnake[0] = new TextureRenderable(this.kSnakeHead);
    this.mSnake[0].getXform().setPosition(this.DEFAULT_POS[0], this.DEFAULT_POS[1]);
    this.mSnake[0].getXform().setSize(this.SNAKE_SIZE, this.SNAKE_SIZE);
    this.mSnake[0].setColor([1, 1, 1, 1]);
    for (var i = 1; i < this.mLength; i++) {
        this.mSnake[i] = new TextureRenderable(this.kSnakeBody);
        this.mSnake[i].getXform().setSize(this.SNAKE_SIZE, this.SNAKE_SIZE);
        this.mSnake[i].setColor([1, 1, 1, 1]);
        this.mSnake[i].getXform().setPosition(this.mSnake[i - 1].getXform().getXPos(), this.mSnake[i - 1].getXform().getYPos() - this.SNAKE_SIZE);
    }
    this.mDir = DIRECTION.N;
    this.mEatNum = 0;

    //this.updatePos();    

};
Snake.prototype.updatePos = function () {
    for (var i = this.mLength - 1; i > 0; i--) {
        this.mSnake[i].getXform().setPosition(this.mSnake[i - 1].getXform().getXPos(), this.mSnake[i - 1].getXform().getYPos());
    }
};
Snake.prototype.draw = function (vpMatrix) {
    for (var i = 0; i < this.mLength; i++) {
        this.mSnake[i].draw(vpMatrix);
    }
};
Snake.prototype.update = function (time, up, down, left, right) {
    this.mTime++;
    var xform = this.mSnake[0].getXform();




    if (gEngine.Input.isKeyPressed(right)) {
        if (this.mDir !== DIRECTION.W) {
            this.mDir = DIRECTION.E;
        }
    }
    if (gEngine.Input.isKeyPressed(left)) {
        if (this.mDir !== DIRECTION.E) {
            this.mDir = DIRECTION.W;
        }
    }
    if (gEngine.Input.isKeyPressed(up)) {
        if (this.mDir !== DIRECTION.S) {
            this.mDir = DIRECTION.N;
        }
    }
    if (gEngine.Input.isKeyPressed(down)) {
        if (this.mDir !== DIRECTION.N) {
            this.mDir = DIRECTION.S;
        }
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Q)) {
        this.eat();
    }


    if (this.mTime / gEngine.GameLoop.kFPS > time) {
        this.mTime += -gEngine.GameLoop.kFPS * time;
        this.updatePos();
        if (this.mDir === DIRECTION.E) {
            xform.setPosition(xform.getXPos() + xform.getWidth(), xform.getYPos());
            xform.setRotationInDegree(270);
        }
        if (this.mDir === DIRECTION.N) {
            xform.setPosition(xform.getXPos(), xform.getYPos() + xform.getHeight());
            xform.setRotationInDegree(0);
        }
        if (this.mDir === DIRECTION.S) {
            xform.setPosition(xform.getXPos(), xform.getYPos() - xform.getHeight());
            xform.setRotationInDegree(180);
        }
        if (this.mDir === DIRECTION.W) {
            xform.setPosition(xform.getXPos() - xform.getWidth(), xform.getYPos());
            xform.setRotationInDegree(90);
        }

        //eat
        for (var i = 0; i < this.mEatNum; i++) {
            this.mSnake[this.mLength] = new TextureRenderable(this.kSnakeBody);
            this.mSnake[this.mLength].getXform().setSize(this.SNAKE_SIZE, this.SNAKE_SIZE);
            this.mSnake[this.mLength].getXform().setPosition(this.mSnake[this.mLength - 1].getXform().getXPos(), this.mSnake[this.mLength - 1].getXform().getYPos());
            this.mLength++;
        }
        this.mEatNum = 0;


    }
    if (this.deadCheck()) {
        for (var i = 0; i < this.mLength; i++) {
            this.mSnake[i] = null;
        }
        this.initialize();
    }
};




Snake.prototype.eat = function (energy) {
    this.mEatNum += energy;
};

Snake.prototype.getHeadPos = function () {

    return [this.mSnake[0].getXform().getXPos(), this.mSnake[0].getXform().getYPos()];
};



Snake.prototype.deadCheck = function () {
    if (this.mSnake[0].getXform().getXPos() <= this.mBorder.W) {
        return true;
    }
    if (this.mSnake[0].getXform().getXPos() >= this.mBorder.E) {
        return true;
    }
    if (this.mSnake[0].getXform().getYPos() <= this.mBorder.S) {
        return true;
    }
    if (this.mSnake[0].getXform().getYPos() >= this.mBorder.N) {
        return true;
    }
    return false;
};