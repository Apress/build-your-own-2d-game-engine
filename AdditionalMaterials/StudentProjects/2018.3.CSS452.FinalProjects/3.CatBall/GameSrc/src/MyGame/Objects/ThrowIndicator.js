/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";

function ThrowIndicator(spriteTexture, player){
    //this.kDelta = 0.3;
    this.player = player;
    
    this.mIndicator = new SpriteRenderable(spriteTexture);
    //this.mCat.setColor([1, 1, 1, 0]);

    //this.mCat.setColor([255, 255, 255, .5]);
    var pos = this.player.getXform().getPosition();
    //pos[1] += 10;
    this.mIndicator.getXform().setPosition(pos[0], pos[1]);
    var size = this.player.getXform().getSize();
    //size[0] *= 1.5;
    //size[1] *= 1.5;
    this.mIndicator.getXform().setSize(size[0] * 2, size[1] * 2);
    
    if(this.player.playerNum == 1){
        this.mIndicator.setElementPixelPositions(0, 128, 0, 128);
    } else if(this.player.playerNum == 2){
        this.mIndicator.setElementPixelPositions(128, 128 * 2, 0, 128);
    }
    
    

    GameObject.call(this, this.mIndicator);
}
gEngine.Core.inheritPrototype(ThrowIndicator, GameObject);

ThrowIndicator.prototype.update = function(catball){
    var pos = this.player.getXform().getPosition();
    this.getXform().setPosition(pos[0], pos[1] + 4.5);
    //this.getXform().setPosition(catball.getXform().getXPos(), catball.getXform().getYPos())
    //var x = Math.cos((this.throwAngle / 180) * Math.PI) * 5;
    //var y = Math.sin((this.throwAngle / 180) * Math.PI) * 5;
    //this.getXform().setRotationInRad(catball.throwAngle / 180 * Math.PI - 45);
    this.getXform().setRotationInDegree(catball.throwAngle -  90);
    /*
    if(this.player.playerNum == 1){
       console.log("throwAngle: " + catball.throwAngle); 
       console.log(this.getXform().getRotationInDegree());
       
       //var x = Math.cos((catball.throwAngle / 180) * Math.PI) * 5;
       //var y = Math.sin((catball.throwAngle / 180) * Math.PI) * 5;
       //console.log("would be thrown with x: " + x +" and y: " + y);
    }
    */
    
    
    
}

ThrowIndicator.prototype.draw = function(aCamera){
    GameObject.prototype.draw.call(this, aCamera);
};