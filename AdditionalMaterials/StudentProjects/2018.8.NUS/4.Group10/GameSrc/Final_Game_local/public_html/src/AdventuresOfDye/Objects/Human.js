/* File: Human.js 
 *
 * Creates and initializes the Hero (Dye)
 * overrides the update function of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

function Human(spriteTexture, atX, atY){
    this.gravity = 0.005;
    
    this.status = 0;
    this.speed_x = 0.2;
    this.speed_y = 0;
    //0:Static 1:Running 2:Jump 3:collision
    
    this.mHuman = new SpriteAnimateRenderable(spriteTexture);
    this.mHuman.setColor([1, 1, 1, 0]);
    this.mHuman.getXform().setPosition(atX, atY);
    this.mHuman.getXform().setSize(5, 10);
    this.mHuman.setSpriteSequence(370, 4,
                                   40, 70,
                                    4, 18 );
    this.mHuman.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
    this.mHuman.setAnimationSpeed(5);
    
    GameObject.call(this, this.mHuman);
    this.setSpeed(0.05);
}

gEngine.Core.inheritPrototype(Human, GameObject);

Human.prototype.update = function(other_object)
{
    
    var xform = this.getXform();
    this.mHuman.updateAnimation();
    this.speed_y -= this.gravity;
    //var i;
    var hBbox = this.getBBox();
//    for(i = 0; i < other_object.length; i++)
//    {
        var bBbox = other_object.getBBox();
        if(hBbox.intersectsBound(bBbox)){
            this.speed_y = 0;
        }
//    }   
   
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.W))
    {
        this.speed_y = 0.5;
    }
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.S))
    {
        
    }
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.A))
    {
        xform.incXPosBy(-this.speed_x);
    }
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.D))
    {
        xform.incXPosBy(this.speed_x);
    }
    xform.incYPosBy(this.speed_y);
    
    
    
    
}
