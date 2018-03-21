/* File: DyePack.js 
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObjectSet */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function DyePackSet3(sprite) {
    GameObjectSet.call(this);
    this.kSpriteSheet = sprite;
    this.timeclicks=0;
    this.timeclicks2=0;
    this.timeclicks3=0;
    this.bossli = false;
    this.boo = 2400;
    this.boo2 = 0;
}
gEngine.Core.inheritPrototype(DyePackSet3, GameObjectSet);


DyePackSet3.prototype.update = function(hero, aCamera) {
    this.timeclicks3++;
    this.timeclicks2++;
    this.timeclicks++;
    
    if(this.timeclicks3===121){
        this.timeclicks3 = 0;
    }
    var x, y, d, e,f,g,x2,y2;
    if(this.boo>1){
        if(this.timeclicks>50){
            x = 140*Math.random()-22;
            y = 90;
            d = new DyePack(this.kSpriteSheet, x, y);
            this.addToSet(d);
            e = new DyePack2(this.kSpriteSheet, x, y);
            this.addToSet(e);
            this.timeclicks -= 20;
        }
    if(this.timeclicks2>300){
         x2 =120*Math.random()-10;
            y2 =90;
            f = new DyePack3(this.kSpriteSheet, x2, y2);
            this.addToSet(f);
            g = new DyePack2(this.kSpriteSheet, x2, y2);
            this.addToSet(g);
            g = new DyePack2(this.kSpriteSheet, x2+10, y2);
            this.addToSet(g);
            g = new DyePack2(this.kSpriteSheet, x2-10, y2);
            this.addToSet(g);
            this.timeclicks2 = 0;
        }
        this.boo--;
    }
    if(this.boo===1){
    this.boo2++;
    }
    if(this.boo2===1){
        var x3, y3,h,i;
        x3 = 50;
        y3 = 66;
        h = new DyePack4(this.kSpriteSheet, x3, y3);
            this.addToSet(h);
        this.bossli = true;
        i = new DyePack2(this.kSpriteSheet, x3, y3);
            this.addToSet(i);
        i = new DyePack2(this.kSpriteSheet, x3+10, 46);
            this.addToSet(i);
        i = new DyePack2(this.kSpriteSheet, x3-10, 46);
            this.addToSet(i);
        i = new DyePack2(this.kSpriteSheet, x3+20, 46);
            this.addToSet(i);
        i = new DyePack2(this.kSpriteSheet, x3-20, 46);
            this.addToSet(i);
        
    }
    if(this.bossli){
        if(this.timeclicks3===30){
        var x3, y3,i;
        x3 = 50;
        y3 = 46;
        i = new DyePack2(this.kSpriteSheet, x3, y3);
            this.addToSet(i);
        }
    
        if(this.timeclicks3===60){
        var x3, y3,i;
        x3 = 50;
        y3 = 46;
        i = new DyePack2(this.kSpriteSheet, x3, y3);
            this.addToSet(i);
        i = new DyePack2(this.kSpriteSheet, x3+10, y3);
            this.addToSet(i);
        i = new DyePack2(this.kSpriteSheet, x3-10, y3);
            this.addToSet(i);
        }
        if(this.timeclicks3===90){
        var x3, y3,i;
        x3 = 50;
        y3 = 46;
        i = new DyePack2(this.kSpriteSheet, x3, y3);
            this.addToSet(i);
        i = new DyePack2(this.kSpriteSheet, x3+10, y3);
            this.addToSet(i);
        i = new DyePack2(this.kSpriteSheet, x3-10, y3);
            this.addToSet(i);
        i = new DyePack2(this.kSpriteSheet, x3+20, y3);
            this.addToSet(i);
        i = new DyePack2(this.kSpriteSheet, x3-20, y3);
            this.addToSet(i);
        }
        if(this.timeclicks3===120){
        var x3, y3,i;
        x3 = 50;
        y3 = 46;
        i = new DyePack2(this.kSpriteSheet, x3, y3);
            this.addToSet(i);
        i = new DyePack2(this.kSpriteSheet, x3+10, y3);
            this.addToSet(i);
        i = new DyePack2(this.kSpriteSheet, x3-10, y3);
            this.addToSet(i);
        i = new DyePack2(this.kSpriteSheet, x3+20, y3);
            this.addToSet(i);
        i = new DyePack2(this.kSpriteSheet, x3-20, y3);
            this.addToSet(i);
        i = new DyePack2(this.kSpriteSheet, x3+30, y3);
            this.addToSet(i);
        i = new DyePack2(this.kSpriteSheet, x3-30, y3);
            this.addToSet(i);
        }
    }
    // remove the expired ones
    var i, obj;
    for (i=0; i<this.size(); i++) {
        obj = this.getObjectAt(i);
        if (obj.hasExpired()===0){
            this.removeFromSet(obj);
            
         }
    }
    
    // update all objects
    for (i=0; i<this.size(); i++) {
        obj = this.getObjectAt(i);
        obj.update(hero);
    }
};

