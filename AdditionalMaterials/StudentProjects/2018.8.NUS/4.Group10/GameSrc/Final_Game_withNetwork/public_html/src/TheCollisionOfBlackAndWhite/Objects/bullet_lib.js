/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function bullet_lib(spriteTexture, position, direct)
{
    this.position = position;
    this.direct = direct;
    this.status = 8;
    this.bullet = [];
    this.bullet_count = 0;
    this.bullet_count_max = 1;
    this.beHit =  "assets/die.wav";
    this.gun_wav = "assets/"+"gun_fire.wav";
    this.Sniper_fire = "assets/"+"sniper_fire.wav";
    this.Sstatus = "assets/"+"SetStatus.wav";
    this.Lethality = 0;
    this.Clip_Capacity = 10000;
    this.frame = 100;
    this.bullet_lib = new SpriteRenderable(spriteTexture);
    this.bullet_lib.setColor([1, 1, 1, 0]);
    this.bullet_lib.getXform().setPosition(this.position.mPosition[0], this.position.mPosition[1]+9);
    this.bullet_lib.getXform().setSize(12, 4);
    this.bullet_lib.setElementPixelPositions(0, 32, 0, 32);
    GameObject.call(this, this.bullet_lib);
}

gEngine.Core.inheritPrototype(bullet_lib, GameObject);

bullet_lib.prototype.update = function(enemy){
    var i;
    this.hp_decrease = 0;
    for(i = 0; i < this.bullet_count; i++)
    {
        var xform = this.bullet[i].getXform();
        this.bullet[i].update();
        var is_collision = new collision_box(enemy, this.bullet[i]);
        if(xform.getXPos() > 1024 || xform.getXPos() < 0)
        {
            var j;
            delete this.bullet[i];
            for(j = i; j  < this.bullet_count-1; j++)
            {
                this.bullet[j] = this.bullet[j+1];
            }
            this.bullet[j] = null;
            this.bullet_count--;
        }
        else if(is_collision.flag === 1)
        {
            gEngine.AudioClips.playACue(this.beHit);
            this.hp_decrease += this.bullet[i].Lethality;
            var j;
            delete this.bullet[i];
            for(j = i; j  < this.bullet_count-1; j++)
            {
                this.bullet[j] = this.bullet[j+1];
            }
            this.bullet[j] = null;
            this.bullet_count--;

        }
    }
    return this.hp_decrease;
};
bullet_lib.prototype.update_position = function(Hero_position, Hero_direct)
{
    this.frame++;
    this.direct = Hero_direct;
    var xform = this.getXform();
    if(this.direct % 2 === 0)
    {
        xform.setPosition(Hero_position.mPosition[0]+13, Hero_position.getYPos()+9);
        xform.setSize(-12, 4);
    }
    else
    {
        xform.setPosition(Hero_position.getXPos()-13, Hero_position.getYPos()+9);
        xform.setSize(12, 4);
    }
}
bullet_lib.prototype.fire = function(Pos_x, Pos_y, direct){
    switch(this.status)
    {
        case 0:
            this.bullet_count_max = 1;
            if(this.bullet_count < this.bullet_count_max && this.frame >= 80)
            {
                this.Clip_Capacity--;
                this.frame = 0;
                gEngine.AudioClips.playACue(this.Sniper_fire);
                this.bullet[this.bullet_count] = new bullet(Pos_x, Pos_y, direct, 16, 30, 40);
                this.bullet_count++;
            }
            break;
        case 1:
            this.bullet_count_max = 5;
            if(this.bullet_count < this.bullet_count_max && this.frame >= 25)
            {
                this.Clip_Capacity--;
                this.frame = 0;
                gEngine.AudioClips.playACue(this.gun_wav);
                this.bullet[this.bullet_count] = new bullet(Pos_x, Pos_y, direct, 8, 20, 20);
                this.bullet_count++;
            }
            break;
        case 2:

            break;
        case 3:

            break;
        case 4:
            break;
        case 8:
            this.bullet_count_max = 1;
            if(this.bullet_count < this.bullet_count_max && this.frame >= 40)
            {
                this.Clip_Capacity--;
                this.frame = 0;
                gEngine.AudioClips.playACue(this.gun_wav);
                this.bullet[this.bullet_count] = new bullet(Pos_x, Pos_y, direct, 8, 20, 25);
                this.bullet_count++;
            }
            break;
    }
    if(this.Clip_Capacity === 0)
    {
        this.SetStatus(8);
    }
};
bullet_lib.prototype.SetStatus = function(status){
    this.status = status;
    gEngine.AudioClips.playACue(this.Sstatus);
    switch(status){
        case 0:
            this.Clip_Capacity = 5;
            break;
        case 1:
            this.Clip_Capacity = 20;
            break;
        case 2:
            break;
        case 3:
            break;
        case 4:
            break;

        case 8:
            this.Clip_Capacity = 10000;
    }
};

bullet_lib.prototype.draw = function(camera){
    var k;
    for(k = 0; k < this.bullet_count; k++)
    {
        this.bullet[k].draw(camera);
    }
};