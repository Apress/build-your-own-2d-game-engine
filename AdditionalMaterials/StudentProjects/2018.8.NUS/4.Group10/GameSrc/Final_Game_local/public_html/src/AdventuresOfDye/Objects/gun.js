/* File: Hero.js 
 *
 * Creates and initializes the Hero (Dye)
 * overrides the update function of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function gun(spriteTexture,position, direct){
    this.status = 8;
    this.direct = direct;
    this.fire = 0;
    this.bullet_flag = 0;
//    this.bullet = null;
    this.frame = 60;
    this.weapon = new SpriteRenderable(spriteTexture);
    this.weapon.setColor([1, 1, 1, 0]);
    this.weapon.getXform().setPosition(position.mPosition[0], position.mPosition[1]+30);
    this.weapon.getXform().setSize(12, 4);
    this.weapon.setElementPixelPositions(0, 32, 0, 32);
    GameObject.call(this, this.weapon);
}

gEngine.Core.inheritPrototype(gun, GameObject);

gun.prototype.update = function(human_position, direct){
    var xform = this.getXform();
        
    this.direct = direct;
    if(direct % 2 === 0)
    {
        xform.setPosition(human_position.mPosition[0]+13, human_position.mPosition[1]+9);
        xform.setSize(-12, 4);
    }
    else
    {
        xform.setSize(12, 4);
        xform.setPosition(human_position.mPosition[0]-13, human_position.mPosition[1]+9);
    }
        
    if(this.status === 8 || this.status === 1)
    {
        if (this.fire === 1 && this.bullet_flag === 0)
        {
            this.bullet_flag = 1;
            this.fire = 0;
            if(this.status === 8)
                this.bullet = new bullet(xform, this.direct, 8, 20);
            else if(this.status === 1)
                this.bullet = new bullet(xform, this.direct, 16, 30)
        };
        if(this.bullet_flag === 1)
        {
            this.bullet.update();
            var xxform = this.bullet.getXform();
            if(xxform.mPosition[0] > 1024 ||  xxform.mPosition[0] < 0)
            {
                delete this.bullet;
                this.bullet = null;
                this.bullet_flag = 0;
            }
        }
    }
};
gun.prototype.attack = function(){
    this.fire = 1;
};

gun.prototype.SetStatus = function(status){
    this.status = status;
}
