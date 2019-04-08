/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 /*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
 FontRenderable, SpriteRenderable, LineRenderable,
 GameObject */

/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
 FontRenderable, SpriteRenderable, LineRenderable,
 GameObject */

"use strict";
function Block(pX, pY, c, sizeOfEachBlock, r0, r1, r2, r3) {
    this.allBlocks = [];
    this.topleftCellIndex = [];
    this.cellHeight = [];

    // Rotation arrays should be initialized seperately
    this.rot0 = r0;
    this.rot1 = r1;
    this.rot2 = r2;
    this.rot3 = r3;
    this.rotation = 0;

    this.blockData = r0;
    this.blockSize = sizeOfEachBlock;

    this.posX = pX;
    this.posY = pY;

    this.color = c;
    this.markedForDeletion = [];
    this.updateBlock();
    this.originalBlockCount = this.allBlocks.length;
    this.shakeUtil = new ShakePosition(0,6,4,60);
    this.shakeUtil.stopShake();
    this.blockID = -1;
};
gEngine.Core.inheritPrototype(Block, GameObject);

Block.prototype.getRightMost = function () {
    return this.rightMostResult;
};

Block.prototype.getAllBlocks = function () {
    return this.allBlocks;
};

Block.prototype.getLeftMost = function () {
    return this.leftMostResult;
};

Block.prototype.getTopMost = function () {
    return this.topMostResult;
};

Block.prototype.getBottomMost = function () {
    return this.bottomMostResult;
};

Block.prototype.getTopLeft = function () {
    return this.topleftCellIndex;
};

Block.prototype.draw = function (cameraInput) {
    for (var i = 0; i < this.allBlocks.length; i++) {
        this.allBlocks[i].draw(cameraInput);
    }
};

Block.prototype.getPositionX = function () {
    return this.posX;
};

Block.prototype.getPositionY = function () {
    return this.posY;
};


Block.prototype.getID = function () {
    return this.blockID;
};

Block.prototype.setID = function (val) {
    this.blockID = val;
};

Block.prototype.getBlockCenter = function () {
    var yAvg = 0;
    var xAvg = 0;
    for(var i = 0; i < this.allBlocks.length; i++) {
        xAvg += this.allBlocks[i].getVisualPos()[0];
        yAvg += this.allBlocks[i].getVisualPos()[1];
    }
    xAvg /= this.allBlocks.length;
    yAvg /= this.allBlocks.length;
    return [xAvg, yAvg];
};

Block.prototype.shake = function(){
    this.shakeUtil.ResetShake();
};

Block.prototype.setPosition = function (posX, posY) {
    this.updateBlock(); // commenting this line out enables interp for falling blocks
    this.incPositionBy(posX - this.posX, posY - this.posY, false);
};

Block.prototype.setBlockGridData = function (cellX, cellY) {
    if (this.topleftCellIndex.length === 0) {
        this.topleftCellIndex.push(cellX);
        this.topleftCellIndex.push(cellY);
    } else {
        this.topleftCellIndex[0] = cellX;
        this.topleftCellIndex[1] = cellY;
    }

    this.topMostBlockCell = 1000;
    this.bottomMostBlockCell = 0;
    this.rightMostBlockCell = 0;
    this.leftMostBlockCell = 1000;

    for (var i = 0; i < this.blockData.length; i++) {
        for (var j = 0; j < this.blockData[0].length; j++) {
            if (this.blockData[i][j] === 1) {
                if (this.topMostBlockCell > cellY + i) {
                    this.topMostBlockCell = i;
                }
                if (this.bottomMostBlockCell < cellY + i) {
                    this.bottomMostBlockCell = i;
                }

                if (this.rightMostBlockCell < cellX + j) {
                    this.rightMostBlockCell = j;
                }
                if (this.leftMostBlockCell > cellX + j) {
                    this.leftMostBlockCell = j;
                }
            }
        }
    }

    this.topMostResult = cellY + this.topMostBlockCell;
    this.bottomMostResult = cellY + this.bottomMostBlockCell;
    this.leftMostResult = cellX + this.leftMostBlockCell;
    this.rightMostResult = cellX + this.rightMostBlockCell;
};

Block.prototype.getBlockGridData = function () {
    return this.topleftCellIndex;
};

Block.prototype.getBlockData = function () {
    return this.blockData;
};

Block.prototype.incPositionBy = function (pX, pY) {
    this.incPositionBy(pX, pY, false);
};

Block.prototype.incPositionBy = function (pX, pY, checkForCenter) {
    /*
     if(checkForCenter && pY < 0){
     for(var i =0; i < this.allBlocks.length;i++){
     
     }
     }
     else{
     */
    for (var i = 0; i < this.allBlocks.length; i++) {
        this.allBlocks[i].getXform().incXPosBy(pX);
        this.allBlocks[i].getXform().incYPosBy(pY);
    }
    this.posX += pX;
    this.posY += pY;
    //}
};

Block.prototype.rotateDefault = function () {

    while (this.rotation !== 0) {

        this.rotate(90);

    }

};

Block.prototype.recalcGrid = function () {
    var blockGrid = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];
    console.log("Original Grid");
    console.log(this.blockData);
    for (var i = 0; i < this.allBlocks.length; i++) {
        var jx = 0;
        var jy = 0;
        // Calculate relative x-position
        if (this.allBlocks[i].getXform().getXPos() > this.posX + this.blockSize) {
            jx = 2;
        } else if (this.allBlocks[i].getXform().getXPos() < this.posX + this.blockSize) {
            jx = 0;
        } else {
            jx = 1;
        }
        // Calculate relative y-position
        if (this.allBlocks[i].getXform().getYPos() > this.posY - this.blockSize) {
            jy = 0;
        } else if (this.allBlocks[i].getXform().getYPos() < this.posY - this.blockSize) {
            jy = 2;
        } else {
            jy = 1;
        }
        blockGrid[jy][jx] = 1;
    }
    this.blockData = blockGrid;
    console.log("Recalculated Grid");
    console.log(this.blockData);
};

Block.prototype.splitFix = function () {
    if (this.allBlocks.length < this.originalBlockCount) {
        this.recalcGrid(); // Ensure we're using the latest grid
        this.originalBlockCount = this.allBlocks.length; // prevents doing this more than is necessary
        if ((this.blockData[1][0] === 0 && this.blockData[1][1] === 0 && this.blockData[1][2] === 0) &&
                !(this.blockData[0][0] === 0 && this.blockData[0][1] === 0 && this.blockData[0][2] === 0)) {
            var newGrid = [
                this.blockData[0],
                [0, 0, 0],
                [0, 0, 0]
            ];
            this.blockData[0] = [0, 0, 0];
            this.updateBlock();
            console.log("Lower half");
            console.log(this.blockData);
            console.log("Upper half");
            console.log(newGrid);

            //var blockarr = [];
            //blockarr.push(new Block(this.posX, this.posY, this.color, this.blockSize, newGrid, newGrid, newGrid, newGrid));

            return new Block(this.posX, this.posY, this.color, this.blockSize, newGrid, newGrid, newGrid, newGrid);
        }
    }
    return null;
};
Block.prototype.splitFixHoriz = function () {

};



Block.prototype.checkForDeletion = function () {
    return (this.allBlocks.length === 0);
};

Block.prototype.isCollidingWithWallRight = function (wallX) {
    for (var i = 0; i < this.allBlocks.length; i++) {
        if (this.allBlocks[i].getXform().getPosition()[0] >= wallX - this.blockSize) {
            return true;
        }
    }
    return false;
};

Block.prototype.isCollidingWithWallLeft = function (wallX) {
    for (var i = 0; i < this.allBlocks.length; i++) {
        if (this.allBlocks[i].getXform().getPosition()[0] <= wallX + this.blockSize) {
            return true;
        }
    }
    return false;
};

Block.prototype.isCollidingWithWallBottom = function (wallY) {
    for (var i = 0; i < this.allBlocks.length; i++) {
        if (this.allBlocks[i].getXform().getPosition()[1] <= wallY + this.blockSize) {
            return true;
        }
    }
    return false;
};

Block.prototype.isCollidingWithWallTop = function (wallY) {
    for (var i = 0; i < this.allBlocks.length; i++) {
        if (this.allBlocks[i].getXform().getPosition()[1] > wallY - this.blockSize) {
            return true;
        }
    }
    return false;
};

Block.prototype.rotate = function (rot) {
    var rotChange = rot / 90;
    this.rotation = Math.abs(this.rotation + rotChange) % 4;
    //console.log("Rotation state: " + this.rotation);
    if (this.rotation === 0) {
        this.blockData = this.rot0;
    } else if (this.rotation === 1) {
        this.blockData = this.rot1;
    } else if (this.rotation === 2) {
        this.blockData = this.rot2;
    } else if (this.rotation === 3) {
        this.blockData = this.rot3;
    }
    this.updateBlock();
};

Block.prototype.reverseRotate = function (rot) {
    var rotChange = -1 * rot / 90;
    this.rotation = Math.abs(this.rotation + rotChange) % 4;
    //console.log("Rotation state: " + this.rotation);
    if (this.rotation === 0) {
        this.blockData = this.rot0;
    } else if (this.rotation === 1) {
        this.blockData = this.rot1;
    } else if (this.rotation === 2) {
        this.blockData = this.rot2;
    } else if (this.rotation === 3) {
        this.blockData = this.rot3;
    }
    this.updateBlock();
};

Block.prototype.updateBlock = function () {
    var tempX = 0;
    var tempY = 0;
    this.leftMostBlockCell = this.blockData[0].length - 1;
    this.rightMostBlockCell = 0;
    this.topMostBlockCell = this.blockData.length - 1;
    this.bottomMostBlockCell = 0;
    this.allBlocks = [];
    for (var i = 0; i < this.blockData.length; i++) {
        tempX = 0;
        for (var j = 0; j < this.blockData[0].length; j++) {
            if (this.blockData[i][j] === 1) {
                if (j < this.leftMostBlockCell) {
                    this.leftMostBlockCell = j;
                }
                if (i < this.topMostBlockCell) {
                    this.topMostBlockCell = i;
                }
                if (i > this.bottomMostBlockCell) {
                    this.bottomMostBlockCell = i;
                }
                if (j > this.rightMostBlockCell) {
                    this.rightMostBlockCell = j;
                }
                var tempGameObject = new Subblock(this.posX + tempX, this.posY + tempY, this.color, this.blockSize);
                this.allBlocks.push(tempGameObject);
            }
            tempX += this.blockSize;
        }
        tempY -= this.blockSize;
    }
    this.leftMostResult = this.leftMostBlockCell;
    this.rightMostResult = this.rightMostBlockCell;
    this.topMostResult = this.topMostBlockCell;
    this.bottomMostResult = this.bottomMostBlockCell;
};

Block.prototype.isIntersectingWall = function (top, bottom, left, right) {
    for (var j = 0; j < this.allBlocks.length; j++) {
        if (this.allBlocks[j].getXform().getPosition()[0] >= right) {
            return true;
        } else if (this.allBlocks[j].getXform().getPosition()[0] < left) {
            return true;
        } else if (this.allBlocks[j].getXform().getPosition()[1] <= bottom) {
            return true;
        } else if (this.allBlocks[j].getXform().getPosition()[1] >= top) {
            return true;
        }
    }
    return false;
};

Block.prototype.isIntersectingBlock = function (block) {
    var otherBlocks = block.getAllBlocks();
    for (var i = 0; i < otherBlocks.length; i++) {
        for (var j = 0; j < this.allBlocks.length; j++) {
            if (otherBlocks[i].getXform().getPosition()[0] === this.allBlocks[j].getXform().getPosition()[0] && otherBlocks[i].getXform().getPosition()[1] === this.allBlocks[j].getXform().getPosition()[1]) {
                return true;
            }
        }
    }
    return false;
};

Block.prototype.isCollidingRight = function (blockArr) {
    for (var i = 0; i < blockArr.length; i++) {
        if (blockArr[i] !== this) {
            var temp = this.isPixelColliding(blockArr[i]);
            for (var j = 0; j < temp.length; j++) {
                if (temp[j] === 1) {
                    return true;
                }
            }
        }
    }
    return false;
};

Block.prototype.isCollidingDetector = function (detector) {
    for (var i = 0; i < this.allBlocks.length; i++) {
        if (this.allBlocks[i].pixelTouches(detector, this.allBlocks[i].getXform().getPosition())) {
            return true;
        }
    }
    return false;
};

Block.prototype.whichIsCollidingDetector = function (detector) {
    for (var i = 0; i < this.allBlocks.length; i++) {
        if (this.allBlocks[i].pixelTouches(detector, this.allBlocks[i].getXform().getPosition())) {
            return allBlocks[i];
        }
    }
    return null;
};
Block.prototype.isCollidingWithBlock = function (inputBlock) {
    var otherBlocks = inputBlock.getAllBlocks();
    for (var i = 0; i < otherBlocks.length; i++) {
        for (var j = 0; j < this.allBlocks.length; j++) {
            if (otherBlocks[i].getXform().getPosition()[0] === this.allBlocks[j].getXform().getPosition()[0] && (otherBlocks[i].getXform().getPosition()[1] === this.allBlocks[j].getXform().getPosition()[1] + this.blockSize || otherBlocks[i].getXform().getPosition()[1] === this.allBlocks[j].getXform().getPosition()[1] - this.blockSize)) {
                return otherBlocks[i];
            }
            if (otherBlocks[i].getXform().getPosition()[1] === this.allBlocks[j].getXform().getPosition()[1] && (otherBlocks[i].getXform().getPosition()[0] === this.allBlocks[j].getXform().getPosition()[0] + this.blockSize || otherBlocks[i].getXform().getPosition()[0] === this.allBlocks[j].getXform().getPosition()[0] - this.blockSize)) {
                return otherBlocks[i];
            }
        }
    }
    return false;
};

Block.prototype.isCollidingWithAnything = function (inputBlocks, excludeBlock) {
    for (var k = 0; k < inputBlocks.length; k++) {
        if (inputBlocks[k] !== this && inputBlocks[k] !== excludeBlock) {
            var otherBlocks = inputBlocks[k].getAllBlocks();
            for (var i = 0; i < otherBlocks.length; i++) {
                for (var j = 0; j < this.allBlocks.length; j++) {
                    if (otherBlocks[i].getXform().getPosition()[0] === this.allBlocks[j].getXform().getPosition()[0] && (otherBlocks[i].getXform().getPosition()[1] === this.allBlocks[j].getXform().getPosition()[1] + this.blockSize || otherBlocks[i].getXform().getPosition()[1] === this.allBlocks[j].getXform().getPosition()[1] - this.blockSize)) {
                        return otherBlocks[i];
                    }
                    if (otherBlocks[i].getXform().getPosition()[1] === this.allBlocks[j].getXform().getPosition()[1] && (otherBlocks[i].getXform().getPosition()[0] === this.allBlocks[j].getXform().getPosition()[0] + this.blockSize || otherBlocks[i].getXform().getPosition()[0] === this.allBlocks[j].getXform().getPosition()[0] - this.blockSize)) {
                        return otherBlocks[i];
                    }
                }
            }
        }
    }
    return null;
};

Block.prototype.isCollidingWithAnythingBelow = function (inputBlocks, excludeBlock) {
    for (var k = 0; k < inputBlocks.length; k++) {
        if (inputBlocks[k] !== this && inputBlocks[k] !== excludeBlock) {
            var otherBlocks = inputBlocks[k].getAllBlocks();
            for (var i = 0; i < otherBlocks.length; i++) {
                for (var j = 0; j < this.allBlocks.length; j++) {
                    if (otherBlocks[i].getXform().getPosition()[0] === this.allBlocks[j].getXform().getPosition()[0] && (otherBlocks[i].getXform().getPosition()[1] === this.allBlocks[j].getXform().getPosition()[1] - this.blockSize)) {
                        return otherBlocks[i];
                    }
                }
            }
        }
    }
    return null;
};

Block.prototype.isCollidingWithAnythingRight = function (inputBlocks, excludeBlock) {
    for (var k = 0; k < inputBlocks.length; k++) {
        if (inputBlocks[k] !== this && inputBlocks[k] !== excludeBlock) {
            var otherBlocks = inputBlocks[k].getAllBlocks();
            for (var i = 0; i < otherBlocks.length; i++) {
                for (var j = 0; j < this.allBlocks.length; j++) {
                    if (otherBlocks[i].getXform().getPosition()[1] === this.allBlocks[j].getXform().getPosition()[1] && (otherBlocks[i].getXform().getPosition()[0] === this.allBlocks[j].getXform().getPosition()[0] + this.blockSize)) {
                        return otherBlocks[i];
                    }
                }
            }
        }
    }
    return null;
};


Block.prototype.deleteRowAtPosition = function (row) {
    var deletedStuff = false;
    for (var i = 0; i < this.allBlocks.length; i++) {
        if (this.allBlocks[i].getXform().getPosition()[1] === row) {
            this.allBlocks.splice(i, 1);
            deletedStuff = true;
            i--;
        }
    }
    return deletedStuff;
};

Block.prototype.isCollidingWithAnythingLeft = function (inputBlocks, excludeBlock) {
    for (var k = 0; k < inputBlocks.length; k++) {
        if (inputBlocks[k] !== this && inputBlocks[k] !== excludeBlock) {
            var otherBlocks = inputBlocks[k].getAllBlocks();
            for (var i = 0; i < otherBlocks.length; i++) {
                for (var j = 0; j < this.allBlocks.length; j++) {
                    if (otherBlocks[i].getXform().getPosition()[1] === this.allBlocks[j].getXform().getPosition()[1] && (otherBlocks[i].getXform().getPosition()[0] === this.allBlocks[j].getXform().getPosition()[0] - this.blockSize)) {
                        return otherBlocks[i];
                    }
                }
            }
        }
    }
    return null;
};

Block.prototype.updateLerp = function(cycle, rate) {
    for (var i = 0; i < this.allBlocks.length; i++) {
        this.allBlocks[i].updateLerp(cycle, rate);
    }
};

Block.prototype.update = function () {
    var shakeX = this.shakeUtil.getShakeResults()[0];
    var shakeY = this.shakeUtil.getShakeResults()[1];
    for (var j = 0; j < this.allBlocks.length; j++) {
        this.allBlocks[j].update(shakeX, shakeY);
    }
    return this.checkForDeletion();
};