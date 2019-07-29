/* File: DyePack.js 
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function PlayerDirectionUI(spriteTexture,player) {
    this.val = 6;
    this.directionPositionEnum = {
        RIGHT:[this.val,0],
        TOPRIGHT:[this.val,this.val],
        TOP:[0,this.val],
        TOPLEFT:[-this.val,this.val],
        LEFT:[-this.val,0],
        BOTTOMLEFT:[-this.val,-this.val],
        BOTTOM:[0,-this.val],
        BOTTOMRIGHT:[this.val,-this.val]
    };
    this.mPlayer = player;
    this.pre_dir = this.mPlayer.DirectionEnum.RIGHT;
    this.mPlayerDirectionUI = new SpriteRenderable(spriteTexture);
    this.mPlayerDirectionUI.setColor([0, 0, 0, 0]);
    var relative_dirRight = this.directionPositionEnum.RIGHT;
    this.mPlayerDirectionUI.getXform().setPosition(this.mPlayer.getXform().getXPos() + relative_dirRight[0], this.mPlayer.getXform().getYPos() + relative_dirRight[1]);
    this.mPlayerDirectionUI.getXform().setSize(5,5);
    this.mPlayerDirectionUI.setElementPixelPositions(515, 640, 256, 384);
    
        
    GameObject.call(this, this.mPlayerDirectionUI);
}
gEngine.Core.inheritPrototype(PlayerDirectionUI, GameObject);

PlayerDirectionUI.prototype.update = function(){
    var this_relative_pos;
    var player_pos = this.mPlayer.getXform().getPosition();
    var dir = this.mPlayer.direction;
    switch(this.pre_dir){
        case this.mPlayer.DirectionEnum.RIGHT:
            this.mPlayerDirectionUI.getXform().incRotationByDegree(0);
            break;
        case this.mPlayer.DirectionEnum.TOPRIGHT:
            this.mPlayerDirectionUI.getXform().incRotationByDegree(-45);
            break;
        case this.mPlayer.DirectionEnum.TOP:
            this.mPlayerDirectionUI.getXform().incRotationByDegree(-90);
            break;
        case this.mPlayer.DirectionEnum.TOPLEFT:
            this.mPlayerDirectionUI.getXform().incRotationByDegree(-135);
            break;
        case this.mPlayer.DirectionEnum.LEFT:
            this.mPlayerDirectionUI.getXform().incRotationByDegree(-180);
            break;
        case this.mPlayer.DirectionEnum.BOTTOMLEFT:
            this.mPlayerDirectionUI.getXform().incRotationByDegree(-225);
            break;
        case this.mPlayer.DirectionEnum.BOTTOM:
            this.mPlayerDirectionUI.getXform().incRotationByDegree(-270);
            break;  
        case this.mPlayer.DirectionEnum.BOTTOMRIGHT:
            this.mPlayerDirectionUI.getXform().incRotationByDegree(-315);
            break;
    }
    
    
    switch(dir){
        case this.mPlayer.DirectionEnum.RIGHT:
            this_relative_pos = this.directionPositionEnum.RIGHT;
            this.mPlayerDirectionUI.getXform().setPosition(player_pos[0] + this_relative_pos[0], player_pos[1] + this_relative_pos[1]);
            this.mPlayerDirectionUI.getXform().incRotationByDegree(0);
            break;
        case this.mPlayer.DirectionEnum.TOPRIGHT:
            this_relative_pos = this.directionPositionEnum.TOPRIGHT;
            this.mPlayerDirectionUI.getXform().setPosition(player_pos[0] + this_relative_pos[0], player_pos[1] + this_relative_pos[1]);
            this.mPlayerDirectionUI.getXform().incRotationByDegree(45);
            break;
        case this.mPlayer.DirectionEnum.TOP:
            this_relative_pos = this.directionPositionEnum.TOP;
            this.mPlayerDirectionUI.getXform().setPosition(player_pos[0] + this_relative_pos[0], player_pos[1] + this_relative_pos[1]);
            this.mPlayerDirectionUI.getXform().incRotationByDegree(90);
            break;
        case this.mPlayer.DirectionEnum.TOPLEFT:
            this_relative_pos = this.directionPositionEnum.TOPLEFT;
            this.mPlayerDirectionUI.getXform().setPosition(player_pos[0] + this_relative_pos[0], player_pos[1] + this_relative_pos[1]);
            this.mPlayerDirectionUI.getXform().incRotationByDegree(135);
            break;
        case this.mPlayer.DirectionEnum.LEFT:
            this_relative_pos = this.directionPositionEnum.LEFT;
            this.mPlayerDirectionUI.getXform().setPosition(player_pos[0] + this_relative_pos[0], player_pos[1] + this_relative_pos[1]);
            this.mPlayerDirectionUI.getXform().incRotationByDegree(180);
            break;
        case this.mPlayer.DirectionEnum.BOTTOMLEFT:
            this_relative_pos = this.directionPositionEnum.BOTTOMLEFT;
            this.mPlayerDirectionUI.getXform().setPosition(player_pos[0] + this_relative_pos[0], player_pos[1] + this_relative_pos[1]);
            this.mPlayerDirectionUI.getXform().incRotationByDegree(225);
            break;
        case this.mPlayer.DirectionEnum.BOTTOM:
            this_relative_pos = this.directionPositionEnum.BOTTOM;
            this.mPlayerDirectionUI.getXform().setPosition(player_pos[0] + this_relative_pos[0], player_pos[1] + this_relative_pos[1]);
            this.mPlayerDirectionUI.getXform().incRotationByDegree(270);
            break;  
        case this.mPlayer.DirectionEnum.BOTTOMRIGHT:
            this_relative_pos = this.directionPositionEnum.BOTTOMRIGHT;
            this.mPlayerDirectionUI.getXform().setPosition(player_pos[0] + this_relative_pos[0], player_pos[1] + this_relative_pos[1]);
            this.mPlayerDirectionUI.getXform().incRotationByDegree(315);
            break;
            
    }
    this.pre_dir = dir;
//    console.log(this.mPlayerDirectionUI.getXform().getPosition() + " " + this.mPlayer.getXform().getPosition());
    
//    console.log(dir);
};

    


