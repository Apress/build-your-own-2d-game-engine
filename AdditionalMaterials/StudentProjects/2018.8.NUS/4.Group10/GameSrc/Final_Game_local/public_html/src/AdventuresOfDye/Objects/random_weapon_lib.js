/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function weapon_random_lib(){
    
    this.Up_life = "assets/"+"up_blood.mp3";
    this.Bomb = "assets/"+"landmine.mp3";
    this.beHit = "assets/"+"die.wav";
    this.frame_weapon = 0;
    this.weapon_random = [];
    this.random_weapon_count = null;
    this.random_weapon_max = 5;
    var i;
    for(i = 0; i < this.random_weapon_max; i++)
    {
        this.weapon_random[i] = null;
    }
}

gEngine.Core.inheritPrototype(weapon_random_lib, GameObject);

weapon_random_lib.prototype.update = function(){
    var i;
    this.frame_weapon++;
    
    if(this.frame_weapon >= 360)
    {
        this.frame_weapon = 0;
        for(i = 0; i < this.random_weapon_max; i++)
        {
            if(this.weapon_random[i] === null)
            {
                this.random_weapon_count++;
                this.weapon_random[i] = new Rom_weapon();
                gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.weapon_random[i]);
                break;
            }
        }
    }
};
weapon_random_lib.prototype.update_collision = function(Hero){
    var i;
    this.blood_change = 0;
    for(i = 0; i < this.random_weapon_count; i++)
    {
        var is_collision_weapon =new collision_box(this.weapon_random[i], Hero);
         if(is_collision_weapon.flag === 1)
         {
             
             var j;
             if(this.weapon_random[i].status === 2)
             {
                 gEngine.AudioClips.playACue(this.Up_life);
                 this.blood_change = 50;
             }
             else if(this.weapon_random[i].status === 3)
             {
                 gEngine.AudioClips.playACue(this.Bomb);
                 gEngine.AudioClips.playACue(this.beHit);
                 this.blood_change = -50;
             }
             else
             {
                Hero.SetStatus(this.weapon_random[i].status);
             }
             gEngine.LayerManager.removeFromLayer(gEngine.eLayer.eActors, this.weapon_random[i]);
             delete this.weapon_random[i];
             for(j = i; j < this.random_weapon_count-1; j++)
             {
                 this.weapon_random[j] = this.weapon_random[j+1];
             }
             this.weapon_random[j] = null;
             this.random_weapon_count--;
         }
    }
    return this.blood_change;
};