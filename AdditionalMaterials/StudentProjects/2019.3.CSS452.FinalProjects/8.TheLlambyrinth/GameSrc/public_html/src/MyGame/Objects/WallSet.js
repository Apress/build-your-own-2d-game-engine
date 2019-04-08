/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*global gEngine: false, GameObject: false, GameObjectSet: false, Patrol: false, 
 * TextureObject: false, Minion: false, SpriteRenderable: false, vec2: false */

function WallSet(wallSprite,wallNormal,wallXNum,wallYNum,wallGrid) {
    
    this.mSet = [];
    this.mWallSprite = wallSprite;
    this.mWallNormal = wallNormal;
    
    this.mXNum = wallXNum;
    this.mYNum = wallYNum;
    
    this.mGrid = wallGrid;
   
    GameObjectSet.call(this, this.mSet);
};

gEngine.Core.inheritPrototype(WallSet, GameObjectSet);


WallSet.prototype.addWall = function (x,y,orientation) {
   var wall = new Wall(x,y,this.mWallSprite,this.mWallNormal,orientation);  
   this.addToSet(wall);
};

WallSet.prototype.addSpace = function () {
    var wall = null;
    this.addToSet(wall);
};

WallSet.prototype.draw = function (referencedCam) {
    for(var i = 0; i<this.mSet.length; i++){
        if(this.mSet[i] !== null) {
            this.mSet[i].draw(referencedCam);
        }
    }
};

WallSet.prototype.checkLocalBounds = function (gameObject, bound, direction) {
    if(this.mGrid) {
        switch(direction) {
            case 0:
                var xform = gameObject.getXform();
                var x = xform.getXPos();
                var y = xform.getYPos();
                var xIndex = Math.floor(x/10);
                var yIndex = Math.ceil(y/10)*this.mXNum;
                var wallIndex = xIndex+yIndex;
                if(this.mSet[wallIndex] !== null) {
                    for(var i = 0; i < this.mSet[wallIndex].mBBoxes.length; i++) {
                        if (this.mSet[wallIndex].mBBoxes[i].intersectsBound(bound)) {
                            return true;
                        }
                    }
                }
                xIndex = Math.ceil(x/10);
                yIndex = Math.ceil(y/10)*this.mXNum;
                wallIndex = xIndex + yIndex;
                if(this.mSet[wallIndex] !== null) {
                    for(var i = 0; i < this.mSet[wallIndex].mBBoxes.length; i++) {
                        if (this.mSet[wallIndex].mBBoxes[i].intersectsBound(bound)) {
                            return true;
                        }
                    }
                }
                break;
            case 1:
                var xform = gameObject.getXform();
                var x = xform.getXPos();
                var y = xform.getYPos();
                var xIndex = Math.ceil(x/10);
                var yIndex = Math.ceil(y/10)*this.mXNum;
                var wallIndex = xIndex+yIndex;
                if(this.mSet[wallIndex]!==null) {
                    for(var i = 0; i < this.mSet[wallIndex].mBBoxes.length; i++) {
                        if (this.mSet[wallIndex].mBBoxes[i].intersectsBound(bound)) {
                            return true;
                        }
                    }
                }
                xIndex = Math.ceil(x/10);
                yIndex = Math.floor(y/10)*this.mXNum;
                wallIndex = xIndex + yIndex;
                if(this.mSet[wallIndex]!==null) {
                    for(var i = 0; i < this.mSet[wallIndex].mBBoxes.length; i++) {
                        if (this.mSet[wallIndex].mBBoxes[i].intersectsBound(bound)) {
                            return true;
                        }
                    }
                }
                break;
            case 2:
                var xform = gameObject.getXform();
                var x = xform.getXPos();
                var y = xform.getYPos();
                var xIndex = Math.floor(x/10);
                var yIndex = Math.floor(y/10)*this.mXNum;
                var wallIndex = xIndex+yIndex;
                if(this.mSet[wallIndex]!==null){
                    for(var i = 0; i < this.mSet[wallIndex].mBBoxes.length; i++) {
                        if (this.mSet[wallIndex].mBBoxes[i].intersectsBound(bound)) {
                            return true;
                        }
                    }
                }
                xIndex = Math.ceil(x/10);
                yIndex = Math.floor(y/10)*this.mXNum;
                wallIndex = xIndex + yIndex;
                if(this.mSet[wallIndex]!==null) {
                    for(var i = 0; i < this.mSet[wallIndex].mBBoxes.length; i++) {
                        if (this.mSet[wallIndex].mBBoxes[i].intersectsBound(bound)) {
                            return true;
                        }
                    }
                }
                break;
            case 3:
                var xform = gameObject.getXform();
                var x = xform.getXPos();
                var y = xform.getYPos();
                var xIndex = Math.floor(x/10);
                var yIndex = Math.floor(y/10)*this.mXNum;
                var wallIndex = xIndex+yIndex;
                if(this.mSet[wallIndex]!==null) {
                    for(var i = 0; i < this.mSet[wallIndex].mBBoxes.length; i++) {
                        if (this.mSet[wallIndex].mBBoxes[i].intersectsBound(bound)) {
                            return true;
                        }
                    }
                }
                xIndex = Math.floor(x/10);
                yIndex = Math.ceil(y/10)*this.mXNum;
                wallIndex = xIndex + yIndex;
                if(this.mSet[wallIndex]!==null) {
                    for(var i = 0; i < this.mSet[wallIndex].mBBoxes.length; i++) {
                        if (this.mSet[wallIndex].mBBoxes[i].intersectsBound(bound)) {
                            return true;
                        }
                    }
                }
                break;
                
        }
        //Do Stuff.
    } else {
        for(var k = 0; k<this.mSet.length; k++){
            for(var i = 0; i<this.mSet[k].mBBoxes.length; i++) {
                if (this.mSet[k].mBBoxes[i].intersectsBound(bound)) {
                    return true;
                }
            }
        }
    }
};