/*
 * File: PassageController.js 
 * This object is in charge of handling teleportation between passages.
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */


// Each position should have 4 variables, two pairs of xy coordinates
// This is because hallways don't open at a single point, they have a range.
function PassageController(player, pos1, pos2) {
    
    this.mPlayer = player;
    
    this.mJustMoved = false;
    
    this.pos1X1 = pos1[0];
    this.pos1Y1 = pos1[1];
    this.pos1X2 = pos1[2];
    this.pos1Y2 = pos1[3];
    
    this.pos2X1 = pos2[0];
    this.pos2Y1 = pos2[1];
    this.pos2X2 = pos2[2];
    this.pos2Y2 = pos2[3];
}

PassageController.prototype.update = function () {

    if (this.mJustMoved) {
        
        if (!this.isNearPos1() && !this.isNearPos2()) {
            this.mJustMoved = false;
            
        } else {
            //console.log("Just teleported");
            return;
        }
        
        
    } else {
        this.handlePassageways();
    }

    

};

PassageController.prototype.handlePassageways = function () {
    if (this.isNearPos1()) {
        //console.log("PLAYER NEAR PASSAGE 1");
        this.teleport((this.pos2X1 + this.pos2X2) / 2,(this.pos2Y1 + this.pos2Y2) / 2 );
                      
    } else if (this.isNearPos2()) {
        //console.log("PLAYER NEAR PASSAGE 2");
        this.teleport((this.pos1X1 + this.pos1X2) / 2,(this.pos1Y1 + this.pos1Y2) / 2 );
    }
};

PassageController.prototype.teleport = function (x,y) {
    this.mPlayer.getXform().setPosition(x,y);
    this.mJustMoved = true;
    //console.log("Teleporting player to (" + x + ", " + y + ")");
    
};

PassageController.prototype.draw = function () {
    
};

PassageController.prototype.isNearPos1 = function () {
    
    var playerX = this.mPlayer.getXform().getXPos();
    var playerY = this.mPlayer.getXform().getYPos();
    
    if ((playerX <= this.pos1X1 && playerX >= this.pos1X2 
     || playerX >= this.pos1X1 && playerX <= this.pos1X2) &&
     (playerY <= this.pos1Y1 && playerY >= this.pos1Y2 
     || playerY >= this.pos1Y1 && playerY <= this.pos1Y2
     )) {
 
        return true;
    } else {
        return false;
    }
    
    
};

PassageController.prototype.isNearPos2 = function () {
    
    var playerX = this.mPlayer.getXform().getXPos();
    var playerY = this.mPlayer.getXform().getYPos();
    
    if ((playerX <= this.pos2X1 && playerX >= this.pos2X2 
     || playerX >= this.pos2X1 && playerX <= this.pos2X2) &&
     (playerY <= this.pos2Y1 && playerY >= this.pos2Y2 
     || playerY >= this.pos2Y1 && playerY <= this.pos2Y2
     )) {
 
        return true;
    } else {
        return false;
    }
    
};