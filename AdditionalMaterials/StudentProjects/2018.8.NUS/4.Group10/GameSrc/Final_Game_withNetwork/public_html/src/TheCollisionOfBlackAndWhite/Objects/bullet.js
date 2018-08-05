/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!


function bullet(Pos_x, Pos_y, direct_x, speed, bullet_length, lethality)
{
    this.Lethality = lethality;
    this.speed = speed;
    this.spriteTexture = "assets/gun_bullet_left.png";
    this.direct = direct_x;
    this.mbullet = new SpriteRenderable(this.spriteTexture);
    this.mbullet.setColor([1, 1, 1, 0]);
    this.mbullet.getXform().setPosition(Pos_x, Pos_y+9);
    if(direct_x % 2 === 1)
        this.mbullet.getXform().setSize(bullet_length, 2);
    else
        this.mbullet.getXform().setSize(-bullet_length,2);
    this.mbullet.setElementPixelPositions(0, 32, 0, 4);
    GameObject.call(this, this.mbullet);

}

gEngine.Core.inheritPrototype(bullet, GameObject);

bullet.prototype.update = function(){

    var xform = this.getXform();
    if(this.direct %2 === 0)
    {
        xform.incXPosBy(this.speed);
    }
    else
    {
        xform.incXPosBy(-this.speed);
    }

}